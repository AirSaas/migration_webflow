import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HighlightFrame } from "./HighlightFrame";

const meta = {
  title: "Sections/Highlight Sections/HighlightFrame",
  component: HighlightFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HighlightFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Highlight — a stacked, zigzagged list of numbered concept cards.
 * Useful for "Les concepts que nous aborderons", curriculum outlines,
 * agenda sections, etc.
 */
export const Default: Story = {
  args: {
    titleHighlight: "Les concepts",
    title: "que nous aborderons",
    subtitle:
      "À travers les cas concrets présentés par des pairs et des experts ce sont des concepts de la transformation outillée que nous découvrirons.",
    items: [
      {
        value: 1,
        description:
          "La bonne posture pour le changement — en poste ou consultant·e, être celle ou celui qui construit le meilleur Target Operating Model pour l'organisation.",
      },
      {
        value: 2,
        description:
          "Le Diag Orga — comment identifier ce qui affecte véritablement le delivery dans l'orga ?",
      },
      {
        value: 3,
        description:
          "Le pilotage par la valeur — arbitrer les priorités avec les bonnes données plutôt qu'au feeling.",
      },
      {
        value: 4,
        description:
          "La conduite du changement — embarquer les équipes terrain au-delà de la note de service.",
      },
      {
        value: 5,
        description:
          "Le flash report — communiquer au COMEX sans passer deux jours sur un slide.",
      },
    ],
  },
};

export const ShortList: Story = {
  args: {
    titleHighlight: "3 étapes",
    title: "pour structurer votre gouvernance",
    subtitle:
      "Une méthode simple et éprouvée, appliquée chez plus de 100 entreprises.",
    items: [
      {
        value: 1,
        description:
          "Cadrer — aligner les parties prenantes sur les priorités et les critères de décision.",
      },
      {
        value: 2,
        description:
          "Outiller — donner à chaque acteur les bons tableaux de bord pour décider vite.",
      },
      {
        value: 3,
        description:
          "Animer — installer un rituel régulier de revue de portefeuille qui tient dans le temps.",
      },
    ],
  },
};
