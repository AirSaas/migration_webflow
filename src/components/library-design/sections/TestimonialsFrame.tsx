import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { TestimonialCard } from "@/components/library-design/ui/TestimonialCard";
import { GradientText } from "@/components/library-design/ui/GradientText";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarSrc?: string;
}

/**
 * TestimonialsFrame
 *
 * @purpose    Section wrapper for testimonial cards: gradient heading + 3-col grid.
 * @useWhen    Surfacing 2–6 customer quotes on a marketing page. 1 quote = use
 *             <TestimonialCard> inline (no frame).
 * @dontUse    For a single hero testimonial — just render a <TestimonialCard> inline.
 *             For company-logo-based testimonials, prefer <TestimonialCompanyCard>.
 *
 * @limits
 *   - title: max 40 chars (gradient dark-to-primary)
 *   - titleHighlight: max 40 chars (gradient primary)
 *   - testimonials: 1–6 items. Grid is **adaptive** based on count to fill the frame:
 *       N=1 → 1 col centered (constrained to ~28rem so the card doesn't stretch end-to-end)
 *       N=2 → 2 cols (each card takes 1/2 width, no orphan empty col)
 *       N≥3 → 3 cols max (rows wrap for N=4..6)
 *     Mobile always 1 col, md breakpoint is 2 cols (or 1 if N=1).
 *
 * @forbidden
 *   - Do NOT mix testimonials prop AND children — children wins, testimonials ignored
 *   - Do NOT pass more than 6 items — past that the grid feels like a wall.
 *     Use a slider or paginated catalog instead.
 */
interface TestimonialsFrameProps {
  /** Dark-to-primary gradient part of the title */
  title: string;
  /** Primary gradient part of the title — optional for single-gradient headings */
  titleHighlight?: string;
  /** Simple mode: array of personal testimonials rendered as TestimonialCard grid */
  testimonials?: Testimonial[];
  /** Flexible mode: pass any combination of card grids as children (overrides testimonials) */
  children?: React.ReactNode;
  /** Character threshold above which each quote collapses to "read more". Default 400. */
  truncateAt?: number;
  /** Label for the "show more" toggle on each card. Locale-driven via next-intl. */
  readMoreLabel?: string;
  /** Label for the "show less" toggle on each card. Locale-driven via next-intl. */
  readLessLabel?: string;
  /** Optional DOM id on the root <section> — scroll-spy target for TabsFrame / TocSidebar. */
  id?: string;
  className?: string;
}

export function TestimonialsFrame({
  title,
  titleHighlight,
  testimonials,
  children,
  truncateAt,
  readMoreLabel,
  readLessLabel,
  id,
  className,
}: TestimonialsFrameProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.125rem] lg:px-[10rem] lg:py-[6.25rem] bg-primary-2",
        className
      )}
    >
      <Heading level={2} gradient="none" align="center">
        <GradientText gradient="dark-to-primary">{title}</GradientText>
        {titleHighlight && (
          <>
            {" "}
            <GradientText gradient="primary">{titleHighlight}</GradientText>
          </>
        )}
      </Heading>

      {children ?? (() => {
        const count = testimonials?.length ?? 0;
        const adaptiveGrid =
          count === 1
            ? "md:grid-cols-1 lg:grid-cols-1 lg:max-w-[28rem] lg:mx-auto"
            : count === 2
            ? "md:grid-cols-2 lg:grid-cols-2"
            : "md:grid-cols-2 lg:grid-cols-3";
        return (
          <div className={cn("grid grid-cols-1 gap-[1rem] items-stretch w-full", adaptiveGrid)}>
            {testimonials?.map((t, i) => (
              <TestimonialCard
                key={i}
                quote={t.quote}
                name={t.name}
                role={t.role}
                avatarSrc={t.avatarSrc}
                truncateAt={truncateAt}
                readMoreLabel={readMoreLabel}
                readLessLabel={readLessLabel}
                className="flex-1"
              />
            ))}
          </div>
        );
      })()}
    </section>
  );
}
