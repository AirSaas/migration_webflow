import { cn } from "@/lib/utils";
import { assertNoClassNameOverride } from "@/lib/ds-validators";

interface BlogArticleBodyProps {
  /**
   * Rich-text article content composed of DS primitives:
   *   <Heading level={2|3|4}>, <Text size="md">, <Quote>, <ListInline bullet="circle-primary">,
   *   <TableFrame>, <IllustrationFrame tone="warm">, inline <a>, <strong>.
   * The wrapper applies a `gap-[3.125rem]` vertical rhythm — do not add
   * additional outer margins on children.
   */
  children: React.ReactNode;
  /** Layout-only className override. No bg / padding / max-w / gap allowed. */
  className?: string;
}

/**
 * BlogArticleBody
 *
 * @purpose    Outer wrapper for the rich-text body of a blog article —
 *             white background, responsive side padding, 91.25rem inner
 *             max-width, and a 3.125rem vertical rhythm between children.
 * @useWhen    Between <TableOfContentsFrame> and <CtaHighlightFrame> on a
 *             blog article page. Compose children from the DS primitives
 *             listed in the prop doc (Heading, Text, Quote, ListInline,
 *             TableFrame, IllustrationFrame with tone="warm", plus inline
 *             markup). In Step 5 CMS, a `blocks` prop backed by
 *             `@strapi/blocks-react-renderer` will be added alongside
 *             `children`.
 * @dontUse    As a marketing section (use <FeatureFrame> / <CtaHighlightFrame>).
 *             For non-article pages (it assumes long-form vertical rhythm
 *             and centered narrow-max-width reading flow).
 *
 * @limits
 *   - children: article content — DS primitives only. No raw heading tags
 *     (h1–h6) or paragraph tags — the ESLint + ds-audit rules enforce
 *     this; use <Heading> and <Text> instead.
 *
 * @forbidden
 *   - Do NOT hardcode article content inside the component — copy flows
 *     in via children (rendered by the page, sourced from i18n / CMS)
 *   - Do NOT override bg / padding / max-w / gap via className — they are
 *     part of the reading-flow contract
 *   - Do NOT render more than one <BlogArticleBody> per page
 *
 * @figma node-id 303-1146
 */
export function BlogArticleBody({
  children,
  className,
}: BlogArticleBodyProps) {
  assertNoClassNameOverride("BlogArticleBody", className, [
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
        "w-full bg-white px-[1.25rem] py-[3rem] md:px-[4rem] md:py-[5rem] lg:px-[14.375rem] lg:py-[6.25rem]",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[91.25rem] flex-col gap-[2rem] md:gap-[3.125rem]">
        {children}
      </div>
    </section>
  );
}
