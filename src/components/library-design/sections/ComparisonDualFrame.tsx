import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";
import { Button, type ButtonVariant } from "@/components/library-design/ui/Button";
import { GradientBackground } from "@/components/library-design/ui/GradientBackground";

/**
 * ComparisonDualFrame
 *
 * @purpose    "Avec / sans" dual-column comparison: a row of numbered cards per
 *             column, each column led by a colored pill label.
 * @useWhen    Driving contrast between the old way (sans) and new way (avec)
 *             with concrete paired points. Typically placed before a CTA.
 * @dontUse    For a single-column numbered list (use <ComparisonFrame>).
 *             For feature-matrix style comparison (use <ComparisonTableFrame>).
 *
 * @limits
 *   - titlePrefix: max 70 chars (dark-to-primary gradient portion)
 *   - titleHighlight: max 30 chars (primary gradient portion)
 *   - sansLabel / avecLabel: max 20 chars
 *   - sansItems / avecItems: 3–10 items each, ideally paired
 *   - item.description: max 220 chars
 *
 * @forbidden
 *   - Do NOT pass asymmetric item counts that break the paired narrative
 *     (use <ComparisonFrame> twice instead)
 */

interface ComparisonDualItem {
  value: string | number;
  description: ReactNode;
}

interface ComparisonDualFrameProps {
  titlePrefix: string;
  titleHighlight: string;
  sansLabel?: string;
  avecLabel?: string;
  sansItems: ComparisonDualItem[];
  avecItems: ComparisonDualItem[];
  ctaLabel?: string;
  ctaHref?: string;
  ctaVariant?: ButtonVariant;
  /** Optional DOM id on the root `<section>` — scroll-spy target for TabsFrame / TocSidebar. */
  id?: string;
  className?: string;
}

function DualCard({
  item,
  gradient,
  gridColumn,
  gridRow,
}: {
  item: ComparisonDualItem;
  gradient: "orange" | "primary";
  gridColumn?: number;
  gridRow?: number;
}) {
  return (
    <div
      className="flex gap-[1.4375rem] items-start bg-white rounded-[1.5625rem] border border-prevention-40"
      style={{
        padding: "1.6875rem 1.375rem 1.6875rem 1.8125rem",
        minHeight: "9.1875rem",
        ...(gridColumn ? { gridColumn } : {}),
        ...(gridRow ? { gridRow } : {}),
      }}
    >
      <GradientText gradient={gradient} className="font-bold shrink-0">
        <span style={{ fontSize: "4.8125rem", lineHeight: "normal", display: "inline-block" }}>
          {item.value}
        </span>
      </GradientText>
      <Text size="md" align="left" className="flex-1">
        {item.description}
      </Text>
    </div>
  );
}

export function ComparisonDualFrame({
  titlePrefix,
  titleHighlight,
  sansLabel = "Sans",
  avecLabel = "Avec",
  sansItems,
  avecItems,
  ctaLabel,
  ctaHref = "#",
  ctaVariant = "primary",
  id,
  className,
}: ComparisonDualFrameProps) {
  return (
    <section id={id} className={cn("relative w-full overflow-hidden", className)}>
      <GradientBackground variant="comparison" className="absolute inset-0 w-full" />

      <div
        className="relative z-10 flex flex-col items-center gap-[3.125rem] overflow-clip"
        style={{
          paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
          paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
          paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
          paddingBottom: "clamp(3rem, 5.2vw, 6.25rem)",
        }}
      >
        <Heading level={2} gradient="none" align="center" className="max-w-[78.125rem]">
          <GradientText gradient="dark-to-primary">{titlePrefix}</GradientText>
          <GradientText gradient="primary">{titleHighlight}</GradientText>
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[0.875rem] gap-y-[0.9375rem] w-full">
          <div
            className="flex items-center gap-[0.5rem] px-[1.875rem] py-[0.125rem] rounded-[1.5625rem] self-start w-fit"
            style={{
              backgroundColor: "var(--color-prevention-20)",
              color: "var(--color-prevention-ink)",
            }}
          >
            <span className="font-normal" style={{ fontSize: "1.6875rem" }}>
              {sansLabel}
            </span>
          </div>
          <div
            className="flex items-center gap-[0.5rem] px-[1.875rem] py-[0.125rem] rounded-[1.5625rem] self-start w-fit"
            style={{
              backgroundColor: "var(--color-primary-5)",
              color: "var(--color-primary)",
            }}
          >
            <span className="font-normal" style={{ fontSize: "1.6875rem" }}>
              {avecLabel}
            </span>
          </div>

          {sansItems.map((item, i) => (
            <DualCard key={`sans-${i}`} item={item} gradient="orange" />
          ))}

          {avecItems.map((item, i) => (
            <DualCard key={`avec-${i}`} item={item} gradient="primary" gridColumn={2} gridRow={i + 2} />
          ))}
        </div>

        {ctaLabel && (
          <Button variant={ctaVariant} size="md" href={ctaHref}>
            {ctaLabel}
          </Button>
        )}
      </div>
    </section>
  );
}
