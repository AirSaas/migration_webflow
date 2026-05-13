import { cn } from "@/lib/utils";
import { assertArrayBounds } from "@/lib/ds-validators";

interface ListEmphasizedProps {
  /** Array of text items to display */
  items: string[];
  className?: string;
}

/**
 * ListEmphasized
 *
 * @purpose    Horizontal row of short text blocks separated by an orange left border — used to highlight 2–4 key points side-by-side.
 * @useWhen    Section intros that list a few emphasised takeaways (e.g. "3 bénéfices", short pillar statements) under a heading.
 * @dontUse    For long bulleted content — use <CheckList>. For vertical stacks with checkmarks, use <CheckList>.
 *
 * @limits
 *   - items: 2–4 strings (enforced — past 4 the md flex-row layout wraps awkwardly)
 */
export function ListEmphasized({ items, className }: ListEmphasizedProps) {
  assertArrayBounds("ListEmphasized", "items", items, 2, 4);
  return (
    <div
      className={cn(
        "flex flex-col gap-[1.25rem] md:flex-row md:items-start md:gap-[1.5625rem] w-full max-w-[91.25rem]",
        className,
      )}
    >
      {items.map((text, i) => (
        <div
          key={i}
          className="flex-1"
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
