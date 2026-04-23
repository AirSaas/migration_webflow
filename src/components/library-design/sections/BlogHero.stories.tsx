import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlogHero } from "./BlogHero";

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
  title: "Sections/BlogHero",
  component: BlogHero,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BlogHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navItems: defaultNavItems,
    navCtaLabel: "Demander une démo",
    navCtaHref: "#",
    loginLabel: "Login",
    loginHref: "#",
    topTagLabel: "Le Blog",
    title:
      "PMO (Project Management Office) : le guide complet pour comprendre et mettre en place ce rôle clé",
    author: {
      name: "Jonas Roman",
      categoryLabel: "Gestion de projets",
      categoryHref: "#",
      publishedDate: "25/2/2026",
    },
    imageSrc:
      "https://placehold.co/1150x455/e8eafc/3a51e2?text=Featured+Article+Image",
    imageAlt: "Featured blog article illustration",
  },
};

export const WithAvatar: Story = {
  args: {
    navItems: defaultNavItems,
    navCtaLabel: "Demander une démo",
    navCtaHref: "#",
    loginLabel: "Login",
    loginHref: "#",
    topTagLabel: "Le Blog",
    title:
      "PMO (Project Management Office) : le guide complet pour comprendre et mettre en place ce rôle clé",
    author: {
      name: "Jonas Roman",
      avatarSrc: "https://placehold.co/60x60/2d8a4e/ffffff?text=JR",
      avatarAlt: "Jonas Roman",
      categoryLabel: "Gestion de projets",
      categoryHref: "#",
      publishedDate: "25/2/2026",
    },
    imageSrc:
      "https://placehold.co/1150x455/e8eafc/3a51e2?text=Featured+Article+Image",
    imageAlt: "Featured blog article illustration",
  },
};

export const ShortTitle: Story = {
  args: {
    navItems: defaultNavItems,
    navCtaLabel: "Demander une démo",
    navCtaHref: "#",
    loginLabel: "Login",
    loginHref: "#",
    topTagLabel: "Le Blog",
    title: "Le capacity planning expliqué simplement",
    author: {
      name: "Jonas Roman",
      categoryLabel: "Capacity Planning",
      categoryHref: "#",
      publishedDate: "12/3/2026",
    },
    imageSrc:
      "https://placehold.co/1150x455/e8eafc/3a51e2?text=Featured+Article+Image",
    imageAlt: "Featured blog article illustration",
  },
};

export const EnglishLocale: Story = {
  args: {
    navItems: defaultNavItems,
    navCtaLabel: "Request a demo",
    navCtaHref: "#",
    loginLabel: "Login",
    loginHref: "#",
    topTagLabel: "The Blog",
    title:
      "PMO (Project Management Office): the complete guide to understanding and deploying this key role",
    author: {
      name: "Jane Doe",
      publishedByLabel: "Published by",
      inLabel: "in",
      datePrefix: "On",
      categoryLabel: "Project Management",
      categoryHref: "#",
      publishedDate: "Feb 25, 2026",
    },
    imageSrc:
      "https://placehold.co/1150x455/e8eafc/3a51e2?text=Featured+Article+Image",
    imageAlt: "Featured blog article illustration",
  },
};

export const NoNavbar: Story = {
  args: {
    topTagLabel: "Le Blog",
    title:
      "PMO (Project Management Office) : le guide complet pour comprendre et mettre en place ce rôle clé",
    author: {
      name: "Jonas Roman",
      categoryLabel: "Gestion de projets",
      categoryHref: "#",
      publishedDate: "25/2/2026",
    },
    imageSrc:
      "https://placehold.co/1150x455/e8eafc/3a51e2?text=Featured+Article+Image",
    imageAlt: "Featured blog article illustration",
  },
};
