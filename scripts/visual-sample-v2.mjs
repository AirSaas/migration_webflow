#!/usr/bin/env node
/**
 * visual-compare.mjs — Phase 6 visual sample.
 *
 * Captures full-page screenshots of 5 landings + 5 blog articles in
 * both live (airsaas.io) and rebuild (next dev) so that a human can
 * eyeball the design fidelity side by side.
 *
 * Output: docs/visual-comparison/{slug}-live.png + {slug}-rebuild.png
 *
 * Pre-req: next dev running on http://localhost:3000
 */

import { chromium } from "playwright";
import { mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const OUT_DIR = join(REPO_ROOT, "docs/visual-comparison");

const LIVE_BASE = "https://www.airsaas.io";
const REBUILD_BASE = process.env.REBUILD_BASE || "http://localhost:3000";

const SAMPLES = [
  { slug: "ppm", type: "lp", live: "/fr/lp/ppm", rebuild: "/fr/lp/ppm" },
  { slug: "budget", type: "produit", live: "/fr/produit/budget", rebuild: "/fr/produit/budget" },
  { slug: "outil-ppm", type: "solution", live: "/fr/solution/outil-ppm", rebuild: "/fr/solutions/outil-ppm" },
  { slug: "flash-report", type: "solution", live: "/fr/solution/flash-report", rebuild: "/fr/solutions/flash-report" },
  { slug: "outil-pmo", type: "equipe", live: "/fr/equipes/outil-pmo", rebuild: "/fr/equipes/outil-pmo" },
  { slug: "metier-pmo", type: "blog", live: "/fr/gestion-de-projet/metier-pmo", rebuild: "/fr/blog/metier-pmo" },
  { slug: "pi-planning", type: "blog", live: "/fr/gestion-de-projet/pi-planning", rebuild: "/fr/blog/pi-planning" },
  { slug: "capacity-planning", type: "blog", live: "/fr/gestion-de-projet/capacity-planning", rebuild: "/fr/blog/capacity-planning" },
  { slug: "plan-de-communication-projet", type: "blog", live: "/fr/gestion-de-projet/plan-de-communication-projet", rebuild: "/fr/blog/plan-de-communication-projet" },
  { slug: "comment-animer-un-comite-de-pilotage", type: "blog", live: "/fr/gestion-de-projet/comment-animer-un-comite-de-pilotage", rebuild: "/fr/blog/comment-animer-un-comite-de-pilotage" },
];

async function captureFullPage(page, url, outPath) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2000); // lazy images + lottie
  await page.screenshot({ path: outPath, fullPage: true, type: "png" });
}

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  });
  const page = await context.newPage();

  const results = [];
  for (const s of SAMPLES) {
    console.log(`[capture] ${s.type}/${s.slug}`);
    const liveOut = join(OUT_DIR, `${s.type}-${s.slug}-live.png`);
    const rebuildOut = join(OUT_DIR, `${s.type}-${s.slug}-rebuild.png`);
    let liveOk = true;
    let rebuildOk = true;
    try {
      await captureFullPage(page, LIVE_BASE + s.live, liveOut);
    } catch (e) {
      console.log(`  live FAIL: ${e.message}`);
      liveOk = false;
    }
    try {
      await captureFullPage(page, REBUILD_BASE + s.rebuild, rebuildOut);
    } catch (e) {
      console.log(`  rebuild FAIL: ${e.message}`);
      rebuildOk = false;
    }
    results.push({ ...s, liveOk, rebuildOk, liveOut, rebuildOut });
    console.log(`  live=${liveOk ? "✓" : "✗"} rebuild=${rebuildOk ? "✓" : "✗"}`);
  }

  await browser.close();

  // Generate markdown index
  let md = `# Visual comparison — Phase 6 sample\n\n`;
  md += `**Date** : ${new Date().toISOString()}\n\n`;
  md += `Side-by-side full-page screenshots — 10 sample pages (5 landings + 5 blog).\n\n`;
  for (const r of results) {
    md += `## ${r.type} / \`${r.slug}\`\n\n`;
    md += `| Live (airsaas.io) | Rebuild (Next.js DS) |\n|---|---|\n`;
    md += `| ![live](./visual-comparison/${r.type}-${r.slug}-live.png) | ![rebuild](./visual-comparison/${r.type}-${r.slug}-rebuild.png) |\n\n`;
  }
  const indexPath = join(REPO_ROOT, "docs/visual-comparison-index.md");
  await import("node:fs").then(({ writeFileSync }) =>
    writeFileSync(indexPath, md, "utf8"),
  );
  console.log(`\n[done] ${results.length} pairs in ${OUT_DIR}`);
  console.log(`[done] index → ${indexPath}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
