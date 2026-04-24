import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import {
  ACTIVE_BLOG_ARTICLES,
  BLOG_ARTICLES_BY_SLUG,
} from "@/data/blog-articles";
import { BLOG_INDEX_DATA } from "@/data/blog";
import { renderBlogBlocks } from "@/components/blog/renderBlogBlocks";

type RouteParams = { locale: string; slug: string };

const DEFAULT_AUTHOR = {
  name: "AirSaas",
  avatarSrc: "https://placehold.co/80x80/3c51e2/ffffff?text=AS",
  avatarAlt: "AirSaas",
  categoryLabel: "Gestion de projet",
  categoryHref: "/fr/blog",
};

const DEFAULT_HERO_IMAGE = "https://placehold.co/1600x900/e8eafc/3a51e2?text=AirSaas";

export async function generateStaticParams() {
  return ACTIVE_BLOG_ARTICLES.map((article) => ({
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
  const article = BLOG_ARTICLES_BY_SLUG[slug];
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
  const article = BLOG_ARTICLES_BY_SLUG[slug];

  if (!article || article.skip) {
    notFound();
  }

  const publishedDate = article.meta.publishedDate
    ? new Date(article.meta.publishedDate).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : undefined;

  const heroImage = article.meta.heroImage || DEFAULT_HERO_IMAGE;

  // Build TOC from heading blocks (level 2 only)
  const tocItems = article.blocks
    .filter((block) => block.type === "heading" && block.level === 2)
    .map((block) => {
      if (block.type !== "heading") return null;
      return { label: block.text, href: `#${block.id}` };
    })
    .filter((x): x is { label: string; href: string } => x !== null)
    .slice(0, 10);

  const tableOfContents =
    tocItems.length >= 3
      ? { title: "Sommaire", items: tocItems }
      : undefined;

  const faq =
    article.faq && article.faq.length > 0
      ? { title: "Questions fréquentes", items: article.faq.slice(0, 10) }
      : undefined;

  const relatedArticles =
    article.related && article.related.length > 0
      ? {
          title: "Pour aller plus loin",
          items: article.related.slice(0, 6).map((r) => ({
            label: r.label,
            href: r.href,
          })),
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
      title={article.meta.title}
      author={{
        ...DEFAULT_AUTHOR,
        publishedByLabel: "Publié par",
        inLabel: "dans",
        datePrefix: "Le",
        publishedDate,
      }}
      heroImageSrc={heroImage}
      heroImageAlt={article.meta.title}
      tableOfContents={tableOfContents}
      articleBody={renderBlogBlocks(article.blocks)}
      faq={faq}
      cta={BLOG_INDEX_DATA.cta}
      relatedArticles={relatedArticles}
      footerColumns={BLOG_INDEX_DATA.footerColumns}
      copyright={BLOG_INDEX_DATA.copyright}
    />
  );
}
