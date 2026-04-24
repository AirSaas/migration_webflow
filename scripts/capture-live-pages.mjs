#!/usr/bin/env node
/**
 * Capture live content from airsaas.io for the 26 pages being rebuilt.
 *
 * Output per page:
 *   docs/live-captures/{type}/{slug}.json   — structured blocks + images + CTAs
 *   docs/live-captures/{type}/{slug}.md     — flat markdown, human-readable
 *   docs/live-captures/{type}/{slug}.png    — full-page screenshot
 *
 * Usage:
 *   node scripts/capture-live-pages.mjs            # all 26
 *   node scripts/capture-live-pages.mjs produit    # one type
 *   node scripts/capture-live-pages.mjs produit/budget  # one page
 */
import { chromium } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const BASE = "https://airsaas.io";

const PAGES = [
  // Produit (6)
  { type: "produit", slug: "capacity-planning" },
  { type: "produit", slug: "priorisation-par-equipes" },
  { type: "produit", slug: "reporting-projet" },
  { type: "produit", slug: "automatiser-la-com-projet" },
  { type: "produit", slug: "budget" },
  { type: "produit", slug: "traduction-one-click-avec-deepl" },
  // Landing Pages (4)
  { type: "lp", slug: "ppm" },
  { type: "lp", slug: "pmo" },
  { type: "lp", slug: "capacity-planning" },
  { type: "lp", slug: "pi-planning" },
  // Équipes (4)
  { type: "equipes", slug: "outil-pmo" },
  { type: "equipes", slug: "direction-de-la-transformation" },
  { type: "equipes", slug: "comite-direction" },
  { type: "equipes", slug: "it-et-operation" },
  // Solution (12)
  { type: "solution", slug: "management-de-portefeuille-projet" },
  { type: "solution", slug: "flash-report-projet" },
  { type: "solution", slug: "flash-report" },
  { type: "solution", slug: "revue-de-portefeuille" },
  { type: "solution", slug: "portfolio-management" },
  { type: "solution", slug: "tableau-de-bord-portefeuille-de-projet" },
  { type: "solution", slug: "tableau-de-bord-dsi" },
  { type: "solution", slug: "tableau-de-bord-gestion-de-projet" },
  { type: "solution", slug: "gestion-portefeuille-projet" },
  { type: "solution", slug: "outils-de-pilotage-projet" },
  { type: "solution", slug: "outil-ppm" },
  { type: "solution", slug: "airsaas-et-les-experts-de-la-transfo" },
];

function pageUrl({ type, slug }) {
  return `${BASE}/${type}/${slug}`;
}

function outPath({ type, slug }, ext) {
  return `docs/live-captures/${type}/${slug}.${ext}`;
}

function filterPages(arg) {
  if (!arg) return PAGES;
  if (arg.includes("/")) {
    const [type, slug] = arg.split("/");
    return PAGES.filter((p) => p.type === type && p.slug === slug);
  }
  return PAGES.filter((p) => p.type === arg);
}

async function capture(browser, entry) {
  const { type, slug } = entry;
  const url = pageUrl(entry);
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Scroll to bottom to trigger lazy-load
    await page.evaluate(async () => {
      const step = 600;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);

    const meta = await page.evaluate(() => ({
      title: document.title,
      description:
        document.querySelector('meta[name="description"]')?.getAttribute("content") || null,
      ogTitle:
        document.querySelector('meta[property="og:title"]')?.getAttribute("content") || null,
      ogDescription:
        document.querySelector('meta[property="og:description"]')?.getAttribute("content") ||
        null,
    }));

    const data = await page.evaluate(() => {
      const root = document.querySelector("main") || document.body;

      const inNavOrFooter = (el) =>
        !!el.closest("nav") ||
        !!el.closest("footer") ||
        !!el.closest('[class*="navbar"]') ||
        !!el.closest('[class*="footer"]');

      const clean = (t) => (t || "").replace(/\s+/g, " ").trim();

      const blocks = [];
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
        acceptNode(node) {
          const tag = node.tagName.toLowerCase();
          if (!["h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "a", "button"].includes(tag))
            return NodeFilter.FILTER_SKIP;
          if (inNavOrFooter(node)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      let cur;
      while ((cur = walker.nextNode())) {
        const tag = cur.tagName.toLowerCase();
        const text = clean(cur.innerText || cur.textContent);
        if (!text || text.length < 2) continue;
        // Skip <a> / <button> that only wrap another matched block
        if ((tag === "a" || tag === "button") && cur.querySelector("h1,h2,h3,h4,h5,h6,p,li"))
          continue;
        const href = cur.tagName === "A" ? cur.getAttribute("href") : null;
        blocks.push({ tag, text: text.slice(0, 1000), href });
      }

      const images = Array.from(root.querySelectorAll("img"))
        .filter((img) => !inNavOrFooter(img))
        .map((img) => ({
          src: img.src,
          alt: img.alt || "",
          width: img.naturalWidth || null,
          height: img.naturalHeight || null,
        }))
        .filter((i) => i.src && !i.src.startsWith("data:"));

      return { blocks, images };
    });

    const ctas = data.blocks.filter(
      (b) =>
        (b.tag === "a" || b.tag === "button") &&
        b.text.length < 60 &&
        b.text.length > 1,
    );

    const capture = {
      url,
      type,
      slug,
      capturedAt: new Date().toISOString(),
      meta,
      blocks: data.blocks,
      images: data.images,
      ctas,
    };

    const jsonFile = outPath(entry, "json");
    const mdFile = outPath(entry, "md");
    const pngFile = outPath(entry, "png");

    await mkdir(dirname(jsonFile), { recursive: true });
    await writeFile(jsonFile, JSON.stringify(capture, null, 2));
    await writeFile(mdFile, renderMarkdown(capture));
    await page.screenshot({ path: pngFile, fullPage: true });

    console.log(
      `✅ ${type}/${slug}  (${data.blocks.length} blocks, ${data.images.length} images)`,
    );
    return { ok: true, entry };
  } catch (e) {
    console.error(`❌ ${type}/${slug}: ${e.message}`);
    return { ok: false, entry, error: e.message };
  } finally {
    await page.close();
  }
}

function renderMarkdown(c) {
  const lines = [];
  lines.push(`# ${c.meta.title || c.slug}`);
  lines.push("");
  lines.push(`**URL:** ${c.url}`);
  lines.push(`**Description:** ${c.meta.description || "—"}`);
  lines.push(`**Captured:** ${c.capturedAt}`);
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Content blocks (top → bottom)");
  lines.push("");
  for (const b of c.blocks) {
    if (/^h[1-6]$/.test(b.tag)) {
      const level = Number(b.tag.slice(1));
      lines.push(`${"#".repeat(Math.min(level + 1, 6))} ${b.text}`);
      lines.push("");
    } else if (b.tag === "li") {
      lines.push(`- ${b.text}`);
    } else if (b.tag === "a" || b.tag === "button") {
      lines.push(`> \`[${b.tag.toUpperCase()}]\` **${b.text}**${b.href ? `  → \`${b.href}\`` : ""}`);
      lines.push("");
    } else {
      lines.push(b.text);
      lines.push("");
    }
  }
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(`## Images (${c.images.length})`);
  lines.push("");
  for (const img of c.images) {
    lines.push(`- \`${img.src}\`${img.alt ? ` — alt: "${img.alt}"` : ""} (${img.width}×${img.height})`);
  }
  lines.push("");
  return lines.join("\n");
}

(async () => {
  const arg = process.argv[2];
  const toRun = filterPages(arg);
  if (toRun.length === 0) {
    console.error(`No page matched filter: ${arg}`);
    process.exit(1);
  }
  console.log(`Capturing ${toRun.length} page(s)…`);

  const browser = await chromium.launch({ headless: true });
  const results = [];
  for (const entry of toRun) {
    const res = await capture(browser, entry);
    results.push(res);
  }
  await browser.close();

  const ok = results.filter((r) => r.ok).length;
  const ko = results.length - ok;
  console.log(`\nDone. ${ok} ok, ${ko} failed.`);
  if (ko > 0) process.exit(1);
})();
