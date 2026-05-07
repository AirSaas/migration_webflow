import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import {
  ACTIVE_BLOG_ARTICLES_V2,
  BLOG_BY_SLUG_V2,
} from "@/data/blog-articles-v2";
import { BLOG_INDEX_DATA } from "@/data/blog";
import { renderBlogBlocks } from "@/components/blog/renderBlogBlocks";
import { estimateReadingTime } from "@/lib/reading-time";
import type { ComponentProps } from "react";
import type { BlogCard } from "@/components/library-design/ui/BlogCard";

type BlogCardProps = ComponentProps<typeof BlogCard>;

type RouteParams = { locale: string; slug: string };

const DEFAULT_HERO_IMAGE =
  "https://placehold.co/1600x900/e8eafc/3a51e2?text=AirSaas";

export async function generateStaticParams() {
  return ACTIVE_BLOG_ARTICLES_V2.map((article) => ({
    locale: "fr",
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_BY_SLUG_V2[slug];
  if (!article) return {};
  return {
    title: article.meta.title,
    description: article.meta.description,
  };
}

export default async function BlogArticleRoute({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const article = BLOG_BY_SLUG_V2[slug];

  if (!article || article.skip) {
    notFound();
  }

  // Format "17/9/2025" (D/M/Y from Webflow) → "17 septembre 2025"
  const FRENCH_MONTHS = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  const formatPublishedDate = (raw: string | null | undefined): string | undefined => {
    if (!raw) return undefined;
    const m = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (m) {
      const day = parseInt(m[1], 10);
      const month = parseInt(m[2], 10);
      const year = parseInt(m[3], 10);
      if (month >= 1 && month <= 12) {
        return `${day} ${FRENCH_MONTHS[month - 1]} ${year}`;
      }
    }
    return raw;
  };
  const publishedDate = formatPublishedDate(article.meta.publishedDate);
  const readingTime = estimateReadingTime(article.blocks);

  const heroImage = article.meta.heroImage?.src || DEFAULT_HERO_IMAGE;
  const heroImageAlt = article.meta.heroImage?.alt || article.meta.h1;

  // Author : real or fallback
  const authorName = article.meta.author?.name || "AirSaas";
  const authorAvatarSrc =
    article.meta.author?.avatarSrc ||
    `https://placehold.co/80x80/3c51e2/ffffff?text=${encodeURIComponent(
      authorName.slice(0, 2).toUpperCase(),
    )}`;

  // TOC
  const tocItems = article.toc.length >= 3 ? article.toc : [];
  const tableOfContents =
    tocItems.length >= 3 ? { title: "Sommaire", items: tocItems } : undefined;

  const faq =
    article.faq.length > 0
      ? { title: "Questions fréquentes", items: article.faq.slice(0, 10) }
      : undefined;

  const relatedArticles =
    article.related.length > 0
      ? {
          title: "Pour aller plus loin",
          items: article.related.slice(0, 6).map((r) => ({
            label: r.label,
            href: r.href,
          })),
        }
      : undefined;

  // R19 audit Marisella : "trendingGrid" 3 cards from sibling articles to
  // replace the orange CTA placeholder. Pick 3 deterministically (next 3
  // articles after current in ACTIVE_BLOG_ARTICLES_V2 order, wrapping).
  const currentIdx = ACTIVE_BLOG_ARTICLES_V2.findIndex(
    (a) => a.slug === article.slug,
  );
  const siblings: BlogCardProps[] = [];
  for (let i = 1; i <= 3; i++) {
    const sibling =
      ACTIVE_BLOG_ARTICLES_V2[
        (currentIdx + i) % ACTIVE_BLOG_ARTICLES_V2.length
      ];
    if (!sibling) continue;
    siblings.push({
      thumbnailSrc:
        sibling.meta.heroImage?.src ||
        `https://placehold.co/600x400/3c51e2/ffffff?text=${encodeURIComponent(
          sibling.slug.slice(0, 30),
        )}`,
      thumbnailAlt: sibling.meta.title,
      date: formatPublishedDate(sibling.meta.publishedDate) || "",
      title: sibling.meta.title.slice(0, 115),
      excerpt: sibling.meta.description.slice(0, 180),
      href: `/fr/blog/${sibling.slug}`,
      authors: [
        {
          name: sibling.meta.author?.name || "AirSaas",
          avatarSrc:
            sibling.meta.author?.avatarSrc ||
            `https://placehold.co/80x80/3c51e2/ffffff?text=${encodeURIComponent(
              (sibling.meta.author?.name || "AS").slice(0, 2).toUpperCase(),
            )}`,
          avatarAlt: sibling.meta.author?.name || "AirSaas",
        },
      ],
      categoryLabel: "Gestion de projet",
      categoryHref: "/fr/blog/articles",
      publishedByLabel: "Publié par",
      inLabel: "dans",
      authorsAndLabel: "&",
      authorsMoreLabel: "autres",
    });
  }
  const trendingGrid =
    siblings.length > 0
      ? {
          title: "À découvrir aussi",
          subtitle: undefined,
          background: "alt" as const,
          articles: siblings,
          viewAllHref: "/fr/blog/articles",
          viewAllLabel: "Voir tous les articles",
        }
      : undefined;

  return (
    <BlogPostPage
      navItems={BLOG_INDEX_DATA.navItems}
      navCtaLabel={BLOG_INDEX_DATA.navCtaLabel}
      navCtaHref={BLOG_INDEX_DATA.navCtaHref}
      loginLabel={BLOG_INDEX_DATA.loginLabel}
      loginHref={BLOG_INDEX_DATA.loginHref}
      topTagLabel="Le Blog"
      title={article.meta.h1 || article.meta.title}
      author={{
        name: authorName,
        avatarSrc: authorAvatarSrc,
        avatarAlt: authorName,
        categoryLabel: "Gestion de projet",
        categoryHref: "/fr/blog/articles",
        publishedByLabel: "Publié par",
        inLabel: "dans",
        datePrefix: "Le",
        publishedDate,
        readingTime,
      }}
      heroImageSrc={heroImage}
      heroImageAlt={heroImageAlt}
      tableOfContents={tableOfContents}
      articleBody={renderBlogBlocks(article.blocks)}
      newsletterCard={{
        title: "Recevez nos meilleurs articles",
        subtitle: "Une fois par mois, on vous envoie nos retours d'expérience pratiques sur la gestion de portefeuille projets.",
        placeholder: "votre@email.com",
        ctaLabel: "S'abonner",
        privacyText: "Pas de spam — désinscription en un clic.",
      }}
      faq={faq}
      cta={BLOG_INDEX_DATA.cta}
      relatedArticles={relatedArticles}
      trendingGrid={trendingGrid}
      footerColumns={BLOG_INDEX_DATA.footerColumns}
      copyright={`© ${new Date().getFullYear()} AirSaas — Made in France`}
      copyrightIcon={
        <span className="inline-flex items-center gap-[0.375rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/icons/airsaas-icon.svg"
            alt=""
            aria-hidden="true"
            className="h-[1.25rem] w-auto"
          />
          <span aria-label="Français">🇫🇷</span>
        </span>
      }
    />
  );
}
