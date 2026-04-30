import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ComparisonTableFrame } from "./ComparisonTableFrame";

const meta = {
  title: "Sections/Comparison Sections/ComparisonFrame/Table",
  component: ComparisonTableFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ComparisonTableFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Feature comparison table — AirSaas vs a competitor.
 *
 * Each row is a card with a wide left "feature" cell (bold title +
 * description) and one or more narrow right cells (check / X / text).
 * The highlighted column gets a soft primary tint so the AirSaas
 * advantage reads at a glance.
 */
export const Default: Story = {
  args: {
    titleHighlight: "AirSaas",
    title: "vs Planview Portfolio",
    subtitle:
      "Une comparaison fonctionnalité par fonctionnalité pour vous aider à choisir l'outil PPM le mieux adapté à votre organisation.",
    columns: [
      { label: "AirSaas", highlight: true },
      { label: "Planview Portfolio" },
    ],
    rows: [
      {
        feature: "Visualisation simplifiée de votre portefeuille de projets",
        description:
          "Du paramétrage à la prise en main quotidienne, la plateforme AirSaas ne demande aucune compétence technique. Vous naviguez de manière simple entre vos différents projets, portefeuilles, et vues filtrées par météo, jalons et risques. Tout le monde, depuis votre Codir jusqu'à vos métiers, s'empare aisément de la plateforme — et personne ne peut plus s'en passer.",
        values: [true, false],
      },
      {
        feature: "Vue Kanban pour fluidifier votre processus de décision",
        description:
          "Sur AirSaas, vous accédez à l'intégralité de l'historique de vos projets sans devoir aller chercher vos données dans vos mails ou vos flux de discussions instantanées. La plateforme vous permet de vous focaliser sur une vue simple et macro, pour piloter par la décision et prendre vos décisions plus rapidement en Copil.",
        values: [true, false],
      },
      {
        feature: "Fiches de cadrage projet collaboratives",
        description:
          "AirSaas vous permet de co-créer vos fiches de cadrage avec vos chefs de projet et vos métiers, pour aligner tout le monde autour d'une même culture projet. Collaborer pour mieux transformer : c'est le crédo de la plateforme PPM.",
        values: [true, false],
      },
      {
        feature: "Bilan de projet en un clic",
        description:
          "Tout au long du cycle de vie de vos projets, AirSaas centralise les enseignements et capitalise pour vos futures transformations.",
        values: [true, false],
      },
      {
        feature: "Tarification transparente",
        description: "Pricing simple, basé sur le nombre d'utilisateurs actifs.",
        values: [true, "Sur devis"],
      },
      {
        feature: "Déploiement rapide",
        description: "Mise en route en moins de 2 semaines avec accompagnement dédié.",
        values: ["< 2 semaines", "3 à 6 mois"],
      },
    ],
  },
};

/**
 * Check + descriptive text variant — used when each cell needs both an
 * icon AND short qualitative explanation (e.g. "Avec AirSaas" column on
 * `/equipes/comite-direction` "7 raisons" table). Pass cell value as
 * `{ type: "check" | "x", text: "..." }` to render the icon centered
 * above multi-line text.
 */
export const CheckWithText: Story = {
  args: {
    titleHighlight: "5 raisons",
    title:
      "pour lesquelles les directions générales adorent AirSaas",
    featuresLabel: "Quotidien CODIR",
    columns: [
      { label: "Sans AirSaas" },
      { label: "Avec AirSaas", highlight: true },
    ],
    rows: [
      {
        feature: "Reporting projet / CoPil",
        values: [
          { type: "x", text: "Reporting à la main, trop hétérogène et chronophage" },
          { type: "check", text: "Reporting décisionnel uniforme, généré automatiquement" },
        ],
      },
      {
        feature: "Pilotage",
        values: [
          { type: "x", text: "Pilotage à la tâche, complexe à suivre" },
          { type: "check", text: "Pilotage agile par les jalons, vue macro parfaite" },
        ],
      },
      {
        feature: "Culture projet",
        values: [
          { type: "x", text: "Culture projet interne hétérogène, voire inexistante" },
          { type: "check", text: "Culture standardisée qui pousse vers l'excellence" },
        ],
      },
      {
        feature: "Management",
        values: [
          { type: "x", text: "Micro-management pour gérer vos collaborateurs" },
          { type: "check", text: "Responsabilisation de chacun grâce à une vision simplifiée" },
        ],
      },
      {
        feature: "Intégrations",
        values: [
          { type: "x", text: "Micro-information dispersée entre différents outils" },
          { type: "check", text: "Synchronisation native avec vos outils" },
        ],
      },
    ],
  },
};

/**
 * Three-column variant — AirSaas vs two competitors.
 */
export const ThreeCompetitors: Story = {
  args: {
    titleHighlight: "Comparez",
    title: "AirSaas avec les autres outils PPM",
    subtitle:
      "Au-delà des fonctionnalités, c'est la simplicité d'usage et la rapidité de mise en œuvre qui font la différence au quotidien.",
    columns: [
      { label: "AirSaas", highlight: true },
      { label: "Planview" },
      { label: "Sciforma" },
    ],
    rows: [
      {
        feature: "Prise en main < 1 jour",
        description: "Aucune formation longue requise — l'interface est pensée pour des utilisateurs métier.",
        values: [true, false, false],
      },
      {
        feature: "Vue portefeuille temps réel",
        description: "Météo des projets, jalons et risques actualisés à chaque interaction.",
        values: [true, true, false],
      },
      {
        feature: "Reporting COMEX en 1 clic",
        description: "Génération automatique de flash reports prêts à diffuser.",
        values: [true, false, false],
      },
      {
        feature: "Tarification",
        values: ["Par utilisateur", "Sur devis", "Sur devis"],
      },
      {
        feature: "Déploiement",
        values: ["< 2 semaines", "3-6 mois", "6-12 mois"],
      },
    ],
  },
};
