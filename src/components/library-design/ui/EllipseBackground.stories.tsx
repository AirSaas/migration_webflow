import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EllipseBackground } from "./EllipseBackground";

const meta = {
  title: "UI/EllipseBackground",
  component: EllipseBackground,
  argTypes: {
    size: { control: "number" },
    className: { control: false },
  },
} satisfies Meta<typeof EllipseBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 1250,
    className: "left-1/2 -translate-x-1/2 -top-[400px]",
  },
  decorators: [
    (Story) => (
      <div className="relative w-full h-[600px] overflow-hidden bg-white">
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {[600, 1000, 1250].map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-muted">
            size={size}
          </span>
          <div className="relative w-full h-[300px] overflow-hidden bg-white rounded-xl flex items-center justify-center">
            <EllipseBackground
              size={size}
              className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      ))}
    </div>
  ),
};
