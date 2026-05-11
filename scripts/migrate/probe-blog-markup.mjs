#!/usr/bin/env node
/**
 * probe-blog-markup.mjs
 *
 * One-shot probe : pulls one or more blog HTMLs from Supabase, extracts the
 * article body, and dumps the first 2-3 occurrences of each block type
 * (blockquote, .blog-quote, .citation-blog, .a-retenir, .callout, <aside>,
 * <table>). Used to ground BLOG_RULES "WEBFLOW MARKUP EXAMPLES" in real
 * source markup rather than imagined patterns.
 *
 * Usage : node scripts/migrate/probe-blog-markup.mjs <slug>[,<slug2>...]
 */

import { loadEnv, fetchPagesFromSupabase } from "./llm-parse-shared.mjs";

loadEnv();

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

const PATTERNS = [
  { name: "blockquote", re: /<blockquote\b[\s\S]*?<\/blockquote>/gi },
  { name: ".blog-quote", re: /<(?:div|aside)\b[^>]*class="[^"]*blog-quote[^"]*"[^>]*>[\s\S]*?<\/(?:div|aside)>/gi },
  { name: ".citation-blog", re: /<(?:div|aside)\b[^>]*class="[^"]*citation-blog[^"]*"[^>]*>[\s\S]*?<\/(?:div|aside)>/gi },
  { name: ".pull-quote", re: /<(?:div|aside)\b[^>]*class="[^"]*pull-quote[^"]*"[^>]*>[\s\S]*?<\/(?:div|aside)>/gi },
  { name: ".a-retenir", re: /<(?:div|aside|section)\b[^>]*class="[^"]*a-retenir[^"]*"[^>]*>[\s\S]*?<\/(?:div|aside|section)>/gi },
  { name: ".callout", re: /<(?:div|aside)\b[^>]*class="[^"]*\bcallout[^"]*"[^>]*>[\s\S]*?<\/(?:div|aside)>/gi },
  { name: ".insight", re: /<(?:div|aside)\b[^>]*class="[^"]*\binsight[^"]*"[^>]*>[\s\S]*?<\/(?:div|aside)>/gi },
  { name: "<aside>", re: /<aside\b[\s\S]*?<\/aside>/gi },
  { name: "<table>", re: /<table\b[\s\S]*?<\/table>/gi },
];

function trim(s, max = 1200) {
  s = s.replace(/\s+/g, " ").trim();
  return s.length > max ? s.slice(0, max) + " …" : s;
}

async function main() {
  const slugArg = process.argv[2];
  if (!slugArg) {
    console.error("Usage: node scripts/migrate/probe-blog-markup.mjs <slug>[,<slug2>...]");
    process.exit(1);
  }
  const slugs = slugArg.split(",").map((s) => s.trim());

  const rows = await fetchPagesFromSupabase("blog");
  const bySlug = new Map(rows.map((r) => [r.slug, r.html_rendered]));

  for (const slug of slugs) {
    const html = bySlug.get(slug);
    if (!html) {
      console.log(`\n========== ${slug} — NOT FOUND ==========\n`);
      continue;
    }
    const body = extractArticleBody(html);
    console.log(`\n========== ${slug}  (body ${body.length} chars) ==========`);
    for (const { name, re } of PATTERNS) {
      const all = [...body.matchAll(re)].map((m) => m[0]);
      if (all.length === 0) continue;
      console.log(`\n--- ${name}  (${all.length} match${all.length > 1 ? "es" : ""}) ---`);
      for (const snippet of all.slice(0, 2)) {
        console.log(trim(snippet));
        console.log("---");
      }
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
