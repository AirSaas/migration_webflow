import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconIllustration } from "./IconIllustration";
import {
  ChevronCircleIcon,
  CalendarDayIcon,
  BullseyeArrowIcon,
  SuitcaseIcon,
} from "@/components/library-design/ui/icons/illustration-icons";

const meta = {
  title: "UI/IconIllustration",
  component: IconIllustration,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "radio", options: ["dark", "light"] },
    size: { control: "radio", options: ["sm", "md"] },
    children: { control: false },
  },
} satisfies Meta<typeof IconIllustration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "dark",
    size: "md",
    children: <CalendarDayIcon />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-12 items-end">
      {/* dark / md */}
      <div className="flex flex-col items-center gap-3">
        <IconIllustration variant="dark" size="md">
          <CalendarDayIcon />
        </IconIllustration>
        <span className="text-sm font-medium text-text-muted">dark / md</span>
      </div>

      {/* dark / sm */}
      <div className="flex flex-col items-center gap-3">
        <IconIllustration variant="dark" size="sm">
          <SuitcaseIcon />
        </IconIllustration>
        <span className="text-sm font-medium text-text-muted">dark / sm</span>
      </div>

      {/* light / md */}
      <div className="flex flex-col items-center gap-3 bg-primary-70 p-6 rounded-xl">
        <IconIllustration variant="light" size="md">
          <ChevronCircleIcon color="white" />
        </IconIllustration>
        <span className="text-sm font-medium text-white">light / md</span>
      </div>

      {/* light / sm */}
      <div className="flex flex-col items-center gap-3 bg-primary-70 p-6 rounded-xl">
        <IconIllustration variant="light" size="sm">
          <BullseyeArrowIcon color="white" />
        </IconIllustration>
        <span className="text-sm font-medium text-white">light / sm</span>
      </div>
    </div>
  ),
};
