import { Children, Fragment, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientBackground } from "@/components/library-design/ui/GradientBackground";
import { FloatingCard } from "@/components/library-design/ui/FloatingCard";
import { Float } from "@/components/library-design/ui/Float";
import { AnimateOnScroll } from "@/components/library-design/ui/AnimateOnScroll";

/**
 * CtaFrame
 *
 * @purpose    End-of-page or mid-page conversion block: gradient heading + flexible-length
 *             subtitle + 1 or 2 CTA cards. Two layout variants driven by child count:
 *             — **Split** (2 children): 2 columns side-by-side on `md+` breakpoints.
 *             — **Stacked** (1 child): single card occupies 70% of the frame width on `md+`,
 *                full width on mobile. Caller wraps the single CardCta in a
 *                `<div style={{ gridColumn: "1 / -1", width: "70%", margin: "0 auto" }}>`
 *                to opt-in to the Stacked geometry (this is what the dispatcher does for
 *                `cta-stacked`).
 * @useWhen    Closing a page (Split: démo + guide; Stacked: single démo CTA) OR mid-page
 *             "Vous voulez l'essayer ?" banner (Stacked).
 * @dontUse    For a tri-gradient dramatic closing with inner white card (use
 *             <CtaHighlightFrame>).
 *
 * @limits
 *   - children: 1 or 2 <CardCta> components. 1 child → Stacked. 2 children → Split.
 *   - floatingCards: optional decorative chrome — pass `false` to disable when
 *     the CTA grid is wide enough to overlap the floating cards (e.g. tight
 *     landings with a single CardCta).
 *   - title / subtitle: no character limit — the component flexes to accommodate
 *     verbatim live copy. Heading clamps responsively and Text wraps freely.
 *
 * @forbidden
 *   - Do NOT pass more than 2 cards — layout supports up to 2 columns at md+
 *   - Do NOT override gradient via className
 */
interface CtaFrameProps {
  title: string;
  subtitle: string;
  /** Card content — pass CardCta components as children */
  children: React.ReactNode;
  /** Optional DOM id on the root <section> — scroll-spy target for TabsFrame / TocSidebar. */
  id?: string;
  /** Decorative floating cards in the empty background corners.
   *  Default `true`. Pass `false` when the CTA grid extends close to the edges
   *  or when the composition needs to stay text-focused (e.g. one-card stacked
   *  variant on a narrow landing). */
  floatingCards?: boolean;
  className?: string;
}

export function CtaFrame({
  title,
  subtitle,
  children,
  id,
  floatingCards = true,
  className,
}: CtaFrameProps) {
  // Adapt the grid to the child count. `Children.toArray` alone does NOT
  // flatten when `children` IS a Fragment (it only flattens Fragments inside
  // an array), so we manually unwrap top-level Fragments before counting.
  //   - 1 child  → Stacked: caller's 70%-wide wrapper takes the full grid row
  //     via `gridColumn: 1 / -1` and centers via `margin: 0 auto`.
  //     We render a 1-column grid that spans the full content width (no
  //     `max-w` cap) so the 70% wrapper measures against the section, not
  //     against an artificially-narrow grid container.
  //   - 2 children → Split: 2-column grid on `md+`.
  const flattenChildren = (nodes: ReactNode): ReactNode[] =>
    Children.toArray(nodes).flatMap((child) =>
      isValidElement(child) && child.type === Fragment
        ? Children.toArray((child.props as { children?: ReactNode }).children)
        : [child],
    );
  const cardCount = flattenChildren(children).length;
  const gridClass =
    cardCount === 1 ? "md:grid-cols-1" : "md:grid-cols-2";

  return (
    <section
      id={id}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ minHeight: "auto" }}
    >
      {/* Gradient background */}
      <GradientBackground
        variant="cta"
        className="absolute inset-0 w-full"
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.125rem] lg:px-[10rem] lg:py-[6.25rem] overflow-clip"
      >
        <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
          <Heading level={2} gradient="dark-to-primary" align="center">
            {title}
          </Heading>

          <Text size="md" align="center" maxWidth="73.75rem">
            {subtitle}
          </Text>
        </div>

        {/* Cards container — animated in on scroll (scale-up, sequential). */}
        <AnimateOnScroll
          animation="scale-up"
          duration={500}
          delay={100}
          className={cn(
            "grid grid-cols-1 gap-[0.875rem] items-stretch w-full",
            gridClass,
          )}
        >
          {children}
        </AnimateOnScroll>
      </div>

      {/* Floating cards — positioned on empty background corners (away from
          the centered text + card grid in the middle of the section).
          Opt-out via `floatingCards={false}` when the layout doesn't have room
          (e.g. narrow landings) — same convention as <Hero floatingCards>. */}
      {floatingCards && (
        <>
          <Float variant={3} duration={3.5} delay={0} className="absolute z-20 left-[3%] top-[3rem] hidden xl:block">
            <FloatingCard />
          </Float>
          <Float variant={1} duration={4} delay={1.5} className="absolute z-20 right-[3%] bottom-[3rem] hidden xl:block">
            <FloatingCard />
          </Float>
        </>
      )}
    </section>
  );
}
