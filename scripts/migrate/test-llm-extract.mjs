#!/usr/bin/env node
/**
 * test-llm-extract.mjs — Concept test : Opus 4.7 extraction sur 4 pages avec
 * iteration loop (max 3 retries avec feedback ciblé).
 *
 * Output : docs/raw/llm-test/{slug}.json + console summary + decision matrix.
 *
 * Pre-req : .env.local with ANTHROPIC_API_KEY.
 *
 * Budget cap : abort si dépasse $20 cumulé.
 */

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import {
  REPO_ROOT,
  loadEnv,
  cleanHtmlForLlm,
  getCostStats,
} from "./llm-parse-shared.mjs";

const SUPABASE_URL = "https://ydudpmtbnvpxxenbnvab.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkdWRwbXRibnZweHhlbmJudmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3ODgzMDEsImV4cCI6MjA4NTM2NDMwMX0.62_iMmq47ZUCLraNvMjW5qhT_hH6pfSfxBZH0y8mMfQ";

async function fetchOnePage(type, slug) {
  // Fetch a SINGLE page by slug — avoids Supabase timeout on full-type queries.
  const url =
    `${SUPABASE_URL}/rest/v1/airsaas_pages_rebuild` +
    `?type=eq.${type}&slug=eq.${slug}&select=slug,full_url,html_rendered`;
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
  const arr = await res.json();
  if (!arr.length) throw new Error(`Page ${type}/${slug} not found`);
  return arr[0];
}
import { landingPageJsonSchema, blogArticleJsonSchema } from "./llm-parse-schemas.mjs";
import { SYSTEM_PROMPT_V2 } from "./llm-prompt-v2.mjs";
import { validate, generateFeedback, summarize } from "./llm-validators.mjs";

const ENV = loadEnv();
const MODEL = "claude-opus-4-7";
const MAX_ITERATIONS = 3;
const BUDGET_CAP_USD = 80;
const OUT_DIR = join(REPO_ROOT, "docs/raw/llm-test");

// Opus 4.7 pricing
const OPUS_INPUT = 15 / 1_000_000;
const OPUS_OUTPUT = 75 / 1_000_000;
const OPUS_CACHE_READ = 1.5 / 1_000_000;
const OPUS_CACHE_WRITE = 18.75 / 1_000_000;

// Full 26-landings batch (4 lp + 6 produit + 12 solution + 4 equipe).
// Mirror of the slugs in scripts/migrate/parse-landings-rebuild.py.
const TEST_PAGES_FULL = [
  // LP (4)
  { type: "lp", slug: "ppm" },
  { type: "lp", slug: "pmo" },
  { type: "lp", slug: "capacity-planning" },
  { type: "lp", slug: "pi-planning" },
  // Produit (6)
  { type: "produit", slug: "automatiser-la-com-projet" },
  { type: "produit", slug: "budget" },
  { type: "produit", slug: "capacity-planning" },
  { type: "produit", slug: "priorisation-par-equipes" },
  { type: "produit", slug: "reporting-projet" },
  { type: "produit", slug: "traduction-one-click-avec-deepl" },
  // Solution (12)
  { type: "solution", slug: "airsaas-et-les-experts-de-la-transfo" },
  { type: "solution", slug: "flash-report" },
  { type: "solution", slug: "flash-report-projet" },
  { type: "solution", slug: "gestion-portefeuille-projet" },
  { type: "solution", slug: "management-de-portefeuille-projet" },
  { type: "solution", slug: "outil-ppm" },
  { type: "solution", slug: "outils-de-pilotage-projet" },
  { type: "solution", slug: "portfolio-management" },
  { type: "solution", slug: "revue-de-portefeuille" },
  { type: "solution", slug: "tableau-de-bord-dsi" },
  { type: "solution", slug: "tableau-de-bord-gestion-de-projet" },
  { type: "solution", slug: "tableau-de-bord-portefeuille-de-projet" },
  // Equipe (4)
  { type: "equipe", slug: "comite-direction" },
  { type: "equipe", slug: "direction-de-la-transformation" },
  { type: "equipe", slug: "it-et-operation" },
  { type: "equipe", slug: "outil-pmo" },
];

// Allow filtering via CLI : --slug=foo or --type=lp,produit
const args = process.argv.slice(2);
const slugFilter = args.find((a) => a.startsWith("--slug="))?.slice(7);
const typeFilter = args.find((a) => a.startsWith("--type="))?.slice(7)?.split(",");
const TEST_PAGES = TEST_PAGES_FULL.filter((p) => {
  if (slugFilter && p.slug !== slugFilter) return false;
  if (typeFilter && !typeFilter.includes(p.type)) return false;
  return true;
});

let totalCost = 0;
let totalTokens = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 };

function formatCost() {
  return `$${totalCost.toFixed(3)} (in=${totalTokens.input} out=${totalTokens.output} cacheR=${totalTokens.cacheRead} cacheW=${totalTokens.cacheWrite})`;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithRetry(url, options, label) {
  // 4 attempts with exponential backoff: 0s, 5s, 15s, 45s.
  // Catches both `fetch failed` (network) and 5xx / 429 from the API.
  const MAX_ATTEMPTS = 4;
  let lastErr = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      const status = res.status;
      const text = await res.text();
      // 5xx and 429 are retriable. 4xx (other) is not.
      if (status >= 500 || status === 429) {
        lastErr = new Error(`${label} ${status}: ${text.slice(0, 200)}`);
        console.log(`    ↻ retry ${attempt}/${MAX_ATTEMPTS} (${status})`);
        if (attempt < MAX_ATTEMPTS) await sleep(5000 * attempt ** 2);
        continue;
      }
      throw new Error(`${label} ${status}: ${text.slice(0, 300)}`);
    } catch (e) {
      lastErr = e;
      const isNetwork =
        e.message?.includes("fetch failed") ||
        e.message?.includes("ECONNRESET") ||
        e.message?.includes("ETIMEDOUT") ||
        e.message?.includes("ENOTFOUND") ||
        e.cause?.code === "ECONNRESET";
      if (!isNetwork) throw e;
      console.log(`    ↻ retry ${attempt}/${MAX_ATTEMPTS} (network: ${e.message.slice(0, 80)})`);
      if (attempt < MAX_ATTEMPTS) await sleep(5000 * attempt ** 2);
    }
  }
  throw lastErr;
}

async function callOpus({ systemPrompt, userMessages, schema, toolName }) {
  if (totalCost > BUDGET_CAP_USD) {
    throw new Error(`Budget cap $${BUDGET_CAP_USD} exceeded — current ${formatCost()}`);
  }
  const body = {
    model: MODEL,
    max_tokens: 16000,
    system: systemPrompt,
    tools: [
      {
        name: toolName,
        description: "Extract the typed page from rendered Webflow HTML",
        input_schema: schema,
        cache_control: { type: "ephemeral" },
      },
    ],
    tool_choice: { type: "tool", name: toolName },
    messages: userMessages,
  };

  const res = await fetchWithRetry(
    "https://api.anthropic.com/v1/messages",
    {
      method: "POST",
      headers: {
        "x-api-key": ENV.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    },
    "Anthropic",
  );
  const data = await res.json();
  const usage = data.usage || {};
  totalTokens.input += usage.input_tokens || 0;
  totalTokens.output += usage.output_tokens || 0;
  totalTokens.cacheRead += usage.cache_read_input_tokens || 0;
  totalTokens.cacheWrite += usage.cache_creation_input_tokens || 0;
  totalCost +=
    (usage.input_tokens || 0) * OPUS_INPUT +
    (usage.output_tokens || 0) * OPUS_OUTPUT +
    (usage.cache_read_input_tokens || 0) * OPUS_CACHE_READ +
    (usage.cache_creation_input_tokens || 0) * OPUS_CACHE_WRITE;

  const toolBlock = data.content?.find(
    (c) => c.type === "tool_use" && c.name === toolName,
  );
  if (!toolBlock) {
    const stop = data.stop_reason;
    const texts = data.content?.filter((c) => c.type === "text").map((c) => c.text);
    throw new Error(`No tool_use block (stop=${stop}, texts=${JSON.stringify(texts).slice(0, 200)})`);
  }
  return { input: toolBlock.input, stopReason: data.stop_reason, usage };
}

async function fetchPageHtml(type, slug) {
  const row = await fetchOnePage(type, slug);
  return cleanHtmlForLlm(row.html_rendered);
}

function buildUserPrompt(slug, type, html, feedback) {
  let userText = `Page slug: ${slug}\nPage type: ${type}\n\n`;
  if (feedback) {
    userText += `${feedback}\n\nHTML source (already-cleaned, with SVG/nav/footer stripped):\n\n\`\`\`html\n${html}\n\`\`\``;
  } else {
    userText += `Walk this rendered Webflow HTML top-to-bottom and emit ONE entry per visible section in the sections array. Target 8-15 sections for landings.\n\nHTML source (already-cleaned, with SVG/nav/footer stripped):\n\n\`\`\`html\n${html}\n\`\`\``;
  }
  return userText;
}

async function testPage({ type, slug }) {
  console.log(`\n══════════════════════════════════════════════════════════`);
  console.log(`▶ ${type}/${slug}`);
  console.log(`══════════════════════════════════════════════════════════`);
  const html = await fetchPageHtml(type, slug);
  console.log(`HTML cleaned : ${(html.length / 1024).toFixed(0)} KB`);

  // Conversation history for the iteration loop (assistant + user pairs)
  const conversation = [];
  let lastResult = null;
  let lastErrors = [];
  let iteration = 0;
  let outcome = "FAIL";

  while (iteration < MAX_ITERATIONS) {
    iteration++;
    const isFirst = iteration === 1;
    const userText = buildUserPrompt(
      slug,
      type,
      html,
      isFirst ? null : generateFeedback(lastErrors),
    );

    if (isFirst) {
      conversation.push({ role: "user", content: userText });
    } else {
      // Append the previous assistant turn (echoed tool_use as JSON), then new user feedback
      conversation.push({
        role: "assistant",
        content: `Previous extraction output:\n\`\`\`json\n${JSON.stringify(lastResult).slice(0, 4000)}\n\`\`\``,
      });
      conversation.push({ role: "user", content: userText });
    }

    const t0 = Date.now();
    let result;
    try {
      result = await callOpus({
        systemPrompt: SYSTEM_PROMPT_V2,
        userMessages: conversation,
        schema: type === "blog" ? blogArticleJsonSchema : landingPageJsonSchema,
        toolName: type === "blog" ? "extract_blog_article" : "extract_landing_page",
      });
    } catch (e) {
      console.log(`  iter ${iteration} : API ERROR : ${e.message}`);
      outcome = "API_ERROR";
      lastErrors = [{ type: "api-error", detail: e.message }];
      break;
    }
    const dt = ((Date.now() - t0) / 1000).toFixed(1);

    lastResult = result.input;
    const summary = summarize(lastResult, type);
    const validation = validate(lastResult, type);
    lastErrors = validation.errors;

    const sizeLabel =
      type === "blog" ? `${summary.blocks ?? 0} blocks` : `${summary.sections ?? 0} sections`;
    console.log(
      `  iter ${iteration} : ${sizeLabel} (${summary.types?.length ?? 0} types) — ${validation.ok ? "✅ OK" : `❌ ${validation.errors.length} issues`} (${dt}s, cumulative cost ${formatCost()})`,
    );
    if (!validation.ok) {
      console.log(
        `    issues: ${validation.errors.slice(0, 3).map((e) => `[${e.type}] ${e.detail.slice(0, 100)}`).join(" | ")}`,
      );
    }

    if (validation.ok) {
      outcome = iteration === 1 ? "PASS_FIRST_TRY" : "RETRY_PASS";
      break;
    }
  }

  // Save raw output — prefix filename with type to avoid collisions across
  // types (e.g. lp/capacity-planning vs produit/capacity-planning).
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(
    join(OUT_DIR, `${type}-${slug}.json`),
    JSON.stringify({ type, slug, iteration, outcome, errors: lastErrors, result: lastResult }, null, 2),
  );

  return { type, slug, iteration, outcome, summary: summarize(lastResult, type), errors: lastErrors };
}

async function main() {
  const startedAt = Date.now();
  console.log(`\n[test-llm-extract] Opus 4.7 concept test on ${TEST_PAGES.length} pages\n`);
  console.log(`Budget cap : $${BUDGET_CAP_USD}, max iterations : ${MAX_ITERATIONS}\n`);

  const results = [];
  for (const page of TEST_PAGES) {
    try {
      const r = await testPage(page);
      results.push(r);
    } catch (e) {
      console.log(`\n❌ ${page.type}/${page.slug} : ${e.message}`);
      results.push({ ...page, outcome: "API_ERROR", errors: [{ detail: e.message }] });
      if (e.message.includes("Budget cap")) break;
    }
  }

  // ─── Decision matrix ────────────────────────────────────────────────────
  const passFirst = results.filter((r) => r.outcome === "PASS_FIRST_TRY").length;
  const retryPass = results.filter((r) => r.outcome === "RETRY_PASS").length;
  const fail = results.filter((r) => r.outcome === "FAIL").length;
  const error = results.filter((r) => r.outcome === "API_ERROR").length;
  const total = results.length;
  const passing = passFirst + retryPass;

  console.log(`\n══════════════════════════════════════════════════════════`);
  console.log(`SUMMARY`);
  console.log(`══════════════════════════════════════════════════════════`);
  console.log(`Pages tested   : ${total}`);
  console.log(`PASS first try : ${passFirst}`);
  console.log(`RETRY PASS     : ${retryPass}`);
  console.log(`FAIL after 3   : ${fail}`);
  console.log(`API errors     : ${error}`);
  console.log(`Total cost     : ${formatCost()}`);
  console.log(`Wall-clock     : ${((Date.now() - startedAt) / 1000).toFixed(0)}s`);
  console.log("");
  for (const r of results) {
    let summ = "no summary";
    if (r.summary) {
      const size = r.type === "blog" ? `${r.summary.blocks ?? 0} blocks` : `${r.summary.sections ?? 0} sections`;
      summ = `${size} (${r.summary.types?.join(", ")})`;
    }
    console.log(`  ${r.outcome.padEnd(16)} ${r.type}/${r.slug} (iter ${r.iteration ?? "—"}) — ${summ}`);
  }

  console.log(`\n══════════════════════════════════════════════════════════`);
  console.log(`DECISION`);
  console.log(`══════════════════════════════════════════════════════════`);
  if (passing >= 3) {
    console.log(`✅ GO : ${passing}/${total} pages passed in ≤ ${MAX_ITERATIONS} iterations.`);
    console.log(`   → Develop the full batch (Opus over 88 pages).`);
  } else if (passing === 2) {
    console.log(`⚠️ PARTIAL GO : ${passing}/${total} passed.`);
    console.log(`   → LLM useful for some pages, hybrid approach recommended.`);
  } else {
    console.log(`🛑 NO-GO : only ${passing}/${total} passed.`);
    console.log(`   → Fall back to "10 Python extractors" plan (deterministic).`);
  }

  // Save final summary
  writeFileSync(
    join(OUT_DIR, "_summary.json"),
    JSON.stringify(
      { startedAt: new Date(startedAt).toISOString(), totalCost, totalTokens, results },
      null,
      2,
    ),
  );
  console.log(`\nReports saved : ${OUT_DIR}/`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
