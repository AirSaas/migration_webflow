import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LottiePlayer } from "./LottiePlayer";

const meta = {
  title: "UI/LottiePlayer",
  component: LottiePlayer,
  parameters: { layout: "centered" },
  argTypes: {
    src: { control: "text" },
    loop: { control: "boolean" },
    autoplay: { control: "boolean" },
    speed: { control: { type: "range", min: 0.25, max: 4, step: 0.25 } },
    ariaLabel: { control: "text" },
  },
} satisfies Meta<typeof LottiePlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Canonical reference — the `Programs-video.json` animation used on
 * `/fr/equipes/comite-direction` section "Suivez l'avancée de vos
 * programmes". Loop + autoplay at default speed.
 */
export const Default: Story = {
  args: {
    src: "https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/6686597e5e28920fcd29ce9c_Programs-video.json",
    loop: true,
    autoplay: true,
    speed: 1,
    ariaLabel:
      "Animation — vue programmes consolidée avec indicateurs en temps réel",
    className: "w-[32rem] max-w-full",
  },
};

/**
 * Verifies the loading placeholder (primary-2 bg, min-height 12rem) before
 * the JSON resolves. Useful for QA / a11y review.
 */
export const Loading: Story = {
  args: {
    // 404 URL never resolves → component stays in placeholder state
    src: "https://example.invalid/never.json",
    loop: true,
    autoplay: true,
    speed: 1,
    ariaLabel: "Loading state preview",
    className: "w-[32rem] max-w-full",
  },
};

/**
 * Failure state — when fetch returns non-ok or network errors, component
 * renders an accessible "Animation unavailable" fallback in the same
 * primary-2 surface.
 */
export const Failed: Story = {
  args: {
    src: "https://cdn.prod.website-files.com/this-path-does-not-exist.json",
    loop: true,
    autoplay: true,
    speed: 1,
    ariaLabel: "Failed state preview",
    className: "w-[32rem] max-w-full",
  },
};

/** Playback speed control — verify smooth at 0.5x, 1x, 2x. */
export const SpeedVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-[2rem] items-center">
      {[0.5, 1, 2].map((s) => (
        <div key={s} className="flex flex-col items-center gap-[0.5rem]">
          <span className="text-sm font-medium text-text-muted">
            speed = {s}x
          </span>
          <LottiePlayer
            src="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/6686597e5e28920fcd29ce9c_Programs-video.json"
            speed={s}
            ariaLabel={`Animation at ${s}x speed`}
            className="w-[24rem] max-w-full"
          />
        </div>
      ))}
    </div>
  ),
};
