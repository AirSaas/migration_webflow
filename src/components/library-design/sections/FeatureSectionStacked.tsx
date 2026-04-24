import { cn } from "@/lib/utils";
import { ListEmphasized } from "@/components/library-design/ui/ListEmphasized";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";

/**
 * FeatureSectionStacked
 *
 * @purpose    Centered title + subtitle + orange-bordered item list, with an
 *             illustration image that bleeds from the bottom into the next section.
 * @useWhen    Mid-page feature moment where text is stacked on top and the
 *             screenshot/illustration anchors below (e.g. "Un capacity planning par
 *             équipe simple et actionnable" on HomePage).
 * @dontUse    For feature + image side-by-side (use <FeatureFrame>). For a
 *             numbered "avec/sans" list (use <ComparisonFrame>).
 *
 * @limits
 *   - titleGradient: max 40 chars (primary gradient portion)
 *   - titleDark: max 60 chars
 *   - titleDarkPrefix: max 20 chars
 *   - subtitle: max 260 chars
 *   - listItems: 3–6 strings (past 6 the list looks cluttered)
 *
 * @forbidden
 *   - Do NOT use without an image — the design expects the bleed illustration
 */
interface FeatureSectionStackedProps {
  /** Gradient-colored portion of the H2 */
  titleGradient: string;
  /** Dark-colored portion of the H2 (before and/or after gradient) */
  titleDark?: string;
  /** Prefix dark text before the gradient portion */
  titleDarkPrefix?: string;
  /** Subtitle paragraph */
  subtitle?: string;
  /** Emphasized list items (orange left border) */
  listItems?: string[];
  /** Illustration/screenshot image source */
  imageSrc?: string;
  imageAlt: string;
  /** Background variant */
  variant?: "default" | "primary2";
  /** Optional DOM id on the root <section> — scroll-spy target for TabsFrame / TocSidebar. */
  id?: string;
  className?: string;
}

export function FeatureSectionStacked({
  titleGradient,
  titleDark,
  titleDarkPrefix,
  subtitle,
  listItems,
  imageSrc,
  imageAlt,
  variant = "default",
  id,
  className,
}: FeatureSectionStackedProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col items-center w-full",
        variant === "primary2" && "bg-primary-2",
        className,
      )}
      style={{
        gap: "3.125rem",
        paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
      }}
    >
      {/* Section heading */}
      <div className="flex flex-col items-center gap-[1.25rem] text-center w-full">
        <Heading level={2} gradient="none" align="center">
          {titleDarkPrefix && (
            <span className="text-foreground">{titleDarkPrefix} </span>
          )}
          <GradientText gradient="primary">{titleGradient}</GradientText>
          {titleDark && (
            <span className="text-foreground">{` ${titleDark}`}</span>
          )}
        </Heading>

        {subtitle && (
          <Text size="md" align="center" maxWidth="91rem">
            {subtitle}
          </Text>
        )}
      </div>

      {/* Emphasized list */}
      {listItems && listItems.length > 0 && (
        <ListEmphasized items={listItems} />
      )}

      {/* Illustration frame */}
      {imageSrc && (
        <div
          className="w-full overflow-clip"
          style={{
            backgroundColor: "var(--color-primary-5)",
            borderTopLeftRadius: "2.1875rem",
            borderTopRightRadius: "2.1875rem",
            padding: "2.5rem 2.5rem 0",
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full object-cover object-top"
            style={{
              borderTopLeftRadius: "0.625rem",
              borderTopRightRadius: "0.625rem",
            }}
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
}
