/**
 * Shared site chrome — navbar + footer content used on every public page.
 *
 * Hardcoded FR-only for the rebuild batch. When the site-wide i18n lands,
 * these will be replaced by next-intl / Strapi reads.
 */

export const SITE_NAV_ITEMS = [
  { label: "Solutions", hasDropdown: true },
  { label: "Produit", hasDropdown: true },
  { label: "Ressources", hasDropdown: true },
  { label: "Témoignages", href: "#" },
  { label: "Intégrations", href: "#" },
  { label: "Nouveautés", href: "#" },
  { label: "Le Quarter Plan", href: "#" },
  { label: "Intégration teams", href: "#" },
];

export const SITE_NAV_CTA = {
  label: "Demander une démo",
  href: "/fr/meetings-pages",
};

export const SITE_NAV_LOGIN = {
  label: "Login",
  href: "https://app.airsaas.io",
};

export const SITE_FOOTER_COLUMNS = [
  {
    title: "Entreprise",
    links: [
      { label: "Pourquoi AirSaas ?" },
      { label: "Cookies" },
      { label: "Conditions d'utilisation" },
      { label: "Mentions légales" },
      { label: "Charte de confidentialité" },
      { label: "Kit média" },
      { label: "API AirSaas" },
      { label: "Plan du site" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Newsletter des DSI" },
      { label: "Newsletter des Pro. de la Transfo." },
      { label: "Le blog d'AirSaas" },
      { label: "Podcast CIO Révolution" },
      { label: "La conduite de projet" },
      { label: "Portfolio project Management" },
      { label: "Le comité de pilotage" },
      { label: "Témoignages clients" },
      { label: "Évènements" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Management de portefeuille projet" },
      { label: "Flash report automatisé" },
      { label: "Outil PPM" },
      { label: "Outil de pilotage projet" },
      { label: "Plan stratégique" },
      { label: "Portfolio management" },
      { label: "Revue de portefeuille" },
      { label: "Tableau de bord portefeuille de projet" },
      { label: "Tableau de bord DSI" },
    ],
  },
  {
    title: "Le Quarter Plan & les cadres méthodologiques",
    links: [
      { label: "AirSaas, le Quarter Plan et l'effectuation : piloter l'incertitude" },
    ],
    sections: [
      {
        title: "Alternative à",
        links: [
          { label: "Sciforma" },
          { label: "Planview Portfolio" },
        ],
      },
    ],
  },
];

export const SITE_FOOTER_COPYRIGHT =
  "Made with love in France | © 2026 AirSaas · Mentions légales · Confidentialité";
