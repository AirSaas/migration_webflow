import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FaqFrame } from "./FaqFrame";

const meta = {
  title: "Sections/FaqFrame",
  component: FaqFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof FaqFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        question: "Est-ce que ça suffit pour un vrai capacitaire ?",
        answer:
          "Oui, pour savoir ce qu'il est possible de faire au niveau macro. C'est ce qu'il manque au top management pour prioriser. Pour le micro-planning, gardez vos outils opérationnels.",
      },
      {
        question: "Comment gérer des compétences différentes dans une équipe ?",
        answer:
          "AirSaas vous permet de définir des profils de compétences par équipe et de visualiser la disponibilité par compétence. Vous identifiez instantanément les goulots d'étranglement.",
      },
      {
        question: "Combien de temps pour être opérationnel ?",
        answer:
          "En moyenne 4 semaines. Notre équipe vous accompagne dans la configuration initiale, l'import de vos données et la formation de vos équipes.",
      },
      {
        question: "AirSaas remplace-t-il nos outils existants ?",
        answer:
          "Non, AirSaas se positionne au-dessus de vos outils opérationnels (Jira, Monday, Asana...). Il agrège les données pour fournir une vue macro au management sans changer les habitudes des équipes.",
      },
    ],
  },
};
