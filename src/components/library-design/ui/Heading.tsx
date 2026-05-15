import { cn } from "@/lib/utils";
import { assertMaxLength, assertNoClassNameOverride } from "@/lib/ds-validators";

/**
 * Heading
 *
 * @purpose    Canonical headline component for all H1 / H2 / H3 / H4 in the product.
 * @useWhen    Any headline on a page. Always prefer this over raw <h1-h4>.
 * @dontUse    Inside body copy — use <Text> with `font-bold` if you need emphasis.
 *
 * @limits
 *   - level 1: max ~40 chars on 1 line (clamp 40 → 95px)
 *   - level 2: max ~60 chars on 1 line (clamp 32 → 72px)
 *   - level 3: max ~60 chars on 1 line (clamp 24 → 40px — aligned Figma spec)
 *   - level 4: max ~80 chars on 1 line (clamp 24 → 40px)
 *
 * @forbidden
 *   - Do NOT pass fontSize / fontWeight via `className` — use `level`
 *   - Do NOT override font-family — Product Sans only (enforced in globals.css)
 *   - Do NOT use `gradient` on level 4 (by design: body-adjacent headings stay solid)
 *
 * @figma node-id 115-12821
 */

type HeadingLevel = 1 | 2 | 3 | 4;

interface HeadingProps {
  level?: HeadingLevel;
  children: React.ReactNode;
  gradient?: "dark-to-primary" | "primary" | "none";
  align?: "center" | "left";
  className?: string;
}

// Levels 1-2 are Black (900), levels 3-4 are Bold (700) per Figma spec.
const levelClasses: Record<HeadingLevel, string> = {
  1: "font-black leading-[0.95]",
  2: "font-black leading-tight",
  3: "font-bold leading-[1.18]",
  4: "font-bold leading-[1.2]",
};

const levelFontSize: Record<HeadingLevel, string> = {
  1: "var(--text-h1)",
  2: "var(--text-h2)",
  3: "var(--text-h3)",
  4: "var(--text-h4)",
};

const gradientMap: Record<string, string> = {
  "dark-to-primary": "var(--gradient-dark-to-primary)",
  primary: "var(--gradient-primary)",
};

const HEADING_MAX: Record<HeadingLevel, number> = { 1: 60, 2: 80, 3: 80, 4: 100 };

export function Heading({
  level = 2,
  children,
  gradient = "dark-to-primary",
  align = "center",
  className,
}: HeadingProps) {
  if (typeof children === "string") {
    assertMaxLength(`Heading(${level})`, "children", children, HEADING_MAX[level]);
  }
  // `text-white` / `text-foreground` are legitimate color overrides (dark variants);
  // only fontSize / fontWeight / lineHeight overrides break the Heading contract.
  // `font-semibold` is listed even though the DS never uses 600 — it's here to
  // intercept (and assert) any contributor pasting `font-semibold` from legacy
  // CSS, since 600 has no font file and would synthesize a bold render.
  assertNoClassNameOverride(`Heading(${level})`, className, [
    "text-[",
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
    "text-7xl",
    "font-black",
    "font-bold",
    "font-semibold",
    "font-medium",
    "leading-",
  ]);

  const Tag = `h${level}` as const;
  // Level 4 never uses gradient (Figma spec: H4 is solid secondary)
  const useGradient = gradient !== "none" && level !== 4;

  return (
    <Tag
      className={cn(
        levelClasses[level],
        align === "center" ? "text-center" : "text-left",
        !useGradient && "text-foreground",
        className
      )}
      style={{
        fontSize: levelFontSize[level],
        ...(useGradient
          ? {
              backgroundImage: gradientMap[gradient],
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }
          : {}),
      }}
    >
      {children}
    </Tag>
  );
}
