"use client";

import { useState } from "react";
import { cn } from "@/ds/utils";
import { Heading } from "@/ds/primitives/Heading";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqFrameProps {
  title?: string;
  titleHighlight?: string;
  items: FaqItem[];
  defaultOpenIndex?: number;
  className?: string;
}

function FaqIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="shrink-0"
      style={{
        fontFamily: '"Font Awesome 6 Duotone"',
        fontWeight: 900,
        fontSize: "2.29rem",
        color: "var(--color-primary)",
        textShadow: "0.045rem 0.045rem 0px var(--color-primary-40)",
        lineHeight: 1,
        width: "2.3125rem",
        display: "inline-block",
        textAlign: "center",
      }}
    >
      {open ? "\uF057" : "\uF055"}
    </span>
  );
}

function FaqItemComponent({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-[0.9375rem] w-full">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex items-center gap-[0.625rem] w-full rounded-[1.25rem] bg-white text-left transition-colors",
          isOpen ? "border border-primary" : "border border-primary-10"
        )}
        style={{ padding: "1.25rem 2.1875rem" }}
      >
        <FaqIcon open={isOpen} />
        <span
          className="font-bold text-primary"
          style={{ fontSize: "1.6875rem" }}
        >
          {item.question}
        </span>
      </button>

      {isOpen && (
        <div style={{ padding: "0 2.5rem" }}>
          <p
            className="font-light text-foreground"
            style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
          >
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export function FaqFrame({
  title = "Questions",
  titleHighlight = "fréquentes",
  items,
  defaultOpenIndex = 0,
  className,
}: FaqFrameProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <section
      className={cn(
        "flex flex-col items-center gap-[3.125rem] bg-primary-2",
        className
      )}
      style={{ padding: "6.25rem 10rem" }}
    >
      <Heading level={2} gradient="none" align="center">
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "var(--gradient-dark-to-primary)",
            WebkitBackgroundClip: "text",
          }}
        >
          {title}
        </span>{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "var(--gradient-primary)",
            WebkitBackgroundClip: "text",
          }}
        >
          {titleHighlight}
        </span>
      </Heading>

      <div className="flex flex-col gap-[0.9375rem] w-full">
        {items.map((item, i) => (
          <FaqItemComponent
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
