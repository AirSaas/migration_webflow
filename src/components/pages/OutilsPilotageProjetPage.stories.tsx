import type { Meta, StoryObj } from "@storybook/react-vite";
import { OutilsPilotageProjetPage } from "./OutilsPilotageProjetPage";

const meta: Meta<typeof OutilsPilotageProjetPage> = {
  title: "Pages/OutilsPilotageProjetPage",
  component: OutilsPilotageProjetPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof OutilsPilotageProjetPage>;

export const Default: Story = {};
