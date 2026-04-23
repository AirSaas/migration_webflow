import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TableFrame } from "./TableFrame";

const meta = {
  title: "UI/TableFrame",
  component: TableFrame,
  parameters: { layout: "padded" },
} satisfies Meta<typeof TableFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default — the chef-de-projet vs PMO comparison from the blog article body
 * (Figma 309-1899). 3 columns, 6 rows, first column used as row labels.
 */
export const Default: Story = {
  args: {
    firstColumnBold: true,
    columns: ["Critère", "Chef de projet", "PMO"],
    rows: [
      [
        "Compétences clés",
        "Technique, gestion d'équipe, rigueur",
        "Méthodes, reporting portefeuille, gouvernance",
      ],
      [
        "Périmètre",
        "1 projet (du cadrage au bilan)",
        "N projets (vue transverse)",
      ],
      [
        "Rattachement",
        "Direction métier ou DSI",
        "Direction générale, DSI, transformation",
      ],
      [
        "Autorité",
        "Hiérarchique ou fonctionnelle sur l'équipe projet",
        "Fonctionnelle — influence sans hiérarchie",
      ],
      [
        "Livrables",
        "Produit / solution livrée",
        "Vision consolidée du portefeuille",
      ],
      [
        "Horizon",
        "Court / moyen terme (durée du projet)",
        "Moyen / long terme (cycles stratégiques)",
      ],
    ],
  },
};

/**
 * Minimal — 2 columns, 2 rows (lower bounds of the contract).
 */
export const Minimal: Story = {
  args: {
    columns: ["Métrique", "Valeur"],
    rows: [
      ["Projets gérés", "42"],
      ["Équipes impliquées", "8"],
    ],
  },
};

/**
 * Rich cells — cells can contain bold, links, and inline markup.
 */
export const RichCells: Story = {
  args: {
    columns: ["Phase", "Objectif", "Ressources"],
    rows: [
      [
        <strong key="p">Cadrage</strong>,
        "Aligner les parties prenantes sur les objectifs",
        <a key="r" href="#" className="text-primary hover:underline">
          Voir les templates
        </a>,
      ],
      [
        <strong key="p">Exécution</strong>,
        "Livrer les lots conformément au plan",
        "Chef de projet + équipe core",
      ],
      [
        <strong key="p">Bilan</strong>,
        "Capitaliser sur les apprentissages",
        "Revue a posteriori + documentation",
      ],
    ],
  },
};

/**
 * Wide — 5 columns stress-test to verify horizontal scroll on narrow viewports.
 */
export const Wide: Story = {
  args: {
    columns: ["Outil", "Équipe", "Coût", "Adoption", "Statut"],
    rows: [
      ["AirSaas", "Transformation", "€€", "85 %", "En production"],
      ["Jira", "IT", "€", "100 %", "Historique"],
      ["Notion", "Produit", "€", "60 %", "En pilote"],
      ["Airtable", "Marketing", "€", "40 %", "À évaluer"],
    ],
  },
};
