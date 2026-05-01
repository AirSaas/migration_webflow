import type { Metadata } from "next";
import BlogArchivePage from "@/components/pages/BlogArchivePage";
import { ACTIVE_BLOG_ARTICLES_V2 } from "@/data/blog-articles-v2";
import { BLOG_INDEX_DATA } from "@/data/blog";

export const metadata: Metadata = {
  title: "Tous les articles — AirSaas",
  description:
    "Retrouvez l'ensemble des articles du blog AirSaas : gestion de projet, PMO, portefeuille projet, capacity planning.",
};

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "Gestion de projet";
  // iso may be "25/2/2026" (already French) or ISO date
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(iso)) {
    return `Le ${iso}`;
  }
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
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
  const articles = ACTIVE_BLOG_ARTICLES_V2.map((article) => {
    const authorName = article.meta.author?.name || "AirSaas";
    const authorAvatarSrc =
      article.meta.author?.avatarSrc ||
      `https://placehold.co/80x80/3c51e2/ffffff?text=${encodeURIComponent(
        authorName.slice(0, 2).toUpperCase(),
      )}`;
    const heroSrc =
      article.meta.heroImage?.src ||
      `https://placehold.co/600x400/3c51e2/ffffff?text=${encodeURIComponent(
        article.slug.slice(0, 30),
      )}`;
    return {
      publishedByLabel: "Publié par",
      inLabel: "dans",
      authorsAndLabel: "&",
      authorsMoreLabel: "autres",
      thumbnailSrc: heroSrc,
      thumbnailAlt: article.meta.h1 || article.meta.title,
      date: formatDate(article.meta.publishedDate),
      title: (article.meta.h1 || article.meta.title).slice(0, 115),
      excerpt: excerpt(article.meta.description),
      href: `/fr/blog/${article.slug}`,
      authors: [{ name: authorName, avatarSrc: authorAvatarSrc }],
      categoryLabel: "Gestion de projet",
      categoryHref: "/fr/blog/articles",
    };
  });

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
