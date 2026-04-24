"use client";

import { Hero } from "@/components/library-design/sections/Hero";
import { BlogCollectionFrame } from "@/components/library-design/sections/BlogCollectionFrame";
import { CtaHighlightFrame } from "@/components/library-design/sections/CtaHighlightFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import type { NavItem } from "@/components/library-design/ui/Navbar";
import type { BlogCard } from "@/components/library-design/ui/BlogCard";

type BlogCardProps = React.ComponentProps<typeof BlogCard>;
type FooterColumns = React.ComponentProps<typeof Footer>["columns"];
type CollectionAuthor = NonNullable<
  React.ComponentProps<typeof BlogCollectionFrame>["collectionAuthor"]
>;

/**
 * BlogIndexPage — blog home page template (`/[locale]/blog`).
 *
 * Composes (top → bottom):
 *   1. Hero — navbar + eyebrow + H1 + subtitle (no CTA, no illustration)
 *   2. Collection 1 (light background)  — e.g. "Leurs articles"
 *   3. Collection 2 (alt background)    — e.g. "Leurs podcast"
 *   4. Collection 3 (light background)  — e.g. "Leurs nouveautés"
 *   5. CtaHighlightFrame (optional)     — closing demo / newsletter CTA
 *   6. Footer
 *
 * The 3 collections alternate `background="light"` / `"alt"` for visual
 * rhythm. Each collection surfaces 3 BlogCards + a "Voir plus" CTA linking
 * to its full archive (e.g. `/blog/articles`, `/blog/podcast`).
 *
 * All text props are locale-driven — pass translated strings from
 * next-intl / CMS. No hardcoded copy inside the template.
 *
 * In Step 5 CMS this page is wired to `/[locale]/blog/page.tsx`, and
 * `collections[n].items` will stream from Strapi.
 */

interface BlogIndexCollection {
  /** Section H2 title (e.g. "Leurs articles"). */
  title: string;
  /** Optional gradient portion of the title. */
  titleHighlight?: string;
  /** Optional paragraph under the title. */
  subtitle?: string;
  /** Optional single author that covers the whole collection. */
  collectionAuthor?: CollectionAuthor;
  /** 1–9 article cards rendered in a 3-col grid. */
  items: BlogCardProps[];
  /** "Voir plus" CTA href. */
  viewAllHref: string;
  /** "Voir plus" CTA label (default "Voir plus"). */
  viewAllLabel?: string;
}

interface BlogIndexPageProps {
  // ── Navbar (shared layout) ─────────────────────────────────────────
  navItems?: NavItem[];
  navCtaLabel?: string;
  navCtaHref?: string;
  loginLabel?: string;
  loginHref?: string;

  // ── Hero ───────────────────────────────────────────────────────────
  /** Small eyebrow pill above the H1 (e.g. "LE BLOG"). */
  heroEyebrow?: string;
  /** Main H1 (solid dark portion). */
  heroTitle: string;
  /** Gradient-highlighted portion of the H1 (e.g. "TRANSFO."). */
  heroTitleHighlight?: string;
  /** Subtitle paragraph below the H1. */
  heroSubtitle: string;

  // ── Collections ────────────────────────────────────────────────────
  /**
   * Collection frames rendered in order with alternating backgrounds
   * (light / alt / light / …). Typically 3 per the blog home.
   */
  collections: BlogIndexCollection[];

  // ── Closing CTA (optional) ─────────────────────────────────────────
  cta?: {
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix?: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref?: string;
  };

  // ── Footer (required) ──────────────────────────────────────────────
  footerColumns: FooterColumns;
  copyright?: string;
  copyrightIcon?: React.ReactNode;
}

export default function BlogIndexPage({
  navItems,
  navCtaLabel,
  navCtaHref,
  loginLabel,
  loginHref,
  heroEyebrow,
  heroTitle,
  heroTitleHighlight,
  heroSubtitle,
  collections,
  cta,
  footerColumns,
  copyright,
  copyrightIcon,
}: BlogIndexPageProps) {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* 1. Hero — text-only, no illustration */}
      <Hero
        variant="light"
        layout="centered"
        navItems={navItems}
        navCtaLabel={navCtaLabel}
        navCtaHref={navCtaHref}
        loginLabel={loginLabel}
        loginHref={loginHref}
        eyebrow={heroEyebrow}
        title={heroTitle}
        titleHighlight={heroTitleHighlight}
        subtitle={heroSubtitle}
        imageAlt=""
        floatingCards={false}
      />

      {/* 2–4. Collections with alternating backgrounds */}
      {collections.map((collection, i) => (
        <BlogCollectionFrame
          key={i}
          title={collection.title}
          titleHighlight={collection.titleHighlight}
          subtitle={collection.subtitle}
          collectionAuthor={collection.collectionAuthor}
          background={i % 2 === 0 ? "light" : "alt"}
          items={collection.items}
          viewAllHref={collection.viewAllHref}
          viewAllLabel={collection.viewAllLabel}
        />
      ))}

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

      {/* 6. Footer */}
      <Footer
        columns={footerColumns}
        copyright={copyright}
        copyrightIcon={copyrightIcon}
      />
    </main>
  );
}
