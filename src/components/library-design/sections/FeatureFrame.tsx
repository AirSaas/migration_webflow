import { cn } from "@/lib/utils";
import { Tag } from "@/components/library-design/ui/Tag";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { Button } from "@/components/library-design/ui/Button";
import { ListInline } from "@/components/library-design/ui/ListInline";
import { GradientText } from "@/components/library-design/ui/GradientText";

/**
 * FeatureFrame
 *
 * @purpose    Single feature section: title + subtitle + checklist / rich content
 *             + optional image (side-by-side or stacked) + optional CTA.
 * @useWhen    Showcasing one feature or concept per section. The workhorse of the
 *             marketing page — most body sections below Hero use this.
 * @dontUse    For a metrics grid (use <ValuePropositionFrame>), for testimonials
 *             (use <TestimonialsFrame>), or for FAQs (use <FaqFrame>).
 *
 * @limits
 *   - title: max 120 chars (ReactNode allows spans; plain string best < 80)
 *   - titleHighlight: max 40 chars
 *   - subtitle: max 300 chars (ignored when richContent is provided)
 *   - checklist: 2–6 items
 *   - ctaLabel: max 24 chars
 *   - richContent: prefer 1–4 paragraphs; the prose wrapper handles lists/links
 *
 * @forbidden
 *   - Do NOT mix `subtitle`, `richContent`, and `checklist` — pick one
 *     content strategy per instance
 *   - Do NOT use `imageSize="narrow"` with `layout="stacked"` (no effect)
 */
interface FeatureFrameProps {
  /** Layout — "inline" (default, text + image side by side) or "stacked" (text centered on top, image below) */
  layout?: "inline" | "stacked";
  /** Image on left or right (inline layout only) */
  imagePosition?: "left" | "right";
  /**
   * Size of the illustration column (inline layout only).
   * - "default" (60% width) — the main product shot layout.
   * - "compact" (~40% width) — smaller illustration, leaves more room for rich text content.
   * - "narrow" (~33% width) — the thinnest variant, used when the illustration
   *   is secondary to the text (e.g. long-form tips, sub-features).
   */
  imageSize?: "default" | "compact" | "narrow";
  tag?: string;
  /** Gradient-colored part of the title */
  titleHighlight?: string;
  /** Regular-colored part of the title — string or inline JSX */
  title: React.ReactNode;
  /** Swap the order so the highlight renders AFTER the title
   *  (e.g. "Vos chefs de projets et PO vont adorer" where "vont adorer"
   *  is the emphasized tail). Default: false (highlight first). */
  titleHighlightAtEnd?: boolean;
  /** Simple subtitle paragraph. Ignored when `richContent` is provided. */
  subtitle?: React.ReactNode;
  /**
   * Rich text / React content — replaces the subtitle + checklist block entirely.
   * Rendered inside a prose-styled wrapper that handles <p>, <ul>, <ol>, <strong>,
   * <em> and <a>. Use this when the frame needs more editorial content
   * (multiple paragraphs, links, lists, etc.).
   */
  richContent?: React.ReactNode;
  checklist?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Screenshot/illustration source */
  imageSrc?: string;
  imageAlt?: string;
  /** Background color of the illustration frame */
  imageBgColor?: string;
  /** Optional DOM id on the root `<section>` — scroll-spy target for TabsFrame / TocSidebar. */
  id?: string;
  className?: string;
}

export function FeatureFrame({
  layout = "inline",
  imagePosition = "right",
  imageSize = "default",
  tag,
  titleHighlight,
  title,
  titleHighlightAtEnd = false,
  subtitle,
  richContent,
  checklist,
  ctaLabel,
  ctaHref = "#",
  imageSrc,
  imageAlt,
  imageBgColor,
  id,
  className,
}: FeatureFrameProps) {
  const isStacked = layout === "stacked";
  const isRight = imagePosition === "right";
  const isCompact = imageSize === "compact";
  const isNarrow = imageSize === "narrow";
  const isSmall = isCompact || isNarrow;
  const defaultBg = isStacked
    ? "var(--color-primary-5)"
    : isRight
      ? "var(--color-primary-5)"
      : "var(--color-prevention-10)";

  const textContent = (
    <div
      className={cn(
        "flex flex-col gap-[1rem] md:gap-[1.25rem] min-w-0",
        isStacked
          ? "items-center text-center max-w-[50rem] w-full"
          : "flex-1 items-start",
      )}
    >
      {tag && <Tag variant="muted">{tag}</Tag>}

      <Heading level={3} gradient="none" align={isStacked ? "center" : "left"}>
        {titleHighlight && !titleHighlightAtEnd && (
          <GradientText gradient="primary">{titleHighlight}</GradientText>
        )}
        {titleHighlight && !titleHighlightAtEnd && " "}
        {title}
        {titleHighlight && titleHighlightAtEnd && " "}
        {titleHighlight && titleHighlightAtEnd && (
          <GradientText gradient="primary">{titleHighlight}</GradientText>
        )}
      </Heading>

      {richContent ? (
        <div
          className={cn(
            "w-full text-foreground font-light",
            "[&_p]:leading-[1.4] [&_p+p]:mt-[1rem]",
            "[&_strong]:font-bold",
            "[&_em]:italic",
            "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:opacity-80",
            "[&_ul]:list-disc [&_ul]:pl-[1.25rem] [&_ul]:space-y-[0.375rem] [&_ul]:mt-[0.5rem]",
            "[&_ol]:list-decimal [&_ol]:pl-[1.25rem] [&_ol]:space-y-[0.375rem] [&_ol]:mt-[0.5rem]",
            "[&_h4]:font-bold [&_h4]:text-[1.25rem] [&_h4]:leading-[1.3] [&_h4]:mt-[1rem]",
            "[&_h5]:font-bold [&_h5]:text-[1.0625rem] [&_h5]:leading-[1.3] [&_h5]:mt-[0.75rem]",
          )}
          style={{ fontSize: "var(--text-paragraph)" }}
        >
          {richContent}
        </div>
      ) : (
        <>
          {subtitle && (
            <Text size="md" align={isStacked ? "center" : "left"}>
              {subtitle}
            </Text>
          )}

          {checklist && checklist.length > 0 && (
            <div
              className={cn(
                "w-full",
                isStacked
                  ? "flex flex-wrap justify-center gap-x-[1.5rem] gap-y-[0.625rem]"
                  : "flex flex-col gap-[0.625rem]",
              )}
            >
              {checklist.map((item, i) => (
                <ListInline key={i}>{item}</ListInline>
              ))}
            </div>
          )}
        </>
      )}

      {ctaLabel && (
        <Button variant="primary" size="sm" href={ctaHref}>
          {ctaLabel}
        </Button>
      )}
    </div>
  );

  const illustrationContent = imageSrc && (
    <div
      className={cn(
        "shrink-0 rounded-[1.5rem] md:rounded-[2.1875rem] overflow-hidden",
        isStacked
          ? "w-full max-w-[75rem] p-[1.5rem] md:p-[2.5rem]"
          : cn(
              "w-full",
              isNarrow
                ? "lg:w-[26rem] lg:max-w-[33.333%] p-[1.5rem] md:p-[2rem] lg:p-[2.5rem]"
                : isCompact
                  ? "lg:w-[36rem] lg:max-w-[40%] p-[1.5rem] md:p-[2rem] lg:p-[2.5rem]"
                  : cn(
                      "lg:w-[67.5rem] lg:max-w-[60%]",
                      isRight
                        ? "p-[1.5rem] lg:pl-[2.5rem] lg:py-[2.5rem] lg:pr-0"
                        : "p-[1.5rem] lg:pr-[2.5rem] lg:py-[2.5rem] lg:pl-0",
                    ),
            ),
      )}
      style={{
        backgroundColor: imageBgColor ?? defaultBg,
      }}
    >
      <img
        src={imageSrc}
        alt={imageAlt ?? ""}
        className="w-full h-auto rounded-[0.625rem] object-cover"
        loading="lazy"
      />
    </div>
  );

  if (isStacked) {
    return (
      <section
        id={id}
        className={cn(
          "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] bg-white",
          "md:px-[3rem] md:py-[4rem] md:gap-[2.5rem]",
          "lg:px-[5rem] lg:py-[6.25rem] lg:gap-[3.125rem]",
          className,
        )}
      >
        {textContent}
        {illustrationContent}
      </section>
    );
  }

  return (
    <section
      id={id}
      className={cn(
        "flex flex-col gap-[2rem] px-[1.5rem] py-[3rem] bg-white",
        "md:px-[3rem] md:py-[4rem] md:gap-[2.5rem]",
        "lg:flex-row lg:gap-[3.125rem] lg:py-[6.25rem]",
        isSmall ? "lg:items-start" : "lg:items-center",
        isSmall
          ? "lg:px-[6.25rem] xl:px-[10rem]"
          : isRight
            ? "lg:pl-[10rem] lg:pr-0"
            : "lg:pr-[10rem] lg:pl-0 lg:justify-end",
        className
      )}
    >
      {isRight ? (
        <>
          {textContent}
          {illustrationContent}
        </>
      ) : (
        <>
          {illustrationContent}
          {textContent}
        </>
      )}
    </section>
  );
}
