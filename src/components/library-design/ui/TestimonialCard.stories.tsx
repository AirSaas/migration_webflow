import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TestimonialCard } from "./TestimonialCard";

const meta = {
  title: "UI/TestimonialCard",
  component: TestimonialCard,
  parameters: { layout: "centered" },
  argTypes: {
    quote: { control: "text" },
    name: { control: "text" },
    role: { control: "text" },
    avatarSrc: { control: "text" },
  },
} satisfies Meta<typeof TestimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    quote:
      "Depuis qu'on utilise AirSaas, nos comités de pilotage sont enfin productifs. On a une vue claire sur tous nos projets stratégiques.",
    name: "Sophie Lefèvre",
    role: "DSI @Kiabi",
    linkedinHref: "https://linkedin.com/in/sophie-lefevre",
  },
};

/**
 * Long quote (~800 chars) — auto-collapses to a "Lire la suite" toggle.
 * Mirrors the Marie-Odile testimonial case from the Équipes pages that
 * triggered the bound relaxation (220 → 400 + read-more).
 */
export const LongQuoteWithReadMore: Story = {
  args: {
    quote:
      "Je travaille avec AirSaas depuis maintenant plus de deux ans, et je peux dire sans hésitation que cette plateforme a transformé notre manière de piloter les projets au sein de l'entreprise. Avant, nous passions des heures à consolider des fichiers Excel, à courir après les chefs de projets pour obtenir des mises à jour, et à préparer des comités de pilotage qui ne servaient finalement qu'à constater du retard. Aujourd'hui, toute l'information circule en temps réel, les équipes sont alignées sur les priorités, et les décisions se prennent sur des données fiables. C'est un vrai changement de paradigme pour notre gouvernance, et nos sponsors exécutifs le voient clairement dans nos indicateurs.",
    name: "Marie-Odile Berthier",
    role: "Directrice de la transformation @Intuis",
    truncateAt: 400,
    readMoreLabel: "Lire la suite",
    readLessLabel: "Voir moins",
    linkedinHref: "https://linkedin.com/in/marie-odile",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-[91rem]">
      {/* Row with avatars and without */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">Without avatar</span>
        <div className="grid grid-cols-3 gap-[1.5625rem]">
          <TestimonialCard
            quote="Depuis qu'on utilise AirSaas, nos comités de pilotage sont enfin productifs. On a une vue claire sur tous nos projets stratégiques."
            name="Sophie Lefèvre"
            role="DSI @Kiabi"
          />
          <TestimonialCard
            quote="AirSaas s'adapte à nos processus, pas l'inverse. Mise en place rapide et adoption immédiate par les équipes."
            name="Marc Durand"
            role="DG @Valrhona"
          />
          <TestimonialCard
            quote="AirSaas est le rouage qui fait tourner notre gouvernance de projets. Visibilité totale pour le COMEX."
            name="Claire Martin"
            role="PMO @Decathlon"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-muted">With avatar</span>
        <div className="grid grid-cols-3 gap-[1.5625rem]">
          <TestimonialCard
            quote="Depuis qu'on utilise AirSaas, nos comités de pilotage sont enfin productifs."
            name="Sophie Lefèvre"
            role="DSI @Kiabi"
            avatarSrc="https://placehold.co/28x28/10b981/fff?text=SL"
          />
          <TestimonialCard
            quote="AirSaas s'adapte à nos processus, pas l'inverse."
            name="Marc Durand"
            role="DG @Valrhona"
            avatarSrc="https://placehold.co/28x28/10b981/fff?text=MD"
          />
          <TestimonialCard
            quote="Visibilité totale pour le COMEX."
            name="Claire Martin"
            role="PMO @Decathlon"
            avatarSrc="https://placehold.co/28x28/10b981/fff?text=CM"
          />
        </div>
      </div>
    </div>
  ),
};
