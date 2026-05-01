#!/usr/bin/env node
/**
 * promote-blog-extracts.mjs — Replace src/data/blog-articles-v2.ts with the
 * Opus-extracted versions from docs/raw/llm-test/blog-*.json.
 *
 * Strategy : for any blog where the new Opus extract has more blocks than
 * the current Python-regex parsed version, promote it. Otherwise keep the
 * regex output. This guards against regressions on blogs where Opus failed
 * (FAIL after 3 iterations) or returned fewer blocks than the regex parser.
 *
 * Output : overwrites src/data/blog-articles-v2.ts, preserves the file
 *          structure (header + BLOG_ARTICLES_V2 + BLOG_ARTICLES_V2_BY_SLUG +
 *          ACTIVE_BLOG_ARTICLES_V2 exports).
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT } from "./llm-parse-shared.mjs";

const LLM_DIR = join(REPO_ROOT, "docs/raw/llm-test");
const TARGET = join(REPO_ROOT, "src/data/blog-articles-v2.ts");

function readCurrentBlogs() {
  const txt = readFileSync(TARGET, "utf8");
  const m = txt.match(/BLOG_ARTICLES_V2\s*:\s*BlogArticleV2\[\]\s*=\s*(\[[\s\S]*?\])\s*;/);
  if (!m) throw new Error("Cannot extract BLOG_ARTICLES_V2 from blog-articles-v2.ts");
  return JSON.parse(m[1]);
}

function loadOpusBlogsBySlug() {
  const map = new Map();
  for (const file of readdirSync(LLM_DIR)) {
    if (!file.startsWith("blog-") || !file.endsWith(".json")) continue;
    const data = JSON.parse(readFileSync(join(LLM_DIR, file), "utf8"));
    if (data.type !== "blog" || !data.result) continue;
    if (!data.result.blocks || data.result.blocks.length === 0) continue;
    map.set(data.slug, data);
  }
  return map;
}

function promote() {
  const current = readCurrentBlogs();
  const opus = loadOpusBlogsBySlug();

  let promoted = 0;
  let kept = 0;
  let regressed = 0;

  const finalBlogs = current.map((cur) => {
    const op = opus.get(cur.slug);
    if (!op) {
      kept++;
      return cur;
    }
    const opBlocks = op.result.blocks?.length || 0;
    const curBlocks = cur.blocks?.length || 0;
    if (opBlocks <= curBlocks) {
      regressed++;
      console.log(`  - keep current ${cur.slug} (Opus ${opBlocks} < current ${curBlocks})`);
      return cur;
    }
    promoted++;
    console.log(`  ✓ promote ${cur.slug} (${curBlocks} → ${opBlocks} blocks)`);
    return {
      slug: cur.slug,
      skip: cur.skip ?? false,
      meta: op.result.meta || cur.meta,
      blocks: op.result.blocks,
      ...(op.result.faq ? { faq: op.result.faq } : {}),
      ...(op.result.related ? { related: op.result.related } : {}),
      ...(op.result.toc ? { toc: op.result.toc } : {}),
    };
  });

  // Add any Opus-only entries not in current (shouldn't happen, but defensive)
  for (const [slug, op] of opus) {
    if (!current.find((c) => c.slug === slug)) {
      finalBlogs.push({
        slug,
        skip: false,
        meta: op.result.meta,
        blocks: op.result.blocks,
        ...(op.result.faq ? { faq: op.result.faq } : {}),
        ...(op.result.related ? { related: op.result.related } : {}),
        ...(op.result.toc ? { toc: op.result.toc } : {}),
      });
      promoted++;
      console.log(`  + new ${slug}`);
    }
  }

  const header = `// AUTO-GENERATED — do not edit by hand
// Regenerate: node scripts/migrate/promote-blog-extracts.mjs
// Source: docs/raw/llm-test/blog-*.json (Opus 4.7 extraction)

import type { BlogArticleV2 } from "@/types/blog-v2";

export const BLOG_ARTICLES_V2: BlogArticleV2[] = ${JSON.stringify(finalBlogs, null, 0)};

export const BLOG_ARTICLES_V2_BY_SLUG: Record<string, BlogArticleV2> =
  Object.fromEntries(BLOG_ARTICLES_V2.map((a) => [a.slug, a]));

export const ACTIVE_BLOG_ARTICLES_V2: BlogArticleV2[] =
  BLOG_ARTICLES_V2.filter((a) => !a.skip);
`;

  writeFileSync(TARGET, header, "utf8");
  console.log(
    `\n[promote-blog] DONE — ${promoted} promoted, ${regressed} kept (Opus regression), ${kept} kept (no Opus extract)`,
  );
  console.log(`Total : ${finalBlogs.length} blog articles in ${TARGET.replace(REPO_ROOT + "/", "")}`);
}

promote();
