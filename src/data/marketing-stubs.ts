/**
 * Marketing stub pages — minimal placeholders for the 5 marketing landings
 * referenced from navbar/footer in the parsed Webflow content but not yet
 * rebuilt with full DS sections.
 *
 * Each stub renders a Hero-style section + intro + outbound CTA pointing
 * to the canonical live page. Eliminates the broken-link P1 hits while a
 * full rebuild is scheduled.
 */

export interface MarketingStub {
  slug: string;
  /** SEO title (browser tab + meta). */
  title: string;
  /** Page H1 (what the user sees). */
  h1: string;
  /** Short intro paragraph below the H1. */
  intro: string;
  /** Optional bullets describing the page focus. */
  bullets?: string[];
  /** Outbound CTA to the live page until the full rebuild ships. */
  liveUrl: string;
  /** Closest related rebuild page to link to (in addition to the live URL). */
  relatedHref?: string;
  relatedLabel?: string;
}

export const MARKETING_STUBS: MarketingStub[] = [
  {
    slug: "les-integrations",
    title: "Intégrations | AirSaas",
    h1: "Les intégrations AirSaas",
    intro:
      "AirSaas s'intègre nativement à vos outils du quotidien — Jira, Asana, Microsoft Teams, Notion et bien d'autres. Synchronisez vos données projet sans double saisie.",
    bullets: [
      "Connecteurs Jira / Asana / Notion / Monday",
      "Microsoft Teams : portfolio, flash report et copil dans Teams",
      "Webhooks et API ouvertes pour intégrer vos systèmes internes",
    ],
    liveUrl: "https://www.airsaas.io/fr/les-integrations",
    relatedHref: "/fr/lp/ppm",
    relatedLabel: "Découvrir AirSaas",
  },
  {
    slug: "les-nouveautes-produit",
    title: "Nouveautés produit | AirSaas",
    h1: "Les dernières nouveautés sur AirSaas",
    intro:
      "Suivez les nouvelles fonctionnalités, améliorations et intégrations livrées par l'équipe AirSaas — généralement tous les 15 jours.",
    bullets: [
      "Nouvelles vues et options de reporting",
      "Améliorations UX et performance",
      "Nouveaux connecteurs et intégrations",
    ],
    liveUrl: "https://www.airsaas.io/fr/les-nouveautes-produit",
    relatedHref: "/fr/blog/articles",
    relatedLabel: "Lire le blog",
  },
  {
    slug: "quarter-plan",
    title: "Quarter Plan | AirSaas",
    h1: "Le Quarter Plan",
    intro:
      "Le Quarter Plan est la méthode AirSaas pour donner du rythme à votre roadmap projet : aligner capacité à faire et demandes entrantes, structurer vos arbitrages trimestriels.",
    bullets: [
      "Vision macro de la charge équipes vs demandes",
      "Arbitrages explicites et tracés sur le portefeuille",
      "Rituel trimestriel cadré, partagé entre IT et métiers",
    ],
    liveUrl: "https://www.airsaas.io/fr/quarter-plan",
    relatedHref: "/fr/lp/capacity-planning",
    relatedLabel: "Capacity Planning",
  },
  {
    slug: "microsoft-teams-airsaas",
    title: "AirSaas + Microsoft Teams | AirSaas",
    h1: "AirSaas + Teams : Là où vos projets prennent vie",
    intro:
      "L'intégration native AirSaas × Microsoft Teams : portfolio, flash report et copil directement dans Teams. Vos équipes restent dans leur outil préféré, vous gardez la vue macro.",
    bullets: [
      "Notifications projet dans les channels Teams",
      "Flash reports automatisés partagés en 1 clic",
      "Tableau de bord portfolio embarqué dans Teams",
    ],
    liveUrl: "https://www.airsaas.io/fr/microsoft-teams-airsaas",
    relatedHref: "/fr/solutions/airsaas-et-les-experts-de-la-transfo",
    relatedLabel: "Voir les solutions",
  },
  {
    slug: "pourquoi-airsaas",
    title: "Pourquoi AirSaas | AirSaas",
    h1: "Pourquoi AirSaas ?",
    intro:
      "AirSaas est conçu pour les DSI, PMO et directions de la transformation qui ont besoin d'une vue macro consolidée sur leur portefeuille projets — sans complexité Excel ni rigidité Jira.",
    bullets: [
      "Une vue portefeuille consolidée, partageable au COMEX",
      "Un capacity planning par équipe simple à maintenir",
      "Un reporting flash automatisé, généré en 1 clic",
      "Une UX moderne adoptée par toute l'organisation",
    ],
    liveUrl: "https://www.airsaas.io/fr/pourquoi-airsaas",
    relatedHref: "/fr/lp/ppm",
    relatedLabel: "Découvrir AirSaas",
  },
];

export const MARKETING_STUBS_BY_SLUG: Record<string, MarketingStub> =
  Object.fromEntries(MARKETING_STUBS.map((s) => [s.slug, s]));
