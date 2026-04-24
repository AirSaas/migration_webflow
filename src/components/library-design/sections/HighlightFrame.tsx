import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";

export interface HighlightItem {
  /** Number or short value shown as the big gradient token next to the card */
  value: string | number;
  /** Card content — plain string or rich ReactNode */
  description: React.ReactNode;
}

/**
 * HighlightFrame
 *
 * @purpose    Alternating-zigzag vertically stacked cards, each with a big green
 *             gradient number outside the card (left on odd, right on even rows).
 * @useWhen    Emphasizing key positive metrics or numbered gains (3–7 items) with
 *             a success/green visual tone. Typically used after a ComparisonFrame.
 * @dontUse    For negative / warning narratives (use <ComparisonFrame>). For
 *             metrics grid without the zigzag (use <ValuePropositionFrame> with
 *             <FeatureCard> children).
 *
 * @limits
 *   - titleHighlight: max 40 chars (green gradient)
 *   - title: max 80 chars
 *   - subtitle: max 260 chars
 *   - items: 3–7 (past 7 the zigzag rhythm breaks)
 *   - item.value: 1–3 chars (big 5.5rem number)
 *   - item.description: max 200 chars
 *
 * @forbidden
 *   - Do NOT mix HighlightFrame with ComparisonFrame on the same page (redundant)
 */
interface HighlightFrameProps {
  /** First part of the title — rendered in green gradient */
  titleHighlight?: string;
  /** Second part of the title — rendered in dark foreground */
  title: string;
  subtitle?: string;
  items: HighlightItem[];
  /** Optional DOM id on the root <section> — scroll-spy target for TabsFrame / TocSidebar. */
  id?: string;
  className?: string;
}

/**
 * Highlight section — a vertically stacked list of numbered cards, where
 * the big number token sits *outside* the card and alternates sides
 * (odd items: number left / card right, even items: card left / number right).
 *
 * Design system: based on <ComparisonFrame>'s numbered-card pattern, but
 * uses the green accent scale instead of orange.
 */
export function HighlightFrame({
  titleHighlight,
  title,
  subtitle,
  items,
  id,
  className,
}: HighlightFrameProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.75rem] lg:px-[10rem] lg:py-[6.25rem]",
        className,
      )}
      style={{ backgroundColor: "var(--color-success-10)" }}
    >
      {/* Title block */}
      <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
        <Heading level={2} gradient="none" align="center">
          {titleHighlight && <GradientText gradient="green">{titleHighlight}</GradientText>}
          {titleHighlight && " "}
          {title}
        </Heading>

        {subtitle && (
          <Text size="md" align="center" maxWidth="60rem">
            {subtitle}
          </Text>
        )}
      </div>

      {/* Stacked items — alternating zigzag */}
      <div
        className="flex flex-col w-full"
        style={{ maxWidth: "75rem", gap: "1.5rem" }}
      >
        {items.map((item, i) => (
          <HighlightRow key={i} item={item} reversed={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function HighlightRow({
  item,
  reversed,
}: {
  item: HighlightItem;
  reversed: boolean;
}) {
  return (
    <div
      className="flex items-center gap-[1.5rem] md:gap-[2.5rem] lg:gap-[3.5rem]"
      style={{ flexDirection: reversed ? "row-reverse" : "row" }}
    >
      {/* Big number */}
      <GradientText
        gradient="green"
        className="shrink-0 font-bold text-center"
      >
        <span
          style={{ fontSize: "5.5rem", lineHeight: 1, minWidth: "5rem", display: "inline-block" }}
        >
          {item.value}
        </span>
      </GradientText>

      {/* Card */}
      <article
        className="flex-1 rounded-[1.25rem] md:rounded-[1.5rem] bg-white border border-success-20"
        style={{ padding: "1.5rem 1.75rem" }}
      >
        <Text size="md" align="left" className="font-bold">
          {item.description}
        </Text>
      </article>
    </div>
  );
}
