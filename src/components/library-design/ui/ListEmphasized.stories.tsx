import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ListEmphasized } from "./ListEmphasized";

const meta = {
  title: "UI/ListEmphasized",
  component: ListEmphasized,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ListEmphasized>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      "Peut-on faire plus de projets ? Faut-il en enlever ?",
      "Quels sont les jalons qui nous plombent ? Peut-on les d\u00e9couper ?",
      "Doit-on recruter ou mettre l\u2019\u00e9quipe en tension ? Pendant combien de temps ?",
    ],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      "Visualisez la charge de vos \u00e9quipes en un coup d\u2019\u0153il.",
      "Prenez des d\u00e9cisions fond\u00e9es sur des donn\u00e9es concr\u00e8tes.",
    ],
  },
};

export const FourItems: Story = {
  args: {
    items: [
      "Planifiez les ressources",
      "Priorisez les projets",
      "Suivez l\u2019avancement",
      "Anticipez les risques",
    ],
  },
};
