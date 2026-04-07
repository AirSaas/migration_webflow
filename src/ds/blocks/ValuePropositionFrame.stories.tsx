import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ValuePropositionFrame } from "./ValuePropositionFrame";
import { FeatureCard } from "@/ds/primitives/FeatureCard";
import { IconIllustration } from "@/ds/primitives/IconIllustration";
import { CalendarDayIcon, StopwatchIcon, BullseyeArrowIcon, SuitcaseIcon, ChevronCircleIcon } from "@/ds/primitives/icons/illustration-icons";

function Icon({ children }: { children: React.ReactNode }) {
  return <IconIllustration variant="dark" size="md">{children}</IconIllustration>;
}

const meta = {
  title: "Blocks/ValuePropositionFrame",
  component: ValuePropositionFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ValuePropositionFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tag: "Capacity Planning & Gouvernance de portefeuille",
    titleHighlight: "Les chiffres",
    title: "qui vous feront adopter AirSaas",
    subtitle: "Un déploiement simple et accompagné, pas un projet IT de 6 mois.",
    children: (
      <>
        <FeatureCard
          icon={<Icon><CalendarDayIcon /></Icon>}
          title="1 mois"
          description="Déploiement complet en 4 semaines, pas un projet IT de 6 mois."
          className="flex-1"
        />
        <FeatureCard
          icon={<Icon><BullseyeArrowIcon /></Icon>}
          title="100%"
          description="De visibilité sur la capacité réelle de vos équipes."
          className="flex-1"
        />
        <FeatureCard
          icon={<Icon><StopwatchIcon /></Icon>}
          title="+40%"
          description="De gain de temps pour vos PMO sur les tâches administratives."
          className="flex-1"
        />
        <FeatureCard
          icon={<Icon><SuitcaseIcon /></Icon>}
          title="10min"
          description="Pour générer un rapport flash automatique pour le COMEX."
          className="flex-1"
        />
      </>
    ),
  },
};

export const WithoutTag: Story = {
  args: {
    titleHighlight: "Opérationnel",
    title: "en 1 mois",
    subtitle: "Un déploiement simple et accompagné, pas un projet IT de 6 mois.",
    children: (
      <>
        <FeatureCard
          icon={<Icon><CalendarDayIcon /></Icon>}
          title="Semaine 1"
          subtitle="Setup"
          description="Configuration initiale et import de vos données."
          className="flex-1"
        />
        <FeatureCard
          icon={<Icon><BullseyeArrowIcon /></Icon>}
          title="Semaine 2"
          subtitle="Formation"
          description="Accompagnement de vos équipes sur la plateforme."
          className="flex-1"
        />
        <FeatureCard
          icon={<Icon><StopwatchIcon /></Icon>}
          title="Semaine 3"
          subtitle="Pilote"
          description="Lancement sur un périmètre restreint."
          className="flex-1"
        />
        <FeatureCard
          icon={<Icon><SuitcaseIcon /></Icon>}
          title="Semaine 4"
          subtitle="Go live"
          description="Déploiement complet et autonomie."
          className="flex-1"
        />
      </>
    ),
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
    title: "Opérationnel en 1 mois",
    subtitle: "Un déploiement simple et accompagné, pas un projet IT de 6 mois.",
    children: (
      <>
        <FeatureCard
          icon={<Icon><CalendarDayIcon /></Icon>}
          title="Équipes"
          description="Embarquez vos équipes sans formation complexe."
          className="flex-1"
        />
        <FeatureCard
          icon={<Icon><BullseyeArrowIcon /></Icon>}
          title="Projets"
          description="Importez vos projets en quelques clics."
          className="flex-1"
        />
        <FeatureCard
          icon={<Icon><StopwatchIcon /></Icon>}
          title="Scénarios"
          description="Testez différents scénarios capacitaires."
          className="flex-1"
        />
        <FeatureCard
          icon={<Icon><SuitcaseIcon /></Icon>}
          title="Décidez"
          description="Prenez vos décisions basées sur des données."
          className="flex-1"
        />
      </>
    ),
  },
};
