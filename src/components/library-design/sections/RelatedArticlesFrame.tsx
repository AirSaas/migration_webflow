import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

/**
 * RelatedArticlesFrame
 *
 * @purpose    "Further reading" block at the end of a blog article —
 *             centered primary-gradient title + white rounded card listing
 *             outbound links to related resources (other articles,
 *             whitepapers, videos, external sources). Each item is prefixed
 *             by a small "external-link" square icon.
 * @useWhen    Bottom of a blog article (before the CTA block), to surface
 *             3–10 pieces of further reading. Coexists with
 *             <TableOfContentsFrame> on the same page (TOC at the top,
 *             further-reading at the bottom).
 * @dontUse    For in-page anchor navigation (use <TableOfContentsFrame>).
 *             For marketing CTAs with cards + imagery (use <CardCta>).
 *             For footer-style multi-column directories (use <Footer>).
 *             For fewer than 3 links (looks sparse — just inline them in
 *             the article body).
 *
 * @limits
 *   - title: max 30 chars (e.g. "Pour aller plus loin", "Further reading")
 *   - items: 3–10 (below 3 looks sparse; above 10 becomes a directory)
 *   - each item.label: max 120 chars (matches blog article title tolerance)
 *   - each item.href: resolvable URL (internal route or external)
 *   - each item.target: "_self" (default) | "_blank" (external — adds rel
 *     noopener noreferrer automatically)
 *
 * @forbidden
 *   - Do NOT pass className that changes background / border / padding —
 *     the lavender section + white card + primary-40 border are part of
 *     the contract
 *   - Do NOT hardcode the title text — pass via `title` prop from i18n /
 *     CMS (locale-driven)
 *   - Do NOT render more than one <RelatedArticlesFrame> per page
 *
 * @figma node-id 309-1986
 */

interface RelatedArticleItem {
  /** Visible label — typically the target article / resource title. */
  label: string;
  /** Destination URL (internal route or external). */
  href: string;
  /**
   * Link target. "_self" (default) stays in the same tab.
   * "_blank" opens in a new tab and gets `rel="noopener noreferrer"`
   * applied automatically.
   */
  target?: "_self" | "_blank";
}

interface RelatedArticlesFrameProps {
  /**
   * Section title — e.g. "Pour aller plus loin" (FR), "Further reading"
   * (EN). Locale-driven.
   */
  title: string;
  /** Outbound links to related articles / resources. */
  items: RelatedArticleItem[];
  /**
   * Layout-only className override. No color / bg / border / padding
   * overrides allowed.
   */
  className?: string;
}

function ExternalLinkSquareIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-primary-60"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M10 14L17 7" />
      <path d="M10 7h7v7" />
    </svg>
  );
}

export function RelatedArticlesFrame({
  title,
  items,
  className,
}: RelatedArticlesFrameProps) {
  assertMaxLength("RelatedArticlesFrame", "title", title, 30);
  assertArrayBounds("RelatedArticlesFrame", "items", items, 3, 10);
  items.forEach((item, i) =>
    assertMaxLength(
      `RelatedArticlesFrame.items[${i}]`,
      "label",
      item.label,
      120,
    ),
  );
  assertNoClassNameOverride("RelatedArticlesFrame", className, [
    "bg-",
    "border-",
    "p-",
    "px-",
    "py-",
  ]);

  return (
    <section
      className={cn(
        "w-full bg-primary-2 px-[1.25rem] py-[3rem] md:px-[4rem] md:py-[5rem] lg:px-[14.375rem] lg:py-[6.25rem]",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[91.25rem] flex-col items-center gap-[2rem] md:gap-[3.125rem]">
        <Heading level={2} gradient="primary" align="center">
          {title}
        </Heading>

        <nav
          aria-label={title}
          className="w-full rounded-[1.5625rem] border border-primary-40 bg-white p-[1.25rem] md:p-[2.1875rem]"
        >
          <ul className="flex flex-col gap-[0.3125rem]">
            {items.map((item, i) => {
              const isExternal = item.target === "_blank";
              return (
                <li key={i} className="flex items-center gap-[0.75rem]">
                  <ExternalLinkSquareIcon />
                  <a
                    href={item.href}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex-1 font-light text-primary text-paragraph hover:underline focus-visible:underline focus-visible:outline-none"
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
