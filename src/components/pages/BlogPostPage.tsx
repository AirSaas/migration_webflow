"use client";

import { BlogHero } from "@/components/library-design/sections/BlogHero";
import { TableOfContentsFrame } from "@/components/library-design/sections/TableOfContentsFrame";
import { TocSidebar } from "@/components/library-design/sections/TocSidebar";
import { BlogArticleBody } from "@/components/library-design/sections/BlogArticleBody";
import { FaqFrame } from "@/components/library-design/sections/FaqFrame";
import { CtaHighlightFrame } from "@/components/library-design/sections/CtaHighlightFrame";
import { RelatedArticlesFrame } from "@/components/library-design/sections/RelatedArticlesFrame";
import { BlogCollectionFrame } from "@/components/library-design/sections/BlogCollectionFrame";
import { NewsletterInlineCard } from "@/components/library-design/sections/NewsletterInlineCard";
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
 *   2. Sticky TOC sidebar (TocSidebar) when items.length >= 5, else inline
 *      TableOfContentsFrame above the body
 *   3. BlogArticleBody — rich-text body composed of DS primitives
 *   4. NewsletterInlineCard (optional) — mid-page newsletter signup
 *   5. FaqFrame         (optional) — "Questions fréquentes"
 *   6. CtaHighlightFrame (optional) — closing demo / trial CTA
 *   7. RelatedArticlesFrame (optional) — "Pour aller plus loin" outbound links
 *   8. BlogIndexGrid    (optional) — trending / more articles grid
 *   9. Footer
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
  topTagLabel?: string;
  title: string;
  author: BlogHeroAuthor;
  heroImageSrc: string;
  heroImageAlt: string;

  // ── Table of contents (optional) ───────────────────────────────────
  tableOfContents?: {
    title: string;
    items: Array<{ label: string; href: string; level?: 2 | 3 }>;
  };

  // ── Article body (required) ────────────────────────────────────────
  articleBody: React.ReactNode;

  // ── Newsletter inline (optional, R31) ──────────────────────────────
  newsletterCard?: {
    title: string;
    subtitle?: string;
    placeholder?: string;
    ctaLabel: string;
    privacyText?: string;
  };

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

const STICKY_TOC_MIN_ITEMS = 5;

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
  newsletterCard,
  faq,
  cta,
  relatedArticles,
  trendingGrid,
  footerColumns,
  copyright,
  copyrightIcon,
}: BlogPostPageProps) {
  // R32 + N2 audit Marisella : long articles use sticky <TocSidebar> next to
  // the body; short articles keep the inline horizontal <TableOfContentsFrame>.
  const tocItemsCount = tableOfContents?.items.length ?? 0;
  const useSticky = tocItemsCount >= STICKY_TOC_MIN_ITEMS;

  // Convert {label, href, level?} → {id, label, level} for TocSidebar.
  const sidebarItems =
    tableOfContents && useSticky
      ? tableOfContents.items.map((item) => ({
          id: item.href.replace(/^#/, ""),
          label: item.label,
          level: (item.level ?? 2) as 2 | 3,
        }))
      : [];

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

      {/* 2. Inline TOC (short articles) */}
      {tableOfContents && !useSticky && (
        <TableOfContentsFrame
          title={tableOfContents.title}
          items={tableOfContents.items.map((i) => ({ label: i.label, href: i.href }))}
        />
      )}

      {/* 3. Article body — sticky TOC sidebar when 5+ items */}
      {useSticky && tableOfContents ? (
        <section className="w-full bg-white px-[1.25rem] py-[3rem] md:px-[4rem] md:py-[5rem] lg:px-[6rem] lg:py-[6.25rem]">
          <div className="mx-auto flex flex-col gap-[2rem] lg:flex-row lg:gap-[4rem] lg:items-start max-w-[91.25rem]">
            <TocSidebar
              title={tableOfContents.title}
              items={sidebarItems}
              ariaLabel={tableOfContents.title}
            />
            <div className="ds-prose flex-1 flex flex-col gap-[2rem] md:gap-[3.125rem] max-w-[50rem] mx-auto lg:mx-0">
              {articleBody}
              {newsletterCard && (
                <NewsletterInlineCard
                  title={newsletterCard.title}
                  subtitle={newsletterCard.subtitle}
                  placeholder={newsletterCard.placeholder}
                  ctaLabel={newsletterCard.ctaLabel}
                  privacyText={newsletterCard.privacyText}
                />
              )}
            </div>
          </div>
        </section>
      ) : (
        <>
          <BlogArticleBody>{articleBody}</BlogArticleBody>
          {newsletterCard && (
            <section className="w-full bg-white px-[1.25rem] py-[2rem] md:px-[4rem] md:py-[2.5rem] lg:px-[14.375rem] lg:py-[3rem]">
              <div className="mx-auto max-w-[50rem]">
                <NewsletterInlineCard
                  title={newsletterCard.title}
                  subtitle={newsletterCard.subtitle}
                  placeholder={newsletterCard.placeholder}
                  ctaLabel={newsletterCard.ctaLabel}
                  privacyText={newsletterCard.privacyText}
                />
              </div>
            </section>
          )}
        </>
      )}

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
