#!/usr/bin/env node
/**
 * run-pipeline.mjs — Orchestrator for the Convergent Page Pipeline (CPP).
 *
 * Stages :
 *   1. Extract       (Opus + extended schema + anti-halluc + image-context)
 *   2. Verify        (deterministic ground-truth + flag FABRICATED)
 *   3. Audit         (LLM section-by-section verdict)
 *   4. Refine (1×)   (Opus re-call with audit + verify feedback)
 *   5. Renderer DS   (deterministic frame/variant/style audit on data files)
 *   6. Designer gate (FLAGGED list to docs/qa-flagged.md for human review)
 *
 * Run :
 *   node scripts/migrate/run-pipeline.mjs                       # all 26 landings
 *   node scripts/migrate/run-pipeline.mjs --slug=ppm            # one page
 *   node scripts/migrate/run-pipeline.mjs --type=lp             # one type
 *   node scripts/migrate/run-pipeline.mjs --skip-extract        # only verify+audit on existing extracts
 *   node scripts/migrate/run-pipeline.mjs --type=blog           # 62 blogs
 *   node scripts/migrate/run-pipeline.mjs --detect-changes      # only pages whose Supabase row changed since last run
 *
 * Output :
 *   - docs/raw/llm-test/{type}-{slug}.json (extract)
 *   - docs/raw/llm-verify/{type}-{slug}.json (verify flags)
 *   - docs/raw/llm-audit/{type}-{slug}.json (audit verdicts)
 *   - docs/qa-renderer-ds.md (renderer audit)
 *   - docs/qa-flagged.md (designer gate input)
 *   - docs/raw/llm-pipeline/_summary.json (run metadata)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { REPO_ROOT } from "./llm-parse-shared.mjs";

const args = process.argv.slice(2);
const slugFilter = args.find((a) => a.startsWith("--slug="))?.slice(7);
const typeFilter = args.find((a) => a.startsWith("--type="))?.slice(7);
const skipExtract = args.includes("--skip-extract");
const detectChanges = args.includes("--detect-changes");

const PIPELINE_DIR = join(REPO_ROOT, "docs/raw/llm-pipeline");
if (!existsSync(PIPELINE_DIR)) mkdirSync(PIPELINE_DIR, { recursive: true });

function step(label) {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`▶ ${label}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

function run(cmd, ...args) {
  console.log(`$ ${cmd} ${args.join(" ")}`);
  const r = spawnSync(cmd, args, { stdio: "inherit", cwd: REPO_ROOT });
  if (r.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} exited ${r.status}`);
  }
}

function tryRun(cmd, ...args) {
  console.log(`$ ${cmd} ${args.join(" ")}`);
  const r = spawnSync(cmd, args, { stdio: "inherit", cwd: REPO_ROOT });
  return r.status;
}

const filterArgs = [];
if (slugFilter) filterArgs.push(`--slug=${slugFilter}`);
if (typeFilter) filterArgs.push(`--type=${typeFilter}`);

// ─── Stage 1 — Extract ────────────────────────────────────────────────────

if (!skipExtract) {
  step("Stage 1 — Extract via Opus");
  run("node", "scripts/migrate/test-llm-extract.mjs", ...filterArgs);
} else {
  console.log("(--skip-extract set, reusing existing docs/raw/llm-test/*.json)");
}

// ─── Stage 2 — Verify ground-truth ────────────────────────────────────────

step("Stage 2 — Verify ground-truth");
run("node", "scripts/migrate/verify-ground-truth.mjs", ...filterArgs);

// Read flags to decide which pages need refine
const verifyDir = join(REPO_ROOT, "docs/raw/llm-verify");
const flagged = new Set();
if (existsSync(verifyDir)) {
  for (const f of readdirSync(verifyDir).filter((x) => x.endsWith(".json"))) {
    const v = JSON.parse(readFileSync(join(verifyDir, f), "utf8"));
    if (v.flagsCount > 0) flagged.add(`${v.type}/${v.slug}`);
  }
}
console.log(`  → ${flagged.size} pages with FABRICATED flags`);

// ─── Stage 3 — LLM audit ──────────────────────────────────────────────────

step("Stage 3 — LLM section-by-section audit");
tryRun("node", "scripts/migrate/llm-audit-extracts.mjs");

// ─── Stage 4 — Refine (1 retry max) ───────────────────────────────────────

step("Stage 4 — Refine MOSTLY_FAITHFUL pages (audit feedback)");
tryRun("node", "scripts/migrate/refine-llm-extracts.mjs");

// ─── Stage 5 — Renderer DS audit ──────────────────────────────────────────

step("Stage 5 — Renderer DS audit");
tryRun("node", "scripts/qa-renderer-ds.mjs");

// ─── Stage 6 — Designer gate ──────────────────────────────────────────────

step("Stage 6 — Designer gate (build qa-flagged.md)");
const auditDir = join(REPO_ROOT, "docs/raw/llm-audit");
const designerLines = [
  "# Designer gate — pages flaggées",
  "",
  `**Date** : ${new Date().toISOString()}`,
  "",
  "Pages qui requièrent une review humaine. Pour chaque page :",
  "- ✅ **Approve** si le rendu rebuild Vercel matche le live (au DS près)",
  "- ❌ **Reject + comment** si quelque chose cloche (qui pourra revenir en feedback Opus)",
  "",
  "| Page | Verify flags | Audit verdict | Lien rebuild | Lien live |",
  "|---|---|---|---|---|",
];
const PROD_BASE = "https://website-airsaas.vercel.app";
const LIVE_BASE = "https://www.airsaas.io";
function liveUrlFor(type, slug) {
  if (type === "lp") return `${LIVE_BASE}/fr/lp/${slug}`;
  if (type === "produit") return `${LIVE_BASE}/fr/produit/${slug}`;
  if (type === "solution") return `${LIVE_BASE}/fr/solution/${slug}`;
  if (type === "equipe") return `${LIVE_BASE}/fr/equipes/${slug}`;
  if (type === "blog") return `${LIVE_BASE}/fr/gestion-de-projet/${slug}`;
  return null;
}
function rebuildUrlFor(type, slug) {
  if (type === "lp") return `${PROD_BASE}/fr/lp/${slug}`;
  if (type === "produit") return `${PROD_BASE}/fr/produit/${slug}`;
  if (type === "solution") return `${PROD_BASE}/fr/solution/${slug}`;
  if (type === "equipe") return `${PROD_BASE}/fr/equipes/${slug}`;
  if (type === "blog") return `${PROD_BASE}/fr/blog/${slug}`;
  return null;
}

const flaggedPages = [];
if (existsSync(auditDir)) {
  for (const f of readdirSync(auditDir).filter((x) => x.endsWith(".json"))) {
    const a = JSON.parse(readFileSync(join(auditDir, f), "utf8"));
    const verdict = a.audit?.globalVerdict;
    if (verdict !== "FAITHFUL") {
      const verifyPath = join(verifyDir, f);
      const verifyFlags = existsSync(verifyPath)
        ? JSON.parse(readFileSync(verifyPath, "utf8")).flagsCount
        : 0;
      flaggedPages.push({
        type: a.type,
        slug: a.slug,
        verdict,
        verifyFlags,
      });
    }
  }
}
flaggedPages.sort((a, b) => (a.verifyFlags || 0) > (b.verifyFlags || 0) ? -1 : 1);
for (const p of flaggedPages) {
  designerLines.push(
    `| \`${p.type}/${p.slug}\` | ${p.verifyFlags} | ${p.verdict} | [Rebuild](${rebuildUrlFor(p.type, p.slug)}) | [Live](${liveUrlFor(p.type, p.slug)}) |`,
  );
}
designerLines.push("");
designerLines.push(`**Total flaggées** : ${flaggedPages.length}`);

writeFileSync(join(REPO_ROOT, "docs/qa-flagged.md"), designerLines.join("\n"), "utf8");
console.log(`  → ${flaggedPages.length} pages flaggées (docs/qa-flagged.md)`);

// ─── Final summary ────────────────────────────────────────────────────────

const summary = {
  startedAt: new Date().toISOString(),
  args: { slugFilter, typeFilter, skipExtract, detectChanges },
  flaggedCount: flaggedPages.length,
  flagged: flaggedPages.map((p) => `${p.type}/${p.slug}`),
};
writeFileSync(join(PIPELINE_DIR, "_summary.json"), JSON.stringify(summary, null, 2), "utf8");

console.log(`\n══════════════════════════════════════════════════════════`);
console.log(`PIPELINE DONE`);
console.log(`══════════════════════════════════════════════════════════`);
console.log(`Pages flaggées (designer gate) : ${flaggedPages.length}`);
console.log(`  → docs/qa-flagged.md`);
console.log(`Summary : ${join(PIPELINE_DIR, "_summary.json").replace(REPO_ROOT + "/", "")}`);
