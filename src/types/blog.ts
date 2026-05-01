/**
 * Blog article types — mirrors the parser output in
 * `scripts/migrate/parse-blog-articles.py`.
 *
 * Each `BlogArticleBlock` variant maps to one DS primitive / section frame
 * in the render switch (see `src/components/pages/BlogPostPage.tsx`).
 */

export interface BlogArticleMeta {
  title: string;
  description: string;
  publishedDate: string | null;
  heroImage: string | null;
  fullUrl?: string | null;
}

export interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  id: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  /** Inner HTML — may contain <strong>, <em>, <a>, <br>. */
  html: string;
}

export interface ListBlock {
  type: "list";
  ordered: boolean;
  /** Each item is inline HTML. */
  items: string[];
}

export interface FigureBlock {
  type: "figure";
  src: string;
  alt: string;
  caption?: string | null;
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  author?: string | null;
  authorAvatar?: string | null;
  /** Optional caption rendered below the attribution (Opus may emit). */
  caption?: string | null;
}

export interface TableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

export interface InsightCalloutBlock {
  type: "insight-callout";
  html: string;
  /** Optional small label/badge above the callout (Opus may emit). */
  label?: string;
}

export interface InlineCtaBlock {
  type: "inline-cta";
  label: string;
  href: string;
  /** Optional surrounding text (Opus may emit). */
  text?: string;
}

export interface HubspotCtaBlock {
  type: "hubspot-cta";
  label: string;
  href: string;
  /** HubSpot CTA tracking id (Opus may emit). */
  id?: string;
}

export type BlogArticleBlock =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | FigureBlock
  | QuoteBlock
  | TableBlock
  | InsightCalloutBlock
  | InlineCtaBlock
  | HubspotCtaBlock;

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogRelatedItem {
  label: string;
  href: string;
}

export interface BlogArticle {
  slug: string;
  skip: boolean;
  reason?: string;
  meta: BlogArticleMeta;
  blocks: BlogArticleBlock[];
  faq?: BlogFaqItem[];
  related?: BlogRelatedItem[];
}
