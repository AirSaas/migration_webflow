import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LpNavbar } from "./LpNavbar";

const meta = {
  title: "Layout/LpNavbar",
  component: LpNavbar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LpNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Canonical LP route navbar — logo + single primary CTA. Used at the top of
 * /lp/* pages via `src/app/[locale]/(lp)/layout.tsx`.
 */
export const Default: Story = {
  args: {
    logoAlt: "AirSaas",
    ctaLabel: "Réserver une démo",
    ctaHref: "/fr/meetings-pages",
    logoHref: "/fr",
  },
};

/**
 * English locale — demonstrates the prop-based i18n pattern.
 */
export const English: Story = {
  args: {
    logoAlt: "AirSaas",
    ctaLabel: "Book a demo",
    ctaHref: "/en/meetings-pages",
    logoHref: "/en",
  },
};
