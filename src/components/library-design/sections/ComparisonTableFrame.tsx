import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";
import {
  CircleCheckIcon,
  CircleXmarkIcon,
} from "@/components/library-design/ui/icons/illustration-icons";

/**
 * Cell value for a comparison column.
 * - `true`  → green check
 * - `false` → red X
 * - string  → rendered as text (e.g. "Limité", "Sur devis")
 * - ReactNode → fully custom content
 */
export type ComparisonCell = boolean | string | React.ReactNode;

export interface ComparisonRow {
  /** Bold feature name */
  feature: string;
  /** Optional longer description below the feature name */
  description?: React.ReactNode;
  /** One value per column (must match `columns.length`) */
  values: ComparisonCell[];
}

export interface ComparisonColumn {
  /** Column header label (e.g. "AirSaas", "Planview Portfolio") */
  label: string;
  /** When true, this column gets the highlighted (primary) treatment */
  highlight?: boolean;
}

interface ComparisonTableFrameProps {
  /** Optional first part of the title — rendered in primary gradient */
  titleHighlight?: string;
  /** Title — rendered in dark foreground (or dark-to-primary gradient if no highlight) */
  title?: string;
  subtitle?: string;
  /** Label for the first column (the one listing features). Defaults to "Fonctionnalités" */
  featuresLabel?: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  /** Optional DOM id on the root <section> — scroll-spy target for TabsFrame / TocSidebar. */
  id?: string;
  className?: string;
}

/**
 * ComparisonTableFrame
 *
 * @purpose    Feature comparison grid — one card per row, one wide "feature" cell
 *             on the left, N narrower value cells on the right (one per column).
 *             Supports boolean (check/X), string, or custom ReactNode cell content.
 * @useWhen    Competitor comparisons, plan/pricing feature matrices, "Avec vs sans
 *             vs autre" tables. The highlighted column (primary tint) is typically
 *             AirSaas itself.
 * @dontUse    For side-by-side narrative lists (use <ComparisonFrame> or
 *             <ComparisonDualFrame>). For 2+ features needing heavy copy, prefer
 *             stacked feature sections.
 *
 * @limits
 *   - title: max 80 chars
 *   - titleHighlight: max 40 chars
 *   - subtitle: max 260 chars
 *   - columns: 2–4 (past 4 the grid overflows on desktop)
 *   - rows: 3–15 (past 15 the page gets heavy — split into multiple tables)
 *   - row.label: max 80 chars
 *   - cell string values: max 40 chars
 *
 * @forbidden
 *   - Do NOT mix boolean + string cells in the same column (visual inconsistency)
 *   - Do NOT use for "avec / sans" paired narrative — use <ComparisonDualFrame>
 */
export function ComparisonTableFrame({
  titleHighlight,
  title,
  subtitle,
  featuresLabel = "Fonctionnalités",
  columns,
  rows,
  id,
  className,
}: ComparisonTableFrameProps) {
  // Build a CSS grid template: feature column flexes, value columns are fixed.
  // 1fr for the feature column, then `9rem` per value column on lg+,
  // collapsing to a more compact `5.5rem` on mobile.
  const valueColCount = columns.length;

  return (
    <section
      id={id}
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.75rem] lg:px-[10rem] lg:py-[6.25rem] bg-white",
        className,
      )}
    >
      {/* Title block */}
      {(titleHighlight || title || subtitle) && (
        <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
          {(titleHighlight || title) && (
            <Heading level={2} gradient="none" align="center">
              {titleHighlight && <GradientText gradient="primary">{titleHighlight}</GradientText>}
              {titleHighlight && title && " "}
              {title}
            </Heading>
          )}

          {subtitle && (
            <Text size="md" align="center" maxWidth="60rem">
              {subtitle}
            </Text>
          )}
        </div>
      )}

      {/* Scoped table styles — using a CSS grid so columns line up perfectly,
          with separate row "cards" stacked with a small gap. */}
      <style>{`
        .cmp-table {
          width: 100%;
          max-width: 75rem;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .cmp-row {
          display: grid;
          grid-template-columns: 1fr repeat(${valueColCount}, 5.5rem);
          column-gap: 0.625rem;
          align-items: stretch;
        }
        @media (min-width: 768px) {
          .cmp-row {
            grid-template-columns: 1fr repeat(${valueColCount}, 9rem);
            column-gap: 0.875rem;
          }
        }
        .cmp-cell {
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: 1.25rem;
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .cmp-cell--center {
          align-items: center;
          text-align: center;
          padding: 1.25rem 0.75rem;
        }
        .cmp-cell--highlight {
          background: var(--color-primary-5);
          border-color: var(--color-primary-10);
        }
        .cmp-header .cmp-cell {
          padding: 1rem 1.5rem;
          background: var(--color-bg-alt);
        }
        .cmp-header .cmp-cell--center {
          padding: 1rem 0.75rem;
        }
        .cmp-header .cmp-cell--highlight {
          background: var(--color-primary-5);
        }
        .cmp-feature-title {
          font-weight: 700;
          color: var(--color-foreground);
          font-size: 1rem;
          line-height: 1.4;
        }
        .cmp-feature-desc {
          font-weight: 300;
          color: var(--color-text-secondary);
          font-size: 0.9375rem;
          line-height: 1.55;
          margin-top: 0.375rem;
        }
        .cmp-col-label {
          font-weight: 700;
          font-size: 1.125rem;
          line-height: 1.3;
          color: var(--color-foreground);
        }
        .cmp-col-label--highlight {
          color: var(--color-primary);
        }
        .cmp-cell-text {
          font-weight: 400;
          color: var(--color-text-secondary);
          font-size: 0.9375rem;
          line-height: 1.4;
        }
      `}</style>

      <div className="cmp-table">
        {/* Header row */}
        <div className="cmp-row cmp-header">
          <div className="cmp-cell">
            <span className="cmp-feature-title">{featuresLabel}</span>
          </div>
          {columns.map((col, i) => (
            <div
              key={i}
              className={cn(
                "cmp-cell cmp-cell--center",
                col.highlight && "cmp-cell--highlight",
              )}
            >
              <span
                className={cn(
                  "cmp-col-label",
                  col.highlight && "cmp-col-label--highlight",
                )}
              >
                {col.label}
              </span>
            </div>
          ))}
        </div>

        {/* Data rows */}
        {rows.map((row, ri) => (
          <div key={ri} className="cmp-row">
            <div className="cmp-cell">
              <span className="cmp-feature-title">{row.feature}</span>
              {row.description && (
                <span className="cmp-feature-desc">{row.description}</span>
              )}
            </div>
            {columns.map((col, ci) => (
              <div
                key={ci}
                className={cn(
                  "cmp-cell cmp-cell--center",
                  col.highlight && "cmp-cell--highlight",
                )}
              >
                <ComparisonValue value={row.values[ci]} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function ComparisonValue({ value }: { value: ComparisonCell }) {
  if (value === true) {
    return (
      <span
        aria-label="Oui"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2rem",
          height: "2rem",
          fontSize: "2rem",
          color: "var(--color-success-text)",
          lineHeight: 1,
        }}
      >
        <CircleCheckIcon color="var(--color-success-text)" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span
        aria-label="Non"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2rem",
          height: "2rem",
          fontSize: "2rem",
          color: "var(--color-warning)",
          lineHeight: 1,
        }}
      >
        <CircleXmarkIcon color="var(--color-warning)" />
      </span>
    );
  }
  if (typeof value === "string") {
    return <span className="cmp-cell-text">{value}</span>;
  }
  return <>{value}</>;
}
