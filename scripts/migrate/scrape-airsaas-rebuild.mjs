#!/usr/bin/env node
/**
 * scrape-airsaas-rebuild.mjs
 *
 * Phase 1 of Option B rebuild — fresh scrape of 88 airsaas.io pages
 * (26 landings + 62 blog) into Supabase `airsaas_pages_rebuild`.
 *
 * Backend: Cloudflare Browser Rendering /scrape (renders JS, returns HTML).
 *
 * Usage:
 *   node scripts/migrate/scrape-airsaas-rebuild.mjs
 *   node scripts/migrate/scrape-airsaas-rebuild.mjs --only=lp,produit
 *   node scripts/migrate/scrape-airsaas-rebuild.mjs --slug=metier-pmo
 *   node scripts/migrate/scrape-airsaas-rebuild.mjs --retry-failed
 *
 * Requires (.env.local):
 *   CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN
 *   SUPABASE_URL, SUPABASE_ANON_KEY
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");
const LOG_FILE = join(REPO_ROOT, "docs/raw/scrape-log.txt");

// ─── Env loading ─────────────────────────────────────────────────────────────

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
  for (const k of [
    "CLOUDFLARE_ACCOUNT_ID",
    "CLOUDFLARE_API_TOKEN",
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
  ]) {
    if (!env[k]) {
      console.error(`ERROR: ${k} missing in .env.local`);
      process.exit(1);
    }
  }
  return env;
}

const ENV = loadEnv();

// ─── URL list (88 pages = 26 landings + 62 blog) ─────────────────────────────

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

const BLOG_SLUGS = [
  "10-pratiques-pour-developper-la-relation-de-confiance-dg-cio",
  "analyse-des-risques-projet",
  "appel-doffres-et-evaluation-dune-solution-ppm-project-portfolio-management",
  "budget-previsionnel-projet",
  "budgetiser-un-projet-sans-se-louper",
  "cadrage-projet",
  "capacity-planning",
  "capacity-planning-definition",
  "chef-de-projet-pmo",
  "chef-de-projet-transverse",
  "comite-de-pilotage-definitions-et-incomprehensions",
  "comite-pilotage-projet",
  "comment-animer-un-bilan-projet-efficace",
  "comment-animer-un-comite-de-pilotage",
  "comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022",
  "comment-decider-en-copil",
  "comment-elaborer-un-reporting-efficace",
  "comment-faire-un-bon-point-davancement-projet",
  "comment-gerer-lagressivite-dans-les-comites-de-pilotage",
  "comment-mettre-en-place-un-comite-de-pilotage",
  "comment-mettre-en-place-un-pmo",
  "comment-mettre-une-bonne-meteo-projet",
  "comment-reussir-un-projet-transverse",
  "copil-projet-ou-comite-de-pilotage-projet-les-bases",
  "demarche-de-projet",
  "fiche-projet-exemple-et-methodologie",
  "gestion-de-portefeuille-projet-pme",
  "gestion-portefeuille-projets-vs-gestion-de-projet",
  "jalon-projet",
  "kanban-gestion-de-projet",
  "kpi-gestion-de-projet",
  "la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0",
  "la-revue-de-projet",
  "le-diagramme-de-gantt-comment-sen-servir",
  "le-grand-guide-de-la-conduite-de-projet",
  "le-guide-du-mode-projet",
  "le-modele-de-presentation-pour-votre-comite-de-pilotage",
  "le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation",
  "le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes",
  "lean-portfolio-management",
  "les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet",
  "macro-planning",
  "management-de-portefeuille-de-projet",
  "metier-pmo",
  "pi-planning",
  "pi-safe",
  "pilotage-de-projet",
  "plan-capacitaire",
  "plan-de-communication-projet",
  "planification-de-la-capacite",
  "planification-de-la-demande-capacity-planning",
  "portefeuille-projet",
  "pourquoi-mettre-en-place-un-pmo",
  "pourquoi-vos-18-millions",
  "preparer-comite-de-pilotage-d-un-projet",
  "program-increment-planning",
  "project-portfolio-management",
  "reporting-pmo",
  "retour-sur-agile-en-seine-2023",
  "role-du-pmo",
  "tout-savoir-sur-la-note-de-cadrage-projet",
  "trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets",
];

function buildTargets() {
  const targets = [];
  for (const slug of LP_SLUGS)
    targets.push({ slug, type: "lp", url: `https://www.airsaas.io/fr/lp/${slug}` });
  for (const slug of PRODUIT_SLUGS)
    targets.push({ slug, type: "produit", url: `https://www.airsaas.io/fr/produit/${slug}` });
  for (const slug of SOLUTION_SLUGS)
    targets.push({ slug, type: "solution", url: `https://www.airsaas.io/fr/solution/${slug}` });
  for (const slug of EQUIPE_SLUGS)
    targets.push({ slug, type: "equipe", url: `https://www.airsaas.io/fr/equipes/${slug}` });
  for (const slug of BLOG_SLUGS)
    targets.push({
      slug,
      type: "blog",
      url: `https://www.airsaas.io/fr/gestion-de-projet/${slug}`,
    });
  return targets;
}

// ─── Cloudflare /scrape call ─────────────────────────────────────────────────

async function scrapeCloudflare({ url }) {
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${ENV.CLOUDFLARE_ACCOUNT_ID}/browser-rendering/scrape`;
  const body = {
    url,
    elements: [{ selector: "html" }],
    gotoOptions: { waitUntil: "networkidle0", timeout: 30000 },
  };
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ENV.CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errText.slice(0, 300)}`);
  }
  const data = await res.json();
  if (!data.success) {
    throw new Error(`Cloudflare error: ${JSON.stringify(data.errors)}`);
  }
  const results = data.result?.[0]?.results || [];
  if (!results.length) {
    throw new Error("No results in scrape response");
  }
  return results[0].html || "";
}

// ─── Playwright fallback ─────────────────────────────────────────────────────

let _browser = null;
async function getBrowser() {
  if (_browser) return _browser;
  const { chromium } = await import("playwright");
  _browser = await chromium.launch({ headless: true });
  return _browser;
}

async function scrapePlaywright({ url }) {
  const browser = await getBrowser();
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2000); // Lottie + lazy images
    const html = await page.content();
    return html;
  } finally {
    await context.close();
  }
}

async function closePlaywright() {
  if (_browser) {
    await _browser.close();
    _browser = null;
  }
}

// ─── Supabase upsert ─────────────────────────────────────────────────────────

async function upsertSupabase(row) {
  const endpoint = `${ENV.SUPABASE_URL}/rest/v1/airsaas_pages_rebuild?on_conflict=slug,type`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: ENV.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${ENV.SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Supabase upsert ${res.status}: ${txt.slice(0, 200)}`);
  }
}

// ─── Worker pool with concurrency ───────────────────────────────────────────

const REQUEST_DELAY_MS = 3000; // delay between successful requests (sequential)
const RATE_LIMIT_BACKOFF_MS = [60000, 120000, 180000]; // 1, 2, 3 min on 429

async function processTarget(target, method, attempt = 1) {
  const MAX_RETRIES = 3;
  const startedAt = Date.now();
  const scrapeFn = method === "playwright" ? scrapePlaywright : scrapeCloudflare;
  const methodLabel = method === "playwright" ? "playwright" : "cloudflare-scrape";
  try {
    let html = await scrapeFn({ url: target.url });
    const fullHtml = method === "playwright" ? html : `<html>${html}</html>`;
    await upsertSupabase({
      slug: target.slug,
      type: target.type,
      full_url: target.url,
      html_rendered: fullHtml,
      html_size_bytes: fullHtml.length,
      scrape_status: "ok",
      scrape_error: null,
      scrape_method: methodLabel,
      captured_at: new Date().toISOString(),
    });
    const took = Date.now() - startedAt;
    return { ok: true, slug: target.slug, type: target.type, size: fullHtml.length, took };
  } catch (err) {
    const errMsg = String(err.message || err);
    const isRateLimit =
      errMsg.includes("429") || errMsg.includes("Rate limit") || errMsg.includes("throttl");
    if (attempt <= MAX_RETRIES) {
      const wait = isRateLimit
        ? RATE_LIMIT_BACKOFF_MS[Math.min(attempt - 1, RATE_LIMIT_BACKOFF_MS.length - 1)]
        : 5000 * attempt;
      console.log(
        `    ↺ retry ${attempt}/${MAX_RETRIES} for ${target.slug} after ${(wait / 1000).toFixed(0)}s (${isRateLimit ? "rate-limit" : "error"})`,
      );
      await new Promise((r) => setTimeout(r, wait));
      return processTarget(target, method, attempt + 1);
    }
    try {
      await upsertSupabase({
        slug: target.slug,
        type: target.type,
        full_url: target.url,
        html_rendered: null,
        scrape_status: "fail",
        scrape_error: errMsg.slice(0, 500),
        scrape_method: methodLabel,
        captured_at: new Date().toISOString(),
      });
    } catch {}
    return { ok: false, slug: target.slug, type: target.type, error: errMsg };
  }
}

async function runSequential(targets, method) {
  const results = [];
  for (let i = 0; i < targets.length; i += 1) {
    const t = targets[i];
    const res = await processTarget(t, method);
    results.push(res);
    const flag = res.ok ? "OK" : "FAIL";
    const sizeKb = res.size ? `${(res.size / 1024).toFixed(0)}KB` : "";
    const tookS = res.took ? `${(res.took / 1000).toFixed(1)}s` : "";
    console.log(
      `  [${i + 1}/${targets.length}] ${flag} ${t.type}/${t.slug} ${sizeKb} ${tookS} ${res.error?.slice(0, 80) || ""}`,
    );
    if (i < targets.length - 1 && res.ok && method !== "playwright") {
      await new Promise((r) => setTimeout(r, REQUEST_DELAY_MS));
    }
  }
  return results;
}

async function runConcurrent(targets, method, concurrency = 4) {
  const queue = [...targets];
  const results = [];
  let processed = 0;
  const total = targets.length;
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length > 0) {
      const t = queue.shift();
      const res = await processTarget(t, method);
      results.push(res);
      processed += 1;
      const flag = res.ok ? "OK" : "FAIL";
      const sizeKb = res.size ? `${(res.size / 1024).toFixed(0)}KB` : "";
      const tookS = res.took ? `${(res.took / 1000).toFixed(1)}s` : "";
      console.log(
        `  [${processed}/${total}] ${flag} ${t.type}/${t.slug} ${sizeKb} ${tookS} ${res.error?.slice(0, 80) || ""}`,
      );
    }
  });
  await Promise.all(workers);
  return results;
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { only: null, slug: null, retryFailed: false, method: "cloudflare", concurrency: null };
  for (const a of args) {
    if (a.startsWith("--only=")) opts.only = a.slice(7).split(",");
    else if (a.startsWith("--slug=")) opts.slug = a.slice(7);
    else if (a === "--retry-failed") opts.retryFailed = true;
    else if (a.startsWith("--method=")) opts.method = a.slice(9);
    else if (a.startsWith("--concurrency=")) opts.concurrency = parseInt(a.slice(14), 10);
  }
  return opts;
}

async function loadFailedFromSupabase() {
  const url = `${ENV.SUPABASE_URL}/rest/v1/airsaas_pages_rebuild?scrape_status=eq.fail&select=slug,type,full_url`;
  const res = await fetch(url, {
    headers: { apikey: ENV.SUPABASE_ANON_KEY, Authorization: `Bearer ${ENV.SUPABASE_ANON_KEY}` },
  });
  return await res.json();
}

async function main() {
  const opts = parseArgs();
  let targets = buildTargets();

  if (opts.only) {
    targets = targets.filter((t) => opts.only.includes(t.type));
  }
  if (opts.slug) {
    targets = targets.filter((t) => t.slug === opts.slug);
  }
  if (opts.retryFailed) {
    const failed = await loadFailedFromSupabase();
    const failedKeys = new Set(failed.map((r) => `${r.type}::${r.slug}`));
    targets = targets.filter((t) => failedKeys.has(`${t.type}::${t.slug}`));
  }

  console.log(`[scrape] target count = ${targets.length}, method = ${opts.method}`);
  if (targets.length === 0) {
    console.log("[scrape] nothing to do");
    return;
  }

  mkdirSync(dirname(LOG_FILE), { recursive: true });

  const startedAt = Date.now();
  // If --concurrency=N passed, use concurrent. Else default sequential for cloudflare, parallel for playwright.
  const concurrency = opts.concurrency ?? (opts.method === "playwright" ? 4 : 1);
  const results = concurrency > 1
    ? await runConcurrent(targets, opts.method, concurrency)
    : await runSequential(targets, opts.method);
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);

  const ok = results.filter((r) => r.ok).length;
  const fail = results.filter((r) => !r.ok).length;
  console.log(`\n[scrape] DONE in ${elapsed}s — ok=${ok} fail=${fail}`);

  if (fail > 0) {
    console.log("\n[scrape] FAILURES:");
    for (const r of results.filter((x) => !x.ok)) {
      console.log(`  ${r.type}/${r.slug}: ${r.error}`);
    }
  }

  // Append summary to log
  const summary = `[${new Date().toISOString()}] method=${opts.method} elapsed=${elapsed}s ok=${ok} fail=${fail}\n`;
  writeFileSync(LOG_FILE, summary, { flag: "a" });

  await closePlaywright();
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
