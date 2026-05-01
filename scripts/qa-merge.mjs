#!/usr/bin/env node
/**
 * qa-merge.mjs — Merge regex + LLM QA reports into a single combined report.
 *
 * Reads docs/raw/qa-page.json and docs/raw/qa-llm.json, fuses them per slug,
 * outputs docs/qa-combined-report.md.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const REGEX_JSON = join(REPO_ROOT, "docs/raw/qa-page.json");
const LLM_JSON = join(REPO_ROOT, "docs/raw/qa-llm.json");
const OUT = join(REPO_ROOT, "docs/qa-combined-report.md");

if (!existsSync(REGEX_JSON) || !existsSync(LLM_JSON)) {
  console.error("Missing input — run qa-page.mjs and qa-llm.mjs first.");
  process.exit(1);
}

const regex = JSON.parse(readFileSync(REGEX_JSON, "utf8"));
const llm = JSON.parse(readFileSync(LLM_JSON, "utf8"));

function key(r) {
  return `${r.type}::${r.slug}`;
}

const merged = new Map();
for (const r of regex) {
  merged.set(key(r), {
    slug: r.slug,
    type: r.type,
    regex: r.issues || [],
    llm: [],
    llmError: null,
  });
}
for (const r of llm) {
  const k = key(r);
  if (!merged.has(k)) {
    merged.set(k, { slug: r.slug, type: r.type, regex: [], llm: r.issues || [], llmError: r.error });
  } else {
    merged.get(k).llm = r.issues || [];
    merged.get(k).llmError = r.error || null;
  }
}

function countSev(issues) {
  const c = { P0: 0, P1: 0, P2: 0 };
  for (const i of issues || []) c[i.severity] = (c[i.severity] || 0) + 1;
  return c;
}

function status(entry) {
  const r = countSev(entry.regex);
  const l = countSev(entry.llm);
  const totalP0 = r.P0 + l.P0;
  const totalP1 = r.P1 + l.P1;
  if (totalP0 > 0) return "BLOCK";
  if (totalP1 > 4) return "WARN";
  return "PASS";
}

const all = Array.from(merged.values());
let block = 0, warn = 0, pass = 0;
let totRegexP0 = 0, totRegexP1 = 0, totLlmP0 = 0, totLlmP1 = 0;
const byType = {};
for (const e of all) {
  const s = status(e);
  if (s === "BLOCK") block += 1;
  else if (s === "WARN") warn += 1;
  else pass += 1;
  const r = countSev(e.regex), l = countSev(e.llm);
  totRegexP0 += r.P0;
  totRegexP1 += r.P1;
  totLlmP0 += l.P0;
  totLlmP1 += l.P1;
  if (!byType[e.type]) byType[e.type] = { total: 0, block: 0, warn: 0, pass: 0 };
  byType[e.type].total += 1;
  byType[e.type][s.toLowerCase()] += 1;
}

let md = `# QA combined report — regex + LLM\n\n`;
md += `**Date** : ${new Date().toISOString()}\n\n`;
md += `**Total** : ${all.length} pages — **${pass} PASS** / ${warn} WARN / ${block} BLOCK\n\n`;
md += `**Severity totals** :\n`;
md += `- Regex : P0 = ${totRegexP0}, P1 = ${totRegexP1}\n`;
md += `- LLM : P0 = ${totLlmP0}, P1 = ${totLlmP1}\n\n`;

md += `## Stats by type\n\n`;
md += `| Type | Total | PASS | WARN | BLOCK |\n|---|---|---|---|---|\n`;
for (const [t, s] of Object.entries(byType)) {
  md += `| ${t} | ${s.total} | ${s.pass} | ${s.warn} | ${s.block} |\n`;
}

const blocked = all.filter((e) => status(e) === "BLOCK");
if (blocked.length > 0) {
  md += `\n## P0 issues — must fix before ship\n\n`;
  for (const e of blocked) {
    md += `### \`${e.type}/${e.slug}\`\n\n`;
    for (const i of e.regex.filter((x) => x.severity === "P0")) {
      md += `- **REGEX** ${i.check} : ${i.details}\n`;
    }
    for (const i of e.llm.filter((x) => x.severity === "P0")) {
      md += `- **LLM** ${i.type} @ ${i.location} : ${i.description}\n`;
    }
    md += "\n";
  }
}

md += `\n## All pages\n\n`;
md += `| Slug | Type | Status | Regex P0 | Regex P1 | LLM P0 | LLM P1 |\n|---|---|---|---|---|---|---|\n`;
const sorted = [...all].sort((a, b) => {
  const sa = status(a), sb = status(b);
  if (sa !== sb) return sa === "BLOCK" ? -1 : sb === "BLOCK" ? 1 : sa === "WARN" ? -1 : 1;
  return 0;
});
for (const e of sorted) {
  const r = countSev(e.regex), l = countSev(e.llm);
  md += `| \`${e.slug}\` | ${e.type} | ${status(e)} | ${r.P0} | ${r.P1} | ${l.P0} | ${l.P1} |\n`;
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, md, "utf8");
console.log(`[qa-merge] ${all.length} pages — PASS=${pass} WARN=${warn} BLOCK=${block}`);
console.log(`[qa-merge] report → ${OUT}`);
process.exit(block > 0 ? 1 : 0);
