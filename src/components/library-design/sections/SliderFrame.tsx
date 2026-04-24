import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";
import { Slider, type SliderSlide } from "@/components/library-design/ui/Slider";
import { assertMaxLength, assertArrayBounds } from "@/lib/ds-validators";

/**
 * SliderFrame
 *
 * @purpose    Centered title + subtitle + interactive screenshot carousel.
 * @useWhen    Showcasing a product surface (marketplace, integrations, multi-screen
 *             flow, bootcamp gallery, community LPDT) with 2–8 slides that the
 *             user navigates through. `variant="dark"` for sections that need
 *             to break the rhythm with a primary-70 background.
 * @dontUse    For a static feature/image (use <FeatureFrame>). For a single image,
 *             no carousel wrapper needed.
 *
 * @limits
 *   - variant: "light" (default, white bg) | "dark" (primary-70 bg, white typography)
 *   - titleHighlight: max 40 chars (primary gradient light / white dark)
 *   - titleRest: max 70 chars (dark foreground light / white dark)
 *   - subtitle: max 280 chars
 *   - slides: 2–8 (above 8, navigation feels tedious — split into 2 sections)
 *
 * @forbidden
 *   - Do NOT nest another <Slider> inside this frame
 */

interface SliderFrameProps {
  /** Visual variant — "light" (default) or "dark" (primary-70 background). */
  variant?: "light" | "dark";
  /** Primary-gradient portion of the title (rendered first). */
  titleHighlight: string;
  /** Dark foreground portion of the title (rendered after, joined by a space). */
  titleRest: string;
  subtitle: string;
  slides: SliderSlide[];
  className?: string;
}

export function SliderFrame({
  variant = "light",
  titleHighlight,
  titleRest,
  subtitle,
  slides,
  className,
}: SliderFrameProps) {
  assertMaxLength("SliderFrame", "titleHighlight", titleHighlight, 40);
  assertMaxLength("SliderFrame", "titleRest", titleRest, 70);
  assertMaxLength("SliderFrame", "subtitle", subtitle, 280);
  assertArrayBounds("SliderFrame", "slides", slides, 2, 8);

  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "flex flex-col items-center w-full",
        isDark ? "bg-primary-70" : "bg-white",
        className,
      )}
      style={{
        gap: "3.125rem",
        paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
        paddingBottom: "clamp(3rem, 5.2vw, 6.25rem)",
      }}
    >
      <div className="flex flex-col items-center gap-[1.25rem] text-center w-full">
        <Heading
          level={2}
          gradient="none"
          align="center"
          className={isDark ? "text-white" : undefined}
        >
          {isDark ? (
            <span>
              {titleHighlight} {titleRest}
            </span>
          ) : (
            <>
              <GradientText gradient="primary">{titleHighlight}</GradientText>
              <span className="text-foreground"> {titleRest}</span>
            </>
          )}
        </Heading>

        <Text
          size="md"
          align="center"
          maxWidth="91rem"
          className={isDark ? "text-white" : undefined}
        >
          {subtitle}
        </Text>
      </div>

      <Slider slides={slides} />
    </section>
  );
}
