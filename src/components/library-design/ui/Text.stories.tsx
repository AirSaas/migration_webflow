import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "./Text";

const meta = {
  title: "UI/Text",
  component: Text,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    align: { control: "radio", options: ["center", "left"] },
    maxWidth: { control: "text" },
    children: { control: "text" },
    className: { control: false },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      "AirSaaS helps teams deliver projects on time with real-time visibility and smart automation.",
    size: "md",
    align: "left",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sm", "md", "lg"] as const).map((size) =>
        (["left", "center"] as const).map((align) => (
          <div key={`${size}-${align}`} className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text-muted">
              size=&quot;{size}&quot; align=&quot;{align}&quot;
            </span>
            <Text size={size} align={align}>
              AirSaaS helps teams deliver projects on time with real-time
              visibility and smart automation.
            </Text>
          </div>
        ))
      )}
    </div>
  ),
};
