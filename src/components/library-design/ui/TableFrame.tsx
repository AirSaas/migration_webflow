import { cn } from "@/lib/utils";
import { assertArrayBounds, assertNoClassNameOverride } from "@/lib/ds-validators";

type Cell = string | React.ReactNode;

interface TableFrameProps {
  /** Column headers (one per column). 2–6 columns. */
  columns: string[];
  /**
   * Rows of cells. Each row must have the same number of cells as `columns`.
   * Cells can be plain strings or rich ReactNode (links, bold, etc.).
   */
  rows: Cell[][];
  /**
   * When true, the first column's body cells render with `font-bold`
   * (useful for attribute-name rows in comparison tables). Default false.
   */
  firstColumnBold?: boolean;
  /** Layout-only className override. No bg / color overrides. */
  className?: string;
}

/**
 * TableFrame
 *
 * @purpose    Responsive comparison / data table with a primary-blue header
 *             row and soft lavender body cells. Scrolls horizontally on
 *             narrow viewports.
 * @useWhen    Blog article body (comparisons: chef de projet vs PMO),
 *             pricing plan comparisons, feature matrix. 2–6 columns, up to
 *             20 rows. Use outside a FeatureFrame / CardCta pattern.
 * @dontUse    For feature lists (use <CheckList> / <ListInline>).
 *             For 2-column key-value metadata (use a <dl> inline in the page).
 *             For over 20 rows — paginate or reduce.
 *
 * @limits
 *   - columns: 2–6 (wider breaks the readable column width on desktop)
 *   - rows: 1–20 (beyond 20, the visual density hurts readability)
 *   - every row.length must equal columns.length (enforced in dev)
 *   - each column header: max 60 chars
 *
 * @forbidden
 *   - Do NOT pass className with bg-* / text-* / border-* overrides — the
 *     primary header + primary-2 cells + primary-20 separators are part
 *     of the visual contract
 *   - Do NOT nest another <TableFrame> inside a cell
 *   - Do NOT pass a row with fewer / more cells than columns
 *
 * @figma node-id 309-1899 (inside blog body 303-1146)
 */
export function TableFrame({
  columns,
  rows,
  firstColumnBold = false,
  className,
}: TableFrameProps) {
  assertArrayBounds("TableFrame", "columns", columns, 2, 6);
  assertArrayBounds("TableFrame", "rows", rows, 1, 20);
  rows.forEach((row, ri) => {
    if (row.length !== columns.length) {
      console.warn(
        `[DS] TableFrame: row[${ri}] has ${row.length} cells but columns has ${columns.length}. Pad or trim to match.`,
      );
    }
  });
  assertNoClassNameOverride("TableFrame", className, [
    "bg-",
    "text-",
    "border-",
    "p-",
  ]);

  return (
    <div
      className={cn("w-full overflow-x-auto", className)}
      role="region"
      aria-label="Data table"
      tabIndex={0}
    >
      <table className="w-full border-separate border-spacing-x-[1px] border-spacing-y-0">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                scope="col"
                className={cn(
                  "bg-primary text-white font-bold text-left p-[0.9375rem] text-paragraph whitespace-nowrap",
                  i === 0 && "rounded-tl-[0.6875rem]",
                  i === columns.length - 1 && "rounded-tr-[0.6875rem]",
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={cn(
                    "bg-primary-2 border-b border-primary-20 p-[0.9375rem] text-paragraph text-foreground align-top",
                    firstColumnBold && ci === 0 ? "font-bold" : "font-light",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
