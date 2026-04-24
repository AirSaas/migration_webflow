/**
 * Blog index mock data — hardcoded for Step 0/1 (DS work).
 * Will be replaced by Strapi content-types at Step 5.
 *
 * Shape matches the props of `BlogIndexPage` (see
 * src/components/pages/BlogIndexPage.tsx).
 */

import type { BlogCard } from "@/components/library-design/ui/BlogCard";
import type { BlogCollectionFrame } from "@/components/library-design/sections/BlogCollectionFrame";
import type { Footer } from "@/components/library-design/sections/Footer";

type BlogCardProps = React.ComponentProps<typeof BlogCard>;
type CollectionAuthor = NonNullable<
  React.ComponentProps<typeof BlogCollectionFrame>["collectionAuthor"]
>;
type FooterColumns = React.ComponentProps<typeof Footer>["columns"];

/* ─── Navbar items (shared layout) ─── */

export const NAV_ITEMS = [
  { label: "Solutions", hasDropdown: true },
  { label: "Produit", hasDropdown: true },
  { label: "Ressources", hasDropdown: true },
  { label: "Témoignages", href: "/fr/temoignages" },
  { label: "Intégrations", href: "/fr/les-integrations" },
  { label: "Nouveautés", href: "/fr/les-nouveautes-produit" },
  { label: "Le Quarter Plan", href: "/fr/quarter-plan" },
  { label: "Intégration teams", href: "/fr/microsoft-teams-airsaas" },
];

/* ─── Authors ─── */

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

/* ─── Shared article defaults (FR) ─── */

const SHARED_FR = {
  publishedByLabel: "Publié par",
  inLabel: "dans",
  authorsAndLabel: "&",
  authorsMoreLabel: "autres",
};

/* ─── Collection 1: Articles ─── */

const ARTICLES: BlogCardProps[] = [
  {
    ...SHARED_FR,
    thumbnailSrc: "https://placehold.co/600x400/3c51e2/ffffff?text=Le%C3%A7ons+DSI+2023",
    thumbnailAlt: "Couverture de l'article : leçons DSI 2023",
    date: "Le 12/10/2021",
    title: "Mes 12 leçons de 2023 pour les DSI qui veulent changer de niveau de jeu",
    excerpt:
      "Retour d'expérience après 120 missions : les réflexes qui font la différence entre une DSI perçue comme un centre de coûts et un partenaire stratégique.",
    href: "/fr/blog/lecons-dsi-2023",
    authors: [AUTHOR_BR],
    categoryLabel: "La newsletter des DSI",
    categoryHref: "/fr/blog/newsletter-dsi",
  },
  {
    ...SHARED_FR,
    thumbnailSrc: "https://placehold.co/600x400/2d8a4e/ffffff?text=PMO+strat%C3%A9gique",
    thumbnailAlt: "Illustration PMO stratégique",
    date: "Le 02/03/2026",
    title: "Transformer votre PMO en levier stratégique : les 7 étapes clés",
    excerpt:
      "Un plan actionnable pour faire évoluer un PMO de fonction de contrôle à partenaire de la direction générale.",
    href: "/fr/blog/pmo-strategique",
    authors: [AUTHOR_BR, AUTHOR_MC],
    categoryLabel: "Gestion de projets",
    categoryHref: "/fr/blog/categorie/gestion-projets",
  },
  {
    ...SHARED_FR,
    thumbnailSrc: "https://placehold.co/600x400/ff922b/ffffff?text=Capacity+Planning",
    thumbnailAlt: "Illustration capacity planning",
    date: "Le 15/04/2026",
    title: "Capacity planning : dire non avec des données et pas au feeling",
    excerpt:
      "Comment construire une vue capacitaire actionnable pour vos équipes projet et vos sponsors.",
    href: "/fr/blog/capacity-planning",
    authors: [AUTHOR_BR],
    categoryLabel: "Capacity Planning",
    categoryHref: "/fr/blog/categorie/capacity-planning",
  },
];

/* ─── Collection 2: Podcast ─── */

const PODCAST_HOST: CollectionAuthor = {
  name: "Jonas Roman",
  avatarSrc: AUTHOR_JR.avatarSrc,
  avatarAlt: AUTHOR_JR.avatarAlt,
  label: "Animé par",
};

const PODCASTS: BlogCardProps[] = [
  {
    ...SHARED_FR,
    thumbnailSrc: "https://placehold.co/600x400/6b7be9/ffffff?text=Ep.+42",
    thumbnailAlt: "Couverture de l'épisode 42",
    date: "Le 18/04/2026",
    title: "Épisode 42 — Les coulisses d'une transformation digitale réussie",
    excerpt:
      "Jonas reçoit une DSI du CAC 40 pour décortiquer une transformation sur 3 ans.",
    href: "/fr/blog/podcast/episode-42",
    authors: [AUTHOR_JR],
    categoryLabel: "Transformation",
    categoryHref: "/fr/blog/categorie/transformation",
  },
  {
    ...SHARED_FR,
    thumbnailSrc: "https://placehold.co/600x400/6b7be9/ffffff?text=Ep.+41",
    thumbnailAlt: "Couverture de l'épisode 41",
    date: "Le 04/04/2026",
    title: "Épisode 41 — Gouvernance projet à l'ère du remote",
    excerpt:
      "Comment piloter un portefeuille projet quand les équipes sont distribuées sur 3 continents.",
    href: "/fr/blog/podcast/episode-41",
    authors: [AUTHOR_JR],
    categoryLabel: "Gouvernance",
    categoryHref: "/fr/blog/categorie/gouvernance",
  },
  {
    ...SHARED_FR,
    thumbnailSrc: "https://placehold.co/600x400/6b7be9/ffffff?text=Ep.+40",
    thumbnailAlt: "Couverture de l'épisode 40",
    date: "Le 21/03/2026",
    title: "Épisode 40 — PMO vs chef de projet : qui fait quoi ?",
    excerpt:
      "Le débat clair et documenté pour (enfin) sortir des confusions sur ces deux rôles.",
    href: "/fr/blog/podcast/episode-40",
    authors: [AUTHOR_JR],
    categoryLabel: "PMO",
    categoryHref: "/fr/blog/categorie/pmo",
  },
];

/* ─── Collection 3: Nouveautés produit ─── */

const RELEASES: BlogCardProps[] = [
  {
    ...SHARED_FR,
    thumbnailSrc: "https://placehold.co/600x400/a6aab6/ffffff?text=v2.3",
    thumbnailAlt: "Illustration release 2.3",
    date: "Le 18/04/2026",
    title: "AirSaas v2.3 — Nouveau module Capacity Planning multi-équipes",
    excerpt:
      "Vue agrégée par équipe, drill-down par projet, export Excel en un clic.",
    href: "/fr/blog/nouveautes/v2-3",
    authors: [{ name: "Équipe produit" }],
    categoryLabel: "Produit",
    categoryHref: "/fr/blog/categorie/produit",
  },
  {
    ...SHARED_FR,
    thumbnailSrc: "https://placehold.co/600x400/a6aab6/ffffff?text=v2.2",
    thumbnailAlt: "Illustration release 2.2",
    date: "Le 04/03/2026",
    title: "AirSaas v2.2 — Intégration native Microsoft Teams",
    excerpt:
      "Flash reports directement dans Teams, notifications intelligentes, @mentions.",
    href: "/fr/blog/nouveautes/v2-2",
    authors: [{ name: "Équipe produit" }],
    categoryLabel: "Produit",
    categoryHref: "/fr/blog/categorie/produit",
  },
  {
    ...SHARED_FR,
    thumbnailSrc: "https://placehold.co/600x400/a6aab6/ffffff?text=v2.1",
    thumbnailAlt: "Illustration release 2.1",
    date: "Le 11/02/2026",
    title: "AirSaas v2.1 — Priorisation inter-équipes améliorée",
    excerpt:
      "Nouvelle vue de priorisation cross-équipe avec arbitrages rapides par le sponsor.",
    href: "/fr/blog/nouveautes/v2-1",
    authors: [{ name: "Équipe produit" }],
    categoryLabel: "Produit",
    categoryHref: "/fr/blog/categorie/produit",
  },
];

/* ─── Footer columns (shared) ─── */

const FOOTER_COLUMNS: FooterColumns = [
  {
    title: "Entreprise",
    links: [
      { label: "Pourquoi AirSaas ?", href: "/fr/pourquoi-airsaas" },
      { label: "Cookies", href: "/fr/cookies" },
      { label: "Conditions d'utilisation", href: "/fr/conditions" },
      { label: "Mentions légales", href: "/fr/mentions-legales" },
      { label: "Charte de confidentialité", href: "/fr/confidentialite" },
      { label: "Plan du site", href: "/fr/plan-du-site" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Blog d'AirSaas", href: "/fr/blog" },
      { label: "Podcast des DSI", href: "/fr/blog/podcast" },
      { label: "Nouveautés produit", href: "/fr/blog/nouveautes" },
      { label: "Témoignages clients", href: "/fr/temoignages" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Management de portefeuille projet", href: "/fr/solution/management-de-portefeuille-projet" },
      { label: "Flash report automatisé", href: "/fr/solution/flash-report" },
      { label: "Outil PPM", href: "/fr/lp/ppm" },
      { label: "Capacity Planning", href: "/fr/lp/capacity-planning" },
      { label: "Tableau de bord DSI", href: "/fr/solution/tableau-de-bord-dsi" },
    ],
  },
  {
    title: "Alternative à",
    links: [
      { label: "Sciforma", href: "/fr/alternative/sciforma" },
      { label: "Planview Portfolio", href: "/fr/alternative/planview" },
    ],
  },
];

/* ─── Exported page props ─── */

export const BLOG_INDEX_DATA = {
  navItems: NAV_ITEMS,
  navCtaLabel: "Demander une démo",
  navCtaHref: "/fr/meetings-pages",
  loginLabel: "Login",
  loginHref: "https://app.airsaas.io/fr/login",
  heroEyebrow: "LE BLOG",
  heroTitle: "PRO. de la",
  heroTitleHighlight: "TRANSFO.",
  heroSubtitle:
    "Fruits de nos échanges avec des DSI, chefs de projet, PMO ou Direction générale, nous posons ici nos réflexions sur la transformation des organisations.",
  collections: [
    {
      title: "Leurs articles",
      subtitle:
        "Nos réflexions sur la transformation des organisations, fruits d'échanges avec des DSI, PMO et Direction générale.",
      items: ARTICLES,
      viewAllHref: "/fr/blog/articles",
      viewAllLabel: "Voir tous les articles",
    },
    {
      title: "Leurs podcast",
      subtitle: "Le podcast des DSI modernes — conversations sans filtre.",
      collectionAuthor: PODCAST_HOST,
      items: PODCASTS,
      viewAllHref: "/fr/blog/podcast",
      viewAllLabel: "Voir tous les épisodes",
    },
    {
      title: "Leurs nouveautés",
      subtitle:
        "Les dernières releases, modules et améliorations produit.",
      items: RELEASES,
      viewAllHref: "/fr/blog/nouveautes",
      viewAllLabel: "Voir toutes les nouveautés",
    },
  ],
  cta: {
    titlePrefix: "Et si vous repreniez le contrôle ",
    titleHighlight: "de votre portefeuille",
    titleSuffix: " de projets ?",
    subtitle: "Réservez une démo et découvrez l'outil en 30 minutes.",
    ctaLabel: "Réserver une démo",
    ctaHref: "/fr/meetings-pages",
  },
  footerColumns: FOOTER_COLUMNS,
  copyright:
    "Made with love in France | © 2026 AirSaas · Mentions légales · Confidentialité",
};
