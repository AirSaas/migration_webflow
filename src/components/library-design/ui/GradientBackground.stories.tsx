import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GradientBackground } from "./GradientBackground";

const meta = {
  title: "UI/GradientBackground",
  component: GradientBackground,
  argTypes: {
    variant: { control: "select", options: ["hero", "cta", "comparison"] },
    className: { control: false },
  },
} satisfies Meta<typeof GradientBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "hero",
  },
  decorators: [
    (Story) => (
      <div className="relative w-full h-[300px] overflow-hidden bg-white">
        <Story />
        <div className="relative z-10 flex items-center justify-center h-full">
          <p className="text-2xl font-semibold text-gray-900">Hero content</p>
        </div>
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["hero", "cta", "comparison"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-muted">
            variant=&quot;{variant}&quot;
          </span>
          <div className="relative w-full h-[300px] overflow-hidden bg-white rounded-xl">
            <GradientBackground variant={variant} />
            <div className="relative z-10 flex items-center justify-center h-full">
              <p className="text-2xl font-semibold text-gray-900">
                {variant} content
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
