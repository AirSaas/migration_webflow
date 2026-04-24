"use client";

/**
 * LpExamplePage — canonical landing-page composition blueprint.
 *
 * **This is a REFERENCE page**, not a real route. Clone it when building a
 * new landing page (`/lp/ppm`, `/lp/pmo`, `/lp/capacity-planning`,
 * `/lp/pi-planning`) — rename, swap content, keep the structure.
 *
 * Composition order (matches audit/ds-audit-26-pages — verdict "Fully
 * covered" once rebuilt):
 *
 *   1. LpNavbar (minimal)                                       — pending move from _legacy/layout/
 *   2. Hero (split, dual CTA, trust badges)                     — DS
 *   3. TabsFrame (anchors to sections below)                    — DS new · uses `id` on targets
 *   4. ValuePropositionFrame (4 trust metrics)                  — DS
 *   5. ComparisonFrame (pain points, solo "sans")               — DS
 *   6. FeatureFrame × 3 (alternating imagePosition)             — DS
 *   7. PillarFrame (3 pillars — "why adopt")                    — DS
 *   8. StepsFrame (4 deployment steps)                          — DS new
 *   9. TestimonialsFrame (2-3 LinkedIn cards)                   — DS
 *  10. IconRowFrame (4 security badges)                         — DS
 *  11. FaqFrame (4-5 items)                                     — DS
 *  12. RelatedSolutionsFrame (3 cross-sell cards)               — DS new
 *  13. CtaFrame (2 CardCta: demo + guide)                       — DS
 *  14. LpFooter (minimal)                                       — pending move from _legacy/layout/
 *
 * ⚠️ NOT in production — this page exists only as a Storybook blueprint.
 * Do not mount it to a Next.js route. When cloning, delete `"use client"`
 * if the real page is server-rendered.
 *
 * ## `id` prop — why it matters here
 *
 * TabsFrame uses IntersectionObserver to sync the active tab with the
 * user's scroll position. It looks up `document.getElementById(id)` for
 * each tab href. Every section frame that appears as a TabsFrame target
 * MUST receive an `id` prop. We pass ids to the 5 sections linked from
 * the TabsFrame below.
 *
 * ## i18n
 *
 * All user-facing strings are passed as props (no hardcoded French inside
 * components). Use next-intl `useTranslations()` in the caller — example
 * shape:
 *
 *     const t = useTranslations("lp.ppm");
 *     <Hero title={t("hero.title")} ... />
 *
 * For this blueprint we use inline French placeholders to keep the
 * example readable.
 */

import { Hero } from "@/components/library-design/sections/Hero";
import { TabsFrame } from "@/components/library-design/sections/TabsFrame";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { ComparisonFrame } from "@/components/library-design/sections/ComparisonFrame";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { PillarFrame } from "@/components/library-design/sections/PillarFrame";
import { StepsFrame } from "@/components/library-design/sections/StepsFrame";
import { TestimonialsFrame } from "@/components/library-design/sections/TestimonialsFrame";
import { IconRowFrame } from "@/components/library-design/sections/IconRowFrame";
import { FaqFrame } from "@/components/library-design/sections/FaqFrame";
import { RelatedSolutionsFrame } from "@/components/library-design/sections/RelatedSolutionsFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { FeatureCard } from "@/components/library-design/ui/FeatureCard";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import {
  BullseyeArrowIcon,
  StopwatchIcon,
  CalendarStarIcon,
  IndustryIcon,
  LockKeyholeIcon,
  BanIcon,
  CirclePlusIcon,
  ArrowsRotateIcon,
  GearsIcon,
} from "@/components/library-design/ui/icons/illustration-icons";

function MdIcon({ children }: { children: React.ReactNode }) {
  return (
    <IconIllustration variant="dark" size="md">
      {children}
    </IconIllustration>
  );
}

function LgIcon({ children }: { children: React.ReactNode }) {
  return (
    <IconIllustration variant="dark" size="lg">
      {children}
    </IconIllustration>
  );
}

export default function LpExamplePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero — top of page, H1 + dual CTA + trust badges */}
      <Hero
        layout="split"
        eyebrow="LANDING PAGE"
        topTag={{ label: "Nouveau", variant: "success" }}
        title="Pilotez votre portefeuille projet"
        titleHighlight="sans feuille Excel"
        subtitle="AirSaas consolide vos projets, priorités et ressources en un flash report mensuel — adopté par 200+ PMO en France."
        primaryCta={{ label: "Réserver une démo", href: "#cta" }}
        secondaryCta={{ label: "Voir la vidéo", href: "#video" }}
        bottomTags={[
          { label: "Sans installation", variant: "muted" },
          { label: "Déploiement 4 semaines", variant: "success" },
          { label: "RGPD · Hébergé en France", variant: "muted" },
        ]}
        imageSrc="https://placehold.co/1200x700/e8eafc/3c51e2?text=Hero+Illustration"
        imageAlt="Capture du dashboard AirSaas"
      />

      {/* 2. TabsFrame — hero-adjacent anchor tabs. Scroll-spy targets the ids
             passed to sections below. */}
      <TabsFrame
        ariaLabel="Sections de la page"
        tabs={[
          { label: "Gains", href: "#gains" },
          { label: "Problèmes", href: "#problemes" },
          { label: "Fonctionnalités", href: "#features" },
          { label: "Déploiement", href: "#deploiement" },
          { label: "FAQ", href: "#faq" },
        ]}
      />

      {/* 3. ValuePropositionFrame — 4 trust-strip metrics */}
      <ValuePropositionFrame
        id="gains"
        tag="LES RÉSULTATS"
        titleHighlight="4 indicateurs"
        title="qui changent avec AirSaas"
        subtitle="Les gains moyens observés sur nos clients au bout de 6 mois d'adoption."
        columns={4}
      >
        <FeatureCard
          icon={<MdIcon><StopwatchIcon /></MdIcon>}
          title="−40%"
          description="Temps de consolidation des flash reports"
        />
        <FeatureCard
          icon={<MdIcon><BullseyeArrowIcon /></MdIcon>}
          title="×2"
          description="Taux de participation aux comités de pilotage"
        />
        <FeatureCard
          icon={<MdIcon><CalendarStarIcon /></MdIcon>}
          title="−3×"
          description="Délai moyen de décision en gouvernance"
        />
        <FeatureCard
          icon={<MdIcon><IndustryIcon /></MdIcon>}
          title="200+"
          description="PMO français pilotent déjà avec AirSaas"
        />
      </ValuePropositionFrame>

      {/* 4. ComparisonFrame — pain points, solo "sans" usage */}
      <ComparisonFrame
        id="problemes"
        emoji="😩"
        title="Vous vous reconnaissez ?"
        subtitle="Les 4 symptômes que 9 PMO sur 10 nous décrivent en première réunion."
        items={[
          {
            value: 1,
            description:
              "Vos flash reports sont consolidés à la main dans PowerPoint, chaque fin de mois.",
          },
          {
            value: 2,
            description:
              "Les chefs de projet remplissent 3 outils différents — personne ne sait où est la vérité.",
          },
          {
            value: 3,
            description:
              "Les comités de pilotage servent à constater le retard, pas à arbitrer.",
          },
          {
            value: 4,
            description:
              "Les sponsors réclament des indicateurs que personne n'a le temps de produire.",
          },
        ]}
      />

      {/* 5. FeatureFrame × 3 — alternating imagePosition */}
      <FeatureFrame
        id="features"
        layout="inline"
        imagePosition="right"
        tag="FONCTIONNALITÉ 1"
        titleHighlight="Consolidez"
        title="tous vos projets en un flash report mensuel"
        subtitle="AirSaas agrège automatiquement les données de vos projets, équipes et budgets. Votre flash report se génère en un clic — adieu le PowerPoint du dimanche soir."
        imageSrc="https://placehold.co/900x600/e8eafc/3c51e2?text=Flash+Report"
        imageAlt="Capture du flash report automatique"
        ctaLabel="Voir la démo"
        ctaHref="#cta"
      />

      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="FONCTIONNALITÉ 2"
        titleHighlight="Priorisez"
        title="par équipe, sans débat interminable"
        subtitle="Chaque équipe classe ses projets dans sa vue dédiée. Les sponsors arbitrent à partir d'une matrice consolidée, plus des opinions."
        imageSrc="https://placehold.co/900x600/ffd180/3c51e2?text=Priorisation"
        imageAlt="Capture de la vue priorisation"
        ctaLabel="Voir la démo"
        ctaHref="#cta"
      />

      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="FONCTIONNALITÉ 3"
        titleHighlight="Anticipez"
        title="les surcharges avant qu'elles ne bloquent vos projets"
        subtitle="Le capacity planning visualise les charges par équipe et par période. Les surallocations apparaissent en rouge avant de devenir un problème."
        imageSrc="https://placehold.co/900x600/cdf9e1/3c51e2?text=Capacity"
        imageAlt="Capture du capacity planning"
        ctaLabel="Voir la démo"
        ctaHref="#cta"
      />

      {/* 6. PillarFrame — 3 pillars "why adopt" */}
      <PillarFrame
        tag="POURQUOI AIRSAAS"
        titleHighlight="3 raisons"
        title="pour lesquelles les équipes adoptent AirSaas"
        subtitle="Ce que nos clients nous disent 6 mois après le démarrage."
        columns={3}
        pillars={[
          {
            icon: <LgIcon><BullseyeArrowIcon /></LgIcon>,
            title: "Focus",
            description:
              "Un seul outil pour tous les projets stratégiques. Fini la dispersion.",
            example:
              "Intuis a consolidé 4 outils en 1 et divisé par 2 le temps de reporting.",
            exampleLabel: "Exemple",
          },
          {
            icon: <LgIcon><CalendarStarIcon /></LgIcon>,
            title: "Rythme",
            description:
              "Les rituels de pilotage deviennent prévisibles et actionnables.",
            example:
              "Comexposium a passé ses comités mensuels de 2h à 45 minutes.",
            exampleLabel: "Exemple",
          },
          {
            icon: <LgIcon><StopwatchIcon /></LgIcon>,
            title: "Autonomie",
            description:
              "Les chefs de projet remontent sans accompagnement du PMO.",
            example:
              "Picoty a divisé par 3 les allers-retours PMO ↔ chefs de projet.",
            exampleLabel: "Exemple",
          },
        ]}
      />

      {/* 7. StepsFrame — 4 deployment steps */}
      <StepsFrame
        id="deploiement"
        tag="DÉPLOIEMENT"
        titleHighlight="4 étapes"
        title="pour être opérationnel en moins d'un mois"
        subtitle="Nos équipes vous accompagnent sur chaque étape."
        steps={[
          {
            icon: <LgIcon><BanIcon /></LgIcon>,
            title: "Kick-off",
            description:
              "Cadrage des objectifs, rôles et périmètre avec votre sponsor.",
          },
          {
            icon: <LgIcon><CirclePlusIcon /></LgIcon>,
            title: "Import",
            description:
              "Import de votre portefeuille existant depuis vos outils actuels.",
          },
          {
            icon: <LgIcon><ArrowsRotateIcon /></LgIcon>,
            title: "Configuration",
            description:
              "Paramétrage des vues, reportings et règles de priorisation.",
          },
          {
            icon: <LgIcon><GearsIcon /></LgIcon>,
            title: "Go live",
            description:
              "Formation des équipes et suivi d'adoption sur 30 jours.",
          },
        ]}
      />

      {/* 8. TestimonialsFrame — 3 LinkedIn-style testimonials */}
      <TestimonialsFrame
        title="Ce qu'en disent"
        titleHighlight="nos clients"
        readMoreLabel="Lire la suite"
        readLessLabel="Voir moins"
        testimonials={[
          {
            quote:
              "AirSaas a remplacé 4 outils dans notre DSI. Nos comités de pilotage sont enfin productifs.",
            name: "Laurent Citton",
            role: "DSI Groupe Picoty",
          },
          {
            quote:
              "Déploiement rapide, adoption spontanée. Les équipes ne reviennent pas en arrière.",
            name: "Émilie Lecart",
            role: "CIO Office",
          },
          {
            quote:
              "Enfin un outil pensé pour les PMO, pas pour les chefs de projet.",
            name: "Sébastien Louyot",
            role: "Group CIO Altavia",
          },
        ]}
      />

      {/* 9. IconRowFrame — 4 security badges */}
      <IconRowFrame
        singleTitle="Sécurité & conformité"
        subtitle="AirSaas répond aux exigences des DSI des grands comptes français."
        items={[
          { icon: <MdIcon><LockKeyholeIcon /></MdIcon>, label: "ISO 27001" },
          { icon: <MdIcon><IndustryIcon /></MdIcon>, label: "Hébergé en France" },
          { icon: <MdIcon><BullseyeArrowIcon /></MdIcon>, label: "Pentest annuel" },
          { icon: <MdIcon><GearsIcon /></MdIcon>, label: "SSO / SAML" },
        ]}
      />

      {/* 10. FaqFrame */}
      <FaqFrame
        id="faq"
        title="Les questions"
        titleHighlight="fréquentes"
        items={[
          {
            question: "Combien de temps prend le déploiement ?",
            answer:
              "Entre 3 et 6 semaines selon le périmètre. Nous accompagnons chaque étape (kick-off, import, configuration, formation).",
          },
          {
            question: "AirSaas s'intègre à nos outils existants ?",
            answer:
              "Oui : Jira, Asana, Monday, ServiceNow, PowerBI, Tableau. Voir la marketplace complète.",
          },
          {
            question: "Quel est le tarif ?",
            answer:
              "Basé sur le nombre d'utilisateurs actifs. Devis personnalisé après une démo de cadrage.",
          },
          {
            question: "Mes données restent où ?",
            answer:
              "Hébergées en France (OVH Gravelines). Pas de sous-traitance hors Europe. Backup chiffré quotidien.",
          },
        ]}
      />

      {/* 11. RelatedSolutionsFrame — 3 cross-sell cards */}
      <RelatedSolutionsFrame
        tag="EXPLORER"
        titleHighlight="Découvrez"
        title="toute la plateforme AirSaas"
        subtitle="Priorisation, capacity, reporting — chaque module s'appuie sur les autres."
        linkLabel="Voir plus"
        solutions={[
          {
            imageSrc: "https://placehold.co/640x400/e8eafc/3c51e2?text=Priorisation",
            imageAlt: "Vue priorisation par équipes",
            title: "Priorisation par équipes",
            description:
              "Laissez chaque équipe prioriser ses projets en fonction de sa charge.",
            href: "/fr/produit/priorisation-par-equipes",
          },
          {
            imageSrc: "https://placehold.co/640x400/ffd180/3c51e2?text=Capacity",
            imageAlt: "Vue capacity planning",
            title: "Capacity planning",
            description:
              "Anticipez surcharges et sous-charges par équipe avant qu'elles ne bloquent.",
            href: "/fr/produit/capacity-planning",
          },
          {
            imageSrc: "https://placehold.co/640x400/cdf9e1/3c51e2?text=Reporting",
            imageAlt: "Vue reporting projet",
            title: "Reporting projet",
            description:
              "Générez en un clic le bilan d'un projet avec toutes les métriques.",
            href: "/fr/produit/reporting-projet",
          },
        ]}
      />

      {/* 12. CtaFrame — closing dual CTA cards (demo + guide) */}
      <CtaFrame
        title="Prêt à tester ?"
        subtitle="Deux façons de démarrer — la démo cadrée avec notre équipe ou le guide en autonomie."
      >
        <CardCta
          title="Réserver une démo"
          description="30 minutes pour découvrir AirSaas sur votre portefeuille projet réel."
          ctaLabel="Réserver"
          ctaHref="#demo"
          className="flex-1"
        />
        <CardCta
          title="Télécharger le guide"
          description="Le guide complet du cadrage projet — utilisé par 200+ PMO français."
          ctaLabel="Télécharger"
          ctaHref="#guide"
          ctaVariant="tertiary"
          className="flex-1"
        />
      </CtaFrame>
    </div>
  );
}
