import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hero } from "./Hero";

const defaultNavItems = [
  { label: "Solutions", hasDropdown: true },
  { label: "Produit", hasDropdown: true },
  { label: "Ressources", hasDropdown: true },
  { label: "Témoignages", href: "#" },
  { label: "Intégrations", href: "#" },
  { label: "Nouveautés", href: "#" },
  { label: "Le Quarter Plan", href: "#" },
  { label: "Intégration teams", href: "#" },
];

const meta = {
  title: "Sections/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navItems: defaultNavItems,
    navCtaLabel: "Demander une démo",
    navCtaHref: "#",
    loginLabel: "Login",
    loginHref: "#",
    topTag: {
      label: "Capacity Planning simplifié",
      variant: "muted",
    },
    title: "Vos équipes sont surchargées ? C'est normal :",
    titleHighlight: "personne ne sait ce qu'elles peuvent vraiment faire.",
    subtitle:
      'AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire "non" avec des données, pas au feeling.',
    primaryCta: {
      label: "Réservez une démo",
      href: "#",
    },
    secondaryCta: {
      label: "Découvrir l'outil PPM en vidéo (5 min)",
      href: "#",
    },
    bottomTags: [
      { label: "Opérationnel en 1 mois", variant: "success" },
      { label: "Accompagnement premium inclus", variant: "success" },
    ],
    imageSrc:
      "https://placehold.co/1457x857/e8eafc/3a51e2?text=Product+Screenshot",
    imageAlt: "AirSaas product screenshot",
  },
};

export const Minimal: Story = {
  args: {
    title: "Build better products with",
    titleHighlight: "capacity planning that works.",
    subtitle:
      "Get a clear, actionable view of your team capacity. Finally say no with data, not gut feeling.",
    primaryCta: {
      label: "Get Started",
      href: "#",
    },
  },
};

export const Split: Story = {
  args: {
    variant: "light",
    layout: "split",
    navItems: defaultNavItems,
    navCtaLabel: "Demander une démo",
    navCtaHref: "#",
    loginLabel: "Login",
    loginHref: "#",
    eyebrow: "Solution",
    title: "The project portfolio management tool",
    titleHighlight: "that revolutionizes your governance",
    subtitle:
      "AirSaas a été conçu pour vous aider à transformer votre entreprise de manière efficace, en vous faisant gagner en temps et en visibilité sur votre portfolio. Révolutionnez votre management de portefeuille de projet en gardant une vision précise de vos priorités, des décisions à prendre, et en communiquant mieux au quotidien.",
    primaryCta: {
      label: "Book a demo",
      href: "#",
    },
    imageSrc:
      "https://placehold.co/960x720/e8eafc/3a51e2?text=Product+Screenshot",
    imageAlt: "AirSaas product screenshot",
  },
};

export const SplitDark: Story = {
  args: {
    variant: "dark",
    layout: "split",
    navItems: defaultNavItems,
    navCtaLabel: "Request a demo",
    navCtaHref: "#",
    loginLabel: "Login",
    loginHref: "#",
    eyebrow: "Solution",
    title: "The project portfolio management tool that revolutionizes your governance",
    subtitle:
      "AirSaas a été conçu pour vous aider à transformer votre entreprise de manière efficace, en vous faisant gagner en temps et en visibilité sur votre portfolio. Révolutionnez votre management de portefeuille de projet en gardant une vision précise de vos priorités, des décisions à prendre, et en communiquant mieux au quotidien.",
    primaryCta: {
      label: "Book a demo",
      href: "#",
    },
    imageSrc:
      "https://placehold.co/960x720/e8eafc/3a51e2?text=Product+Screenshot",
    imageAlt: "AirSaas product screenshot",
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
    navItems: defaultNavItems,
    navCtaLabel: "Demander une démo",
    navCtaHref: "#",
    loginLabel: "Login",
    loginHref: "#",
    topTag: {
      label: "Capacity Planning simplifié",
      variant: "muted",
    },
    title: "Capacity planning:",
    titleHighlight: "can you really carry out these projects?",
    subtitle:
      'AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire "non" avec des données, pas au feeling.',
    primaryCta: {
      label: "Réservez une démo",
      href: "#",
    },
    secondaryCta: {
      label: "Découvrir l'outil PPM en vidéo (5 min)",
      href: "#",
    },
    bottomTags: [
      { label: "Opérationnel en 1 mois", variant: "success" },
      { label: "Accompagnement premium inclus", variant: "success" },
    ],
    imageSrc:
      "https://placehold.co/1457x857/e8eafc/3a51e2?text=Product+Screenshot",
    imageAlt: "AirSaas product screenshot",
  },
};

/**
 * LP PPM hero — static screen variant.
 *
 * Pending refinement of the tabbed switcher visual (see `TabbedMedia`), the
 * canonical LP PPM hero uses a single fixed Portfolio dashboard screenshot
 * below the title/CTAs. Switch back to `mediaTabs={ppmTabs}` once the chrome
 * styling is signed off.
 */
export const PpmLanding: Story = {
  args: {
    navItems: defaultNavItems,
    navCtaLabel: "Demander une démo",
    navCtaHref: "#",
    loginLabel: "Login",
    loginHref: "#",
    eyebrow: "OUTIL PPM",
    title: "Un PPM avec une UX au top ?",
    titleHighlight: "Ça existe.",
    subtitle:
      "Brief projet assisté par IA, flash report en 1 clic, roadmap partageable, vue macro consolidée. L'outil PPM que votre équipe va vraiment adopter.",
    primaryCta: {
      label: "Réservez une démo",
      href: "/fr/meetings-pages",
    },
    secondaryCta: {
      label: "▶️ Découvrir l'outil PPM en vidéo (5 min)",
      href: "/fr/video/ppm",
    },
    bottomTags: [
      { label: "+100 clients nous font confiance", variant: "success" },
      { label: "Opérationnel en 1 mois", variant: "success" },
      { label: "Accompagnement premium inclus", variant: "success" },
    ],
    imageSrc: "/assets/images/lp-ppm/dashboards/hero-portfolio-q1-2025.webp",
    imageAlt:
      "Tableau de bord PPM AirSaas — Vue Portfolio Q1 2025 avec météo, statut et suivi des livrables",
    floatingCards: false,
  },
};

// Reusable tab definitions for the LP PPM hero. Left here to be wired back
// into a `TabbedMedia` story once the tabbed-switcher visual is finalized.
const _ppmTabs = [
  {
    icon: "/assets/images/lp-ppm/icons/icon-portfolio-color.svg",
    label: "Portfolio",
    imageSrc: "/assets/images/lp-ppm/dashboards/portfolio.webp",
    imageAlt: "Portfolio consolidé multi-vues",
  },
  {
    icon: "/assets/images/lp-ppm/icons/icon-quarter-plan-color.svg",
    label: "Quarter plan",
    // No specific Quarter plan dashboard was surfaced in the live page asset list —
    // using the AI scenarios screen as the closest planning-view stand-in.
    imageSrc: "/assets/images/lp-ppm/dashboards/scenarios.webp",
    imageAlt: "Quarter plan trimestriel",
  },
  {
    icon: "/assets/images/lp-ppm/icons/icon-capacity-color.svg",
    label: "Capacitaire",
    imageSrc: "/assets/images/lp-ppm/dashboards/capacity.webp",
    imageAlt: "Capacité par quarter et par équipe",
  },
  {
    icon: "/assets/images/lp-ppm/icons/icon-priorisation-color.svg",
    label: "Priorisation",
    imageSrc: "/assets/images/lp-ppm/dashboards/priorisation.webp",
    imageAlt: "Priorisation explicite #1, #2, #3",
  },
  {
    icon: "/assets/images/lp-ppm/icons/icon-roadmap-color.svg",
    label: "Roadmap",
    imageSrc: "/assets/images/lp-ppm/dashboards/roadmap.webp",
    imageAlt: "Roadmap COMEX partageable",
  },
  {
    icon: "/assets/images/lp-ppm/icons/icon-report-color.svg",
    label: "Reporting",
    imageSrc: "/assets/images/lp-ppm/dashboards/reporting.webp",
    imageAlt: "Flash Report en 1 clic",
  },
];
void _ppmTabs;

/**
 * Five trust badges — live LP PPM pattern.
 *
 * Mirrors the Hero on `airsaas.io/fr/lp/ppm` which shows 5 trust badges
 * below the CTAs (point [1.11] of audit-lp-rebuild-2026-04-27.md). The
 * `bottomTags` limit was relaxed from 0-4 to 0-6 (commit 2026-04-27) to
 * support this canonical pattern. Use as copy-paste reference when fixing
 * the LP PPM rebuild.
 */
export const FiveTrustBadges: Story = {
  args: {
    eyebrow: "OUTIL PPM",
    title: "Un PPM avec une UX au top ?",
    titleHighlight: "Ça existe.",
    subtitle:
      "Brief projet assisté par IA, flash report en 1 clic, roadmap partageable, vue macro consolidée. L'outil PPM que votre équipe va vraiment adopter.",
    primaryCta: {
      label: "Réservez une démo",
      href: "/fr/meetings-pages",
    },
    secondaryCta: {
      label: "▶️ Découvrir l'outil PPM en vidéo (5 min)",
      href: "/fr/video/ppm",
    },
    bottomTags: [
      { label: "+100 clients nous font confiance", variant: "success" },
      { label: "no credit card", variant: "success" },
      { label: "Opérationnel en 1 mois", variant: "success" },
      { label: "all features", variant: "success" },
      { label: "Accompagnement premium inclus", variant: "success" },
    ],
    imageSrc:
      "https://placehold.co/1457x857/e8eafc/3a51e2?text=Flash+Report+Screenshot",
    imageAlt: "AirSaas flash report screenshot",
  },
};
