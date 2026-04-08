import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Navbar } from "./Navbar";
import type { NavItem } from "./Navbar";

function PmoIcon() {
  return (
    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="8.5" width="12" height="12" rx="3" stroke="#FF922B" strokeWidth="1.5" />
      <rect x="24.5" y="0.5" width="12" height="12" rx="3" stroke="#FF922B" strokeWidth="1.5" />
      <rect x="24.5" y="24.5" width="12" height="12" rx="3" stroke="#FF922B" strokeWidth="1.5" />
      <line x1="12.5" y1="14.5" x2="24.5" y2="6.5" stroke="#FF922B" strokeWidth="1.5" />
      <line x1="12.5" y1="14.5" x2="24.5" y2="30.5" stroke="#FF922B" strokeWidth="1.5" />
    </svg>
  );
}

function ItIcon() {
  return (
    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18.5" cy="10" r="6" stroke="#061333" strokeWidth="1.5" />
      <path d="M6 32C6 25.373 11.373 20 18 20H19C25.627 20 31 25.373 31 32" stroke="#061333" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const sampleDropdownItems = [
  {
    icon: <PmoIcon />,
    title: "PMO",
    subtitle: "Pilotez le portefeuille de projets simplement",
    href: "#pmo",
  },
  {
    icon: <ItIcon />,
    title: "IT & Op\u00e9rations",
    subtitle: "Devenez le business partner des m\u00e9tiers",
    href: "#it",
  },
];

const frenchItems: NavItem[] = [
  { label: "Portfolios", hasDropdown: true, dropdownItems: sampleDropdownItems },
  { label: "Strat\u00e9gie", hasDropdown: true, dropdownItems: sampleDropdownItems },
  { label: "Priorisation", hasDropdown: true, dropdownItems: sampleDropdownItems },
  { label: "Roadmap", hasDropdown: true, dropdownItems: sampleDropdownItems },
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
