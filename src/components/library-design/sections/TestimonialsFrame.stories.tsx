import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TestimonialsFrame } from "./TestimonialsFrame";

const meta = {
  title: "Sections/TestimonialsFrame",
  component: TestimonialsFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TestimonialsFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Ils ont simplifié leur",
    titleHighlight: "capacity planning",
    testimonials: [
      {
        quote:
          "Depuis qu'on utilise AirSaas, nos comités de pilotage sont enfin productifs. On a une vue claire sur tous nos projets stratégiques.",
        name: "Sophie Lefèvre",
        role: "DSI @Kiabi",
      },
      {
        quote:
          "AirSaas s'adapte à nos processus, pas l'inverse. Mise en place rapide et adoption immédiate par les équipes.",
        name: "Marc Durand",
        role: "DG @Valrhona",
      },
      {
        quote:
          "AirSaas est le rouage qui fait tourner notre gouvernance de projets. Visibilité totale pour le COMEX.",
        name: "Claire Martin",
        role: "PMO @Decathlon",
      },
    ],
  },
};
