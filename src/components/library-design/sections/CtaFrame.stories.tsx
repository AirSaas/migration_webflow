import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CtaFrame } from "./CtaFrame";
import { CardCta } from "@/components/library-design/ui/CardCta";

const meta = {
  title: "Sections/CtaFrame",
  component: CtaFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CtaFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Split: Story = {
  args: {
    title: "Arrêtez de lancer des projets sans capacité",
    subtitle:
      "Découvrez comment AirSaas simplifie votre capacity planning. AirSaas libère le PMO des tâches administratives pour qu'il puisse enfin se concentrer sur la stratégie.",
    children: (
      <>
        <CardCta
          title="Réserver une démo"
          description='AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire "non" avec des données, pas au feeling.'
          ctaLabel="Réservez une démo"
          className="flex-1"
        />
        <CardCta
          title="Découvrir le guide Capacity Planning"
          description="Captez les gestes qui comptent et mettez-les en pratique."
          ctaLabel="Télécharger le guide"
          className="flex-1"
        />
      </>
    ),
  },
};

export const Stacked: Story = {
  args: {
    title: "Arrêtez de lancer des projets sans capacité",
    subtitle:
      "Découvrez comment AirSaas simplifie votre capacity planning. AirSaas libère le PMO des tâches administratives pour qu'il puisse enfin se concentrer sur la stratégie.",
    children: (
      <CardCta
        title="Réserver une démo"
        description='AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire "non" avec des données, pas au feeling.'
        ctaLabel="Réservez une démo"
        className="w-full"
      />
    ),
  },
};
