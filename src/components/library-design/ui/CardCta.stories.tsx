import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CardCta } from "./CardCta";

const meta = {
  title: "UI/CardCta",
  component: CardCta,
  parameters: { layout: "centered" },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    ctaLabel: { control: "text" },
    ctaHref: { control: "text" },
  },
} satisfies Meta<typeof CardCta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Réserver une démo",
    description:
      'AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire "non" avec des données, pas au feeling.',
    ctaLabel: "Réservez une démo",
    ctaHref: "#",
  },
};

/**
 * With media thumbnail — 16/9 landscape image above the title. Used on the
 * `/equipes/outil-pmo` page for a video replay teaser.
 */
export const WithMediaThumbnail: Story = {
  args: {
    title: "Voir le replay",
    description:
      "Aurore Butrot, DSI Intuis, nous explique comment elle combine AirSaas et Asana.",
    ctaLabel: "Voir le replay",
    ctaHref: "#",
    mediaThumbnail: {
      src: "https://placehold.co/640x360/3c51e2/ffffff?text=▶+Replay+Intuis",
      alt: "Capture vidéo du replay avec Aurore Butrot",
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-[91.5rem]">
      {/* Single card */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">Single card</span>
        <CardCta
          title="Réserver une démo"
          description='AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire "non" avec des données, pas au feeling.'
          ctaLabel="Réservez une démo"
        />
      </div>

      {/* Side-by-side */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">Side-by-side</span>
        <div className="grid grid-cols-2 gap-[0.875rem]">
          <CardCta
            title="Réserver une démo"
            description='AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire "non" avec des données, pas au feeling.'
            ctaLabel="Réservez une démo"
          />
          <CardCta
            title="Essayer gratuitement"
            description="Découvrez comment AirSaas simplifie votre capacity planning. Déploiement en 4 semaines."
            ctaLabel="Commencer l'essai"
          />
        </div>
      </div>
    </div>
  ),
};
