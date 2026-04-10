import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FloatingCard } from "./FloatingCard";

const meta = {
  title: "UI/FloatingCard",
  component: FloatingCard,
  argTypes: {
    children: { control: false },
    icon: { control: false },
    className: { control: false },
    style: { control: false },
  },
} satisfies Meta<typeof FloatingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-[222px]",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">
          Default (with bullseye icon)
        </span>
        <FloatingCard className="w-[222px]" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">
          Empty (no children, no icon)
        </span>
        <FloatingCard className="w-[222px] h-[81px]">
          <div />
        </FloatingCard>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">
          With custom content
        </span>
        <FloatingCard className="w-[222px] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1.333A6.667 6.667 0 1 0 14.667 8 6.674 6.674 0 0 0 8 1.333Zm0 12A5.333 5.333 0 1 1 13.333 8 5.34 5.34 0 0 1 8 13.333Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-900">
                New notification
              </p>
              <p className="text-[10px] text-gray-500">Project updated</p>
            </div>
          </div>
        </FloatingCard>
      </div>
    </div>
  ),
};
