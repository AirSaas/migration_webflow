import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CtaFrame } from "./CtaFrame";
import { CardCta } from "@/components/library-design/ui/CardCta";

const meta = {
  title: "Sections/Call to Action/CtaFrame",
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
      <div
        style={{
          gridColumn: "1 / -1",
          width: "70%",
          margin: "0 auto",
        }}
      >
        <CardCta
          title="Réserver une démo"
          description='AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire "non" avec des données, pas au feeling.'
          ctaLabel="Réservez une démo"
          className="w-full"
        />
      </div>
    ),
  },
};

/**
 * Stacked variant where the inner CardCta only renders the button — no inner
 * title or description. Use when the live page provides only H2 + subtitle on
 * the outer frame and a single button on the inner card (canonical pattern on
 * `/fr/produit/priorisation-par-equipes`, `/fr/equipes/outil-pmo`,
 * `/fr/equipes/comite-direction`, `/fr/equipes/direction-de-la-transformation`).
 *
 * Page-rebuild rule: never invent copy the live doesn't provide — so when the
 * live banner is only "H2 + paragraph + button", omit `title` + `description`
 * on the inner CardCta.
 */
export const StackedButtonOnly: Story = {
  args: {
    title: "Vous voulez l'essayer ?",
    subtitle: "Discutons-en et bénéficiez d'une démo sur mesure",
    children: (
      <div
        style={{
          gridColumn: "1 / -1",
          width: "70%",
          margin: "0 auto",
        }}
      >
        <CardCta ctaLabel="Je veux une démo" className="w-full" />
      </div>
    ),
  },
};

/**
 * Floating cards disabled — opt-out via `floatingCards={false}`.
 *
 * Use this variant when the CTA composition is wide / tight and the decorative
 * FloatingCards would overlap the title or the card grid (e.g. /fr/lp/pmo).
 */
export const WithoutFloatingCards: Story = {
  args: {
    title: "Arrêtez de lancer des projets sans capacité",
    subtitle:
      "Découvrez comment AirSaas simplifie votre capacity planning. AirSaas libère le PMO des tâches administratives pour qu'il puisse enfin se concentrer sur la stratégie.",
    floatingCards: false,
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
