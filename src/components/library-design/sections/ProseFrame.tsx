import { cn } from "@/lib/utils";
import { assertNoClassNameOverride } from "@/lib/ds-validators";

/**
 * ProseFrame
 *
 * @purpose    Generic wrapper for long-form prose content — applies a centered
 *             reading column with responsive padding and a vertical rhythm
 *             between children. The children compose the article content from
 *             DS primitives (<Heading>, <Text>, <Quote>, <ListInline>,
 *             <TableFrame>, <IllustrationFrame>). Used by both blog article
 *             bodies (wide column) and marketing long-form sections on
 *             Solution pages (reading column — Maslow, "PM vs PPM", etc.).
 * @useWhen    Any time the page needs to host rich-text editorial content
 *             between marketing sections. Blog articles wrap their body in
 *             <BlogArticleBody> (alias), Solution long-form pages use
 *             <ProseFrame> directly with `maxWidth="reading"`.
 * @dontUse    For marketing sections with feature-card grids (use
 *             <FeatureFrame> / <ValuePropositionFrame>). For section
 *             intros / headers only (use <SectionHeading>).
 *
 * @limits
 *   - variant: "light" (default, white bg) | "tinted" (primary-2 pale lavender)
 *   - maxWidth: "reading" (default, 50rem ~ 65ch) | "wide" (91.25rem, blog body)
 *   - children: DS primitives only — no raw heading tags (h1–h6), no raw
 *     paragraph tags with typography classes (ESLint + ds-audit enforce this)
 *
 * @forbidden
 *   - Do NOT hardcode article content inside this wrapper — copy flows via
 *     children (page / i18n / CMS)
 *   - Do NOT override bg / padding / max-w / gap via className — they are
 *     part of the reading-flow contract
 *   - Do NOT nest a <ProseFrame> inside another <ProseFrame>
 */

type ProseVariant = "light" | "tinted";
type ProseMaxWidth = "reading" | "wide";

interface ProseFrameProps {
  children: React.ReactNode;
  /** Background variant. Default "light" (white). */
  variant?: ProseVariant;
  /** Inner column width. Default "reading" (50rem, ideal for editorial). */
  maxWidth?: ProseMaxWidth;
  /** Layout-only className override. No bg / padding / max-w / gap allowed. */
  className?: string;
}

const BG_CLASS: Record<ProseVariant, string> = {
  light: "bg-white",
  tinted: "bg-primary-2",
};

const MAX_WIDTH_CLASS: Record<ProseMaxWidth, string> = {
  reading: "max-w-[50rem]",
  wide: "max-w-[91.25rem]",
};

export function ProseFrame({
  children,
  variant = "light",
  maxWidth = "reading",
  className,
}: ProseFrameProps) {
  assertNoClassNameOverride("ProseFrame", className, [
    "bg-",
    "p-",
    "px-",
    "py-",
    "max-w-",
    "gap-",
  ]);

  return (
    <section
      className={cn(
        "w-full px-[1.25rem] py-[3rem] md:px-[4rem] md:py-[5rem] lg:px-[14.375rem] lg:py-[6.25rem]",
        BG_CLASS[variant],
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex flex-col gap-[2rem] md:gap-[3.125rem]",
          MAX_WIDTH_CLASS[maxWidth],
        )}
      >
        {children}
      </div>
    </section>
  );
}
