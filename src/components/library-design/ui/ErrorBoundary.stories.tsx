import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ErrorBoundary } from "./ErrorBoundary";

function BoomOnRender() {
  throw new Error("Something blew up inside this component");
}

const meta = {
  title: "UI/ErrorBoundary",
  component: ErrorBoundary,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFallback: Story = {
  render: () => (
    <ErrorBoundary>
      <BoomOnRender />
    </ErrorBoundary>
  ),
};

export const CustomFallback: Story = {
  render: () => (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div className="rounded-lg border border-warning-40 bg-warning-5 p-[1.5rem] max-w-[32rem]">
          <strong className="text-warning">Oups</strong>
          <p className="text-text-p text-sm mt-[0.5rem]">{error.message}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-[1rem] text-primary underline"
          >
            Réessayer
          </button>
        </div>
      )}
    >
      <BoomOnRender />
    </ErrorBoundary>
  ),
};
