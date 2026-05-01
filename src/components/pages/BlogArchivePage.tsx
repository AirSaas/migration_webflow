"use client";

import { Hero } from "@/components/library-design/sections/Hero";
import { Footer } from "@/components/library-design/sections/Footer";
import { BlogCard } from "@/components/library-design/ui/BlogCard";
import type { NavItem } from "@/components/library-design/ui/Navbar";

type BlogCardProps = React.ComponentProps<typeof BlogCard>;
type FooterColumns = React.ComponentProps<typeof Footer>["columns"];

interface BlogArchivePageProps {
  navItems?: NavItem[];
  navCtaLabel?: string;
  navCtaHref?: string;
  loginLabel?: string;
  loginHref?: string;
  heroEyebrow?: string;
  heroTitle: string;
  heroTitleHighlight?: string;
  heroSubtitle: string;
  articles: BlogCardProps[];
  footerColumns: FooterColumns;
  copyright?: string;
}

/**
 * BlogArchivePage — `/fr/blog/articles` — full grid of all blog articles.
 *
 * Simple listing page with Hero + 3-col grid of BlogCards + Footer.
 */
export default function BlogArchivePage({
  navItems,
  navCtaLabel,
  navCtaHref,
  loginLabel,
  loginHref,
  heroEyebrow,
  heroTitle,
  heroTitleHighlight,
  heroSubtitle,
  articles,
  footerColumns,
  copyright,
}: BlogArchivePageProps) {
  return (
    <main className="flex min-h-screen flex-col bg-background">
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

      <section className="flex flex-col items-center gap-[2rem] bg-white px-[1.5rem] py-[3rem] md:px-[3rem] md:py-[5rem] lg:px-[10rem] lg:py-[6.25rem]">
        <div className="grid w-full max-w-[91.25rem] grid-cols-1 gap-[1.5rem] md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <BlogCard key={`${article.href}-${i}`} {...article} />
          ))}
        </div>
      </section>

      <Footer columns={footerColumns} copyright={copyright} />
    </main>
  );
}
