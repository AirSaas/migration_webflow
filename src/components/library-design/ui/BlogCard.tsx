import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

/**
 * BlogCard
 *
 * @purpose    Single blog article preview card — thumbnail, publication
 *             date, title, excerpt, and a compact multi-author byline.
 *             The entire card surfaces the article and the title acts as
 *             the primary link; an optional category link (e.g. a
 *             newsletter / section name) stays independently clickable.
 * @useWhen    Inside <BlogCollectionFrame> for blog index / listing pages,
 *             the homepage "featured articles" section, or any CMS-driven
 *             content grid that lists thumbnails + excerpts.
 * @dontUse    For testimonial / client logos (use <TestimonialCard> /
 *             <ClientCard>). For author attribution inside an article hero
 *             (use <BlogAuthorTag>). For non-article content preview
 *             (use <CardCta>).
 *
 * @limits
 *   - title: max 120 chars (H4 wraps cleanly up to ~2 lines at that length)
 *   - excerpt: max 200 chars (3 lines at --text-paragraph)
 *   - thumbnailAlt: required. Empty string `""` only for purely
 *     decorative thumbnails (rare — blog thumbnails should describe)
 *   - authors: 1–4 items. Max 3 avatars shown (stacked); overflow collapses
 *     to a "+N autres" label driven by `authorsMoreLabel`
 *   - authors[i].name: max 40 chars
 *   - categoryLabel: max 60 chars (if provided)
 *
 * @forbidden
 *   - Do NOT pass className that overrides bg / border / padding / rounded —
 *     the white card chrome is part of the contract
 *   - Do NOT nest <BlogCard> inside another card (use plain markup for
 *     inline previews)
 *   - Do NOT hardcode any locale copy ("Publié par", "dans", "autres") —
 *     all labels are locale-driven via props
 *   - Do NOT omit `authors` — empty byline is unsupported (use a dedicated
 *     "anonymous" placeholder on the consumer side if truly needed)
 *
 * @figma node-id 312-2107 (inside 312-2093)
 */

export interface BlogCardAuthor {
  /** Author display name. Max 40 chars. */
  name: string;
  /** Optional circular avatar URL. When omitted the avatar slot collapses. */
  avatarSrc?: string;
  /** Alt for the avatar. Empty string allowed for decorative. */
  avatarAlt?: string;
}

export interface BlogCardProps {
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

  /** 1–4 authors. Renders stacked avatars (max 3 shown) + a compact name line. */
  authors: BlogCardAuthor[];

  /** Optional category / newsletter / section label (secondary link). */
  categoryLabel?: string;
  /** Optional href for the category link. */
  categoryHref?: string;

  /**
   * Label before the author names (e.g. "Publié par" / "Published by").
   * Locale-driven — default English fallback, pass translated via next-intl.
   */
  publishedByLabel?: string;
  /**
   * Preposition before the category (e.g. "dans" / "in").
   * Locale-driven — default English fallback, pass translated via next-intl.
   */
  inLabel?: string;
  /**
   * Conjunction between two authors (e.g. "&" / "et" / "and").
   * Default "&". Used only when authors.length === 2.
   */
  authorsAndLabel?: string;
  /**
   * Suffix for 3+ authors — rendered as "<first> + N <moreLabel>"
   * (e.g. "+3 autres", "+3 others"). Default "autres".
   */
  authorsMoreLabel?: string;

  className?: string;
}

export function BlogCard({
  thumbnailSrc,
  thumbnailAlt,
  date,
  title,
  excerpt,
  href,
  authors,
  categoryLabel,
  categoryHref,
  publishedByLabel = "Published by",
  inLabel = "in",
  authorsAndLabel = "&",
  authorsMoreLabel = "autres",
  className,
}: BlogCardProps) {
  assertMaxLength("BlogCard", "title", title, 120);
  assertMaxLength("BlogCard", "excerpt", excerpt, 200);
  assertArrayBounds("BlogCard", "authors", authors, 1, 4);
  authors.forEach((a, i) =>
    assertMaxLength("BlogCard", `authors[${i}].name`, a.name, 40),
  );
  if (categoryLabel)
    assertMaxLength("BlogCard", "categoryLabel", categoryLabel, 60);
  assertNoClassNameOverride("BlogCard", className, [
    "bg-",
    "border-",
    "rounded-",
    "p-",
  ]);

  const thumbnailIsDecorative = thumbnailAlt === "";
  const visibleAvatars = authors.slice(0, 3);

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

        <Heading level={4} gradient="none" align="left" className="line-clamp-2">
          <a
            href={href}
            className="transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
          >
            {title}
          </a>
        </Heading>

        <Text size="md" align="left" className="line-clamp-3">
          {excerpt}
        </Text>
      </div>

      {/* Author byline — stacked avatars + compact names */}
      <div className="mt-auto flex items-center gap-[0.5rem] pt-[0.5rem]">
        {visibleAvatars.length > 0 && (
          <div className="flex -space-x-[0.5rem] shrink-0">
            {visibleAvatars.map((a, i) =>
              a.avatarSrc ? (
                <img
                  key={i}
                  src={a.avatarSrc}
                  alt={a.avatarAlt ?? ""}
                  loading="lazy"
                  className="h-[2.25rem] w-[2.25rem] rounded-full border-2 border-white object-cover"
                />
              ) : (
                <span
                  key={i}
                  aria-hidden="true"
                  className="h-[2.25rem] w-[2.25rem] rounded-full border-2 border-white bg-secondary-20"
                />
              ),
            )}
          </div>
        )}

        <div className="flex flex-col leading-tight text-foreground text-micro-md min-w-0">
          <span className="font-light truncate">
            {publishedByLabel}{" "}
            <AuthorsLabel
              authors={authors}
              andLabel={authorsAndLabel}
              moreLabel={authorsMoreLabel}
            />
          </span>
          {categoryLabel && (
            <span className="font-light truncate">
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

function AuthorsLabel({
  authors,
  andLabel,
  moreLabel,
}: {
  authors: BlogCardAuthor[];
  andLabel: string;
  moreLabel: string;
}) {
  if (authors.length === 1) {
    return <span className="font-bold">{authors[0].name}</span>;
  }
  if (authors.length === 2) {
    return (
      <>
        <span className="font-bold">{authors[0].name}</span> {andLabel}{" "}
        <span className="font-bold">{authors[1].name}</span>
      </>
    );
  }
  // 3+ authors: first name + "+ N-1 autres"
  return (
    <>
      <span className="font-bold">{authors[0].name}</span> +{authors.length - 1}{" "}
      {moreLabel}
    </>
  );
}
