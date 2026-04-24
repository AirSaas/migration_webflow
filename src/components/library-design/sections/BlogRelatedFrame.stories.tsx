import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlogRelatedFrame } from "./BlogRelatedFrame";
import { type BlogCardProps } from "@/components/library-design/ui/BlogCard";

const meta = {
  title: "Sections/Blog/BlogRelatedFrame",
  component: BlogRelatedFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BlogRelatedFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

const threeArticles: BlogCardProps[] = [
  {
    thumbnailSrc:
      "https://placehold.co/640x400/e8eafc/3c51e2?text=Cadrage+projet",
    thumbnailAlt: "Illustration de l'article cadrage projet",
    date: "Le 12/03/2025",
    title: "Cadrage projet : la méthode en 7 étapes pour ne rien oublier",
    excerpt:
      "Un cadrage solide évite 80 % des dérapages en production. Voici la checklist utilisée par 200+ PMO français.",
    href: "/fr/le-blog/cadrage-projet",
    authors: [
      {
        name: "Laurent Citton",
        avatarSrc: "https://placehold.co/90x90/3c51e2/ffffff?text=LC",
        avatarAlt: "Portrait de Laurent Citton",
      },
    ],
    categoryLabel: "Gestion de projets",
    categoryHref: "/fr/le-blog/category/gestion-de-projets",
    publishedByLabel: "Publié par",
    inLabel: "dans",
  },
  {
    thumbnailSrc:
      "https://placehold.co/640x400/ffd180/3c51e2?text=Analyse+risques",
    thumbnailAlt: "Illustration des risques projet",
    date: "Le 05/03/2025",
    title: "Analyse des risques projet : 4 bonnes pratiques des PMO experts",
    excerpt:
      "Lister ses risques ne suffit pas — encore faut-il les prioriser, les suivre, et savoir quand déclencher l'alerte.",
    href: "/fr/le-blog/analyse-des-risques-projet",
    authors: [
      {
        name: "Émilie Lecart",
        avatarSrc: "https://placehold.co/90x90/ff922b/ffffff?text=EL",
        avatarAlt: "Portrait d'Émilie Lecart",
      },
    ],
    categoryLabel: "Gestion de projets",
    categoryHref: "/fr/le-blog/category/gestion-de-projets",
    publishedByLabel: "Publié par",
    inLabel: "dans",
  },
  {
    thumbnailSrc:
      "https://placehold.co/640x400/cdf9e1/3c51e2?text=Budget+projet",
    thumbnailAlt: "Illustration du budget projet",
    date: "Le 28/02/2025",
    title: "Budgétiser un projet sans se louper : le guide complet",
    excerpt:
      "De l'estimation initiale au suivi mensuel, les 6 postes qu'on oublie toujours — et comment les anticiper.",
    href: "/fr/le-blog/budgetiser-un-projet-sans-se-louper",
    authors: [
      {
        name: "Sébastien Louyot",
        avatarSrc: "https://placehold.co/90x90/03e26b/1a1a1a?text=SL",
        avatarAlt: "Portrait de Sébastien Louyot",
      },
    ],
    categoryLabel: "Gestion de projets",
    categoryHref: "/fr/le-blog/category/gestion-de-projets",
    publishedByLabel: "Publié par",
    inLabel: "dans",
  },
];

/**
 * Canonical usage — blog article footer "Pour aller plus loin" with 3
 * related articles and a CTA to the full collection.
 */
export const DefaultThreeArticles: Story = {
  args: {
    titleHighlight: "Pour aller plus loin",
    title: "sur la gestion de projets",
    subtitle:
      "Nos dernières publications sur la gouvernance projet, l'analyse des risques et le cadrage.",
    articles: threeArticles,
    collectionCtaLabel: "Voir tous les articles",
    collectionCtaHref: "/fr/le-blog",
  },
};

/**
 * Tinted variant — pale lavender background (primary-2). Use when the
 * preceding article body is already white for visual rhythm.
 */
export const Tinted: Story = {
  args: {
    ...DefaultThreeArticles.args,
    variant: "tinted",
  },
};

/**
 * Without collection CTA — minimal footer with just the 3 cards. Used when
 * the page already has a prominent "back to blog" link elsewhere.
 */
export const NoCta: Story = {
  args: {
    titleHighlight: "Lire aussi",
    title: "sur le même sujet",
    articles: threeArticles,
  },
};

/**
 * No highlight — plain dark heading. Use when the cross-sell shouldn't
 * read like a call-to-action.
 */
export const NoHighlight: Story = {
  args: {
    title: "D'autres articles sur la gestion de projets",
    articles: threeArticles,
  },
};
