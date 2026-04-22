import { cn } from "@/lib/utils";

type BulletVariant = "check-green" | "circle-primary";

interface ListInlineProps {
  children: React.ReactNode;
  /**
   * Preset bullet. "check-green" (default) → green gradient circle-check
   * (feature / benefit lists). "circle-primary" → outlined primary-60 ring
   * (blog body lists, article bullets). Ignored when a custom `icon` is passed.
   */
  bullet?: BulletVariant;
  /**
   * Custom bullet node — overrides `bullet`. Escape hatch for non-preset
   * glyphs. Prefer `bullet` when possible.
   */
  icon?: React.ReactNode;
  className?: string;
}

function CheckCircleIcon() {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 text-center bg-clip-text text-transparent"
      style={{
        fontFamily: '"Font Awesome 6 Pro"',
        fontWeight: 400,
        fontSize: "1.2rem",
        lineHeight: "1.56",
        backgroundImage: "var(--gradient-green)",
        WebkitBackgroundClip: "text",
      }}
    >
      {"\uF058"}
    </span>
  );
}

function CirclePrimaryBullet() {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 mt-[0.5rem] h-[0.625rem] w-[0.625rem] rounded-full border-[1.5px] border-primary-60"
    />
  );
}

/**
 * ListInline
 *
 * @purpose    Single inline item (icon + text) — the row primitive behind
 *             <CheckList>, <TableOfContentsFrame>, and blog body bullet lists.
 * @useWhen    One check-prefixed line inside rich content, or a vertical
 *             bullet list where each item shares the same preset bullet.
 *             Pass `bullet="circle-primary"` for blog body lists (primary
 *             outlined ring), default `"check-green"` for feature lists.
 * @dontUse    For multi-item vertical lists of features — use <CheckList>
 *             (which composes this under the hood with the green bullet).
 *             For anchor-link tables of contents, use <TableOfContentsFrame>.
 *
 * @limits
 *   - bullet: "check-green" (default, green gradient check — feature /
 *     benefit lists) | "circle-primary" (outlined primary-60 ring — blog
 *     body lists)
 *   - icon: optional custom node; overrides `bullet` when provided
 *
 * @forbidden
 *   - Do NOT pass className with font-size / color overrides on the text —
 *     the font-light + foreground color is part of the contract
 */
export function ListInline({
  children,
  bullet = "check-green",
  icon,
  className,
}: ListInlineProps) {
  const bulletNode =
    icon ??
    (bullet === "circle-primary" ? <CirclePrimaryBullet /> : <CheckCircleIcon />);

  return (
    <div
      className={cn("flex items-start gap-[0.4rem]", className)}
    >
      {bulletNode}
      <span
        className="flex-1 font-light text-foreground"
        style={{ fontSize: "1.2rem" }}
      >
        {children}
      </span>
    </div>
  );
}
