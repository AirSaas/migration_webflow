"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  heading: React.ReactNode;
  items: FaqItem[];
};

function FaqItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <h3 className="pr-4 text-[1rem] font-semibold">{item.question}</h3>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-10 text-primary transition-transform">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="pb-5 text-[15px] leading-relaxed text-text-secondary">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export function FaqAccordion({ heading, items }: FaqAccordionProps) {
  return (
    <section className="py-20">
      <Container className="max-w-[800px]">
        <h2 className="mb-8 text-[2rem] font-semibold leading-[2.5rem]">
          {heading}
        </h2>
        <div>
          {items.map((item) => (
            <FaqItem key={item.question} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
