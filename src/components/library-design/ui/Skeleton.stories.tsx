import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["text", "circle", "rect"] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: { variant: "text", width: "20rem" },
};

export const TextMultiLine: Story = {
  args: { variant: "text", width: "30rem", lines: 4 },
};

export const Circle: Story = {
  args: { variant: "circle", width: "4rem" },
};

export const Rect: Story = {
  args: { variant: "rect", width: "24rem", height: "12rem" },
};

/** Loading-state composition mimicking a <TestimonialCard> placeholder. */
export const CardPlaceholder: Story = {
  render: () => (
    <div
      className="flex flex-col gap-[1rem] rounded-[1.5625rem] border border-primary-10 bg-white"
      style={{ padding: "1.5rem", width: "24rem" }}
    >
      <Skeleton variant="text" lines={4} label="Loading testimonial quote" />
      <div className="flex items-center gap-[0.75rem]">
        <Skeleton variant="circle" width="2.5rem" />
        <div className="flex-1 flex flex-col gap-[0.375rem]">
          <Skeleton variant="text" width="8rem" />
          <Skeleton variant="text" width="12rem" height="0.75em" />
        </div>
      </div>
    </div>
  ),
};
