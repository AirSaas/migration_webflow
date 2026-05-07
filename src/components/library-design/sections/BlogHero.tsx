import { cn } from "@/lib/utils";
import { Tag } from "@/components/library-design/ui/Tag";
import { Heading } from "@/components/library-design/ui/Heading";
import { Navbar, type NavItem } from "@/components/library-design/ui/Navbar";
import { IllustrationFrame } from "@/components/library-design/ui/IllustrationFrame";
import { GradientBackground } from "@/components/library-design/ui/GradientBackground";
import { EllipseBackground } from "@/components/library-design/ui/EllipseBackground";
import { BlogAuthorTag } from "@/components/library-design/ui/BlogAuthorTag";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

/**
 * BlogHero
 *
 * @purpose    Article header for a single blog post: navbar + "Le Blog" tag +
 *             article title + author attribution (<BlogAuthorTag>) + featured
 *             illustration frame that bleeds into the next section.
 * @useWhen    Top of a blog article page. One per page.
 * @dontUse    As a blog index / landing hero (use <Hero> with a CTA).
 *             For non-blog pages (use <Hero>).
 *             For inline author attribution inside a card (use <BlogAuthorTag>
 *             directly).
 *
 * @limits
 *   - title: max 180 chars (articles tolerate long titles, but past that H1 wraps
 *     too aggressively and hurts readability)
 *   - topTagLabel: max 30 chars (default "Le Blog")
 *   - navItems: 2–9 top-level items
 *   - imageAlt: required — pass "" only if the featured image is purely decorative
 *
 * @forbidden
 *   - Do NOT render multiple <BlogHero> per page
 *   - Do NOT pass className that changes background / min-height — the white
 *     bg + gradient + ellipse are part of the section contract
 *   - Do NOT pass arbitrary color / typography overrides via className
 *
 * @figma node-id 303-1016
 */

interface BlogHeroAuthor {
  name: string;
  avatarSrc?: string;
  avatarAlt?: string;
  categoryLabel?: string;
  categoryHref?: string;
  publishedDate?: string;
  publishedByLabel?: string;
  inLabel?: string;
  datePrefix?: string;
  /**
   * Reading time string (e.g. "10 min de lecture"). When provided alongside
   * `publishedDate`, BlogHero renders a meta header strip above the H1
   * "Le {date} · {readingTime} · {name}".
   */
  readingTime?: string;
}

export interface BlogHeroProps {
  /** Navbar items. Omit to render the hero without a navbar (e.g. embedded preview). */
  navItems?: NavItem[];
  navCtaLabel?: string;
  navCtaHref?: string;
  loginLabel?: string;
  loginHref?: string;
  /**
   * Eyebrow pill above the title (e.g. "Le Blog" / "The Blog" / "Der Blog").
   * Locale-driven — caller passes the translated string. When omitted, no
   * pill is rendered.
   */
  topTagLabel?: string;
  /** Article title (H1). */
  title: string;
  /** Author + category + date attribution. */
  author: BlogHeroAuthor;
  /** Featured illustration / cover image. */
  imageSrc: string;
  /** Required alt text. Pass "" for decorative. */
  imageAlt: string;
  /** Layout-only className override. No color / bg / min-h overrides. */
  className?: string;
}

export function BlogHero({
  navItems,
  navCtaLabel,
  navCtaHref,
  loginLabel,
  loginHref,
  topTagLabel,
  title,
  author,
  imageSrc,
  imageAlt,
  className,
}: BlogHeroProps) {
  assertMaxLength("BlogHero", "title", title, 180);
  if (topTagLabel) assertMaxLength("BlogHero", "topTagLabel", topTagLabel, 30);
  if (navItems) assertArrayBounds("BlogHero", "navItems", navItems, 2, 9);
  assertNoClassNameOverride("BlogHero", className, [
    "bg-",
    "text-",
    "font-",
    "min-h-",
  ]);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-white",
        className,
      )}
    >
      {/* Decorative halo ring behind the content */}
      <EllipseBackground
        size={1250}
        className="left-1/2 -translate-x-1/2 top-[-4.5625rem] z-0"
      />

      {/* Blog hero gradient — white → primary-20 → primary-60 (Figma 313-2160) */}
      <GradientBackground
        variant="blog-hero"
        className="z-0"
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center gap-[2.5rem] px-[1.25rem] pt-[1.25rem] md:gap-[3.5rem] md:px-[2rem] md:pt-[2rem] lg:gap-[4.375rem] lg:px-[2.5rem] lg:pt-[2.5rem] pb-0">
        {navItems && (
          <Navbar
            items={navItems}
            ctaLabel={navCtaLabel}
            ctaHref={navCtaHref}
            loginLabel={loginLabel}
            loginHref={loginHref}
          />
        )}

        {/* Headline block — tag + meta header + title + author */}
        <div className="flex flex-col items-center gap-[1.5rem] md:gap-[2rem] max-w-[93.75rem] w-full">
          {topTagLabel && <Tag variant="muted">{topTagLabel}</Tag>}

          {/* R30 audit Marisella : meta header strip above H1 — date · reading time · author */}
          {author.publishedDate && author.readingTime && (
            <p className="text-text-muted text-small font-light text-center">
              {author.datePrefix ? `${author.datePrefix} ` : ""}
              {author.publishedDate}
              <span aria-hidden="true"> · </span>
              {author.readingTime}
              <span aria-hidden="true"> · </span>
              {author.name}
            </p>
          )}

          <div className="w-full md:w-[90%] lg:w-[85%]">
            <Heading level={1} gradient="none" align="center">
              {title}
            </Heading>
          </div>

          <BlogAuthorTag
            name={author.name}
            avatarSrc={author.avatarSrc}
            avatarAlt={author.avatarAlt}
            categoryLabel={author.categoryLabel}
            categoryHref={author.categoryHref}
            publishedDate={author.publishedDate}
            publishedByLabel={author.publishedByLabel}
            inLabel={author.inLabel}
            datePrefix={author.datePrefix}
          />
        </div>

        {/* Featured illustration — open-bottom frame bleeds into next section */}
        <div className="w-full flex justify-center px-[1rem] md:px-[2rem] lg:px-[4rem]">
          <IllustrationFrame
            src={imageSrc}
            alt={imageAlt}
            shape="open-bottom"
            className="max-w-[71.875rem] w-full"
          />
        </div>
      </div>
    </section>
  );
}
