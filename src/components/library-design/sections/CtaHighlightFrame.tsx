import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";
import { Button, type ButtonVariant } from "@/components/library-design/ui/Button";
import { GradientBackground } from "@/components/library-design/ui/GradientBackground";
import { FloatingCard } from "@/components/library-design/ui/FloatingCard";
import { Float } from "@/components/library-design/ui/Float";
import { AnimateOnScroll } from "@/components/library-design/ui/AnimateOnScroll";
import { assertMaxLength } from "@/lib/ds-validators";

/**
 * CtaHighlightFrame
 *
 * @purpose    Full-width closing CTA section — large 3-part tri-gradient H2
 *             (dark / primary / dark) + a centered white card containing a
 *             short subtitle and a single primary CTA.
 * @useWhen    Closing a product page with a strong "book a demo" ask. One per page max.
 * @dontUse    For a side-by-side double CTA block (use <CtaFrame> with two CardCta children).
 *
 * @limits
 *   - titlePrefix: max 30 chars (dark-to-primary gradient, before the highlight)
 *   - titleHighlight: max 50 chars (primary gradient, the emphasized middle)
 *   - titleSuffix: max 20 chars (dark-to-primary gradient, after the highlight)
 *   - subtitle: max 220 chars
 *   - ctaLabel: max 24 chars
 *
 * @forbidden
 *   - Do NOT override gradient colors via className
 *   - Do NOT stack two CtaHighlightFrame on one page
 */

interface CtaHighlightFrameProps {
  /** First dark-gradient portion of the title (rendered before `titleHighlight`). */
  titlePrefix: string;
  /** Middle primary-gradient portion (the emphasized part). */
  titleHighlight: string;
  /** Trailing dark-gradient portion (after the highlight). */
  titleSuffix?: string;
  /** Short reassurance message inside the white card. */
  subtitle: string;
  /** CTA button label. */
  ctaLabel: string;
  ctaHref?: string;
  ctaVariant?: ButtonVariant;
  /** Decorative floating cards (default: 2 subtle ones). Pass `false` to disable. */
  floatingDecorations?: boolean;
  className?: string;
}

export function CtaHighlightFrame({
  titlePrefix,
  titleHighlight,
  titleSuffix,
  subtitle,
  ctaLabel,
  ctaHref = "#",
  ctaVariant = "primary",
  floatingDecorations = true,
  className,
}: CtaHighlightFrameProps) {
  assertMaxLength("CtaHighlightFrame", "titlePrefix", titlePrefix, 30);
  assertMaxLength("CtaHighlightFrame", "titleHighlight", titleHighlight, 50);
  if (titleSuffix) assertMaxLength("CtaHighlightFrame", "titleSuffix", titleSuffix, 20);
  assertMaxLength("CtaHighlightFrame", "subtitle", subtitle, 220);
  assertMaxLength("CtaHighlightFrame", "ctaLabel", ctaLabel, 24);

  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
      <GradientBackground variant="cta" className="absolute inset-0 w-full" />

      <div
        className="relative z-10 flex flex-col items-center gap-[1.25rem] text-center overflow-clip"
        style={{
          paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
          paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
          paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
          paddingBottom: "clamp(3rem, 5.2vw, 6.25rem)",
        }}
      >
        <Heading level={2} gradient="none" align="center" className="max-w-[78.125rem]">
          <GradientText gradient="dark-to-primary">{titlePrefix}</GradientText>
          <GradientText gradient="primary">{titleHighlight}</GradientText>
          {titleSuffix && <GradientText gradient="dark-to-primary">{titleSuffix}</GradientText>}
        </Heading>

        <div
          className="flex flex-col items-center gap-[1.25rem] bg-white w-full"
          style={{
            borderRadius: "1.5625rem",
            padding: "clamp(1.5rem, 2.5vw, 2.5rem) clamp(2rem, 5vw, 5rem)",
            maxWidth: "53rem",
            boxShadow: "var(--shadow-floating)",
          }}
        >
          <Text size="md" align="center">
            {subtitle}
          </Text>
          <AnimateOnScroll animation="scale-up" duration={500} delay={100}>
            <Button variant={ctaVariant} size="md" href={ctaHref}>
              {ctaLabel}
            </Button>
          </AnimateOnScroll>
        </div>
      </div>

      {floatingDecorations && (
        <>
          {/* Single floating satellite — lower-right corner, on empty gradient
              background. The former upper-left float was removed because it
              overlapped the heading on narrow xl viewports. */}
          <Float
            variant={1}
            duration={4}
            delay={1.5}
            className="absolute z-20 right-[3%] bottom-[3rem] hidden xl:block"
          >
            <FloatingCard />
          </Float>
        </>
      )}
    </section>
  );
}
