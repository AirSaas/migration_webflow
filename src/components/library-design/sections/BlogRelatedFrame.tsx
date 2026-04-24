import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";
import {
  Button,
  type ButtonVariant,
} from "@/components/library-design/ui/Button";
import {
  BlogCard,
  type BlogCardProps,
} from "@/components/library-design/ui/BlogCard";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

/**
 * BlogRelatedFrame
 *
 * @purpose    Footer section for a blog article — grid of exactly 3 related
 *             <BlogCard> items ("Pour aller plus loin", "Ces articles
 *             pourraient vous intéresser"). Small sibling of
 *             <BlogCollectionFrame> used on article pages rather than the
 *             index page. Optional CTA below links to the full collection.
 * @useWhen    At the bottom of every blog article page, between the article
 *             body and the footer, to keep readers on-site. Typically fed
 *             3 articles from a "related articles" Strapi relation or a
 *             category-based recommendation query.
 * @dontUse    For the blog index page — use <BlogCollectionFrame>. For
 *             non-blog cross-sells (product solutions) — use
 *             <RelatedSolutionsFrame> (image-first, no author byline).
 *
 * @limits
 *   - titleHighlight: max 40 chars
 *   - title: max 80 chars
 *   - subtitle: max 260 chars
 *   - articles: exactly 3 items (grid locked to 3 columns on desktop)
 *   - collectionCtaLabel: max 36 chars
 *
 * @forbidden
 *   - Do NOT use for non-blog cross-sell (use <RelatedSolutionsFrame>)
 *   - Do NOT pass more or fewer than 3 articles (grid breaks)
 *   - Do NOT hardcode collectionCtaLabel locale copy — pass via i18n
 *   - Do NOT pass className with bg / text / font / padding overrides
 */

interface BlogRelatedFrameProps {
  variant?: "light" | "tinted";
  /** Primary-gradient portion of the title (rendered FIRST). */
  titleHighlight?: string;
  /** Dark-to-primary gradient portion of the title (rendered AFTER highlight). */
  title: string;
  subtitle?: string;
  /** Exactly 3 articles — typed as the full BlogCardProps for flexibility. */
  articles: BlogCardProps[];
  /**
   * Label for the optional "view all articles" CTA rendered below the grid.
   * Locale-driven — no default, pass via next-intl. When both label and href
   * are provided, the CTA renders; otherwise it is omitted.
   */
  collectionCtaLabel?: string;
  /** Destination URL for the collection CTA (e.g. "/fr/blog"). */
  collectionCtaHref?: string;
  /** Visual style for the collection CTA. Default "tertiary" (outline). */
  collectionCtaVariant?: ButtonVariant;
  className?: string;
}

export function BlogRelatedFrame({
  variant = "light",
  titleHighlight,
  title,
  subtitle,
  articles,
  collectionCtaLabel,
  collectionCtaHref,
  collectionCtaVariant = "tertiary",
  className,
}: BlogRelatedFrameProps) {
  if (titleHighlight)
    assertMaxLength("BlogRelatedFrame", "titleHighlight", titleHighlight, 40);
  assertMaxLength("BlogRelatedFrame", "title", title, 80);
  if (subtitle)
    assertMaxLength("BlogRelatedFrame", "subtitle", subtitle, 260);
  assertArrayBounds("BlogRelatedFrame", "articles", articles, 3, 3);
  if (collectionCtaLabel)
    assertMaxLength(
      "BlogRelatedFrame",
      "collectionCtaLabel",
      collectionCtaLabel,
      36,
    );
  assertNoClassNameOverride("BlogRelatedFrame", className, [
    "bg-",
    "text-",
    "font-",
    "p-",
  ]);

  const isTinted = variant === "tinted";
  const showCta = Boolean(collectionCtaLabel && collectionCtaHref);

  return (
    <section
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.125rem] lg:px-[10rem] lg:py-[6.25rem]",
        isTinted ? "bg-primary-2" : "bg-white",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
        <Heading level={2} gradient="none" align="center">
          {titleHighlight && (
            <GradientText gradient="primary">{titleHighlight}</GradientText>
          )}
          {titleHighlight && " "}
          <GradientText gradient="dark-to-primary">{title}</GradientText>
        </Heading>

        {subtitle && (
          <Text size="md" align="center" maxWidth="60rem">
            {subtitle}
          </Text>
        )}
      </div>

      <div className="grid w-full grid-cols-1 items-stretch gap-[1.5rem] md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, i) => (
          <BlogCard key={i} {...article} />
        ))}
      </div>

      {showCta && (
        <Button
          variant={collectionCtaVariant}
          size="md"
          href={collectionCtaHref}
        >
          {collectionCtaLabel}
        </Button>
      )}
    </section>
  );
}
