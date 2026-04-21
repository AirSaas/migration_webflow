import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";

export interface HighlightItem {
  /** Number or short value shown as the big gradient token next to the card */
  value: string | number;
  /** Card content — plain string or rich ReactNode */
  description: React.ReactNode;
}

interface HighlightFrameProps {
  /** First part of the title — rendered in green gradient */
  titleHighlight?: string;
  /** Second part of the title — rendered in dark foreground */
  title: string;
  subtitle?: string;
  items: HighlightItem[];
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
  className,
}: HighlightFrameProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.75rem] lg:px-[10rem] lg:py-[6.25rem]",
        className,
      )}
      style={{ backgroundColor: "#f4fcf0" }}
    >
      {/* Title block */}
      <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
        <Heading level={2} gradient="none" align="center">
          {titleHighlight && (
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #03e26b 0%, #94d5c1 100%)",
                WebkitBackgroundClip: "text",
              }}
            >
              {titleHighlight}
            </span>
          )}
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
      <span
        className="shrink-0 font-bold bg-clip-text text-transparent text-center"
        style={{
          fontSize: "5.5rem",
          lineHeight: 1,
          minWidth: "5rem",
          backgroundImage: "linear-gradient(90deg, #03e26b 0%, #94d5c1 100%)",
          WebkitBackgroundClip: "text",
        }}
      >
        {item.value}
      </span>

      {/* Card */}
      <article
        className="flex-1 rounded-[1.25rem] md:rounded-[1.5rem] bg-white"
        style={{
          border: "1px solid #b8e5a8",
          padding: "1.5rem 1.75rem",
        }}
      >
        <p
          className="font-bold text-foreground"
          style={{ fontSize: "1.25rem", lineHeight: 1.4 }}
        >
          {item.description}
        </p>
      </article>
    </div>
  );
}
