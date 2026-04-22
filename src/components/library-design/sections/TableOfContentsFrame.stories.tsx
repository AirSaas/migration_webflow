import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TableOfContentsFrame } from "./TableOfContentsFrame";

const meta = {
  title: "Sections/Blog/TableOfContentsFrame",
  component: TableOfContentsFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TableOfContentsFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default — French blog article (matches Figma 303-1104 exactly).
 * Title "SOMMAIRE" is passed pre-uppercased by the caller.
 */
export const Default: Story = {
  args: {
    title: "SOMMAIRE",
    items: [
      {
        label: "L'explosion du nombre de projets transverses",
        href: "#explosion-projets-transverses",
      },
      {
        label: "L'échec du PMO contrôle",
        href: "#echec-pmo-controle",
      },
      {
        label: "Le nouveau rôle du métier de PMO",
        href: "#nouveau-role-pmo",
      },
      {
        label: "Quelles différences entre chef de projet et PMO ?",
        href: "#chef-projet-vs-pmo",
      },
      {
        label: "Quel est le rôle du PMO vis-à-vis du Codir ?",
        href: "#pmo-codir",
      },
      {
        label: "Pourquoi mettre en place un PMO ?",
        href: "#pourquoi-pmo",
      },
      {
        label: "Comment mettre en place un PMO : les étapes clés",
        href: "#comment-mettre-en-place-pmo",
      },
      {
        label: "Le reporting PMO : comment le réussir",
        href: "#reporting-pmo",
      },
      {
        label: "FAQ : les questions fréquentes sur le PMO",
        href: "#faq-pmo",
      },
    ],
  },
};

/**
 * English locale — title is locale-driven, passed by the caller.
 */
export const English: Story = {
  args: {
    title: "CONTENTS",
    items: [
      { label: "Why your PMO is failing in 2026", href: "#why-pmo-failing" },
      { label: "The new role of modern PMOs", href: "#new-role" },
      { label: "Project manager vs PMO — who does what?", href: "#pm-vs-pmo" },
      { label: "How to set up a PMO in 30 days", href: "#setup-30-days" },
      { label: "Reporting: the PMO's best lever", href: "#reporting" },
      { label: "FAQ: common questions about PMOs", href: "#faq" },
    ],
  },
};

/**
 * Minimum — 3 items (lower bound of the contract).
 */
export const Minimum: Story = {
  args: {
    title: "Sommaire",
    items: [
      { label: "Introduction au sujet", href: "#intro" },
      { label: "Les 3 enjeux principaux", href: "#enjeux" },
      { label: "Conclusion et étapes suivantes", href: "#conclusion" },
    ],
  },
};

/**
 * Maximum density — 15 items (upper bound of the contract).
 */
export const Maximum: Story = {
  args: {
    title: "SOMMAIRE",
    items: Array.from({ length: 15 }, (_, i) => ({
      label: `Section ${i + 1} — un titre d'article relativement long pour tester le wrapping`,
      href: `#section-${i + 1}`,
    })),
  },
};
