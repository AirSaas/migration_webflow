import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "Primitives/Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "tertiary", "ghost"] },
    size: { control: "select", options: ["sm", "md"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryMedium: Story = {
  args: { children: "Demander une démo", variant: "primary", size: "md" },
};

export const PrimarySmall: Story = {
  args: { children: "Découvrir", variant: "primary", size: "sm" },
};

export const SecondaryMedium: Story = {
  args: { children: "Réserver une démo personnalisée", variant: "secondary", size: "md" },
};

export const SecondarySmall: Story = {
  args: { children: "En savoir plus", variant: "secondary", size: "sm" },
};

export const TertiaryMedium: Story = {
  args: { children: "Tertiary Button", variant: "tertiary", size: "md" },
};

export const TertiarySmall: Story = {
  args: { children: "Tertiary Button", variant: "tertiary", size: "sm" },
};

export const GhostMedium: Story = {
  args: { children: "Tertiary Button", variant: "ghost", size: "md" },
};

export const GhostSmall: Story = {
  args: { children: "Tertiary Button", variant: "ghost", size: "sm" },
};

export const AsLink: Story = {
  args: { children: "Découvrir AirSaas", variant: "primary", href: "#" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-start">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">Medium</span>
        <div className="flex gap-4 items-center flex-wrap">
          <Button variant="primary" size="md">Primary Button</Button>
          <Button variant="secondary" size="md">Secondary Button</Button>
          <Button variant="tertiary" size="md">Tertiary Button</Button>
          <Button variant="ghost" size="md">Ghost Button</Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">Small</span>
        <div className="flex gap-4 items-center flex-wrap">
          <Button variant="primary" size="sm">Primary Button</Button>
          <Button variant="secondary" size="sm">Secondary Button</Button>
          <Button variant="tertiary" size="sm">Tertiary Button</Button>
          <Button variant="ghost" size="sm">Ghost Button</Button>
        </div>
      </div>
    </div>
  ),
};
