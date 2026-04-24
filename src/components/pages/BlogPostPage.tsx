"use client";

import { BlogHero } from "@/components/library-design/sections/BlogHero";
import { TableOfContentsFrame } from "@/components/library-design/sections/TableOfContentsFrame";
import { BlogArticleBody } from "@/components/library-design/sections/BlogArticleBody";
import { FaqFrame } from "@/components/library-design/sections/FaqFrame";
import { CtaHighlightFrame } from "@/components/library-design/sections/CtaHighlightFrame";
import { RelatedArticlesFrame } from "@/components/library-design/sections/RelatedArticlesFrame";
import { BlogCollectionFrame } from "@/components/library-design/sections/BlogCollectionFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import type { NavItem } from "@/components/library-design/ui/Navbar";
import type { BlogCard } from "@/components/library-design/ui/BlogCard";

type BlogHeroAuthor = React.ComponentProps<typeof BlogHero>["author"];
type FooterColumns = React.ComponentProps<typeof Footer>["columns"];
type BlogCardProps = React.ComponentProps<typeof BlogCard>;

/**
 * BlogPostPage — blog article page template.
 *
 * Composes the full article page (top → bottom):
 *   1. BlogHero        — H1 + author attribution + featured illustration
 *   2. TableOfContentsFrame  (optional) — "Sommaire" with anchor links
 *   3. BlogArticleBody — rich-text body composed of DS primitives
 *   4. FaqFrame         (optional) — "Questions fréquentes"
 *   5. CtaHighlightFrame (optional) — closing demo / trial CTA
 *   6. RelatedArticlesFrame (optional) — "Pour aller plus loin" outbound links
 *   7. BlogIndexGrid    (optional) — trending / more articles grid
 *   8. Footer
 *
 * All text props are locale-driven — pass translated strings from next-intl /
 * CMS. No hardcoded copy inside the template.
 *
 * In Step 5 CMS this page is wired to `/[locale]/blog/[slug]/page.tsx`, and
 * `articleBody` will switch from `ReactNode` composition to a Strapi blocks
 * array via `@strapi/blocks-react-renderer`.
 *
 * @figma node-id 303-1015
 */

interface BlogPostPageProps {
  // ── Navbar (shared layout) ─────────────────────────────────────────
  navItems?: NavItem[];
  navCtaLabel?: string;
  navCtaHref?: string;
  loginLabel?: string;
  loginHref?: string;

  // ── Hero (required) ────────────────────────────────────────────────
  /** Eyebrow tag above the title (default "Le Blog"). */
  topTagLabel?: string;
  /** Article H1. */
  title: string;
  /** Author + category + date attribution. */
  author: BlogHeroAuthor;
  /** Featured illustration. */
  heroImageSrc: string;
  heroImageAlt: string;

  // ── Table of contents (optional) ───────────────────────────────────
  tableOfContents?: {
    title: string;
    items: Array<{ label: string; href: string }>;
  };

  // ── Article body (required) ────────────────────────────────────────
  /** Rich-text body composed of DS primitives (Heading / Text / Quote / …). */
  articleBody: React.ReactNode;

  // ── FAQ (optional) ─────────────────────────────────────────────────
  faq?: {
    title?: string;
    titleHighlight?: string;
    items: Array<{ question: string; answer: string }>;
    defaultOpenIndex?: number;
  };

  // ── CTA Highlight (optional) ───────────────────────────────────────
  cta?: {
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix?: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref?: string;
  };

  // ── Related articles (optional) ────────────────────────────────────
  relatedArticles?: {
    title: string;
    items: Array<{
      label: string;
      href: string;
      target?: "_self" | "_blank";
    }>;
  };

  // ── Trending / more articles grid (optional) ───────────────────────
  trendingGrid?: {
    title: string;
    subtitle?: string;
    background?: "light" | "alt";
    articles: BlogCardProps[];
    viewAllHref: string;
    viewAllLabel?: string;
  };

  // ── Footer (required) ──────────────────────────────────────────────
  footerColumns: FooterColumns;
  copyright?: string;
  copyrightIcon?: React.ReactNode;
}

export default function BlogPostPage({
  navItems,
  navCtaLabel,
  navCtaHref,
  loginLabel,
  loginHref,
  topTagLabel,
  title,
  author,
  heroImageSrc,
  heroImageAlt,
  tableOfContents,
  articleBody,
  faq,
  cta,
  relatedArticles,
  trendingGrid,
  footerColumns,
  copyright,
  copyrightIcon,
}: BlogPostPageProps) {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* 1. Hero */}
      <BlogHero
        navItems={navItems}
        navCtaLabel={navCtaLabel}
        navCtaHref={navCtaHref}
        loginLabel={loginLabel}
        loginHref={loginHref}
        topTagLabel={topTagLabel}
        title={title}
        author={author}
        imageSrc={heroImageSrc}
        imageAlt={heroImageAlt}
      />

      {/* 2. Sommaire (TOC) */}
      {tableOfContents && (
        <TableOfContentsFrame
          title={tableOfContents.title}
          items={tableOfContents.items}
        />
      )}

      {/* 3. Rich-text article body */}
      <BlogArticleBody>{articleBody}</BlogArticleBody>

      {/* 4. FAQ */}
      {faq && (
        <FaqFrame
          title={faq.title}
          titleHighlight={faq.titleHighlight}
          items={faq.items}
          defaultOpenIndex={faq.defaultOpenIndex}
        />
      )}

      {/* 5. Closing CTA */}
      {cta && (
        <CtaHighlightFrame
          titlePrefix={cta.titlePrefix}
          titleHighlight={cta.titleHighlight}
          titleSuffix={cta.titleSuffix}
          subtitle={cta.subtitle}
          ctaLabel={cta.ctaLabel}
          ctaHref={cta.ctaHref}
        />
      )}

      {/* 6. Pour aller plus loin — outbound links */}
      {relatedArticles && (
        <RelatedArticlesFrame
          title={relatedArticles.title}
          items={relatedArticles.items}
        />
      )}

      {/* 7. Trending / more articles */}
      {trendingGrid && (
        <BlogCollectionFrame
          title={trendingGrid.title}
          subtitle={trendingGrid.subtitle}
          background={trendingGrid.background}
          items={trendingGrid.articles}
          viewAllHref={trendingGrid.viewAllHref}
          viewAllLabel={trendingGrid.viewAllLabel}
        />
      )}

      {/* 8. Footer */}
      <Footer
        columns={footerColumns}
        copyright={copyright}
        copyrightIcon={copyrightIcon}
      />
    </main>
  );
}
