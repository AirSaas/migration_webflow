import { cn } from "@/lib/utils";
import { Tag } from "@/components/library-design/ui/Tag";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";

export interface Pillar {
  /** Pre-rendered icon node — typically an <IconIllustration size="lg"> */
  icon: React.ReactNode;
  /** Short pillar label — rendered uppercase in primary color (e.g. "DROP", "ADD") */
  title: string;
  /** One-line description of the pillar */
  description: string;
  /** Optional example note — rendered with a left border in primary color */
  example?: string;
  /** Label prefix for the example — defaults to "Example" */
  exampleLabel?: string;
}

/**
 * PillarFrame
 *
 * @purpose    Grid of "pillar" cards — each with a large icon illustration,
 *             uppercase primary title, description, and an optional example note
 *             with a left-border accent.
 * @useWhen    Articulating 2–6 core principles / methodology steps / framework
 *             pillars (e.g. "DROP / KEEP / ADD" methodology; 4 product pillars).
 * @dontUse    For generic feature grids (use <ValuePropositionFrame>). For
 *             metric-heavy cards (use <FeatureCard>).
 *
 * @limits
 *   - titleHighlight: max 40 chars
 *   - title: max 80 chars
 *   - subtitle: max 260 chars
 *   - pillars: 2–8 items (2/4/6/8 with columns=2 or 4; 3/6 with columns=3)
 *   - pillar.title: max 20 chars (uppercase, short — "DROP", "ADD")
 *   - pillar.description: max 220 chars
 *   - pillar.example: max 180 chars (optional)
 *   - tag: max 24 chars
 *
 * @forbidden
 *   - Do NOT use for sequential steps (use a numbered pattern instead)
 */
interface PillarFrameProps {
  variant?: "light" | "dark";
  tag?: string;
  /** First part of the title — rendered in primary gradient (light) or white (dark) */
  titleHighlight?: string;
  /** Second part of the title — rendered in dark-to-primary gradient (light) or white (dark) */
  title: string;
  subtitle?: string;
  /** Number of columns at lg breakpoint (default 2). Use 4 for compact trust
   *  strips like security badges (icon + short title + short description). */
  columns?: 2 | 3 | 4;
  pillars: Pillar[];
  /** Optional DOM id on the root <section> — scroll-spy target for TabsFrame / TocSidebar. */
  id?: string;
  className?: string;
}

export function PillarFrame({
  variant = "light",
  tag,
  titleHighlight,
  title,
  subtitle,
  columns = 2,
  pillars,
  id,
  className,
}: PillarFrameProps) {
  const isDark = variant === "dark";

  return (
    <section
      id={id}
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.75rem] lg:px-[10rem] lg:py-[6.25rem]",
        isDark ? "bg-primary-70" : "bg-white",
        className,
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
            {titleHighlight && <GradientText gradient="primary">{titleHighlight}</GradientText>}
            {titleHighlight && " "}
            <GradientText gradient="dark-to-primary">{title}</GradientText>
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

      {/* Pillars grid */}
      <div
        className={cn(
          "grid w-full max-w-[91rem] grid-cols-1 gap-[3rem] lg:gap-[4rem]",
          columns === 4
            ? "md:grid-cols-2 lg:grid-cols-4"
            : columns === 3
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "md:grid-cols-2",
        )}
      >
        {pillars.map((pillar, i) => (
          <PillarItem key={i} pillar={pillar} isDark={isDark} />
        ))}
      </div>
    </section>
  );
}

function PillarItem({ pillar, isDark }: { pillar: Pillar; isDark: boolean }) {
  const accent = isDark ? "text-white" : "text-primary";
  const bodyColor = isDark ? "text-white" : "text-foreground";
  const exampleBorder = isDark ? "border-white/60" : "border-primary-40";
  const exampleColor = isDark ? "text-white/90" : "text-primary";

  return (
    <div className="flex items-start gap-[1.25rem] md:gap-[1.75rem] lg:gap-[2.25rem]">
      <div className="shrink-0 pt-[0.25rem]">{pillar.icon}</div>
      <div className="flex flex-col gap-[0.75rem] md:gap-[1rem] min-w-0">
        <p
          className={cn(
            "uppercase font-bold tracking-[0.1em]",
            accent,
          )}
          style={{ fontSize: "1.125rem", lineHeight: 1.2 }}
        >
          {pillar.title}
        </p>

        <p
          className={cn("font-light leading-[1.45]", bodyColor)}
          style={{ fontSize: "1.125rem" }}
        >
          {pillar.description}
        </p>

        {pillar.example && (
          <p
            className={cn(
              "font-light leading-[1.5] border-l-2",
              exampleBorder,
              exampleColor,
            )}
            style={{ fontSize: "1rem", paddingLeft: "1rem" }}
          >
            <span className="italic">{pillar.exampleLabel ?? "Example"} :</span>{" "}
            {pillar.example}
          </p>
        )}
      </div>
    </div>
  );
}
