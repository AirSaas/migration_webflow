import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ListInline } from "./ListInline";

const meta = {
  title: "Primitives/ListInline",
  component: ListInline,
  parameters: { layout: "centered" },
  argTypes: {
    children: { control: false },
    icon: { control: false },
    className: { control: false },
  },
} satisfies Meta<typeof ListInline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Entretien guid\u00e9 par l\u2019IA",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-[0.625rem] max-w-[33rem]">
      <span className="text-sm font-medium text-text-muted">
        Multiple items stacked
      </span>
      <ListInline>Entretien guid&eacute; par l&apos;IA</ListInline>
      <ListInline>Brief structur&eacute; automatiquement</ListInline>
      <ListInline>Comparaison objective des demandes</ListInline>
      <ListInline>Int&eacute;gration native avec vos outils</ListInline>
    </div>
  ),
};
