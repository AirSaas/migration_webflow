import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Slider } from "./Slider";

const meta = {
  title: "Primitives/Slider",
  component: Slider,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slides: [
      {
        imageSrc: "https://placehold.co/1380x900/e8ebfe/3C51E2?text=Slide+1",
        imageAlt: "Slide 1",
      },
      {
        imageSrc: "https://placehold.co/1380x900/e8ebfe/6b7be9?text=Slide+2",
        imageAlt: "Slide 2",
      },
      {
        imageSrc: "https://placehold.co/1380x900/e8ebfe/ff922b?text=Slide+3",
        imageAlt: "Slide 3",
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", maxWidth: "80rem", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
};

export const SingleSlide: Story = {
  args: {
    slides: [
      {
        imageSrc: "https://placehold.co/1380x900/e8ebfe/3C51E2?text=Only+Slide",
        imageAlt: "Single slide",
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", maxWidth: "80rem", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
};
