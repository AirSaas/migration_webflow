import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PpmPage from "./PpmPage";

const meta = {
  title: "Pages/LP PPM",
  component: PpmPage,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof PpmPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full landing page for /fr/lp/ppm — composed from the "Estructura LP PPM"
 * marketing document. See PpmPage.tsx for the section-by-section breakdown.
 */
export const Default: Story = {};
