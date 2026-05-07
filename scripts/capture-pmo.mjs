import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/fr/lp/pmo", { waitUntil: "networkidle", timeout: 60000 });
// Force-load lazy images by scrolling through the page
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let total = 0;
    const distance = 600;
    const timer = setInterval(() => {
      window.scrollBy(0, distance);
      total += distance;
      if (total >= document.body.scrollHeight) {
        clearInterval(timer);
        window.scrollTo(0, 0);
        setTimeout(resolve, 500);
      }
    }, 80);
  });
});
await page.waitForTimeout(3000);
await page.screenshot({ path: "/tmp/pmo-bespoke-rebuild.png", fullPage: true });
await browser.close();
console.log("✓ Captured /tmp/pmo-bespoke-rebuild.png");
