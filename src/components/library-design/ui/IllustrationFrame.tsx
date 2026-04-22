import { cn } from "@/lib/utils";

type Tone = "neutral" | "warm";

interface IllustrationFrameProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  /**
   * "open-bottom" (default) — rounded top corners only, padding only on top/sides.
   * Use when the illustration bleeds into the next section (e.g. centered hero).
   * "contained" — all 4 corners rounded, padding on all sides. Use for standalone
   * illustrations (e.g. split hero where the frame is fully visible).
   * Ignored when `tone="warm"` (warm frames are always contained).
   */
  shape?: "open-bottom" | "contained";
  /**
   * Visual tone of the frame chrome.
   * - "neutral" (default) — semi-transparent white "glass" frame for product
   *   screenshots, heroes, feature showcases.
   * - "warm" — pale prevention-10 frame (editorial / blog body image well).
   *   Always contained shape; inner image has a small rounded radius.
   */
  tone?: Tone;
  className?: string;
}

/**
 * IllustrationFrame
 *
 * @purpose    Rounded frame that wraps a hero / section / blog-body
 *             illustration with consistent padding, border, and radius.
 * @useWhen    `tone="neutral"` — hero split visuals, feature screenshots,
 *             any product illustration with the AirSaas "glass" frame.
 *             `tone="warm"` — editorial images inside a blog article body
 *             (BlogArticleBody), where the pale prevention-10 well frames
 *             the visual against the white article background.
 * @dontUse    For decorative floating cards — use <FloatingCard>. For plain
 *             images without any frame chrome, use a raw <img>.
 *
 * @limits
 *   - shape: "open-bottom" (default — rounded top, bleeds into next section)
 *     | "contained" (all 4 corners rounded, standalone). Ignored when
 *     tone="warm" (always contained).
 *   - tone: "neutral" (default — glass) | "warm" (prevention-10 well)
 *   - alt: empty string marks the image as decorative (`aria-hidden`)
 *
 * @forbidden
 *   - Do NOT pass className that overrides bg / border / padding — the
 *     frame chrome is part of the tone contract
 *   - Do NOT combine `tone="warm"` with `shape="open-bottom"` — warm frames
 *     are always contained
 *
 * @figma node-id 303-1146 (warm tone — Blog body image well)
 */
export function IllustrationFrame({
  src,
  alt = "",
  width,
  height,
  shape = "open-bottom",
  tone = "neutral",
  className,
}: IllustrationFrameProps) {
  const isDecorative = alt === "";
  const isWarm = tone === "warm";

  const frameClasses = isWarm
    ? "bg-prevention-10 rounded-[2.1875rem] p-[1.5rem] md:p-[2.5rem]"
    : cn(
        "bg-white/50 border border-white",
        shape === "contained"
          ? "rounded-[1.25rem] p-[1.875rem]"
          : "rounded-t-[1.25rem] pt-[1.875rem] px-[1.875rem]",
      );

  const imgClasses = isWarm
    ? "w-full object-cover rounded-[0.625rem]"
    : "w-full object-cover rounded-b-none";

  return (
    <div
      className={cn(
        "overflow-clip",
        frameClasses,
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        {...(width ? { width } : {})}
        {...(height ? { height } : {})}
        {...(isDecorative ? { "aria-hidden": true as const } : {})}
        className={imgClasses}
      />
    </div>
  );
}
