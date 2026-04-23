import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

/**
 * TableOfContentsFrame
 *
 * @purpose    Article-level table of contents — centered primary-gradient
 *             title + white rounded card listing anchor links to each article
 *             section.
 * @useWhen    Top of a long-form blog article (right after <BlogHero>), or any
 *             documentation page that benefits from a jump-to-section index.
 *             Title is locale-driven — caller passes "Sommaire" / "Contents"
 *             / "Inhalt" from next-intl.
 * @dontUse    For primary site navigation (use <Navbar>).
 *             For CTA-rich lists (use <ListEmphasized> or <CardCta>).
 *             For multi-column link directories (use <Footer>).
 *             For 1-2 items (looks sparse — just omit the block).
 *
 * @limits
 *   - title: max 30 chars (often uppercased by caller, e.g. "SOMMAIRE")
 *   - items: 3–15 anchors (below 3 looks sparse, above 15 breaks reading flow)
 *   - each item.label: max 120 chars (matches blog H2/H3 title tolerance)
 *   - each item.href: must resolve to an on-page anchor ("#slug")
 *
 * @forbidden
 *   - Do NOT pass className that changes background / border / padding — the
 *     lavender surface + white card + primary-40 border are part of the
 *     contract
 *   - Do NOT hardcode the title text — always pass via `title` prop from
 *     i18n / CMS (locale-driven)
 *   - Do NOT render more than one <TableOfContentsFrame> per page
 *
 * @figma node-id 303-1104
 */

interface TableOfContentsItem {
  /** Visible label — typically mirrors the target section heading. */
  label: string;
  /** Anchor target on the same page, e.g. "#section-slug". */
  href: string;
}

interface TableOfContentsFrameProps {
  /** Section title — e.g. "Sommaire" (FR), "Contents" (EN). Locale-driven. */
  title: string;
  /** Anchor items, one per article section. */
  items: TableOfContentsItem[];
  /** Layout-only className override. No color / bg / border / padding allowed. */
  className?: string;
}

export function TableOfContentsFrame({
  title,
  items,
  className,
}: TableOfContentsFrameProps) {
  assertMaxLength("TableOfContentsFrame", "title", title, 30);
  assertArrayBounds("TableOfContentsFrame", "items", items, 3, 15);
  items.forEach((item, i) =>
    assertMaxLength(
      `TableOfContentsFrame.items[${i}]`,
      "label",
      item.label,
      120,
    ),
  );
  assertNoClassNameOverride("TableOfContentsFrame", className, [
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
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-[0.75rem]">
                <span
                  aria-hidden="true"
                  className="shrink-0 h-[0.625rem] w-[0.625rem] rounded-full border-[1.5px] border-primary-60"
                />
                <a
                  href={item.href}
                  className="flex-1 font-light text-primary text-paragraph hover:underline focus-visible:underline focus-visible:outline-none"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
