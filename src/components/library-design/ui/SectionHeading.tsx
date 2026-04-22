import { cn } from "@/lib/utils";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { GradientText } from "./GradientText";
import { assertMaxLength } from "@/lib/ds-validators";

/**
 * SectionHeading
 *
 * @purpose    Standalone centered H2 + subtitle block used to introduce a section.
 * @useWhen    A section needs a highlighted title (with gradient portion) + short paragraph,
 *             and no further custom content in the heading area.
 * @dontUse    When the section has a more complex heading (custom CTA row, tags, eyebrow) —
 *             compose `<Heading>` + `<Text>` directly instead.
 *
 * @limits
 *   - titleGradient: max ~50 chars
 *   - titleDark: max ~60 chars
 *   - subtitle: max ~260 chars
 *
 * @forbidden
 *   - Do NOT pass className with typography overrides — use Heading / Text props instead
 */

interface SectionHeadingProps {
  /** Gradient-colored portion of the title */
  titleGradient: string;
  /** Dark-colored portion of the title (appended after gradient) */
  titleDark?: string;
  /** Subtitle paragraph below the title */
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  titleGradient,
  titleDark,
  subtitle,
  className,
}: SectionHeadingProps) {
  assertMaxLength("SectionHeading", "titleGradient", titleGradient, 50);
  if (titleDark) assertMaxLength("SectionHeading", "titleDark", titleDark, 60);
  if (subtitle) assertMaxLength("SectionHeading", "subtitle", subtitle, 260);

  return (
    <div
      className={cn(
        "flex flex-col items-center w-full",
        "px-[1.25rem] py-[3rem] md:px-[4rem] md:py-[4rem] lg:px-[14.375rem] lg:py-[6.25rem]",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-[1.25rem] text-center">
        <Heading level={2} gradient="none" align="center">
          <GradientText gradient="primary">{titleGradient}</GradientText>
          {titleDark && <span className="text-foreground">{` ${titleDark}`}</span>}
        </Heading>

        {subtitle && (
          <Text size="md" align="center" maxWidth="91rem">
            {subtitle}
          </Text>
        )}
      </div>
    </div>
  );
}
