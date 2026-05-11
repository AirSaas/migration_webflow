import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "./Heading";
import { Text } from "./Text";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

/**
 * InsightCallout
 *
 * @purpose    Key-takeaway block inside a rich-text article body — a tinted
 *             card with a left accent border, a short title (e.g. "À retenir"
 *             / "Key takeaway"), and a bulleted list of 2-6 insights. Breaks
 *             the reading flow to summarize an important idea.
 * @useWhen    Inside <BlogArticleBody> / <ProseFrame> at the end of a section
 *             ("ce qu'il faut retenir") or at the start to preview what the
 *             reader will learn.
 * @dontUse    For a single standout quote (use <Quote>). For a full-width
 *             highlight section with numbered cards (use <HighlightFrame>).
 *             For a CTA with a button (use <InlineCta>).
 *
 * @limits
 *   - title: max 40 chars (single-line heading-4)
 *   - items: 1–6 insight bullets (string OR rich ReactNode for inline HTML)
 *   - item (string only): max 180 chars per bullet — for ReactNode items
 *     the limit is not enforced since rendered HTML can be richer
 *   - variant: "primary" (default) | "success" | "warning"
 *
 * @forbidden
 *   - Do NOT hardcode title in French — pass via next-intl (no default)
 *   - Do NOT pass className with bg / text / font / padding overrides
 *   - Do NOT nest another InsightCallout inside an item
 */

type InsightVariant = "primary" | "success" | "warning";

type InsightItem = string | ReactNode;

interface InsightCalloutProps {
  /** Heading for the callout — locale-driven, required (no default). */
  title: string;
  /** Insight bullets — 1-6 lines. String for plain text, ReactNode for inline HTML. */
  items: InsightItem[];
  /** Optional leading icon (defaults to a primary info glyph). */
  icon?: ReactNode;
  /** Color variant — maps background + border accent. Default "primary". */
  variant?: InsightVariant;
  className?: string;
}

const VARIANT_STYLES: Record<
  InsightVariant,
  { bg: string; border: string; text: string }
> = {
  primary: {
    bg: "bg-primary-2",
    border: "border-primary",
    text: "text-primary",
  },
  success: {
    bg: "bg-success-10",
    border: "border-success",
    text: "text-success-text",
  },
  warning: {
    bg: "bg-warning-10",
    border: "border-warning",
    text: "text-warning",
  },
};

function InfoIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 8V12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="1.2" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12L10 17L19 8"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InsightCallout({
  title,
  items,
  icon,
  variant = "primary",
  className,
}: InsightCalloutProps) {
  assertMaxLength("InsightCallout", "title", title, 40);
  assertArrayBounds("InsightCallout", "items", items, 1, 6);
  items.forEach((item, i) => {
    if (typeof item === "string") {
      assertMaxLength("InsightCallout", `items[${i}]`, item, 180);
    }
  });
  assertNoClassNameOverride("InsightCallout", className, [
    "bg-",
    "text-",
    "font-",
    "p-",
  ]);

  const styles = VARIANT_STYLES[variant];

  return (
    <aside
      className={cn(
        "rounded-[1.25rem] border-l-4 p-[1.5rem] md:p-[2rem]",
        styles.bg,
        styles.border,
        className,
      )}
    >
      <div className="mb-[1rem] flex items-center gap-[0.75rem]">
        <div className={cn("shrink-0", styles.text)} aria-hidden="true">
          {icon ?? <InfoIcon />}
        </div>
        <Heading level={4} gradient="none" align="left">
          {title}
        </Heading>
      </div>

      <ul className="flex list-none flex-col gap-[0.625rem] p-0">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-[0.625rem]">
            <span
              className={cn("mt-[0.25rem] shrink-0", styles.text)}
              aria-hidden="true"
            >
              <CheckIcon />
            </span>
            <div className="flex-1">
              <Text size="md" align="left">
                {item}
              </Text>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
