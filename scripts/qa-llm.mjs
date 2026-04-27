#!/usr/bin/env node
/**
 * qa-llm.mjs — Phase 6.5 LLM-based QA per page.
 *
 * Sends each page's rendered body content to Claude Sonnet to detect
 * issues that regex/DOM checks cannot catch (semantic, layout sense,
 * brand consistency, copy quality).
 *
 * Pre-req: next dev on http://localhost:3000 + ANTHROPIC_API_KEY in env
 *
 * Usage:
 *   node scripts/qa-llm.mjs
 *   node scripts/qa-llm.mjs --slug=metier-pmo
 *   node scripts/qa-llm.mjs --type=blog --limit=10
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const REPORT_PATH = join(REPO_ROOT, "docs/qa-llm-report.md");
const REPORT_JSON = join(REPO_ROOT, "docs/raw/qa-llm.json");
const REBUILD_BASE = process.env.REBUILD_BASE || "http://localhost:3000";

// ─── Env ────────────────────────────────────────────────────────────────────

function loadEnv() {
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

const ENV = loadEnv();
const MODEL = "claude-sonnet-4-6";

// ─── Targets (same list as qa-page.mjs) ─────────────────────────────────────

const LP_SLUGS = ["ppm", "pmo", "capacity-planning", "pi-planning"];
const PRODUIT_SLUGS = [
  "automatiser-la-com-projet", "budget", "capacity-planning",
  "priorisation-par-equipes", "reporting-projet", "traduction-one-click-avec-deepl",
];
const SOLUTION_SLUGS = [
  "airsaas-et-les-experts-de-la-transfo", "flash-report", "flash-report-projet",
  "gestion-portefeuille-projet", "management-de-portefeuille-projet", "outil-ppm",
  "outils-de-pilotage-projet", "portfolio-management", "revue-de-portefeuille",
  "tableau-de-bord-dsi", "tableau-de-bord-gestion-de-projet",
  "tableau-de-bord-portefeuille-de-projet",
];
const EQUIPE_SLUGS = ["comite-direction", "direction-de-la-transformation", "it-et-operation", "outil-pmo"];

const TARGETS = [];
for (const slug of LP_SLUGS) TARGETS.push({ slug, type: "lp", url: `/fr/lp/${slug}` });
for (const slug of PRODUIT_SLUGS) TARGETS.push({ slug, type: "produit", url: `/fr/produit/${slug}` });
for (const slug of SOLUTION_SLUGS) TARGETS.push({ slug, type: "solution", url: `/fr/solutions/${slug}` });
for (const slug of EQUIPE_SLUGS) TARGETS.push({ slug, type: "equipe", url: `/fr/equipes/${slug}` });

const blogJson = JSON.parse(
  readFileSync(join(REPO_ROOT, "docs/raw/blog-articles-v2-content.json"), "utf8"),
);
for (const a of blogJson) {
  if (a.skip) continue;
  TARGETS.push({ slug: a.slug, type: "blog", url: `/fr/blog/${a.slug}` });
}

// ─── HTML extraction ─────────────────────────────────────────────────────────

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 qa-llm" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

function extractMainContent(html) {
  // Strip head, scripts, styles, noscript, comments
  let body = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || ["", html])[1];
  body = body
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  // Strip Next.js / React internal markup but keep semantic tags + text + class
  // Reduce by collapsing whitespace inside attributes
  body = body.replace(/\s{2,}/g, " ").trim();
  // Truncate to ~30 KB to keep prompt budget reasonable
  const MAX = 30_000;
  if (body.length > MAX) {
    body = body.slice(0, MAX) + "\n<!-- TRUNCATED -->";
  }
  return body;
}

// ─── LLM prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a senior frontend engineer + designer reviewing a Next.js page rebuild of an existing live website (airsaas.io). The rebuild uses a strict design system (Product Sans only, lavender/primary palette, no Webflow leftovers).

Your job: identify issues that would surprise a human reviewing this page. Focus on bugs that automated regex checks cannot catch.

Look for:
- Semantic content issues: empty/stub sections, copy that looks truncated mid-phrase, copy that doesn't fit the section purpose, mistranslations, awkward French
- Visual sense: heading sizes that look off for context, layout that looks broken even if HTML is valid, alignment issues
- Repetition / duplicates: same testimonial twice, same image many times in a row, same feature card repeated
- CTA quality: button labels that don't match the section purpose, vague CTAs, dead links
- Author/meta: placeholder names like "AirSaas" instead of real authors, missing dates, generic titles
- Brand consistency: competitor mentions out of place, typos in brand "AirSaas"
- Content structure: H1 missing, multiple H1, illogical heading hierarchy

DO NOT flag:
- DS-styling differences from live (the new DS is intentionally different)
- Heading downshift in blog body (intentional — blog body uses smaller H3)
- Subtle copy variations
- Acceptable French anglicisms (AirSaas brand uses some — "flash report", "PMO", "PPM")
- Publication dates as "future" (the rebuild may be reviewed at any time;
  past or future date in display does NOT mean the article is fabricated)
- Webflow source quirks the rebuild faithfully preserves: missing space
  inside <strong> tags ("enmultilingue"), CMS title artifacts already
  stripped, etc. — these are source content issues, not rebuild bugs.

Output STRICT JSON only. Format:
{
  "issues": [
    { "severity": "P0" | "P1" | "P2", "type": "content" | "typography" | "layout" | "functional" | "brand" | "structure", "location": "section title or selector hint", "description": "1-2 sentence explanation" }
  ]
}

Severity:
- P0: Blocking — user-visible bug, ship interdit
- P1: Visible bug — should fix before ship
- P2: Polish — backlog acceptable

Max 8 issues per page. Focus on what matters. If no issues, return { "issues": [] }.`;

function buildUserPrompt(target, mainContent) {
  return `Page: ${target.type}/${target.slug}
Live URL: https://www.airsaas.io${target.type === "blog" ? "/fr/gestion-de-projet/" : `/fr/${target.type === "solution" ? "solution" : target.type === "lp" ? "lp" : target.type === "equipe" ? "equipes" : "produit"}/`}${target.slug}
Rebuild URL: ${REBUILD_BASE}${target.url}

Rebuild HTML body (truncated if > 30KB):
\`\`\`html
${mainContent}
\`\`\`

Review this page and return a JSON list of issues per the system prompt.`;
}

async function callClaude(target, mainContent) {
  const body = {
    model: MODEL,
    max_tokens: 2000,
    system: [
      { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
    ],
    messages: [{ role: "user", content: buildUserPrompt(target, mainContent) }],
  };
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ENV.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Anthropic ${res.status}: ${t.slice(0, 200)}`);
  }
  const data = await res.json();
  const text = data.content?.[0]?.text || "";
  // Parse JSON (model may wrap in code fence)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return { issues: [], parseError: "no JSON in response" };
  }
  try {
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    return { issues: [], parseError: `invalid JSON: ${e.message}` };
  }
}

// ─── Worker pool ────────────────────────────────────────────────────────────

async function processTarget(target) {
  const url = REBUILD_BASE + target.url;
  let html;
  try {
    html = await fetchHtml(url);
  } catch (err) {
    return { ...target, error: `fetch fail: ${err.message}`, issues: [] };
  }
  const main = extractMainContent(html);
  try {
    const result = await callClaude(target, main);
    return { ...target, issues: result.issues || [], parseError: result.parseError };
  } catch (err) {
    return { ...target, error: `LLM fail: ${err.message}`, issues: [] };
  }
}

async function runConcurrent(targets, concurrency = 4) {
  const queue = [...targets];
  const results = [];
  let processed = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length > 0) {
      const t = queue.shift();
      const startedAt = Date.now();
      const r = await processTarget(t);
      const took = ((Date.now() - startedAt) / 1000).toFixed(1);
      results.push(r);
      processed += 1;
      const counts = countSev(r.issues);
      const flag = r.error
        ? "ERR"
        : counts.P0 > 0
        ? "BLOCK"
        : counts.P1 > 2
        ? "WARN"
        : "PASS";
      console.log(
        `  [${processed}/${targets.length}] ${flag} ${t.type}/${t.slug} P0=${counts.P0} P1=${counts.P1} P2=${counts.P2} (${took}s) ${r.error || ""}`,
      );
    }
  });
  await Promise.all(workers);
  return results;
}

function countSev(issues) {
  const c = { P0: 0, P1: 0, P2: 0 };
  for (const i of issues || []) {
    c[i.severity] = (c[i.severity] || 0) + 1;
  }
  return c;
}

// ─── Report ─────────────────────────────────────────────────────────────────

function buildReport(results) {
  let totP0 = 0, totP1 = 0, totP2 = 0;
  let blocking = 0, warn = 0, pass = 0, err = 0;
  for (const r of results) {
    if (r.error) {
      err += 1;
      continue;
    }
    const c = countSev(r.issues);
    totP0 += c.P0;
    totP1 += c.P1;
    totP2 += c.P2;
    if (c.P0 > 0) blocking += 1;
    else if (c.P1 > 2) warn += 1;
    else pass += 1;
  }

  let md = `# QA report — LLM (qa-llm.mjs)\n\n`;
  md += `**Date** : ${new Date().toISOString()}\n`;
  md += `**Model** : ${MODEL}\n\n`;
  md += `**Total** : ${results.length} pages — **${pass} PASS** / ${warn} WARN / ${blocking} BLOCK / ${err} ERR\n\n`;
  md += `**Severity totals** : P0 = ${totP0}, P1 = ${totP1}, P2 = ${totP2}\n\n`;

  // BLOCKED pages first
  const blocked = results.filter((r) => !r.error && countSev(r.issues).P0 > 0);
  if (blocked.length > 0) {
    md += `## P0 issues — must fix before ship\n\n`;
    for (const r of blocked) {
      md += `### \`${r.type}/${r.slug}\`\n\n`;
      for (const i of r.issues.filter((x) => x.severity === "P0")) {
        md += `- **${i.type} @ ${i.location}** : ${i.description}\n`;
      }
      md += "\n";
    }
  }

  // P1 patterns
  md += `## P1 issues by page\n\n`;
  for (const r of results) {
    if (r.error) continue;
    const p1s = r.issues.filter((i) => i.severity === "P1");
    if (p1s.length === 0) continue;
    md += `### \`${r.type}/${r.slug}\`\n`;
    for (const i of p1s) {
      md += `- **${i.type}** @ ${i.location} : ${i.description}\n`;
    }
    md += "\n";
  }

  // All pages summary
  md += `## All pages\n\n`;
  md += `| Slug | Type | Status | P0 | P1 | P2 | Note |\n|---|---|---|---|---|---|---|\n`;
  const sorted = [...results].sort((a, b) => {
    const ca = countSev(a.issues), cb = countSev(b.issues);
    return cb.P0 - ca.P0 || cb.P1 - ca.P1;
  });
  for (const r of sorted) {
    if (r.error) {
      md += `| \`${r.slug}\` | ${r.type} | ERR | — | — | — | ${r.error} |\n`;
      continue;
    }
    const c = countSev(r.issues);
    const st = c.P0 > 0 ? "BLOCK" : c.P1 > 2 ? "WARN" : "PASS";
    const note = r.parseError ? `parse: ${r.parseError}` : "";
    md += `| \`${r.slug}\` | ${r.type} | ${st} | ${c.P0} | ${c.P1} | ${c.P2} | ${note} |\n`;
  }

  return md;
}

// ─── Main ───────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { type: null, slug: null, limit: null };
  for (const a of args) {
    if (a.startsWith("--type=")) opts.type = a.slice(7);
    else if (a.startsWith("--slug=")) opts.slug = a.slice(7);
    else if (a.startsWith("--limit=")) opts.limit = parseInt(a.slice(8), 10);
  }
  return opts;
}

async function main() {
  const opts = parseArgs();
  let targets = TARGETS;
  if (opts.type) targets = targets.filter((t) => t.type === opts.type);
  if (opts.slug) targets = targets.filter((t) => t.slug === opts.slug);
  if (opts.limit) targets = targets.slice(0, opts.limit);

  console.log(`[qa-llm] target count = ${targets.length}, model = ${MODEL}`);

  const startedAt = Date.now();
  const results = await runConcurrent(targets, 4);
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);

  const totals = results.reduce(
    (acc, r) => {
      const c = countSev(r.issues);
      acc.P0 += c.P0;
      acc.P1 += c.P1;
      return acc;
    },
    { P0: 0, P1: 0 },
  );
  const blocking = results.filter((r) => !r.error && countSev(r.issues).P0 > 0).length;
  console.log(
    `\n[qa-llm] DONE in ${elapsed}s — P0 total = ${totals.P0}, blocking pages = ${blocking}`,
  );

  mkdirSync(dirname(REPORT_PATH), { recursive: true });
  mkdirSync(dirname(REPORT_JSON), { recursive: true });
  writeFileSync(REPORT_PATH, buildReport(results), "utf8");
  writeFileSync(REPORT_JSON, JSON.stringify(results, null, 2), "utf8");
  console.log(`[qa-llm] report → ${REPORT_PATH}`);

  process.exit(blocking > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
