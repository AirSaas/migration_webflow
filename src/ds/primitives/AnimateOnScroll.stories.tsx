import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AnimateOnScroll, AnimateChild } from "./AnimateOnScroll";

const meta = {
  title: "Primitives/AnimateOnScroll",
  component: AnimateOnScroll,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AnimateOnScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

function DemoCard({ label }: { label: string }) {
  return (
    <div className="rounded-[1.25rem] bg-primary-2 border border-primary-40 p-8 text-center">
      <span className="font-bold text-primary" style={{ fontSize: "1.5rem" }}>{label}</span>
    </div>
  );
}

export const AllAnimations: Story = {
  render: () => (
    <div className="flex flex-col gap-[6rem] p-10 max-w-[60rem] mx-auto">
      <div className="text-center py-20">
        <h1 className="font-black text-foreground" style={{ fontSize: "2rem" }}>
          Scroll down to see animations
        </h1>
        <p className="text-text-muted mt-2">Each section triggers when it enters the viewport</p>
      </div>

      <div className="h-[30rem]" />

      <AnimateOnScroll animation="fade-up">
        <DemoCard label="fade-up (default)" />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-down">
        <DemoCard label="fade-down" />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left">
        <DemoCard label="fade-left" />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right">
        <DemoCard label="fade-right" />
      </AnimateOnScroll>

      <AnimateOnScroll animation="scale-up">
        <DemoCard label="scale-up" />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade">
        <DemoCard label="fade" />
      </AnimateOnScroll>

      {/* Stagger demo */}
      <AnimateOnScroll animation="fade-up" stagger={150}>
        <div className="grid grid-cols-4 gap-4">
          <AnimateChild><DemoCard label="1" /></AnimateChild>
          <AnimateChild><DemoCard label="2" /></AnimateChild>
          <AnimateChild><DemoCard label="3" /></AnimateChild>
          <AnimateChild><DemoCard label="4" /></AnimateChild>
        </div>
      </AnimateOnScroll>

      {/* Delayed */}
      <AnimateOnScroll animation="fade-up" delay={300}>
        <DemoCard label="fade-up with 300ms delay" />
      </AnimateOnScroll>

      <div className="h-[10rem]" />
    </div>
  ),
};
