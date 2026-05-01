/**
 * llm-parse-shared.mjs — helpers for LLM-driven extraction of LandingPage and
 * BlogArticleV2 from rendered Webflow HTML stored in Supabase.
 *
 * Why : the legacy bs4/regex parsers (parse-landings-rebuild.py +
 * parse-blog-articles-rebuild.py) suffered from 7+ pattern bugs (empty
 * sections, decorative drop-caps, CMS placeholder leaks, concat issues, etc.).
 * Sonnet 4.6 with strict JSON Schema via tool_use is more robust.
 *
 * Pre-req : .env.local with ANTHROPIC_API_KEY ; Supabase row already populated
 * by scripts/migrate/scrape-airsaas-rebuild.mjs.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = join(__dirname, "../..");

const SUPABASE_URL = "https://ydudpmtbnvpxxenbnvab.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkdWRwbXRibnZweHhlbmJudmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3ODgzMDEsImV4cCI6MjA4NTM2NDMwMX0.62_iMmq47ZUCLraNvMjW5qhT_hH6pfSfxBZH0y8mMfQ";

export const MODEL = "claude-sonnet-4-6";
export const ANTHROPIC_PRICE_INPUT = 3 / 1_000_000;
export const ANTHROPIC_PRICE_OUTPUT = 15 / 1_000_000;
export const ANTHROPIC_PRICE_CACHE_READ = 0.3 / 1_000_000;
export const ANTHROPIC_PRICE_CACHE_WRITE = 3.75 / 1_000_000;

// ─── Env ────────────────────────────────────────────────────────────────────

export function loadEnv() {
  const envPath = join(REPO_ROOT, ".env.local");
  if (!existsSync(envPath)) {
    console.error("ERROR: .env.local missing");
    process.exit(1);
  }
  const env = {};
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  if (!env.ANTHROPIC_API_KEY) {
    console.error("ERROR: ANTHROPIC_API_KEY missing in .env.local");
    process.exit(1);
  }
  return env;
}

// ─── Supabase fetch ─────────────────────────────────────────────────────────

export async function fetchPagesFromSupabase(type) {
  const url =
    `${SUPABASE_URL}/rest/v1/airsaas_pages_rebuild` +
    `?type=eq.${type}&scrape_status=eq.ok&order=slug.asc` +
    `&select=slug,full_url,html_rendered`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  return res.json();
}

// ─── HTML cleaning ──────────────────────────────────────────────────────────

const MAX_HTML_CHARS = 100_000;

export function cleanHtmlForLlm(html) {
  if (!html) return "";
  let body = html;
  // Extract <body>…</body> if present; otherwise use full HTML.
  const bodyMatch = body.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) body = bodyMatch[1];
  // Strip <svg>: Webflow inlines a TON of decorative SVG (≈16 MB on landings).
  // We only need DOM structure + text, never the SVG path data.
  body = body.replace(/<svg\b[\s\S]*?<\/svg>/gi, "<svg/>");
  // Strip <script>, <style>, <noscript>, comments, inline event handlers
  body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
  body = body.replace(/<style[\s\S]*?<\/style>/gi, "");
  body = body.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  body = body.replace(/<!--[\s\S]*?-->/g, "");
  body = body.replace(/\son[a-z]+="[^"]*"/gi, "");
  body = body.replace(/\sstyle="[^"]*"/gi, "");
  // Strip base64 inline images (huge token waste)
  body = body.replace(/src="data:[^"]*"/gi, 'src=""');
  // Strip nav and footer — they're identical across pages and burn tokens
  // without giving the model real content. The parser doesn't extract them
  // either (they're rendered by next-intl, not from data).
  body = body.replace(/<nav\b[\s\S]*?<\/nav>/gi, "");
  body = body.replace(/<footer\b[\s\S]*?<\/footer>/gi, "");
  // Collapse whitespace
  body = body.replace(/\s{2,}/g, " ").trim();
  if (body.length > MAX_HTML_CHARS) {
    body = body.slice(0, MAX_HTML_CHARS) + "\n<!-- TRUNCATED -->";
  }
  return body;
}

// ─── Anthropic call (tool_use forces JSON schema compliance) ────────────────

let totalCost = 0;
let totalTokens = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 };

export function getCostStats() {
  return { totalCost, totalTokens };
}

export async function callSonnetForExtraction({
  apiKey,
  systemPromptCached,
  userPrompt,
  toolName,
  toolDescription,
  inputSchema,
  maxTokens = 4000,
  retries = 2,
}) {
  const body = {
    model: MODEL,
    max_tokens: maxTokens,
    temperature: 0,
    // System + tool definition are constant per parser run → cache both.
    // Anthropic minimum cache is 1024 tokens — the system prompt alone may
    // be below the threshold, so we set the breakpoint AFTER the tool def
    // so system + tool counts together.
    system: systemPromptCached,
    tools: [
      {
        name: toolName,
        description: toolDescription,
        input_schema: inputSchema,
        cache_control: { type: "ephemeral" },
      },
    ],
    tool_choice: { type: "tool", name: toolName },
    messages: [{ role: "user", content: userPrompt }],
  };

  let lastErr = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const t = await res.text();
        // 529 / 5xx → retry with backoff
        if (res.status >= 500 || res.status === 429) {
          lastErr = new Error(`Anthropic ${res.status}: ${t.slice(0, 200)}`);
          await sleep(1000 * (attempt + 1) ** 2);
          continue;
        }
        throw new Error(`Anthropic ${res.status}: ${t.slice(0, 200)}`);
      }
      const data = await res.json();
      if (process.env.LLM_DEBUG === "1") {
        console.log(`  [debug raw] stop=${data.stop_reason} content_types=${(data.content || []).map((c) => c.type).join(",")}`);
      }
      // Track cost
      const usage = data.usage || {};
      totalTokens.input += usage.input_tokens || 0;
      totalTokens.output += usage.output_tokens || 0;
      totalTokens.cacheRead += usage.cache_read_input_tokens || 0;
      totalTokens.cacheWrite += usage.cache_creation_input_tokens || 0;
      totalCost +=
        (usage.input_tokens || 0) * ANTHROPIC_PRICE_INPUT +
        (usage.output_tokens || 0) * ANTHROPIC_PRICE_OUTPUT +
        (usage.cache_read_input_tokens || 0) * ANTHROPIC_PRICE_CACHE_READ +
        (usage.cache_creation_input_tokens || 0) * ANTHROPIC_PRICE_CACHE_WRITE;

      // Find the tool_use block
      const toolBlock = data.content?.find(
        (c) => c.type === "tool_use" && c.name === toolName,
      );
      if (!toolBlock) {
        const stopReason = data.stop_reason;
        const texts = data.content?.filter((c) => c.type === "text").map((c) => c.text);
        throw new Error(
          `No tool_use block (stop=${stopReason}, texts=${JSON.stringify(texts).slice(0, 200)})`,
        );
      }
      return toolBlock.input;
    } catch (e) {
      lastErr = e;
      if (attempt < retries) await sleep(1000 * (attempt + 1) ** 2);
    }
  }
  throw lastErr;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── TS data file emitter ──────────────────────────────────────────────────

/** Quote a string for inclusion in a TS string literal. */
function tsString(v) {
  return (
    '"' + v.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n") + '"'
  );
}

function tsValue(v) {
  if (v === null || v === undefined) return "null";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return tsString(v);
  if (Array.isArray(v)) return "[" + v.map(tsValue).join(", ") + "]";
  if (typeof v === "object") {
    const parts = [];
    for (const [k, val] of Object.entries(v)) {
      if (val === null || val === undefined) continue;
      parts.push(`"${k}": ${tsValue(val)}`);
    }
    return "{ " + parts.join(", ") + " }";
  }
  return "null";
}

export function writeLandingsTsFile(outPath, pages, typeLabel) {
  const body = tsValue(pages);
  const content = `// AUTO-GENERATED — do not edit by hand
// Regenerate: node scripts/migrate/parse-landings-llm.mjs
// Source: airsaas_pages_rebuild WHERE type='${typeLabel}' (Supabase)
// Extractor: claude-sonnet-4-6 via tool_use (see scripts/migrate/llm-parse-shared.mjs)

import type { LandingPage } from "@/types/landing";

export const PAGES: LandingPage[] = ${body} as const;

export const PAGES_BY_SLUG: Record<string, LandingPage> =
  Object.fromEntries(PAGES.map((p) => [p.slug, p]));
`;
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, content, "utf8");
}

export function writeBlogTsFile(outPath, articles) {
  const body = tsValue(articles);
  const content = `// AUTO-GENERATED — do not edit by hand
// Regenerate: node scripts/migrate/parse-blog-llm.mjs
// Source: airsaas_pages_rebuild WHERE type='blog' (Supabase)
// Extractor: claude-sonnet-4-6 via tool_use (see scripts/migrate/llm-parse-shared.mjs)

import type { BlogArticleV2 } from "@/types/blog-v2";

export const BLOG_ARTICLES_V2: BlogArticleV2[] = ${body} as const;

export const ACTIVE_BLOG_ARTICLES_V2: BlogArticleV2[] = BLOG_ARTICLES_V2.filter(
  (a) => !a.skip,
);

export const BLOG_BY_SLUG_V2: Record<string, BlogArticleV2> =
  Object.fromEntries(BLOG_ARTICLES_V2.map((a) => [a.slug, a]));
`;
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, content, "utf8");
}

export function writeBlogContentJson(outPath, articles) {
  // Used by qa-page.mjs / qa-llm.mjs as source of truth for blog slugs.
  // Keep field names aligned with the legacy parser : slug, skip, reason.
  const summaries = articles.map((a) => ({
    slug: a.slug,
    skip: a.skip || false,
    reason: a.reason || null,
  }));
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(summaries, null, 2), "utf8");
}

// ─── Args parsing ──────────────────────────────────────────────────────────

export function parseArgs(argv) {
  const args = { type: null, slug: null, limit: null, dryRun: false, onlyBroken: false };
  for (const a of argv.slice(2)) {
    if (a.startsWith("--type=")) args.type = a.slice(7);
    else if (a.startsWith("--slug=")) args.slug = a.slice(7);
    else if (a.startsWith("--limit=")) args.limit = parseInt(a.slice(8), 10);
    else if (a === "--dry-run") args.dryRun = true;
    else if (a === "--only-broken") args.onlyBroken = true;
  }
  return args;
}
