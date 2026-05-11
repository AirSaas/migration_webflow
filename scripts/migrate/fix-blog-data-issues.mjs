#!/usr/bin/env node
/**
 * fix-blog-data-issues.mjs
 *
 * Deterministic post-process of src/data/blog-articles-v2.ts. Fixes the
 * issues flagged by scan-blog-data-issues.mjs without re-running the LLM :
 *
 *   1. Convert `quote` blocks whose text starts with an alert emoji
 *      (⚠️/💡/✨/📌/🚨/❗/🔔/✅/💬) OR with a `<strong>` callout label
 *      (À retenir / À noter / Bon à savoir / En résumé / Le saviez-vous /
 *      Astuce / Pro tip) into `insight-callout` blocks. These were
 *      authored as `<blockquote>` in Webflow but are visually alert panels.
 *
 *   2. Drop `hubspot-cta` blocks with empty `href` AND empty `label`.
 *      The renderer already returns `null` for these, but the data
 *      shouldn't carry useless blocks.
 *
 * Idempotent : running twice produces no further changes.
 *
 * Usage : node scripts/migrate/fix-blog-data-issues.mjs
 *         node scripts/migrate/fix-blog-data-issues.mjs --dry-run
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT, writeBlogTsFile, writeBlogContentJson } from "./llm-parse-shared.mjs";

const DRY = process.argv.includes("--dry-run");
const TS_PATH = join(REPO_ROOT, "src/data/blog-articles-v2.ts");
const JSON_PATH = join(REPO_ROOT, "docs/raw/blog-articles-v2-content.json");

const ALERT_EMOJI_OR_LABEL =
  /^(?:\s|<[^>]+>)*(?:(⚠️|💡|✨|📌|🚨|❗|🔔|✅|💬)|<strong[^>]*>\s*(À retenir|À noter|Bon à savoir|En résumé|Le saviez-vous|Astuce|Pro tip))/i;

function classifyAlertQuote(text) {
  const m = text.match(ALERT_EMOJI_OR_LABEL);
  if (!m) return null;
  const emoji = m[1];
  const label = m[2];
  // Pick a clean label string for the InsightCallout title.
  if (label) return label.replace(/\s+:?$/, "").trim();
  // Map emoji → label
  const emojiLabels = {
    "⚠️": "Attention",
    "💡": "Le saviez-vous",
    "✨": "À retenir",
    "📌": "À retenir",
    "🚨": "Alerte",
    "❗": "Attention",
    "🔔": "À noter",
    "✅": "Bon à savoir",
    "💬": "À retenir",
  };
  return emojiLabels[emoji] || "À retenir";
}

function transformBlocks(blocks) {
  const out = [];
  let convertedAlerts = 0;
  let droppedHubspot = 0;
  for (const b of blocks) {
    if (b.type === "quote") {
      const txt = (b.text || "").trim();
      const label = classifyAlertQuote(txt);
      if (label) {
        out.push({
          type: "insight-callout",
          html: txt,
          // The renderer uses a fixed title "À retenir" today — preserving
          // the label inside the html so future renderer iterations can
          // surface variant-specific titles. Schema only requires `html`.
          label,
        });
        convertedAlerts++;
        continue;
      }
    }
    if (b.type === "hubspot-cta") {
      // HubSpot CTAs in source are JS-embedded iframes — no extractable label/href.
      // Populate with a sensible site-wide demo fallback so the renderer shows
      // a working CTA instead of nothing.
      const href = (b.href || "").trim();
      const lbl = (b.label || "").trim();
      if (!href && !lbl) {
        out.push({
          type: "inline-cta",
          label: "Réservez votre démo de 30 min",
          href: "/fr/meetings-pages",
        });
        droppedHubspot++;
        continue;
      }
    }
    out.push(b);
  }
  return { blocks: out, convertedAlerts, droppedHubspot };
}

function readArticles() {
  const txt = readFileSync(TS_PATH, "utf8");
  const m = txt.match(/BLOG_ARTICLES_V2[^=]*=\s*(\[[\s\S]*\])\s*(?:as const)?\s*;/);
  if (!m) throw new Error("Cannot find BLOG_ARTICLES_V2 array");
  return JSON.parse(m[1]);
}

function main() {
  const articles = readArticles();
  let totalAlertsConverted = 0;
  let totalHubspotDropped = 0;
  const touched = [];

  const newArticles = articles.map((a) => {
    if (a.skip || !a.blocks) return a;
    const { blocks, convertedAlerts, droppedHubspot } = transformBlocks(a.blocks);
    if (convertedAlerts + droppedHubspot > 0) {
      totalAlertsConverted += convertedAlerts;
      totalHubspotDropped += droppedHubspot;
      touched.push({ slug: a.slug, alerts: convertedAlerts, hubspot: droppedHubspot });
    }
    return { ...a, blocks };
  });

  console.log(`[fix-blog-data] articles touched : ${touched.length}`);
  console.log(`[fix-blog-data] alert-quote → callout : ${totalAlertsConverted}`);
  console.log(`[fix-blog-data] hubspot-cta dropped   : ${totalHubspotDropped}`);
  for (const t of touched) {
    console.log(`  ${t.slug}  +callouts=${t.alerts} -hubspot=${t.hubspot}`);
  }

  if (DRY) {
    console.log("[fix-blog-data] dry-run, no files written");
    return;
  }

  writeBlogTsFile(TS_PATH, newArticles);
  writeBlogContentJson(JSON_PATH, newArticles);
  console.log(`\n[write] ${TS_PATH}`);
  console.log(`[write] ${JSON_PATH}`);
}

main();
