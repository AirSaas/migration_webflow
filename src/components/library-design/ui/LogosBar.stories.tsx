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

const integrationLogos = [
  { src: "https://placehold.co/120x80/0052cc/ffffff?text=Jira&font=lato", alt: "Jira", width: 120, height: 80 },
  { src: "https://placehold.co/120x80/f06a6a/ffffff?text=Asana&font=lato", alt: "Asana", width: 120, height: 80 },
  { src: "https://placehold.co/120x80/6264a7/ffffff?text=Teams&font=lato", alt: "Microsoft Teams", width: 120, height: 80 },
  { src: "https://placehold.co/120x80/4a154b/ffffff?text=Slack&font=lato", alt: "Slack", width: 120, height: 80 },
  { src: "https://placehold.co/120x80/ff6900/ffffff?text=Monday&font=lato", alt: "Monday", width: 120, height: 80 },
];

/**
 * Integrations variant — plain chrome (no borders, white bg) + color preserved.
 *
 * Pattern for sections like "Connecté à votre écosystème" where the logos are
 * brand integrations (Jira, Asana, Slack…) and color is meaningful. Audit
 * finding [DS-B/C 2026-05-04]: rebuild agent rendered integration logos
 * grayscale + with the trust-strip border chrome, which felt visually wrong.
 *
 * Rule of thumb:
 *   - Customer / press logos     → variant="bordered" (default), preserveColor=false
 *   - Integration / partner logos → variant="plain",  preserveColor=true
 */
export const IntegrationsPlainColored: Story = {
  args: {
    logos: integrationLogos,
    variant: "plain",
    preserveColor: true,
    size: "lg",
  },
};

/**
 * Variant comparison — bordered (default, grayscale) vs plain colored (integrations).
 *
 * Side-by-side reference to make the decision rule obvious for the rebuild agent.
 */
export const VariantComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-12 py-8">
      <div className="flex flex-col gap-2 px-4">
        <span className="text-sm font-medium text-text-muted">
          variant=&quot;bordered&quot; + preserveColor=false (DEFAULT — client trust strip)
        </span>
        <LogosBar
          label="Ils nous font confiance"
          logos={sampleLogos}
          size="lg"
        />
      </div>

      <div className="flex flex-col gap-2 px-4">
        <span className="text-sm font-medium text-text-muted">
          variant=&quot;plain&quot; + preserveColor=true (integrations grid — bg white, no chrome)
        </span>
        <LogosBar
          logos={integrationLogos}
          variant="plain"
          preserveColor
          size="lg"
        />
      </div>
    </div>
  ),
};

/**
 * Size comparison — md (default) vs lg.
 *
 * Use `size="lg"` on landing pages where the logo strip is a primary trust
 * signal (LP PPM, LP Capacity, etc. — see audit finding [1.7] which flagged
 * default md as too small for LP heroes). Use `size="md"` on denser pages
 * where the strip is one of many social proofs.
 */
export const SizeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-12 py-8">
      <div className="flex flex-col gap-2 px-4">
        <span className="text-sm font-medium text-text-muted">
          size=&quot;md&quot; (default — 2.5rem mobile / 4.14rem desktop)
        </span>
        <LogosBar
          label="Ils nous font confiance"
          logos={sampleLogos}
          size="md"
        />
      </div>

      <div className="flex flex-col gap-2 px-4">
        <span className="text-sm font-medium text-text-muted">
          size=&quot;lg&quot; (LP heroes — 3rem mobile / 5.5rem desktop)
        </span>
        <LogosBar
          label="Ils nous font confiance"
          logos={sampleLogos}
          size="lg"
        />
      </div>
    </div>
  ),
};
