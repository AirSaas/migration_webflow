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

/**
 * Adaptive grid — N=1 single centered card, N=2 two-col, N=3+ three-col.
 *
 * Use this story to verify that the grid fills the frame correctly regardless
 * of how many testimonials are passed in. Audit finding [DS-A 2026-05-04]
 * (rebuild agent reported cards not adapting to frame width when N=2).
 *
 * Rule: `grid-cols = min(N, 3)`. For N=4..6 the third row wraps.
 */
export const AdaptiveGrid: Story = {
  render: () => {
    const t1 = {
      quote: "AirSaas a transformé notre pilotage. Visibilité totale en quelques semaines.",
      name: "Sébastien Louyot",
      role: "CIO @Altavia",
    };
    const t2 = {
      quote: "Mise en place rapide et adoption immédiate par les équipes. On gagne 1 jour par mois.",
      name: "Aurore Butrot",
      role: "DSI @Groupe Intuis",
    };
    const t3 = {
      quote: "Hub de pilotage donnant le bon niveau de visibilité aux métiers, aux Codir et Comex.",
      name: "Thomas Sagnimorte",
      role: "DSI @Millet Mountain Group",
    };
    return (
      <div className="flex flex-col">
        <div className="px-[2rem] py-[1rem] bg-primary-5">
          <span className="text-sm font-medium text-text-muted">N=1 — single card centered, capped at ~28rem so it doesn&apos;t stretch end-to-end</span>
        </div>
        <TestimonialsFrame title="Un seul" titleHighlight="témoignage" testimonials={[t1]} />

        <div className="px-[2rem] py-[1rem] bg-primary-5">
          <span className="text-sm font-medium text-text-muted">N=2 — two columns, each card takes 1/2 of the frame width (no orphan empty col)</span>
        </div>
        <TestimonialsFrame title="Deux" titleHighlight="témoignages" testimonials={[t1, t2]} />

        <div className="px-[2rem] py-[1rem] bg-primary-5">
          <span className="text-sm font-medium text-text-muted">N=3 — three columns, max grid</span>
        </div>
        <TestimonialsFrame title="Trois" titleHighlight="témoignages" testimonials={[t1, t2, t3]} />
      </div>
    );
  },
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
