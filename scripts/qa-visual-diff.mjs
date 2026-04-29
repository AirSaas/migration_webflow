#!/usr/bin/env node
/**
 * qa-visual-diff.mjs — Full-coverage pixel-diff of the 88 rebuild pages
 * vs. their live counterparts on airsaas.io.
 *
 * For each page, captures full-page screenshots at 1440 width (and 375 if
 * --mobile is passed), then computes pixel diff via pixelmatch.
 *
 * Output : docs/visual-comparison/{type}-{slug}-{live|rebuild|diff}-{w}.png
 *          docs/visual-comparison/index.md
 *          docs/raw/visual-diff.json
 *
 * Pre-req : next dev on http://localhost:3000.
 *
 * Usage:
 *   node scripts/qa-visual-diff.mjs
 *   node scripts/qa-visual-diff.mjs --mobile
 *   node scripts/qa-visual-diff.mjs --type=blog --limit=5
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { chromium } from "playwright";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import {
  REPO_ROOT,
  REBUILD_BASE,
  LIVE_BASE,
  getAllTargets,
  parseArgs,
  filterTargets,
} from "./qa-shared.mjs";

const OUT_DIR = join(REPO_ROOT, "docs/visual-comparison");
const REPORT_JSON = join(REPO_ROOT, "docs/raw/visual-diff.json");
const INDEX_MD = join(OUT_DIR, "index.md");

const args = parseArgs(process.argv);
const targets = filterTargets(getAllTargets(), args);
const RUN_MOBILE = process.argv.includes("--mobile");
console.log(`[qa-visual-diff] target count = ${targets.length} (mobile=${RUN_MOBILE})`);

// Map rebuild type → live URL prefix (Webflow had different paths than Next.js)
function liveUrlFor(t) {
  if (t.type === "lp") return `${LIVE_BASE}/fr/lp/${t.slug}`;
  if (t.type === "produit") return `${LIVE_BASE}/fr/produit/${t.slug}`;
  if (t.type === "solution") return `${LIVE_BASE}/fr/solution/${t.slug}`;
  if (t.type === "equipe") return `${LIVE_BASE}/fr/equipes/${t.slug}`;
  if (t.type === "blog") return `${LIVE_BASE}/fr/gestion-de-projet/${t.slug}`;
  return `${LIVE_BASE}${t.path}`;
}

async function captureFull(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  // Scroll to trigger lazy images, lottie, etc.
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  return await page.screenshot({ fullPage: true, type: "png" });
}

function diffPng(bufA, bufB) {
  const a = PNG.sync.read(bufA);
  const b = PNG.sync.read(bufB);
  // Resize: pad the smaller one to match — pixelmatch needs same dimensions
  const w = Math.max(a.width, b.width);
  const h = Math.max(a.height, b.height);
  const padded = (img) => {
    if (img.width === w && img.height === h) return img;
    const out = new PNG({ width: w, height: h });
    out.data.fill(255); // white padding
    PNG.bitblt(img, out, 0, 0, img.width, img.height, 0, 0);
    return out;
  };
  const A = padded(a);
  const B = padded(b);
  const diff = new PNG({ width: w, height: h });
  const diffPixels = pixelmatch(A.data, B.data, diff.data, w, h, {
    threshold: 0.2,
    includeAA: false,
    alpha: 0.4,
  });
  return {
    width: w,
    height: h,
    diffPixels,
    diffPercent: (diffPixels / (w * h)) * 100,
    diffBuf: PNG.sync.write(diff),
    aBuf: PNG.sync.write(A),
    bBuf: PNG.sync.write(B),
  };
}

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  if (!existsSync(dirname(REPORT_JSON))) mkdirSync(dirname(REPORT_JSON), { recursive: true });

  const widths = RUN_MOBILE ? [1440, 375] : [1440];
  const browser = await chromium.launch({ headless: true });
  const t0 = Date.now();
  const out = [];

  try {
    for (const w of widths) {
      console.log(`\n[width = ${w}]`);
      const ctx = await browser.newContext({
        viewport: { width: w, height: w === 375 ? 800 : 900 },
        deviceScaleFactor: 1,
        userAgent:
          w === 375
            ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
            : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      });
      const page = await ctx.newPage();
      for (let i = 0; i < targets.length; i++) {
        const t = targets[i];
        const liveUrl = liveUrlFor(t);
        const rebuildUrl = REBUILD_BASE + t.path;
        const ts = Date.now();
        let row = out.find((r) => r.slug === t.slug && r.type === t.type);
        if (!row) {
          row = { ...t, widths: {} };
          out.push(row);
        }
        const widthRow = { liveUrl, rebuildUrl };
        let liveBuf = null,
          rebuildBuf = null;
        try {
          liveBuf = await captureFull(page, liveUrl);
        } catch (e) {
          widthRow.liveError = e.message;
        }
        try {
          rebuildBuf = await captureFull(page, rebuildUrl);
        } catch (e) {
          widthRow.rebuildError = e.message;
        }
        if (liveBuf && rebuildBuf) {
          try {
            const d = diffPng(liveBuf, rebuildBuf);
            widthRow.diffPercent = d.diffPercent;
            widthRow.diffPixels = d.diffPixels;
            widthRow.dimensions = { width: d.width, height: d.height };
            writeFileSync(join(OUT_DIR, `${t.type}-${t.slug}-live-${w}.png`), d.aBuf);
            writeFileSync(join(OUT_DIR, `${t.type}-${t.slug}-rebuild-${w}.png`), d.bBuf);
            writeFileSync(join(OUT_DIR, `${t.type}-${t.slug}-diff-${w}.png`), d.diffBuf);
          } catch (e) {
            widthRow.diffError = e.message;
          }
        } else if (liveBuf) {
          writeFileSync(join(OUT_DIR, `${t.type}-${t.slug}-live-${w}.png`), liveBuf);
        } else if (rebuildBuf) {
          writeFileSync(join(OUT_DIR, `${t.type}-${t.slug}-rebuild-${w}.png`), rebuildBuf);
        }
        row.widths[w] = widthRow;
        const dt = Math.round((Date.now() - ts) / 1000);
        const pct = widthRow.diffPercent;
        const diffStr =
          widthRow.liveError || widthRow.rebuildError
            ? `ERR ${widthRow.liveError || widthRow.rebuildError}`
            : pct === undefined
              ? "(no diff)"
              : `diff=${pct.toFixed(1)}%`;
        console.log(`  [${i + 1}/${targets.length}] ${t.type}/${t.slug}  ${diffStr}  (${dt}s)`);
      }
      await ctx.close();
    }
  } finally {
    await browser.close();
  }

  writeFileSync(REPORT_JSON, JSON.stringify(out, null, 2));

  // ─── Index MD ───────────────────────────────────────────────────────────
  const lines = [];
  lines.push(`# Visual diff index`);
  lines.push("");
  lines.push(`**Date** : ${new Date().toISOString()}`);
  lines.push(`**Pages** : ${out.length} — widths: ${widths.join(", ")}`);
  lines.push("");
  for (const w of widths) {
    const sorted = [...out]
      .filter((r) => typeof r.widths[w]?.diffPercent === "number")
      .sort((a, b) => b.widths[w].diffPercent - a.widths[w].diffPercent);
    const median =
      sorted.length === 0 ? null : sorted[Math.floor(sorted.length / 2)].widths[w].diffPercent;
    lines.push(`## Width ${w} — median diff = ${median?.toFixed(2)}%`);
    lines.push("");
    lines.push(`| Page | Diff % | Live | Rebuild | Diff |`);
    lines.push(`|---|---|---|---|---|`);
    for (const r of sorted) {
      const wr = r.widths[w];
      const stem = `${r.type}-${r.slug}`;
      lines.push(
        `| ${r.type}/${r.slug} | ${wr.diffPercent.toFixed(1)}% | ![](${stem}-live-${w}.png) | ![](${stem}-rebuild-${w}.png) | ![](${stem}-diff-${w}.png) |`,
      );
    }
    // Errors
    const errs = out.filter((r) => r.widths[w]?.liveError || r.widths[w]?.rebuildError);
    if (errs.length) {
      lines.push("");
      lines.push(`### Errors`);
      for (const r of errs) {
        const wr = r.widths[w];
        lines.push(
          `- ${r.type}/${r.slug} — live: ${wr.liveError || "ok"} — rebuild: ${wr.rebuildError || "ok"}`,
        );
      }
    }
    lines.push("");
  }
  writeFileSync(INDEX_MD, lines.join("\n"));

  console.log(
    `\n[qa-visual-diff] DONE in ${((Date.now() - t0) / 1000 / 60).toFixed(1)} min`,
  );
  console.log(`[qa-visual-diff] index → ${INDEX_MD}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
