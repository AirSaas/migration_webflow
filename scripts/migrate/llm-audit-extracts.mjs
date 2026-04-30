#!/usr/bin/env node
/**
 * llm-audit-extracts.mjs — Section-by-section QA audit of the Opus-extracted
 * data vs. the live airsaas.io page.
 *
 * For each page in docs/raw/llm-test/, fetches the live HTML, sends both the
 * extracted JSON and the live body to Opus, and asks for a verdict per section :
 *   OK | TRUNCATED | HALLUCINATED | MISSING_ON_LIVE | INCOMPLETE | WRONG_FIELDS
 *
 * Output : docs/raw/llm-audit/{slug}.json + docs/qa-llm-audit-report.md
 *
 * Cost estimate : ~$0.70/page × 26 pages ≈ $18
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "./llm-parse-shared.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");
const LLM_TEST_DIR = join(REPO_ROOT, "docs/raw/llm-test");
const OUT_DIR = join(REPO_ROOT, "docs/raw/llm-audit");
const REPORT_PATH = join(REPO_ROOT, "docs/qa-llm-audit-report.md");

const ENV = loadEnv();
const MODEL = "claude-opus-4-7";
const BUDGET_CAP_USD = 25;

// Live URL mapping (Webflow had different paths)
const LIVE_BASE = "https://www.airsaas.io";
function liveUrlFor(type, slug) {
  if (type === "lp") return `${LIVE_BASE}/fr/lp/${slug}`;
  if (type === "produit") return `${LIVE_BASE}/fr/produit/${slug}`;
  if (type === "solution") return `${LIVE_BASE}/fr/solution/${slug}`;
  if (type === "equipe") return `${LIVE_BASE}/fr/equipes/${slug}`;
  if (type === "blog") return `${LIVE_BASE}/fr/gestion-de-projet/${slug}`;
  return null;
}

// Pricing
const OPUS_INPUT = 15 / 1_000_000;
const OPUS_OUTPUT = 75 / 1_000_000;
const OPUS_CACHE_READ = 1.5 / 1_000_000;
const OPUS_CACHE_WRITE = 18.75 / 1_000_000;

let totalCost = 0;
let totalTokens = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 };

function fmt() {
  return `$${totalCost.toFixed(3)}`;
}

const ZWSP_RE = /[​‌‍⁠﻿]/g;

function cleanLiveHtml(html) {
  if (!html) return "";
  let body = html;
  const m = body.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (m) body = m[1];
  body = body.replace(/<svg\b[\s\S]*?<\/svg>/gi, "<svg/>");
  body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
  body = body.replace(/<style[\s\S]*?<\/style>/gi, "");
  body = body.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  body = body.replace(/<!--[\s\S]*?-->/g, "");
  body = body.replace(/\son[a-z]+="[^"]*"/gi, "");
  body = body.replace(/\sstyle="[^"]*"/gi, "");
  body = body.replace(/<nav\b[\s\S]*?<\/nav>/gi, "");
  body = body.replace(/<footer\b[\s\S]*?<\/footer>/gi, "");
  body = body.replace(ZWSP_RE, "");
  body = body.replace(/\s{2,}/g, " ").trim();
  return body.length > 80_000 ? body.slice(0, 80_000) + "<!-- TRUNCATED -->" : body;
}

const SYSTEM_PROMPT = `You are a senior QA reviewer auditing the FAITHFULNESS of an automated extraction
of a Webflow page (live airsaas.io) into a structured TypeScript data file
that will be rendered by a strict design system.

You receive :
1. The CLEANED LIVE HTML body of the original page (source of truth).
2. The EXTRACTED JSON output (sections array typed against the design system).

For each section in the extracted JSON, give a verdict :

- OK : section is faithful to live, content is complete and well-structured, fields are canonical.
- INCOMPLETE : section exists on live but extracted content is too short / missing pieces visible on live.
- TRUNCATED : extracted content is cut mid-sentence or ends with ":" + nothing.
- HALLUCINATED : section in extracted JSON does NOT exist on the live page.
- MISSING_ON_LIVE : extracted content was actually MISSING on live page (e.g. live had section heading but no body) — extraction faithfully reproduces this gap.
- WRONG_FIELDS : section type is wrong, or canonical fields (testimonial.name, stats.value+label, hero.title vs titleHighlight) are mis-assigned.
- WRONG_IMAGE : imageSrc points to an icon/SVG/logo instead of the real product mockup visible on live.

Also list section types from the live page that are MISSING from the extraction (sections present on live but not in extracted JSON).

Be strict but fair. The extraction goal is faithful reproduction of live, NOT live-correction.

ALWAYS invoke the audit_extraction tool. NEVER write prose.`;

const AUDIT_TOOL_SCHEMA = {
  type: "object",
  required: ["sections", "missingFromExtract", "globalVerdict"],
  properties: {
    sections: {
      type: "array",
      items: {
        type: "object",
        required: ["index", "type", "verdict"],
        properties: {
          index: { type: "integer" },
          type: { type: "string" },
          title: { type: "string" },
          verdict: {
            type: "string",
            enum: [
              "OK",
              "INCOMPLETE",
              "TRUNCATED",
              "HALLUCINATED",
              "MISSING_ON_LIVE",
              "WRONG_FIELDS",
              "WRONG_IMAGE",
            ],
          },
          note: { type: "string" },
        },
      },
    },
    missingFromExtract: {
      type: "array",
      items: {
        type: "object",
        required: ["liveSectionDescription"],
        properties: {
          liveSectionDescription: { type: "string" },
          suggestedType: { type: "string" },
        },
      },
    },
    globalVerdict: {
      type: "string",
      enum: ["FAITHFUL", "MOSTLY_FAITHFUL", "PARTIAL", "BROKEN"],
    },
    summary: { type: "string" },
  },
};

async function callOpus(systemPrompt, userMessage) {
  if (totalCost > BUDGET_CAP_USD) {
    throw new Error(`Budget cap $${BUDGET_CAP_USD} exceeded — current ${fmt()}`);
  }
  const body = {
    model: MODEL,
    max_tokens: 8000,
    system: systemPrompt,
    tools: [
      {
        name: "audit_extraction",
        description: "Audit the extracted JSON section-by-section vs the live HTML",
        input_schema: AUDIT_TOOL_SCHEMA,
        cache_control: { type: "ephemeral" },
      },
    ],
    tool_choice: { type: "tool", name: "audit_extraction" },
    messages: [{ role: "user", content: userMessage }],
  };

  // Simple retry on network errors
  let lastErr = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
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
        if (res.status >= 500 || res.status === 429) {
          lastErr = new Error(`Anthropic ${res.status}: ${t.slice(0, 200)}`);
          await new Promise((r) => setTimeout(r, 5000 * attempt));
          continue;
        }
        throw new Error(`Anthropic ${res.status}: ${t.slice(0, 300)}`);
      }
      const data = await res.json();
      const u = data.usage || {};
      totalTokens.input += u.input_tokens || 0;
      totalTokens.output += u.output_tokens || 0;
      totalTokens.cacheRead += u.cache_read_input_tokens || 0;
      totalTokens.cacheWrite += u.cache_creation_input_tokens || 0;
      totalCost +=
        (u.input_tokens || 0) * OPUS_INPUT +
        (u.output_tokens || 0) * OPUS_OUTPUT +
        (u.cache_read_input_tokens || 0) * OPUS_CACHE_READ +
        (u.cache_creation_input_tokens || 0) * OPUS_CACHE_WRITE;
      const tool = data.content?.find((c) => c.type === "tool_use");
      if (!tool) throw new Error(`No tool_use block, stop=${data.stop_reason}`);
      return tool.input;
    } catch (e) {
      lastErr = e;
      if (attempt < 3 && (e.message?.includes("fetch failed") || e.message?.includes("ECONNRESET"))) {
        await new Promise((r) => setTimeout(r, 5000 * attempt));
        continue;
      }
      throw e;
    }
  }
  throw lastErr;
}

async function fetchLive(type, slug) {
  const url = liveUrlFor(type, slug);
  if (!url) return null;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) return null;
    return cleanLiveHtml(await res.text());
  } catch (e) {
    return null;
  }
}

async function auditOne(file) {
  const data = JSON.parse(readFileSync(join(LLM_TEST_DIR, file), "utf8"));
  const { type, slug, result } = data;
  if (!result || !["lp", "produit", "solution", "equipe"].includes(type)) return null;
  console.log(`\n▶ ${type}/${slug}`);
  const live = await fetchLive(type, slug);
  if (!live) {
    console.log(`  ⚠ live fetch failed`);
    return { type, slug, error: "live fetch failed" };
  }
  console.log(`  live: ${(live.length / 1024).toFixed(0)} KB, extracted: ${result.sections?.length ?? 0} sections`);

  const userMsg = `Page: ${type}/${slug}

EXTRACTED JSON (the rebuild's typed data file content) :
\`\`\`json
${JSON.stringify(result, null, 2).slice(0, 30000)}
\`\`\`

LIVE HTML BODY (cleaned, source of truth) :
\`\`\`html
${live}
\`\`\`

Audit each extracted section vs the live HTML. Output via the audit_extraction tool.`;

  const t0 = Date.now();
  let audit;
  try {
    audit = await callOpus(SYSTEM_PROMPT, userMsg);
  } catch (e) {
    console.log(`  ✗ ${e.message}`);
    return { type, slug, error: e.message };
  }
  const dt = ((Date.now() - t0) / 1000).toFixed(1);

  const counts = { OK: 0, INCOMPLETE: 0, TRUNCATED: 0, HALLUCINATED: 0, MISSING_ON_LIVE: 0, WRONG_FIELDS: 0, WRONG_IMAGE: 0 };
  for (const s of audit.sections || []) counts[s.verdict] = (counts[s.verdict] || 0) + 1;
  console.log(
    `  ✓ ${dt}s ${audit.globalVerdict} — OK=${counts.OK} INCOMPLETE=${counts.INCOMPLETE} TRUNC=${counts.TRUNCATED} HALLUC=${counts.HALLUCINATED} MISSING_LIVE=${counts.MISSING_ON_LIVE} WRONG_FIELDS=${counts.WRONG_FIELDS} WRONG_IMG=${counts.WRONG_IMAGE} +${audit.missingFromExtract?.length ?? 0} missing — ${fmt()}`,
  );

  // Save raw
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(
    join(OUT_DIR, `${type}-${slug}.json`),
    JSON.stringify({ type, slug, audit }, null, 2),
  );
  return { type, slug, audit, counts };
}

async function main() {
  const startedAt = Date.now();
  const files = readdirSync(LLM_TEST_DIR).filter((f) => f.endsWith(".json") && !f.startsWith("_"));
  // Filter to landings only (lp/produit/solution/equipe), drop blog and explicit prefix duplicates
  const eligible = [];
  for (const f of files) {
    const d = JSON.parse(readFileSync(join(LLM_TEST_DIR, f), "utf8"));
    if (!d.result) continue;
    if (!["lp", "produit", "solution", "equipe"].includes(d.type)) continue;
    eligible.push(f);
  }
  console.log(`[audit] ${eligible.length} pages to audit. Budget cap : $${BUDGET_CAP_USD}`);

  const results = [];
  for (const f of eligible) {
    try {
      const r = await auditOne(f);
      if (r) results.push(r);
    } catch (e) {
      console.log(`  fatal : ${e.message}`);
      if (e.message.includes("Budget cap")) break;
    }
  }

  // ─── Markdown summary ───────────────────────────────────────────────────
  const lines = [
    "# QA audit — extraction Opus vs live (section-by-section)",
    "",
    `**Date** : ${new Date().toISOString()}`,
    `**Pages auditées** : ${results.length}`,
    `**Coût** : ${fmt()}`,
    "",
    "## Bilan global",
    "",
  ];

  const globalCounts = { FAITHFUL: 0, MOSTLY_FAITHFUL: 0, PARTIAL: 0, BROKEN: 0 };
  const sectionCounts = { OK: 0, INCOMPLETE: 0, TRUNCATED: 0, HALLUCINATED: 0, MISSING_ON_LIVE: 0, WRONG_FIELDS: 0, WRONG_IMAGE: 0 };
  let totalSections = 0;
  let totalMissing = 0;
  for (const r of results) {
    if (!r.audit) continue;
    globalCounts[r.audit.globalVerdict] = (globalCounts[r.audit.globalVerdict] || 0) + 1;
    for (const s of r.audit.sections || []) {
      sectionCounts[s.verdict] = (sectionCounts[s.verdict] || 0) + 1;
      totalSections++;
    }
    totalMissing += r.audit.missingFromExtract?.length || 0;
  }

  lines.push(`### Verdict pages`);
  for (const [k, v] of Object.entries(globalCounts)) lines.push(`- **${k}** : ${v}`);
  lines.push("");
  lines.push(`### Verdict sections (sur ${totalSections} sections extraites)`);
  for (const [k, v] of Object.entries(sectionCounts)) {
    if (v > 0) lines.push(`- **${k}** : ${v} (${((v / totalSections) * 100).toFixed(1)}%)`);
  }
  lines.push(`- **Sections manquantes** (présentes sur live, absentes du extract) : ${totalMissing} cumul`);
  lines.push("");

  lines.push(`## Détail par page`);
  lines.push("");
  lines.push(`| Page | Verdict | OK | Incomplete | Trunc | Halluc | Missing live | Wrong fields | Wrong img | Missing extract |`);
  lines.push(`|---|---|---|---|---|---|---|---|---|---|`);
  for (const r of results) {
    if (!r.audit) {
      lines.push(`| ${r.type}/${r.slug} | ERROR | | | | | | | | |`);
      continue;
    }
    const c = r.counts;
    lines.push(
      `| ${r.type}/${r.slug} | ${r.audit.globalVerdict} | ${c.OK} | ${c.INCOMPLETE} | ${c.TRUNCATED} | ${c.HALLUCINATED} | ${c.MISSING_ON_LIVE} | ${c.WRONG_FIELDS} | ${c.WRONG_IMAGE} | ${r.audit.missingFromExtract?.length ?? 0} |`,
    );
  }
  lines.push("");

  lines.push(`## Top issues par page`);
  lines.push("");
  for (const r of results) {
    if (!r.audit) continue;
    const issues = (r.audit.sections || []).filter((s) => s.verdict !== "OK" && s.verdict !== "MISSING_ON_LIVE");
    const missing = r.audit.missingFromExtract || [];
    if (!issues.length && !missing.length) continue;
    lines.push(`### ${r.type}/${r.slug} — ${r.audit.globalVerdict}`);
    if (r.audit.summary) lines.push(`*${r.audit.summary}*`);
    lines.push("");
    for (const s of issues.slice(0, 6)) {
      lines.push(`- [${s.verdict}] section[${s.index}] type=${s.type}${s.title ? ` "${s.title.slice(0, 50)}"` : ""} — ${s.note ?? ""}`);
    }
    for (const m of missing.slice(0, 4)) {
      lines.push(`- [MISSING_FROM_EXTRACT] ${m.liveSectionDescription}${m.suggestedType ? ` (suggested: ${m.suggestedType})` : ""}`);
    }
    lines.push("");
  }

  writeFileSync(REPORT_PATH, lines.join("\n"), "utf8");
  console.log(`\n[audit] DONE in ${((Date.now() - startedAt) / 1000).toFixed(0)}s — ${fmt()}`);
  console.log(`[audit] report : ${REPORT_PATH}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
