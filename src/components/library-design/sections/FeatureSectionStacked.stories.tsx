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

/**
 * Bullet wrap demo \u2014 5 items render as 3+2 (3 per row at md+, 4th onwards
 * wraps to the next line). Verifies the grid-cols-3 layout rule documented
 * in Rule 16 of the landing-rebuilder skill (2026-05-14).
 */
export const FiveItems: Story = {
  args: {
    titleGradient: "Des rituels",
    titleDark: "de suivi budg\u00e9taire puissants",
    subtitle:
      "Brillez lors de vos points budg\u00e9taires ! Gr\u00e2ce au suivi des d\u00e9penses \u00ab engag\u00e9es \u00bb, \u00ab consomm\u00e9es \u00bb et \u00ab atterrissage \u00bb vous pourrez r\u00e9pondre \u00e0 toutes les questions :",
    listItems: [
      "Quels sont les d\u00e9rapages \u00e0 anticiper d'ici la fin du trimestre ?",
      "Sur quel programme a-t-on encore du budget disponible ?",
      "Comment justifier cette demande de rallonge ?",
      "Pourquoi a-t-on doubl\u00e9 les d\u00e9penses sur ce projet ?",
      "\u00c0 combien penses-tu atterrir d'ici la fin du semestre ?",
    ],
    imageAlt: "",
  },
};

/**
 * Bullet wrap demo \u2014 6 items render as 3+3 (two full rows of 3 each).
 */
export const SixItems: Story = {
  args: {
    titleGradient: "Six b\u00e9n\u00e9fices",
    titleDark: "concrets pour votre \u00e9quipe",
    subtitle:
      "D\u00e9monstration du wrap natural avec 6 items \u2014 rendu en 3+3.",
    listItems: [
      "Premier b\u00e9n\u00e9fice court et clair pour l'utilisateur",
      "Deuxi\u00e8me point essentiel \u00e0 retenir",
      "Troisi\u00e8me argument convaincant qui fait la diff\u00e9rence",
      "Quatri\u00e8me item qui passe \u00e0 la nouvelle ligne au-del\u00e0 de md",
      "Cinqui\u00e8me argument qui consolide la d\u00e9monstration",
      "Sixi\u00e8me point qui boucle la liste",
    ],
    imageAlt: "",
  },
};
