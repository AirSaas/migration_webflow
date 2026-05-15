import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const slugs = [
  "kanban-gestion-de-projet",
  "comite-pilotage-projet",
  "metier-pmo",
  "pi-planning",
  "gestion-portefeuille-projets-vs-gestion-de-projet",
];

const OUT = "/tmp/v3-shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 4000 } });
for (const slug of slugs) {
  const url = `http://localhost:3000/fr/blog/v3/${slug}`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.evaluate(
    () =>
      new Promise((res) => {
        let y = 0;
        const step = window.innerHeight * 0.8;
        const id = setInterval(() => {
          window.scrollTo(0, (y += step));
          if (y >= document.body.scrollHeight) {
            clearInterval(id);
            window.scrollTo(0, 0);
            setTimeout(() => res(), 500);
          }
        }, 100);
      }),
  );
  const h = await page.evaluate(() => document.body.scrollHeight);
  const tiles = Math.max(1, Math.ceil(h / 4000));
  for (let i = 0; i < tiles; i++) {
    await page.evaluate((yy) => window.scrollTo(0, yy), i * 4000);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/${slug}-${String(i).padStart(2, "0")}.png` });
  }
  console.log(`${slug}: ${tiles} tile(s), h=${h}px`);
}
await browser.close();
