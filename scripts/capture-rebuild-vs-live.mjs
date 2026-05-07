// Capture full-page screenshots of rebuild (Vercel) + live (Webflow) for
// side-by-side visual audit. Saves to docs/audit-screenshots/pages/.
//
// Usage:
//   node scripts/capture-rebuild-vs-live.mjs              # all 26 pages
//   node scripts/capture-rebuild-vs-live.mjs ppm pmo      # specific slugs

import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "docs/audit-screenshots/pages");

// Local Next.js dev (preferred — bypasses Vercel deployment auth).
// Fallback to Vercel preview if localhost is not running.
const REBUILD_BASE = process.env.REBUILD_BASE || "http://localhost:3000";
const LIVE_BASE = "https://www.airsaas.io";

// type, slug, livePath (if different from rebuildPath)
const PAGES = [
  // LP — same path
  ["lp", "ppm"],
  ["lp", "pmo"],
  ["lp", "capacity-planning"],
  ["lp", "pi-planning"],
  // Produit — same path
  ["produit", "automatiser-la-com-projet"],
  ["produit", "budget"],
  ["produit", "capacity-planning"],
  ["produit", "priorisation-par-equipes"],
  ["produit", "reporting-projet"],
  ["produit", "traduction-one-click-avec-deepl"],
  // Solutions — rebuild uses /solutions/, live uses /solution/
  ["solutions", "airsaas-et-les-experts-de-la-transfo", "solution"],
  ["solutions", "flash-report", "solution"],
  ["solutions", "flash-report-projet", "solution"],
  ["solutions", "gestion-portefeuille-projet", "solution"],
  ["solutions", "management-de-portefeuille-projet", "solution"],
  ["solutions", "outil-ppm", "solution"],
  ["solutions", "outils-de-pilotage-projet", "solution"],
  ["solutions", "portfolio-management", "solution"],
  ["solutions", "revue-de-portefeuille", "solution"],
  ["solutions", "tableau-de-bord-dsi", "solution"],
  ["solutions", "tableau-de-bord-gestion-de-projet", "solution"],
  ["solutions", "tableau-de-bord-portefeuille-de-projet", "solution"],
  // Équipes — same path
  ["equipes", "comite-direction"],
  ["equipes", "direction-de-la-transformation"],
  ["equipes", "it-et-operation"],
  ["equipes", "outil-pmo"],
  // Blog — rebuild uses /blog/, live uses /gestion-de-projet/
  ["blog", "pi-planning", "gestion-de-projet"],
  ["blog", "kanban-gestion-de-projet", "gestion-de-projet"],
  ["blog", "metier-pmo", "gestion-de-projet"],
  ["blog", "le-grand-guide-de-la-conduite-de-projet", "gestion-de-projet"],
  ["blog", "project-portfolio-management", "gestion-de-projet"],
  ["blog", "cadrage-projet", "gestion-de-projet"],
  ["blog", "capacity-planning", "gestion-de-projet"],
  ["blog", "comite-pilotage-projet", "gestion-de-projet"],
  ["blog", "tout-savoir-sur-la-note-de-cadrage-projet", "gestion-de-projet"],
  ["blog", "budgetiser-un-projet-sans-se-louper", "gestion-de-projet"],
];

async function captureBoth(page, type, slug, livePathOverride) {
  const rebuildUrl = `${REBUILD_BASE}/fr/${type}/${slug}`;
  const liveType = livePathOverride ?? type;
  const liveUrl = `${LIVE_BASE}/fr/${liveType}/${slug}`;

  const folderName = `${type}-${slug}`;
  const folder = path.join(OUT_DIR, folderName);
  await fs.mkdir(folder, { recursive: true });

  for (const [tag, url] of [
    ["rebuild", rebuildUrl],
    ["live", liveUrl],
  ]) {
    const out = path.join(folder, `${tag}.png`);
    process.stdout.write(`📸 ${folderName} ${tag}\n   ${url}\n`);
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
      // Disable animations
      await page.addStyleTag({
        content: `*, *::before, *::after {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }`,
      });
      // Scroll the full page once to trigger lazy loading
      await page.evaluate(async () => {
        const scrollHeight = document.body.scrollHeight;
        const step = window.innerHeight;
        for (let y = 0; y < scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 100));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(800);
      await page.screenshot({ path: out, fullPage: true });
      process.stdout.write(`   ✓ ${path.relative(ROOT, out)}\n`);
    } catch (err) {
      process.stderr.write(`   ✗ ${err.message}\n`);
    }
  }
  process.stdout.write("\n");
}

async function main() {
  const requestedSlugs = process.argv.slice(2);
  const filtered = requestedSlugs.length
    ? PAGES.filter(([, slug]) => requestedSlugs.includes(slug))
    : PAGES;

  if (filtered.length === 0) {
    console.error(`No matching pages for: ${requestedSlugs.join(", ")}`);
    process.exit(1);
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    // Reject cookies banner if any
    extraHTTPHeaders: { "Sec-CH-UA-Mobile": "?0" },
  });
  const page = await context.newPage();

  process.stdout.write(`Capturing ${filtered.length} page(s)...\n\n`);
  for (const entry of filtered) {
    await captureBoth(page, entry[0], entry[1], entry[2]);
  }

  await browser.close();
  process.stdout.write(`\n✅ Done. Captures in ${path.relative(ROOT, OUT_DIR)}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
