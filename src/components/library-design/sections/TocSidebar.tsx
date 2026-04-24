"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { Text } from "@/components/library-design/ui/Text";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

export interface TocItem {
  /** Target element id — must match an `[id]` somewhere in the article body. */
  id: string;
  /** Visible label shown in the TOC (typically the section heading text). */
  label: string;
  /** Heading depth — `2` for h2 sections, `3` for h3 subsections. */
  level: 2 | 3;
}

/**
 * TocSidebar
 *
 * @purpose    Sticky left-column table of contents for long-form articles —
 *             vertical list of numbered jump links. Active item is tracked
 *             automatically via IntersectionObserver as the reader scrolls
 *             through the corresponding `[id]` sections. Clicking an item
 *             smooth-scrolls to the target and updates the URL hash.
 * @useWhen    Desktop-only sidebar next to <BlogArticleBody> / <ProseFrame>
 *             on long-form editorial pages (blog articles with ≥ 5 h2
 *             sections; Solution long-form). Hidden below `lg` breakpoint —
 *             the article body takes full width on mobile / tablet.
 * @dontUse    For top-of-page article TOC that scrolls with the content
 *             (use <TableOfContentsFrame> — centered, inline, horizontal).
 *             For top-of-page anchor tabs right after the Hero (use
 *             <TabsFrame>). For short articles with fewer than 3 sections
 *             (the sidebar feels empty).
 *
 * @limits
 *   - title: max 40 chars (optional label above the list, e.g. "Sommaire")
 *   - items: 2–30 entries
 *   - item.label: max 80 chars (wraps to 2 lines past that)
 *   - item.id: must match an [id] on the page
 *   - ariaLabel: max 60 chars
 *
 * @forbidden
 *   - Do NOT pass className with bg / text / font / padding overrides
 *   - Do NOT hardcode title / ariaLabel in French — pass via next-intl
 *   - Do NOT render more than one TocSidebar per page
 *   - Do NOT mix absolute URLs in item.id — only bare ids
 */

interface TocSidebarProps {
  /** Optional uppercase label shown above the list (e.g. "Sommaire" / "Contents"). */
  title?: string;
  /** TOC entries — one per targetable section. */
  items: TocItem[];
  /** When true, h3 sub-entries render indented under their h2s. Default false. */
  showH3?: boolean;
  /**
   * Accessible label for the nav region. English fallback — caller passes
   * localized string via next-intl.
   */
  ariaLabel?: string;
  className?: string;
}

export function TocSidebar({
  title,
  items,
  showH3 = false,
  ariaLabel = "Table of contents",
  className,
}: TocSidebarProps) {
  if (title) assertMaxLength("TocSidebar", "title", title, 40);
  assertArrayBounds("TocSidebar", "items", items, 2, 30);
  items.forEach((item, i) => {
    assertMaxLength("TocSidebar", `items[${i}].label`, item.label, 80);
  });
  assertMaxLength("TocSidebar", "ariaLabel", ariaLabel, 60);
  assertNoClassNameOverride("TocSidebar", className, [
    "bg-",
    "text-",
    "font-",
    "p-",
  ]);

  const visibleItems = showH3 ? items : items.filter((i) => i.level === 2);

  const [activeId, setActiveId] = useState<string>(
    visibleItems[0]?.id ?? "",
  );

  // Scroll spy — track which [id] section is currently nearest the top.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = visibleItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const nearest = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (nearest) setActiveId(nearest.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [visibleItems]);

  function handleClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", `#${id}`);
    setActiveId(id);
  }

  // Pre-compute h2 auto-numbers via reduce to satisfy the "no mutation during
  // render" lint rule.
  const numberedItems = visibleItems.reduce<
    Array<TocItem & { number: number | null }>
  >((acc, item) => {
    const prevNumber = acc.reduce(
      (max, p) => (p.number !== null ? Math.max(max, p.number) : max),
      0,
    );
    const number = item.level === 2 ? prevNumber + 1 : null;
    acc.push({ ...item, number });
    return acc;
  }, []);

  return (
    <aside
      aria-label={ariaLabel}
      className={cn(
        "hidden lg:block lg:w-[18rem] lg:shrink-0 lg:sticky lg:top-[6rem] lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto",
        className,
      )}
    >
      {title && (
        <Text
          size="sm"
          className="font-bold text-primary uppercase tracking-widest"
        >
          {title}
        </Text>
      )}

      <nav className={cn(title && "mt-[1rem]")}>
        <ol className="flex list-none flex-col gap-[0.75rem] p-0">
          {numberedItems.map((item) => {
            const isActive = activeId === item.id;
            const isH3 = item.level === 3;
            const numberPrefix = item.number !== null ? `${item.number}. ` : "";

            return (
              <li key={item.id} className={cn(isH3 && "ml-[1rem]")}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "block text-micro-lg leading-tight transition-colors focus-visible:outline-none",
                    isActive
                      ? "border-l-2 border-primary pl-[0.75rem] font-bold text-primary"
                      : "pl-[0.75rem] text-text-muted hover:text-primary focus-visible:text-primary",
                  )}
                >
                  {numberPrefix}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
