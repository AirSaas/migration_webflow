import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import {
  Button,
  type ButtonVariant,
} from "@/components/library-design/ui/Button";
import { assertMaxLength, assertNoClassNameOverride } from "@/lib/ds-validators";

/**
 * InlineCta
 *
 * @purpose    Inline call-to-action inside a rich-text article body — a tinted
 *             rounded block with a short message and a primary button. Breaks
 *             the reading flow just enough to surface a lead-magnet / guide
 *             download / newsletter signup without becoming a full-page
 *             section.
 * @useWhen    Inside <BlogArticleBody> / <ProseFrame> between paragraphs, when
 *             the article wants to surface a one-off conversion moment.
 * @dontUse    For a full-width closing CTA section (use <CtaHighlightFrame>).
 *             For a side-by-side 2-card ask (use <CtaFrame> + 2× <CardCta>).
 *             For a single primitive button in a paragraph — just render
 *             <Button> inline.
 *
 * @limits
 *   - text: max 180 chars (keeps the block a one-liner on desktop)
 *   - ctaLabel: max 24 chars (matches Button label limit)
 *
 * @forbidden
 *   - Do NOT hardcode ctaLabel in French — pass via next-intl
 *   - Do NOT pass className with bg / text / font / padding overrides
 *   - Do NOT render more than 2 <InlineCta> per article (diminishing returns)
 */

interface InlineCtaProps {
  /** Short message — one or two lines. */
  text: string;
  /** Button label. */
  ctaLabel: string;
  /** Destination URL. */
  ctaHref?: string;
  /** Button variant. Default "primary". */
  ctaVariant?: ButtonVariant;
  /** Optional leading icon node (SVG). Inherits currentColor = primary. */
  leadIcon?: ReactNode;
  className?: string;
}

export function InlineCta({
  text,
  ctaLabel,
  ctaHref = "#",
  ctaVariant = "primary",
  leadIcon,
  className,
}: InlineCtaProps) {
  assertMaxLength("InlineCta", "text", text, 180);
  assertMaxLength("InlineCta", "ctaLabel", ctaLabel, 24);
  assertNoClassNameOverride("InlineCta", className, [
    "bg-",
    "text-",
    "font-",
    "p-",
  ]);

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-[1rem] rounded-[1.25rem] border border-primary-10 bg-primary-2 p-[1.25rem] md:flex-row md:items-center md:gap-[1.5rem] md:p-[1.75rem]",
        className,
      )}
    >
      {leadIcon && (
        <div className="shrink-0 text-primary" aria-hidden="true">
          {leadIcon}
        </div>
      )}

      <div className="flex-1">
        <Text size="md" align="left">
          {text}
        </Text>
      </div>

      <div className="shrink-0">
        <Button variant={ctaVariant} size="md" href={ctaHref}>
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
