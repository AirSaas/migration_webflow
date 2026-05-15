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

/**
 * Documents the icon-sizing contract: the child SVG must scale with the
 * container's font-size (em units). The component now auto-enforces
 * `w-[1em] h-[1em]` on the direct SVG child so contributors pasting a
 * custom inline SVG with `width="40" height="40"` in pixels don't silently
 * end up with a tiny icon under an oversized shadow ellipse.
 *
 * The "auto-corrected" column shows what the component does today: even when
 * the SVG declares fixed px dimensions, the icon scales correctly.
 */
export const IconSizingContract: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "**DS contract**: the child SVG scales with `font-size`. Custom inline SVGs are auto-corrected to `w-[1em] h-[1em]`. If you ever need to bypass (you shouldn't), wrap the icon in an extra div — the [&>svg] selector targets direct children only.",
      },
    },
  },
  render: () => {
    // Bad-citizen SVG: fixed px width/height. Before the contract enforcement
    // this would render at 40px under a ~100px shadow. After enforcement it
    // scales with font-size like the canonical illustration-icons.
    const FixedPxIcon = () => (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    );

    return (
      <div className="flex flex-col gap-8">
        <div className="flex gap-12 items-end">
          <div className="flex flex-col items-center gap-3">
            <IconIllustration variant="dark" size="md">
              <CalendarDayIcon />
            </IconIllustration>
            <span className="text-sm font-medium text-text-muted">
              Canonical icon
              <br />
              (width=&quot;1em&quot;)
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <IconIllustration variant="dark" size="md">
              <FixedPxIcon />
            </IconIllustration>
            <span className="text-sm font-medium text-text-muted">
              Fixed-px SVG
              <br />
              (auto-corrected)
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 bg-primary-70 p-6 rounded-xl">
            <IconIllustration variant="light" size="md">
              <FixedPxIcon />
            </IconIllustration>
            <span className="text-sm font-medium text-white">
              Fixed-px on dark
              <br />
              (auto-corrected)
            </span>
          </div>
        </div>

        <p className="text-xs text-text-muted max-w-xl">
          Both icons render at the same visual size despite the second SVG
          declaring <code>width=&quot;40&quot; height=&quot;40&quot;</code>. The
          component applies <code>[&amp;&gt;svg]:w-[1em] [&amp;&gt;svg]:h-[1em]</code>{" "}
          to enforce the contract.
        </p>
      </div>
    );
  },
};
