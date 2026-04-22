import { cn } from "@/lib/utils";
import { type ReactNode, type CSSProperties } from "react";
import { assertMaxLength, assertArrayBounds } from "@/lib/ds-validators";

/**
 * ClientCard
 *
 * @purpose    Two-section card showcasing a client: avatar + name + role on top,
 *             company name + metadata rows on a tinted bottom section.
 * @useWhen    Grids of anonymous/public client cards (e.g. "Ils parlent de nous").
 * @dontUse    For a testimonial with a quote (use <TestimonialCard>).
 *
 * @limits
 *   - name: max 30 chars (wraps past that)
 *   - jobTitle: max 45 chars
 *   - companyName: max 30 chars
 *   - infoRows: 2–5 items
 *
 * @forbidden
 *   - Do NOT pass className with typography / color overrides — use the props
 */

export interface ClientCardInfoRow {
  /** FA Duotone icon node */
  icon: ReactNode;
  /** Small label above the value */
  label: string;
  /** Bold value text */
  value: string;
}

export interface ClientCardProps {
  /** URL of the client's avatar image */
  avatarSrc: string;
  /** Alt text for the avatar */
  avatarAlt: string;
  /** Client full name */
  name: string;
  /** Client job title / role */
  jobTitle: string;
  /** Company name */
  companyName: string;
  /** Info rows displayed in the company section (e.g. employees, sector) */
  infoRows?: ClientCardInfoRow[];
  /**
   * Explicit card width. Accepts any CSS length.
   * Defaults to `100%` (fills the parent grid cell responsively, capped by `maxWidth`).
   */
  width?: CSSProperties["width"];
  /**
   * Maximum width when `width` is left at default. Keeps cards from stretching
   * beyond the intended design size in large containers.
   * @default "29.8333rem"
   */
  maxWidth?: CSSProperties["maxWidth"];
  className?: string;
}

export function ClientCard({
  avatarSrc,
  avatarAlt,
  name,
  jobTitle,
  companyName,
  infoRows = [],
  width = "100%",
  maxWidth = "29.8333rem",
  className,
}: ClientCardProps) {
  assertMaxLength("ClientCard", "name", name, 30);
  assertMaxLength("ClientCard", "jobTitle", jobTitle, 45);
  assertMaxLength("ClientCard", "companyName", companyName, 30);
  assertArrayBounds("ClientCard", "infoRows", infoRows, 0, 5);

  return (
    <article
      className={cn(
        "flex flex-col rounded-[1.5625rem] overflow-clip border border-primary-10",
        className,
      )}
      style={{ width, maxWidth }}
    >
      {/* ── Client section (white) ── */}
      <div
        className="flex flex-col items-center bg-white"
        style={{
          padding: "1.567rem 1.567rem 1.045rem",
        }}
      >
        {/* Avatar */}
        <img
          src={avatarSrc}
          alt={avatarAlt}
          className="rounded-full object-cover"
          style={{ width: "5.625rem", height: "5.625rem" }}
          loading="lazy"
        />

        {/* Name */}
        <p
          className="font-bold text-center"
          style={{
            color: "var(--color-primary)",
            fontSize: "1.5rem",
            lineHeight: "normal",
            marginTop: "0.261rem",
          }}
        >
          {name}
        </p>

        {/* Job title */}
        <p
          className="font-light text-center text-foreground"
          style={{
            fontSize: "1.125rem",
            lineHeight: "normal",
          }}
        >
          {jobTitle}
        </p>
      </div>

      {/* ── Company section (primary-2 bg) ── */}
      <div
        className="flex flex-col items-center"
        style={{
          backgroundColor: "var(--color-primary-2)",
          padding: "1.045rem 1.567rem 1.567rem",
          gap: "0.522rem",
        }}
      >
        {/* Company name */}
        <p
          className="font-semibold text-center text-foreground"
          style={{
            fontSize: "1.3125rem",
            lineHeight: "normal",
          }}
        >
          {companyName}
        </p>

        {/* Info rows — horizontal layout */}
        {infoRows.length > 0 && (
          <div className="flex justify-center flex-wrap" style={{ gap: "2rem", marginTop: "0.25rem" }}>
            {infoRows.map((row, i) => (
              <div key={i} className="flex flex-col items-center" style={{ gap: "0.1rem" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    lineHeight: "normal",
                    color: "var(--color-secondary-50)",
                  }}
                >
                  {row.label}
                </span>
                <div className="flex items-center" style={{ gap: "0.3rem" }}>
                  <div
                    className="shrink-0 flex items-center justify-center"
                    style={{
                      width: "0.875rem",
                      height: "0.875rem",
                      fontSize: "0.836rem",
                      color: "var(--color-primary-70)",
                    }}
                  >
                    {row.icon}
                  </div>
                  <span
                    className="font-bold"
                    style={{
                      fontSize: "1rem",
                      lineHeight: "normal",
                      color: "var(--color-foreground)",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
