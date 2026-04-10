import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

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
  avatarAlt?: string;
  /** Client full name */
  name: string;
  /** Client job title / role */
  jobTitle: string;
  /** Company name */
  companyName: string;
  /** Info rows displayed in the company section (e.g. employees, sector) */
  infoRows?: ClientCardInfoRow[];
  className?: string;
}

export function ClientCard({
  avatarSrc,
  avatarAlt = "",
  name,
  jobTitle,
  companyName,
  infoRows = [],
  className,
}: ClientCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-[1.5625rem] overflow-clip",
        className,
      )}
      style={{
        border: "1.2px solid var(--color-primary-10, #E8EBFE)",
        width: "29.8333rem",
      }}
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
            color: "var(--color-primary, #3A50DB)",
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
        className="flex flex-col"
        style={{
          backgroundColor: "var(--color-primary-2, #F8F9FF)",
          padding: "1.045rem 1.567rem 1.567rem",
          gap: "0.522rem",
        }}
      >
        {/* Company name */}
        <p
          className="font-light text-foreground"
          style={{
            fontSize: "1.3125rem",
            lineHeight: "normal",
          }}
        >
          {companyName}
        </p>

        {/* Info rows */}
        {infoRows.map((row, i) => (
          <div
            key={i}
            className="flex items-start"
            style={{ gap: "0.522rem" }}
          >
            {/* Icon */}
            <div
              className="shrink-0 flex items-center justify-center"
              style={{
                width: "0.875rem",
                height: "0.875rem",
                fontSize: "0.836rem",
                color: "var(--color-primary-70, #6B7BE9)",
                marginTop: "0.157rem",
              }}
            >
              {row.icon}
            </div>

            {/* Label + Value */}
            <div className="flex flex-col min-w-0 flex-1">
              <span
                className="font-light"
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "normal",
                  color: "var(--color-foreground, #031330)",
                }}
              >
                {row.label}
              </span>
              <span
                className="font-bold"
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: "normal",
                  color: "var(--color-foreground, #031330)",
                }}
              >
                {row.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
