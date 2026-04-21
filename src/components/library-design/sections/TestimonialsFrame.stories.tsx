import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TestimonialsFrame } from "./TestimonialsFrame";
import { TestimonialCompanyCard } from "@/components/library-design/ui/TestimonialCompanyCard";
import { TestimonialCard } from "@/components/library-design/ui/TestimonialCard";

const meta = {
  title: "Sections/TestimonialsFrame",
  component: TestimonialsFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TestimonialsFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Simple mode — array of personal testimonials */
export const Default: Story = {
  args: {
    title: "Ils ont simplifié leur",
    titleHighlight: "capacity planning",
    testimonials: [
      {
        quote:
          "Depuis qu'on utilise AirSaas, nos comités de pilotage sont enfin productifs. On a une vue claire sur tous nos projets stratégiques.",
        name: "Sophie Lefèvre",
        role: "DSI @Kiabi",
      },
      {
        quote:
          "AirSaas s'adapte à nos processus, pas l'inverse. Mise en place rapide et adoption immédiate par les équipes.",
        name: "Marc Durand",
        role: "DG @Valrhona",
      },
      {
        quote:
          "AirSaas est le rouage qui fait tourner notre gouvernance de projets. Visibilité totale pour le COMEX.",
        name: "Claire Martin",
        role: "PMO @Decathlon",
      },
    ],
  },
};

/** Mixed mode — company cards (press) + personal testimonials via children */
export const MixedPressAndPersonal: Story = {
  args: {
    title: "Ils parlent de",
    titleHighlight: "nous",
  },
  render: (args) => (
    <TestimonialsFrame {...args}>
      {/* Row 1: Press / Company testimonials */}
      <div className="grid grid-cols-1 gap-[1rem] items-stretch w-full md:grid-cols-2 lg:grid-cols-3">
        <TestimonialCompanyCard
          quote="Hub de pilotage donnant le bon niveau de visibilité aux métiers, aux Codir et Comex"
          logoSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/63d10687150c6042f155dcd4_logo-alliancy-monotone.png"
          logoAlt="Alliancy"
          className="flex-1 !w-auto"
        />
        <TestimonialCompanyCard
          quote="AirSaas vise à rendre réel l'alignement entre les directions métiers, la DSI et la direction générale"
          logoSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/63d106ab9c5e18b386c84505_JDN-monotone.png"
          logoAlt="JDN Journal du NET"
          className="flex-1 !w-auto"
        />
        <TestimonialCompanyCard
          quote="Une nouvelle manière d'embarquer les équipes"
          logoSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/63d10458acb275dbac3ecb65_LePoint-monotone.png"
          logoAlt="Le Point"
          className="flex-1 !w-auto"
        />
      </div>

      {/* Row 2: Personal testimonials */}
      <div className="grid grid-cols-1 gap-[1rem] items-stretch w-full md:grid-cols-2 lg:grid-cols-3">
        <TestimonialCard
          quote="Super outil qui nous permet de fluidifier le pilotage de notre portefeuille projet. Je recommande !"
          name="Thomas Sagnimorte"
          role="DSI @Millet Mountain Group"
          linkedinHref="#"
          className="flex-1"
        />
        <TestimonialCard
          quote="Un beau projet et vraie dynamique d'équipe transverse... Heureuse de constater la progression et premiers résultats !"
          name="Marie-Odile Lhomme"
          role="CDIO"
          linkedinHref="#"
          className="flex-1"
        />
        <TestimonialCard
          quote="Avec AirSaas nous avons pu ritualiser nos réunions en supprimant les PowerPoints... Outil vraiment TOP !"
          name="Clément Royer"
          role="DSI @Chiesi France"
          linkedinHref="#"
          className="flex-1"
        />
      </div>
    </TestimonialsFrame>
  ),
};

/** Company cards only — press mentions (3 columns) */
export const CompanyOnly: Story = {
  args: {
    title: "La presse parle de",
    titleHighlight: "nous",
  },
  render: (args) => (
    <TestimonialsFrame {...args}>
      <div className="grid grid-cols-1 gap-[1rem] items-stretch w-full md:grid-cols-2 lg:grid-cols-3">
        <TestimonialCompanyCard
          quote="Hub de pilotage donnant le bon niveau de visibilité aux métiers, aux Codir et Comex"
          logoSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/63d10687150c6042f155dcd4_logo-alliancy-monotone.png"
          logoAlt="Alliancy"
          className="flex-1 !w-auto"
        />
        <TestimonialCompanyCard
          quote="AirSaas vise à rendre réel l'alignement entre les directions métiers, la DSI et la direction générale"
          logoSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/63d106ab9c5e18b386c84505_JDN-monotone.png"
          logoAlt="JDN Journal du NET"
          className="flex-1 !w-auto"
        />
        <TestimonialCompanyCard
          quote="Une nouvelle manière d'embarquer les équipes"
          logoSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/63d10458acb275dbac3ecb65_LePoint-monotone.png"
          logoAlt="Le Point"
          className="flex-1 !w-auto"
        />
      </div>
    </TestimonialsFrame>
  ),
};

/** Company cards zigzag — 4 columns with staggered layout */
export const CompanyZigzag: Story = {
  args: {
    title: "Ils parlent de",
    titleHighlight: "nous",
  },
  render: (args) => (
    <TestimonialsFrame {...args}>
      <div className="grid grid-cols-1 gap-[1rem] items-start w-full sm:grid-cols-2 lg:grid-cols-4">
        <TestimonialCompanyCard
          quote="Hub de pilotage donnant le bon niveau de visibilité aux métiers, aux Codir et Comex"
          logoSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/63d10687150c6042f155dcd4_logo-alliancy-monotone.png"
          logoAlt="Alliancy"
          className="flex-1 !w-auto"
        />
        <TestimonialCompanyCard
          quote="AirSaas vise à rendre réel l'alignement entre les directions métiers, la DSI et la direction générale"
          logoSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/63d106ab9c5e18b386c84505_JDN-monotone.png"
          logoAlt="JDN Journal du NET"
          className="flex-1 !w-auto"
          style={{ marginTop: "2.5rem" }}
        />
        <TestimonialCompanyCard
          quote="Une nouvelle manière d'embarquer les équipes"
          logoSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/63d10458acb275dbac3ecb65_LePoint-monotone.png"
          logoAlt="Le Point"
          className="flex-1 !w-auto"
        />
        <TestimonialCompanyCard
          quote="la DSI a choisi de mettre en place deux solutions complémentaires : AirSaas pour le pilotage stratégique et Asana pour la gestion opérationnelle des projets"
          logoSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/64141ec10a541a09487cd1ec_LMI.png"
          logoAlt="Le Monde Informatique"
          className="flex-1 !w-auto"
          style={{ marginTop: "2.5rem" }}
        />
      </div>
    </TestimonialsFrame>
  ),
};
