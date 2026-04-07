import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tag } from "./Tag";

const meta = {
  title: "Primitives/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["muted", "success", "warning"] },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Muted: Story = {
  args: {
    children: "Capacity Planning simplifié",
    variant: "muted",
  },
};

export const Success: Story = {
  args: {
    children: "Opérationnel en 1 mois",
    variant: "success",
  },
};

export const SuccessCustomIcon: Story = {
  args: {
    children: "Aucune compétence technique requise",
    variant: "success",
    icon: undefined,
  },
};

export const Warning: Story = {
  args: {
    children: "En attente",
    variant: "warning",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Tag variant="muted">Capacity Planning simplifié</Tag>
      <Tag variant="success">Opérationnel en 1 mois</Tag>
      <Tag variant="success">Aucune compétence technique requise</Tag>
      <Tag variant="warning">En attente de validation</Tag>
    </div>
  ),
};
