import { cn } from "@/lib/utils";
import { Button, type ButtonVariant, type ButtonSize } from "@/components/library-design/ui/Button";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { GradientText } from "./GradientText";
import { assertMaxLength } from "@/lib/ds-validators";

/**
 * CardCta
 *
 * @purpose    Minimal card with a short gradient title, a one-line description,
 *             and a primary CTA. Usually rendered as children of `<CtaFrame>`.
 * @useWhen    Offering a quick CTA choice (e.g. "Démo" / "Newsletter" / "Contact").
 * @dontUse    For a feature/benefit card (use `<FeatureCard>`).
 *
 * @limits
 *   - title: max 30 chars (Figma H4)
 *   - description: max 100 chars (one-line paragraph)
 *   - ctaLabel: max 18 chars
 *   - mediaThumbnail: optional landscape 16/9 image rendered above the title —
 *     use for video replay teasers, media cards, etc.
 *
 * @forbidden
 *   - Do NOT pass typography className overrides
 *   - Do NOT omit mediaThumbnail.alt (required when prop is used; pass `""` for decorative)
 */

type CardCtaGradient = "primary" | "orange" | "green" | "dark-to-primary" | "none";

export interface CardCtaMediaThumbnail {
  /** Landscape image URL — displayed with 16/9 aspect ratio. */
  src: string;
  /** Required alt text — empty string `""` for purely decorative. */
  alt: string;
}

interface CardCtaProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  /** Gradient applied to the title. Defaults to "primary". Use "none" for solid title. */
  gradient?: CardCtaGradient;
  /** CTA button variant. Defaults to "primary". */
  ctaVariant?: ButtonVariant;
  /** CTA button size. Defaults to "sm". */
  ctaSize?: ButtonSize;
  /** Optional landscape thumbnail rendered above the title (video replay, media, etc.). */
  mediaThumbnail?: CardCtaMediaThumbnail;
  className?: string;
}

export function CardCta({
  title,
  description,
  ctaLabel,
  ctaHref = "#",
  gradient = "primary",
  ctaVariant = "primary",
  ctaSize = "sm",
  mediaThumbnail,
  className,
}: CardCtaProps) {
  assertMaxLength("CardCta", "title", title, 30);
  assertMaxLength("CardCta", "description", description, 100);
  assertMaxLength("CardCta", "ctaLabel", ctaLabel, 18);

  const useGradient = gradient !== "none";

  return (
    <article
      className={cn(
        "flex flex-col gap-[0.75rem] md:gap-[0.9375rem] items-center justify-center rounded-[1.25rem] md:rounded-[1.5625rem] border border-primary-40 bg-white p-6 transition-shadow duration-300 hover:shadow-card-hover",
        className,
      )}
    >
      {mediaThumbnail && (
        <div className="relative w-full aspect-video overflow-hidden rounded-[0.75rem] border border-secondary-10">
          <img
            src={mediaThumbnail.src}
            alt={mediaThumbnail.alt}
            loading="lazy"
            {...(mediaThumbnail.alt === "" ? { "aria-hidden": true as const } : {})}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      )}

      <Heading level={4} gradient="none" align="center">
        {useGradient ? <GradientText gradient={gradient}>{title}</GradientText> : title}
      </Heading>

      <Text size="md" align="center">
        {description}
      </Text>

      <Button variant={ctaVariant} size={ctaSize} href={ctaHref}>
        {ctaLabel}
      </Button>
    </article>
  );
}
