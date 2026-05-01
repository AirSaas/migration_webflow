#!/usr/bin/env node
/**
 * parse-landings-llm.mjs — Sonnet-driven extraction of landing pages.
 *
 * Replaces parse-landings-rebuild.py for the lp / produit / solution / equipe
 * page types. Reads HTML from Supabase, calls Claude via tool_use with a
 * strict JSON Schema, validates, writes to src/data/landings-v2/{type}.ts.
 *
 * Usage:
 *   node scripts/migrate/parse-landings-llm.mjs
 *   node scripts/migrate/parse-landings-llm.mjs --type=lp
 *   node scripts/migrate/parse-landings-llm.mjs --type=lp --slug=ppm
 *   node scripts/migrate/parse-landings-llm.mjs --limit=2 --type=lp   # smoke test
 *   node scripts/migrate/parse-landings-llm.mjs --dry-run             # no write
 *
 * Pre-req : .env.local with ANTHROPIC_API_KEY, scrape-airsaas-rebuild.mjs run.
 */

import { join } from "node:path";
import {
  REPO_ROOT,
  loadEnv,
  fetchPagesFromSupabase,
  cleanHtmlForLlm,
  callSonnetForExtraction,
  writeLandingsTsFile,
  parseArgs,
  getCostStats,
} from "./llm-parse-shared.mjs";
import {
  landingPageJsonSchema,
  validateLandingPage,
  LANDING_RULES,
} from "./llm-parse-schemas.mjs";

const ENV = loadEnv();
const ARGS = parseArgs(process.argv);

const TYPES = ARGS.type ? [ARGS.type] : ["lp", "produit", "solution", "equipe"];
const TYPE_TO_FILE = {
  lp: "lp.ts",
  produit: "produit.ts",
  solution: "solutions.ts",
  equipe: "equipes.ts",
};

const SYSTEM_PROMPT = `You are a structured-data extraction engine.

${LANDING_RULES}

OUTPUT REQUIREMENTS:

- Always invoke the \`extract_landing_page\` tool with your output. NEVER write
  prose — only the tool call.
- Extract EVERY visible section of the page, in DOM order. A typical landing
  page has 5-15 sections (hero, logo bar, multiple feature blocks, intros,
  testimonials, FAQ, closing CTA). Stopping after the hero is WRONG.
- Walk the entire HTML body top-to-bottom. For each <section> or top-level
  <div> with content, emit one entry in the sections array.
- It is acceptable to repeat similar section types (e.g. multiple
  "feature-split" sections in a row — each gets its own entry).
- If you find no real content for a discriminator type, omit the entry; do
  not invent placeholder content.
- Match the schema exactly. Do not include fields that aren't relevant for a
  given section type (e.g. don't put \`logos\` on a hero section).`;

/**
 * Normalize section field names so the rendered React components don't crash
 * on minor LLM deviations. Per-type field mapping mirrors src/types/landing.ts.
 */
function normalizeSections(sections) {
  return sections
    .map((s) => normalizeSection(s))
    .filter((s) => s !== null);
}

function normalizeSection(s) {
  if (!s || typeof s !== "object" || !s.type) return null;
  const out = { ...s };

  switch (s.type) {
    case "pain-points":
      // Schema : items: string[]. LLM sometimes emits bullets instead.
      if (!Array.isArray(out.items) && Array.isArray(out.bullets)) {
        out.items = out.bullets;
      }
      if (!Array.isArray(out.items) || out.items.length === 0) return null;
      delete out.bullets;
      return out;

    case "stats":
      // Schema : items: { value, label }. LLM may emit title/body or title/description.
      if (Array.isArray(out.items)) {
        out.items = out.items
          .map((it) => ({
            value: it.value ?? it.title ?? "",
            label: it.label ?? it.body ?? it.description ?? "",
          }))
          .filter((it) => it.value && it.label);
      }
      if (!Array.isArray(out.items) || out.items.length === 0) return null;
      return out;

    case "steps":
      // Schema : steps: { title, description }. LLM may emit items/body.
      if (Array.isArray(out.items) && !Array.isArray(out.steps)) {
        out.steps = out.items;
      }
      if (Array.isArray(out.steps)) {
        out.steps = out.steps
          .map((st) => ({
            title: st.title ?? "",
            description: st.description ?? st.body ?? null,
          }))
          .filter((st) => st.title);
      }
      delete out.items;
      if (!Array.isArray(out.steps) || out.steps.length === 0) return null;
      return out;

    case "icon-row":
      if (!Array.isArray(out.items) || out.items.length === 0) return null;
      out.items = out.items
        .map((it) => ({
          iconSrc: it.iconSrc ?? null,
          label: it.label ?? it.title ?? "",
        }))
        .filter((it) => it.label);
      return out;

    case "trust-badges":
      // Schema : badges: { label, iconSrc }. LLM may emit items/title.
      if (Array.isArray(out.items) && !Array.isArray(out.badges)) {
        out.badges = out.items.map((it) => ({
          label: it.label ?? it.title ?? "",
          iconSrc: it.iconSrc ?? null,
        }));
      }
      delete out.items;
      if (!Array.isArray(out.badges) || out.badges.length === 0) return null;
      return out;

    case "comparison-table":
      if (!Array.isArray(out.columns) || !Array.isArray(out.rows)) return null;
      return out;

    case "press-quotes":
      if (!Array.isArray(out.quotes) || out.quotes.length === 0) return null;
      out.quotes = out.quotes
        .map((q) => ({
          text: q.text ?? "",
          source: q.source ?? q.author ?? "",
          logoSrc: q.logoSrc ?? null,
        }))
        .filter((q) => q.text);
      return out;

    case "related":
      if (!Array.isArray(out.items) || out.items.length === 0) return null;
      out.items = out.items
        .map((it) => ({
          title: it.title ?? "",
          description: it.description ?? null,
          imageSrc: it.imageSrc ?? null,
          href: it.href ?? "#",
        }))
        .filter((it) => it.title);
      return out;

    case "testimonials":
    case "customer-testimonials":
      if (!Array.isArray(out.testimonials)) return null;
      out.testimonials = out.testimonials.filter(
        (t) => t && typeof t.text === "string" && t.text.length > 0 && typeof t.name === "string" && t.name.length > 0,
      );
      if (out.testimonials.length === 0) return null;
      return out;

    case "logo-bar":
      if (!Array.isArray(out.logos)) return null;
      out.logos = out.logos.filter((l) => l && typeof l.src === "string" && l.src.length > 0);
      if (out.logos.length === 0) return null;
      return out;

    case "faq":
      if (!Array.isArray(out.items)) return null;
      out.items = out.items.filter((q) => q && q.question && q.answer);
      if (out.items.length === 0) return null;
      return out;

    case "feature-split":
      // body/bullets/imageSrc must have at least one to be visible
      if (!out.title) return null;
      return out;

    case "intro":
      // Drop intros that have no body and no subSections (heading-only stubs).
      const hasBody = out.body && typeof out.body === "string" && out.body.replace(/<[^>]+>|\s/g, "").length > 0;
      const hasSubs = Array.isArray(out.subSections) && out.subSections.length > 0;
      if (!hasBody && !hasSubs) return null;
      return out;

    case "hero":
    case "cta":
    case "raw":
      return out;

    default:
      return out;
  }
}

function buildUserPrompt(slug, type, html) {
  return `Page slug: ${slug}
Page type: ${type}
Source : airsaas.io rendered HTML (Webflow CMS)

EXTRACT EVERY SECTION. The full body is below. Walk top-to-bottom and emit one
entry per visible section. Do not stop after the hero. Output via the
\`extract_landing_page\` tool.

\`\`\`html
${html}
\`\`\``;
}

async function main() {
  const startedAt = Date.now();
  console.log(`[parse-landings-llm] types = ${TYPES.join(", ")}`);
  if (ARGS.limit) console.log(`[parse-landings-llm] limit = ${ARGS.limit}`);
  if (ARGS.slug) console.log(`[parse-landings-llm] slug filter = ${ARGS.slug}`);
  if (ARGS.dryRun) console.log(`[parse-landings-llm] DRY RUN — no files written`);

  const CONCURRENCY = parseInt(process.env.LLM_CONCURRENCY || "3", 10);

  async function callOnce(html, row, type, maxTokens) {
    return callSonnetForExtraction({
      apiKey: ENV.ANTHROPIC_API_KEY,
      systemPromptCached: SYSTEM_PROMPT,
      userPrompt: buildUserPrompt(row.slug, type, html),
      toolName: "extract_landing_page",
      toolDescription: "Extract the typed LandingPage from rendered HTML",
      inputSchema: landingPageJsonSchema,
      maxTokens,
    });
  }

  async function processRow(row, type) {
    const html = cleanHtmlForLlm(row.html_rendered);
    const ts = Date.now();
    try {
      let llmOutput = await callOnce(html, row, type, 16000);
      // Retry once with extended budget if the model truncated to 0 sections.
      if (!llmOutput.sections || llmOutput.sections.length === 0) {
        console.log(`  ↻ ${row.slug}: 0 sections, retry with max=24000`);
        llmOutput = await callOnce(html, row, type, 24000);
      }
      // Normalize section field names that the LLM occasionally emits
      // differently from the TypeScript schema (e.g. items vs bullets, value
      // vs title in stats, description vs body in steps).
      llmOutput.sections = normalizeSections(llmOutput.sections || []);
      const page = { slug: row.slug, type, ...llmOutput };
      const errs = validateLandingPage(page, row.slug, type);
      const dt = ((Date.now() - ts) / 1000).toFixed(1);
      if (errs.length) {
        console.log(`  ⚠ ${row.slug}: validation: ${errs.join(", ")}`);
      }
      console.log(
        `  ✓ ${row.slug}  ${page.sections?.length ?? 0} sections  (${(html.length / 1024).toFixed(0)} KB, ${dt}s)`,
      );
      return page;
    } catch (e) {
      console.log(`  ✗ ${row.slug}: ${e.message}`);
      return null;
    }
  }

  for (const type of TYPES) {
    const t0 = Date.now();
    let rows = await fetchPagesFromSupabase(type);
    if (ARGS.slug) rows = rows.filter((r) => r.slug === ARGS.slug);
    if (ARGS.limit) rows = rows.slice(0, ARGS.limit);
    console.log(`\n[fetch] ${type}: ${rows.length} rows  (concurrency=${CONCURRENCY})`);

    const parsed = [];
    const queue = [...rows];
    const workers = Array.from({ length: Math.min(CONCURRENCY, rows.length) }, async () => {
      while (queue.length) {
        const row = queue.shift();
        const page = await processRow(row, type);
        if (page) parsed.push(page);
      }
    });
    await Promise.all(workers);

    // Re-order parsed to match original slug order (concurrent ≠ deterministic)
    const order = new Map(rows.map((r, i) => [r.slug, i]));
    parsed.sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));

    if (!ARGS.dryRun && parsed.length) {
      const outPath = join(REPO_ROOT, "src/data/landings-v2", TYPE_TO_FILE[type]);
      writeLandingsTsFile(outPath, parsed, type);
      console.log(`[write] ${TYPE_TO_FILE[type]}  (${parsed.length} pages, ${((Date.now() - t0) / 1000).toFixed(0)}s)`);
    }
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
