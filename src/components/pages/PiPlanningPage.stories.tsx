import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PiPlanningPage from "./PiPlanningPage";

const meta = {
  title: "Pages/LP PI Planning",
  component: PiPlanningPage,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof PiPlanningPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full landing page for /fr/lp/pi-planning — rebuilt section-by-section from
 * the live airsaas.io/fr/lp/pi-planning page, composed only from DS sections.
 * See PiPlanningPage.tsx for the section-by-section breakdown.
 */
export const Default: Story = {};
