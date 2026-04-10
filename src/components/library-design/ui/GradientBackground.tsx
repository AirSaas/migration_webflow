import { cn } from "@/lib/utils";

const variants = {
  hero: {
    gradient: "var(--gradient-hero-bg)",
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
