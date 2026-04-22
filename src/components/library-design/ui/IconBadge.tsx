import { cn } from "@/lib/utils";

interface IconBadgeProps {
  children: React.ReactNode;
  /** "light" — circle with primary-10 background + primary-40 icon (default)
   *  "solid" — circle with primary background + white icon (for dark sections) */
  variant?: "light" | "solid";
  size?: "md" | "lg";
  className?: string;
}

const sizeMap = {
  md: { dim: "5rem", fontSize: "2.25rem" },
  lg: { dim: "6.5rem", fontSize: "3rem" },
};

const variantMap = {
  light: {
    bgColor: "var(--color-primary-10)",
    iconColor: "var(--color-primary-40)",
  },
  solid: {
    bgColor: "rgba(255, 255, 255, 0.15)",
    iconColor: "white",
  },
};

/**
 * IconBadge
 *
 * @purpose    Circular badge hosting a large duotone icon — the main visual anchor in icon-led sections.
 * @useWhen    Inside <IconRowFrame>, feature grids, or anywhere a headline is introduced by a prominent circular icon.
 * @dontUse    For small inline icons (list bullets, button icons) — use <ListInline> or raw icon components. For sharp-cornered icon tiles, use <IconIllustration>.
 *
 * @limits
 *   - variant: "light" (primary-10 bg, primary-40 icon) | "solid" (translucent white on dark sections)
 *   - size: "md" (5rem) | "lg" (6.5rem)
 */
export function IconBadge({
  children,
  variant = "light",
  size = "md",
  className,
}: IconBadgeProps) {
  const s = sizeMap[size];
  const v = variantMap[variant];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center rounded-full shrink-0",
        className,
      )}
      style={{
        width: s.dim,
        height: s.dim,
        backgroundColor: v.bgColor,
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          color: v.iconColor,
          fontSize: s.fontSize,
          lineHeight: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
