#!/usr/bin/env node
/**
 * scan-blog-data-issues.mjs
 *
 * Deterministic scan of src/data/blog-articles-v2.ts for the patterns the
 * user cares about ("blog pages nickel sans erreur de images, de quotes etc.").
 *
 * Covers :
 *   - placeholder / broken image URLs
 *   - href="" / href="#" / href="https://LINK_..."
 *   - HTML literal leaks in extracted text (&lt;, &gt;, &nbsp;, &amp;amp;)
 *   - "Speaker avatar:" / "LINK_SPEAKER_PAGE" / "insert the link" CMS placeholders
 *   - empty quote/callout text
 *   - quote blocks that should be callouts (alert emoji or callout label)
 *   - figure blocks without src
 *   - paragraph blocks with only whitespace / ZWSP
 *   - list items containing raw <ul> / <li> markup
 *
 * Usage : node scripts/migrate/scan-blog-data-issues.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT } from "./llm-parse-shared.mjs";

const TS_PATH = join(REPO_ROOT, "src/data/blog-articles-v2.ts");
const OUT_PATH = join(REPO_ROOT, "docs/blog-data-issues.md");

function readArticles() {
  const txt = readFileSync(TS_PATH, "utf8");
  const m = txt.match(/BLOG_ARTICLES_V2[^=]*=\s*(\[[\s\S]*\])\s*(?:as const)?\s*;/);
  if (!m) throw new Error("Cannot find BLOG_ARTICLES_V2 array");
  return JSON.parse(m[1]);
}

// ─── Issue detectors ────────────────────────────────────────────────────────

const PLACEHOLDER_HREFS = /^(?:#|)$|LINK_SPEAKER_PAGE|^\s*$|^javascript:/i;
const PLACEHOLDER_IMAGES = /placehold\.co|placeholder|via\.placeholder|dummyimage/i;
// Only flag DOUBLE-encoded entities (&amp;X), since `dangerouslySetInnerHTML`
// decodes single-encoded `&gt;` `&nbsp;` correctly at render time.
const HTML_LITERAL = /&amp;(?:lt|gt|amp|quot|nbsp|#x?[0-9a-f]+);/i;
const CMS_PLACEHOLDER_TXT = /Speaker avatar:|LINK_SPEAKER_PAGE|insert the link|change url of background-image/i;
const ZWSP = /[​-‍﻿]/;
const ALERT_EMOJI_OR_LABEL =
  /^(?:\s|<[^>]+>)*(?:⚠️|💡|✨|📌|🚨|❗|🔔|✅|💬|<strong[^>]*>\s*(?:À retenir|À noter|Bon à savoir|En résumé|Le saviez-vous|Astuce|Pro tip))/i;
const RAW_LIST_MARKUP = /<\/?ul[\s>]|<\/?ol[\s>]|<\/?li[\s>]/i;

function scanArticle(article) {
  const issues = [];
  const push = (severity, kind, detail) => issues.push({ severity, kind, detail });

  if (article.skip) {
    push("INFO", "skipped", "skip:true — not rendered");
    return issues;
  }

  // Meta
  const m = article.meta || {};
  if (!m.h1 || !m.h1.trim()) push("P0", "missing-h1", "meta.h1 empty");
  if (!m.heroImage?.src) push("P1", "missing-hero", "meta.heroImage.src empty");
  else if (PLACEHOLDER_IMAGES.test(m.heroImage.src)) push("P1", "placeholder-hero", m.heroImage.src);
  if (m.author && m.author.avatarSrc && PLACEHOLDER_IMAGES.test(m.author.avatarSrc))
    push("P2", "placeholder-author-avatar", m.author.avatarSrc);

  // Blocks
  const blocks = article.blocks || [];
  if (blocks.length === 0) push("P0", "no-blocks", "blocks array empty");

  blocks.forEach((b, i) => {
    const at = `blocks[${i}] (${b.type})`;
    switch (b.type) {
      case "paragraph": {
        const txt = (b.html ?? b.text ?? "").trim();
        if (!txt || ZWSP.test(txt) && txt.replace(ZWSP, "").trim().length < 3)
          push("P1", "empty-paragraph", at);
        if (CMS_PLACEHOLDER_TXT.test(txt))
          push("P0", "cms-placeholder", `${at}: ${txt.slice(0, 80)}`);
        if (HTML_LITERAL.test(txt))
          push("P1", "html-literal", `${at}: ${(txt.match(HTML_LITERAL) || ["?"])[0]}`);
        break;
      }
      case "heading": {
        const t = (b.text ?? "").trim();
        if (!t) push("P1", "empty-heading", at);
        if (CMS_PLACEHOLDER_TXT.test(t))
          push("P0", "cms-placeholder", `${at}: ${t.slice(0, 80)}`);
        if (HTML_LITERAL.test(t)) push("P2", "html-literal", `${at}: heading`);
        break;
      }
      case "figure": {
        if (!b.src) push("P0", "figure-no-src", at);
        else if (PLACEHOLDER_IMAGES.test(b.src)) push("P1", "placeholder-figure", `${at}: ${b.src}`);
        break;
      }
      case "quote": {
        const t = (b.text ?? "").trim();
        if (!t) push("P1", "empty-quote", at);
        if (CMS_PLACEHOLDER_TXT.test(t))
          push("P0", "cms-placeholder", `${at}: ${t.slice(0, 80)}`);
        if (ALERT_EMOJI_OR_LABEL.test(t))
          push("P1", "alert-quote-should-be-callout", `${at}: ${t.slice(0, 80)}`);
        if (b.author && CMS_PLACEHOLDER_TXT.test(b.author))
          push("P0", "cms-placeholder", `${at} author: ${b.author}`);
        if (b.authorAvatar && PLACEHOLDER_IMAGES.test(b.authorAvatar))
          push("P2", "placeholder-author-avatar", `${at}: ${b.authorAvatar}`);
        if (HTML_LITERAL.test(t)) push("P1", "html-literal", `${at}: quote text`);
        break;
      }
      case "insight-callout": {
        const html = (b.html ?? "").trim();
        if (!html || html.length < 5) push("P1", "empty-callout", at);
        if (CMS_PLACEHOLDER_TXT.test(html))
          push("P0", "cms-placeholder", `${at}: ${html.slice(0, 80)}`);
        if (HTML_LITERAL.test(html)) push("P1", "html-literal", `${at}: callout html`);
        break;
      }
      case "table": {
        if (!b.rows || b.rows.length === 0) push("P0", "empty-table", at);
        if (b.headers && b.headers.length > 6)
          push("P2", "table-too-many-cols", `${at}: ${b.headers.length} cols`);
        break;
      }
      case "list": {
        if (!b.items || b.items.length === 0) {
          push("P1", "empty-list", at);
        } else {
          b.items.forEach((item, j) => {
            if (RAW_LIST_MARKUP.test(item))
              push("P2", "raw-list-markup-in-item", `${at}.items[${j}]`);
            if (HTML_LITERAL.test(item))
              push("P2", "html-literal", `${at}.items[${j}]`);
          });
        }
        break;
      }
      case "inline-cta":
      case "hubspot-cta": {
        if (!b.label) push("P1", "cta-no-label", at);
        if (!b.href || PLACEHOLDER_HREFS.test(b.href))
          push("P0", "cta-bad-href", `${at}: "${b.href || ""}"`);
        break;
      }
    }
  });

  // FAQ + related + toc
  for (const [i, f] of (article.faq || []).entries()) {
    if (!f.question?.trim()) push("P1", "empty-faq-q", `faq[${i}]`);
    if (!f.answer?.trim()) push("P1", "empty-faq-a", `faq[${i}]`);
    if (CMS_PLACEHOLDER_TXT.test(`${f.question}${f.answer}`))
      push("P0", "cms-placeholder", `faq[${i}]`);
  }
  for (const [i, r] of (article.related || []).entries()) {
    if (!r.label) push("P2", "related-no-label", `related[${i}]`);
    if (!r.href || PLACEHOLDER_HREFS.test(r.href))
      push("P2", "related-bad-href", `related[${i}]: "${r.href || ""}"`);
  }
  for (const [i, t] of (article.toc || []).entries()) {
    if (!t.href || !t.href.startsWith("#"))
      push("P2", "toc-bad-href", `toc[${i}]: ${t.href || ""}`);
  }

  return issues;
}

function main() {
  const articles = readArticles();
  let totalP0 = 0, totalP1 = 0, totalP2 = 0;
  const articleIssues = [];

  for (const a of articles) {
    const issues = scanArticle(a);
    const p0 = issues.filter((i) => i.severity === "P0").length;
    const p1 = issues.filter((i) => i.severity === "P1").length;
    const p2 = issues.filter((i) => i.severity === "P2").length;
    totalP0 += p0; totalP1 += p1; totalP2 += p2;
    if (issues.length > 0) articleIssues.push({ slug: a.slug, p0, p1, p2, issues });
  }

  const lines = [];
  lines.push("# Blog data issues — deterministic scan");
  lines.push(`Generated : ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Articles scanned : ${articles.length}`);
  lines.push(`- Articles with ≥1 issue : ${articleIssues.length}`);
  lines.push(`- Total P0 (blocker) : ${totalP0}`);
  lines.push(`- Total P1 (high)    : ${totalP1}`);
  lines.push(`- Total P2 (low)     : ${totalP2}`);
  lines.push("");

  // Aggregate by kind
  const byKind = new Map();
  for (const a of articleIssues) for (const i of a.issues) {
    if (!byKind.has(i.kind)) byKind.set(i.kind, { count: 0, articles: new Set() });
    const entry = byKind.get(i.kind);
    entry.count++;
    entry.articles.add(a.slug);
  }
  lines.push("## By issue kind");
  lines.push("");
  lines.push("| Kind | Count | Articles |");
  lines.push("|---|---|---|");
  const sorted = [...byKind.entries()].sort((a, b) => b[1].count - a[1].count);
  for (const [kind, info] of sorted) {
    lines.push(`| \`${kind}\` | ${info.count} | ${info.articles.size} |`);
  }

  lines.push("");
  lines.push("## Per-article detail (sorted by severity)");
  lines.push("");
  articleIssues.sort((a, b) => b.p0 * 1000 + b.p1 * 10 + b.p2 - (a.p0 * 1000 + a.p1 * 10 + a.p2));
  for (const a of articleIssues) {
    lines.push(`### \`${a.slug}\`  (P0=${a.p0}, P1=${a.p1}, P2=${a.p2})`);
    for (const i of a.issues.slice(0, 20)) {
      lines.push(`- [${i.severity}] \`${i.kind}\` — ${i.detail}`);
    }
    if (a.issues.length > 20) lines.push(`- … +${a.issues.length - 20} more`);
    lines.push("");
  }

  writeFileSync(OUT_PATH, lines.join("\n"));
  console.log(`[scan-blog-data] written ${OUT_PATH}`);
  console.log(
    `[scan-blog-data] articles=${articles.length}  issues_p0=${totalP0}  p1=${totalP1}  p2=${totalP2}  affected=${articleIssues.length}`,
  );
}

main();
