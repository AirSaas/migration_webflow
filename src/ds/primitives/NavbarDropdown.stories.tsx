import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavbarDropdown } from "./NavbarDropdown";

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

const sampleItems = [
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

const meta = {
  title: "Primitives/NavbarDropdown",
  component: NavbarDropdown,
  parameters: { layout: "centered" },
} satisfies Meta<typeof NavbarDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const ThreeItems: Story = {
  args: {
    items: [
      ...sampleItems,
      {
        icon: <PmoIcon />,
        title: "Strat\u00e9gie",
        subtitle: "Alignez vos \u00e9quipes sur les objectifs cl\u00e9s",
        href: "#strategie",
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [sampleItems[0]],
  },
};
