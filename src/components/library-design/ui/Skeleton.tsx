import { cn } from "@/lib/utils";
import { assertMaxLength } from "@/lib/ds-validators";

/**
 * Skeleton
 *
 * @purpose    Placeholder block that renders while async content is loading.
 *             Uses a subtle `secondary-5` bg + pulse animation to signal "something
 *             is coming here".
 * @useWhen    Replacing text / cards / images that are fetched client-side and have
 *             a measurable target shape (text lines, avatar circle, card rectangle).
 * @dontUse    For static content (the site is SSG — most pages don't need this).
 *             For errors (use <ErrorBoundary>) or empty collections (use <EmptyState>).
 *
 * @limits
 *   - variant: "text" | "circle" | "rect"
 *   - label: optional aria-label, max 60 chars
 *
 * @forbidden
 *   - Do NOT use as a persistent visual element — it's for transient loading states only
 */

type SkeletonVariant = "text" | "circle" | "rect";

interface SkeletonProps {
  variant?: SkeletonVariant;
  /** Width (CSS length). Default 100% for rect/text, size-based for circle. */
  width?: string;
  /** Height (CSS length). Default 1em for text, width for circle. */
  height?: string;
  /** Number of text lines when variant="text". Default 1. */
  lines?: number;
  /** Accessible label describing what's loading (e.g. "Loading testimonials"). */
  label?: string;
  className?: string;
}

const VARIANT_CLASS: Record<SkeletonVariant, string> = {
  text: "rounded",
  circle: "rounded-full",
  rect: "rounded-lg",
};

export function Skeleton({
  variant = "text",
  width,
  height,
  lines = 1,
  label,
  className,
}: SkeletonProps) {
  if (label) assertMaxLength("Skeleton", "label", label, 60);

  const baseClasses = cn(
    "bg-secondary-5 animate-pulse motion-reduce:animate-none",
    VARIANT_CLASS[variant],
    className,
  );

  // Text variant with multiple lines — render stacked bars
  if (variant === "text" && lines > 1) {
    return (
      <div
        className="flex flex-col gap-[0.5rem]"
        role="status"
        aria-label={label ?? "Loading"}
        aria-busy="true"
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={baseClasses}
            style={{
              width: i === lines - 1 ? "70%" : (width ?? "100%"),
              height: height ?? "1em",
            }}
          />
        ))}
      </div>
    );
  }

  const defaultStyle: React.CSSProperties = {
    width: width ?? (variant === "circle" ? "3rem" : "100%"),
    height: height ?? (variant === "circle" ? width ?? "3rem" : variant === "text" ? "1em" : "6rem"),
  };

  return (
    <div
      className={baseClasses}
      style={defaultStyle}
      role="status"
      aria-label={label ?? "Loading"}
      aria-busy="true"
    />
  );
}
