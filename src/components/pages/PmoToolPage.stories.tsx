import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PmoToolPage from "./PmoToolPage";

const meta = {
  title: "Pages/Products/PmoToolPage",
  component: PmoToolPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PmoToolPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
