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
  title: "Blocks/Hero",
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
    headline: "Vos équipes sont surchargées ? C'est normal :",
    headlineGradient: "personne ne sait ce qu'elles peuvent vraiment faire.",
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
    illustrationSrc:
      "https://placehold.co/1457x857/e8eafc/3a51e2?text=Product+Screenshot",
    illustrationAlt: "AirSaas product screenshot",
  },
};

export const Minimal: Story = {
  args: {
    headline: "Build better products with",
    headlineGradient: "capacity planning that works.",
    subtitle:
      "Get a clear, actionable view of your team capacity. Finally say no with data, not gut feeling.",
    primaryCta: {
      label: "Get Started",
      href: "#",
    },
  },
};
