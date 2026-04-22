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
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  subtitle,
  description,
  gradient = "primary",
  className,
}: FeatureCardProps) {
  assertMaxLength("FeatureCard", "title", title, 12);
  if (subtitle) assertMaxLength("FeatureCard", "subtitle", subtitle, 20);
  if (description) assertMaxLength("FeatureCard", "description", description, 220);

  const useGradient = gradient !== "none";

  return (
    <article
      className={cn(
        "flex flex-col justify-start gap-[0.75rem] md:gap-[0.9375rem] rounded-[1.25rem] md:rounded-[1.5625rem] border border-primary-20 bg-primary-2 p-[1.5rem] md:p-[2.1875rem] transition-shadow duration-300 hover:shadow-card-hover",
        className,
      )}
    >
      {icon && (
        <div className="shrink-0" style={{ fontSize: "2.8rem" }}>
          {icon}
        </div>
      )}

      <Heading level={4} gradient="none" align="left">
        {useGradient ? <GradientText gradient={gradient}>{title}</GradientText> : title}
      </Heading>

      {subtitle && (
        <Text size="lg" align="left" className="font-bold">
          {useGradient ? <GradientText gradient={gradient}>{subtitle}</GradientText> : subtitle}
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
