import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IllustrationFrame } from "./IllustrationFrame";

const meta = {
  title: "UI/IllustrationFrame",
  component: IllustrationFrame,
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    width: { control: false },
    height: { control: false },
    className: { control: false },
  },
} satisfies Meta<typeof IllustrationFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://placehold.co/800x500/e2e8f0/64748b?text=Product+Screenshot",
    alt: "Product screenshot",
    className: "max-w-[600px]",
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-8">
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 bg-gray-100 p-8">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">
          Default (600px wide)
        </span>
        <IllustrationFrame
          src="https://placehold.co/800x500/e2e8f0/64748b?text=Product+Screenshot"
          alt="Product screenshot"
          className="max-w-[600px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">
          Small (400px wide)
        </span>
        <IllustrationFrame
          src="https://placehold.co/400x300/e2e8f0/64748b?text=Dashboard"
          alt="Dashboard view"
          className="max-w-[400px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">
          Full width
        </span>
        <IllustrationFrame
          src="https://placehold.co/1200x600/e2e8f0/64748b?text=Full+Width"
          alt="Full width view"
        />
      </div>
    </div>
  ),
};

/** tone="warm" — prevention-10 editorial frame used inside BlogArticleBody.
 *  Bigger radius, bigger padding, inner image rounded-10px. */
export const Warm: Story = {
  render: () => (
    <div className="flex flex-col gap-6 bg-white p-8">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">
          tone=&quot;warm&quot; — blog body editorial image well
        </span>
        <IllustrationFrame
          tone="warm"
          src="https://placehold.co/1125x731/FFEFC6/3c51e2?text=Blog+Editorial+Image"
          alt="Blog editorial illustration"
        />
      </div>
    </div>
  ),
};
