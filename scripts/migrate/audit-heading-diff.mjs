#!/usr/bin/env node
/**
 * audit-heading-diff.mjs
 *
 * Per-article : list source H2/H3/H4/H5/H6 in DOM order, list V3 heading
 * texts, diff via set comparison. Tells us WHICH headings are missing.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv, fetchPagesFromSupabase } from "./llm-parse-shared.mjs";

loadEnv();
const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");

function readV3() {
  const txt = readFileSync(join(REPO_ROOT, "src/data/blog-articles-v3.ts"), "utf8");
  const m = txt.match(/BLOG_ARTICLES_V3[^=]*=\s*(\[[\s\S]*\])\s*(?:as const)?\s*;/);
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

function listSourceHeadings(html) {
  const body = extractArticleBody(html);
  // Also strip FAQ blocks — those are extracted separately, their h-tags should not be counted
  const cleaned = body.replace(/<div[^>]*class="[^"]*wrapper__faq[^"]*"[\s\S]*?(?=<div|<\/section|$)/gi, "");
  const re = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const out = [];
  let m;
  while ((m = re.exec(cleaned)) !== null) {
    const level = parseInt(m[1], 10);
    const text = m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (text) out.push({ level, text });
  }
  return out;
}

function normalize(t) {
  return t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

async function main() {
  const articles = readV3();
  const rows = await fetchPagesFromSupabase("blog");
  const htmlBySlug = new Map(rows.map((r) => [r.slug, r.html_rendered]));

  for (const a of articles) {
    const html = htmlBySlug.get(a.slug);
    if (!html) continue;
    const srcHeads = listSourceHeadings(html);
    const v3Heads = a.blocks.filter((b) => b.type === "heading");

    const srcByNorm = new Map(srcHeads.map((h) => [normalize(h.text), h]));
    const v3ByNorm = new Map(v3Heads.map((h) => [normalize(h.text), h]));

    const missingInV3 = srcHeads.filter((h) => !v3ByNorm.has(normalize(h.text)));
    const extraInV3 = v3Heads.filter((h) => !srcByNorm.has(normalize(h.text)));

    console.log(`\n══ ${a.slug} ══`);
    console.log(`  source: ${srcHeads.length} ; V3: ${v3Heads.length}`);
    console.log(`  source levels: h2=${srcHeads.filter((h) => h.level === 2).length} h3=${srcHeads.filter((h) => h.level === 3).length} h4=${srcHeads.filter((h) => h.level === 4).length} h5=${srcHeads.filter((h) => h.level === 5).length} h6=${srcHeads.filter((h) => h.level === 6).length}`);
    console.log(`  v3 levels:     l2=${v3Heads.filter((h) => h.level === 2).length} l3=${v3Heads.filter((h) => h.level === 3).length} l4=${v3Heads.filter((h) => h.level === 4).length}`);

    if (missingInV3.length > 0) {
      console.log(`  ⚠ ${missingInV3.length} headings in SOURCE missing from V3:`);
      for (const m of missingInV3.slice(0, 12)) {
        console.log(`     [h${m.level}] ${m.text.slice(0, 80)}`);
      }
    }
    if (extraInV3.length > 0) {
      console.log(`  ⚠ ${extraInV3.length} headings in V3 not in SOURCE (probably H1, FAQ, or invented):`);
      for (const e of extraInV3.slice(0, 12)) {
        console.log(`     [l${e.level}] ${e.text.slice(0, 80)}`);
      }
    }
    if (missingInV3.length === 0 && extraInV3.length === 0) console.log(`  ✓ headings match`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
