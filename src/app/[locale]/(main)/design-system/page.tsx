export const dynamic = "force-dynamic";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System — Section Showcase (internal)",
  robots: { index: false, follow: false },
};

import { HeroAnimated } from "@/components/sections/HeroAnimated";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Stats } from "@/components/sections/Stats";
import { ComparisonGrid } from "@/components/sections/ComparisonGrid";
import { QuoteCards } from "@/components/sections/QuoteCards";
import { TestimonialCards } from "@/components/sections/TestimonialCards";
import { CustomerStories } from "@/components/sections/CustomerStories";
import { FeatureNumberedList } from "@/components/sections/FeatureNumberedList";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { HeroTabbed } from "@/components/sections/HeroTabbed";
import { LpStats } from "@/components/sections/LpStats";
import { PainPoints } from "@/components/sections/PainPoints";
import { FeatureChecklist } from "@/components/sections/FeatureChecklist";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { TrustBadges } from "@/components/sections/TrustBadges";
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
  "HeroAnimated",
  "Stats",
  "SectionHeading",
  "FeatureRow",
  "CtaBanner",
  "ComparisonGrid",
  "QuoteCards",
  "TestimonialCards",
  "CustomerStories",
  "FeatureNumberedList",
  "HeroSplit",
  "FaqAccordion",
  "ComparisonTable",
  "HeroTabbed",
  "LpStats",
  "PainPoints",
  "FeatureChecklist",
  "BenefitsGrid",
  "TrustBadges",
  "HowItWorks",
  "LpFinalCta",
];

export default function DesignSystemPage() {
  return (
    <div>
      <div className="bg-foreground py-12 text-white">
        <Container>
          <h1 className="text-3xl font-bold">Design System — Section Showcase</h1>
          <p className="mt-2 text-white/70">
            All {SECTIONS.length} section components with sample data for visual QA
          </p>
        </Container>
      </div>

      <div className="border-b bg-bg-alt py-8">
        <Container>
          <h2 className="mb-4 text-lg font-semibold">Jump to section</h2>
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a key={s} href={`#${s}`} className="rounded-full bg-white px-3 py-1 text-sm text-foreground shadow-sm transition-colors hover:bg-primary hover:text-white">{s}</a>
            ))}
          </div>
        </Container>
      </div>

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

      <SectionLabel name="HeroAnimated" />
      <HeroAnimated />

      <SectionLabel name="Stats" />
      <Stats heading={<><strong className="font-extrabold">Les chiffres</strong> qui comptent</>} stats={[{ value: "80%", description: "Réduction des réunions projets" }, { value: "100%", description: "Visibilité portfolio" }, { value: "30K€", description: "Économies annuelles" }]} />

      <SectionLabel name="SectionHeading" />
      <SectionHeading heading="Une plateforme complète pour piloter vos projets" description="AirSaaS centralise la gestion de portefeuille, la planification capacitaire et le reporting pour aligner votre top management." />

      <SectionLabel name="FeatureRow" />
      <FeatureRow badge="PORTEFEUILLE" heading="Visualisez l'avancement de tous vos projets" description="Suivez en temps réel l'état d'avancement de chaque projet, identifiez les risques et prenez les bonnes décisions au bon moment." image="/assets/images/Portfolio%20project%20timeline%20view.webp" imageAlt="Vue timeline du portefeuille projet" />
      <FeatureRow badge="ROADMAP" heading="Partagez simplement les roadmaps à toute l'organisation" description="Une roadmap, ça bouge, ça vit, c'est un élément clé pour aligner le top management en continu. Avec AirSaas, plus besoin de faire des PowerPoints à rallonge." image="/assets/images/Roadmap%20page%20fr.webp" imageAlt="Roadmap page" reversed />
      <FeatureRow badge="CAPACITAIRE" heading="Un capacity planning par équipe simple et actionnable" description="Visualisez en un clin d'oeil si vous êtes dans les clous... ou dans les choux." image="/assets/images/Capacity%20screen.webp" imageAlt="Écran capacitaire par équipe" variant="card" />
      <FeatureRow badge="PRIORISATION" heading="Priorisez avec votre comité de direction" description="Alignez les priorités entre la DSI et le top management grâce à des critères objectifs et une vue partagée du portefeuille." image="/assets/images/Portfolio%20project%20priority.webp" imageAlt="Priorisation options" reversed variant="card" />

      <SectionLabel name="CtaBanner" />
      <CtaBanner heading="Prêt à transformer votre pilotage ?" description="Rejoignez les DSI qui ont choisi AirSaaS pour piloter leur portefeuille de projets et aligner leur top management." />

      <SectionLabel name="ComparisonGrid" />
      <ComparisonGrid heading="Avant / Après" leftLabel="Sans solution" rightLabel="Avec solution" rows={[{ left: "Reporting manuel", right: "Reporting automatique" }, { left: "Pilotage à l'aveugle", right: "Visibilité en temps réel" }, { left: "Priorités floues", right: "Priorisation objective" }]} />

      <SectionLabel name="QuoteCards" />
      <QuoteCards heading={<>Ils parlent de <strong className="font-extrabold">nous</strong></>} items={[{ quote: "Hub de pilotage donnant le bon niveau de visibilité", logo: "/assets/images/logo-alliancy-monotone.png", logoAlt: "Alliancy", href: "#" }, { quote: "Une nouvelle manière d'embarquer les équipes", logo: "/assets/images/LePoint-monotone.png", logoAlt: "Le Point", href: "#" }]} />

      <SectionLabel name="TestimonialCards" />
      <TestimonialCards testimonials={[{ name: "Thomas S.", role: "DSI", initials: "TS", text: "Super outil qui nous permet de fluidifier le pilotage.", href: "#" }, { name: "Marie-Odile L.", role: "CDIO", initials: "ML", text: "Un beau projet et une vraie dynamique d'équipe.", href: "#" }, { name: "Clement R.", role: "ICT Manager", initials: "CR", text: "Un outil vraiment TOP pour ritualiser nos réunions.", href: "#" }]} />

      <SectionLabel name="CustomerStories" />
      <CustomerStories heading={<>Laissez <strong className="font-extrabold">nos clients</strong> vous parler</>} description="Découvrez leurs témoignages." stories={[{ name: "Laurent Citton", role: "DSI Groupe", company: "Groupe Picoty", sector: "Énergie", employees: "1300", initials: "LC", href: "#" }, { name: "Émilie Lecart", role: "CIO Office", sector: "Hôtellerie", employees: "40000", initials: "EL", href: "#" }, { name: "Sébastien Louyot", role: "Group CIO", company: "Altavia", sector: "Marketing", employees: "2800", initials: "SL", href: "#" }]} moreLink={{ text: "Voir tous les témoignages", href: "#" }} />

      <SectionLabel name="FeatureNumberedList" />
      <FeatureNumberedList
        badge="NEWSLETTER"
        heading={<>Une <strong className="font-bold">newsletter sponsor</strong> que votre direction va adorer</>}
        image="/assets/images/Copil%20-%20%20Bilan-min.png"
        imageAlt="Bilan de santé newsletter"
        features={[
          { title: "Tendance des projets vitaux", description: "Un récapitulatif de la santé des projets vitaux de votre organisation." },
          { title: "Tendance de leurs projets à eux", description: "Un aperçu de leurs projets en amélioration et dégradation." },
          { title: "Projets en retard d'actualisation", description: "Un rappel des projets qui méritent d'être mis à jour." },
        ]}
      />

      <SectionLabel name="HeroSplit" />
      <HeroSplit badge="SOLUTION" heading={<>Pilotez votre <span className="text-primary">portefeuille de projets</span></>} description="Visualisez l'avancement de tous vos projets en un coup d'oeil." image="/assets/images/Presentation%20cadrage%20screen.webp" imageAlt="Écran cadrage projet AirSaaS" />

      <SectionLabel name="FaqAccordion" />
      <FaqAccordion heading="Questions fréquentes" items={[{ question: "Qu'est-ce qu'AirSaaS ?", answer: "AirSaaS est une plateforme SaaS de pilotage de portefeuille de projets." }, { question: "Comment fonctionne la démo ?", answer: "Réservez un créneau de 30 minutes avec notre équipe." }, { question: "AirSaaS s'intègre-t-il à nos outils ?", answer: "Oui, AirSaaS s'intègre avec Jira, MS Project, Monday.com et bien d'autres." }]} />

      <SectionLabel name="ComparisonTable" />
      <ComparisonTable heading="AirSaaS vs Monday.com" description="Comparez les fonctionnalités clés." competitorName="Monday.com" rows={[{ feature: "Vue portefeuille", description: "Vision globale", airsaas: true, competitor: false }, { feature: "Quarter plan", description: "Planification trimestrielle", airsaas: true, competitor: false }, { feature: "Capacitaire", description: "Gestion de la capacité", airsaas: true, competitor: true }]} />

      <SectionLabel name="HeroTabbed" />
      <HeroTabbed badge="PPM MODERNE" heading={<>Le PPM <span className="text-primary">moderne</span> pour les DSI</>} description="Pilotez votre portefeuille de projets." trustBadges={[{ icon: "/assets/icons/icon-lock-keyhole.svg", text: "ISO 27001" }, { icon: "/assets/icons/france.svg", text: "Hébergé en France" }]} tabs={[{ label: "Portfolio", image: "/assets/images/Portfolio%20project%20priority.webp" }, { label: "Quarter plan", image: "/assets/images/Flash%20report%20ppt.webp" }]} />

      <SectionLabel name="LpStats" />
      <LpStats heading="Résultats concrets" stats={[{ value: "30%", label: "de projets livrés en plus" }, { value: "2x", label: "plus rapide pour arbitrer" }, { value: "100%", label: "de visibilité portfolio" }]} />

      <SectionLabel name="PainPoints" />
      <PainPoints heading="Vous reconnaissez-vous ?" items={["Trop de projets en parallèle", "Pas de visibilité pour le management", "Priorités qui changent sans cesse"]} />

      <SectionLabel name="FeatureChecklist" />
      <FeatureChecklist badge="PORTFOLIO" heading="Centralisez tous vos projets" description="Une vue unique pour piloter votre portefeuille." bullets={["Vue consolidée", "Indicateurs temps réel", "Alertes automatiques"]} image="/assets/images/Automation%20-%20integrations.webp" imageAlt="Intégrations et automatisations AirSaaS" />

      <SectionLabel name="BenefitsGrid" />
      <BenefitsGrid badge="AVANTAGES" heading="Pourquoi nous choisir ?" items={[{ icon: "⚡", title: "Simplicité", description: "Prise en main en 30 minutes" }, { icon: "👁", title: "Visibilité", description: "Dashboard temps réel pour le COMEX" }, { icon: "🤝", title: "Alignement", description: "DSI et métiers sur la même page" }, { icon: "📈", title: "ROI", description: "Résultats mesurables en 3 mois" }]} />

      <SectionLabel name="TrustBadges" />
      <TrustBadges badges={[{ title: "ISO 27001", description: "Certifié" }, { title: "Hébergé en France", description: "Scaleway" }, { title: "Pentest", description: "Résultats sur demande" }, { title: "SSO / SAML", description: "Intégration AD" }]} />

      <SectionLabel name="HowItWorks" />
      <HowItWorks steps={[{ title: "Démo personnalisée", description: "30 min pour comprendre vos enjeux" }, { title: "Configuration", description: "On paramètre pour votre contexte" }, { title: "Déploiement", description: "Opérationnel en 2 semaines" }]} />

      <SectionLabel name="LpFinalCta" />
      <LpFinalCta heading="Prêt à piloter différemment ?" />
    </div>
  );
}
