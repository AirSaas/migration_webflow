/**
 * Blog v2 types — superset of types/blog.ts with enriched meta fields
 * (author, heroImage, toc) extracted from rendered HTML by the parser.
 *
 * Generated from src/data/blog-articles-v2.ts (parser:
 * scripts/migrate/parse-blog-articles-rebuild.py).
 */

import type { BlogArticleBlock, BlogFaqItem, BlogRelatedItem } from "./blog";

export interface BlogAuthorV2 {
  /** May be empty string when Opus only finds a category but no author name. */
  name?: string;
  avatarSrc?: string | null;
  publishedDate?: string | null;
  category?: string | null;
}

export interface BlogHeroImageV2 {
  src: string;
  alt: string;
}

export interface BlogMetaV2 {
  title: string;
  h1: string;
  description: string;
  publishedDate?: string | null;
  heroImage?: BlogHeroImageV2 | null;
  author?: BlogAuthorV2 | null;
}

export interface BlogTocItemV2 {
  label: string;
  href: string;
  /** Heading depth — 2 for top-level h2 sections, 3 for nested h3 (default 2). */
  level?: 2 | 3;
}

export interface BlogArticleV2 {
  slug: string;
  skip: boolean;
  reason?: string;
  meta: BlogMetaV2;
  blocks: BlogArticleBlock[];
  /** Always an array — promote-blog-extracts.mjs defaults to [] when missing. */
  faq: BlogFaqItem[];
  related: BlogRelatedItem[];
  toc: BlogTocItemV2[];
}
