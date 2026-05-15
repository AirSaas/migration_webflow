import { cn } from "@/lib/utils";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { GradientText } from "./GradientText";
import { assertMaxLength } from "@/lib/ds-validators";

/**
 * FeatureCard
 *
 * @purpose    Card used to display a big metric / short feature statement with icon,
 *             title (often a gradient number or short phrase), optional subtitle,
 *             and a description paragraph.
 * @useWhen    Showing 3–6 metrics / features in a grid (usually inside `<ValuePropositionFrame>`).
 * @dontUse    For a testimonial (use `<TestimonialCard>`), or a full feature section
 *             with image (use `<FeatureFrame>`).
 *
 * @limits
 *   - title: max 12 chars (Figma H4, 40px — breaks past ~1 line)
 *   - subtitle: max 20 chars (Text lg, ~28px — optional)
 *   - description: max 220 chars (Text md paragraph)
 *
 * @forbidden
 *   - Do NOT pass className with typography overrides — use Text / Heading props
 *   - Do NOT mix different `gradient` colors in the same grid (visual noise)
 */

type FeatureCardGradient = "primary" | "orange" | "green" | "dark-to-primary" | "none";
type FeatureCardVariant = "light" | "dark";

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  /**
   * Gradient applied to the title (and subtitle if present).
   * Use "none" to render title in solid `text-foreground`.
   * @default "primary"
   */
  gradient?: FeatureCardGradient;
  /**
   * Surface variant. "light" (default) sits on white / primary-2 with primary-20
   * border. "dark" adapts colors for placement on a primary-70 / dark blue
   * background — translucent white surface, white text, white-alpha border.
   */
  variant?: FeatureCardVariant;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  subtitle,
  description,
  gradient = "primary",
  variant = "light",
  className,
}: FeatureCardProps) {
  // Allow short metrics ("-80%") OR descriptive phrases ("Moins de reporting")
  // up to 40 chars — past 40 the H4 wraps to 3+ lines and breaks rhythm.
  assertMaxLength("FeatureCard", "title", title, 40);
  if (subtitle) assertMaxLength("FeatureCard", "subtitle", subtitle, 20);
  if (description) assertMaxLength("FeatureCard", "description", description, 220);

  const useGradient = gradient !== "none";
  const isDark = variant === "dark";

  return (
    // `h-full` lets the card fill the parent grid cell when the parent uses
    // `items-stretch` — descriptions of mixed length still produce frames of
    // equal height across the row.
    <article
      className={cn(
        "flex h-full flex-col justify-start gap-[0.75rem] md:gap-[0.9375rem] rounded-[1.25rem] md:rounded-[1.5625rem] p-[1.5rem] md:p-[2.1875rem] shadow-sm transition-shadow duration-300 hover:shadow-card-hover",
        // R41 audit Marisella : "dark" variant means card SITS on a dark frame
        // — the card itself is white (more contrast) with same content styling
        // as the light variant. NOT a translucent card.
        isDark
          ? "border border-primary-20 bg-white"
          : "border border-primary-20 bg-primary-2",
        className,
      )}
    >
      {icon && (
        <div className="shrink-0" style={{ fontSize: "2.8rem" }}>
          {icon}
        </div>
      )}

      <Heading level={4} gradient="none" align="left">
        {useGradient ? (
          <GradientText gradient={gradient}>{title}</GradientText>
        ) : (
          title
        )}
      </Heading>

      {subtitle && (
        <Text size="lg" align="left" className="font-bold">
          {useGradient ? (
            <GradientText gradient={gradient}>{subtitle}</GradientText>
          ) : (
            subtitle
          )}
        </Text>
      )}

      {description && (
        <Text size="md" align="left">
          {description}
        </Text>
      )}
    </article>
  );
}
