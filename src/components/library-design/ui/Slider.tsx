"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SliderSlide {
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
    <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2L2 12L12 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 2L12 12L2 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
            backgroundColor: "var(--color-primary, #3c51e2)",
            width: "3.19rem",
            height: "3.19rem",
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
            backgroundColor: "var(--color-primary, #3c51e2)",
            width: "3.19rem",
            height: "3.19rem",
          }}
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Illustration frame */}
      <div
        className="w-full overflow-clip relative"
        style={{
          backgroundColor: "var(--color-primary-5, #f3f3fc)",
          borderTopLeftRadius: "2.1875rem",
          borderTopRightRadius: "2.1875rem",
          padding: "2.5rem 2.5rem 0",
        }}
      >
        <img
          src={slides[current].imageSrc}
          alt={slides[current].imageAlt ?? ""}
          className="w-full object-cover object-top"
          style={{
            borderTopLeftRadius: "0.625rem",
            borderTopRightRadius: "0.625rem",
          }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
