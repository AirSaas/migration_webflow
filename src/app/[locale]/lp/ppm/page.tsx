import type { Metadata } from "next";
import { Hero } from "@/components/library-design/sections/Hero";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { FeatureSectionStacked } from "@/components/library-design/sections/FeatureSectionStacked";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { PillarFrame } from "@/components/library-design/sections/PillarFrame";
import { TestimonialsFrame } from "@/components/library-design/sections/TestimonialsFrame";
import { StepsFrame } from "@/components/library-design/sections/StepsFrame";
import { FaqFrame } from "@/components/library-design/sections/FaqFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { FeatureCard } from "@/components/library-design/ui/FeatureCard";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import { LandingShell, LANDING_NAV } from "@/components/layout/LandingShell";
import { LogosBar } from "@/components/library-design/ui/LogosBar";
import {
  CommentsIcon,
  ClipboardCheckIcon,
  CalendarStarIcon,
  BullseyeArrowIcon,
  BoltLightningIcon,
  GearsIcon,
  CircleCheckIcon,
} from "@/components/library-design/ui/icons/illustration-icons";

// SSO icon — inline SVG lock (same pattern as PMO, reuse).
function LockSolidIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2a4 4 0 0 0-4 4v3H6.5A1.5 1.5 0 0 0 5 10.5v9A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 17.5 9H16V6a4 4 0 0 0-4-4zm-2 7V6a2 2 0 1 1 4 0v3h-4z" />
    </svg>
  );
}

// Warning triangle for section 4 — same as PMO (R3 audit). Inline SVG instead of
// ⚠️ emoji (Product Sans doesn't ship the emoji glyph).
function WarningTriangleIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="inline-block align-middle mr-[0.5rem]"
    >
      <path
        d="M12 2L2 20h20L12 2z"
        fill="var(--color-prevention)"
        stroke="var(--color-secondary)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 9v5" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="var(--color-secondary)" />
    </svg>
  );
}

/**
 * LP PPM — Bespoke landing page (test #2 of the Figma-first pivot).
 *
 * Source: brief by Marisella at `.context/attachments/Estructura LP PPM.docx`
 * (18 sections, each mapped to a DS component). Wording for FeatureFrame bullets
 * comes from `src/data/landings-v2/lp.ts` entry `ppm`. Pain points + FAQ pulled
 * verbatim from live `airsaas.io/fr/lp/ppm`.
 *
 * Live reference: https://www.airsaas.io/fr/lp/ppm
 *
 * Image URLs use the Webflow CDN directly (will be migrated to /public/assets/lp-ppm/
 * after the audit cycle validates the composition).
 */

export const metadata: Metadata = {
  title: "Un PPM avec une UX au top ? Ça existe. | AirSaas",
  description:
    "Brief projet assisté par IA, flash report en 1 clic, roadmap partageable, vue macro consolidée. L'outil PPM que votre équipe va vraiment adopter.",
};

const HERO_PRIMARY_CTA = { label: "Réservez une démo", href: "/fr/meetings-pages" };
const HERO_SECONDARY_CTA = {
  label: "Découvrir l'outil PPM en vidéo (5 min)",
  href: "/fr/video/ppm",
};

const FINAL_CTA_HREF = "/fr/meetings-pages";

const WF_CDN = "https://cdn.prod.website-files.com/609552290d93fd43ba0f0849";

function iconBadge(Icon: React.ComponentType, variant: "light" | "dark" = "dark") {
  return (
    <IconIllustration variant={variant} size="lg">
      <Icon />
    </IconIllustration>
  );
}

export default function PpmPage() {
  return (
    <LandingShell>
      {/* 1. Hero PPM — eyebrow "OUTIL PPM" + H1 + 2 CTAs + 3 bottomTags + static dashboard */}
      <Hero
        navItems={LANDING_NAV.items}
        navCtaLabel={LANDING_NAV.ctaLabel}
        navCtaHref={LANDING_NAV.ctaHref}
        loginLabel={LANDING_NAV.loginLabel}
        loginHref={LANDING_NAV.loginHref}
        eyebrow="OUTIL PPM"
        title="Un PPM avec une UX au top ?"
        titleHighlight="Ça existe."
        subtitle="Brief projet assisté par IA, flash report en 1 clic, roadmap partageable, vue macro consolidée. L'outil PPM que votre équipe va vraiment adopter."
        bottomTags={[
          { label: "+100 clients nous font confiance", variant: "success" },
          { label: "Opérationnel en 1 mois", variant: "success" },
          { label: "Accompagnement premium inclus", variant: "success" },
        ]}
        primaryCta={HERO_PRIMARY_CTA}
        secondaryCta={HERO_SECONDARY_CTA}
        imageSrc="/assets/lp-pmo/hero.png"
        imageAlt="Capture d'écran du dashboard AirSaas — vue Q1 2025 avec onglets Portfolio / Strategy / Quarter Plan / Prioritization / Roadmap / Automatisation"
        floatingCards={false}
      />

      {/* 2. Logobar — Ils nous font confiance */}
      <section className="bg-white px-[1.5rem] md:px-[3rem] lg:px-[10rem] py-[2.5rem]">
        <LogosBar
          label="Ils nous font confiance"
          logos={[
            { src: "/assets/lp-pmo/logo-kiabi.png", alt: "Kiabi" },
            { src: "/assets/lp-pmo/logo-altavia.svg", alt: "Altavia" },
            { src: "/assets/lp-pmo/logo-valrhona.png", alt: "Valrhona" },
            { src: "/assets/lp-pmo/logo-intuis.png", alt: "Intuis" },
            { src: "/assets/lp-pmo/logo-sncf.svg", alt: "SNCF" },
          ]}
          size="lg"
          preserveColor
        />
      </section>

      {/* 3. Stats — 4 metrics with icons */}
      <ValuePropositionFrame
        titleHighlight="Les chiffres"
        title="qui vous feront adopter AirSaas"
        columns={4}
      >
        <FeatureCard
          icon={iconBadge(CommentsIcon)}
          title="-80%"
          description="de réunions projet"
        />
        <FeatureCard
          icon={iconBadge(ClipboardCheckIcon)}
          title="0 ppt"
          description="Reporting en 1 clic"
        />
        <FeatureCard
          icon={iconBadge(CalendarStarIcon)}
          title="1 mois"
          description="pour être opérationnel"
        />
        <FeatureCard
          icon={iconBadge(BullseyeArrowIcon)}
          title="+60%"
          description="des projets on time & on budget"
        />
      </ValuePropositionFrame>

      {/* 4. "Vous vous reconnaissez ?" — 4 pain points via FeatureSectionStacked + ListEmphasized
          (per brief). Wording verbatim from live airsaas.io/fr/lp/ppm.
          Custom paddingBottom because we use this component without an image bleed
          (DS default expects an illustration to anchor the bottom — qa-llm P1 fix). */}
      <FeatureSectionStacked
        titleGradient="Vous vous reconnaissez"
        titleDark="?"
        listItems={[
          "Votre portefeuille projets vit dans un Excel à 1200 colonnes que vous seul comprenez",
          "Vous passez 2 jours à produire des PowerPoints qui sont obsolètes le lendemain",
          "Le Comex vous demande une roadmap, vous avez une liste de 47 projets sans priorité claire",
          "Des projets se rajoutent alors que certaines équipes sont à 200%. Mais personne ne le voit.",
        ]}
        imageAlt="Pain points du PMO sans outil dédié"
        className="!pb-[clamp(3rem,5.2vw,6.25rem)]"
      />

      {/* 5. Feature — Flash Report en 1 clic (image right) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="Gain de temps immédiat"
        titleHighlight="Flash Report"
        title="en 1 clic"
        subtitle="Fini les 2 jours de PowerPoint. En un clic, générez un rapport complet, à jour, aux couleurs de votre entreprise. Partagez-le par email ou via un lien sécurisé."
        checklist={[
          "Export PDF, PPT ou lien web",
          "Personnalisable aux couleurs de l'entreprise",
          "Données toujours à jour",
          "Envoi automatique programmable",
        ]}
        imageSrc={`${WF_CDN}/65d742defe0bf46502743b11_Flash%20report%20export%20modal.webp`}
        imageAlt="Capture du Flash Report AirSaas exporté en 1 clic"
      />

      {/* 6. Feature — Roadmap COMEX partageable (image left + Tag "Nouveau") */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        imageBgColor="var(--color-prevention-20)"
        tag="Nouveau"
        titleHighlight="Roadmap COMEX"
        title="partageable en un clic"
        subtitle="Partagez une roadmap dynamique avec le Comex via un lien sécurisé, sans qu'ils aient besoin de se connecter. Lecture seule, expiration configurable, droits personnalisés."
        checklist={[
          "Export PDF, PPT ou lien web",
          "Droits de lecture configurables",
          "Expiration automatique",
          "Roadmap et Flash Report = même source de vérité",
        ]}
        imageSrc={`${WF_CDN}/69723755551cb6f361ab8f4d_7be57ee9b39e8acfd6704c4479c49a6e_Roadmap%20page%20fr.webp`}
        imageAlt="Capture de la roadmap COMEX AirSaas partageable"
      />

      {/* 7. Feature — Priorisation explicite #1, #2, #3 (image right) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="Clarté absolue"
        titleHighlight="Priorisation explicite"
        title="#1, #2, #3"
        subtitle={'Chaque équipe doit pouvoir dire ce qui est #1, #2, #3 — pas un "top 10". Et dès que l\'ordre change, tout le monde le voit. Fini les "projets zombies".'}
        checklist={[
          "Liste unique par équipe",
          "Changements visibles (qui, quoi, pourquoi)",
          "Vue d'arbitrage inter-directions",
          "Historique des décisions",
        ]}
        imageSrc={`${WF_CDN}/663d07b7eeea99ee02f71c97_Prioritization%20per%20team%20ppt.webp`}
        imageAlt="Capture de la priorisation explicite AirSaas"
      />

      {/* 8. Feature — Décisions pilotables (image left + Tag "Nouveau") */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        imageBgColor="var(--color-prevention-20)"
        tag="Nouveau"
        titleHighlight="Décisions"
        title="pilotables"
        subtitle="Les décisions changent, se perdent dans les CR, et chacun en garde une version différente. AirSaas transforme les décisions en objets pilotables avec owner, échéance et impact sur la roadmap."
        checklist={[
          "Owner et échéance assignés",
          "Suivi du statut en temps réel",
          "Impact visible sur la roadmap",
          "Historique complet",
        ]}
        imageSrc={`${WF_CDN}/65d35c96ec9fbf11d78e4b44_Portfolio%20decisions%20(show%20projects%20title).webp`}
        imageAlt="Capture du Kanban des décisions AirSaas"
      />

      {/* 9. Feature — Portfolio consolidé multi-vues (image right) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="Vue macro"
        titleHighlight="Portfolio consolidé"
        title="multi-vues"
        subtitle="Tableau de bord, Kanban, Timeline, Liste filtrable… Visualisez votre portefeuille comme vous le souhaitez. Filtrez par météo, équipe, priorité, objectif."
        checklist={[
          "Vue Liste, Kanban, Timeline, Dashboard",
          "Filtres personnalisables",
          "Drill-down par direction / équipe",
          "Export en 1 clic",
        ]}
        imageSrc={`${WF_CDN}/65d707b3e6ce3f9970b2d505_Portfolio%20project%20list%20view.webp`}
        imageAlt="Capture du portfolio consolidé AirSaas multi-vues"
      />

      {/* 10. Feature — Capacité par quarter et par équipe (image left) */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        imageBgColor="var(--color-prevention-20)"
        tag="Quarter Plan"
        titleHighlight="Capacité"
        title="par quarter et par équipe"
        subtitle="Visualisez en un clin d'œil la charge vs capacité de chaque équipe, trimestre par trimestre. Enfin un moyen simple de savoir si vous pouvez prendre ce nouveau projet."
        checklist={[
          "Vue capacité par équipe et par trimestre",
          "Alerte surcharge automatique",
          "T-shirt sizing (S, M, L, XL)",
          "Arbitrer avant de créer de la friction",
        ]}
        imageSrc={`${WF_CDN}/66334ee7bcfcb0aa45802537_Capacity%20screen.webp`}
        imageAlt="Capture de la gestion de capacité par quarter et par équipe AirSaas"
      />

      {/* 11. Feature — Scénarios d'arbitrage avec l'IA (image right) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="Intelligence Artificielle"
        titleHighlight="Scénarios d'arbitrage"
        title="avec l'IA"
        subtitle={'Passez de "roadmap figée" à "scénarios A/B/C". L\'IA structure ce qui manque, puis vous comparez les options en minutes : capacité consommée, délais, risques, valeur.'}
        checklist={[
          "Comparaison visuelle des scénarios",
          "Impact sur la capacité en temps réel",
          "Arbitrages documentés et traçables",
          "Fonctionne même avec des données imparfaites",
        ]}
        imageSrc={`${WF_CDN}/67973435cf37dd18cddcdffa_Page%20Scenarios%20FR.webp`}
        imageAlt="Capture des scénarios d'arbitrage IA AirSaas"
      />

      {/* 12. Pillars — Pourquoi les équipes adoptent AirSaas (3 columns) */}
      <PillarFrame
        titleHighlight="Pourquoi les équipes"
        title="adoptent AirSaas"
        subtitle="Un PPM n'a de valeur que s'il est utilisé. Voici ce qui fait la différence."
        columns={3}
        pillars={[
          {
            icon: iconBadge(BoltLightningIcon),
            title: "Prise en main immédiate",
            description: "Interface intuitive. Vos équipes l'utilisent dès le premier jour.",
          },
          {
            icon: iconBadge(GearsIcon),
            title: "Connecté à vos outils",
            description: "Jira, Asana, Monday, Teams, Slack… Pas de double saisie.",
          },
          {
            icon: iconBadge(BullseyeArrowIcon),
            title: "UX pensée pour tous",
            description: "Du chef de projet au Comex, chacun trouve l'info dont il a besoin.",
          },
        ]}
      />

      {/* 13. Testimonials — Ils parlent de nous */}
      <TestimonialsFrame
        title="Ils parlent de"
        titleHighlight="nous"
        testimonials={[
          {
            quote:
              "AirSaas nous permet de piloter notre capacité à faire en transverse avec tous les métiers. Cela rend les arbitrages comex concrets et pragmatiques.",
            name: "Sébastien Louyot",
            role: "CIO, Altavia (3000 pers.)",
          },
          {
            quote:
              "Avec AirSaas nous avons pu ritualiser nos réunions de revue projet en supprimant les PowerPoints. Toute la DSI est alignée et informée au quotidien.",
            name: "Clément Royer",
            role: "DSI, Chiesi France",
          },
        ]}
      />

      {/* 14. "Sécurité au top" — 4 trust cards (brief: ISO 27001 / Scaleway / Pentest / SSO) */}
      <ValuePropositionFrame
        tag="AirSaas passe la porte des DSI les plus exigeantes."
        titleHighlight="Sécurité"
        title="au top"
        columns={4}
      >
        <FeatureCard
          icon={
            <div className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-[0.5rem] bg-primary-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/lp-pmo/iso-27001.png"
                alt="ISO 27001"
                className="h-[3rem] w-auto object-contain"
                loading="lazy"
              />
            </div>
          }
          title="ISO 27001"
          description="Certifié"
        />
        <FeatureCard
          icon={
            <div className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-[0.5rem] bg-primary-2 text-h4">
              <span aria-label="Drapeau français">🇫🇷</span>
            </div>
          }
          title="Scaleway"
          description="Cloud souverain, hébergé en France."
        />
        <FeatureCard
          icon={iconBadge(CircleCheckIcon)}
          title="Pentest"
          description="Résultats sur demande."
        />
        <FeatureCard
          icon={iconBadge(LockSolidIcon)}
          title="SSO / SAML"
          description="Intégration Active Directory native."
        />
      </ValuePropositionFrame>

      {/* 15. Logobar — Connecté à votre écosystème (6 integrations) */}
      <section className="bg-white px-[1.5rem] md:px-[3rem] lg:px-[10rem] py-[2.5rem]">
        <LogosBar
          label="Connecté à votre écosystème"
          logos={[
            { src: `${WF_CDN}/6971e9b15f543597b4684dd2_Icon%20Jira.svg`, alt: "Jira" },
            { src: `${WF_CDN}/6971e9b16fc801abbc976e42_Icon%20Teams.svg`, alt: "Microsoft Teams" },
            { src: `${WF_CDN}/6971e9b1b1fa2f02c2f52184_Icon%20Asana.svg`, alt: "Asana" },
            { src: `${WF_CDN}/6971e9b1245015947948cdb6_Icon%20Slack.svg`, alt: "Slack" },
            { src: `${WF_CDN}/6971e9b1453821d534740d69_Icon%20Monday.svg`, alt: "Monday" },
            { src: `${WF_CDN}/6971e9b1cc77122edf3ce11a_Icon%20code.svg`, alt: "API ouverte" },
          ]}
          size="lg"
          preserveColor
        />
      </section>

      {/* 16. Steps — Comment ça marche ? (4 steps) */}
      <StepsFrame
        variant="dark"
        title="Comment ça marche ?"
        subtitle="Un déploiement en douceur, sans big bang."
        steps={[
          {
            title: "Import",
            description: "Importez votre Excel ou connectez Jira/Asana.",
          },
          {
            title: "Configuration",
            description: "Paramétrez vos équipes et workflows.",
          },
          {
            title: "Onboarding",
            description: "Accompagnement dédié par nos experts.",
          },
          {
            title: "Go Live",
            description: "Premier Quarter Plan en production.",
          },
        ]}
      />

      {/* 17. FAQ — Questions fréquentes (5 items, verbatim from live) */}
      <FaqFrame
        title="Questions"
        titleHighlight="fréquentes"
        items={[
          {
            question: "AirSaas remplace-t-il Jira ou Asana ?",
            answer:
              "Non. AirSaas se positionne au-dessus de vos outils opérationnels. Vos équipes gardent Jira/Asana pour l'exécution, AirSaas sert au pilotage stratégique du portefeuille.",
          },
          {
            question: "L'IA fonctionne-t-elle avec des données incomplètes ?",
            answer:
              "Oui. L'IA structure ce qui manque et vous permet de comparer des scénarios même avec une donnée imparfaite. Mieux vaut arbitrer avec des infos partielles que ne pas arbitrer du tout.",
          },
          {
            question: "Nos données sont-elles sécurisées ?",
            answer:
              "Oui. AirSaas est certifié ISO 27001, hébergé en France chez Scaleway. Nous mettons à disposition les résultats de pentest pour vos revues SSI.",
          },
          {
            question: "Combien de temps pour être opérationnel ?",
            answer:
              "1 mois pour le setup initial et la prise en main. Comptez 3 mois pour un Quarter Plan complet et bien ancré dans les rituels de l'organisation.",
          },
          {
            question: "Quel est le prix ?",
            answer:
              "Prix accessible. Tarification sur mesure selon la taille de votre organisation. Parlons-en lors d'une démo.",
          },
        ]}
        defaultOpenIndex={0}
      />

      {/* 18. Closing CTA — De contremaître à coach d'organisation */}
      <CtaFrame
        title="De contremaître à coach d'organisation"
        subtitle="AirSaas libère le PMO des tâches administratives pour qu'il puisse enfin se concentrer sur la stratégie."
      >
        <CardCta
          title="Réserver une démo"
          description="30 min pour voir comment AirSaas peut transformer votre quotidien."
          ctaLabel="Choisir un créneau →"
          ctaHref={FINAL_CTA_HREF}
          ctaVariant="primary"
        />
        <CardCta
          title="Voir l'outil PPM en vidéo"
          description="Comment AirSaas transforme le pilotage de portefeuille. (5 min)"
          ctaLabel="Voir la vidéo →"
          ctaHref="/fr/video/ppm"
          ctaVariant="secondary"
          gradient="orange"
        />
      </CtaFrame>
    </LandingShell>
  );
}
