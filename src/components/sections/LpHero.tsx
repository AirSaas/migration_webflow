"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type TrustBadge = {
  icon: string;
  text: string;
};

type Tab = {
  label: string;
  image: string;
};

type LpHeroProps = {
  badge: string;
  heading: React.ReactNode;
  description: string;
  ctaHref?: string;
  ctaText?: string;
  videoHref?: string;
  videoText?: string;
  trustBadges: TrustBadge[];
  tabs: Tab[];
};

const DEFAULT_TABS: Tab[] = [
  { label: "Portfolio", image: "/assets/images/home_app_screen-min.png" },
  { label: "Quarter plan", image: "/assets/images/home_app_screen-min.png" },
  { label: "Capacitaire", image: "/assets/images/home_app_screen-min.png" },
  { label: "Priorisation", image: "/assets/images/home_app_screen-min.png" },
  { label: "Roadmap", image: "/assets/images/home_app_screen-min.png" },
  { label: "Reporting", image: "/assets/images/home_app_screen-min.png" },
];

export function LpHero({
  badge,
  heading,
  description,
  ctaHref = "/fr/meetings-pages",
  ctaText = "Réservez une démo",
  videoHref,
  videoText,
  trustBadges,
  tabs = DEFAULT_TABS,
}: LpHeroProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-5 to-white pb-12 pt-12">
      <Container>
        <div className="mx-auto max-w-[800px] text-center">
          <div className="mb-4 inline-block rounded-full bg-primary-10 px-4 py-1.5 text-sm font-medium text-primary">
            {badge}
          </div>

          <h1 className="text-[2.5rem] font-semibold leading-[3rem] md:text-[3rem] md:leading-[3.5rem]">
            {heading}
          </h1>

          <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-[27px] text-text-secondary">
            {description}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={ctaHref}
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              {ctaText}
            </Link>
            {videoHref && videoText && (
              <Link
                href={videoHref}
                className="font-medium text-primary transition-colors hover:text-primary-hover"
              >
                {videoText}
              </Link>
            )}
          </div>

          {trustBadges.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-sm text-text-secondary"
                >
                  <Image
                    src={badge.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="opacity-60"
                  />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tab panel */}
        <div className="mt-12">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  i === activeTab
                    ? "bg-primary text-white"
                    : "bg-white text-text-secondary hover:bg-primary-5",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative mx-auto aspect-[16/9] max-w-[900px] overflow-hidden rounded-xl border border-border shadow-lg">
            <Image
              src={tabs[activeTab].image}
              alt={tabs[activeTab].label}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
