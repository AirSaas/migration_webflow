import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PriorisationEquipesPage from "./PriorisationEquipesPage";

const meta = {
  title: "Pages/PriorisationEquipesPage",
  component: PriorisationEquipesPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PriorisationEquipesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
