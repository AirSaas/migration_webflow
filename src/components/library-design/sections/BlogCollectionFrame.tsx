import { cn } from "@/lib/utils";
import { BlogCard } from "@/components/library-design/ui/BlogCard";
import { BlogAuthorTag } from "@/components/library-design/ui/BlogAuthorTag";
import { Button } from "@/components/library-design/ui/Button";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";
import { AnimateOnScroll } from "@/components/library-design/ui/AnimateOnScroll";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

type BlogCardProps = React.ComponentProps<typeof BlogCard>;

/**
 * BlogCollectionFrame
 *
 * @purpose    Full-width section introducing a blog content collection —
 *             H2 title + optional subtitle + optional collection-level
 *             author (when a single person runs the whole series) + a
 *             responsive 3-col grid of <BlogCard> previews + a "see all"
 *             CTA below the grid.
 * @useWhen    On the /blog index page (one frame per collection:
 *             articles / podcasts / releases), on pages that surface a
 *             related collection, or as a homepage "featured articles"
 *             block. Pair two or more frames with alternating
 *             `background="light"` / `"alt"` for visual rhythm.
 * @dontUse    For a simple single-row card grid without title/subtitle
 *             (compose <BlogCard> directly inside a <div grid>).
 *             For a paginated full archive (build a dedicated paginated
 *             listing). For mixed content (articles + testimonials) —
 *             split into separate frames.
 *
 * @limits
 *   - title: max 80 chars (H2 scale)
 *   - titleHighlight: max 40 chars (gradient portion of the H2)
 *   - subtitle: max 260 chars
 *   - items: 1–9 (1 = featured highlight; 3 fills a row; 6/9 for longer
 *     index pages)
 *   - viewAllLabel: max 30 chars
 *   - collectionAuthor.name: max 40 chars
 *
 * @forbidden
 *   - Do NOT pass className that overrides bg / padding / rounded on the
 *     outer section — use `background` prop to switch between white and
 *     bg-alt (for alternating-row pages)
 *   - Do NOT hardcode any locale copy (title, subtitle, viewAllLabel,
 *     collectionAuthor.label) — pass translated strings via next-intl
 *   - Do NOT render an empty grid (items.length must be ≥ 1)
 *   - Do NOT pass both `collectionAuthor` on this frame AND per-card
 *     `authors` intending them to merge — they live in different slots.
 *     If a collection has one host, set `collectionAuthor` on the frame
 *     and keep per-card `authors` too (they describe individual articles)
 */

interface BlogCollectionAuthor {
  /** Author display name. Max 40 chars. */
  name: string;
  /** Optional avatar URL. */
  avatarSrc?: string;
  /** Alt for the avatar. Required when avatarSrc is provided; "" for decorative. */
  avatarAlt?: string;
  /**
   * Label rendered above the author pill. Default "Animé par" —
   * override with "Écrit par" / "Hosted by" / etc. via next-intl.
   */
  label?: string;
}

interface BlogCollectionFrameProps {
  /** Section title (H2). Solid dark foreground by default. */
  title: string;
  /** Optional gradient portion of the title (rendered in primary gradient). */
  titleHighlight?: string;
  /** Optional descriptive paragraph under the title. */
  subtitle?: string;
  /**
   * Optional single author that covers the whole collection (e.g. a
   * podcast series hosted by one person). Rendered under the title using
   * <BlogAuthorTag> (no category / no date, just label + pill).
   */
  collectionAuthor?: BlogCollectionAuthor;
  /**
   * Section background — pair alternating frames on long pages
   * (`light` / `alt` / `light` / …) for visual rhythm. Default "light".
   */
  background?: "light" | "alt";
  /** Array of articles (BlogCard props). 1–9 items. */
  items: BlogCardProps[];
  /** "See all" CTA href. */
  viewAllHref: string;
  /** "See all" CTA label (locale-driven, default "Voir plus"). Max 30 chars. */
  viewAllLabel?: string;
  className?: string;
}

export function BlogCollectionFrame({
  title,
  titleHighlight,
  subtitle,
  collectionAuthor,
  background = "light",
  items,
  viewAllHref,
  viewAllLabel = "Voir plus",
  className,
}: BlogCollectionFrameProps) {
  assertMaxLength("BlogCollectionFrame", "title", title, 80);
  if (titleHighlight)
    assertMaxLength("BlogCollectionFrame", "titleHighlight", titleHighlight, 40);
  if (subtitle)
    assertMaxLength("BlogCollectionFrame", "subtitle", subtitle, 260);
  assertArrayBounds("BlogCollectionFrame", "items", items, 1, 9);
  assertMaxLength("BlogCollectionFrame", "viewAllLabel", viewAllLabel, 30);
  if (collectionAuthor)
    assertMaxLength(
      "BlogCollectionFrame",
      "collectionAuthor.name",
      collectionAuthor.name,
      40,
    );
  assertNoClassNameOverride("BlogCollectionFrame", className, [
    "bg-",
    "p-",
    "px-",
    "py-",
    "rounded-",
  ]);

  return (
    <section
      className={cn(
        "w-full px-[1.25rem] py-[3rem] md:px-[4rem] md:py-[5rem] lg:px-[8.125rem] lg:py-[6.25rem]",
        background === "alt" ? "bg-bg-alt" : "bg-white",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[91.25rem] flex-col items-center gap-[2rem] md:gap-[2.5rem] lg:gap-[3.125rem]">
        {/* Header — title + subtitle + optional collection author */}
        <div className="flex flex-col items-center gap-[1.25rem] text-center">
          <Heading level={2} gradient="none" align="center">
            {titleHighlight ? (
              <GradientText gradient="primary">{titleHighlight}</GradientText>
            ) : null}
            {titleHighlight && " "}
            <span className="text-foreground">{title}</span>
          </Heading>

          {subtitle && (
            <Text size="md" align="center" maxWidth="52.9375rem">
              {subtitle}
            </Text>
          )}

          {collectionAuthor && (
            <BlogAuthorTag
              name={collectionAuthor.name}
              avatarSrc={collectionAuthor.avatarSrc}
              avatarAlt={collectionAuthor.avatarAlt}
              publishedByLabel={collectionAuthor.label ?? "Animé par"}
            />
          )}
        </div>

        {/* 3-col grid of articles */}
        <div className="grid w-full grid-cols-1 gap-[1.5rem] md:grid-cols-2 md:gap-[1.875rem] lg:grid-cols-3">
          {items.map((article, i) => (
            <BlogCard key={i} {...article} />
          ))}
        </div>

        {/* "Voir plus" CTA */}
        <AnimateOnScroll animation="scale-up" duration={500} delay={100}>
          <Button variant="primary" size="md" href={viewAllHref}>
            {viewAllLabel}
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
