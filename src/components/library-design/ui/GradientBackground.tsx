import { cn } from "@/lib/utils";

const variants = {
  hero: {
    gradient: "var(--gradient-hero-bg)",
    className: "h-[887px] bottom-0 opacity-100",
  },
  "hero-dark": {
    gradient: "var(--gradient-hero-dark-bg)",
    className: "h-[887px] bottom-0 opacity-100",
  },
  cta: {
    gradient: "var(--gradient-cta-bg)",
    className: "h-full inset-0 opacity-100",
  },
  comparison: {
    gradient: "var(--gradient-hero-bg)",
    className: "h-full inset-0 opacity-30",
  },
} as const;

interface GradientBackgroundProps {
  variant?: keyof typeof variants;
  className?: string;
}

/**
 * GradientBackground
 *
 * @purpose    Absolutely positioned blurred gradient layer used as section ambiance.
 * @useWhen    Hero backgrounds ("hero" / "hero-dark"), CTA bands ("cta"), or comparison sections ("comparison"). Place inside a `relative` parent.
 * @dontUse    As a card or content background — it's `aria-hidden`, blurred, and absolutely positioned. For solid fills, use Tailwind bg-* classes.
 *
 * @limits
 *   - variant: "hero" | "hero-dark" | "cta" | "comparison" — each has a fixed gradient + positioning
 */
export function GradientBackground({
  variant = "hero",
  className,
}: GradientBackgroundProps) {
  const config = variants[variant];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute w-full blur-[25px]",
        config.className,
        className,
      )}
      style={{ backgroundImage: config.gradient }}
    />
  );
}
