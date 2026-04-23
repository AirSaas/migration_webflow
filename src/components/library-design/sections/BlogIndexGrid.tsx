import { cn } from "@/lib/utils";
import { BlogCard } from "@/components/library-design/ui/BlogCard";
import { Button } from "@/components/library-design/ui/Button";
import { AnimateOnScroll } from "@/components/library-design/ui/AnimateOnScroll";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

type BlogCardProps = React.ComponentProps<typeof BlogCard>;

/**
 * BlogIndexGrid
 *
 * @purpose    Responsive grid of <BlogCard> previews inside a lavender
 *             panel, with an optional "see all articles" CTA below.
 * @useWhen    Blog index pages, homepage featured-articles section,
 *             category / tag listing pages. Pair with a preceding
 *             <SectionHeading> if the grid needs a title.
 * @dontUse    For long paginated archives (build a dedicated paginated
 *             listing with filters). For mixed content (articles +
 *             whitepapers + videos), split into multiple
 *             grids or use <ValuePropositionFrame>.
 *
 * @limits
 *   - articles: 1–9 (1 for a featured highlight, 3/6/9 fill the grid
 *     cleanly at lg breakpoint). Orphan rows (4, 5, 7, 8 items) render
 *     but leave uneven columns.
 *   - ctaLabel: max 30 chars (matches <Button> limit)
 *   - ctaHref: required when ctaLabel is provided
 *
 * @forbidden
 *   - Do NOT pass className that overrides bg / padding / rounded on the
 *     outer section or the lavender panel
 *   - Do NOT hardcode the CTA label — pass via props (locale-driven)
 *   - Do NOT render an empty grid (articles.length must be >= 1)
 *
 * @figma node-id 312-2093
 */

interface BlogIndexGridProps {
  /** Array of articles (BlogCard props). 1–9 items. */
  articles: BlogCardProps[];
  /** Optional CTA label shown below the grid (e.g. "Voir tous les articles →"). */
  ctaLabel?: string;
  /** Required when ctaLabel is provided. */
  ctaHref?: string;
  className?: string;
}

export function BlogIndexGrid({
  articles,
  ctaLabel,
  ctaHref,
  className,
}: BlogIndexGridProps) {
  assertArrayBounds("BlogIndexGrid", "articles", articles, 1, 9);
  if (ctaLabel) assertMaxLength("BlogIndexGrid", "ctaLabel", ctaLabel, 30);
  if (ctaLabel && !ctaHref) {
    console.warn(
      "[DS] BlogIndexGrid: ctaLabel is set but ctaHref is missing — the CTA will render as a non-link button.",
    );
  }
  assertNoClassNameOverride("BlogIndexGrid", className, [
    "bg-",
    "p-",
    "px-",
    "py-",
    "rounded-",
  ]);

  return (
    <section
      className={cn(
        "w-full bg-white px-[1.25rem] py-[3rem] md:px-[4rem] md:py-[5rem] lg:px-[8.125rem] lg:py-[6.25rem]",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[91.25rem] flex-col items-center gap-[2rem] md:gap-[2.5rem]">
        <div className="w-full rounded-[1.5625rem] bg-primary-2 p-[1.25rem] md:p-[2.5rem]">
          <div className="grid grid-cols-1 gap-[1.5rem] md:grid-cols-2 md:gap-[1.875rem] lg:grid-cols-3">
            {articles.map((article, i) => (
              <BlogCard key={i} {...article} />
            ))}
          </div>
        </div>

        {ctaLabel && (
          <AnimateOnScroll animation="scale-up" duration={500} delay={100}>
            <Button variant="primary" size="md" href={ctaHref}>
              {ctaLabel}
            </Button>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
