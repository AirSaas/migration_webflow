import { cn } from "@/lib/utils";
import { Tag } from "@/components/library-design/ui/Tag";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";

/**
 * ValuePropositionFrame
 *
 * @purpose    Section with title + subtitle + a 2-to-6-column grid of child cards
 *             (usually <FeatureCard> or custom).
 * @useWhen    Presenting 2–6 equal-weight benefits / value props / metrics.
 * @dontUse    For a narrative "feature + image" flow (use <FeatureFrame>).
 *             For a listing of 7+ items (use <PillarFrame> or <HighlightFrame>).
 *
 * @limits
 *   - title: max 80 chars
 *   - titleHighlight: max 40 chars
 *   - subtitle: max 250 chars
 *   - children: 2–6 cards (should match `columns` prop for visual balance)
 *   - columns: 2 | 3 | 4 | 5 | 6 (lg breakpoint; default 4)
 *   - tag: max 24 chars
 *
 * @forbidden
 *   - Do NOT mix different card components as children (visual consistency)
 */
interface ValuePropositionFrameProps {
  variant?: "light" | "dark";
  tag?: string;
  /** First part of the title — rendered in primary gradient (light) or white (dark) */
  titleHighlight?: string;
  /** Second part of the title — rendered in dark-to-primary gradient (light) or white (dark) */
  title: string;
  subtitle?: string;
  /** Number of columns at lg breakpoint (default 4). 2 | 3 | 4 | 5 | 6. */
  columns?: 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  /** Optional DOM id on the root <section> — scroll-spy target for TabsFrame / TocSidebar. */
  id?: string;
  className?: string;
}

const LG_COLS_CLASS: Record<2 | 3 | 4 | 5 | 6, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

// Intermediate breakpoint for tablets (768–1023px). Prevents the layout from
// jumping straight from 2 cols (sm) to N cols (lg) when N ≥ 3 — picks a
// sensible half-step so 3/5/6-col grids feel balanced on tablet.
const MD_COLS_CLASS: Record<2 | 3 | 4 | 5 | 6, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2",
  5: "md:grid-cols-3",
  6: "md:grid-cols-3",
};

export function ValuePropositionFrame({
  variant = "light",
  tag,
  titleHighlight,
  title,
  subtitle,
  columns = 4,
  children,
  id,
  className,
}: ValuePropositionFrameProps) {
  const isDark = variant === "dark";

  return (
    <section
      id={id}
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.125rem] lg:px-[10rem] lg:py-[6.25rem]",
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
            {titleHighlight && <GradientText gradient="primary">{titleHighlight}</GradientText>}
            {titleHighlight && " "}
            <GradientText gradient="dark-to-primary">{title}</GradientText>
          </Heading>
        )}

        {subtitle && (
          <Text
            size="md"
            align="center"
            maxWidth="52.9375rem"
            className={isDark ? "text-white" : undefined}
          >
            {subtitle}
          </Text>
        )}
      </div>

      {/* Grid of cards — passed as children for flexibility. Gap scales with
          viewport to keep dense grids breathable on tablet. */}
      <div className={cn(
        "grid grid-cols-1 gap-[clamp(0.75rem,1.5vw,1.25rem)] items-stretch justify-center w-full max-w-[91rem] sm:grid-cols-2",
        MD_COLS_CLASS[columns],
        LG_COLS_CLASS[columns],
      )}>
        {children}
      </div>
    </section>
  );
}
