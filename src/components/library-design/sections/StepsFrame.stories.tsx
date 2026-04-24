import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StepsFrame } from "./StepsFrame";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import {
  GearsIcon,
  CirclePlusIcon,
  ArrowsRotateIcon,
  BanIcon,
} from "@/components/library-design/ui/icons/illustration-icons";

function LgIcon({
  children,
  variant = "dark",
}: {
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  return (
    <IconIllustration variant={variant} size="lg">
      {children}
    </IconIllustration>
  );
}

const meta = {
  title: "Sections/Value Proposition Sections/StepsFrame",
  component: StepsFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StepsFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Canonical LP usage — mirrors "Lancez votre déploiement en 4 étapes" from
 * airsaas.io/fr/lp/ppm. 4 numbered steps in a horizontal row with chevron
 * connectors between them (visible on md+).
 */
export const LpPpmDeployment: Story = {
  args: {
    tag: "DÉPLOIEMENT",
    titleHighlight: "4 étapes",
    title: "pour lancer votre PPM",
    subtitle:
      "Nos équipes vous accompagnent pour que votre outil PPM soit opérationnel en moins d'un mois.",
    steps: [
      {
        icon: (
          <LgIcon>
            <BanIcon />
          </LgIcon>
        ),
        title: "Kick-off",
        description:
          "Cadrage des objectifs, des rôles et du périmètre avec votre sponsor et le chef de projet AirSaas.",
      },
      {
        icon: (
          <LgIcon>
            <CirclePlusIcon />
          </LgIcon>
        ),
        title: "Import",
        description:
          "Import de votre portefeuille existant — projets, équipes, budgets — depuis vos outils actuels.",
      },
      {
        icon: (
          <LgIcon>
            <ArrowsRotateIcon />
          </LgIcon>
        ),
        title: "Configuration",
        description:
          "Paramétrage des vues, reportings et règles de priorisation adaptés à votre gouvernance.",
      },
      {
        icon: (
          <LgIcon>
            <GearsIcon />
          </LgIcon>
        ),
        title: "Go live",
        description:
          "Formation des équipes, mise en production et suivi d'adoption pendant les 30 premiers jours.",
      },
    ],
  },
};

/**
 * Dark variant — primary-70 background, white typography, white chevrons.
 */
export const Dark: Story = {
  args: {
    variant: "dark",
    tag: "DÉPLOIEMENT",
    title: "4 étapes pour lancer votre PPM",
    subtitle:
      "Nos équipes vous accompagnent pour que votre outil PPM soit opérationnel en moins d'un mois.",
    steps: [
      {
        icon: (
          <LgIcon variant="light">
            <BanIcon color="white" />
          </LgIcon>
        ),
        title: "Kick-off",
        description:
          "Cadrage des objectifs, des rôles et du périmètre avec votre sponsor.",
      },
      {
        icon: (
          <LgIcon variant="light">
            <CirclePlusIcon color="white" />
          </LgIcon>
        ),
        title: "Import",
        description:
          "Import de votre portefeuille existant — projets, équipes, budgets.",
      },
      {
        icon: (
          <LgIcon variant="light">
            <ArrowsRotateIcon color="white" />
          </LgIcon>
        ),
        title: "Configuration",
        description:
          "Paramétrage des vues, reportings et règles de priorisation.",
      },
      {
        icon: (
          <LgIcon variant="light">
            <GearsIcon color="white" />
          </LgIcon>
        ),
        title: "Go live",
        description:
          "Formation des équipes, mise en production et suivi d'adoption.",
      },
    ],
  },
};

/**
 * Minimum bound — 3 steps. Verifies the row still feels balanced.
 */
export const ThreeSteps: Story = {
  args: {
    tag: "COMMENT ÇA MARCHE",
    titleHighlight: "3 étapes",
    title: "pour démarrer votre capacity planning",
    steps: [
      {
        icon: (
          <LgIcon>
            <BanIcon />
          </LgIcon>
        ),
        title: "Import équipes",
        description:
          "Connectez vos équipes et leurs capacités actuelles depuis vos outils RH.",
      },
      {
        icon: (
          <LgIcon>
            <CirclePlusIcon />
          </LgIcon>
        ),
        title: "Priorisation",
        description:
          "Chaque équipe priorise ses projets en fonction de la charge disponible.",
      },
      {
        icon: (
          <LgIcon>
            <GearsIcon />
          </LgIcon>
        ),
        title: "Suivi",
        description:
          "Visualisez l'avancement et ajustez en continu via le flash report.",
      },
    ],
  },
};

/**
 * Maximum bound — 5 steps. Verifies the row density stays readable on lg.
 */
export const FiveSteps: Story = {
  args: {
    tag: "PI PLANNING",
    titleHighlight: "5 étapes",
    title: "pour orchestrer vos PI planning",
    steps: [
      {
        icon: (
          <LgIcon>
            <BanIcon />
          </LgIcon>
        ),
        title: "Cadrage",
        description: "Définissez le périmètre et les objectifs du PI.",
      },
      {
        icon: (
          <LgIcon>
            <CirclePlusIcon />
          </LgIcon>
        ),
        title: "Breakdown",
        description: "Découpez les features en user stories par équipe.",
      },
      {
        icon: (
          <LgIcon>
            <ArrowsRotateIcon />
          </LgIcon>
        ),
        title: "Alignement",
        description: "Synchronisez les dépendances entre équipes.",
      },
      {
        icon: (
          <LgIcon>
            <GearsIcon />
          </LgIcon>
        ),
        title: "Execution",
        description: "Lancez le PI et suivez les risques au fil de l'eau.",
      },
      {
        icon: (
          <LgIcon>
            <BanIcon />
          </LgIcon>
        ),
        title: "Retrospective",
        description: "Capturez les leçons et ajustez le prochain PI.",
      },
    ],
  },
};

/**
 * No connectors — use when the steps are meant to read as a checklist rather
 * than a directional sequence (rare; default is connectors ON).
 */
export const NoConnectors: Story = {
  args: {
    ...LpPpmDeployment.args,
    showConnectors: false,
  },
};
