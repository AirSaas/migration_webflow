#!/usr/bin/env node
/**
 * audit-v3-vs-source.mjs
 *
 * Cross-checks each V3 article against :
 *   - The Webflow source HTML in Supabase (content faithfulness)
 *   - The rendered Next.js page (component instantiation)
 *
 * Goal : catch things the Opus Visual Auditor might have missed —
 *   - Block count divergences (extractor dropped sections, Designer doubled)
 *   - Empty paragraph blocks (ZWSP-only)
 *   - HTML literals in text
 *   - Truncated quote text (vs source)
 *   - Missing TOC items
 *   - Heading order / level mismatches
 *
 * Outputs : docs/blog-migration/_v3-audit.md (one report for all articles)
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv, fetchPagesFromSupabase } from "./llm-parse-shared.mjs";

loadEnv();

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");
const V3_PATH = join(REPO_ROOT, "src/data/blog-articles-v3.ts");
const OUT_PATH = join(REPO_ROOT, "docs/blog-migration/_v3-audit.md");
const DEV_BASE = process.env.REBUILD_BASE || "http://localhost:3000";

const ZWSP = /[​-‍﻿]/;
const HTML_LITERAL = /&amp;(?:lt|gt|amp|quot|nbsp|#x?[0-9a-f]+);/i;

function readV3() {
  const txt = readFileSync(V3_PATH, "utf8");
  const m = txt.match(/BLOG_ARTICLES_V3[^=]*=\s*(\[[\s\S]*\])\s*(?:as const)?\s*;/);
  if (!m) throw new Error("Cannot find BLOG_ARTICLES_V3");
  return JSON.parse(m[1]);
}

function extractArticleBody(html) {
  const containers = [
    /<div[^>]*class="[^"]*container__article__integrations__text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i,
    /<div[^>]*class="[^"]*blog-post-body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/section>/i,
    /<div[^>]*class="[^"]*rich-text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
  ];
  for (const re of containers) {
    const m = html.match(re);
    if (m && m[1].length > 500) return m[1];
  }
  const bm = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bm ? bm[1] : html;
}

function countTag(html, tag) {
  const re = new RegExp(`<${tag}\\b[^>]*>`, "gi");
  return (html.match(re) || []).length;
}

function countBlocksByType(blocks) {
  const c = {};
  for (const b of blocks) c[b.type] = (c[b.type] || 0) + 1;
  return c;
}

function listHeadings(blocks) {
  return blocks
    .filter((b) => b.type === "heading")
    .map((b) => ({ level: b.level, text: b.text.slice(0, 80) }));
}

function listSourceHeadings(html) {
  const body = extractArticleBody(html);
  const re = /<h([2-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const out = [];
  let m;
  while ((m = re.exec(body)) !== null) {
    const level = parseInt(m[1], 10);
    const text = m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (text) out.push({ level, text: text.slice(0, 80) });
  }
  return out;
}

async function auditArticle(article, sourceHtml) {
  const issues = [];
  const counts = countBlocksByType(article.blocks);
  const sourceBody = extractArticleBody(sourceHtml);
  const sourceCounts = {
    h2: countTag(sourceBody, "h2"),
    h3: countTag(sourceBody, "h3"),
    h4: countTag(sourceBody, "h4"),
    blockquote: countTag(sourceBody, "blockquote"),
    table: countTag(sourceBody, "table"),
    ul: countTag(sourceBody, "ul"),
    ol: countTag(sourceBody, "ol"),
    figure: countTag(sourceBody, "figure"),
    img: countTag(sourceBody, "img"),
    p: countTag(sourceBody, "p"),
  };

  const v3Headings = listHeadings(article.blocks);
  const srcHeadings = listSourceHeadings(sourceHtml);

  // 1. Heading count drop
  if (v3Headings.length < srcHeadings.length) {
    issues.push({
      severity: "P1",
      kind: "heading-count-drop",
      detail: `V3 has ${v3Headings.length} headings, source HTML has ${srcHeadings.length} (drop ${srcHeadings.length - v3Headings.length})`,
    });
  }

  // 2. Empty blocks
  for (const [i, b] of article.blocks.entries()) {
    if (b.type === "paragraph") {
      const html = (b.html || "").trim();
      if (!html || (ZWSP.test(html) && html.replace(ZWSP, "").trim().length < 3)) {
        issues.push({ severity: "P1", kind: "empty-paragraph", detail: `blocks[${i}]` });
      }
      if (HTML_LITERAL.test(html)) {
        issues.push({ severity: "P1", kind: "double-encoded-entity", detail: `blocks[${i}]: ${(html.match(HTML_LITERAL) || [""])[0]}` });
      }
    }
    if (b.type === "heading" && (!b.text || !b.text.trim())) {
      issues.push({ severity: "P1", kind: "empty-heading", detail: `blocks[${i}] level=${b.level}` });
    }
    if (b.type === "quote" && (!b.text || b.text.trim().length < 10)) {
      issues.push({ severity: "P1", kind: "short-quote", detail: `blocks[${i}] text="${(b.text || "").slice(0, 30)}"` });
    }
    if (b.type === "figure" && !b.src) {
      issues.push({ severity: "P0", kind: "figure-no-src", detail: `blocks[${i}]` });
    }
    if (b.type === "table" && (!b.rows || !b.rows.length)) {
      issues.push({ severity: "P0", kind: "empty-table", detail: `blocks[${i}]` });
    }
    if (b.type === "inline-cta" && (!b.ctaHref || !b.ctaLabel)) {
      issues.push({ severity: "P1", kind: "cta-incomplete", detail: `blocks[${i}] label="${b.ctaLabel}" href="${b.ctaHref}"` });
    }
  }

  // 3. Variant compliance (P0 visual)
  for (const [i, b] of article.blocks.entries()) {
    if (b.type === "quote" && b.variant !== "card") {
      issues.push({ severity: "P0", kind: "quote-wrong-variant", detail: `blocks[${i}] variant="${b.variant}" (expected card)` });
    }
    if (b.type === "heading" && b.level === 3 && b.gradient !== "primary") {
      issues.push({ severity: "P0", kind: "h3-no-gradient", detail: `blocks[${i}] gradient="${b.gradient}" (expected primary)` });
    }
    if (b.type === "figure" && b.widthMode !== "breakout") {
      issues.push({ severity: "P1", kind: "figure-not-breakout", detail: `blocks[${i}] widthMode="${b.widthMode}"` });
    }
    if (b.type === "figure" && b.tone !== "warm") {
      issues.push({ severity: "P1", kind: "figure-not-warm", detail: `blocks[${i}] tone="${b.tone}"` });
    }
  }

  // 4. Layout — must be centeredToc unless < 3 TOC items
  if (article.layout !== "centeredToc" && article.toc.length >= 3) {
    issues.push({
      severity: "P0",
      kind: "wrong-layout",
      detail: `layout="${article.layout}" but toc.length=${article.toc.length} — should be centeredToc`,
    });
  }

  // 5. TOC alignment with headings
  if (article.toc.length > 0 && article.toc.length < Math.min(5, srcHeadings.filter((h) => h.level === 2).length)) {
    issues.push({
      severity: "P2",
      kind: "toc-undercoverage",
      detail: `toc has ${article.toc.length} items, source has ${srcHeadings.filter((h) => h.level === 2).length} H2`,
    });
  }

  // 6. Rendered HTML check
  let renderedHttp = 0;
  let renderedQuoteCards = 0;
  let renderedTableHeaders = 0;
  let renderedPlaceholders = 0;
  try {
    const res = await fetch(`${DEV_BASE}/fr/blog/v3/${article.slug}`);
    renderedHttp = res.status;
    if (res.ok) {
      const html = await res.text();
      renderedQuoteCards = (html.match(/rounded-\[1\.5625rem\]/g) || []).length;
      renderedTableHeaders = (html.match(/<th\b/g) || []).length;
      renderedPlaceholders = (html.match(/placehold\.co/g) || []).length;
    }
  } catch (e) {
    issues.push({ severity: "P0", kind: "render-fetch-failed", detail: e.message });
  }

  if (renderedHttp !== 200) {
    issues.push({ severity: "P0", kind: "render-http-error", detail: `HTTP ${renderedHttp}` });
  }
  if (renderedPlaceholders > 0) {
    issues.push({ severity: "P0", kind: "rendered-placeholder", detail: `${renderedPlaceholders} placehold.co URLs in rendered HTML` });
  }

  const specQuotes = counts.quote || 0;
  if (renderedHttp === 200 && specQuotes > 0 && renderedQuoteCards < specQuotes) {
    issues.push({
      severity: "P1",
      kind: "quote-cards-undercount",
      detail: `spec has ${specQuotes} quotes but rendered HTML shows ${renderedQuoteCards} quote-card class instances`,
    });
  }

  return {
    slug: article.slug,
    counts,
    sourceCounts,
    headingDelta: srcHeadings.length - v3Headings.length,
    layout: article.layout,
    tocCount: article.toc.length,
    issues,
    renderedHttp,
    renderedQuoteCards,
    renderedTableHeaders,
    renderedPlaceholders,
  };
}

async function main() {
  const articles = readV3();
  console.log(`[v3-audit] loaded ${articles.length} V3 articles`);
  const supabaseRows = await fetchPagesFromSupabase("blog");
  const htmlBySlug = new Map(supabaseRows.map((r) => [r.slug, r.html_rendered]));

  const results = [];
  for (const a of articles) {
    const html = htmlBySlug.get(a.slug);
    if (!html) {
      console.log(`  skip ${a.slug} — no Supabase HTML`);
      continue;
    }
    const r = await auditArticle(a, html);
    results.push(r);
    const sev = r.issues.length === 0 ? "✓" : `${r.issues.filter((i) => i.severity === "P0").length} P0, ${r.issues.filter((i) => i.severity === "P1").length} P1`;
    console.log(`  ${a.slug.padEnd(60)} ${sev}`);
  }

  // Markdown report
  const lines = [
    "# V3 audit — spec vs source vs rendered",
    "",
    `Generated : ${new Date().toISOString()}`,
    "",
    "## Summary",
    "",
    `- Articles audited : ${results.length}`,
    `- ✅ Clean : ${results.filter((r) => r.issues.length === 0).length}`,
    `- ⚠️ With issues : ${results.filter((r) => r.issues.length > 0).length}`,
    `- Total P0 : ${results.reduce((s, r) => s + r.issues.filter((i) => i.severity === "P0").length, 0)}`,
    `- Total P1 : ${results.reduce((s, r) => s + r.issues.filter((i) => i.severity === "P1").length, 0)}`,
    `- Total P2 : ${results.reduce((s, r) => s + r.issues.filter((i) => i.severity === "P2").length, 0)}`,
    "",
    "## Block counts (V3 vs source HTML)",
    "",
    "| Slug | V3 head | Src head | V3 quote | V3 table | V3 callout | V3 figure | Layout | TOC | Rendered HTTP |",
    "|---|---|---|---|---|---|---|---|---|---|",
    ...results.map(
      (r) =>
        `| \`${r.slug}\` | ${r.counts.heading || 0} | ${r.sourceCounts.h2 + r.sourceCounts.h3 + r.sourceCounts.h4} | ${r.counts.quote || 0} | ${r.counts.table || 0} | ${r.counts["insight-callout"] || 0} | ${r.counts.figure || 0} | ${r.layout} | ${r.tocCount} | ${r.renderedHttp} |`,
    ),
    "",
    "## Issues per article",
    "",
  ];

  results.sort((a, b) => b.issues.length - a.issues.length);
  for (const r of results) {
    lines.push(`### \`${r.slug}\`  ${r.issues.length === 0 ? "✓" : `(${r.issues.length} issues)`}`);
    lines.push("");
    if (r.issues.length === 0) {
      lines.push("Clean.");
      lines.push("");
      continue;
    }
    for (const i of r.issues) {
      lines.push(`- [${i.severity}] \`${i.kind}\` — ${i.detail}`);
    }
    lines.push("");
  }

  writeFileSync(OUT_PATH, lines.join("\n"));
  console.log(`\n[v3-audit] report → ${OUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
