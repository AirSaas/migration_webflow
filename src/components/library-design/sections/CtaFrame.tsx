import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientBackground } from "@/components/library-design/ui/GradientBackground";
import { FloatingCard } from "@/components/library-design/ui/FloatingCard";
import { Float } from "@/components/library-design/ui/Float";
import { AnimateOnScroll } from "@/components/library-design/ui/AnimateOnScroll";
import { assertMaxLength } from "@/lib/ds-validators";

/**
 * CtaFrame
 *
 * @purpose    End-of-page conversion block: large gradient heading + subtitle + 2 CTA cards.
 * @useWhen    Closing a page that wants a direct conversion action (demo + newsletter, etc.).
 * @dontUse    Mid-page — this is designed to be the last visual beat before the footer.
 *
 * @limits
 *   - title: max 80 chars (fits Heading level 2 in 2 lines)
 *   - subtitle: max 220 chars
 *   - children: 2 <CardCta> components side by side (1 column on mobile)
 *   - floatingCards: optional decorative chrome — pass `false` to disable when
 *     the CTA grid is wide enough to overlap the floating cards (e.g. tight
 *     landings with a single CardCta).
 *
 * @forbidden
 *   - Do NOT pass more than 2 cards — layout is grid-cols-2 at md+
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
  assertMaxLength("CtaFrame", "title", title, 80);
  assertMaxLength("CtaFrame", "subtitle", subtitle, 220);

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
          className="grid grid-cols-1 gap-[0.875rem] items-stretch w-full md:grid-cols-2"
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
