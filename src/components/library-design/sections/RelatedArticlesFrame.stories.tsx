import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RelatedArticlesFrame } from "./RelatedArticlesFrame";

const meta = {
  title: "Sections/Blog/RelatedArticlesFrame",
  component: RelatedArticlesFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof RelatedArticlesFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default — French blog article (matches Figma 309-1986 exactly).
 * 7 related PMO articles, all internal routes.
 */
export const Default: Story = {
  args: {
    title: "Pour aller plus loin",
    items: [
      {
        label: "Chef de projet vs PMO : rôles et différences clés",
        href: "/blog/chef-projet-vs-pmo",
      },
      {
        label: "Comment mettre en place un PMO en 30 jours",
        href: "/blog/pmo-30-jours",
      },
      {
        label: "Les 7 indicateurs clés d'un reporting PMO efficace",
        href: "/blog/indicateurs-reporting-pmo",
      },
      {
        label: "PMO vs bureau des projets : quelles différences ?",
        href: "/blog/pmo-vs-bureau-projets",
      },
      {
        label: "Le rôle du PMO vis-à-vis du Codir",
        href: "/blog/pmo-codir",
      },
      {
        label: "FAQ : les questions fréquentes sur le PMO",
        href: "/blog/faq-pmo",
      },
      {
        label: "Étude de cas : transformation d'un portefeuille de 40 projets",
        href: "/blog/cas-portefeuille-40-projets",
      },
    ],
  },
};

/**
 * English locale — title is locale-driven, passed by the caller.
 */
export const English: Story = {
  args: {
    title: "Further reading",
    items: [
      { label: "Why your PMO is failing in 2026", href: "/en/blog/why-pmo-failing" },
      { label: "The new role of modern PMOs", href: "/en/blog/new-role" },
      { label: "Project manager vs PMO — who does what?", href: "/en/blog/pm-vs-pmo" },
      { label: "Reporting: the PMO's best lever", href: "/en/blog/reporting" },
    ],
  },
};

/**
 * Minimum — 3 items (lower bound of the contract).
 */
export const Minimum: Story = {
  args: {
    title: "Pour aller plus loin",
    items: [
      { label: "Introduction au PMO", href: "/blog/intro-pmo" },
      { label: "PMO vs chef de projet", href: "/blog/pmo-vs-chef-projet" },
      { label: "FAQ PMO", href: "/blog/faq-pmo" },
    ],
  },
};

/**
 * External resources — mix of internal and outbound links.
 * target="_blank" adds rel="noopener noreferrer" automatically.
 */
export const ExternalMix: Story = {
  args: {
    title: "Ressources externes",
    items: [
      {
        label: "PMI — Project Management Institute (site officiel)",
        href: "https://www.pmi.org",
        target: "_blank",
      },
      {
        label: "Gartner : les tendances du PMO en 2026",
        href: "https://www.gartner.com/pmo-trends-2026",
        target: "_blank",
      },
      {
        label: "Notre whitepaper : Le PMO stratégique (PDF)",
        href: "/resources/whitepaper-pmo-strategique.pdf",
        target: "_blank",
      },
      {
        label: "Notre livre blanc interne (intranet)",
        href: "/intranet/livre-blanc",
      },
    ],
  },
};

/**
 * Maximum density — 10 items (upper bound of the contract).
 */
export const Maximum: Story = {
  args: {
    title: "Pour aller plus loin",
    items: Array.from({ length: 10 }, (_, i) => ({
      label: `Article relié n°${i + 1} — un titre d'article relativement long pour tester le wrapping`,
      href: `/blog/article-${i + 1}`,
    })),
  },
};
