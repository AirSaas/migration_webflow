import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SliderFrame } from "./SliderFrame";

const meta = {
  title: "Sections/Media Sections/SliderFrame",
  component: SliderFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SliderFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSlides = [
  {
    imageSrc: "https://placehold.co/960x540/3c51e2/ffffff?text=Bootcamp+1",
    imageAlt: "Bootcamp participants gathered around a whiteboard",
  },
  {
    imageSrc: "https://placehold.co/960x540/e8eafc/3c51e2?text=Bootcamp+2",
    imageAlt: "Working session during the bootcamp",
  },
  {
    imageSrc: "https://placehold.co/960x540/03e26b/1a1a1a?text=Bootcamp+3",
    imageAlt: "Group photo of the bootcamp cohort",
  },
  {
    imageSrc: "https://placehold.co/960x540/ffb74d/1a1a1a?text=Bootcamp+4",
    imageAlt: "Keynote speaker on stage",
  },
];

export const Default: Story = {
  args: {
    titleHighlight: "Bootcamp",
    titleRest: "pour monter en compétence avec AirSaas",
    subtitle:
      "Rejoignez l'un de nos bootcamps trimestriels pour découvrir la plateforme en profondeur et échanger avec nos experts.",
    slides: sampleSlides,
  },
};

/**
 * Dark variant — primary-70 background with white typography. Used on
 * `/solution/airsaas-et-les-experts-de-la-transfo` for the LPDT community
 * section that breaks the white-page rhythm.
 */
export const Dark: Story = {
  args: {
    variant: "dark",
    titleHighlight: "Communauté LPDT",
    titleRest: "pour apprendre entre pairs",
    subtitle:
      "Plus de 2 000 leaders de la transformation partagent leurs bonnes pratiques dans notre communauté privée.",
    slides: sampleSlides,
  },
};
