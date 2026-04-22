import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlogIndexGrid } from "./BlogIndexGrid";

const meta = {
  title: "Sections/Blog/BlogIndexGrid",
  component: BlogIndexGrid,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BlogIndexGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArticle = {
  thumbnailSrc:
    "https://placehold.co/600x400/3c51e2/ffffff?text=Article+PMO",
  thumbnailAlt: "Aperçu de l'article PMO",
  date: "Le 12/10/2021",
  title: "Mes 12 leçons de 2023 pour les DSI qui veulent changer de niveau de jeu",
  excerpt:
    "L'essentiel à savoir sur le Copil projet : missions, composition, erreurs fréquentes à éviter et clés de succès",
  href: "/blog/mes-12-lecons",
  authorName: "Bertran RUIZ",
  authorAvatarSrc: "https://placehold.co/80x80/3c51e2/ffffff?text=BR",
  authorAvatarAlt: "Portrait de Bertran RUIZ",
  categoryLabel: "La newsletter des DSI",
  categoryHref: "/blog/newsletter-dsi",
};

/**
 * Default — 3-card grid with a primary CTA below (matches Figma 312-2093).
 */
export const Default: Story = {
  args: {
    articles: Array.from({ length: 3 }, (_, i) => ({
      ...baseArticle,
      href: `/blog/article-${i + 1}`,
    })),
    ctaLabel: "Voir tous les articles →",
    ctaHref: "/blog",
  },
};

/**
 * Full grid — 9 cards (3 × 3) at the upper bound.
 */
export const FullGrid: Story = {
  args: {
    articles: Array.from({ length: 9 }, (_, i) => ({
      ...baseArticle,
      title: `Article n°${i + 1} — Guide pratique du PMO moderne en 2026`,
      href: `/blog/article-${i + 1}`,
    })),
    ctaLabel: "Voir tous les articles →",
    ctaHref: "/blog",
  },
};

/**
 * Without CTA — useful for homepage "featured" sections where the caller
 * renders a custom CTA elsewhere.
 */
export const NoCta: Story = {
  args: {
    articles: Array.from({ length: 3 }, (_, i) => ({
      ...baseArticle,
      href: `/blog/article-${i + 1}`,
    })),
  },
};

/**
 * Featured single — 1 card (lower bound). Used for "featured article"
 * highlights; the card takes 1 column on the lg grid.
 */
export const FeaturedSingle: Story = {
  args: {
    articles: [
      {
        ...baseArticle,
        title: "Article phare du mois — tout savoir sur le PMO stratégique",
      },
    ],
  },
};

/**
 * English locale — CTA is locale-driven.
 */
export const English: Story = {
  args: {
    articles: Array.from({ length: 3 }, (_, i) => ({
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
    ctaLabel: "See all articles →",
    ctaHref: "/en/blog",
  },
};
