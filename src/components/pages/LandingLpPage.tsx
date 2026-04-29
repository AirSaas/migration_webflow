"use client";

import { Hero } from "@/components/library-design/sections/Hero";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { StepsFrame } from "@/components/library-design/sections/StepsFrame";
import { FaqFrame } from "@/components/library-design/sections/FaqFrame";
import { CtaHighlightFrame } from "@/components/library-design/sections/CtaHighlightFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { FeatureCard } from "@/components/library-design/ui/FeatureCard";
import { ListInline } from "@/components/library-design/ui/ListInline";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import {
  BullseyeArrowIcon,
  StopwatchIcon,
  CalendarStarIcon,
  IndustryIcon,
  GearsIcon,
} from "@/components/library-design/ui/icons/illustration-icons";
import type { LpPageData } from "@/data/lp";
import { BLOG_INDEX_DATA } from "@/data/blog";

const STAT_ICONS = [
  StopwatchIcon,
  BullseyeArrowIcon,
  CalendarStarIcon,
  IndustryIcon,
];

function StatIcon({ index }: { index: number }) {
  const IconComponent = STAT_ICONS[index % STAT_ICONS.length];
  return (
    <IconIllustration variant="dark" size="md">
      <IconComponent />
    </IconIllustration>
  );
}

export default function LandingLpPage({ page }: { page: LpPageData }) {
  const heroImage = "https://placehold.co/1200x700/e8eafc/3a51e2?text=AirSaas+LP";

  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* 1. Hero */}
      <Hero
        layout="split"
        eyebrow={page.hero.badge}
        title=""
        titleHighlight={
          typeof page.hero.heading === "string" ? page.hero.heading : "AirSaas"
        }
        subtitle={page.hero.description}
        primaryCta={{ label: "Réserver une démo", href: "/fr/meetings-pages" }}
        secondaryCta={
          page.hero.videoHref
            ? { label: page.hero.videoText || "Voir la vidéo", href: page.hero.videoHref }
            : undefined
        }
        imageSrc={heroImage}
        imageAlt="Interface AirSaas"
        floatingCards={false}
      />

      {/* 2. Stats */}
      {page.stats.items.length > 0 && (
        <ValuePropositionFrame
          tag="LES RÉSULTATS"
          titleHighlight={page.stats.heading || "Les gains"}
          title=" constatés avec AirSaas"
          columns={Math.min(4, page.stats.items.length) as 2 | 3 | 4}
        >
          {page.stats.items.map((stat, i) => (
            <FeatureCard
              key={i}
              icon={<StatIcon index={i} />}
              title={stat.value}
              description={stat.label}
            />
          ))}
        </ValuePropositionFrame>
      )}

      {/* 3. Pain points */}
      {page.painPoints.items.length > 0 && (
        <section className="flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:px-[3rem] md:py-[5rem] lg:px-[10rem] lg:py-[6.25rem] bg-white">
          <Heading level={2} align="center">
            {page.painPoints.heading}
          </Heading>
          <div className="flex flex-col gap-[1rem] max-w-[50rem] w-full">
            {page.painPoints.items.map((item, i) => (
              <ListInline key={i} bullet="circle-primary">
                {item}
              </ListInline>
            ))}
          </div>
        </section>
      )}

      {/* 4. Features */}
      {page.features.map((feature, i) => (
        <FeatureFrame
          key={i}
          layout="inline"
          imagePosition={i % 2 === 0 ? "right" : "left"}
          tag={feature.badge}
          titleHighlight={
            typeof feature.heading === "string" ? feature.heading : undefined
          }
          title={typeof feature.heading === "string" ? "" : undefined}
          richContent={
            <div className="flex flex-col gap-[0.75rem]">
              <Text size="md">{feature.description}</Text>
              {feature.bullets.length > 0 && (
                <div className="flex flex-col gap-[0.5rem] mt-[0.5rem]">
                  {feature.bullets.map((b, bi) => (
                    <ListInline key={bi} bullet="circle-primary">
                      {b}
                    </ListInline>
                  ))}
                </div>
              )}
            </div>
          }
          imageSrc={feature.image || "https://placehold.co/900x600/e8eafc/3a51e2?text=Feature"}
          imageAlt={feature.imageAlt}
        />
      ))}

      {/* 5. Why adopt */}
      {page.whyAdopt.items.length > 0 && (
        <ValuePropositionFrame
          titleHighlight={page.whyAdopt.heading}
          title=""
          subtitle={page.whyAdopt.description}
          columns={Math.min(3, page.whyAdopt.items.length) as 2 | 3}
        >
          {page.whyAdopt.items.map((item, i) => (
            <FeatureCard
              key={i}
              icon={
                <IconIllustration variant="dark" size="md">
                  <GearsIcon />
                </IconIllustration>
              }
              title={item.title}
              description={item.description}
            />
          ))}
        </ValuePropositionFrame>
      )}

      {/* 6. How it works */}
      {page.howItWorks && page.howItWorks.steps.length > 0 && (
        <StepsFrame
          tag="DÉPLOIEMENT"
          titleHighlight={page.howItWorks.heading || "Comment ça marche"}
          title=""
          subtitle={page.howItWorks.description}
          steps={page.howItWorks.steps.map((step) => ({
            icon: (
              <IconIllustration variant="dark" size="lg">
                <GearsIcon />
              </IconIllustration>
            ),
            title: step.title,
            description: step.description,
          }))}
        />
      )}

      {/* 7. FAQ */}
      {page.faq.items.length > 0 && (
        <FaqFrame
          title="Questions"
          titleHighlight="fréquentes"
          items={page.faq.items}
        />
      )}

      {/* 8. Final CTA */}
      <CtaHighlightFrame
        titlePrefix={page.finalCta.heading}
        titleHighlight=" "
        subtitle={page.finalCta.description || "Prêt à démarrer ?"}
        ctaLabel="Réserver une démo"
        ctaHref="/fr/meetings-pages"
      />

      {/* 9. Footer */}
      <Footer
        columns={BLOG_INDEX_DATA.footerColumns}
        copyright={BLOG_INDEX_DATA.copyright}
      />
    </main>
  );
}
