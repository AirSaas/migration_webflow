import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InsightCallout } from "./InsightCallout";

const meta = {
  title: "UI/InsightCallout",
  component: InsightCallout,
  parameters: { layout: "padded" },
} satisfies Meta<typeof InsightCallout>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  "Un cadrage solide évite 80 % des dérapages en production — c'est l'investissement le plus rentable du projet.",
  "Nommer un sponsor explicite est non-négociable : sans lui, les décisions structurantes restent en suspens.",
  "Écrire ce qui N'EST PAS dans le périmètre est aussi important que ce qui l'est.",
  "Deux semaines de cadrage font gagner deux mois en exécution.",
];

/**
 * Default usage — "À retenir" box at the end of a blog article section.
 * Primary variant (primary-2 bg + primary-40 left border + primary text/icons).
 */
export const Default: Story = {
  args: {
    title: "À retenir",
    items: sampleItems,
  },
};

/**
 * Success variant — for positive takeaways ("Ce qu'on a gagné avec AirSaas").
 */
export const Success: Story = {
  args: {
    title: "Les gains observés",
    items: [
      "Réduction de 40 % du temps de consolidation des flash reports.",
      "Doublement du taux de participation aux comités de pilotage.",
      "Délai moyen de décision divisé par 3.",
    ],
    variant: "success",
  },
};

/**
 * Warning variant — for caveats / gotchas ("Attention aux pièges").
 */
export const Warning: Story = {
  args: {
    title: "Pièges à éviter",
    items: [
      "Ne jamais démarrer un projet sans sponsor nommé.",
      "Ne pas confondre une réunion de cadrage avec un comité de pilotage.",
      "Éviter de laisser le périmètre flou — il dérivera inévitablement.",
    ],
    variant: "warning",
  },
};

/**
 * Minimum bound — 2 items. Verifies the block still feels balanced with a
 * short insight list.
 */
export const TwoItems: Story = {
  args: {
    title: "En résumé",
    items: [
      "Un bon cadrage est l'investissement le plus rentable du cycle de vie projet.",
      "Sans sponsor identifié, toute décision structurante reste en suspens.",
    ],
  },
};
