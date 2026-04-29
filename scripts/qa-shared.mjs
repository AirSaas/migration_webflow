/**
 * qa-shared.mjs — Shared targets list + utilities for QA scripts.
 *
 * Single source of truth for the 88 rebuild pages (26 landings + 62 blogs).
 * Used by: qa-lighthouse, qa-links, qa-visual-diff, qa-go-no-go.
 *
 * The existing qa-page.mjs / qa-llm.mjs / verify-rebuild.mjs duplicate this
 * list inline — leaving them alone to avoid touching working scripts.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = join(__dirname, "..");
export const REBUILD_BASE = process.env.REBUILD_BASE || "http://localhost:3000";
export const LIVE_BASE = "https://www.airsaas.io";

const LP_SLUGS = ["ppm", "pmo", "capacity-planning", "pi-planning"];
const PRODUIT_SLUGS = [
  "automatiser-la-com-projet",
  "budget",
  "capacity-planning",
  "priorisation-par-equipes",
  "reporting-projet",
  "traduction-one-click-avec-deepl",
];
const SOLUTION_SLUGS = [
  "airsaas-et-les-experts-de-la-transfo",
  "flash-report",
  "flash-report-projet",
  "gestion-portefeuille-projet",
  "management-de-portefeuille-projet",
  "outil-ppm",
  "outils-de-pilotage-projet",
  "portfolio-management",
  "revue-de-portefeuille",
  "tableau-de-bord-dsi",
  "tableau-de-bord-gestion-de-projet",
  "tableau-de-bord-portefeuille-de-projet",
];
const EQUIPE_SLUGS = [
  "comite-direction",
  "direction-de-la-transformation",
  "it-et-operation",
  "outil-pmo",
];

export function getAllTargets() {
  const out = [];
  for (const slug of LP_SLUGS) out.push({ slug, type: "lp", path: `/fr/lp/${slug}` });
  for (const slug of PRODUIT_SLUGS) out.push({ slug, type: "produit", path: `/fr/produit/${slug}` });
  for (const slug of SOLUTION_SLUGS) out.push({ slug, type: "solution", path: `/fr/solutions/${slug}` });
  for (const slug of EQUIPE_SLUGS) out.push({ slug, type: "equipe", path: `/fr/equipes/${slug}` });
  const blogJson = JSON.parse(
    readFileSync(join(REPO_ROOT, "docs/raw/blog-articles-v2-content.json"), "utf8"),
  );
  for (const a of blogJson) {
    if (a.skip) continue;
    out.push({ slug: a.slug, type: "blog", path: `/fr/blog/${a.slug}` });
  }
  return out;
}

export function parseArgs(argv) {
  const args = { slug: null, type: null, limit: null, sample: null, mode: null };
  for (const a of argv.slice(2)) {
    if (a.startsWith("--slug=")) args.slug = a.slice(7);
    else if (a.startsWith("--type=")) args.type = a.slice(7);
    else if (a.startsWith("--limit=")) args.limit = parseInt(a.slice(8), 10);
    else if (a.startsWith("--sample=")) args.sample = parseInt(a.slice(9), 10);
    else if (a.startsWith("--mode=")) args.mode = a.slice(7);
  }
  return args;
}

export function filterTargets(targets, args) {
  let out = targets;
  if (args.slug) out = out.filter((t) => t.slug === args.slug);
  if (args.type) out = out.filter((t) => t.type === args.type);
  if (args.limit) out = out.slice(0, args.limit);
  return out;
}

/** Pick a stratified sample : ~N pages, balanced across types. */
export function stratifiedSample(targets, n) {
  const byType = new Map();
  for (const t of targets) {
    if (!byType.has(t.type)) byType.set(t.type, []);
    byType.get(t.type).push(t);
  }
  const types = [...byType.keys()];
  const perType = Math.max(1, Math.floor(n / types.length));
  const out = [];
  for (const type of types) {
    const list = byType.get(type);
    const step = Math.max(1, Math.floor(list.length / perType));
    for (let i = 0; i < list.length && out.filter((x) => x.type === type).length < perType; i += step) {
      out.push(list[i]);
    }
  }
  return out;
}

export const PAGE_BUDGET_MS = 60000;
