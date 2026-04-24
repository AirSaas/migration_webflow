import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { assertMaxLength } from "@/lib/ds-validators";

type Tone = "neutral" | "warm";
type CaptionAlign = "left" | "center" | "right";

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
  /**
   * Optional caption rendered below the image as a `<figcaption>`. When
   * provided, the root element switches from `<div>` to `<figure>` for
   * proper semantic markup. Locale-driven — pass via next-intl / CMS.
   */
  caption?: string;
  /**
   * Caption alignment — "center" (default) | "left" | "right". Ignored when
   * `caption` is omitted.
   */
  captionAlign?: CaptionAlign;
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
 *   - caption: max 300 chars — longer captions belong in article body, not
 *     under a figure. When provided the root becomes a `<figure>` with
 *     `<figcaption>` (semantic markup for editorial / blog body figures).
 *   - captionAlign: "center" (default) | "left" | "right"
 *
 * @forbidden
 *   - Do NOT pass className that overrides bg / border / padding — the
 *     frame chrome is part of the tone contract
 *   - Do NOT combine `tone="warm"` with `shape="open-bottom"` — warm frames
 *     are always contained
 *   - Do NOT hardcode caption text in a specific locale — pass via i18n / CMS
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
  caption,
  captionAlign = "center",
  className,
}: IllustrationFrameProps) {
  if (caption) assertMaxLength("IllustrationFrame", "caption", caption, 300);

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

  const imgEl = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      {...(width ? { width } : {})}
      {...(height ? { height } : {})}
      {...(isDecorative ? { "aria-hidden": true as const } : {})}
      className={imgClasses}
    />
  );

  // With caption → semantic <figure> + <figcaption>
  if (caption) {
    return (
      <figure
        className={cn("overflow-clip", frameClasses, className)}
      >
        {imgEl}
        <figcaption
          className={cn(
            "mt-[0.75rem] md:mt-[1rem]",
            captionAlign === "center" && "text-center",
            captionAlign === "right" && "text-right",
          )}
        >
          <Text size="sm" className="italic text-text-muted">
            {caption}
          </Text>
        </figcaption>
      </figure>
    );
  }

  // No caption → plain <div> wrapper (backwards compat).
  return (
    <div className={cn("overflow-clip", frameClasses, className)}>
      {imgEl}
    </div>
  );
}
