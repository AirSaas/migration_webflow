#!/usr/bin/env node
/**
 * qa-page.mjs — Phase 6.5 regex/DOM-based QA per page.
 *
 * Runs the automatable subset of docs/qa-checklist.md against rebuild
 * HTML (next dev). Outputs docs/qa-page-report.md with severity counts
 * and a per-page issue list.
 *
 * Pre-req: next dev on http://localhost:3000
 *
 * Usage:
 *   node scripts/qa-page.mjs
 *   node scripts/qa-page.mjs --slug=metier-pmo
 *   node scripts/qa-page.mjs --type=blog
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const REPORT_PATH = join(REPO_ROOT, "docs/qa-page-report.md");
const REPORT_JSON = join(REPO_ROOT, "docs/raw/qa-page.json");
const REBUILD_BASE = process.env.REBUILD_BASE || "http://localhost:3000";

// ─── Targets ─────────────────────────────────────────────────────────────────

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

const TARGETS = [];
for (const slug of LP_SLUGS) TARGETS.push({ slug, type: "lp", url: `/fr/lp/${slug}` });
for (const slug of PRODUIT_SLUGS) TARGETS.push({ slug, type: "produit", url: `/fr/produit/${slug}` });
for (const slug of SOLUTION_SLUGS) TARGETS.push({ slug, type: "solution", url: `/fr/solutions/${slug}` });
for (const slug of EQUIPE_SLUGS) TARGETS.push({ slug, type: "equipe", url: `/fr/equipes/${slug}` });

const blogJson = JSON.parse(
  readFileSync(join(REPO_ROOT, "docs/raw/blog-articles-v2-content.json"), "utf8"),
);
for (const a of blogJson) {
  if (a.skip) continue;
  TARGETS.push({ slug: a.slug, type: "blog", url: `/fr/blog/${a.slug}` });
}

// ─── Fetch ───────────────────────────────────────────────────────────────────

async function fetchHtml(url) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return { ok: res.ok, status: res.status, html: await res.text() };
  } catch (err) {
    return { ok: false, status: 0, html: "", error: err.message };
  } finally {
    clearTimeout(t);
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function visibleText(html) {
  // Remove <script>/<style>/<head>, then strip all tags
  return html
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function bodyOnly(html) {
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return m ? m[1] : html;
}

function attrOf(tag, attr) {
  const m = tag.match(new RegExp(`${attr}\\s*=\\s*"([^"]*)"`, "i"));
  return m ? m[1] : null;
}

// ─── Checks ──────────────────────────────────────────────────────────────────

function checkHtmlLiteralInText(html, issues) {
  const text = visibleText(bodyOnly(html));
  const decoded = decodeEntities(text);
  // Look for literal "<br/>", "<br>", "<strong>", "<em>" etc. as visible text
  const patterns = [
    /<br\s*\/?>/gi,
    /<\/?strong>/gi,
    /<\/?em>/gi,
    /<\/?a\b/gi,
    /<\/?p>/gi,
    /<\/?ul>/gi,
    /<\/?li>/gi,
  ];
  for (const re of patterns) {
    const matches = decoded.match(re);
    if (matches && matches.length > 0) {
      issues.push({
        severity: "P0",
        check: "htmlLiteralInText",
        details: `${matches.length}× literal "${matches[0]}" in visible text`,
      });
      return;
    }
  }
}

function checkHtmlEntitiesUnescaped(html, issues) {
  // Detect DOUBLE-encoded entities only (e.g. &amp;quot;) which the browser
  // would render as the literal "&quot;" string, breaking the UX. Single-
  // encoded entities (&quot;) are decoded by the browser to a glyph and
  // are NOT bugs.
  const text = visibleText(bodyOnly(html));
  const doubleEncoded = text.match(/&amp;(?:amp|lt|gt|quot|apos|nbsp|#\d+|#x[0-9a-f]+);/gi);
  if (doubleEncoded && doubleEncoded.length > 0) {
    issues.push({
      severity: "P0",
      check: "htmlEntitiesUnescaped",
      details: `${doubleEncoded.length}× double-encoded (e.g. ${doubleEncoded[0]})`,
    });
  }
}

function checkPlaceholderTitle(html, issues) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (m) {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    if (/^airsaas\s*$/i.test(text)) {
      issues.push({
        severity: "P0",
        check: "placeholderTitle",
        details: `H1 is placeholder "AirSaas"`,
      });
    }
  }
}

function checkPlaceholderImage(html, issues) {
  const matches = html.match(/<img[^>]+src="https:\/\/placehold\.co\/[^"]+"/gi) || [];
  if (matches.length > 0) {
    issues.push({
      severity: "P0",
      check: "placeholderImage",
      details: `${matches.length}× placehold.co image`,
    });
  }
}

function checkDuplicateH1(html, issues) {
  const h1s = html.match(/<h1\b/gi) || [];
  if (h1s.length > 1) {
    issues.push({
      severity: "P0",
      check: "duplicateH1",
      details: `${h1s.length} H1 tags (expect 1)`,
    });
  } else if (h1s.length === 0) {
    issues.push({
      severity: "P1",
      check: "missingH1",
      details: `No H1 found`,
    });
  }
}

function checkEmptyHrefs(html, issues) {
  const body = bodyOnly(html);
  // Anchors with href="" or href="#" excluding interactive elements
  const matches =
    body.match(/<a[^>]*href\s*=\s*"(?:|#)"[^>]*>(?!\s*<\/a>)/gi) || [];
  // Exclude common no-op patterns: navbar dropdown toggles, scroll-to-top
  const real = matches.filter(
    (m) =>
      !m.includes("aria-label") ||
      (!m.includes("dropdown") &&
        !m.includes("menu-toggle") &&
        !m.includes("haut de page")),
  );
  if (real.length > 3) {
    issues.push({
      severity: "P0",
      check: "emptyHrefs",
      details: `${real.length}× <a href=""> or <a href="#"> in body`,
    });
  } else if (real.length > 0) {
    issues.push({
      severity: "P1",
      check: "emptyHrefs",
      details: `${real.length}× <a href=""> or <a href="#">`,
    });
  }
}

function checkImagesHaveAlt(html, issues) {
  const imgs = html.match(/<img[^>]+>/gi) || [];
  let missing = 0;
  for (const img of imgs) {
    if (!/\balt\s*=\s*"[^"]*"/i.test(img)) missing += 1;
  }
  if (missing > 0) {
    issues.push({
      severity: "P1",
      check: "imagesWithoutAlt",
      details: `${missing}/${imgs.length} <img> sans alt`,
    });
  }
}

function checkHeroPresent(html, issues) {
  // Hero usually contains the H1. If no H1 → no Hero.
  if (!/<h1\b/i.test(html)) return;
  // Look for any of: DS Hero classes, OR any section/div above the first H1
  // (good enough heuristic — if H1 appears in first 30% of body, Hero is fine).
  const body = bodyOnly(html);
  const h1Idx = body.search(/<h1\b/i);
  if (h1Idx < 0) return;
  const ratio = h1Idx / body.length;
  if (ratio > 0.4) {
    issues.push({
      severity: "P2",
      check: "heroPresent",
      details: `H1 appears too late in body (${(ratio * 100).toFixed(0)}% in)`,
    });
  }
}

function checkFooterPresent(html, issues) {
  if (!/<footer\b/i.test(html)) {
    issues.push({
      severity: "P1",
      check: "footerPresent",
      details: "No <footer> element",
    });
  }
}

function checkNavbarPresent(html, issues) {
  if (!/<nav\b/i.test(html)) {
    issues.push({
      severity: "P1",
      check: "navbarPresent",
      details: "No <nav> element",
    });
  }
}

function checkHttpStatus(status, issues) {
  if (status >= 400) {
    issues.push({
      severity: "P0",
      check: "httpStatus",
      details: `HTTP ${status}`,
    });
  }
}

function checkBlogHeadingDownshift(html, type, issues) {
  if (type !== "blog") return;
  // In blog body, we expect H2 to be downshifted (DS level=3, max ~40px).
  // Detect raw H2 inside ProseFrame / BlogArticleBody — they should not exist.
  const proseMatch = html.match(/<section[^>]*max-w-\[91\.25rem\][\s\S]*?<\/section>/);
  if (!proseMatch) return;
  const h2 = (proseMatch[0].match(/<h2\b/g) || []).length;
  if (h2 > 0) {
    issues.push({
      severity: "P1",
      check: "blogHeadingDownshift",
      details: `${h2} <h2> inside blog body — should be <h3> (downshifted)`,
    });
  }
}

function checkSectionsCount(html, type, issues) {
  const sections = (html.match(/<section\b/gi) || []).length;
  if (type !== "blog" && sections < 2) {
    issues.push({
      severity: "P2",
      check: "minSectionCount",
      details: `Only ${sections} <section> elements`,
    });
  }
}

function checkConsoleHints(html, issues) {
  // Detect common dev artifacts that leak into prod
  if (/data-error="[^"]+"/i.test(html)) {
    issues.push({
      severity: "P3",
      check: "devErrorAttribute",
      details: "data-error attribute present",
    });
  }
}

function runChecks(target, html, status) {
  const issues = [];
  checkHttpStatus(status, issues);
  if (status >= 200 && status < 400 && html) {
    checkHtmlLiteralInText(html, issues);
    checkHtmlEntitiesUnescaped(html, issues);
    checkPlaceholderTitle(html, issues);
    checkPlaceholderImage(html, issues);
    checkDuplicateH1(html, issues);
    checkEmptyHrefs(html, issues);
    checkImagesHaveAlt(html, issues);
    checkHeroPresent(html, issues);
    checkFooterPresent(html, issues);
    checkNavbarPresent(html, issues);
    checkBlogHeadingDownshift(html, target.type, issues);
    checkSectionsCount(html, target.type, issues);
    checkConsoleHints(html, issues);
  }
  return issues;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

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
  const url = REBUILD_BASE + target.url;
  const res = await fetchHtml(url);
  return { ...target, status: res.status, issues: runChecks(target, res.html, res.status) };
}

async function runConcurrent(targets, concurrency = 6) {
  const queue = [...targets];
  const results = [];
  let processed = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length > 0) {
      const t = queue.shift();
      const r = await processTarget(t);
      results.push(r);
      processed += 1;
      const sevCounts = countSev(r.issues);
      const status = sevCounts.P0 > 0 ? "BLOCK" : sevCounts.P1 > 3 ? "WARN" : "PASS";
      console.log(
        `  [${processed}/${targets.length}] ${status} ${t.type}/${t.slug}  P0=${sevCounts.P0} P1=${sevCounts.P1} P2=${sevCounts.P2} P3=${sevCounts.P3}`,
      );
    }
  });
  await Promise.all(workers);
  return results;
}

function countSev(issues) {
  const c = { P0: 0, P1: 0, P2: 0, P3: 0 };
  for (const i of issues) c[i.severity] = (c[i.severity] || 0) + 1;
  return c;
}

function buildReport(results) {
  const total = results.length;
  let totP0 = 0, totP1 = 0, totP2 = 0, totP3 = 0;
  let blocking = 0, warn = 0, pass = 0;
  for (const r of results) {
    const c = countSev(r.issues);
    totP0 += c.P0;
    totP1 += c.P1;
    totP2 += c.P2;
    totP3 += c.P3;
    if (c.P0 > 0) blocking += 1;
    else if (c.P1 > 3) warn += 1;
    else pass += 1;
  }

  let md = `# QA report — regex/DOM (qa-page.mjs)\n\n`;
  md += `**Date** : ${new Date().toISOString()}\n\n`;
  md += `**Total** : ${total} pages — **${pass} PASS** / ${warn} WARN / ${blocking} BLOCK\n\n`;
  md += `**Severity totals** : P0 = ${totP0}, P1 = ${totP1}, P2 = ${totP2}, P3 = ${totP3}\n\n`;

  // By type
  const byType = {};
  for (const r of results) {
    if (!byType[r.type]) byType[r.type] = { total: 0, p0: 0, p1: 0, block: 0, pass: 0 };
    const c = countSev(r.issues);
    byType[r.type].total += 1;
    byType[r.type].p0 += c.P0;
    byType[r.type].p1 += c.P1;
    if (c.P0 > 0) byType[r.type].block += 1;
    else byType[r.type].pass += 1;
  }
  md += `## By type\n\n| Type | Total | P0 sum | P1 sum | BLOCK | PASS |\n|---|---|---|---|---|---|\n`;
  for (const [t, s] of Object.entries(byType)) {
    md += `| ${t} | ${s.total} | ${s.p0} | ${s.p1} | ${s.block} | ${s.pass} |\n`;
  }

  // BLOCKED pages first
  const blocked = results.filter((r) => countSev(r.issues).P0 > 0);
  if (blocked.length > 0) {
    md += `\n## P0 issues — must fix before ship\n\n`;
    for (const r of blocked) {
      md += `### \`${r.type}/${r.slug}\`\n\n`;
      for (const i of r.issues.filter((x) => x.severity === "P0")) {
        md += `- **${i.check}** : ${i.details}\n`;
      }
      md += "\n";
    }
  }

  // All results table
  md += `\n## All pages\n\n`;
  md += `| Slug | Type | Status | P0 | P1 | P2 | P3 |\n|---|---|---|---|---|---|---|\n`;
  const sorted = [...results].sort((a, b) => {
    const ca = countSev(a.issues), cb = countSev(b.issues);
    return cb.P0 - ca.P0 || cb.P1 - ca.P1;
  });
  for (const r of sorted) {
    const c = countSev(r.issues);
    const st = c.P0 > 0 ? "BLOCK" : c.P1 > 3 ? "WARN" : "PASS";
    md += `| \`${r.slug}\` | ${r.type} | ${st} | ${c.P0} | ${c.P1} | ${c.P2} | ${c.P3} |\n`;
  }

  // Top recurring P1 patterns
  const p1ByCheck = {};
  for (const r of results) {
    for (const i of r.issues.filter((x) => x.severity === "P1")) {
      p1ByCheck[i.check] = (p1ByCheck[i.check] || 0) + 1;
    }
  }
  if (Object.keys(p1ByCheck).length > 0) {
    md += `\n## Top P1 patterns\n\n| Check | Pages affected |\n|---|---|\n`;
    for (const [check, n] of Object.entries(p1ByCheck).sort((a, b) => b[1] - a[1])) {
      md += `| ${check} | ${n} |\n`;
    }
  }

  return md;
}

async function main() {
  const opts = parseArgs();
  let targets = TARGETS;
  if (opts.type) targets = targets.filter((t) => t.type === opts.type);
  if (opts.slug) targets = targets.filter((t) => t.slug === opts.slug);

  console.log(`[qa-page] target count = ${targets.length}`);
  console.log(`[qa-page] rebuild base = ${REBUILD_BASE}`);

  const startedAt = Date.now();
  const results = await runConcurrent(targets, 6);
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);

  const totals = results.reduce(
    (acc, r) => {
      const c = countSev(r.issues);
      acc.P0 += c.P0;
      acc.P1 += c.P1;
      return acc;
    },
    { P0: 0, P1: 0 },
  );
  const blocking = results.filter((r) => countSev(r.issues).P0 > 0).length;
  console.log(
    `\n[qa-page] DONE in ${elapsed}s — P0 total = ${totals.P0}, blocking pages = ${blocking}`,
  );

  mkdirSync(dirname(REPORT_PATH), { recursive: true });
  mkdirSync(dirname(REPORT_JSON), { recursive: true });
  writeFileSync(REPORT_PATH, buildReport(results), "utf8");
  writeFileSync(REPORT_JSON, JSON.stringify(results, null, 2), "utf8");
  console.log(`[qa-page] report → ${REPORT_PATH}`);

  process.exit(blocking > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
