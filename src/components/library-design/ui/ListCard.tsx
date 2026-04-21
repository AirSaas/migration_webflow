import { cn } from "@/lib/utils";
import { GradientText } from "./GradientText";
import { Text } from "./Text";

/**
 * ListCard
 *
 * @purpose    Numbered card with a big orange gradient number + short description.
 *             Used inside <ComparisonFrame> for "avec/sans" lists or similar numbered lists.
 * @useWhen    Showing 3–7 numbered items where the number is the hero of each row.
 * @dontUse    For simple bullet lists (use <ListInline> or <ListEmphasized>).
 *
 * @limits
 *   - value: max 2 digits (styles go big — 1–2 digits / 4.8rem)
 *   - children text: max 220 chars
 *
 * @forbidden
 *   - Do NOT pass className with typography overrides
 */

interface ListCardProps {
  value: string | number;
  children: React.ReactNode;
  className?: string;
}

export function ListCard({ value, children, className }: ListCardProps) {
  return (
    <article
      className={cn(
        "flex gap-[0.75rem] md:gap-[1.4375rem] items-start rounded-[1.25rem] md:rounded-[1.5625rem] border border-prevention-40 bg-white",
        className,
      )}
      style={{ padding: "1.25rem 1rem 1.25rem 1.25rem" }}
    >
      <GradientText gradient="orange" className="shrink-0 font-bold">
        <span style={{ fontSize: "4.8125rem", lineHeight: "normal", display: "inline-block" }}>
          {value}
        </span>
      </GradientText>

      <Text size="md" align="left" className="flex-1">
        {children}
      </Text>
    </article>
  );
}
