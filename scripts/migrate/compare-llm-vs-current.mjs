#!/usr/bin/env node
/**
 * compare-llm-vs-current.mjs — Compare each page in docs/raw/llm-test/ against
 * the current data file in src/data/landings-v2/. Output a diff report so we
 * can decide which pages to promote.
 *
 * Output : docs/llm-vs-current-report.md
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT } from "./llm-parse-shared.mjs";

const LLM_DIR = join(REPO_ROOT, "docs/raw/llm-test");
const TYPE_FILES = {
  lp: "lp.ts",
  produit: "produit.ts",
  solution: "solutions.ts",
  equipe: "equipes.ts",
};

function readDataFile(typeLabel) {
  const path = join(REPO_ROOT, "src/data/landings-v2", TYPE_FILES[typeLabel]);
  const txt = readFileSync(path, "utf8");
  const m = txt.match(/PAGES.*?=\s*(\[[\s\S]*?\])\s+as const/);
  if (!m) return [];
  return JSON.parse(m[1]);
}

function loadCurrentBySlug() {
  const all = new Map();
  for (const [type, _file] of Object.entries(TYPE_FILES)) {
    const pages = readDataFile(type);
    for (const p of pages) all.set(`${type}/${p.slug}`, p);
  }
  return all;
}

function loadLlmBySlug() {
  const all = new Map();
  for (const file of readdirSync(LLM_DIR)) {
    if (!file.endsWith(".json") || file.startsWith("_")) continue;
    const data = JSON.parse(readFileSync(join(LLM_DIR, file), "utf8"));
    if (!data.result) continue;
    all.set(`${data.type}/${data.slug}`, data);
  }
  return all;
}

const current = loadCurrentBySlug();
const llm = loadLlmBySlug();

const lines = [
  "# LLM (Opus) vs current data — diff report",
  "",
  `**Date** : ${new Date().toISOString()}`,
  "",
  "Pages où l'extraction Opus a plus de sections / types de sections que le parser regex actuel = candidats pour promote.",
  "",
  "| Page | Current sections | LLM sections | Δ sections | Current types | LLM types | Δ types | Outcome |",
  "|---|---|---|---|---|---|---|---|",
];

const summary = { promoteCandidates: 0, regressions: 0, equal: 0, llmOnly: 0 };

for (const [key, llmData] of [...llm.entries()].sort()) {
  const cur = current.get(key);
  const llmSections = llmData.result.sections || [];
  const llmTypes = new Set(llmSections.map((s) => s.type));
  let curSections = [];
  let curTypes = new Set();
  if (cur) {
    curSections = cur.sections || [];
    curTypes = new Set(curSections.map((s) => s.type));
  } else {
    summary.llmOnly++;
  }
  const dSections = llmSections.length - curSections.length;
  const dTypes = llmTypes.size - curTypes.size;
  let outcome = "EQUAL";
  if (dSections > 0 || dTypes > 0) {
    outcome = "LLM-RICHER";
    summary.promoteCandidates++;
  } else if (dSections < 0 || dTypes < 0) {
    outcome = "REGRESSION";
    summary.regressions++;
  } else {
    summary.equal++;
  }
  lines.push(
    `| ${key} | ${curSections.length} | ${llmSections.length} | ${dSections >= 0 ? "+" : ""}${dSections} | ${curTypes.size} (${[...curTypes].slice(0, 4).join(", ")}${curTypes.size > 4 ? "…" : ""}) | ${llmTypes.size} (${[...llmTypes].slice(0, 6).join(", ")}${llmTypes.size > 6 ? "…" : ""}) | ${dTypes >= 0 ? "+" : ""}${dTypes} | ${outcome} |`,
  );
}

lines.push("");
lines.push("## Summary");
lines.push("");
lines.push(`- LLM-RICHER (more sections OR more types) : **${summary.promoteCandidates}**`);
lines.push(`- EQUAL : ${summary.equal}`);
lines.push(`- REGRESSION (LLM has less) : ${summary.regressions}`);
lines.push("");

const outPath = join(REPO_ROOT, "docs/llm-vs-current-report.md");
writeFileSync(outPath, lines.join("\n"), "utf8");
console.log(`[compare] ${llm.size} pages compared`);
console.log(
  `  promote candidates : ${summary.promoteCandidates}, equal : ${summary.equal}, regressions : ${summary.regressions}`,
);
console.log(`  report : ${outPath}`);
