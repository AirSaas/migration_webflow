import { cn } from "@/lib/utils";

interface TestimonialCompanyCardProps {
  /** Testimonial quote text */
  quote: string;
  /** Company logo image URL */
  logoSrc: string;
  /** Company logo alt text */
  logoAlt?: string;
  className?: string;
  style?: React.CSSProperties;
}

function QuoteIcon() {
  return (
    <svg
      width="44"
      height="32"
      viewBox="0 0 68 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 48.476V29.086C0 20.66 1.94 14.08 5.82 9.346C9.7 4.612 15.32 1.34 22.68 0.53L24.42 6.786C20.34 7.796 17.1 9.776 14.7 12.726C12.3 15.676 11.1 19.166 11.1 23.196H27.38V48.476H0ZM40.62 48.476V29.086C40.62 20.66 42.56 14.08 46.44 9.346C50.32 4.612 55.94 1.34 63.3 0.53L65.04 6.786C60.96 7.796 57.72 9.776 55.32 12.726C52.92 15.676 51.72 19.166 51.72 23.196H68V48.476H40.62Z"
        fill="var(--color-primary-20)"
      />
    </svg>
  );
}

export function TestimonialCompanyCard({
  quote,
  logoSrc,
  logoAlt = "",
  className,
  style: externalStyle,
}: TestimonialCompanyCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col justify-between bg-white rounded-[1.5625rem] overflow-clip",
        "transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.05)]",
        className,
      )}
      style={{
        borderTop: "1px solid var(--color-primary-20)",
        borderLeft: "1px solid var(--color-primary-20)",
        borderBottom: "5px solid var(--color-primary-20)",
        borderRight: "5px solid var(--color-primary-20)",
        padding: "1.25rem 1.5rem 1.25rem 1.5rem",
        width: "29.375rem",
        minHeight: "auto",
        ...externalStyle,
      }}
    >
      {/* Top content: quote icon + text */}
      <div className="flex flex-col gap-[1rem]" style={{ paddingBottom: "1.25rem" }}>
        <QuoteIcon />
        <p
          className="font-light text-foreground"
          style={{ fontSize: "1.15rem", lineHeight: "1.45" }}
        >
          {quote}
        </p>
      </div>

      {/* Company logo */}
      <img
        src={logoSrc}
        alt={logoAlt}
        className="object-contain object-left"
        style={{ height: "2.25rem", width: "6.5rem" }}
        loading="lazy"
      />
    </article>
  );
}
