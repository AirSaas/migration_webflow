#!/usr/bin/env node
/**
 * parse-blog-llm.mjs — Sonnet-driven extraction of blog articles.
 *
 * Replaces parse-blog-articles-rebuild.py for the 62 blog articles.
 * Reads HTML from Supabase, calls Claude via tool_use with a strict JSON
 * Schema, validates, writes to src/data/blog-articles-v2.ts +
 * docs/raw/blog-articles-v2-content.json (used by qa-page.mjs).
 *
 * Usage:
 *   node scripts/migrate/parse-blog-llm.mjs
 *   node scripts/migrate/parse-blog-llm.mjs --slug=pi-planning
 *   node scripts/migrate/parse-blog-llm.mjs --limit=5         # smoke test
 *   node scripts/migrate/parse-blog-llm.mjs --dry-run         # no write
 *
 * Pre-req : .env.local with ANTHROPIC_API_KEY, scrape-airsaas-rebuild.mjs run.
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  REPO_ROOT,
  loadEnv,
  fetchPagesFromSupabase,
  cleanHtmlForLlm,
  callSonnetForExtraction,
  writeBlogTsFile,
  writeBlogContentJson,
  parseArgs,
  getCostStats,
} from "./llm-parse-shared.mjs";
import {
  blogArticleJsonSchema,
  validateBlogArticle,
  BLOG_RULES,
} from "./llm-parse-schemas.mjs";

const ENV = loadEnv();
const ARGS = parseArgs(process.argv);

const SYSTEM_PROMPT = `You are a structured-data extraction engine.

${BLOG_RULES}

OUTPUT REQUIREMENTS:

- Always invoke the \`extract_blog_article\` tool with your output. NEVER write
  prose — only the tool call.
- Extract EVERY paragraph, heading, list, figure, callout, and quote in DOM
  order. A typical article has 30-150 blocks. Stopping after the first few is
  WRONG — read the whole article body and emit one block per content node.
- Match the schema exactly. Discriminate blocks by their \`type\` field
  (paragraph / heading / list / figure / quote / table / insight-callout /
  inline-cta / hubspot-cta).
- Drop blocks that contain only Webflow CMS template instructions (Speaker
  avatar:, LINK_SPEAKER_PAGE, insert the link, change url of background-image).
- For headings, slugify the text into a stable \`id\` (lowercase, ASCII,
  hyphens, no diacritics, max 80 chars).`;

function buildUserPrompt(slug, html) {
  return `Article slug: ${slug}
Source : airsaas.io rendered HTML (Webflow CMS, blog post)

EXTRACT EVERY BLOCK in DOM order. Walk the article body top-to-bottom and
emit one block per content node. Output via the \`extract_blog_article\` tool.

\`\`\`html
${html}
\`\`\``;
}

async function main() {
  const startedAt = Date.now();
  const CONCURRENCY = parseInt(process.env.LLM_CONCURRENCY || "3", 10);

  console.log(`[parse-blog-llm] starting`);
  if (ARGS.limit) console.log(`[parse-blog-llm] limit = ${ARGS.limit}`);
  if (ARGS.slug) console.log(`[parse-blog-llm] slug filter = ${ARGS.slug}`);
  if (ARGS.dryRun) console.log(`[parse-blog-llm] DRY RUN — no files written`);

  let rows = await fetchPagesFromSupabase("blog");
  if (ARGS.slug) {
    // Comma-separated list of slugs supported.
    const slugs = ARGS.slug.split(",").map((s) => s.trim());
    rows = rows.filter((r) => slugs.includes(r.slug));
  }
  if (ARGS.onlyBroken) {
    const tsPath = join(REPO_ROOT, "src/data/blog-articles-v2.ts");
    if (existsSync(tsPath)) {
      const txt = readFileSync(tsPath, "utf8");
      // Match either `[...] as const;` (writeBlogTsFile) or `[...];`
      // (promote-blog-extracts.mjs). Greedy on the array body.
      const m = txt.match(/BLOG_ARTICLES_V2[^=]*=\s*(\[[\s\S]*\])\s*(?:as const)?\s*;/);
      if (m) {
        const existing = JSON.parse(m[1]);
        const broken = new Set(
          existing
            .filter((a) => !Array.isArray(a.blocks) || a.blocks.length === 0 || a.blocks.length > 1000)
            .map((a) => a.slug),
        );
        rows = rows.filter((r) => broken.has(r.slug));
        console.log(`[only-broken] filtered to ${rows.length} broken articles`);
      }
    }
  }
  if (ARGS.limit) rows = rows.slice(0, ARGS.limit);
  console.log(`[fetch] blog: ${rows.length} rows  (concurrency=${CONCURRENCY})`);

  async function callOnce(html, row, maxTokens) {
    return callSonnetForExtraction({
      apiKey: ENV.ANTHROPIC_API_KEY,
      systemPromptCached: SYSTEM_PROMPT,
      userPrompt: buildUserPrompt(row.slug, html),
      toolName: "extract_blog_article",
      toolDescription: "Extract the typed BlogArticleV2 from rendered HTML",
      inputSchema: blogArticleJsonSchema,
      maxTokens,
    });
  }

  function isCorrupt(out) {
    if (!out || typeof out !== "object") return true;
    if (!Array.isArray(out.blocks)) return true; // sometimes Anthropic returns blocks as a string when truncated
    if (out.blocks.length === 0) return true;
    return false;
  }

  async function processRow(row) {
    const html = cleanHtmlForLlm(row.html_rendered);
    const ts = Date.now();
    try {
      let llmOutput = await callOnce(html, row, 16000);
      if (isCorrupt(llmOutput)) {
        console.log(`  ↻ ${row.slug}: corrupt/empty, retry with max=32000`);
        llmOutput = await callOnce(html, row, 32000);
      }
      const article = {
        slug: row.slug,
        skip: false,
        ...llmOutput,
        faq: llmOutput.faq || [],
        related: llmOutput.related || [],
        toc: llmOutput.toc || [],
      };
      const errs = validateBlogArticle(article, row.slug);
      const dt = ((Date.now() - ts) / 1000).toFixed(1);
      if (errs.length) {
        console.log(`  ⚠ ${row.slug}: validation: ${errs.join(", ")}`);
      }
      console.log(
        `  ✓ ${row.slug}  ${article.blocks?.length ?? 0} blocks  (${(html.length / 1024).toFixed(0)} KB, ${dt}s)`,
      );
      return article;
    } catch (e) {
      console.log(`  ✗ ${row.slug}: ${e.message}`);
      return null;
    }
  }

  // Cost cap — env LLM_COST_CAP_USD (default $100). Hard stop when reached.
  const costCap = Number(process.env.LLM_COST_CAP_USD || "100");
  let costCapHit = false;

  const parsed = [];
  const queue = [...rows];
  const workers = Array.from({ length: Math.min(CONCURRENCY, rows.length) }, async () => {
    while (queue.length) {
      const stats = getCostStats();
      if (stats.totalCost >= costCap) {
        if (!costCapHit) {
          console.error(`\n[cost-cap] $${stats.totalCost.toFixed(3)} ≥ $${costCap.toFixed(2)} — stopping`);
        }
        costCapHit = true;
        break;
      }
      const row = queue.shift();
      const article = await processRow(row);
      if (article) parsed.push(article);
    }
  });
  await Promise.all(workers);

  const order = new Map(rows.map((r, i) => [r.slug, i]));
  parsed.sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));

  if (!ARGS.dryRun && parsed.length) {
    const tsPath = join(REPO_ROOT, "src/data/blog-articles-v2.ts");
    const jsonPath = join(REPO_ROOT, "docs/raw/blog-articles-v2-content.json");

    // If processing a subset (--slug or --only-broken), merge with existing
    // file so we don't lose the other articles.
    let finalArticles = parsed;
    if ((ARGS.slug || ARGS.onlyBroken) && existsSync(tsPath)) {
      const txt = readFileSync(tsPath, "utf8");
      // Match either `[...] as const;` (writeBlogTsFile) or `[...];`
      // (promote-blog-extracts.mjs). Greedy on the array body.
      const m = txt.match(/BLOG_ARTICLES_V2[^=]*=\s*(\[[\s\S]*\])\s*(?:as const)?\s*;/);
      if (m) {
        const existing = JSON.parse(m[1]);
        const updatedBySlug = new Map(parsed.map((a) => [a.slug, a]));
        finalArticles = existing.map((a) => updatedBySlug.get(a.slug) ?? a);
        console.log(
          `[merge] ${parsed.length} re-parsed, ${finalArticles.length} total in file`,
        );
      }
    }

    writeBlogTsFile(tsPath, finalArticles);
    writeBlogContentJson(jsonPath, finalArticles);
    console.log(`[write] blog-articles-v2.ts  (${finalArticles.length} articles)`);
    console.log(`[write] blog-articles-v2-content.json  (${finalArticles.length} entries)`);
  }

  const stats = getCostStats();
  console.log(
    `\n[done] in ${((Date.now() - startedAt) / 1000).toFixed(0)}s  cost=$${stats.totalCost.toFixed(3)}  tokens: in=${stats.totalTokens.input} out=${stats.totalTokens.output} cacheR=${stats.totalTokens.cacheRead} cacheW=${stats.totalTokens.cacheWrite}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
