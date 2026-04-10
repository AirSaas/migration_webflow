import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AnimateOnScroll, AnimateChild } from "./AnimateOnScroll";

function DemoCard({ label }: { label: string }) {
  return (
    <div className="rounded-[1.25rem] bg-primary-2 border border-primary-40 p-8 text-center">
      <span className="font-bold text-primary" style={{ fontSize: "1.5rem" }}>
        {label}
      </span>
    </div>
  );
}

const meta = {
  title: "UI/AnimateOnScroll",
  component: AnimateOnScroll,
  parameters: { layout: "fullscreen" },
  argTypes: {
    animation: {
      control: "select",
      options: ["fade-up", "fade-down", "fade-left", "fade-right", "scale-up", "fade"],
    },
    delay: { control: "number" },
    duration: { control: "number" },
    threshold: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    stagger: { control: "number" },
    onMount: { control: "boolean" },
    children: { control: false },
  },
} satisfies Meta<typeof AnimateOnScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    animation: "fade-up",
    delay: 0,
    duration: 600,
    threshold: 0.15,
    onMount: true,
    children: <DemoCard label="fade-up" />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-[6rem] p-10 max-w-[60rem] mx-auto">
      <div className="text-center py-20">
        <h1 className="font-black text-foreground" style={{ fontSize: "2rem" }}>
          Scroll down to see animations
        </h1>
        <p className="text-text-muted mt-2">Each section triggers when it enters the viewport</p>
      </div>

      <div className="h-[30rem]" />

      {(["fade-up", "fade-down", "fade-left", "fade-right", "scale-up", "fade"] as const).map(
        (anim) => (
          <div key={anim} className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text-muted">{anim}</span>
            <AnimateOnScroll animation={anim}>
              <DemoCard label={anim} />
            </AnimateOnScroll>
          </div>
        ),
      )}

      {/* Stagger demo */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">stagger (150ms)</span>
        <AnimateOnScroll animation="fade-up" stagger={150}>
          <div className="grid grid-cols-4 gap-4">
            <AnimateChild><DemoCard label="1" /></AnimateChild>
            <AnimateChild><DemoCard label="2" /></AnimateChild>
            <AnimateChild><DemoCard label="3" /></AnimateChild>
            <AnimateChild><DemoCard label="4" /></AnimateChild>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Delayed */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">fade-up + 300ms delay</span>
        <AnimateOnScroll animation="fade-up" delay={300}>
          <DemoCard label="fade-up with 300ms delay" />
        </AnimateOnScroll>
      </div>

      <div className="h-[10rem]" />
    </div>
  ),
};
