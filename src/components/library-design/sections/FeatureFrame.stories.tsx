import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeatureFrame } from "./FeatureFrame";

const meta = {
  title: "Sections/FeatureFrame",
  component: FeatureFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof FeatureFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageRight: Story = {
  args: {
    imagePosition: "right",
    tag: "Intelligence Artificielle",
    titleHighlight: "Agent IA",
    title: "Brief projet",
    description:
      'Quand une demande arrive floue ("on veut un truc"), l\'agent IA mène l\'entretien, collecte les informations critiques et transforme chaque demande en brief clair et comparable.',
    checklist: [
      "Entretien guidé par l'IA",
      "Brief structuré automatiquement",
      "Comparaison objective des demandes",
      "Intégration native avec vos outils",
    ],
    ctaLabel: "Découvrir",
    ctaHref: "#",
    imageSrc: "https://placehold.co/1125x696/e8eafc/3a51e2?text=Product+Screenshot",
  },
};

export const ImageLeft: Story = {
  args: {
    imagePosition: "left",
    tag: "Capacity Planning",
    titleHighlight: "Vue capacitaire",
    title: "en temps réel",
    description:
      "Visualisez instantanément la charge de vos équipes, identifiez les surcharges et anticipez les conflits de ressources avant qu'ils n'impactent vos projets.",
    checklist: [
      "Vision macro des capacités",
      "Alertes automatiques de surcharge",
      "Simulation de scénarios",
      "Export pour le COMEX",
    ],
    ctaLabel: "En savoir plus",
    ctaHref: "#",
    imageSrc: "https://placehold.co/1125x731/fffbeb/e58d05?text=Product+Screenshot",
    imageBgColor: "#fffbeb",
  },
};

export const WithoutChecklist: Story = {
  args: {
    imagePosition: "right",
    titleHighlight: "Roadmap",
    title: "collaborative",
    description:
      "Partagez une roadmap unique entre toutes les parties prenantes. Chaque changement est visible en temps réel.",
    ctaLabel: "Découvrir la roadmap",
    imageSrc: "https://placehold.co/1125x696/f3f3fc/3a51e2?text=Roadmap",
  },
};
