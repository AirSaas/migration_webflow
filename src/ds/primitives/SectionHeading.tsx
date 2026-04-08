import { cn } from "@/ds/utils";

interface SectionHeadingProps {
  /** Gradient-colored portion of the title */
  titleGradient: string;
  /** Dark-colored portion of the title (appended after gradient) */
  titleDark?: string;
  /** Subtitle paragraph below the title */
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  titleGradient,
  titleDark,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center w-full",
        "px-[1.25rem] py-[3rem] md:px-[4rem] md:py-[4rem] lg:px-[14.375rem] lg:py-[6.25rem]",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-[1.25rem] text-center">
        {/* H2 — gradient + dark */}
        <h2
          className="font-black leading-tight"
          style={{ fontSize: "var(--text-h2)" }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
            }}
          >
            {titleGradient}
          </span>
          {titleDark && (
            <span className="text-foreground">
              {` ${titleDark}`}
            </span>
          )}
        </h2>

        {/* Paragraph */}
        {subtitle && (
          <p
            className="font-light text-foreground text-center max-w-[91rem]"
            style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.56" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
