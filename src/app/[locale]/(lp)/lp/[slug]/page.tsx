export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { LP_PAGES } from "@/data/lp";
import { LpHero } from "@/components/sections/LpHero";
import { LpStats } from "@/components/sections/LpStats";
import { PainPoints } from "@/components/sections/PainPoints";
import { LpFeatureCard } from "@/components/sections/LpFeatureCard";
import { WhyAdoptGrid } from "@/components/sections/WhyAdoptGrid";
import { SecurityBadges } from "@/components/sections/SecurityBadges";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { LpFinalCta } from "@/components/sections/LpFinalCta";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = LP_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

export default async function LpPage({ params }: Props) {
  const { slug } = await params;
  const page = LP_PAGES.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <LpHero
        badge={page.hero.badge}
        heading={page.hero.heading}
        description={page.hero.description}
        videoHref={page.hero.videoHref}
        videoText={page.hero.videoText}
        trustBadges={page.hero.trustBadges}
        tabs={[
          { label: "Portfolio", image: "/assets/images/home_app_screen-min.png" },
          { label: "Quarter plan", image: "/assets/images/home_app_screen-min.png" },
          { label: "Capacitaire", image: "/assets/images/home_app_screen-min.png" },
          { label: "Priorisation", image: "/assets/images/home_app_screen-min.png" },
          { label: "Roadmap", image: "/assets/images/home_app_screen-min.png" },
          { label: "Reporting", image: "/assets/images/home_app_screen-min.png" },
        ]}
      />

      <LpStats heading={page.stats.heading} stats={page.stats.items} />

      <PainPoints heading={page.painPoints.heading} items={page.painPoints.items} />

      <div>
        {page.features.map((feature, i) => (
          <LpFeatureCard
            key={i}
            badge={feature.badge}
            heading={feature.heading}
            description={feature.description}
            bullets={feature.bullets}
            image={feature.image}
            imageAlt={feature.imageAlt}
            reversed={i % 2 === 1}
          />
        ))}
      </div>

      <WhyAdoptGrid
        heading={page.whyAdopt.heading}
        description={page.whyAdopt.description}
        items={page.whyAdopt.items}
      />

      <SecurityBadges />

      {page.howItWorks && (
        <HowItWorks
          heading={page.howItWorks.heading}
          description={page.howItWorks.description}
          steps={page.howItWorks.steps}
        />
      )}

      <FaqAccordion heading={page.faq.heading} items={page.faq.items} />

      <LpFinalCta
        heading={page.finalCta.heading}
        description={page.finalCta.description}
        videoTitle={page.finalCta.videoTitle}
        videoDescription={page.finalCta.videoDescription}
        videoHref={page.finalCta.videoHref}
      />
    </>
  );
}
