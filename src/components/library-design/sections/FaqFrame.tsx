"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { GradientText } from "@/components/library-design/ui/GradientText";

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FaqFrame
 *
 * @purpose    Expandable FAQ section with a highlighted title and accordion items.
 * @useWhen    The page needs to surface common objections / pricing questions
 *             / setup steps before conversion.
 * @dontUse    For a short list of 2–3 hints (use inline <details> or custom block).
 *
 * @limits
 *   - title: max 40 chars (plain dark-to-primary portion)
 *   - titleHighlight: max 40 chars (gradient portion)
 *   - items: 3–12 (past 12, split into multiple FAQs or a dedicated page)
 *   - items[].question: max 120 chars
 *   - items[].answer: max 500 chars
 *
 * @forbidden
 *   - Do NOT nest FAQs (no accordion inside an answer)
 */
interface FaqFrameProps {
  /**
   * First (dark-gradient) portion of the heading. Locale-driven — caller
   * passes the translated string. When both `title` and `titleHighlight`
   * are omitted, no heading is rendered (useful for embedded FAQs).
   */
  title?: string;
  /** Second (primary-gradient) portion of the heading. Locale-driven. */
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
          "flex items-center gap-[0.5rem] md:gap-[0.625rem] w-full rounded-[1rem] md:rounded-[1.25rem] bg-white text-left transition-colors",
          isOpen ? "border border-primary" : "border border-primary-10"
        )}
        style={{ padding: "1rem 1.25rem" }}
      >
        <FaqIcon open={isOpen} />
        <span
          className="font-bold text-primary text-[1.1rem] md:text-[1.6875rem]"
        >
          {item.question}
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div style={{ padding: "0 1.25rem" }}>
            <p
              className="font-light text-foreground"
              style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
            >
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FaqFrame({
  title,
  titleHighlight,
  items,
  defaultOpenIndex = 0,
  className,
}: FaqFrameProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <section
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.125rem] lg:px-[10rem] lg:py-[6.25rem] bg-primary-2",
        className
      )}
    >
      {(title || titleHighlight) && (
        <Heading level={2} gradient="none" align="center">
          {title && <GradientText gradient="dark-to-primary">{title}</GradientText>}
          {title && titleHighlight && " "}
          {titleHighlight && <GradientText gradient="primary">{titleHighlight}</GradientText>}
        </Heading>
      )}

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
