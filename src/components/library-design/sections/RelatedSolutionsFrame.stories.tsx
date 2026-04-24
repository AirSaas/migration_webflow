import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RelatedSolutionsFrame } from "./RelatedSolutionsFrame";

const meta = {
  title: "Sections/CTA Sections/RelatedSolutionsFrame",
  component: RelatedSolutionsFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof RelatedSolutionsFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseSolutions = [
  {
    imageSrc: "https://placehold.co/640x400/e8eafc/3a51e2?text=Priorisation",
    imageAlt: "Aperçu de la vue de priorisation par équipes",
    title: "Priorisation par équipes",
    description:
      "Laissez chaque équipe prioriser ses projets en fonction de sa charge disponible.",
    href: "/produit/priorisation-par-equipes",
  },
  {
    imageSrc: "https://placehold.co/640x400/e8eafc/3a51e2?text=Capacity",
    imageAlt: "Aperçu du module de capacity planning",
    title: "Capacity planning",
    description:
      "Anticipez les surcharges et les sous-charges par équipe avant qu'elles ne bloquent vos projets.",
    href: "/produit/capacity-planning",
  },
  {
    imageSrc: "https://placehold.co/640x400/e8eafc/3a51e2?text=Reporting",
    imageAlt: "Aperçu du reporting projet automatisé",
    title: "Reporting projet",
    description:
      "Générez en un clic le bilan d'un projet avec les métriques et les retours de l'équipe.",
    href: "/produit/reporting-projet",
  },
];

/**
 * Canonical LP usage — 3 image cards + chevron link on each. Light
 * background so the card chrome (border + shadow on hover) pops.
 */
export const DefaultThreeSolutions: Story = {
  args: {
    tag: "EXPLORER",
    titleHighlight: "Découvrez",
    title: "toute la plateforme AirSaas",
    subtitle:
      "Priorisation, capacité, reporting : chaque module d'AirSaas s'appuie sur les autres pour former un portefeuille vraiment piloté.",
    solutions: baseSolutions,
    linkLabel: "Voir plus",
  },
};

/**
 * With collection CTA — adds a "Voir toutes nos solutions" button below
 * the grid, linking to the full platform directory. Use when the page has
 * more than 3 relevant solutions to surface.
 */
export const WithCollectionCta: Story = {
  args: {
    ...DefaultThreeSolutions.args,
    collectionCtaLabel: "Voir toutes nos solutions",
    collectionCtaHref: "/produit",
  },
};

/**
 * Tinted variant — lavender background. Use when the preceding section is
 * white, for visual rhythm.
 */
export const Tinted: Story = {
  args: {
    ...DefaultThreeSolutions.args,
    variant: "tinted",
  },
};

/**
 * No heading highlight — single dark-gradient title for sections where
 * the cross-sell is less call-to-action-y.
 */
export const NoHighlight: Story = {
  args: {
    title: "D'autres fonctionnalités AirSaas",
    solutions: baseSolutions,
    linkLabel: "Voir plus",
  },
};
