import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PillarFrame } from "./PillarFrame";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import {
  BanIcon,
  CirclePlusIcon,
  ArrowsRotateIcon,
  GearsIcon,
  LockKeyholeIcon,
  IndustryIcon,
  BullseyeArrowIcon,
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
  title: "Sections/Value Proposition Sections/ValuePropositionFrame/Pillars",
  component: PillarFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PillarFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * DAKI retrospective framework — Drop / Add / Keep / Improve.
 * A 2×2 grid where each pillar has a large icon, a colored uppercase label,
 * a description, and an optional "example" note styled like a pull-quote.
 */
export const DAKI: Story = {
  args: {
    titleHighlight: "Améliorer",
    title: "en continu votre manière de faire des projets",
    subtitle:
      "Générez en un clic le bilan d'un projet contenant les métriques (délai, coût, engagement, etc.) mais aussi les retours \u201CDAKI\u201D de l'équipe projet. Parfait pour s'améliorer ensemble.",
    columns: 2,
    pillars: [
      {
        icon: (
          <LgIcon>
            <BanIcon />
          </LgIcon>
        ),
        title: "Drop",
        description: "Ce que vous souhaitez arrêter.",
        example: "Démarrer un projet sans avoir nommé de sponsor.",
        exampleLabel: "Exemple",
      },
      {
        icon: (
          <LgIcon>
            <CirclePlusIcon />
          </LgIcon>
        ),
        title: "Add",
        description: "Ce que vous aimeriez essayer.",
        example: "Ajouter un utilisateur final à chaque review.",
        exampleLabel: "Exemple",
      },
      {
        icon: (
          <LgIcon>
            <ArrowsRotateIcon />
          </LgIcon>
        ),
        title: "Keep",
        description: "Ce qu'il faut garder.",
        example: "Le point d'avancement bi-mensuel avec le flash report.",
        exampleLabel: "Exemple",
      },
      {
        icon: (
          <LgIcon>
            <GearsIcon />
          </LgIcon>
        ),
        title: "Improve",
        description: "Ce que vous souhaitez améliorer.",
        example:
          "Améliorer la précision des maquettes pour couvrir tous les effets de bord.",
        exampleLabel: "Exemple",
      },
    ],
  },
};

/**
 * Compact 4-column variant — used for trust-badge rows (e.g. security:
 * ISO 27001 / France-hosted / Pentest / SSO). Each card stays short
 * (≤20-char title, ≤30-char description) to keep the strip visually balanced.
 */
export const FourColumns: Story = {
  args: {
    title: "au top",
    titleHighlight: "Sécurité",
    subtitle:
      "AirSaas passe la porte des DSI les plus exigeantes.",
    columns: 4,
    pillars: [
      {
        icon: (
          <LgIcon>
            <LockKeyholeIcon />
          </LgIcon>
        ),
        title: "ISO 27001",
        description: "Certifié",
      },
      {
        icon: (
          <LgIcon>
            <IndustryIcon />
          </LgIcon>
        ),
        title: "Hébergé en France",
        description: "Scaleway",
      },
      {
        icon: (
          <LgIcon>
            <BullseyeArrowIcon />
          </LgIcon>
        ),
        title: "Pentest",
        description: "Résultats sur demande",
      },
      {
        icon: (
          <LgIcon>
            <GearsIcon />
          </LgIcon>
        ),
        title: "SSO / SAML",
        description: "Intégration AD",
      },
    ],
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
    title: "Améliorer en continu votre manière de faire des projets",
    subtitle:
      "Générez en un clic le bilan d'un projet contenant les métriques (délai, coût, engagement, etc.) mais aussi les retours \u201CDAKI\u201D de l'équipe projet.",
    columns: 2,
    pillars: [
      {
        icon: (
          <LgIcon variant="light">
            <BanIcon color="white" />
          </LgIcon>
        ),
        title: "Drop",
        description: "Ce que vous souhaitez arrêter.",
        example: "Démarrer un projet sans avoir nommé de sponsor.",
        exampleLabel: "Exemple",
      },
      {
        icon: (
          <LgIcon variant="light">
            <CirclePlusIcon color="white" />
          </LgIcon>
        ),
        title: "Add",
        description: "Ce que vous aimeriez essayer.",
        example: "Ajouter un utilisateur final à chaque review.",
        exampleLabel: "Exemple",
      },
      {
        icon: (
          <LgIcon variant="light">
            <ArrowsRotateIcon color="white" />
          </LgIcon>
        ),
        title: "Keep",
        description: "Ce qu'il faut garder.",
        example: "Le point d'avancement bi-mensuel avec le flash report.",
        exampleLabel: "Exemple",
      },
      {
        icon: (
          <LgIcon variant="light">
            <GearsIcon color="white" />
          </LgIcon>
        ),
        title: "Improve",
        description: "Ce que vous souhaitez améliorer.",
        example:
          "Améliorer la précision des maquettes pour couvrir tous les effets de bord.",
        exampleLabel: "Exemple",
      },
    ],
  },
};
