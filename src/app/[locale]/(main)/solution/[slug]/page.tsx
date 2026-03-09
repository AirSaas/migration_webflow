import { notFound } from "next/navigation";
import { SOLUTION_PAGES } from "@/data/solutions";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { SolutionCtaMidpage } from "@/components/sections/SolutionCtaMidpage";
import { PressLogos } from "@/components/sections/PressLogos";
import { LinkedInTestimonials } from "@/components/sections/LinkedInTestimonials";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return SOLUTION_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = SOLUTION_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const page = SOLUTION_PAGES.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  let featureIndex = 0;

  return (
    <>
      <SolutionHero
        badge={page.hero.badge}
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
            <SolutionCtaMidpage
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
            <FeatureSection
              key={i}
              heading={section.heading!}
              description={section.description!}
              image={section.image!}
              imageAlt={section.imageAlt!}
              reversed={isReversed}
              bgColor={section.bgColor}
            />
          );
        }

        return null;
      })}

      {page.hasPress && (
        <>
          <PressLogos />
          <LinkedInTestimonials />
        </>
      )}
    </>
  );
}
