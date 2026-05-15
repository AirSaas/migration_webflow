"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { assertArrayBounds, assertMaxLength } from "@/lib/ds-validators";

export interface HeroMediaTab {
  /** Colorful icon shown next to the label. Path under /public, e.g. "/assets/icons/portfolio.svg". */
  icon: string;
  /** Short label rendered next to the icon. Max 16 chars. */
  label: string;
  /** Dashboard screenshot revealed when this tab is active. All tabs should share the same aspect ratio. */
  imageSrc: string;
  imageAlt: string;
}

interface HeroTabbedMediaProps {
  tabs: HeroMediaTab[];
  /** Auto-cycle through tabs. Default `true`. Pauses on user interaction and when `prefers-reduced-motion`. */
  autoRotate?: boolean;
  /** Cycle interval in ms. Default `4000`. */
  rotateInterval?: number;
  /** Hide the decorative logo + avatar chrome that frames the toolbar. Default `false`. */
  hideChrome?: boolean;
  /** Localized aria-label for the tablist. */
  ariaLabel?: string;
  className?: string;
}

/**
 * HeroTabbedMedia
 *
 * @purpose    Animated dashboard switcher: a simulated product top bar (purple
 *             toolbar + AirSaas mark + tab pills + avatar/bell chrome) sits
 *             flush against a dashboard screenshot. Clicking a pill swaps the
 *             active screenshot; the row auto-rotates every `rotateInterval`
 *             ms and pauses on interaction or when `prefers-reduced-motion`
 *             is set.
 * @useWhen    Inside <Hero mediaTabs={…}> on product LPs that need to showcase
 *             several dashboard views above the fold (3–8 tabs). Same pattern
 *             across any LP — clone the canonical `LandingWithTabbedDashboards`
 *             story and swap labels / icons / screenshots.
 * @dontUse    As a standalone tab control mid-page — for content tabs use
 *             <TabsFrame>. For a single static screenshot below the Hero
 *             title, pass `imageSrc` to <Hero> instead and skip this entirely.
 *
 * @limits
 *   - tabs: 3–8 entries (enforced via assertArrayBounds)
 *   - each tab.label: max 16 chars (longer breaks the pill row on tablet)
 *   - all tab images SHOULD share the same aspect ratio — the body area
 *     resizes per tab so mixed ratios cause layout shift on rotation
 *   - autoRotate auto-pauses on click / keyboard nav and when the user's OS
 *     reports `prefers-reduced-motion: reduce`
 *
 * @forbidden
 *   - Do NOT render outside <Hero> — the chrome assumes the hero's gradient
 *     background and lateral padding
 *   - Do NOT pass <img> children directly — use the `tabs[].imageSrc` API so
 *     ARIA tabpanel wiring stays correct
 */
export function HeroTabbedMedia({
  tabs,
  autoRotate = true,
  rotateInterval = 4000,
  hideChrome = false,
  ariaLabel = "Product views",
  className,
}: HeroTabbedMediaProps) {
  assertArrayBounds("HeroTabbedMedia", "tabs", tabs, 3, 8);
  tabs.forEach((t, i) => {
    assertMaxLength("HeroTabbedMedia", `tabs[${i}].label`, t.label, 16);
  });

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!autoRotate || paused || reducedMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % tabs.length);
    }, rotateInterval);
    return () => window.clearInterval(id);
  }, [autoRotate, paused, reducedMotion, rotateInterval, tabs.length]);

  function go(i: number) {
    const next = ((i % tabs.length) + tabs.length) % tabs.length;
    setActive(next);
    setPaused(true);
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    switch (e.key) {
      case "ArrowRight": {
        e.preventDefault();
        const n = (i + 1) % tabs.length;
        tabRefs.current[n]?.focus();
        go(n);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        const n = (i - 1 + tabs.length) % tabs.length;
        tabRefs.current[n]?.focus();
        go(n);
        break;
      }
      case "Home": {
        e.preventDefault();
        tabRefs.current[0]?.focus();
        go(0);
        break;
      }
      case "End": {
        e.preventDefault();
        const n = tabs.length - 1;
        tabRefs.current[n]?.focus();
        go(n);
        break;
      }
    }
  }

  return (
    <div
      className={cn(
        "w-full max-w-[94.8125rem] mx-auto rounded-[1.25rem] md:rounded-[1.75rem] overflow-hidden shadow-elevation-lg",
        className,
      )}
    >
      {/* Simulated product top bar */}
      <div className="bg-primary flex items-center gap-[0.5rem] md:gap-[1rem] px-[0.75rem] py-[0.625rem] md:px-[1.25rem] md:py-[0.875rem]">
        {!hideChrome && <AirSaasMark />}

        <div
          role="tablist"
          aria-label={ariaLabel}
          className="flex items-center gap-[0.25rem] md:gap-[0.5rem] overflow-x-auto flex-1 min-w-0 scrollbar-none"
        >
          {tabs.map((tab, i) => {
            const isActive = i === active;
            const tabId = `hero-media-tab-${i}`;
            const panelId = `hero-media-panel-${i}`;
            return (
              <button
                key={tabId}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={tabId}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => go(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "shrink-0 inline-flex items-center gap-[0.375rem] md:gap-[0.5rem] rounded-full px-[0.75rem] md:px-[1rem] py-[0.375rem] md:py-[0.5rem]",
                  "transition-colors duration-200 motion-reduce:transition-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
                  isActive
                    ? "bg-white text-foreground"
                    : "text-white hover:bg-white/10",
                )}
              >
                <span className="relative h-[1.25rem] w-[1.25rem] md:h-[1.75rem] md:w-[1.75rem] shrink-0">
                  <Image
                    src={tab.icon}
                    alt=""
                    fill
                    sizes="1.75rem"
                    className="object-contain"
                  />
                </span>
                <span className="font-bold whitespace-nowrap text-micro-md md:text-micro-lg">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {!hideChrome && <ToolbarChrome />}
      </div>

      {/* Dashboard body — each tabpanel shows its own screenshot */}
      <div className="relative bg-white">
        {tabs.map((tab, i) => {
          const isActive = i === active;
          const tabId = `hero-media-tab-${i}`;
          const panelId = `hero-media-panel-${i}`;
          return (
            <div
              key={panelId}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!isActive}
              className={cn("w-full", isActive ? "block" : "hidden")}
            >
              {/* Using <img> instead of next/image to keep the natural width
                  flowing inside the bordered card (matches IllustrationFrame
                  rendering pattern used elsewhere in the DS). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tab.imageSrc}
                alt={tab.imageAlt}
                className="block w-full h-auto"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AirSaasMark() {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 inline-flex items-center justify-center h-[2rem] w-[2rem] md:h-[2.25rem] md:w-[2.25rem] rounded-[0.5rem] bg-white/10"
    >
      <svg
        width="18"
        height="19"
        viewBox="0 0 45 47"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.1467 0L45 44.4294L22.4639 37.7365L29.1182 33.8645L33.9981 35.3165L23.1446 13.2607L13.5626 32.7303L25.7325 25.7469L28.2315 30.8216L0 47L23.1467 0Z"
          fill="white"
        />
      </svg>
    </span>
  );
}

function ToolbarChrome() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 hidden md:flex items-center gap-[0.5rem]"
    >
      <span className="h-[2rem] w-[2rem] rounded-full bg-white/15 inline-flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4 0-8 2-8 6v1h16v-1c0-4-4-6-8-6Z" fill="white" />
        </svg>
      </span>
      <span className="h-[2rem] w-[2rem] rounded-full bg-white/15 inline-flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm6-6V11a6 6 0 0 0-5-5.917V4a1 1 0 1 0-2 0v1.083A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2Z" fill="white" />
        </svg>
      </span>
      <span className="h-[2rem] w-[2rem] rounded-full bg-gradient-orange" />
    </div>
  );
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
