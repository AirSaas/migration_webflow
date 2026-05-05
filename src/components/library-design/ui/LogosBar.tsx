import { cn } from "@/lib/utils";

interface Logo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

type LogosBarSize = "md" | "lg";
type LogosBarVariant = "bordered" | "plain";

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
  /**
   * Chrome variant.
   * - "bordered" (default) — top + bottom border, vertical divider between label and logos
   * - "plain" — no borders, no divider, white background. Use for integration grids
   *   ("Connecté à votre écosystème") and any context where the bar should sit
   *   flush in the surrounding layout without chrome.
   */
  variant?: LogosBarVariant;
  /**
   * If true, render logos in their original colors. Default false (grayscale + 70% opacity).
   * Use `true` for integration logos (Jira, Slack, Teams…) where brand color is meaningful.
   * Keep `false` for client/customer trust strips where colored logos would distract.
   */
  preserveColor?: boolean;
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
 *   - logos: array of { src, alt, width?, height? }
 *   - label: optional — if omitted, no leading label is rendered. Pass a localized string from CMS / i18n.
 *   - size: "md" (default, 2.5rem / 4.14rem heights) | "lg" (3rem / 5.5rem heights). LP / Solution heroes typically want "lg" for a more present trust strip.
 *   - variant: "bordered" (default) | "plain" (no borders + divider, white bg). "plain" for integration grids that should sit flush.
 *   - preserveColor: false (default — grayscale at 70% opacity, for client trust strips) | true (for integration logos where brand color matters).
 *
 * @forbidden
 *   - Do NOT pass arbitrary width/height per logo in the data and expect them to render visually — heights are forced by the `size` prop. The width/height fields only set the underlying <img> intrinsic dimensions for layout-shift hints.
 *   - Do NOT use variant="plain" + preserveColor=false on a hero — without the borders, a grayscale strip can feel like a layout glitch. Either keep "bordered" or pair "plain" with preserveColor=true.
 */
const SIZE_HEIGHTS: Record<LogosBarSize, string> = {
  md: "h-[2.5rem] md:h-[4.14rem]",
  lg: "h-[3rem] md:h-[5.5rem]",
};

export function LogosBar({
  label,
  logos,
  size = "md",
  variant = "bordered",
  preserveColor = false,
  className,
}: LogosBarProps) {
  const isPlain = variant === "plain";
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-[0.5rem] px-[1rem] py-[1rem] md:flex-row md:gap-[0.625rem] md:px-0 md:py-0",
        isPlain ? "bg-white" : "border-y border-primary-60",
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

      {/* Divider — hidden on mobile, suppressed in plain variant */}
      {!isPlain && (
        <div
          className="hidden shrink-0 border-l border-text-light md:block"
          style={{ height: "1.875rem" }}
          aria-hidden="true"
        />
      )}

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
              "w-auto object-contain",
              !preserveColor && "grayscale opacity-70",
            )}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
