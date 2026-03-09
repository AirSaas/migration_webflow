export const dynamic = "force-dynamic";

import { HeroTabs } from "@/components/sections/HeroTabs";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { SolutionCtaMidpage } from "@/components/sections/SolutionCtaMidpage";
import { Stats } from "@/components/sections/Stats";
import { PlatformIntro } from "@/components/sections/PlatformIntro";
import { CtaMidpage } from "@/components/sections/CtaMidpage";
import { SansAvecComparison } from "@/components/sections/SansAvecComparison";
import { PressLogos } from "@/components/sections/PressLogos";
import { LinkedInTestimonials } from "@/components/sections/LinkedInTestimonials";
import { CustomerStories } from "@/components/sections/CustomerStories";
import { FeatureNewsletter } from "@/components/sections/FeatureNewsletter";
import { IntegrationsCarousel } from "@/components/sections/IntegrationsCarousel";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { LpHero } from "@/components/sections/LpHero";
import { LpStats } from "@/components/sections/LpStats";
import { PainPoints } from "@/components/sections/PainPoints";
import { LpFeatureCard } from "@/components/sections/LpFeatureCard";
import { WhyAdoptGrid } from "@/components/sections/WhyAdoptGrid";
import { SecurityBadges } from "@/components/sections/SecurityBadges";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LpFinalCta } from "@/components/sections/LpFinalCta";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

function SectionLabel({ name }: { name: string }) {
  return (
    <div id={name} className="border-b-2 border-primary bg-primary/5 px-6 py-3">
      <Container>
        <code className="text-sm font-bold text-primary">{name}</code>
      </Container>
    </div>
  );
}

const SECTIONS = [
  "Button",
  "HeroTabs",
  "Stats",
  "PlatformIntro",
  "SansAvecComparison",
  "CtaMidpage",
  "CustomerStories",
  "IntegrationsCarousel",
  "FeatureNewsletter",
  "PressLogos",
  "LinkedInTestimonials",
  "SolutionHero",
  "SectionHeading",
  "FeatureSection",
  "FeatureSection-reversed",
  "SolutionCtaMidpage",
  "FaqAccordion",
  "ComparisonTable",
  "LpHero",
  "LpStats",
  "PainPoints",
  "LpFeatureCard",
  "WhyAdoptGrid",
  "SecurityBadges",
  "HowItWorks",
  "LpFinalCta",
];

export default function DesignSystemPage() {
  return (
    <div>
      {/* Header */}
      <div className="bg-foreground py-12 text-white">
        <Container>
          <h1 className="text-3xl font-bold">Design System — Section Showcase</h1>
          <p className="mt-2 text-white/70">
            All {SECTIONS.length} section components with sample data for visual QA
          </p>
        </Container>
      </div>

      {/* Table of contents */}
      <div className="border-b bg-bg-alt py-8">
        <Container>
          <h2 className="mb-4 text-lg font-semibold">Jump to section</h2>
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="rounded-full bg-white px-3 py-1 text-sm text-foreground shadow-sm transition-colors hover:bg-primary hover:text-white"
              >
                {s}
              </a>
            ))}
          </div>
        </Container>
      </div>

      {/* === UI === */}
      <SectionLabel name="Button" />
      <div className="py-12">
        <Container>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="#">Primary</Button>
            <Button href="#" variant="secondary">Secondary</Button>
            <Button href="#" variant="tertiary">Tertiary</Button>
            <Button href="#" variant="outline">Outline</Button>
            <Button href="#" size="sm">Small</Button>
            <Button href="#" size="lg">Large</Button>
          </div>
        </Container>
      </div>

      {/* === HOMEPAGE === */}
      <SectionLabel name="HeroTabs" />
      <HeroTabs />

      <SectionLabel name="Stats" />
      <Stats />

      <SectionLabel name="PlatformIntro" />
      <PlatformIntro />

      <SectionLabel name="SansAvecComparison" />
      <SansAvecComparison />

      <SectionLabel name="CtaMidpage" />
      <CtaMidpage />

      <SectionLabel name="CustomerStories" />
      <CustomerStories />

      <SectionLabel name="IntegrationsCarousel" />
      <IntegrationsCarousel />

      <SectionLabel name="FeatureNewsletter" />
      <FeatureNewsletter />

      <SectionLabel name="PressLogos" />
      <PressLogos />

      <SectionLabel name="LinkedInTestimonials" />
      <LinkedInTestimonials />

      {/* === SOLUTION / PRODUIT === */}
      <SectionLabel name="SolutionHero" />
      <SolutionHero
        badge="SOLUTION"
        heading={<>Pilotez votre <span className="text-primary">portefeuille de projets</span></>}
        description="Visualisez l'avancement de tous vos projets en un coup d'oeil. Priorisez, arbitrez et alignez vos équipes sur les bons objectifs."
        image="/assets/images/home_app_screen-min.png"
        imageAlt="AirSaaS Portfolio"
      />

      <SectionLabel name="SectionHeading" />
      <SectionHeading
        heading="Une plateforme complète pour piloter vos projets"
        description="AirSaaS centralise la gestion de portefeuille, la planification capacitaire et le reporting pour aligner votre top management."
      />

      <SectionLabel name="FeatureSection" />
      <FeatureSection
        heading="Visualisez l'avancement de tous vos projets"
        description="Suivez en temps réel l'état d'avancement de chaque projet, identifiez les risques et prenez les bonnes décisions au bon moment."
        image="/assets/images/home_app_screen-min.png"
        imageAlt="Feature screenshot"
      />

      <SectionLabel name="FeatureSection-reversed" />
      <FeatureSection
        heading="Priorisez avec votre comité de direction"
        description="Alignez les priorités entre la DSI et le top management grâce à des critères objectifs et une vue partagée du portefeuille."
        image="/assets/images/home_app_screen-min.png"
        imageAlt="Feature screenshot"
        reversed
        bgColor="alt"
      />

      <SectionLabel name="SolutionCtaMidpage" />
      <SolutionCtaMidpage
        heading="Prêt à transformer votre pilotage ?"
        description="Rejoignez les DSI qui ont choisi AirSaaS pour piloter leur portefeuille de projets et aligner leur top management."
      />

      <SectionLabel name="FaqAccordion" />
      <FaqAccordion
        heading="Questions fréquentes"
        items={[
          { question: "Qu'est-ce qu'AirSaaS ?", answer: "AirSaaS est une plateforme SaaS de pilotage de portefeuille de projets (PPM) conçue pour les DSI." },
          { question: "Comment fonctionne la démo ?", answer: "Réservez un créneau de 30 minutes avec notre équipe." },
          { question: "AirSaaS s'intègre-t-il à nos outils ?", answer: "Oui, AirSaaS s'intègre avec Jira, MS Project, Monday.com et bien d'autres." },
        ]}
      />

      <SectionLabel name="ComparisonTable" />
      <ComparisonTable
        heading="AirSaaS vs Monday.com"
        description="Comparez les fonctionnalités clés pour le pilotage de portefeuille."
        competitorName="Monday.com"
        rows={[
          { feature: "Vue portefeuille", description: "Vision globale de tous les projets", airsaas: true, competitor: false },
          { feature: "Quarter plan", description: "Planification trimestrielle", airsaas: true, competitor: false },
          { feature: "Capacitaire", description: "Gestion de la capacité des équipes", airsaas: true, competitor: true },
          { feature: "Reporting PPT", description: "Export PowerPoint automatique", airsaas: true, competitor: false },
        ]}
      />

      {/* === LP === */}
      <SectionLabel name="LpHero" />
      <LpHero
        badge="PPM MODERNE"
        heading={<>Le PPM <span className="text-primary">moderne</span> pour les DSI</>}
        description="Pilotez votre portefeuille de projets, alignez le top management et accélérez la livraison."
        trustBadges={[
          { icon: "shield", text: "ISO 27001" },
          { icon: "flag", text: "Hébergé en France" },
        ]}
        tabs={[
          { label: "Portfolio", image: "/assets/images/home_app_screen-min.png" },
          { label: "Quarter plan", image: "/assets/images/home_app_screen-min.png" },
        ]}
      />

      <SectionLabel name="LpStats" />
      <LpStats
        heading="Résultats concrets"
        stats={[
          { value: "30%", label: "de projets livrés en plus" },
          { value: "2x", label: "plus rapide pour arbitrer" },
          { value: "100%", label: "de visibilité portfolio" },
        ]}
      />

      <SectionLabel name="PainPoints" />
      <PainPoints
        heading="Vous reconnaissez-vous ?"
        items={[
          "Trop de projets en parallèle, pas assez de ressources",
          "Le top management n'a pas de visibilité sur l'avancement",
          "Les priorités changent sans cesse, les équipes sont perdues",
        ]}
      />

      <SectionLabel name="LpFeatureCard" />
      <LpFeatureCard
        badge="PORTFOLIO"
        heading="Centralisez tous vos projets"
        description="Une vue unique pour piloter l'ensemble de votre portefeuille de projets."
        bullets={[
          "Vue consolidée multi-projets",
          "Indicateurs en temps réel",
          "Alertes automatiques",
        ]}
        image="/assets/images/home_app_screen-min.png"
        imageAlt="Portfolio feature"
      />

      <SectionLabel name="WhyAdoptGrid" />
      <WhyAdoptGrid
        heading="Pourquoi adopter AirSaaS ?"
        items={[
          { title: "Simplicité", description: "Prise en main en 30 minutes" },
          { title: "Visibilité", description: "Dashboard temps réel pour le COMEX" },
          { title: "Alignement", description: "DSI et métiers sur la même page" },
          { title: "ROI", description: "Résultats mesurables en 3 mois" },
        ]}
      />

      <SectionLabel name="SecurityBadges" />
      <SecurityBadges />

      <SectionLabel name="HowItWorks" />
      <HowItWorks
        steps={[
          { title: "Démo personnalisée", description: "30 min pour comprendre vos enjeux" },
          { title: "Configuration", description: "On paramètre AirSaaS pour votre contexte" },
          { title: "Déploiement", description: "Vos équipes sont opérationnelles en 2 semaines" },
        ]}
      />

      <SectionLabel name="LpFinalCta" />
      <LpFinalCta heading="Prêt à piloter différemment ?" />
    </div>
  );
}
