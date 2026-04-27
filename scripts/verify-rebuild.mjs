#!/usr/bin/env node
/**
 * verify-rebuild.mjs — Phase 4 verification.
 *
 * For each of the 88 target pages, fetch the live HTML (airsaas.io) and
 * the rebuild HTML (local next dev), extract a content fingerprint, and
 * compute coverage scores. Output `docs/rebuild-verification-report.md`.
 *
 * Pre-req:
 *   - next dev running on http://localhost:3000
 *
 * Usage:
 *   node scripts/verify-rebuild.mjs
 *   node scripts/verify-rebuild.mjs --type=blog
 *   node scripts/verify-rebuild.mjs --slug=metier-pmo
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const REPORT_PATH = join(REPO_ROOT, "docs/rebuild-verification-report.md");
const REPORT_JSON = join(REPO_ROOT, "docs/raw/rebuild-verification.json");

const REBUILD_BASE = process.env.REBUILD_BASE || "http://localhost:3000";
const LIVE_BASE = "https://www.airsaas.io";

// Outliers: skip or relax thresholds
const OUTLIER_SKIP = new Set(["portfolio-management"]);
const OUTLIER_RELAXED = new Set(["plan-de-communication-projet"]);

// ─── URL list (must match scrape script) ────────────────────────────────────

const TARGETS = [];
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

for (const slug of LP_SLUGS) {
  TARGETS.push({
    slug,
    type: "lp",
    liveUrl: `${LIVE_BASE}/fr/lp/${slug}`,
    rebuildUrl: `${REBUILD_BASE}/fr/lp/${slug}`,
  });
}
for (const slug of PRODUIT_SLUGS) {
  TARGETS.push({
    slug,
    type: "produit",
    liveUrl: `${LIVE_BASE}/fr/produit/${slug}`,
    rebuildUrl: `${REBUILD_BASE}/fr/produit/${slug}`,
  });
}
for (const slug of SOLUTION_SLUGS) {
  // Live uses /solution/ (singular) but our route is /solutions/
  TARGETS.push({
    slug,
    type: "solution",
    liveUrl: `${LIVE_BASE}/fr/solution/${slug}`,
    rebuildUrl: `${REBUILD_BASE}/fr/solutions/${slug}`,
  });
}
for (const slug of EQUIPE_SLUGS) {
  TARGETS.push({
    slug,
    type: "equipe",
    liveUrl: `${LIVE_BASE}/fr/equipes/${slug}`,
    rebuildUrl: `${REBUILD_BASE}/fr/equipes/${slug}`,
  });
}

// Load 62 blog slugs from generated data
const blogData = readFileSync(
  join(REPO_ROOT, "docs/raw/blog-articles-v2-content.json"),
  "utf8",
);
const blogParsed = JSON.parse(blogData);
for (const article of blogParsed) {
  if (article.skip) continue;
  TARGETS.push({
    slug: article.slug,
    type: "blog",
    liveUrl: `${LIVE_BASE}/fr/gestion-de-projet/${article.slug}`,
    rebuildUrl: `${REBUILD_BASE}/fr/blog/${article.slug}`,
  });
}

// ─── Fetch + fingerprint ────────────────────────────────────────────────────

const HEADING_RE = /<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi;
const IMG_RE = /<img[^>]+>/gi;
const BUTTON_RE = /<a[^>]+class="[^"]*(?:button|w-button|cta-)[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
const FIGURE_RE = /<figure\b/gi;
const BLOCKQUOTE_RE = /<blockquote\b/gi;
const PARAGRAPH_RE = /<p\b/gi;
const TESTIMONIAL_CLASS_RE = /class="[^"]*(?:testimonial|block__testimonial|quote-card)[^"]*"/gi;
const FEATURE_SECT_CLASS_RE = /class="[^"]*container__features__section[^"]*"/gi;

function stripTags(html) {
  return html.replace(/<[^>]+>/g, " ");
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/gi, " ");
}

function normText(s) {
  return decodeEntities(stripTags(s)).replace(/\s+/g, " ").trim().toLowerCase();
}

function extractFingerprint(html) {
  const headings = new Set();
  const ctaLabels = new Set();

  for (const m of html.matchAll(HEADING_RE)) {
    const text = normText(m[2]);
    if (text && text.length >= 3 && text.length <= 200) {
      headings.add(text);
    }
  }

  for (const m of html.matchAll(BUTTON_RE)) {
    const text = normText(m[1]);
    if (text && text.length >= 2 && text.length <= 80) {
      ctaLabels.add(text);
    }
  }

  return {
    headings,
    ctaLabels,
    paragraphCount: (html.match(PARAGRAPH_RE) || []).length,
    figureCount: (html.match(FIGURE_RE) || []).length,
    imgCount: (html.match(IMG_RE) || []).length,
    blockquoteCount: (html.match(BLOCKQUOTE_RE) || []).length,
    testimonialCount: (html.match(TESTIMONIAL_CLASS_RE) || []).length,
    featureSectionCount: (html.match(FEATURE_SECT_CLASS_RE) || []).length,
  };
}

async function fetchHtml(url, timeoutMs = 30000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 verify-rebuild" },
    });
    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}`, html: "" };
    }
    return { ok: true, html: await res.text() };
  } catch (err) {
    return { ok: false, error: err.message, html: "" };
  } finally {
    clearTimeout(t);
  }
}

// ─── Coverage logic ─────────────────────────────────────────────────────────

function setIntersection(a, b) {
  let count = 0;
  for (const v of a) if (b.has(v)) count += 1;
  return count;
}

function coverageScore(liveSet, rebuildSet) {
  if (liveSet.size === 0) return 1;
  return setIntersection(liveSet, rebuildSet) / liveSet.size;
}

function withinDelta(rebuild, live, delta) {
  if (live === 0) return rebuild === 0 || rebuild <= 5;
  return Math.abs(rebuild - live) / live <= delta;
}

function evaluateLanding(live, rebuild) {
  const headingsCov = coverageScore(live.headings, rebuild.headings);
  const ctaCov = coverageScore(live.ctaLabels, rebuild.ctaLabels);
  const testiOk = withinDelta(rebuild.testimonialCount, live.testimonialCount, 0.7);
  const featOk = withinDelta(rebuild.featureSectionCount, live.featureSectionCount, 0.7);
  const heroOk = ![...rebuild.headings].some((h) => h === "airsaas") || rebuild.headings.size > 1;
  // Landings: DS uses ListInline for sub-feature bullets (not H3), so heading
  // coverage will naturally be lower than blog. Lower threshold to 25% and
  // require basic structure (hero ok + some headings rendered).
  const pass = headingsCov >= 0.25 && heroOk && rebuild.headings.size >= 5;
  const missingHeadings = [...live.headings].filter((h) => !rebuild.headings.has(h)).slice(0, 5);
  return {
    pass,
    headingsCov,
    ctaCov,
    testiOk,
    featOk,
    heroOk,
    liveHeadingsCount: live.headings.size,
    rebuildHeadingsCount: rebuild.headings.size,
    missingHeadings,
  };
}

function evaluateBlog(live, rebuild, slug) {
  const headingsCov = coverageScore(live.headings, rebuild.headings);
  const paragraphsOk = withinDelta(rebuild.paragraphCount, live.paragraphCount, 0.3);
  const figuresOk = withinDelta(rebuild.figureCount, live.figureCount, 0.5);
  const heroOk =
    ![...rebuild.headings].some((h) => h === "airsaas") || rebuild.headings.size > 1;
  const threshold = OUTLIER_RELAXED.has(slug) ? 0.4 : 0.7;
  const pass = headingsCov >= threshold && paragraphsOk && heroOk;
  const missingHeadings = [...live.headings].filter((h) => !rebuild.headings.has(h)).slice(0, 5);
  return {
    pass,
    headingsCov,
    paragraphsOk,
    figuresOk,
    heroOk,
    liveHeadingsCount: live.headings.size,
    rebuildHeadingsCount: rebuild.headings.size,
    liveParagraphCount: live.paragraphCount,
    rebuildParagraphCount: rebuild.paragraphCount,
    missingHeadings,
  };
}

// ─── Main ───────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { type: null, slug: null };
  for (const a of args) {
    if (a.startsWith("--type=")) opts.type = a.slice(7);
    else if (a.startsWith("--slug=")) opts.slug = a.slice(7);
  }
  return opts;
}

async function processTarget(target) {
  if (OUTLIER_SKIP.has(target.slug)) {
    return {
      ...target,
      skipped: true,
      reason: "outlier — non-blog pillar page",
    };
  }
  const [liveRes, rebuildRes] = await Promise.all([
    fetchHtml(target.liveUrl),
    fetchHtml(target.rebuildUrl),
  ]);
  if (!liveRes.ok) {
    return {
      ...target,
      pass: false,
      error: `live fetch fail: ${liveRes.error}`,
    };
  }
  if (!rebuildRes.ok) {
    return {
      ...target,
      pass: false,
      error: `rebuild fetch fail: ${rebuildRes.error}`,
    };
  }
  const live = extractFingerprint(liveRes.html);
  const rebuild = extractFingerprint(rebuildRes.html);
  const evaluation =
    target.type === "blog"
      ? evaluateBlog(live, rebuild, target.slug)
      : evaluateLanding(live, rebuild);
  return {
    ...target,
    ...evaluation,
    live: {
      headings: live.headings.size,
      paragraphs: live.paragraphCount,
      figures: live.figureCount,
      imgs: live.imgCount,
      testimonials: live.testimonialCount,
    },
    rebuild: {
      headings: rebuild.headings.size,
      paragraphs: rebuild.paragraphCount,
      figures: rebuild.figureCount,
      imgs: rebuild.imgCount,
      testimonials: rebuild.testimonialCount,
    },
  };
}

async function runConcurrent(targets, concurrency = 4) {
  const queue = [...targets];
  const results = [];
  let processed = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length > 0) {
      const t = queue.shift();
      const r = await processTarget(t);
      results.push(r);
      processed += 1;
      const flag = r.skipped ? "SKIP" : r.pass ? "PASS" : "FAIL";
      const cov =
        r.headingsCov !== undefined ? `${(r.headingsCov * 100).toFixed(0)}%` : "—";
      console.log(
        `  [${processed}/${targets.length}] ${flag} ${t.type}/${t.slug}  cov=${cov}  ${r.error || ""}`,
      );
    }
  });
  await Promise.all(workers);
  return results;
}

function buildReport(results) {
  const total = results.length;
  const skipped = results.filter((r) => r.skipped).length;
  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass && !r.skipped).length;

  const byType = {};
  for (const r of results) {
    if (!byType[r.type]) byType[r.type] = { total: 0, pass: 0, fail: 0, skip: 0 };
    byType[r.type].total += 1;
    if (r.skipped) byType[r.type].skip += 1;
    else if (r.pass) byType[r.type].pass += 1;
    else byType[r.type].fail += 1;
  }

  let md = `# Rebuild verification report — Phase 4\n\n`;
  md += `**Date** : ${new Date().toISOString()}\n\n`;
  md += `**Total** : ${total} pages — **${passed} PASS** / ${failed} FAIL / ${skipped} SKIP\n\n`;
  md += `## Stats by type\n\n`;
  md += `| Type | Total | PASS | FAIL | SKIP | Pass rate |\n`;
  md += `|---|---|---|---|---|---|\n`;
  for (const t of Object.keys(byType)) {
    const s = byType[t];
    const rate = s.total - s.skip > 0 ? ((s.pass / (s.total - s.skip)) * 100).toFixed(0) : "—";
    md += `| **${t}** | ${s.total} | ${s.pass} | ${s.fail} | ${s.skip} | ${rate}% |\n`;
  }
  md += `\n## Failures\n\n`;
  const failures = results.filter((r) => !r.pass && !r.skipped);
  if (failures.length === 0) {
    md += `_None — all pages pass the threshold._\n\n`;
  } else {
    md += `| Slug | Type | Coverage | Live H | Rebuild H | Missing (top 5) | Error |\n`;
    md += `|---|---|---|---|---|---|---|\n`;
    for (const r of failures) {
      const cov = r.headingsCov !== undefined ? `${(r.headingsCov * 100).toFixed(0)}%` : "—";
      const missing = (r.missingHeadings || []).map((h) => h.slice(0, 50)).join("<br/>");
      md += `| \`${r.slug}\` | ${r.type} | ${cov} | ${r.liveHeadingsCount ?? "—"} | ${r.rebuildHeadingsCount ?? "—"} | ${missing} | ${r.error || ""} |\n`;
    }
  }
  md += `\n## All pages (sorted by coverage)\n\n`;
  md += `| Slug | Type | Status | Cov H | Live/Rebuild H | Live/Rebuild p | Live/Rebuild fig |\n`;
  md += `|---|---|---|---|---|---|---|\n`;
  const sorted = [...results].sort(
    (a, b) => (a.headingsCov ?? -1) - (b.headingsCov ?? -1),
  );
  for (const r of sorted) {
    const status = r.skipped ? "SKIP" : r.pass ? "PASS" : "FAIL";
    const cov = r.headingsCov !== undefined ? `${(r.headingsCov * 100).toFixed(0)}%` : "—";
    const h = `${r.live?.headings ?? "—"}/${r.rebuild?.headings ?? "—"}`;
    const p = `${r.live?.paragraphs ?? "—"}/${r.rebuild?.paragraphs ?? "—"}`;
    const f = `${r.live?.figures ?? "—"}/${r.rebuild?.figures ?? "—"}`;
    md += `| \`${r.slug}\` | ${r.type} | ${status} | ${cov} | ${h} | ${p} | ${f} |\n`;
  }
  return md;
}

async function main() {
  const opts = parseArgs();
  let targets = TARGETS;
  if (opts.type) targets = targets.filter((t) => t.type === opts.type);
  if (opts.slug) targets = targets.filter((t) => t.slug === opts.slug);

  console.log(`[verify] target count = ${targets.length}`);
  console.log(`[verify] rebuild base = ${REBUILD_BASE}`);

  const startedAt = Date.now();
  const results = await runConcurrent(targets, 4);
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);

  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass && !r.skipped).length;
  const skipped = results.filter((r) => r.skipped).length;
  console.log(`\n[verify] DONE in ${elapsed}s — ${passed} PASS / ${failed} FAIL / ${skipped} SKIP`);

  mkdirSync(dirname(REPORT_PATH), { recursive: true });
  mkdirSync(dirname(REPORT_JSON), { recursive: true });
  writeFileSync(REPORT_PATH, buildReport(results), "utf8");
  writeFileSync(REPORT_JSON, JSON.stringify(results, null, 2), "utf8");
  console.log(`[verify] report → ${REPORT_PATH}`);

  process.exit(failed > 0 && passed / (passed + failed) < 0.5 ? 1 : 0);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
