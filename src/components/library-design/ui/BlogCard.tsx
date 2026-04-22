import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import {
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

/**
 * BlogCard
 *
 * @purpose    Single blog article preview card — thumbnail, publication
 *             date, title, excerpt, and a compact author byline. The
 *             entire card surfaces the article and the title acts as the
 *             primary link; an optional category link (e.g. a
 *             newsletter / section name) stays independently clickable.
 * @useWhen    Inside <BlogIndexGrid> for blog index / listing pages, or in
 *             any CMS-driven "featured articles" section that lists
 *             thumbnails + excerpts.
 * @dontUse    For testimonial / client logos (use <TestimonialCard> /
 *             <ClientCard>). For author attribution inside an article
 *             (use <BlogAuthorTag>). For non-article content preview
 *             (use <CardCta>).
 *
 * @limits
 *   - title: max 120 chars (H4 wraps cleanly up to ~2 lines at that length)
 *   - excerpt: max 200 chars (3 lines at --text-paragraph)
 *   - thumbnailAlt: required. Empty string `""` only for purely
 *     decorative thumbnails (rare — blog thumbnails should describe)
 *   - authorName: max 40 chars (matches <BlogAuthorTag>)
 *   - categoryLabel: max 60 chars (if provided)
 *
 * @forbidden
 *   - Do NOT pass className that overrides bg / border / padding / rounded —
 *     the white card chrome is part of the contract
 *   - Do NOT nest <BlogCard> inside another card (use plain markup for
 *     inline previews)
 *   - Do NOT hardcode "Publié par" / "dans" — pass via props for locale
 *
 * @figma node-id 312-2107 (inside 312-2093)
 */

interface BlogCardProps {
  /** Thumbnail image URL. */
  thumbnailSrc: string;
  /** Required alt text. Empty string `""` marks the image as decorative. */
  thumbnailAlt: string;
  /** Pre-formatted publication date (e.g. "Le 12/10/2021"). Locale-driven. */
  date: string;
  /** Article title (H4). */
  title: string;
  /** Short excerpt / lede shown under the title. */
  excerpt: string;
  /** Full article URL — the title acts as the primary link. */
  href: string;

  /** Author display name. */
  authorName: string;
  /** Optional circular avatar for the author. */
  authorAvatarSrc?: string;
  /** Alt for the author avatar. Empty string allowed for decorative. */
  authorAvatarAlt?: string;

  /** Optional category / newsletter / section label (secondary link). */
  categoryLabel?: string;
  /** Optional href for the category link. */
  categoryHref?: string;

  /**
   * Label before the author name (e.g. "Publié par" / "Published by").
   * Locale-driven — default English fallback ("Published by"), pass
   * translated via next-intl.
   */
  publishedByLabel?: string;
  /**
   * Preposition before the category (e.g. "dans" / "in").
   * Locale-driven — default English fallback ("in"), pass translated via
   * next-intl.
   */
  inLabel?: string;

  className?: string;
}

export function BlogCard({
  thumbnailSrc,
  thumbnailAlt,
  date,
  title,
  excerpt,
  href,
  authorName,
  authorAvatarSrc,
  authorAvatarAlt,
  categoryLabel,
  categoryHref,
  publishedByLabel = "Published by",
  inLabel = "in",
  className,
}: BlogCardProps) {
  assertMaxLength("BlogCard", "title", title, 120);
  assertMaxLength("BlogCard", "excerpt", excerpt, 200);
  assertMaxLength("BlogCard", "authorName", authorName, 40);
  if (categoryLabel)
    assertMaxLength("BlogCard", "categoryLabel", categoryLabel, 60);
  assertNoClassNameOverride("BlogCard", className, [
    "bg-",
    "border-",
    "rounded-",
    "p-",
  ]);

  const thumbnailIsDecorative = thumbnailAlt === "";

  return (
    <article
      className={cn(
        "flex h-full flex-col gap-[0.9375rem] rounded-[1.25rem] border border-secondary-10 bg-white p-[1.5625rem]",
        className,
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden rounded-[0.625rem] aspect-[16/10]">
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          loading="lazy"
          {...(thumbnailIsDecorative ? { "aria-hidden": true as const } : {})}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Summary — date / title / excerpt */}
      <div className="flex flex-col gap-[0.4375rem]">
        <span className="font-light text-foreground text-micro-xl">{date}</span>

        <Heading level={4} gradient="none" align="left">
          <a
            href={href}
            className="transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
          >
            {title}
          </a>
        </Heading>

        <Text size="md" align="left">
          {excerpt}
        </Text>
      </div>

      {/* Author byline — compact avatar + 2 lines */}
      <div className="mt-auto flex items-end gap-[0.4375rem] pt-[0.5rem]">
        {authorAvatarSrc && (
          <img
            src={authorAvatarSrc}
            alt={authorAvatarAlt ?? ""}
            loading="lazy"
            className="h-[2.5rem] w-[2.5rem] shrink-0 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col leading-tight text-foreground text-micro-md">
          <span className="font-light">
            {publishedByLabel} <span className="font-bold">{authorName}</span>
          </span>
          {categoryLabel && (
            <span className="font-light">
              {inLabel}{" "}
              {categoryHref ? (
                <a
                  href={categoryHref}
                  className="text-primary underline hover:no-underline focus-visible:no-underline focus-visible:outline-none"
                >
                  {categoryLabel}
                </a>
              ) : (
                <span className="text-primary">{categoryLabel}</span>
              )}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
