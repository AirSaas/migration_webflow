import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Navbar } from "./Navbar";

const frenchItems = [
  { label: "Portfolios", hasDropdown: true },
  { label: "Stratégie", hasDropdown: true },
  { label: "Priorisation", hasDropdown: true },
  { label: "Roadmap", hasDropdown: true },
  { label: "Automatisation", href: "#automatisation" },
];

const meta = {
  title: "Primitives/Navbar",
  component: Navbar,
  parameters: { layout: "padded" },
  argTypes: {
    ctaLabel: { control: "text" },
    ctaHref: { control: "text" },
    loginLabel: { control: "text" },
    loginHref: { control: "text" },
    items: { control: false },
    logo: { control: false },
    flagIcon: { control: false },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: frenchItems,
    ctaLabel: "Demander une démo",
    ctaHref: "#demo",
    loginLabel: "Se connecter",
    loginHref: "#login",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Full nav */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">Full navigation</span>
        <Navbar
          items={frenchItems}
          ctaLabel="Demander une démo"
          ctaHref="#demo"
          loginLabel="Se connecter"
          loginHref="#login"
        />
      </div>

      {/* Minimal nav */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">Minimal navigation</span>
        <Navbar
          items={[
            { label: "Product", href: "#product" },
            { label: "Pricing", href: "#pricing" },
          ]}
          ctaLabel="Get started"
          ctaHref="#start"
        />
      </div>

      {/* Without login */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">Without login button</span>
        <Navbar
          items={frenchItems}
          ctaLabel="Demander une démo"
          ctaHref="#demo"
        />
      </div>
    </div>
  ),
};
