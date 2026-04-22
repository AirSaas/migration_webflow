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
 *             flow) with 2–5 slides that the user navigates through.
 * @dontUse    For a static feature/image (use <FeatureFrame>). For a single image,
 *             no carousel wrapper needed.
 *
 * @limits
 *   - titleHighlight: max 40 chars (primary gradient)
 *   - titleRest: max 70 chars (dark foreground)
 *   - subtitle: max 280 chars
 *   - slides: 2–5
 *
 * @forbidden
 *   - Do NOT nest another <Slider> inside this frame
 */

interface SliderFrameProps {
  /** Primary-gradient portion of the title (rendered first). */
  titleHighlight: string;
  /** Dark foreground portion of the title (rendered after, joined by a space). */
  titleRest: string;
  subtitle: string;
  slides: SliderSlide[];
  className?: string;
}

export function SliderFrame({
  titleHighlight,
  titleRest,
  subtitle,
  slides,
  className,
}: SliderFrameProps) {
  assertMaxLength("SliderFrame", "titleHighlight", titleHighlight, 40);
  assertMaxLength("SliderFrame", "titleRest", titleRest, 70);
  assertMaxLength("SliderFrame", "subtitle", subtitle, 280);
  assertArrayBounds("SliderFrame", "slides", slides, 2, 5);

  return (
    <section
      className={cn("flex flex-col items-center w-full", className)}
      style={{
        gap: "3.125rem",
        paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
      }}
    >
      <div className="flex flex-col items-center gap-[1.25rem] text-center w-full">
        <Heading level={2} gradient="none" align="center">
          <GradientText gradient="primary">{titleHighlight}</GradientText>
          <span className="text-foreground"> {titleRest}</span>
        </Heading>

        <Text size="md" align="center" maxWidth="91rem">
          {subtitle}
        </Text>
      </div>

      <Slider slides={slides} />
    </section>
  );
}
