export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { EQUIPES_PAGES } from "@/data/equipes";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { QuoteCards } from "@/components/sections/QuoteCards";
import { TestimonialCards } from "@/components/sections/TestimonialCards";
import { SHARED_PRESS_ITEMS, SHARED_TESTIMONIALS } from "@/data/shared-content";
import { Container } from "@/components/ui/Container";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = EQUIPES_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

export default async function EquipesPage({ params }: Props) {
  const { slug } = await params;
  const page = EQUIPES_PAGES.find((p) => p.slug === slug);

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
        if (section.type === "stats" && section.stats) {
          return (
            <section key={i} className="py-20">
              <Container>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {section.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-[3.5rem] font-bold leading-tight text-primary">
                        {stat.value}
                      </div>
                      <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Container>
            </section>
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
