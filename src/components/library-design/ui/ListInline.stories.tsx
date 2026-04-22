import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ListInline } from "./ListInline";

const meta = {
  title: "UI/ListInline",
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

/** Multi-line items — verifies the icon stays top-aligned with the first text line
 *  (not centered in the 2+ line block). */
export const MultiLine: Story = {
  render: () => (
    <div className="flex flex-col gap-[0.625rem] max-w-[28rem]">
      <ListInline>
        Peut-on faire plus de projets&nbsp;? Faut-il en enlever&nbsp;?
      </ListInline>
      <ListInline>
        Quels sont les jalons qui nous plombent&nbsp;? Peut-on les d&eacute;couper&nbsp;?
      </ListInline>
      <ListInline>
        Doit-on recruter ou mettre l&apos;&eacute;quipe en tension&nbsp;? Pendant combien de temps&nbsp;?
      </ListInline>
    </div>
  ),
};
