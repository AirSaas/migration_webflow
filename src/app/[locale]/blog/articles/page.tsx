import type { Metadata } from "next";
import BlogArchivePage from "@/components/pages/BlogArchivePage";
import { ACTIVE_BLOG_ARTICLES } from "@/data/blog-articles";
import { BLOG_INDEX_DATA } from "@/data/blog";

export const metadata: Metadata = {
  title: "Tous les articles — AirSaas",
  description:
    "Retrouvez l'ensemble des articles du blog AirSaas : gestion de projet, PMO, portefeuille projet, capacity planning.",
};

const AUTHOR_DEFAULT = {
  name: "AirSaas",
};

function formatDate(iso: string | null): string {
  if (!iso) return "Gestion de projet";
  try {
    const d = new Date(iso);
    return `Le ${d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`;
  } catch {
    return "Gestion de projet";
  }
}

function excerpt(text: string, max = 180): string {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export default function Page() {
  const articles = ACTIVE_BLOG_ARTICLES.map((article) => ({
    publishedByLabel: "Publié par",
    inLabel: "dans",
    authorsAndLabel: "&",
    authorsMoreLabel: "autres",
    thumbnailSrc:
      article.meta.heroImage ||
      `https://placehold.co/600x400/3c51e2/ffffff?text=${encodeURIComponent(
        article.slug.slice(0, 30),
      )}`,
    thumbnailAlt: article.meta.title,
    date: formatDate(article.meta.publishedDate),
    title: article.meta.title.slice(0, 115),
    excerpt: excerpt(article.meta.description),
    href: `/fr/blog/${article.slug}`,
    authors: [AUTHOR_DEFAULT],
    categoryLabel: "Gestion de projet",
    categoryHref: "/fr/blog/articles",
  }));

  return (
    <BlogArchivePage
      navItems={BLOG_INDEX_DATA.navItems}
      navCtaLabel={BLOG_INDEX_DATA.navCtaLabel}
      navCtaHref={BLOG_INDEX_DATA.navCtaHref}
      loginLabel={BLOG_INDEX_DATA.loginLabel}
      loginHref={BLOG_INDEX_DATA.loginHref}
      heroEyebrow="TOUS LES ARTICLES"
      heroTitle={`${articles.length} articles`}
      heroTitleHighlight="à lire"
      heroSubtitle="Toutes nos réflexions sur la gestion de projet, le PMO et la transformation — un clic = un article complet."
      articles={articles}
      footerColumns={BLOG_INDEX_DATA.footerColumns}
      copyright={BLOG_INDEX_DATA.copyright}
    />
  );
}
