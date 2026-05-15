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
 *                to opt-in to the Stacked geometry.
 * @useWhen    Closing a page (Split: démo + guide; Stacked: single démo CTA) OR mid-page
 *             "Vous voulez l'essayer ?" banner (Stacked).
 * @dontUse    For a tri-gradient dramatic closing with inner white card (use
 *             <CtaHighlightFrame>).
 *
 * @dispatcher Registered section.types in `LandingPageV2`:
 *   - `"cta-stacked"`  → renders `<CtaFrame>` Stacked (1 centered CardCta at 70% width).
 *                        Backing type: `CtaStackedSection` in `src/types/landing.ts`.
 *                        Use for the "H2 + subtitle + 1 button" banner pattern
 *                        recurring on produit / équipes / solution pages.
 *   - `"cta"` (with `items.length === 2`) → renders `<CtaFrame>` Split (2 CardCta side-by-side).
 *                        Use for the "démo + guide" or "démo + vidéo" 2-card closing pattern.
 *
 * @stories    Sections/Call to Action/CtaFrame — `Split`, `Stacked`, `StackedButtonOnly`,
 *             `WithoutFloatingCards`.
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
  /**
   * Layout — "default" (max-w 91.25rem padded card) or "wide" (full-bleed banner
   * on Solutions pages with edge-to-edge gradient + tighter inner padding).
   */
  layout?: "default" | "wide";
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
  layout = "default",
  id,
  floatingCards = true,
  className,
}: CtaFrameProps) {
  const isWide = layout === "wide";
  // Adapt the grid to the child count. `Children.toArray` alone does NOT
  // flatten when `children` IS a Fragment (it only flattens Fragments inside
  // an array), so we manually unwrap top-level Fragments before counting.
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

      {/* Content — wide variant uses tighter horizontal padding so the gradient
          reads as a full bandeau at the section edges. */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center gap-[2rem] py-[3rem] md:gap-[2.5rem] md:py-[4rem] lg:gap-[3.125rem] lg:py-[6.25rem] overflow-clip",
          isWide
            ? "px-[1.5rem] md:px-[2.5rem] lg:px-[5rem]"
            : "px-[1.5rem] md:px-[3rem] lg:px-[10rem]",
        )}
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
