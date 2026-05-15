import { cn } from "@/lib/utils";

interface IconIllustrationProps {
  children: React.ReactNode;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { container: "h-[1.8rem] w-[1.8rem]", fontSize: "1.48rem", ellipseHeight: "0.27rem", align: "items-center" as const },
  md: { container: "h-[3.5rem] w-[4.8125rem]", fontSize: "2.8rem", ellipseHeight: "0.34rem", align: "items-start" as const },
  lg: { container: "h-[6rem] w-[8rem]", fontSize: "4.8rem", ellipseHeight: "0.5rem", align: "items-start" as const },
};

const variantMap = {
  dark: {
    iconColor: "var(--color-primary)",
    dropShadow: "var(--color-primary-20)",
    ellipseFill: "var(--color-primary-40)",
  },
  light: {
    iconColor: "white",
    dropShadow: "var(--color-primary)",
    ellipseFill: "var(--color-primary)",
  },
};

/**
 * IconIllustration
 *
 * @purpose    Stylised icon with a drop-shadow offset and a solid ellipse "base" underneath — AirSaas's signature illustrated icon treatment.
 * @useWhen    Section-level iconography that needs more presence than a flat glyph (feature grids, landing hero highlights, <IconRowFrame>).
 * @dontUse    For plain circular badges — use <IconBadge>. For small inline icons, use the raw icon component directly.
 *
 * @limits
 *   - size: "sm" | "md" | "lg" — drives container, font-size, and ellipse proportions
 *   - variant: "dark" (primary icon on light bg) | "light" (white icon with primary glow, for dark sections)
 *
 * @icon-contract
 *   The child icon scales with the container's `font-size` (em units). The
 *   component auto-enforces `width:1em; height:1em` on any direct <svg> child
 *   so contributors pasting an inline SVG with `width="40"` / `height="40"` do
 *   NOT silently break the layout (the shadow ellipse stays at 80% of the
 *   container width while a fixed-px icon stays too small under it).
 *
 *   If your icon source already uses `width="1em" height="1em"` (the existing
 *   illustration-icons set), the override is a no-op.
 *
 * @forbidden
 *   - Do NOT wrap the icon in extra containers — the [&>svg] selector targets
 *     the direct SVG child to enforce sizing.
 */
export function IconIllustration({
  children,
  variant = "dark",
  size = "md",
  className,
}: IconIllustrationProps) {
  const s = sizeMap[size];
  const v = variantMap[variant];

  return (
    <div
      className={cn("relative flex flex-col", s.align, s.container, className)}
      aria-hidden="true"
    >
      {/* Blur glow — light variant only */}
      {variant === "light" && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "var(--color-primary-60)",
            filter: "blur(0.8rem)",
          }}
        />
      )}

      {/* Icon content
          [&>svg]:w-[1em] [&>svg]:h-[1em] enforces the icon-sizing contract:
          contributors pasting an inline SVG with width="40" height="40" still
          get an icon that scales with the container's font-size. */}
      <div
        className="flex items-end justify-start [&>svg]:w-[1em] [&>svg]:h-[1em]"
        style={{
          color: v.iconColor,
          fontSize: s.fontSize,
          filter: `drop-shadow(0.064rem 0.064rem 0px ${v.dropShadow})`,
        }}
      >
        {children}
      </div>

      {/* Ellipse base */}
      <svg
        className="w-[80%]"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        style={{ height: s.ellipseHeight, marginTop: "-0.1rem" }}
      >
        <ellipse cx="50" cy="4" rx="50" ry="4" fill={v.ellipseFill} />
      </svg>
    </div>
  );
}
