import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeatureSectionStacked } from "./FeatureSectionStacked";

const meta = {
  title: "Sections/Features Sections/FeatureSectionStacked",
  component: FeatureSectionStacked,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof FeatureSectionStacked>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleDarkPrefix: "Un",
    titleGradient: "capacity planning par \u00e9quipe",
    titleDark: "simple et actionnable",
    subtitle:
      "Visualisez en un clin d\u2019\u0153il si vous \u00eates dans les clous... ou dans les choux. Gr\u00e2ce \u00e0 cette vue vous avez les bases d\u2019une discussion pragmatique pour prendre les d\u00e9cisions :",
    listItems: [
      "Peut-on faire plus de projets ? Faut-il en enlever ?",
      "Quels sont les jalons qui nous plombent ? Peut-on les d\u00e9couper ?",
      "Doit-on recruter ou mettre l\u2019\u00e9quipe en tension ? Pendant combien de temps ?",
    ],
    imageSrc: "https://placehold.co/1380x900/e8ebfe/3C51E2?text=Capacity+Planning+Screenshot",
    imageAlt: "Vue capacitaire par \u00e9quipe",
  },
};

export const WithoutList: Story = {
  args: {
    titleGradient: "Une plateforme de gouvernance projet",
    titleDark: "\u00e0 la hauteur de vos ambitions",
    subtitle:
      "Notre mission ? Vous permettre de devenir le pivot de la transformation de l\u2019entreprise.",
    imageSrc: "https://placehold.co/1380x900/e8ebfe/3C51E2?text=Dashboard+Screenshot",
  },
};

export const WithoutImage: Story = {
  args: {
    titleDarkPrefix: "Un",
    titleGradient: "capacity planning par \u00e9quipe",
    titleDark: "simple et actionnable",
    subtitle:
      "Visualisez en un clin d\u2019\u0153il si vous \u00eates dans les clous... ou dans les choux.",
    listItems: [
      "Peut-on faire plus de projets ?",
      "Quels sont les jalons qui nous plombent ?",
      "Doit-on recruter ou mettre l\u2019\u00e9quipe en tension ?",
    ],
  },
};
