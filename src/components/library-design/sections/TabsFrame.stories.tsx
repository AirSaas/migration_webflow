import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TabsFrame } from "./TabsFrame";

const meta = {
  title: "Sections/Navigation Sections/TabsFrame",
  component: TabsFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TabsFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

const lpTabs = [
  { label: "Capacity planning", href: "#capacity" },
  { label: "Scénarios", href: "#scenarios" },
  { label: "Priorisation", href: "#priorisation" },
  { label: "Reporting", href: "#reporting" },
  { label: "Sécurité", href: "#securite" },
  { label: "FAQ", href: "#faq" },
];

/**
 * Canonical LP usage — 6 hero-adjacent tabs linking to page sections.
 * Mirrors the pattern on /lp/capacity-planning, /lp/pmo, /lp/ppm, /lp/pi-planning.
 */
export const LpSixTabs: Story = {
  args: {
    tabs: lpTabs,
    ariaLabel: "Sections de la page",
  },
};

/**
 * Minimum bound — 3 tabs. Verifies layout stays balanced with a small count.
 */
export const ThreeTabs: Story = {
  args: {
    tabs: lpTabs.slice(0, 3),
    ariaLabel: "Sections de la page",
  },
};

/**
 * Dark variant — primary-70 background. Use when the Hero below is already
 * light and we want a visual break at the tabs bar.
 */
export const Dark: Story = {
  args: {
    variant: "dark",
    tabs: lpTabs,
    ariaLabel: "Sections de la page",
  },
};

/**
 * Sticky mode — the bar pins to the top of the viewport when scrolled past.
 * Use sparingly — some LPs don't want the persistent top nav.
 */
export const Sticky: Story = {
  args: {
    tabs: lpTabs,
    sticky: true,
    ariaLabel: "Sections de la page",
  },
};
