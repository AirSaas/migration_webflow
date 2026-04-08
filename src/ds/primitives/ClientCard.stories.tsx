import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClientCard } from "./ClientCard";
import { SuitcaseIcon, IndustryIcon } from "./icons/illustration-icons";

const meta = {
  title: "Primitives/ClientCard",
  component: ClientCard,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ClientCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatarSrc: "https://placehold.co/90x90/e8ebfe/3A50DB?text=VP",
    avatarAlt: "Vincent Potel",
    name: "Vincent Potel",
    jobTitle: "Directeur Général de transition",
    companyName: "CADUCIEL",
    infoRows: [
      {
        icon: <SuitcaseIcon />,
        label: "Nombre d'employés",
        value: "50",
      },
      {
        icon: <IndustryIcon />,
        label: "Secteur",
        value: "Santé - Editeur de logiciel",
      },
    ],
  },
};

export const MinimalInfo: Story = {
  args: {
    avatarSrc: "https://placehold.co/90x90/e8ebfe/6B7BE9?text=ML",
    avatarAlt: "Marie Laurent",
    name: "Marie Laurent",
    jobTitle: "CEO",
    companyName: "TechCorp",
    infoRows: [
      {
        icon: <IndustryIcon />,
        label: "Secteur",
        value: "Tech",
      },
    ],
  },
};
