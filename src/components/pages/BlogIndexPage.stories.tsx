import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BlogIndexPage from "./BlogIndexPage";

const meta = {
  title: "Pages/BlogIndexPage",
  component: BlogIndexPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BlogIndexPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Shared mock data (FR locale) ─── */

const NAV_ITEMS = [
  { label: "Solutions", hasDropdown: true },
  { label: "Produit", hasDropdown: true },
  { label: "Ressources", hasDropdown: true },
  { label: "Témoignages", href: "#" },
  { label: "Intégrations", href: "#" },
  { label: "Nouveautés", href: "#" },
  { label: "Le Quarter Plan", href: "#" },
  { label: "Intégration teams", href: "#" },
];

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

const baseArticleFr = {
  date: "Le 12/10/2021",
  publishedByLabel: "Publié par",
  inLabel: "dans",
  categoryHref: "/blog/newsletter-dsi",
};

const ARTICLES = [
  {
    ...baseArticleFr,
    thumbnailSrc: "https://placehold.co/600x400/3c51e2/ffffff?text=Article+1",
    thumbnailAlt: "Leçons DSI 2023",
    title: "Mes 12 leçons de 2023 pour les DSI qui veulent changer de niveau de jeu",
    excerpt:
      "L'essentiel à savoir sur le Copil projet : missions, composition, erreurs à éviter, clés de succès.",
    href: "/blog/mes-12-lecons",
    authors: [AUTHOR_BR],
    categoryLabel: "La newsletter des DSI",
  },
  {
    ...baseArticleFr,
    thumbnailSrc: "https://placehold.co/600x400/2d8a4e/ffffff?text=Article+2",
    thumbnailAlt: "PMO stratégique",
    title: "Transformer votre PMO en levier stratégique : les 7 étapes clés",
    excerpt:
      "Un plan actionnable pour faire évoluer un PMO de fonction de contrôle à partenaire de la direction.",
    href: "/blog/pmo-strategique",
    authors: [AUTHOR_BR, AUTHOR_MC],
    categoryLabel: "Gestion de projets",
  },
  {
    ...baseArticleFr,
    thumbnailSrc: "https://placehold.co/600x400/ff922b/ffffff?text=Article+3",
    thumbnailAlt: "Capacity planning",
    title: "Capacity planning : dire non avec des données et pas au feeling",
    excerpt:
      "Comment construire une vue capacitaire actionnable pour vos équipes projet et vos sponsors.",
    href: "/blog/capacity-planning",
    authors: [AUTHOR_BR],
    categoryLabel: "Capacity Planning",
  },
];

const PODCASTS = [
  {
    ...baseArticleFr,
    thumbnailSrc: "https://placehold.co/600x400/6b7be9/ffffff?text=Ep.+42",
    thumbnailAlt: "Épisode 42 du podcast",
    title: "Épisode 42 — Les coulisses d'une transformation digitale réussie",
    excerpt:
      "Jonas reçoit une DSI du CAC 40 pour décortiquer une transformation sur 3 ans.",
    href: "/blog/podcast/episode-42",
    authors: [AUTHOR_JR],
    categoryLabel: "Transformation",
  },
  {
    ...baseArticleFr,
    thumbnailSrc: "https://placehold.co/600x400/6b7be9/ffffff?text=Ep.+41",
    thumbnailAlt: "Épisode 41",
    title: "Épisode 41 — Gouvernance projet à l'ère du remote",
    excerpt: "Comment piloter un portefeuille projet quand les équipes sont distribuées.",
    href: "/blog/podcast/episode-41",
    authors: [AUTHOR_JR],
    categoryLabel: "Gouvernance",
  },
  {
    ...baseArticleFr,
    thumbnailSrc: "https://placehold.co/600x400/6b7be9/ffffff?text=Ep.+40",
    thumbnailAlt: "Épisode 40",
    title: "Épisode 40 — PMO vs chef de projet : qui fait quoi ?",
    excerpt: "Le débat clair et documenté pour (enfin) sortir des confusions.",
    href: "/blog/podcast/episode-40",
    authors: [AUTHOR_JR],
    categoryLabel: "PMO",
  },
];

const RELEASES = [
  {
    ...baseArticleFr,
    thumbnailSrc: "https://placehold.co/600x400/a6aab6/ffffff?text=v2.3",
    thumbnailAlt: "Release 2.3",
    title: "AirSaas v2.3 — Nouveau module Capacity Planning multi-équipes",
    excerpt:
      "Vue agrégée par équipe, drill-down par projet, export Excel en un clic.",
    href: "/blog/nouveautes/v2-3",
    authors: [{ name: "Équipe produit" }],
    categoryLabel: "Produit",
    date: "Le 18/04/2026",
  },
  {
    ...baseArticleFr,
    thumbnailSrc: "https://placehold.co/600x400/a6aab6/ffffff?text=v2.2",
    thumbnailAlt: "Release 2.2",
    title: "AirSaas v2.2 — Intégration native Microsoft Teams",
    excerpt:
      "Flash reports directement dans Teams, notifications intelligentes, @mentions.",
    href: "/blog/nouveautes/v2-2",
    authors: [{ name: "Équipe produit" }],
    categoryLabel: "Produit",
    date: "Le 04/03/2026",
  },
  {
    ...baseArticleFr,
    thumbnailSrc: "https://placehold.co/600x400/a6aab6/ffffff?text=v2.1",
    thumbnailAlt: "Release 2.1",
    title: "AirSaas v2.1 — Priorisation inter-équipes améliorée",
    excerpt:
      "Nouvelle vue de priorisation cross-équipe avec arbitrages rapides par le sponsor.",
    href: "/blog/nouveautes/v2-1",
    authors: [{ name: "Équipe produit" }],
    categoryLabel: "Produit",
    date: "Le 11/02/2026",
  },
];

const FOOTER_COLUMNS = [
  {
    title: "Produit",
    links: [
      { label: "Revue de portefeuille", href: "/revue-portefeuille" },
      { label: "Capacitaire", href: "/capacitaire" },
      { label: "Reporting automatisé", href: "/reporting" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Podcast", href: "/blog/podcast" },
      { label: "Nouveautés", href: "/blog/nouveautes" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Alternative à",
    links: [
      { label: "Sciforma", href: "/alternative/sciforma" },
      { label: "Planview", href: "/alternative/planview" },
    ],
  },
];

/* ─── Stories ─── */

export const Default: Story = {
  args: {
    navItems: NAV_ITEMS,
    navCtaLabel: "Demander une démo",
    navCtaHref: "#",
    loginLabel: "Login",
    loginHref: "#",
    heroEyebrow: "LE BLOG",
    heroTitle: "PRO. de la",
    heroTitleHighlight: "TRANSFO.",
    heroSubtitle:
      "Fruits de nos échanges avec des DSI, chefs de projet, PMO ou Direction générale, nous posons ici nos réflexions sur la transformation des organisations.",
    collections: [
      {
        title: "Leurs articles",
        subtitle:
          "Nos réflexions sur la transformation des organisations.",
        items: ARTICLES,
        viewAllHref: "/blog/articles",
        viewAllLabel: "Voir tous les articles",
      },
      {
        title: "Leurs podcast",
        subtitle: "Le podcast des DSI modernes.",
        collectionAuthor: {
          name: "Jonas Roman",
          avatarSrc: AUTHOR_JR.avatarSrc,
          avatarAlt: AUTHOR_JR.avatarAlt,
          label: "Animé par",
        },
        items: PODCASTS,
        viewAllHref: "/blog/podcast",
        viewAllLabel: "Voir tous les épisodes",
      },
      {
        title: "Leurs nouveautés",
        subtitle:
          "Les dernières releases, modules et améliorations produit.",
        items: RELEASES,
        viewAllHref: "/blog/nouveautes",
        viewAllLabel: "Voir toutes les nouveautés",
      },
    ],
    cta: {
      titlePrefix: "Et si vous repreniez le contrôle ",
      titleHighlight: "de votre portefeuille",
      titleSuffix: " de projets ?",
      subtitle: "Réservez une démo et découvrez l'outil en 30 minutes.",
      ctaLabel: "Réserver une démo",
      ctaHref: "/demo",
    },
    footerColumns: FOOTER_COLUMNS,
    copyright:
      "Made with love in France | © 2026 AirSaas · Mentions légales · Confidentialité",
  },
};
