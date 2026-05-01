import { cn } from "@/lib/utils";

interface Logo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

type LogosBarSize = "md" | "lg";

interface LogosBarProps {
  label?: string;
  logos: Logo[];
  /**
   * Visual size of the rendered logos.
   * - "md" (default) — 2.5rem (40px) mobile, 4.14rem (66px) desktop
   * - "lg" — 3rem (48px) mobile, 5.5rem (88px) desktop. Use on landing
   *   pages where the logo strip is a primary trust signal and the bar
   *   has room to breathe.
   */
  size?: LogosBarSize;
  className?: string;
}

/**
 * LogosBar
 *
 * @purpose    Horizontal bar of grayscale customer/partner logos with a leading label and divider.
 * @useWhen    Social-proof strip under a hero ("Ils gèrent leur capacité avec AirSaas") or above/below a CTA section.
 * @dontUse    As a full case-studies section — use a dedicated logo grid or testimonials section. For a single featured logo, use a plain <img>.
 *
 * @limits
 *   - logos: array of { src, alt, width?, height? } — rendered grayscale at 70% opacity
 *   - label: optional — if omitted, no leading label is rendered. Pass a localized string from CMS / i18n.
 *   - size: "md" (default, 2.5rem / 4.14rem heights) | "lg" (3rem / 5.5rem heights). LP / Solution heroes typically want "lg" for a more present trust strip.
 *
 * @forbidden
 *   - Do NOT pass arbitrary width/height per logo in the data and expect them to render visually — heights are forced by the `size` prop. The width/height fields only set the underlying <img> intrinsic dimensions for layout-shift hints.
 */
const SIZE_HEIGHTS: Record<LogosBarSize, string> = {
  md: "h-[2.5rem] md:h-[4.14rem]",
  lg: "h-[3rem] md:h-[5.5rem]",
};

export function LogosBar({
  label,
  logos,
  size = "md",
  className,
}: LogosBarProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-[0.5rem] border-y border-primary-60 px-[1rem] py-[1rem] md:flex-row md:gap-[0.625rem] md:px-0 md:py-0",
        className
      )}
      style={{ minHeight: "6rem" }}
    >
      {/* Label — only rendered if provided (no default, locale-driven) */}
      {label && (
        <span
          className="shrink-0 font-light whitespace-nowrap text-center"
          style={{ color: "var(--color-text-muted)", fontSize: "1.2rem" }}
        >
          {label}
        </span>
      )}

      {/* Divider — hidden on mobile */}
      <div
        className="hidden shrink-0 border-l border-text-light md:block"
        style={{ height: "1.875rem" }}
        aria-hidden="true"
      />

      {/* Logos */}
      <div className="flex flex-wrap items-center justify-center gap-[0.5rem] md:gap-[0.8rem]">
        {logos.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className={cn(
              SIZE_HEIGHTS[size],
              "w-auto object-contain grayscale opacity-70",
            )}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
