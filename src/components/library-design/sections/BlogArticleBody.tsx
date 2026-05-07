import { ProseFrame } from "./ProseFrame";

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
 * @purpose    Blog-specific alias over <ProseFrame maxWidth="wide"> that
 *             preserves the blog pipeline's public API (callsites keep
 *             `<BlogArticleBody>`; the layout + rhythm contract lives in
 *             the shared <ProseFrame>). Solution long-form sections use
 *             <ProseFrame> directly with `maxWidth="reading"`.
 * @useWhen    Between <TableOfContentsFrame> and <CtaHighlightFrame> on a
 *             blog article page. Compose children from the DS primitives
 *             listed in the prop doc (Heading, Text, Quote, ListInline,
 *             TableFrame, IllustrationFrame with tone="warm", plus inline
 *             markup). In Step 5 CMS, a `blocks` prop backed by
 *             `@strapi/blocks-react-renderer` will be added alongside
 *             `children`.
 * @dontUse    As a marketing section (use <FeatureFrame> / <CtaHighlightFrame>).
 *             For non-blog long-form prose (use <ProseFrame> directly
 *             with `maxWidth="reading"`).
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
  return (
    <ProseFrame maxWidth="reading" className={className}>
      {children}
    </ProseFrame>
  );
}
