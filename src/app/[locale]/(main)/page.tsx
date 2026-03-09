import { HeroTabs } from "@/components/sections/HeroTabs";
import { PressLogos } from "@/components/sections/PressLogos";
import { LinkedInTestimonials } from "@/components/sections/LinkedInTestimonials";
import { Stats } from "@/components/sections/Stats";
import { PlatformIntro } from "@/components/sections/PlatformIntro";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { FeatureNewsletter } from "@/components/sections/FeatureNewsletter";
import { CtaMidpage } from "@/components/sections/CtaMidpage";
import { IntegrationsCarousel } from "@/components/sections/IntegrationsCarousel";
import { SansAvecComparison } from "@/components/sections/SansAvecComparison";
import { CustomerStories } from "@/components/sections/CustomerStories";

export default function HomePage() {
  return (
    <>
      {/* S01 — Hero with animated text + product tabs */}
      <HeroTabs />

      {/* S02 — Press mentions */}
      <PressLogos />

      {/* S03 — LinkedIn testimonials */}
      <LinkedInTestimonials />

      {/* S04 — Stats: 80%, 100%, 30K€ */}
      <Stats />

      {/* S05 — Platform intro */}
      <PlatformIntro />

      {/* S06 — Feature: Roadmaps */}
      <FeatureSection
        heading={
          <>
            <em className="not-italic">Partagez</em> simplement les roadmaps{" "}
            <strong className="font-bold">à toute l&apos;organisation</strong>
          </>
        }
        description="Une roadmap, ça bouge, ça vit, c'est un élément clé pour aligner le top management en continu. Avec AirSaas, plus besoin de faire des PowerPoints à rallonge : l'information est centralisée, partageable et sympa à visualiser (parce que quand c'est beau, c'est quand même plus impactant)."
        image="/assets/images/Portfolio project timeline view.webp"
        imageAlt="Portfolio timeline"
      />

      {/* S07 — Feature: Capacity planning */}
      <FeatureSection
        heading={
          <>
            Un{" "}
            <strong className="font-bold">
              capacity planning par équipe
            </strong>{" "}
            simple et actionnable
          </>
        }
        description={
          <>
            <p>
              Visualisez en un clin d&apos;oeil si vous êtes dans les clous...
              ou dans les choux. Grâce à cette vue vous avez les bases
              d&apos;une discussion pragmatique pour prendre les décisions :
            </p>
            <blockquote className="mt-3 border-l-2 border-primary pl-4 text-primary-70">
              Peut-on faire plus de projets ? Faut-il en enlever ?
            </blockquote>
            <blockquote className="mt-2 border-l-2 border-primary pl-4 text-primary-70">
              Quels sont les jalons qui nous plombent ? Peut-on les découper ?
            </blockquote>
            <blockquote className="mt-2 border-l-2 border-primary pl-4 text-primary-70">
              Doit-on recruter ou mettre l&apos;équipe en tension ? Pendant
              combien de temps ?
            </blockquote>
          </>
        }
        image="/assets/images/Capacity screen.webp"
        imageAlt="Capacity Marketing"
        bgColor="lavender"
      />

      {/* S08 — Feature: Priorisation */}
      <FeatureSection
        heading={
          <>
            <em className="not-italic">C</em>haque directeur définit{" "}
            <strong className="font-bold">ses prios</strong>
          </>
        }
        description="Demandez aux directeurs de prioriser parmi les projets dont son équipe est à l'origine. Deux projets ne peuvent pas avoir la même priorité. Une fois prêts, ils valident leur choix. C'est simple, transparent et puissant."
        image="/assets/images/Portfolio project priority.webp"
        imageAlt="Priorisation options"
      />

      {/* S09 — Feature: Cadrage */}
      <FeatureSection
        heading={
          <>
            <em className="not-italic">Diffusez</em> un cadrage projet{" "}
            <strong className="font-bold">standardisé</strong>
          </>
        }
        description="Remplissez les fiches cadrage de projet de manière collaborative, et guidez vos collaborateurs vers un véritable niveau d'excellence en gestion de projet. A vous une culture projet homogénéisée !"
        image="/assets/images/Presentation cadrage screen.webp"
        imageAlt="Presentation scope"
        reversed
        bgColor="alt"
      />

      {/* S10 — Feature: Newsletter sponsor */}
      <FeatureNewsletter />

      {/* S11 — Feature: Reporting */}
      <FeatureSection
        heading={
          <>
            <em className="not-italic">Votre reporting projet</em>{" "}
            <strong className="font-bold">en un clic</strong>
          </>
        }
        description={
          <p>
            Générez votre{" "}
            <strong className="font-semibold">
              reporting flash en un seul clic
            </strong>
            , et homogénéisez vos présentations, pour faciliter la prise de
            décision. Autant de temps gagné pour vous focaliser sur le coaching
            de vos chefs de projet et votre gouvernance.
          </p>
        }
        image="/assets/images/Flash report ppt.webp"
        imageAlt="Flash report ppt"
      />

      {/* S12 — Feature: Decisions */}
      <FeatureSection
        heading={
          <>
            <em className="not-italic">Fluidifiez</em> votre prise de
            décisions{" "}
            <strong className="font-bold">importantes et urgentes</strong>
          </>
        }
        description={
          <p>
            <strong className="font-semibold">
              Centralisez vos décisions
            </strong>{" "}
            sous forme de Kanban, et partagez-les aisément avec toutes les
            parties prenantes de vos projets. Finies les informations perdues
            dans vos mails ou flux de discussions instantanées !
          </p>
        }
        image="/assets/images/Portfolio decisions-min.png"
        imageAlt="Portfolio decisions"
        reversed
        bgColor="alt"
      />

      {/* S13 — CTA mid-page */}
      <CtaMidpage />

      {/* S14 — Integrations carousel */}
      <IntegrationsCarousel />

      {/* S15 — Sans/Avec comparison */}
      <SansAvecComparison />

      {/* S16 — Customer stories */}
      <CustomerStories />
    </>
  );
}
