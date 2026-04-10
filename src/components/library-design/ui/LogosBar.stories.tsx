import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LogosBar } from "./LogosBar";

const sampleLogos = [
  { src: "/assets/logos/kiabi.png", alt: "Kiabi", width: 96, height: 40 },
  { src: "/assets/logos/valrhona.png", alt: "Valrhona", width: 130, height: 40 },
  { src: "/assets/logos/intuis.png", alt: "Intuis", width: 70, height: 40 },
  { src: "/assets/logos/altavia.svg", alt: "Altavia", width: 110, height: 40 },
  { src: "/assets/logos/sncf.svg", alt: "SNCF", width: 80, height: 40 },
];

const meta = {
  title: "UI/LogosBar",
  component: LogosBar,
  parameters: { layout: "fullscreen" },
  argTypes: {
    label: { control: "text" },
    logos: { control: false },
  },
} satisfies Meta<typeof LogosBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logos: sampleLogos,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-2 px-4">
        <span className="text-sm font-medium text-text-muted">Default label</span>
        <LogosBar logos={sampleLogos} />
      </div>

      <div className="flex flex-col gap-2 px-4">
        <span className="text-sm font-medium text-text-muted">Custom label</span>
        <LogosBar label="Ils nous font confiance" logos={sampleLogos.slice(0, 3)} />
      </div>

      <div className="flex flex-col gap-2 px-4">
        <span className="text-sm font-medium text-text-muted">English label</span>
        <LogosBar label="Trusted by industry leaders" logos={sampleLogos} />
      </div>
    </div>
  ),
};
