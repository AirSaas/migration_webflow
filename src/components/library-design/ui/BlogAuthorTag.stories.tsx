import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlogAuthorTag } from "./BlogAuthorTag";

const meta = {
  title: "UI/BlogAuthorTag",
  component: BlogAuthorTag,
  parameters: { layout: "centered" },
} satisfies Meta<typeof BlogAuthorTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Jonas Roman",
    categoryLabel: "Gestion de projets",
    categoryHref: "#",
    publishedDate: "25/2/2026",
  },
};

export const WithoutAvatar: Story = {
  args: {
    name: "Jonas Roman",
    categoryLabel: "Gestion de projets",
    categoryHref: "#",
    publishedDate: "25/2/2026",
  },
};

export const WithAvatar: Story = {
  args: {
    name: "Jonas Roman",
    avatarSrc:
      "https://placehold.co/60x60/2d8a4e/ffffff?text=JR",
    avatarAlt: "Jonas Roman",
    categoryLabel: "Gestion de projets",
    categoryHref: "#",
    publishedDate: "25/2/2026",
  },
};

export const WithoutCategory: Story = {
  args: {
    name: "Jonas Roman",
    publishedDate: "25/2/2026",
  },
};

export const WithoutDate: Story = {
  args: {
    name: "Jonas Roman",
    categoryLabel: "Gestion de projets",
    categoryHref: "#",
  },
};

export const EnglishLocale: Story = {
  args: {
    name: "Jane Doe",
    publishedByLabel: "Published by",
    inLabel: "in",
    datePrefix: "On",
    categoryLabel: "Project Management",
    categoryHref: "#",
    publishedDate: "Feb 25, 2026",
  },
};

export const LongName: Story = {
  args: {
    name: "Jean-Baptiste de la Vallée-Poussin",
    categoryLabel: "Gouvernance des portefeuilles projets",
    categoryHref: "#",
    publishedDate: "25/2/2026",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-[3rem] items-start justify-center">
      <BlogAuthorTag
        name="Jonas Roman"
        categoryLabel="Gestion de projets"
        categoryHref="#"
        publishedDate="25/2/2026"
      />
      <BlogAuthorTag
        name="Jonas Roman"
        avatarSrc="https://placehold.co/60x60/2d8a4e/ffffff?text=JR"
        avatarAlt="Jonas Roman"
        categoryLabel="Gestion de projets"
        categoryHref="#"
        publishedDate="25/2/2026"
      />
      <BlogAuthorTag
        name="Jane Doe"
        publishedByLabel="Published by"
        inLabel="in"
        datePrefix="On"
        categoryLabel="Project Management"
        categoryHref="#"
        publishedDate="Feb 25, 2026"
      />
    </div>
  ),
};
