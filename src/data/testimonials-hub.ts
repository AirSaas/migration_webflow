/**
 * Témoignages hub data — 9 customer case-study titles aggregated from
 * airsaas.io/fr/temoignages live page.
 *
 * Until individual /fr/temoignages/{slug} routes ship, the hub displays
 * teaser cards as a grid. Cards link to the related landing for now.
 */

export interface TestimonialHubCard {
  title: string;
  /** Optional company / product context line under the title. */
  context?: string;
  /** Outbound link — falls back to the demo page if no detail page exists. */
  href: string;
}

export const TESTIMONIALS_HUB: TestimonialHubCard[] = [
  {
    title:
      "Roadmap DSI : Comment structurer votre pilotage projet grâce au Quarter Plan ?",
    context: "DSI / PMO — démarche structurée",
    href: "/fr/lp/ppm",
  },
  {
    title: "Donner du rythme à la roadmap projet grâce au Quarter Plan",
    context: "Quarter Plan",
    href: "/fr/lp/ppm",
  },
  {
    title: "Aligner capacité à faire et demandes entrantes grâce au Quarter Plan",
    context: "Capacity Planning",
    href: "/fr/lp/capacity-planning",
  },
  {
    title: "Améliorer son suivi de mission en tant qu'indépendant",
    context: "Indépendants & ESN",
    href: "/fr/solutions/airsaas-et-les-experts-de-la-transfo",
  },
  {
    title: "Rationaliser les rituels autour du portfolio projet",
    context: "PMO & Direction de la Transformation",
    href: "/fr/solutions/management-de-portefeuille-projet",
  },
  {
    title:
      "Copiloter la stratégie et les opérations grâce à AirSaas + Asana — Groupe Intuis",
    context: "Groupe Intuis · DSI",
    href: "/fr/solutions/management-de-portefeuille-projet",
  },
  {
    title:
      "Transformer la relation entre l'IT et les métiers et se focaliser sur la valeur avec AirSaas — Comexposium",
    context: "Comexposium · DSI",
    href: "/fr/equipes/it-et-operation",
  },
  {
    title:
      "Renforcer les liens de confiance avec les directions métiers grâce à AirSaas — Indexia Group",
    context: "Indexia Group · DSI",
    href: "/fr/equipes/it-et-operation",
  },
  {
    title: "Fédérer le CODIR pour transformer, en tant que manager de transition",
    context: "Manager de transition",
    href: "/fr/equipes/comite-direction",
  },
];
