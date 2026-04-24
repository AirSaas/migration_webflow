import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LpFooter } from "./LpFooter";

const meta = {
  title: "Layout/LpFooter",
  component: LpFooter,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LpFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Canonical LP route footer — minimal 3-zone layout (copyright left, logo
 * center, made-with right). Used at the bottom of /lp/* pages via
 * `src/app/[locale]/(lp)/layout.tsx`.
 */
export const Default: Story = {
  args: {
    logoAlt: "AirSaas",
    copyrightText: "© 2025 AirSaas · Mentions légales · Confidentialité",
    copyrightHref: "/fr/mentions-legales",
    madeWithText: "Made with love in France",
    localeFlag: <span aria-label="France">🇫🇷</span>,
    logoHref: "/fr",
  },
};

/**
 * English locale — demonstrates the prop-based i18n pattern.
 */
export const English: Story = {
  args: {
    logoAlt: "AirSaas",
    copyrightText: "© 2025 AirSaas · Legal notice · Privacy",
    copyrightHref: "/en/legal-notice",
    madeWithText: "Made with love in France",
    localeFlag: <span aria-label="France">🇫🇷</span>,
    logoHref: "/en",
  },
};
