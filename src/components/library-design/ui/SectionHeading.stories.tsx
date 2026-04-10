import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeading } from "./SectionHeading";

const meta = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleGradient: "Une plateforme de gouvernance projet",
    titleDark: "\u00e0 la hauteur de vos ambitions",
    subtitle:
      "Notre mission ? Vous permettre de devenir le pivot de la transformation de l\u2019entreprise en structurant la gouvernance de tous les projets, gr\u00e2ce \u00e0 une plateforme simple que le top management va adorer. La v\u00f4tre ? Faire passer votre entreprise \u00e0 l\u2019\u00e9tape sup\u00e9rieure en gouvernance de projet !",
  },
};

export const GradientOnly: Story = {
  args: {
    titleGradient: "Capacity Planning simplifi\u00e9",
    subtitle:
      "Planifiez vos ressources et vos projets en toute s\u00e9r\u00e9nit\u00e9 avec AirSaas.",
  },
};

export const NoSubtitle: Story = {
  args: {
    titleGradient: "Ils nous font confiance",
  },
};
