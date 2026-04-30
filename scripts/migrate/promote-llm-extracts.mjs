#!/usr/bin/env node
/**
 * promote-llm-extracts.mjs — Convert docs/raw/llm-test/{slug}.json into
 * canonical TS data files in src/data/landings-v2/.
 *
 * Strategy : promote pages where LLM extraction is RICHER (more sections OR
 * more types) than current. Keep current for REGRESSION pages.
 *
 * Output : updates src/data/landings-v2/{lp,produit,solutions,equipes}.ts
 *          with merged data (LLM where richer, current where regression).
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT, writeLandingsTsFile } from "./llm-parse-shared.mjs";

const LLM_DIR = join(REPO_ROOT, "docs/raw/llm-test");

const TYPE_FILES = {
  lp: "lp.ts",
  produit: "produit.ts",
  solution: "solutions.ts",
  equipe: "equipes.ts",
};

// Pages where LLM had FEWER sections — keep current data.
// (gestion-portefeuille-projet kept because despite -7 sections, types went 5→7)
const KEEP_CURRENT = new Set([
  "solution/outil-ppm",
  "solution/tableau-de-bord-dsi",
]);

function readDataFile(typeLabel) {
  const path = join(REPO_ROOT, "src/data/landings-v2", TYPE_FILES[typeLabel]);
  const txt = readFileSync(path, "utf8");
  const m = txt.match(/PAGES.*?=\s*(\[[\s\S]*?\])\s+as const/);
  if (!m) return [];
  return JSON.parse(m[1]);
}

function loadLlmBySlug() {
  const all = new Map();
  for (const file of readdirSync(LLM_DIR)) {
    if (!file.endsWith(".json") || file.startsWith("_")) continue;
    const data = JSON.parse(readFileSync(join(LLM_DIR, file), "utf8"));
    if (!data.result) continue;
    if (!["lp", "produit", "solution", "equipe"].includes(data.type)) continue;
    all.set(`${data.type}/${data.slug}`, data);
  }
  return all;
}

const llm = loadLlmBySlug();

let promoted = 0;
let kept = 0;

for (const [typeLabel, fileName] of Object.entries(TYPE_FILES)) {
  const currentPages = readDataFile(typeLabel);
  const finalPages = currentPages.map((curPage) => {
    const key = `${typeLabel}/${curPage.slug}`;
    if (KEEP_CURRENT.has(key)) {
      kept++;
      console.log(`  - keep current ${key} (regression)`);
      return curPage;
    }
    const llmEntry = llm.get(key);
    if (!llmEntry) {
      kept++;
      console.log(`  - keep current ${key} (no LLM data)`);
      return curPage;
    }
    const merged = {
      slug: curPage.slug,
      type: typeLabel,
      meta: llmEntry.result.meta || curPage.meta,
      sections: llmEntry.result.sections || curPage.sections,
    };
    promoted++;
    console.log(`  ✓ promote ${key} (${merged.sections.length} sections)`);
    return merged;
  });
  const outPath = join(REPO_ROOT, "src/data/landings-v2", fileName);
  writeLandingsTsFile(outPath, finalPages, typeLabel);
  console.log(`[write] ${fileName}`);
}

console.log(`\n[promote] DONE — ${promoted} pages promoted, ${kept} kept current`);
