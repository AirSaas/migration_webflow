#!/usr/bin/env node
/**
 * refine-llm-extracts.mjs — For each MOSTLY_FAITHFUL page from the audit,
 * re-run Opus with the audit issues as targeted feedback so the next pass
 * removes hallucinations, fixes wrong fields, fills incomplete sections, and
 * adds missing-from-extract sections.
 *
 * Input  : docs/raw/llm-audit/{type}-{slug}.json (audit verdicts)
 *          docs/raw/llm-test/{type}-{slug}.json  (previous extract)
 * Output : docs/raw/llm-test/{type}-{slug}.json  (refined extract, overwrite)
 *
 * Strategy : single-pass refine (no retry loop) — the feedback is built from
 * the audit, not from the structural validators. We trust Opus to fix what
 * was flagged. After this script, run llm-audit-extracts.mjs again to verify.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT, loadEnv, cleanHtmlForLlm } from "./llm-parse-shared.mjs";
import { landingPageJsonSchema, blogArticleJsonSchema } from "./llm-parse-schemas.mjs";
import { SYSTEM_PROMPT_V2 } from "./llm-prompt-v2.mjs";
import { summarize } from "./llm-validators.mjs";

const ENV = loadEnv();
const MODEL = "claude-opus-4-7";
const BUDGET_CAP_USD = 30;

const AUDIT_DIR = join(REPO_ROOT, "docs/raw/llm-audit");
const EXTRACT_DIR = join(REPO_ROOT, "docs/raw/llm-test");

const SUPABASE_URL = "https://ydudpmtbnvpxxenbnvab.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkdWRwbXRibnZweHhlbmJudmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3ODgzMDEsImV4cCI6MjA4NTM2NDMwMX0.62_iMmq47ZUCLraNvMjW5qhT_hH6pfSfxBZH0y8mMfQ";

const OPUS_INPUT = 15 / 1_000_000;
const OPUS_OUTPUT = 75 / 1_000_000;
const OPUS_CACHE_READ = 1.5 / 1_000_000;
const OPUS_CACHE_WRITE = 18.75 / 1_000_000;

let totalCost = 0;
let totalTokens = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 };

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function fetchOnePage(type, slug) {
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
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const arr = await res.json();
  if (!arr.length) throw new Error(`Page ${type}/${slug} not found`);
  return arr[0];
}

async function fetchWithRetry(url, options, label) {
  const MAX_ATTEMPTS = 4;
  let lastErr = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      const status = res.status;
      const text = await res.text();
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
    throw new Error(`Budget cap $${BUDGET_CAP_USD} exceeded — current $${totalCost.toFixed(2)}`);
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
  const toolBlock = data.content?.find((c) => c.type === "tool_use" && c.name === toolName);
  if (!toolBlock) {
    const stop = data.stop_reason;
    const texts = data.content?.filter((c) => c.type === "text").map((c) => c.text);
    throw new Error(`No tool_use block (stop=${stop}, texts=${JSON.stringify(texts).slice(0, 200)})`);
  }
  return { input: toolBlock.input, stopReason: data.stop_reason, usage };
}

// Audit notes that say "faithful to live source" mean the issue is a live-side
// thing (live uses an SVG illustration, etc.) and shouldn't be "fixed" by the
// LLM. We skip these from the feedback so Opus doesn't change correct fields.
const FAITHFUL_TO_LIVE_PATTERNS = [
  /faithful to live/i,
  /matches live/i,
  /reclassify as ok/i,
  /faithfully reproduced/i,
  /not a rebuild fault/i,
  /matches live source/i,
];

function isFaithfulToLiveNote(note) {
  if (!note) return false;
  return FAITHFUL_TO_LIVE_PATTERNS.some((re) => re.test(note));
}

function buildFeedback(audit) {
  const issues = [];
  const sectionIssues = (audit.sections || []).filter((s) => {
    if (s.verdict === "OK") return false;
    if (s.verdict === "WRONG_IMAGE" && isFaithfulToLiveNote(s.note)) return false;
    return true;
  });
  for (const s of sectionIssues) {
    issues.push(`- [${s.verdict}] section[${s.index}] type=${s.type} "${s.title || "—"}" — ${s.note || "no note"}`);
  }
  const missing = audit.missingFromExtract || [];
  for (const m of missing) {
    issues.push(`- [MISSING_FROM_EXTRACT] ${m.liveSectionDescription} (suggested type: ${m.suggestedType || "—"})`);
  }
  if (issues.length === 0) return null;

  return `Your previous extraction was reviewed against the live page. Apply ALL the fixes below, then re-emit the COMPLETE landing page (every section, in order — not just the changed ones) via the extract_landing_page tool.

Audit summary: ${audit.summary}

Issues to fix :

${issues.join("\n")}

How to apply each verdict :
- HALLUCINATED → REMOVE that section entirely (do not output it).
- WRONG_FIELDS → REWRITE the section using the canonical fields for that type.
- INCOMPLETE  → ADD the missing details (subtitle, second card, additional bullets, dropped paragraph, etc.) to that section.
- WRONG_IMAGE → only change imageSrc if the noted image is wrong; if the audit note says "faithful to live", keep imageSrc as-is.
- MISSING_FROM_EXTRACT → INSERT a new section at the right position in DOM order using the suggested type.

Re-emit the COMPLETE corrected landing page. Keep all OK sections untouched (same order, same content). Only the flagged sections + new ones change.`;
}

function buildUserPrompt({ slug, type, html, previousExtract, feedback }) {
  return `Page slug: ${slug}
Page type: ${type}

${feedback}

Previous extraction (the JSON you produced last time — fix it as instructed) :

\`\`\`json
${JSON.stringify(previousExtract, null, 2).slice(0, 80000)}
\`\`\`

HTML source (already-cleaned, with SVG/nav/footer stripped) — re-walk it top-to-bottom :

\`\`\`html
${html}
\`\`\``;
}

async function refinePage({ type, slug }) {
  const auditPath = join(AUDIT_DIR, `${type}-${slug}.json`);
  // Extract files use legacy naming (`${slug}.json`) for first run, new
  // naming (`${type}-${slug}.json`) after the lp/ vs produit/ collision fix.
  // Try the new naming first then fall back to legacy.
  const extractPathNew = join(EXTRACT_DIR, `${type}-${slug}.json`);
  const extractPathLegacy = join(EXTRACT_DIR, `${slug}.json`);
  let extractPath = existsSync(extractPathNew) ? extractPathNew : extractPathLegacy;
  if (!existsSync(auditPath)) {
    console.log(`  skip ${type}/${slug} — no audit file`);
    return { type, slug, outcome: "NO_AUDIT" };
  }
  if (!existsSync(extractPath)) {
    console.log(`  skip ${type}/${slug} — no previous extract file`);
    return { type, slug, outcome: "NO_EXTRACT" };
  }
  // For the legacy file, also verify the loaded JSON's slug matches (otherwise
  // a collision like lp/capacity-planning vs produit/capacity-planning would
  // load the wrong file).
  if (extractPath === extractPathLegacy) {
    const probe = JSON.parse(readFileSync(extractPath, "utf8"));
    if (probe.type !== type || probe.slug !== slug) {
      console.log(`  skip ${type}/${slug} — legacy file at ${extractPath} belongs to ${probe.type}/${probe.slug}`);
      return { type, slug, outcome: "LEGACY_COLLISION" };
    }
  }

  const auditFile = JSON.parse(readFileSync(auditPath, "utf8"));
  const extractFile = JSON.parse(readFileSync(extractPath, "utf8"));
  const audit = auditFile.audit || auditFile;
  const previousExtract = extractFile.result;
  if (audit.globalVerdict !== "MOSTLY_FAITHFUL") {
    return { type, slug, outcome: "SKIP_NOT_MOSTLY", verdict: audit.globalVerdict };
  }
  const feedback = buildFeedback(audit);
  if (!feedback) {
    return { type, slug, outcome: "NO_REAL_ISSUES" };
  }

  console.log(`\n══════════════════════════════════════════════════════════`);
  console.log(`▶ refine ${type}/${slug}`);
  const issueCount = (audit.sections || []).filter((s) => s.verdict !== "OK").length + (audit.missingFromExtract?.length || 0);
  console.log(`  audit issues: ${issueCount}`);

  const row = await fetchOnePage(type, slug);
  const html = cleanHtmlForLlm(row.html_rendered);
  console.log(`  HTML cleaned: ${(html.length / 1024).toFixed(0)} KB`);

  const userText = buildUserPrompt({ slug, type, html, previousExtract, feedback });

  const t0 = Date.now();
  const result = await callOpus({
    systemPrompt: SYSTEM_PROMPT_V2,
    userMessages: [{ role: "user", content: userText }],
    schema: type === "blog" ? blogArticleJsonSchema : landingPageJsonSchema,
    toolName: type === "blog" ? "extract_blog_article" : "extract_landing_page",
  });
  const dt = ((Date.now() - t0) / 1000).toFixed(1);

  const before = summarize(previousExtract, type);
  const after = summarize(result.input, type);
  const beforeLabel = type === "blog" ? `${before.blocks ?? 0} blocks` : `${before.sections ?? 0} sections`;
  const afterLabel = type === "blog" ? `${after.blocks ?? 0} blocks` : `${after.sections ?? 0} sections`;
  console.log(`  ${beforeLabel} → ${afterLabel} (${dt}s, cumulative $${totalCost.toFixed(3)})`);

  // Always write to the canonical {type}-{slug}.json filename. If we read
  // from the legacy {slug}.json, delete it after writing the new file so the
  // audit doesn't see two copies of the same page.
  if (!existsSync(EXTRACT_DIR)) mkdirSync(EXTRACT_DIR, { recursive: true });
  writeFileSync(
    extractPathNew,
    JSON.stringify({
      type,
      slug,
      iteration: (extractFile.iteration || 1) + 1,
      outcome: "REFINED",
      previousOutcome: extractFile.outcome,
      result: result.input,
    }, null, 2),
  );
  if (extractPath === extractPathLegacy && extractPathNew !== extractPathLegacy) {
    try { unlinkSync(extractPathLegacy); } catch {}
  }

  return {
    type,
    slug,
    outcome: "REFINED",
    before: beforeLabel,
    after: afterLabel,
    issuesFixed: issueCount,
  };
}

async function main() {
  console.log(`[refine-llm-extracts] Opus 4.7 single-pass refine of MOSTLY_FAITHFUL pages\n`);
  console.log(`Budget cap: $${BUDGET_CAP_USD}\n`);

  const auditFiles = readdirSync(AUDIT_DIR).filter((f) => f.endsWith(".json") && !f.startsWith("_"));
  const targets = [];
  for (const f of auditFiles) {
    const data = JSON.parse(readFileSync(join(AUDIT_DIR, f), "utf8"));
    if (data.audit?.globalVerdict === "MOSTLY_FAITHFUL") {
      targets.push({ type: data.type, slug: data.slug });
    }
  }
  console.log(`MOSTLY_FAITHFUL pages to refine: ${targets.length}`);
  for (const t of targets) console.log(`  - ${t.type}/${t.slug}`);

  const startedAt = Date.now();
  const results = [];
  for (const page of targets) {
    try {
      const r = await refinePage(page);
      results.push(r);
    } catch (e) {
      console.log(`\n❌ ${page.type}/${page.slug}: ${e.message}`);
      results.push({ ...page, outcome: "ERROR", error: e.message });
      if (e.message.includes("Budget cap")) break;
    }
  }

  console.log(`\n══════════════════════════════════════════════════════════`);
  console.log(`SUMMARY`);
  console.log(`══════════════════════════════════════════════════════════`);
  for (const r of results) {
    const det = r.before && r.after ? `${r.before} → ${r.after} (${r.issuesFixed} issues)` : "";
    console.log(`  ${r.outcome.padEnd(16)} ${r.type}/${r.slug} ${det}`);
  }
  console.log(`\nTotal cost  : $${totalCost.toFixed(3)} (in=${totalTokens.input} out=${totalTokens.output} cacheR=${totalTokens.cacheRead})`);
  console.log(`Wall-clock  : ${((Date.now() - startedAt) / 1000).toFixed(0)}s`);
  console.log(`\nNext steps  :`);
  console.log(`  1. node scripts/migrate/promote-llm-extracts.mjs   # promote refined to TS data files`);
  console.log(`  2. node scripts/migrate/llm-audit-extracts.mjs     # re-audit refined pages`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
