import { cn } from "@/lib/utils";

interface QuoteProps {
  /** Quote text — plain string or rich ReactNode */
  children: React.ReactNode;
  /** Optional attribution line (name, role, source…). When `authorAvatar`
   *  is also provided, this renders next to the circular avatar. */
  author?: React.ReactNode;
  /** Optional circular avatar for the author. Displayed next to `author`. */
  authorAvatar?: string;
  /** Alt text for the author avatar. Defaults to "". */
  authorAvatarAlt?: string;
  /** Hide the decorative quote icon. Default: shown. Ignored in `variant="pull"` (always hidden). */
  hideIcon?: boolean;
  /** Horizontal alignment. Default "center" — matches stacked
   *  FeatureFrame context. Use "left" inside image-side content. */
  align?: "center" | "left";
  /**
   * Visual variant.
   * - "card" (default) — lavender-bordered card with decorative icon and
   *   comfortable padding. Used inside FeatureFrame richContent, landing
   *   sections, testimonial moments needing visual weight.
   * - "pull" — editorial pull-quote: no card chrome, larger italic text.
   *   With `align="left"` an accent left-border (3px primary) is drawn.
   *   Used inside long-form article bodies to break reading flow.
   */
  variant?: "card" | "pull";
  className?: string;
}

function QuoteIcon() {
  return (
    <svg
      width="44"
      height="32"
      viewBox="0 0 68 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M0 48.476V29.086C0 20.66 1.94 14.08 5.82 9.346C9.7 4.612 15.32 1.34 22.68 0.53L24.42 6.786C20.34 7.796 17.1 9.776 14.7 12.726C12.3 15.676 11.1 19.166 11.1 23.196H27.38V48.476H0ZM40.62 48.476V29.086C40.62 20.66 42.56 14.08 46.44 9.346C50.32 4.612 55.94 1.34 63.3 0.53L65.04 6.786C60.96 7.796 57.72 9.776 55.32 12.726C52.92 15.676 51.72 19.166 51.72 23.196H68V48.476H40.62Z"
        fill="var(--color-primary-20)"
      />
    </svg>
  );
}

/**
 * Quote
 *
 * @purpose    Italic citation block — `variant="card"` wraps the text in a
 *             lavender-bordered card with a decorative quote icon (testimonial
 *             moments). `variant="pull"` renders a chrome-less editorial
 *             pull-quote at larger size for inline use inside long-form
 *             article bodies.
 * @useWhen    - `variant="card"`: customer/expert citations inside
 *             FeatureFrame `richContent`, landing sections, anywhere a
 *             testimonial needs visual weight without a full testimonial
 *             section.
 *             - `variant="pull"`: inside <BlogArticleBody> / <ProseFrame>
 *             to surface a key sentence pulled from the article body.
 * @dontUse    For full testimonial grids with photos + roles + logos — use a
 *             dedicated testimonials section. For plain inline italic text,
 *             use <Text italic>.
 *
 * @limits
 *   - variant: "card" (default) | "pull" — editorial no-chrome
 *   - align: "center" (default, matches stacked FeatureFrame) | "left"
 *     (image-side content). With `variant="pull" + align="left"` an accent
 *     left-border (3px primary) is drawn to set off the pull-quote.
 *   - children: quote text only — keep under ~3 sentences. Card body clamps
 *     to 1.125–1.375rem; pull body clamps to 1.375–1.75rem.
 *   - Quote icon is always hidden in `variant="pull"` (editorial convention),
 *     regardless of `hideIcon`.
 */
export function Quote({
  children,
  author,
  authorAvatar,
  authorAvatarAlt,
  hideIcon = false,
  align = "center",
  variant = "card",
  className,
}: QuoteProps) {
  const isCenter = align === "center";
  const isPull = variant === "pull";
  const showIcon = !hideIcon && !isPull;
  const hasPullLeftBorder = isPull && !isCenter;

  return (
    <figure
      className={cn(
        "flex flex-col gap-[0.75rem] md:gap-[1rem] w-full my-[1rem] md:my-[1.5rem]",
        isCenter ? "items-center text-center" : "items-start text-left",
        !isPull && "bg-white rounded-[1.5625rem]",
        hasPullLeftBorder && "border-l-[3px] border-primary pl-[1.5rem] md:pl-[2rem]",
        className,
      )}
      style={
        isPull
          ? {}
          : {
              borderTop: "1px solid var(--color-primary-20)",
              borderLeft: "1px solid var(--color-primary-20)",
              borderBottom: "5px solid var(--color-primary-20)",
              borderRight: "5px solid var(--color-primary-20)",
              padding: "1.75rem 2rem",
            }
      }
    >
      {showIcon && <QuoteIcon />}

      <blockquote
        className="font-light italic text-foreground max-w-[50rem]"
        style={{
          fontSize: isPull
            ? "clamp(1.375rem, 2vw, 1.75rem)"
            : "clamp(1.125rem, 1.6vw, 1.375rem)",
          lineHeight: "1.5",
          margin: 0,
        }}
      >
        {children}
      </blockquote>

      {(author || authorAvatar) && (
        <figcaption
          className={cn(
            "flex items-center gap-[0.75rem] mt-[0.25rem]",
            isCenter ? "justify-center" : "justify-start",
          )}
        >
          {authorAvatar && (
            <img
              src={authorAvatar}
              alt={authorAvatarAlt ?? ""}
              className="rounded-full object-cover shrink-0"
              style={{ width: "2.5rem", height: "2.5rem" }}
              loading="lazy"
            />
          )}
          {author && (
            <span
              className="font-normal text-text-light text-left"
              style={{ fontSize: "var(--text-small, 0.9375rem)" }}
            >
              {author}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
