import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InlineCta } from "./InlineCta";

const meta = {
  title: "UI/InlineCta",
  component: InlineCta,
  parameters: { layout: "padded" },
} satisfies Meta<typeof InlineCta>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default usage — mid-article lead magnet download. Tinted primary-2 card +
 * primary button on the right (stacks vertical on mobile).
 */
export const Default: Story = {
  args: {
    text: "Téléchargez notre guide complet du cadrage projet — la checklist en 7 étapes utilisée par 200+ PMO.",
    ctaLabel: "Télécharger le guide",
    ctaHref: "/resources/cadrage-projet-guide.pdf",
  },
};

/**
 * With lead icon — for visual anchor (e.g. a download / mail / bookmark SVG).
 */
export const WithLeadIcon: Story = {
  args: {
    text: "Recevez chaque lundi nos 3 articles phares sur la gestion de projets.",
    ctaLabel: "S'abonner",
    ctaHref: "#newsletter",
    leadIcon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M3 7L12 13L21 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

/**
 * Tertiary CTA button (outline) — less visually aggressive than primary.
 * Use when there's already a primary CTA elsewhere on the page.
 */
export const TertiaryCta: Story = {
  args: {
    text: "Envie d'aller plus loin ? Nous avons publié un benchmark complet sur les outils PPM.",
    ctaLabel: "Voir le benchmark",
    ctaHref: "/blog/benchmark-ppm",
    ctaVariant: "tertiary",
  },
};
