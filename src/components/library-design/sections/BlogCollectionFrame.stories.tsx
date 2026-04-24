import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlogCollectionFrame } from "./BlogCollectionFrame";

const meta = {
  title: "Sections/BlogCollectionFrame",
  component: BlogCollectionFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BlogCollectionFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

const AUTHOR_BR = {
  name: "Bertran RUIZ",
  avatarSrc: "https://placehold.co/80x80/3c51e2/ffffff?text=BR",
  avatarAlt: "Portrait de Bertran RUIZ",
};

const AUTHOR_JR = {
  name: "Jonas Roman",
  avatarSrc: "https://placehold.co/80x80/2d8a4e/ffffff?text=JR",
  avatarAlt: "Portrait de Jonas Roman",
};

const AUTHOR_MC = {
  name: "Marie Curie",
  avatarSrc: "https://placehold.co/80x80/ff922b/ffffff?text=MC",
  avatarAlt: "Portrait de Marie Curie",
};

const baseArticle = {
  thumbnailSrc: "https://placehold.co/600x400/3c51e2/ffffff?text=Article+PMO",
  thumbnailAlt: "Aperçu de l'article PMO",
  date: "Le 12/10/2021",
  title: "Mes 12 leçons de 2023 pour les DSI qui veulent changer de niveau de jeu",
  excerpt:
    "L'essentiel à savoir sur le Copil projet : missions, composition, erreurs fréquentes à éviter et clés de succès",
  href: "/blog/mes-12-lecons",
  authors: [AUTHOR_BR],
  categoryLabel: "La newsletter des DSI",
  categoryHref: "/blog/newsletter-dsi",
  publishedByLabel: "Publié par",
  inLabel: "dans",
};

/**
 * Default — "Leurs articles" collection, light background, 3 cards + "Voir plus".
 */
export const Default: Story = {
  args: {
    title: "Leurs articles",
    subtitle:
      "Nos réflexions sur la transformation des organisations, fruits de nos échanges avec des DSI, PMO et Direction générale.",
    background: "light",
    items: Array.from({ length: 3 }, (_, i) => ({
      ...baseArticle,
      href: `/blog/article-${i + 1}`,
    })),
    viewAllHref: "/blog/articles",
    viewAllLabel: "Voir plus",
  },
};

/**
 * Alt background — "Leurs podcast" collection with alternating bg-alt
 * background for visual rhythm between frames.
 */
export const AltBackground: Story = {
  args: {
    title: "Leurs podcast",
    subtitle: "Le podcast des DSI modernes — conversations sans filtre.",
    background: "alt",
    items: Array.from({ length: 3 }, (_, i) => ({
      ...baseArticle,
      thumbnailSrc: `https://placehold.co/600x400/2d8a4e/ffffff?text=Podcast+${i + 1}`,
      title: `Épisode ${i + 1} — Les coulisses d'une transformation réussie`,
      href: `/blog/podcast/episode-${i + 1}`,
    })),
    viewAllHref: "/blog/podcast",
    viewAllLabel: "Voir tous les épisodes",
  },
};

/**
 * With collection author — useful when one person hosts / writes
 * the entire collection (e.g. a solo podcast).
 */
export const WithCollectionAuthor: Story = {
  args: {
    title: "Leurs podcast",
    subtitle: "Le podcast des DSI modernes.",
    background: "alt",
    collectionAuthor: {
      name: "Jonas Roman",
      avatarSrc: AUTHOR_JR.avatarSrc,
      avatarAlt: AUTHOR_JR.avatarAlt,
      label: "Animé par",
    },
    items: Array.from({ length: 3 }, (_, i) => ({
      ...baseArticle,
      authors: [AUTHOR_JR],
      thumbnailSrc: `https://placehold.co/600x400/2d8a4e/ffffff?text=Episode+${i + 1}`,
      title: `Épisode ${i + 1} — DSI moderne et transformation`,
      href: `/blog/podcast/episode-${i + 1}`,
    })),
    viewAllHref: "/blog/podcast",
    viewAllLabel: "Voir tous les épisodes",
  },
};

/**
 * With title highlight — first part in primary gradient, second part in dark.
 */
export const WithTitleHighlight: Story = {
  args: {
    titleHighlight: "Leurs",
    title: "articles",
    subtitle:
      "Fruits de nos échanges avec des DSI, chefs de projet, PMO ou Direction générale.",
    items: Array.from({ length: 3 }, (_, i) => ({
      ...baseArticle,
      href: `/blog/article-${i + 1}`,
    })),
    viewAllHref: "/blog/articles",
    viewAllLabel: "Voir plus",
  },
};

/**
 * Multi-author cards — some articles are co-authored. Renders stacked
 * avatars + multi-name label per card.
 */
export const MultiAuthorCards: Story = {
  args: {
    title: "Leurs articles",
    background: "light",
    items: [
      { ...baseArticle, href: "/blog/a", authors: [AUTHOR_BR] },
      {
        ...baseArticle,
        href: "/blog/b",
        authors: [AUTHOR_BR, AUTHOR_MC],
        authorsAndLabel: "&",
      },
      {
        ...baseArticle,
        href: "/blog/c",
        authors: [AUTHOR_BR, AUTHOR_MC, AUTHOR_JR, { name: "Ada Lovelace" }],
        authorsMoreLabel: "autres",
      },
    ],
    viewAllHref: "/blog/articles",
    viewAllLabel: "Voir plus",
  },
};

/**
 * English locale — all labels overridden via props.
 */
export const EnglishLocale: Story = {
  args: {
    title: "Their articles",
    subtitle:
      "Reflections on organisational transformation, built from conversations with CIOs, PMOs, and exec teams.",
    items: Array.from({ length: 3 }, (_, i) => ({
      ...baseArticle,
      date: "October 12, 2021",
      title: "My 12 lessons from 2023 for CIOs who want to level up",
      excerpt:
        "Everything you need to know about your steering committee: missions, composition, common mistakes to avoid, and keys to success.",
      publishedByLabel: "Published by",
      inLabel: "in",
      categoryLabel: "The CIO Newsletter",
      href: `/en/blog/article-${i + 1}`,
    })),
    viewAllHref: "/en/blog/articles",
    viewAllLabel: "See all",
  },
};

/**
 * Featured single — 1 card at the lower bound (for "article of the month"
 * highlights).
 */
export const FeaturedSingle: Story = {
  args: {
    title: "Article phare",
    items: [
      {
        ...baseArticle,
        title: "Article phare du mois — tout savoir sur le PMO stratégique",
      },
    ],
    viewAllHref: "/blog/articles",
    viewAllLabel: "Voir plus",
  },
};
