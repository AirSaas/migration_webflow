import { cn } from "@/lib/utils";

interface ListEmphasizedProps {
  /** Array of text items to display */
  items: string[];
  className?: string;
}

/**
 * ListEmphasized
 *
 * @purpose    Grid of short text blocks separated by an orange left border —
 *             used to highlight key points side-by-side under a section heading.
 * @useWhen    Section intros that list emphasised takeaways (e.g. "3 bénéfices",
 *             short pillar statements). Typical inside `<FeatureSectionStacked>`.
 * @dontUse    For long bulleted content — use <CheckList>. For vertical stacks
 *             with checkmarks, use <CheckList>.
 *
 * @limits
 *   - items: 2+ strings, no upper cap. Layout: 1 column on mobile, **3 per row
 *     at `md+`** — from the 4th item onwards bullets wrap to the next line
 *     (4 items → 3+1, 5 → 3+2, 6 → 3+3, etc.).
 *
 * @forbidden
 *   - Do NOT pass className with typography / color overrides — the orange
 *     left border + primary-70 text are the canonical visual.
 */
export function ListEmphasized({ items, className }: ListEmphasizedProps) {
  return (
    <div
      className={cn(
        // Mobile: 1 column. md+: 3 columns, items wrap naturally onto new rows.
        "grid grid-cols-1 md:grid-cols-3 gap-[1.25rem] md:gap-[1.5625rem] items-start w-full max-w-[91.25rem]",
        className,
      )}
    >
      {items.map((text, i) => (
        <div
          key={i}
          style={{ borderLeft: "2px solid var(--color-orange-bright)", paddingLeft: "0.9375rem" }}
        >
          <p
            className="font-normal text-primary-70"
            style={{ fontSize: "1.2rem", lineHeight: "1.4" }}
          >
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}
