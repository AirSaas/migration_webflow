import { cn } from "@/lib/utils";

interface ListInlineProps {
  children: React.ReactNode;
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

/**
 * ListInline
 *
 * @purpose    Single inline item (icon + text) — the row primitive behind <CheckList> and FeatureFrame checklists.
 * @useWhen    You need one check-prefixed line inside rich content, or want to render a list with a custom (non-check) icon by passing `icon`.
 * @dontUse    For multi-item vertical lists — use <CheckList> which composes this under the hood.
 *
 * @limits
 *   - icon: optional override; defaults to the green-gradient circle-check
 */
export function ListInline({
  children,
  icon,
  className,
}: ListInlineProps) {
  return (
    <div
      className={cn("flex items-start gap-[0.4rem]", className)}
    >
      {icon ?? <CheckCircleIcon />}
      <span
        className="flex-1 font-light text-foreground"
        style={{ fontSize: "1.2rem" }}
      >
        {children}
      </span>
    </div>
  );
}
