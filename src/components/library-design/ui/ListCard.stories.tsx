import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ListCard } from "./ListCard";

const meta = {
  title: "UI/ListCard",
  component: ListCard,
  parameters: { layout: "centered" },
  argTypes: {
    value: { control: "text" },
    children: { control: false },
    className: { control: false },
  },
} satisfies Meta<typeof ListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    children: (
      <>
        Les outils existants sont <strong>trop complexes</strong> &rarr;
        personne ne les maintient
      </>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-[0.875rem] max-w-[91.5rem]">
      <ListCard value={1}>
        Les outils existants sont <strong>trop complexes</strong> &rarr;
        personne ne les maintient
      </ListCard>
      <ListCard value={2}>
        Les <strong>ressources partag&eacute;es</strong> cr&eacute;ent des
        conflits entre &eacute;quipes
      </ListCard>
      <ListCard value={3}>
        Les d&eacute;cisions se prennent <strong>au feeling</strong>, pas sur
        des donn&eacute;es fiables
      </ListCard>
      <ListCard value={4}>
        <strong>Aucune visibilit&eacute;</strong> sur la capacit&eacute;
        r&eacute;elle des &eacute;quipes
      </ListCard>
      <ListCard value={5}>
        Les <strong>projets en retard</strong> s&apos;accumulent sans que
        personne ne sache pourquoi
      </ListCard>
      <ListCard value={6}>
        Le <strong>PMO passe son temps</strong> &agrave; collecter des
        donn&eacute;es au lieu de piloter
      </ListCard>
    </div>
  ),
};
