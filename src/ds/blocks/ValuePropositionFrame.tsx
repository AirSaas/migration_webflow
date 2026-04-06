import { cn } from "@/ds/utils";
import { Tag } from "@/ds/primitives/Tag";
import { Heading } from "@/ds/primitives/Heading";
import { Text } from "@/ds/primitives/Text";

interface ValuePropositionFrameProps {
  variant?: "light" | "dark";
  tag?: string;
  /** First part of the title — rendered in primary gradient (light) or white (dark) */
  titleHighlight?: string;
  /** Second part of the title — rendered in dark-to-primary gradient (light) or white (dark) */
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

export function ValuePropositionFrame({
  variant = "light",
  tag,
  titleHighlight,
  title,
  subtitle,
  children,
  className,
}: ValuePropositionFrameProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "flex flex-col items-center gap-[3.125rem]",
        isDark ? "bg-primary-70" : "bg-white",
        className
      )}
      style={{ padding: "6.25rem 10rem" }}
    >
      {tag && <Tag variant="muted">{tag}</Tag>}

      <div className="flex flex-col items-center gap-[1.25rem] text-center">
        {isDark ? (
          <Heading level={2} gradient="none" align="center" className="text-white">
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
            {titleHighlight && " "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "var(--gradient-dark-to-primary)",
                WebkitBackgroundClip: "text",
              }}
            >
              {title}
            </span>
          </Heading>
        )}

        <Text
          size="md"
          align="center"
          maxWidth="52.9375rem"
          className={isDark ? "text-white" : undefined}
        >
          {subtitle}
        </Text>
      </div>

      {/* Grid of cards — passed as children for flexibility */}
      <div className="flex gap-[1.5625rem] items-stretch justify-center w-full max-w-[91rem]">
        {children}
      </div>
    </section>
  );
}
