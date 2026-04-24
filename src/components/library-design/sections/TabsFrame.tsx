"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

export interface TabAnchor {
  /** Visible pill label. Max 24 chars. */
  label: string;
  /** Anchor href — must start with "#" and match a `[id]` element on the page. */
  href: string;
}

/**
 * TabsFrame
 *
 * @purpose    Hero-adjacent horizontal pill-tab bar — 3–6 anchor links that
 *             smooth-scroll to sections lower on the page. Active tab auto-
 *             updates as the user scrolls through those sections
 *             (IntersectionObserver-based scroll spy). Falls back to manual
 *             click behavior if the target is missing.
 * @useWhen    Landing pages that surface 3–6 major sections deserving a jump
 *             nav just below the Hero (the canonical pattern on `/lp/*`).
 * @dontUse    For top-level site navigation (use <Navbar>). For a vertical
 *             long-form article TOC (use <TocSidebar>). For a small FAQ-like
 *             content toggle (use <FaqFrame>).
 *
 * @limits
 *   - tabs: 3–6 items (below 3 looks sparse; above 6 the row wraps awkwardly)
 *   - tab.label: max 24 chars
 *   - tab.href: must start with "#"
 *   - ariaLabel: max 60 chars
 *
 * @forbidden
 *   - Do NOT mix absolute URLs with anchor hrefs — use <Navbar> for external links
 *   - Do NOT hardcode ariaLabel in French — pass via next-intl
 *   - Do NOT pass className with bg / text / font / padding overrides
 *   - Do NOT render more than one TabsFrame per page
 */

interface TabsFrameProps {
  /** Visual variant — "light" (default, transparent/white) or "dark" (primary-70 bg). */
  variant?: "light" | "dark";
  /** 3–6 tab anchors. All hrefs should point to ids present on the page. */
  tabs: TabAnchor[];
  /** Make the bar stick to the top of the viewport when scrolling past it. Default false. */
  sticky?: boolean;
  /**
   * Accessible label for the tab navigation region. English fallback —
   * caller passes localized string via next-intl.
   */
  ariaLabel?: string;
  className?: string;
}

export function TabsFrame({
  variant = "light",
  tabs,
  sticky = false,
  ariaLabel = "Page sections",
  className,
}: TabsFrameProps) {
  assertArrayBounds("TabsFrame", "tabs", tabs, 3, 6);
  tabs.forEach((t, i) => {
    assertMaxLength("TabsFrame", `tabs[${i}].label`, t.label, 24);
  });
  assertMaxLength("TabsFrame", "ariaLabel", ariaLabel, 60);
  assertNoClassNameOverride("TabsFrame", className, [
    "bg-",
    "text-",
    "font-",
    "p-",
  ]);

  const isDark = variant === "dark";
  const [activeHref, setActiveHref] = useState<string>(tabs[0]?.href ?? "");

  // Scroll spy — keep the active tab in sync with whichever target section is
  // currently nearest the top of the viewport.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = tabs
      .map((t) => (t.href.startsWith("#") ? t.href.slice(1) : null))
      .filter((id): id is string => Boolean(id));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tabs]);

  function handleClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    const id = href.startsWith("#") ? href.slice(1) : "";
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", href);
    setActiveHref(href);
  }

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "w-full px-[1.5rem] py-[1rem] md:px-[3rem] md:py-[1.25rem] lg:px-[10rem] lg:py-[1.5rem]",
        isDark ? "bg-primary-70" : "bg-white",
        sticky && "sticky top-0 z-20 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[91rem] justify-center overflow-x-auto">
        <ul
          role="tablist"
          className="flex min-w-max list-none gap-[0.5rem] md:gap-[0.75rem]"
        >
          {tabs.map((tab) => {
            const isActive = activeHref === tab.href;
            return (
              <li key={tab.href} role="presentation">
                <a
                  href={tab.href}
                  role="tab"
                  aria-selected={isActive}
                  onClick={(e) => handleClick(e, tab.href)}
                  className={cn(
                    "inline-flex items-center rounded-full px-[1rem] py-[0.5rem] text-micro-lg font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:px-[1.25rem] md:py-[0.625rem]",
                    isDark
                      ? isActive
                        ? "bg-white text-primary"
                        : "border border-white text-white hover:bg-white/10"
                      : isActive
                        ? "bg-primary text-white"
                        : "border border-primary text-primary hover:bg-primary-5",
                  )}
                >
                  {tab.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
