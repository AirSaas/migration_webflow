import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ComparisonFrame } from "./ComparisonFrame";

const meta = {
  title: "Sections/Comparison Sections/ComparisonFrame/Default",
  component: ComparisonFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ComparisonFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Les vrais problèmes du capacity planning",
    subtitle:
      "Un déploiement simple et accompagné, pas un projet IT de 6 mois.",
    items: [
      {
        value: 1,
        description: (
          <>
            Les outils existants sont <strong>trop complexes</strong> → personne ne les maintient
          </>
        ),
      },
      {
        value: 2,
        description: (
          <>
            Les <strong>ressources partagées</strong> créent des conflits entre équipes
          </>
        ),
      },
      {
        value: 3,
        description: (
          <>
            Les décisions se prennent <strong>au feeling</strong>, pas sur des données fiables
          </>
        ),
      },
      {
        value: 4,
        description: (
          <>
            <strong>Aucune visibilité</strong> sur la capacité réelle des équipes
          </>
        ),
      },
      {
        value: 5,
        description: (
          <>
            Les <strong>projets en retard</strong> s&apos;accumulent sans que personne ne sache pourquoi
          </>
        ),
      },
      {
        value: 6,
        description: (
          <>
            Le <strong>PMO passe son temps</strong> à collecter des données au lieu de piloter
          </>
        ),
      },
    ],
  },
};
