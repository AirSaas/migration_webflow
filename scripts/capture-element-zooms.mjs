// Capture element-level zooms for items not visible at full-page resolution.
// Uses text-based Playwright locators for accurate targeting.

import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "docs/audit-screenshots/zooms");

const REBUILD = "http://localhost:3000";
const LIVE = "https://www.airsaas.io";

// [name, url, locator, sliceHeight, sliceTopOffset (negative = above element)]
const TARGETS = [
  // LogosBar clients — find by label "Ils nous font confiance"
  ["logosbar-clients-lp-ppm-rebuild", `${REBUILD}/fr/lp/ppm`, 'text=Ils nous font confiance', 250, -50],
  ["logosbar-clients-lp-ppm-live", `${LIVE}/fr/lp/ppm`, 'text=Ils nous font confiance', 250, -50],
  ["logosbar-clients-lp-pmo-rebuild", `${REBUILD}/fr/lp/pmo`, 'text=Ils nous font confiance', 250, -50],
  ["logosbar-clients-lp-pmo-live", `${LIVE}/fr/lp/pmo`, 'text=Ils nous font confiance', 250, -50],

  // Integrations bar — find by "Connecté à votre écosystème"
  ["integrations-lp-ppm-rebuild", `${REBUILD}/fr/lp/ppm`, 'text=Connecté à votre écosystème', 500, -80],
  ["integrations-lp-ppm-live", `${LIVE}/fr/lp/ppm`, 'text=Connecté à votre écosystème', 500, -80],

  // Footer copyright row — find by "©" or "Tous droits"
  ["footer-copyright-lp-ppm-rebuild", `${REBUILD}/fr/lp/ppm`, 'text=©', 200, -30],
  ["footer-copyright-lp-ppm-live", `${LIVE}/fr/lp/ppm`, 'text=©', 200, -30],
  ["footer-copyright-equipes-comite-direction-rebuild", `${REBUILD}/fr/equipes/comite-direction`, 'text=©', 200, -30],
  ["footer-copyright-equipes-comite-direction-live", `${LIVE}/fr/equipes/comite-direction`, 'text=©', 200, -30],
  ["footer-copyright-equipes-direction-de-la-transformation-rebuild", `${REBUILD}/fr/equipes/direction-de-la-transformation`, 'text=©', 200, -30],
  ["footer-copyright-equipes-direction-de-la-transformation-live", `${LIVE}/fr/equipes/direction-de-la-transformation`, 'text=©', 200, -30],
  ["footer-copyright-equipes-it-et-operation-rebuild", `${REBUILD}/fr/equipes/it-et-operation`, 'text=©', 200, -30],
  ["footer-copyright-equipes-it-et-operation-live", `${LIVE}/fr/equipes/it-et-operation`, 'text=©', 200, -30],
  ["footer-copyright-equipes-outil-pmo-rebuild", `${REBUILD}/fr/equipes/outil-pmo`, 'text=©', 200, -30],
  ["footer-copyright-equipes-outil-pmo-live", `${LIVE}/fr/equipes/outil-pmo`, 'text=©', 200, -30],

  // Full footer (all of it) for chrome comparison — last 600px of page
  ["footer-full-lp-ppm-rebuild", `${REBUILD}/fr/lp/ppm`, "footer", 600, -50],
  ["footer-full-lp-ppm-live", `${LIVE}/fr/lp/ppm`, "footer", 600, -50],
];

async function captureSliceAroundLocator(page, locator, height, topOffset) {
  const element = page.locator(locator).first();
  if ((await element.count()) === 0) {
    throw new Error(`Locator not found: ${locator}`);
  }
  await element.scrollIntoViewIfNeeded({ timeout: 5_000 });
  await page.waitForTimeout(400);
  const box = await element.boundingBox();
  if (!box) throw new Error(`No bounding box for: ${locator}`);
  const sliceTop = Math.max(0, Math.floor(box.y) + topOffset);
  return { x: 0, y: sliceTop, width: 1440, height };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  for (const [name, url, locator, sliceHeight, topOffset] of TARGETS) {
    process.stdout.write(`📸 ${name}\n   ${url}\n`);
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
      await page.addStyleTag({
        content: `*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }`,
      });
      // Trigger lazy-loading by full-page scroll
      await page.evaluate(async () => {
        const sh = document.body.scrollHeight;
        for (let y = 0; y < sh; y += window.innerHeight) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(600);

      const clip = await captureSliceAroundLocator(page, locator, sliceHeight, topOffset);
      await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`), clip });
      process.stdout.write(`   ✓ saved (clip y=${clip.y} h=${clip.height})\n\n`);
    } catch (err) {
      process.stderr.write(`   ✗ ${err.message}\n\n`);
    }
  }

  await browser.close();
  process.stdout.write(`\n✅ Done. Zooms in ${path.relative(ROOT, OUT_DIR)}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
