import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Heading } from "./Heading";

const meta = {
  title: "UI/Heading",
  component: Heading,
  argTypes: {
    level: { control: "select", options: [1, 2, 3] },
    gradient: {
      control: "select",
      options: ["dark-to-primary", "primary", "none"],
    },
    align: { control: "radio", options: ["center", "left"] },
    children: { control: "text" },
    className: { control: false },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: 2,
    children: "Build better projects",
    gradient: "dark-to-primary",
    align: "center",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {([1, 2, 3] as const).map((level) =>
        (["dark-to-primary", "primary", "none"] as const).map((gradient) => (
          <div key={`${level}-${gradient}`} className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text-muted">
              level={level} gradient=&quot;{gradient}&quot;
            </span>
            <Heading level={level} gradient={gradient}>
              Build better projects
            </Heading>
          </div>
        ))
      )}
    </div>
  ),
};
