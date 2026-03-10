export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { COMPARE_PAGES } from "@/data/compare";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { QuoteCards } from "@/components/sections/QuoteCards";
import { TestimonialCards } from "@/components/sections/TestimonialCards";
import { SHARED_PRESS_ITEMS, SHARED_TESTIMONIALS } from "@/data/shared-content";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = COMPARE_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const page = COMPARE_PAGES.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  let featureIndex = 0;

  return (
    <>
      <HeroSplit
        heading={page.hero.heading}
        description={page.hero.description}
        image={page.hero.image}
        imageAlt={page.hero.imageAlt}
      />

      <SectionHeading
        heading={page.intro.heading}
        description={page.intro.description}
      />

      {page.sections.map((section, i) => {
        if (section.type === "comparison" && section.rows) {
          return (
            <ComparisonTable
              key={i}
              heading={section.heading!}
              description={section.description as string}
              competitorName={section.competitorName!}
              rows={section.rows}
            />
          );
        }

        if (section.type === "heading") {
          return (
            <SectionHeading
              key={i}
              heading={section.heading!}
              description={section.description}
            />
          );
        }

        if (section.type === "cta") {
          return (
            <CtaBanner
              key={i}
              heading={section.heading!}
              description={section.description as string}
              buttonText={section.buttonText}
            />
          );
        }

        if (section.type === "feature") {
          const isReversed =
            section.reversed ?? featureIndex % 2 === 1;
          featureIndex++;
          return (
            <FeatureRow
              key={i}
              heading={section.heading!}
              description={section.description!}
              image={section.image!}
              imageAlt={section.imageAlt!}
              reversed={isReversed}
              variant={section.variant}
            />
          );
        }

        if (section.type === "faq" && section.faqItems) {
          return (
            <FaqAccordion
              key={i}
              heading={section.heading!}
              items={section.faqItems}
            />
          );
        }

        return null;
      })}

      {page.hasPress && (
        <>
          <QuoteCards heading={<>Ils parlent de <strong className="font-extrabold">nous</strong></>} items={SHARED_PRESS_ITEMS} />
          <TestimonialCards testimonials={SHARED_TESTIMONIALS} />
        </>
      )}
    </>
  );
}
