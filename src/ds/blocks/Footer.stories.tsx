import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./Footer";

const meta = {
  title: "Blocks/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: [
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
          { label: "Les Pro. de la Transfo." },
          { label: "Le blog d'AirSaas" },
          { label: "La conduite de projet" },
          { label: "Portfolio project Management" },
          { label: "Témoignages clients" },
        ],
      },
      {
        title: "Solutions",
        links: [
          { label: "Management de portefeuille projet" },
          { label: "Flash report automatisé" },
          { label: "Flash report projet" },
          { label: "Outil PPM" },
          { label: "Outil de pilotage projet" },
          { label: "Outil de gestion de portefeuille projet" },
          { label: "Plan stratégique" },
          { label: "Portfolio management" },
          { label: "Revue de portefeuille" },
          { label: "Tableau de bord portefeuille de projet" },
          { label: "Tableau de bord DSI" },
          { label: "Tableau de bord de gestion de projet" },
        ],
      },
      {
        title: "Le Quarter Plan & les cadres méthodologiques",
        links: [
          { label: "AirSaas, le Quarter Plan et l'effectuation" },
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
    ],
  },
};
