import { cn } from "@/lib/utils";
import { Tag } from "@/components/library-design/ui/Tag";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";

interface ValuePropositionFrameProps {
  variant?: "light" | "dark";
  tag?: string;
  /** First part of the title — rendered in primary gradient (light) or white (dark) */
  titleHighlight?: string;
  /** Second part of the title — rendered in dark-to-primary gradient (light) or white (dark) */
  title: string;
  subtitle: string;
  /** Number of columns at lg breakpoint (default 4) */
  columns?: 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export function ValuePropositionFrame({
  variant = "light",
  tag,
  titleHighlight,
  title,
  subtitle,
  columns = 4,
  children,
  className,
}: ValuePropositionFrameProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.125rem] lg:px-[5rem] lg:py-[6.25rem]",
        isDark ? "bg-primary-70" : "bg-white",
        className
      )}
    >
      {tag && <Tag variant="muted">{tag}</Tag>}

      <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
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
      <div className={cn(
        "grid grid-cols-1 gap-[1rem] items-stretch justify-center w-full max-w-[91rem] sm:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
      )}>
        {children}
      </div>
    </section>
  );
}
