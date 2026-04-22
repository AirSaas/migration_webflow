import { cn } from "@/lib/utils";
import { GradientText } from "./GradientText";
import { Text } from "./Text";
import { assertMaxLength } from "@/lib/ds-validators";

/**
 * ListCard
 *
 * @purpose    Numbered card with a big gradient number + short description.
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

type ListCardGradient = "orange" | "primary" | "green" | "dark-to-primary";

interface ListCardProps {
  value: string | number;
  children: React.ReactNode;
  /**
   * Gradient for the big number.
   * @default "orange"
   * Use "green" for positive "avec" lists, "primary" for emphasis, etc.
   */
  gradient?: ListCardGradient;
  /**
   * Border color variant. Must match the semantic of `gradient`.
   * @default "prevention" — prevention-40 border (for orange gradient)
   */
  borderTone?: "prevention" | "primary" | "success" | "secondary";
  className?: string;
}

const BORDER_CLASS: Record<NonNullable<ListCardProps["borderTone"]>, string> = {
  prevention: "border-prevention-40",
  primary: "border-primary-20",
  success: "border-success-40",
  secondary: "border-secondary-10",
};

export function ListCard({
  value,
  children,
  gradient = "orange",
  borderTone = "prevention",
  className,
}: ListCardProps) {
  const valueStr = String(value);
  assertMaxLength("ListCard", "value", valueStr, 2);
  if (typeof children === "string") {
    assertMaxLength("ListCard", "children", children, 220);
  }

  return (
    <article
      className={cn(
        "flex gap-[0.75rem] md:gap-[1.4375rem] items-start rounded-[1.25rem] md:rounded-[1.5625rem] border bg-white",
        BORDER_CLASS[borderTone],
        className,
      )}
      style={{ padding: "1.25rem 1rem 1.25rem 1.25rem" }}
    >
      <GradientText gradient={gradient} className="shrink-0 font-bold">
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
