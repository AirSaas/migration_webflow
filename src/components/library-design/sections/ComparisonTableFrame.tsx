import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
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
  className?: string;
}

/**
 * Comparison table — feature comparison grid.
 *
 * Layout: each row is a separate rounded card spanning the full width,
 * split into a wide "feature" cell on the left and N narrower value cells
 * on the right (one per column). The highlighted column gets a soft
 * primary tint and a primary-coloured header.
 */
export function ComparisonTableFrame({
  titleHighlight,
  title,
  subtitle,
  featuresLabel = "Fonctionnalités",
  columns,
  rows,
  className,
}: ComparisonTableFrameProps) {
  // Build a CSS grid template: feature column flexes, value columns are fixed.
  // 1fr for the feature column, then `9rem` per value column on lg+,
  // collapsing to a more compact `5.5rem` on mobile.
  const valueColCount = columns.length;

  return (
    <section
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
              {titleHighlight && (
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {titleHighlight}
                </span>
              )}
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
          background: #ffffff;
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
          color: "#2d8a4e",
          lineHeight: 1,
        }}
      >
        <CircleCheckIcon color="#2d8a4e" />
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
          color: "#ff0a55",
          lineHeight: 1,
        }}
      >
        <CircleXmarkIcon color="#ff0a55" />
      </span>
    );
  }
  if (typeof value === "string") {
    return <span className="cmp-cell-text">{value}</span>;
  }
  return <>{value}</>;
}
