import type { Metadata } from "next";
import { Hero } from "@/components/library-design/sections/Hero";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { ComparisonFrame } from "@/components/library-design/sections/ComparisonFrame";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { TestimonialsFrame } from "@/components/library-design/sections/TestimonialsFrame";
import { StepsFrame } from "@/components/library-design/sections/StepsFrame";
import { FaqFrame } from "@/components/library-design/sections/FaqFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { FeatureCard } from "@/components/library-design/ui/FeatureCard";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import { LandingShell, LANDING_NAV } from "@/components/layout/LandingShell";
import {
  CalendarDayIcon,
  StopwatchIcon,
  ClipboardCheckIcon,
  CalendarStarIcon,
  BoltLightningIcon,
  BullseyeArrowIcon,
  CommentsIcon,
  CircleCheckIcon,
  LockKeyholeIcon,
} from "@/components/library-design/ui/icons/illustration-icons";

/**
 * LP PMO — Bespoke landing page implemented from Figma.
 *
 * Source : Figma file `stwOIKqkRzLAXL8oE9dAeU`, node `328:1095` (LP PMO)
 * Designed by Marisella, implemented 2026-05-07 (pivot Figma-first).
 *
 * Composition pattern : 1 file = 1 page. Each section composes a DS Storybook
 * primitive. Copy + image paths are inline (Figma is source of truth).
 * To change the navbar globally → edit Navbar.tsx (DS) or LANDING_NAV
 * (in LandingShell.tsx). To change footer → idem.
 */

export const metadata: Metadata = {
  title: "AirSaas — L'outil des PMO modernes",
  description:
    "AirSaas vous donne les outils pour passer de \"celui qui fait les PowerPoints\" à \"celui qui pilote la transformation\".",
};

const HERO_PRIMARY_CTA = { label: "Réservez une démo", href: "/fr/meetings-pages" };
const HERO_SECONDARY_CTA = {
  label: "Découvrir l'outil PMO en vidéo (5 min)",
  href: "#video",
};

const FINAL_CTA_HREF = "/fr/meetings-pages";

function iconBadge(Icon: React.ComponentType, variant: "light" | "dark" = "dark") {
  return (
    <IconIllustration variant={variant} size="lg">
      <Icon />
    </IconIllustration>
  );
}

export default function PmoPage() {
  return (
    <LandingShell>
      {/* 1. Hero */}
      <Hero
        navItems={LANDING_NAV.items}
        navCtaLabel={LANDING_NAV.ctaLabel}
        navCtaHref={LANDING_NAV.ctaHref}
        loginLabel={LANDING_NAV.loginLabel}
        loginHref={LANDING_NAV.loginHref}
        topTag={{ label: "L'outil des PMO modernes", variant: "muted" }}
        title="80 projets côté DSI. 80 côté Marketing."
        titleHighlight="80 côté Finance. Et toujours pas de vue commune au Codir ?"
        subtitle={
          'AirSaas vous donne les outils pour passer de "celui qui fait les PowerPoints" à "celui qui pilote la transformation".'
        }
        bottomTags={[
          { label: "+100 clients nous font confiance", variant: "success" },
          { label: "Accompagnement premium inclus", variant: "success" },
        ]}
        primaryCta={HERO_PRIMARY_CTA}
        secondaryCta={HERO_SECONDARY_CTA}
        imageSrc="/assets/lp-pmo/hero.png"
        imageAlt="Capture d'écran du dashboard AirSaas — vue Quarter Plan avec KPI projets"
        floatingCards
      />

      {/* 2. Stats — Les chiffres qui vous feront adopter AirSaas */}
      <ValuePropositionFrame
        titleHighlight="Les chiffres"
        title="qui vous feront adopter AirSaas"
        columns={4}
      >
        <FeatureCard
          icon={iconBadge(CalendarDayIcon)}
          title="-80%"
          description="de réunions « statut projet »"
        />
        <FeatureCard
          icon={iconBadge(StopwatchIcon)}
          title="5 min"
          description="semaine / chef de projet"
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
      </ValuePropositionFrame>

      {/* 3. ComparisonFrame — Le quotidien du PMO aujourd'hui */}
      <ComparisonFrame
        emoji="⚠️"
        title="Le quotidien du PMO aujourd'hui"
        subtitle=""
        items={[
          {
            value: "01",
            description: (
              <>
                Vous <strong>courez après les chefs de projet</strong> pour avoir des infos à jour
              </>
            ),
          },
          {
            value: "02",
            description: (
              <>
                Les demandes arrivent floues : <strong>« on veut un truc »</strong> sans brief clair
              </>
            ),
          },
          {
            value: "03",
            description: (
              <>
                Vos PowerPoints de CoPil prennent <strong>2 jours à produire</strong>
              </>
            ),
          },
          {
            value: "04",
            description: (
              <>
                Les décisions se perdent dans les CR et <strong>personne ne sait ce qui a été tranché</strong>
              </>
            ),
          },
        ]}
      />

      {/* 4. Feature 1 — Agent IA de qualification des demandes */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="Intelligence Artificielle"
        titleHighlight="Agent IA"
        title="de qualification des demandes"
        subtitle="Quand une demande arrive floue (« on veut un truc »), l'agent IA mène l'entretien, collecte les informations critiques et transforme chaque demande en brief clair et comparable."
        checklist={[
          "Entretien guidé par l'IA",
          "Brief structuré selon vos templates",
          "Demandes comparables entre elles",
          "Dites non plus tôt, lancez moins de projets… mais mieux",
        ]}
        imageSrc="/assets/lp-pmo/feature-01-agent-ia.png"
        imageAlt="Interface de l'agent IA de qualification AirSaas"
      />

      {/* 5. Feature 2 — Email Bilan de santé hebdomadaire */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="Communication automatisée"
        title={
          <>
            Email <span className="text-primary">« Bilan de santé »</span> hebdomadaire
          </>
        }
        subtitle="Chaque lundi, les sponsors reçoivent l'essentiel sur leurs projets. Sans que vous ayez à lever le petit doigt. Fini la course à l'info."
        checklist={[
          "Envoi automatique programmable",
          "Personnalisé par sponsor / direction",
          "Météo projet en un coup d'œil",
          "Lien vers le détail dans AirSaas",
        ]}
        imageSrc="/assets/lp-pmo/feature-02-bilan-sante.png"
        imageAlt="Capture de l'email bilan de santé envoyé aux sponsors"
      />

      {/* 6. Feature 3 — Flash Report en 1 clic */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="Gain de temps immédiat"
        titleHighlight="Flash Report"
        title="en 1 clic"
        titleHighlightAtEnd={false}
        subtitle="Fini les 2 jours de PowerPoint. En un clic, générez un rapport complet, à jour, aux couleurs de votre entreprise. Le Comex est informé, vous êtes libre."
        checklist={[
          "Export PDF, PPT ou lien web",
          "Personnalisable aux couleurs de l'entreprise",
          "Données toujours à jour",
          "Envoi automatique programmable",
        ]}
        imageSrc="/assets/lp-pmo/feature-03-flash-report.png"
        imageAlt="Capture du Flash Report AirSaas généré en un clic"
      />

      {/* 7. Feature 4 — Kanban des décisions */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="Nouveau"
        titleHighlight="décisions"
        title="Kanban des"
        titleHighlightAtEnd
        subtitle="Les décisions changent, se perdent dans les CR. AirSaas les centralise : owner, échéance, statut, impact sur la roadmap. Quand les décisions deviennent visibles, l'exécution redevient cohérente."
        checklist={[
          "Owner et échéance assignés",
          "Impact visible sur la roadmap",
          "Plus rien ne se perd",
        ]}
        imageSrc="/assets/lp-pmo/feature-04-kanban-decisions.png"
        imageAlt="Capture du Kanban des décisions AirSaas"
      />

      {/* 8. Feature 5 — Cadrage projet guidé */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="Structuration"
        titleHighlight="Cadrage"
        title="projet guidé"
        subtitle="Les utilisateurs sont accompagnés pour remplir les informations essentielles : gains espérés, critères de réussite, effort. Quand le niveau de remplissage est suffisant, le projet peut partir en validation."
        checklist={[
          "Workflow structuré",
          "Remplissage collaboratif et asynchrone",
          "Niveau de complétude visible",
          "Validation en comité simplifiée",
        ]}
        imageSrc="/assets/lp-pmo/feature-05-cadrage.png"
        imageAlt="Capture du cadrage projet guidé AirSaas"
      />

      {/* 9. Feature 6 — KPI Taux d'avancement Quarter Plan */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="Quarter Plan"
        titleHighlight="KPI"
        title=" : Taux d'avancement du Quarter Plan"
        subtitle="Mesurez l'écart entre ce qu'on s'est engagé à livrer et ce qui est réellement livré. En un coup d'œil : 10%, 50% ou 100% de l'engagement tenu. Et surtout : ce qui a bloqué."
        checklist={[
          "Taux de delivery par trimestre",
          "Identification des blocages",
          "Amélioration cycle après cycle",
          "KPI objectif pour le Comex",
        ]}
        imageSrc="/assets/lp-pmo/feature-06-kpi-quarter-plan.png"
        imageAlt="Capture du KPI Taux d'avancement Quarter Plan AirSaas"
      />

      {/* 10. Feature 7 — Planification trimestrielle structurée */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="Quarter Plan"
        titleHighlight="Planification trimestrielle"
        title="structurée"
        subtitle="Synchronisez toute l'organisation sur un cycle trimestriel. Chaque quarter, on refait le point : qu'est-ce qu'on a livré, qu'est-ce qu'on priorise pour les 3 prochains mois ?"
        checklist={[
          "Rituels de planification cadrés",
          "Engagements clairs par équipe",
          "Rétrospective intégrée",
          "Alignement DSI / Métiers / Comex",
        ]}
        imageSrc="/assets/lp-pmo/feature-07-planification.png"
        imageAlt="Capture de la planification trimestrielle structurée AirSaas"
      />

      {/* 11. Feature 8 — Gestion de la capacité par équipe */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="Capacitaire"
        titleHighlight="Gestion de la capacité"
        title="par équipe"
        subtitle="Visualisez la charge vs capacité de chaque équipe. Identifiez les surcharges avant qu'elles ne créent de la friction. Répondez enfin à « peut-on prendre ce projet ? »"
        checklist={[
          "Vue capacité par équipe et par trimestre",
          "Alerte surcharge automatique",
          "T-shirt sizing (S, M, L, XL)",
          "Scénarios d'arbitrage",
        ]}
        imageSrc="/assets/lp-pmo/feature-08-capacite.png"
        imageAlt="Capture de la gestion de capacité par équipe AirSaas"
      />

      {/* 12. Feature 9 — Vision globale du portefeuille */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="Vue macro"
        titleHighlight="Vision globale"
        title="du portefeuille"
        subtitle="80 projets côté DSI. 80 côté Marketing. 80 côté Finance. Avec AirSaas, vous avez enfin une vue consolidée pour le Codir. Filtrez par direction, météo, priorité."
        checklist={[
          "Consolidation multi-directions",
          "Vue Liste, Kanban, Timeline, Dashboard",
          "Filtres personnalisables",
          "Export Comex en 1 clic",
        ]}
        imageSrc="/assets/lp-pmo/feature-09-vision-globale.png"
        imageAlt="Capture de la vision globale du portefeuille AirSaas"
      />

      {/* 13. ValuePropositionFrame dark — De contremaître à coach d'organisation */}
      <ValuePropositionFrame
        variant="dark"
        title="De contremaître à coach d'organisation"
        subtitle="AirSaas libère le PMO des tâches administratives pour qu'il puisse enfin se concentrer sur la stratégie."
        columns={3}
      >
        <FeatureCard
          variant="dark"
          icon={iconBadge(BoltLightningIcon, "light")}
          title="- reporting"
          description="Flash report automatique. Fini les 2 jours de PowerPoint."
        />
        <FeatureCard
          variant="dark"
          icon={iconBadge(BullseyeArrowIcon, "light")}
          title="+ d'impact"
          description="Focus sur la priorisation et les arbitrages, pas sur la collecte d'info."
        />
        <FeatureCard
          variant="dark"
          icon={iconBadge(CommentsIcon, "light")}
          title="Aligné"
          description="Une vue commune pour la DSI, les métiers et le Comex."
        />
      </ValuePropositionFrame>

      {/* 14. Testimonials — Ils parlent de nous */}
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
              "Aujourd'hui mon quotidien c'est plutôt d'aller animer des ateliers en direction. Je suis positionné comme le bras droit du DSI.",
            name: "Alexandre F.",
            role: "PMO",
          },
        ]}
      />

      {/* 15. Trust badges — Sécurité au top */}
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
          title="Hébergé"
          description="Données en France, cloud souverain."
        />
        <FeatureCard
          icon={iconBadge(CircleCheckIcon)}
          title="Pentest"
          description="Résultats sur demande."
        />
        <FeatureCard
          icon={iconBadge(LockKeyholeIcon)}
          title="SSO/SAML"
          description="Intégration Active Directory native."
        />
      </ValuePropositionFrame>

      {/* 16. Steps — Comment ça marche ? */}
      <StepsFrame
        variant="dark"
        title="Comment ça marche ?"
        subtitle="Un déploiement en douceur, sans big bang."
        steps={[
          {
            title: "Import",
            description: "Importez votre portefeuille existant.",
          },
          {
            title: "Rituels",
            description: "Définissez vos rituels de gouvernance.",
          },
          {
            title: "Équipes",
            description: "Embarquez les chefs de projet.",
          },
          {
            title: "Impact",
            description: "Premier Quarter Plan réussi.",
          },
        ]}
      />

      {/* 17. FAQ */}
      <FaqFrame
        title="Questions"
        titleHighlight="fréquentes"
        items={[
          {
            question: "Les chefs de projet vont-ils vraiment l'utiliser ?",
            answer:
              "Oui. AirSaas remplace les tableaux Excel et les emails de relance. Le bénéfice utilisateur est direct : moins de saisie, moins de réunions de statut, plus de temps sur ce qui crée de la valeur.",
          },
          {
            question: "Comment fonctionne l'agent IA de qualification ?",
            answer:
              "L'agent mène un entretien guidé avec le demandeur pour collecter les informations critiques (objectif, gain attendu, effort, parties prenantes), puis structure un brief comparable selon vos templates.",
          },
          {
            question: "Combien de temps pour un Quarter Plan complet ?",
            answer:
              "Comptez 1 mois pour un premier Quarter Plan complet : import du portefeuille, configuration des rituels, embarquement des chefs de projet, premier cycle de planification.",
          },
          {
            question: "Comment AirSaas s'intègre à nos outils existants ?",
            answer:
              "Intégrations natives avec Jira, Asana, Monday, Teams, Slack. API ouverte pour le reste. Vos équipes gardent leurs habitudes.",
          },
        ]}
        defaultOpenIndex={3}
      />

      {/* 18. Closing CTA — Prêt à devenir le PMO stratégique ? */}
      <CtaFrame
        title="Prêt à devenir le PMO stratégique ?"
        subtitle="AirSaas libère le PMO des tâches administratives pour qu'il puisse enfin se concentrer sur la stratégie."
      >
        <CardCta
          title="Réserver une démo"
          description="30 min pour voir comment AirSaas peut transformer votre quotidien de PMO."
          ctaLabel="Choisir un créneau →"
          ctaHref={FINAL_CTA_HREF}
          ctaVariant="primary"
        />
        <CardCta
          title="Voir l'outil PMO en vidéo"
          description="Comment AirSaas transforme le quotidien des PMO. (5 min)"
          ctaLabel="Voir la vidéo →"
          ctaHref="#video"
          ctaVariant="secondary"
          gradient="orange"
        />
      </CtaFrame>
    </LandingShell>
  );
}
