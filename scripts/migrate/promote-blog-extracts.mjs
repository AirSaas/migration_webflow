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
  // The exported array is enormous + contains nested arrays/objects, so a
  // greedy regex won't work. Find the start anchor, then walk char-by-char
  // tracking bracket depth (skipping over strings) to find the matching ].
  const txt = readFileSync(TARGET, "utf8");
  const anchor = "BLOG_ARTICLES_V2: BlogArticleV2[] = ";
  const startIdx = txt.indexOf(anchor);
  if (startIdx === -1) throw new Error("Cannot find BLOG_ARTICLES_V2 anchor");
  const arrStart = txt.indexOf("[", startIdx + anchor.length);
  if (arrStart === -1) throw new Error("Cannot find array start");
  let depth = 0;
  let inStr = false;
  let strQuote = "";
  let escape = false;
  for (let i = arrStart; i < txt.length; i++) {
    const ch = txt[i];
    if (inStr) {
      if (escape) { escape = false; continue; }
      if (ch === "\\") { escape = true; continue; }
      if (ch === strQuote) inStr = false;
      continue;
    }
    if (ch === '"' || ch === "'") {
      inStr = true;
      strQuote = ch;
      continue;
    }
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) {
        const arrJson = txt.slice(arrStart, i + 1);
        return JSON.parse(arrJson);
      }
    }
  }
  throw new Error("Unbalanced brackets in BLOG_ARTICLES_V2");
}

function slugifyHeading(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "section";
}

/** Normalize blocks to satisfy strict types (auto-derive heading id if missing). */
function normalizeBlocks(blocks) {
  return blocks.map((b) => {
    if (b.type === "heading" && !b.id && b.text) {
      return { ...b, id: slugifyHeading(b.text) };
    }
    return b;
  });
}

function loadOpusBlogsBySlug() {
  const map = new Map();
  for (const file of readdirSync(LLM_DIR)) {
    if (!file.startsWith("blog-") || !file.endsWith(".json")) continue;
    const data = JSON.parse(readFileSync(join(LLM_DIR, file), "utf8"));
    if (data.type !== "blog" || !data.result) continue;
    if (!data.result.blocks || data.result.blocks.length === 0) continue;
    // Normalize blocks (e.g. auto-derive heading.id when Opus skipped it)
    data.result.blocks = normalizeBlocks(data.result.blocks);
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
    // Regex parser fragments more aggressively (every <p> = block, including
    // empty / placeholder ones) so Opus often has fewer blocks while being
    // semantically richer. Only flag a regression if Opus has < 70% blocks
    // — that catches "Opus produced skeleton/empty output" cases.
    const SAFETY_THRESHOLD = 0.7;
    if (opBlocks < curBlocks * SAFETY_THRESHOLD) {
      regressed++;
      console.log(
        `  - keep current ${cur.slug} (Opus ${opBlocks} < ${Math.ceil(curBlocks * SAFETY_THRESHOLD)} = ${SAFETY_THRESHOLD * 100}% of regex ${curBlocks})`,
      );
      return cur;
    }
    promoted++;
    console.log(`  ✓ promote ${cur.slug} (regex ${curBlocks} → Opus ${opBlocks} blocks)`);
    // faq/related/toc default to [] so consumers never need null-guards.
    return {
      slug: cur.slug,
      skip: cur.skip ?? false,
      meta: op.result.meta || cur.meta,
      blocks: op.result.blocks,
      faq: op.result.faq || [],
      related: op.result.related || [],
      toc: op.result.toc || [],
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
        faq: op.result.faq || [],
        related: op.result.related || [],
        toc: op.result.toc || [],
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

export const BLOG_BY_SLUG_V2: Record<string, BlogArticleV2> =
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
