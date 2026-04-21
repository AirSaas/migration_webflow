import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RevuePortefeuillePage from "./RevuePortefeuillePage";

const meta = {
  title: "Pages/Solutions/RevuePortefeuillePage",
  component: RevuePortefeuillePage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof RevuePortefeuillePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
