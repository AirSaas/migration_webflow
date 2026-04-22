"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface SliderSlide {
  /** Image source */
  imageSrc: string;
  imageAlt?: string;
}

interface SliderProps {
  slides: SliderSlide[];
  className?: string;
}

function ChevronLeftIcon() {
  return (
    <svg width="12" height="20" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2L2 12L12 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="12" height="20" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 2L12 12L2 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Slider
 *
 * @purpose    Minimal image carousel with prev/next chevron buttons and a lavender top-framed illustration well.
 * @useWhen    Section-level image showcases that cycle through 2+ product screenshots (feature walkthroughs, before/after, dashboard variants).
 * @dontUse    For a single static image — use <IllustrationFrame>. For rich multi-content slides with captions/CTAs, build a dedicated section.
 *
 * @limits
 *   - slides: array of { imageSrc, imageAlt? } — returns null when empty
 *   - no autoplay, no dots; navigation is prev/next only
 */
export function Slider({ slides, className }: SliderProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  if (slides.length === 0) return null;

  return (
    <div
      className={cn("flex flex-col items-end w-full", className)}
      style={{ gap: "0.625rem" }}
    >
      {/* Slider controls */}
      <div className="flex items-center" style={{ gap: "0.3125rem" }}>
        <button
          type="button"
          aria-label="Slide précédente"
          onClick={prev}
          className="flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "var(--color-primary)",
            width: "2.71rem",
            height: "2.71rem",
          }}
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          aria-label="Slide suivante"
          onClick={next}
          className="flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "var(--color-primary)",
            width: "2.71rem",
            height: "2.71rem",
          }}
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Illustration frame */}
      <div
        className="w-full relative"
        style={{
          backgroundColor: "var(--color-primary-5)",
          borderTopLeftRadius: "2.1875rem",
          borderTopRightRadius: "2.1875rem",
          padding: "2.5rem 2.5rem 0",
        }}
      >
        <div className="overflow-hidden" style={{ borderTopLeftRadius: "0.625rem", borderTopRightRadius: "0.625rem" }}>
          <div
            className="flex"
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {slides.map((slide, i) => (
              <img
                key={i}
                src={slide.imageSrc}
                alt={slide.imageAlt ?? ""}
                className="w-full shrink-0 object-cover object-top"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
