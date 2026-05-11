#!/usr/bin/env node
/**
 * audit-cta-markup.mjs
 *
 * One-shot audit of inline-CTA markup in blog article source HTML.
 * Goal : decide if blog-structural-hints.mjs:85-93 regex misses any
 * Webflow CTA classes. Without this, R22 may look like an extraction
 * failure when the real cause is a regex blind spot (or honest scarcity).
 *
 * Workflow :
 *   1. Fetch a handful of sample blog HTMLs from Supabase
 *   2. Scan each one for <a> with class containing btn|cta|button
 *   3. Compare to the current blog-structural-hints regex coverage
 *   4. Print : unique uncovered class names, sample HTML snippets, decision
 *
 * Usage : node scripts/migrate/audit-cta-markup.mjs
 */

import { loadEnv, fetchPagesFromSupabase } from "./llm-parse-shared.mjs";

loadEnv();

// Same patterns as blog-structural-hints.mjs:85-93 inlineCta regex.
const COVERED_BY_REGEX = /(?:btn-|cta-|button-|wp-block-button|wf-button|w-button|cta-inline|cta-card-product|cta-encart|encart-cta)/i;

// Pass --all to scan every blog row; default = the 7 informative samples
const SCAN_ALL = process.argv.includes("--all");
const SAMPLE_SLUGS = [
  // 3 known to have CTAs (per audit-blog-structural.md)
  "fiche-projet-exemple-et-methodologie",
  "le-modele-de-presentation-pour-votre-comite-de-pilotage",
  "tout-savoir-sur-la-note-de-cadrage-projet",
  // 2 long-form articles — likely have body CTAs if any do
  "la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0",
  "metier-pmo",
  // 2 from the weak list — worth checking
  "comite-pilotage-projet",
  "pi-planning",
];

function extractArticleBody(html) {
  const containers = [
    /<div[^>]*class="[^"]*container__article__integrations__text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i,
    /<div[^>]*class="[^"]*blog-post-body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/section>/i,
    /<div[^>]*class="[^"]*rich-text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i,
    /<div[^>]*class="[^"]*post-body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/section>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
  ];
  for (const re of containers) {
    const m = html.match(re);
    if (m && m[1].length > 500) return m[1];
  }
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

function findCtaCandidates(body) {
  // 1) <a> tags whose class= contains btn|cta|button (any case)
  const anchorRe = /<a\b[^>]*class="([^"]*(?:btn|cta|button)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  // 2) <div> wrappers with class containing cta
  const divRe = /<div\b[^>]*class="([^"]*cta[^"]*)"[^>]*>/gi;

  const anchors = [];
  let m;
  while ((m = anchorRe.exec(body)) !== null) {
    const classAttr = m[1];
    const text = m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    anchors.push({ classAttr, text, covered: COVERED_BY_REGEX.test(classAttr) });
  }
  const divs = [];
  while ((m = divRe.exec(body)) !== null) {
    const classAttr = m[1];
    divs.push({ classAttr, covered: COVERED_BY_REGEX.test(classAttr) });
  }
  return { anchors, divs };
}

async function main() {
  console.log("[audit-cta] fetching all blog rows from Supabase…");
  const rows = await fetchPagesFromSupabase("blog");
  const bySlug = new Map(rows.map((r) => [r.slug, r.html_rendered]));
  console.log(`[audit-cta] ${rows.length} rows fetched`);

  const uncoveredClassFreq = new Map(); // class → count
  const uncoveredSamples = []; // up to 5 sample snippets

  const slugsToScan = SCAN_ALL ? rows.map((r) => r.slug) : SAMPLE_SLUGS;
  console.log(`[audit-cta] scanning ${slugsToScan.length} slug${slugsToScan.length === 1 ? "" : "s"}`);

  let totalAnchors = 0;
  let totalCoveredAnchors = 0;
  let totalDivs = 0;
  let totalCoveredDivs = 0;
  const articlesWithCta = [];

  for (const slug of slugsToScan) {
    const html = bySlug.get(slug);
    if (!html) {
      console.log(`\n  ✗ ${slug} — NOT FOUND in Supabase`);
      continue;
    }
    const body = extractArticleBody(html);
    const { anchors, divs } = findCtaCandidates(body);
    const coveredAnchors = anchors.filter((a) => a.covered).length;
    const uncoveredAnchors = anchors.filter((a) => !a.covered);
    const coveredDivs = divs.filter((d) => d.covered).length;
    const uncoveredDivs = divs.filter((d) => !d.covered);

    totalAnchors += anchors.length;
    totalCoveredAnchors += coveredAnchors;
    totalDivs += divs.length;
    totalCoveredDivs += coveredDivs;
    if (anchors.length > 0 || divs.length > 0) {
      articlesWithCta.push({ slug, anchors: anchors.length, covered: coveredAnchors + coveredDivs });
    }

    if (!SCAN_ALL) {
      console.log(`\n  ${slug}`);
      console.log(`    anchors  : ${anchors.length}  (covered ${coveredAnchors}, uncovered ${uncoveredAnchors.length})`);
      console.log(`    cta-divs : ${divs.length}  (covered ${coveredDivs}, uncovered ${uncoveredDivs.length})`);
    }

    for (const a of uncoveredAnchors) {
      uncoveredClassFreq.set(a.classAttr, (uncoveredClassFreq.get(a.classAttr) || 0) + 1);
      if (uncoveredSamples.length < 5) {
        uncoveredSamples.push({ slug, kind: "anchor", classAttr: a.classAttr, text: a.text });
      }
    }
    for (const d of uncoveredDivs) {
      uncoveredClassFreq.set(d.classAttr, (uncoveredClassFreq.get(d.classAttr) || 0) + 1);
      if (uncoveredSamples.length < 5) {
        uncoveredSamples.push({ slug, kind: "div", classAttr: d.classAttr });
      }
    }
  }

  console.log("\n──────── SUMMARY ────────");
  console.log(`  Total anchors scanned     : ${totalAnchors}  (covered ${totalCoveredAnchors})`);
  console.log(`  Total cta-divs scanned    : ${totalDivs}  (covered ${totalCoveredDivs})`);
  console.log(`  Articles with ≥1 CTA      : ${articlesWithCta.length} / ${slugsToScan.length}`);
  if (SCAN_ALL && articlesWithCta.length) {
    console.log("\n  Articles with CTAs :");
    for (const a of articlesWithCta.sort((x, y) => y.anchors - x.anchors)) {
      console.log(`    ${a.anchors} CTA${a.anchors > 1 ? "s" : ""} (covered ${a.covered})  ${a.slug}`);
    }
  }
  console.log("");
  if (uncoveredClassFreq.size === 0) {
    console.log("  ✓ No uncovered CTA classes found in samples.");
    console.log("  Decision : R22 is source-limited (real scarcity). No regex enrichment needed.");
  } else {
    console.log(`  ⚠ ${uncoveredClassFreq.size} uncovered CTA class strings :`);
    const sorted = [...uncoveredClassFreq.entries()].sort((a, b) => b[1] - a[1]);
    for (const [cls, n] of sorted.slice(0, 15)) {
      console.log(`    ${n}×  ${cls}`);
    }
    console.log("\n  Sample contexts :");
    for (const s of uncoveredSamples) {
      const detail = s.text ? ` → "${s.text.slice(0, 60)}"` : "";
      console.log(`    [${s.slug}] ${s.kind}: ${s.classAttr.slice(0, 80)}${detail}`);
    }
    console.log("\n  Decision : enrich blog-structural-hints.mjs:85-93 + add a CTA example to BLOG_RULES.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
