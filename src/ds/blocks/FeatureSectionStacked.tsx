import { cn } from "@/ds/utils";
import { SectionHeading } from "@/ds/primitives/SectionHeading";
import { ListEmphasized } from "@/ds/primitives/ListEmphasized";

interface FeatureSectionStackedProps {
  /** Gradient-colored portion of the H2 */
  titleGradient: string;
  /** Dark-colored portion of the H2 (before and/or after gradient) */
  titleDark?: string;
  /** Prefix dark text before the gradient portion */
  titleDarkPrefix?: string;
  /** Subtitle paragraph */
  subtitle?: string;
  /** Emphasized list items (orange left border) */
  listItems?: string[];
  /** Illustration/screenshot image source */
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function FeatureSectionStacked({
  titleGradient,
  titleDark,
  titleDarkPrefix,
  subtitle,
  listItems,
  imageSrc,
  imageAlt = "",
  className,
}: FeatureSectionStackedProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center w-full",
        className,
      )}
      style={{
        gap: "3.125rem",
        paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
      }}
    >
      {/* Section heading */}
      <div className="flex flex-col items-center gap-[1.25rem] text-center w-full">
        <h2
          className="font-black leading-tight"
          style={{ fontSize: "var(--text-h2)" }}
        >
          {titleDarkPrefix && (
            <span className="text-foreground">{titleDarkPrefix} </span>
          )}
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
            <span className="text-foreground">{` ${titleDark}`}</span>
          )}
        </h2>

        {subtitle && (
          <p
            className="font-light text-foreground text-center max-w-[91rem]"
            style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.56" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Emphasized list */}
      {listItems && listItems.length > 0 && (
        <ListEmphasized items={listItems} />
      )}

      {/* Illustration frame */}
      {imageSrc && (
        <div
          className="w-full overflow-clip"
          style={{
            backgroundColor: "var(--color-primary-5, #f3f3fc)",
            borderTopLeftRadius: "2.1875rem",
            borderTopRightRadius: "2.1875rem",
            padding: "2.5rem 2.5rem 0",
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full object-cover object-top"
            style={{
              borderTopLeftRadius: "0.625rem",
              borderTopRightRadius: "0.625rem",
            }}
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
}
