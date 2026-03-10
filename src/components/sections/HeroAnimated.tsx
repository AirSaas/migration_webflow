"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const TABS = [
  { label: "Portfolio", image: "/assets/images/Portfolio project list view.webp" },
  { label: "Quarter plan", image: "/assets/images/Quarter plan.webp" },
  { label: "Capacitaire", image: "/assets/images/Capacity screen.webp" },
  { label: "Priorisation", image: "/assets/images/Portfolio project priority.webp" },
  { label: "Roadmap", image: "/assets/images/Roadmap page fr.webp" },
  { label: "Reporting", image: "/assets/images/Flash report ppt.webp" },
];

const ROTATING_WORDS = [
  "portfolio",
  "quarter plan",
  "capacitaire",
  "priorisation",
  "roadmap",
  "reporting",
];

export function HeroAnimated() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % TABS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pb-16 pt-32">
      <Container>
        <div className="mx-auto max-w-[700px] text-center">
          <h1 className="text-[3rem] font-bold leading-[3.5rem] md:text-[3.5rem] md:leading-[4rem]">
            La solution de
          </h1>
          <h2 className="text-[3rem] font-bold leading-[3.5rem] md:text-[3.5rem] md:leading-[4rem] text-primary">
            {ROTATING_WORDS[activeIndex]}
          </h2>
          <h2 className="text-[3rem] font-bold leading-[3.5rem] md:text-[3.5rem] md:leading-[4rem]">
            pour aligner le top management
          </h2>
          <p className="mt-6 text-[17px] leading-[23px] text-text-secondary">
            Stop au gaspillage, à trop de projets en parallèle, trop de projets
            en retard, des équipes sous l&apos;eau, un top management en
            tension. Votre croissance est liée à la réussite de vos projets.
          </p>
          <div className="mt-8">
            <Button href="/fr/meetings-pages">Réservez une démo</Button>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-center gap-1 rounded-full bg-bg-alt p-1">
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  activeIndex === i
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative mt-8 overflow-hidden rounded-[10px] border border-border shadow-xl">
            <div className="relative aspect-[16/10] w-full bg-bg-alt">
              <Image
                src={TABS[activeIndex].image}
                alt={`AirSaaS ${TABS[activeIndex].label}`}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
