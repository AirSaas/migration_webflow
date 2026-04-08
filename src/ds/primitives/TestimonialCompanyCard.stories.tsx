import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TestimonialCompanyCard } from "./TestimonialCompanyCard";

const meta = {
  title: "Primitives/TestimonialCompanyCard",
  component: TestimonialCompanyCard,
  parameters: { layout: "centered" },
} satisfies Meta<typeof TestimonialCompanyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    quote:
      "\u201CLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque\u201D",
    logoSrc: "https://placehold.co/169x65/061333/FFFFFF?text=Alliancy",
    logoAlt: "Alliancy",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <TestimonialCompanyCard
        quote={"\u201CLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque\u201D"}
        logoSrc="https://placehold.co/169x65/061333/FFFFFF?text=Alliancy"
        logoAlt="Alliancy"
      />
      <TestimonialCompanyCard
        quote={"\u201CAirSaas nous a permis de structurer notre portefeuille projets et de gagner en visibilit\u00e9 sur l\u2019avancement.\u201D"}
        logoSrc="https://placehold.co/169x65/3A51E2/FFFFFF?text=Kiabi"
        logoAlt="Kiabi"
      />
      <TestimonialCompanyCard
        quote={"\u201CUn outil simple et efficace qui nous a fait gagner un temps consid\u00e9rable dans le pilotage de nos projets strat\u00e9giques.\u201D"}
        logoSrc="https://placehold.co/169x65/1a1a1a/FFFFFF?text=Decathlon"
        logoAlt="Decathlon"
      />
    </div>
  ),
};
