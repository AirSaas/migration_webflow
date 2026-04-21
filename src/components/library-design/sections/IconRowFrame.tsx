import { cn } from "@/lib/utils";
import { Tag } from "@/components/library-design/ui/Tag";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";

export interface IconRowItem {
  /** Pre-rendered icon node — typically an <IconBadge> */
  icon: React.ReactNode;
  /** Short label rendered below the icon */
  label: string;
}

interface IconRowFrameProps {
  variant?: "light" | "dark";
  tag?: string;
  /** First part of the title — rendered in primary gradient (light) or white (dark) */
  titleHighlight?: string;
  /** Second part of the title — rendered in dark-to-primary gradient (light) or white (dark) */
  title?: string;
  /** Optional single-string title (rendered entirely in primary gradient).
   *  Use this OR titleHighlight + title. */
  singleTitle?: string;
  subtitle?: string;
  items: IconRowItem[];
  className?: string;
}

export function IconRowFrame({
  variant = "light",
  tag,
  titleHighlight,
  title,
  singleTitle,
  subtitle,
  items,
  className,
}: IconRowFrameProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.75rem] lg:px-[10rem] lg:py-[6.25rem]",
        isDark ? "bg-primary-70" : "bg-white",
        className,
      )}
    >
      {tag && <Tag variant="muted">{tag}</Tag>}

      <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
        {singleTitle ? (
          isDark ? (
            <Heading
              level={2}
              gradient="none"
              align="center"
              className="text-white"
            >
              {singleTitle}
            </Heading>
          ) : (
            <Heading level={2} gradient="primary" align="center">
              {singleTitle}
            </Heading>
          )
        ) : isDark ? (
          <Heading
            level={2}
            gradient="none"
            align="center"
            className="text-white"
          >
            {titleHighlight && <>{titleHighlight} </>}
            {title}
          </Heading>
        ) : (
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
            {title && (
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "var(--gradient-dark-to-primary)",
                  WebkitBackgroundClip: "text",
                }}
              >
                {title}
              </span>
            )}
          </Heading>
        )}

        {subtitle && (
          <Text
            size="md"
            align="center"
            maxWidth="60rem"
            className={isDark ? "text-white" : undefined}
          >
            {subtitle}
          </Text>
        )}
      </div>

      {/* Zigzag icon row — alternating vertical offset on lg+ */}
      <style>{`
        .icon-row-zigzag {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          width: 100%;
          column-gap: 2rem;
          row-gap: 2.5rem;
        }
        .icon-row-zigzag > .icon-row-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          min-width: 6.5rem;
        }
        @media (min-width: 1024px) {
          .icon-row-zigzag > .icon-row-item:nth-child(even) {
            transform: translateY(2.25rem);
          }
        }
      `}</style>
      <div className="icon-row-zigzag">
        {items.map((item, i) => (
          <div key={i} className="icon-row-item">
            {item.icon}
            <span
              className={cn(
                "font-normal text-center",
                isDark ? "text-white" : "text-primary",
              )}
              style={{ fontSize: "1.0625rem", lineHeight: 1.3 }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
