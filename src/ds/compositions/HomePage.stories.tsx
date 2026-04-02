import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hero } from "@/ds/blocks/Hero";
import { LogosBar } from "@/ds/primitives/LogosBar";
import { ValuePropositionFrame } from "@/ds/blocks/ValuePropositionFrame";
import { ComparisonFrame } from "@/ds/blocks/ComparisonFrame";
import { FeatureFrame } from "@/ds/blocks/FeatureFrame";
import { TestimonialsFrame } from "@/ds/blocks/TestimonialsFrame";
import { FaqFrame } from "@/ds/blocks/FaqFrame";
import { CtaFrame } from "@/ds/blocks/CtaFrame";
import { Footer } from "@/ds/blocks/Footer";
import { FeatureCard } from "@/ds/primitives/FeatureCard";
import { CardCta } from "@/ds/primitives/CardCta";
import { IconIllustration } from "@/ds/primitives/IconIllustration";
import { AnimateOnScroll } from "@/ds/primitives/AnimateOnScroll";
import {
  CalendarDayIcon,
  BullseyeArrowIcon,
  StopwatchIcon,
  SuitcaseIcon,
} from "@/ds/primitives/icons/illustration-icons";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <IconIllustration variant="dark" size="md">
      {children}
    </IconIllustration>
  );
}

const navItems = [
  { label: "Solutions", hasDropdown: true },
  { label: "Produit", hasDropdown: true },
  { label: "Ressources", hasDropdown: true },
  { label: "Témoignages", href: "#" },
  { label: "Intégrations", href: "#" },
  { label: "Nouveautés", href: "#" },
  { label: "Le Quarter Plan", href: "#" },
  { label: "Intégration teams", href: "#" },
];

const logos = [
  { src: "/assets/logos/kiabi.svg", alt: "Kiabi", width: 96, height: 40 },
  { src: "/assets/logos/valrhona.svg", alt: "Valrhona", width: 130, height: 40 },
  { src: "/assets/logos/intuis.svg", alt: "Intuis", width: 70, height: 40 },
  { src: "/assets/logos/altavia.svg", alt: "Altavia", width: 110, height: 40 },
  { src: "/assets/logos/sncf.svg", alt: "SNCF", width: 80, height: 40 },
];

const footerColumns = [
  {
    title: "Entreprise",
    links: [
      { label: "Pourquoi AirSaas ?" },
      { label: "Cookies" },
      { label: "Conditions d'utilisation" },
      { label: "Mentions légales" },
      { label: "Charte de confidentialité" },
      { label: "Kit média" },
      { label: "API AirSaas" },
      { label: "Plan du site" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Les Pro. de la Transfo." },
      { label: "Le blog d'AirSaas" },
      { label: "La conduite de projet" },
      { label: "Portfolio project Management" },
      { label: "Témoignages clients" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Management de portefeuille projet" },
      { label: "Flash report automatisé" },
      { label: "Outil PPM" },
      { label: "Outil de pilotage projet" },
      { label: "Plan stratégique" },
      { label: "Portfolio management" },
      { label: "Revue de portefeuille" },
      { label: "Tableau de bord DSI" },
    ],
  },
  {
    title: "Le Quarter Plan & les cadres méthodologiques",
    links: [
      { label: "AirSaas, le Quarter Plan et l'effectuation" },
      { label: "Alternative à Sciforma" },
      { label: "Alternative à Planview Portfolio" },
    ],
  },
];

const faqItems = [
  {
    question: "Est-ce que ça suffit pour un vrai capacitaire ?",
    answer:
      "Oui, pour savoir ce qu'il est possible de faire au niveau macro. C'est ce qu'il manque au top management pour prioriser. Pour le micro-planning, gardez vos outils opérationnels.",
  },
  {
    question: "Comment gérer des compétences différentes dans une équipe ?",
    answer:
      "AirSaas vous permet de définir des profils de compétences par équipe et de visualiser la disponibilité par compétence.",
  },
  {
    question: "Combien de temps pour être opérationnel ?",
    answer:
      "En moyenne 4 semaines. Notre équipe vous accompagne dans la configuration initiale, l'import de vos données et la formation de vos équipes.",
  },
  {
    question: "AirSaas remplace-t-il nos outils existants ?",
    answer:
      "Non, AirSaas se positionne au-dessus de vos outils opérationnels (Jira, Monday, Asana...). Il agrège les données pour fournir une vue macro au management.",
  },
];

const testimonials = [
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
];

function HomePage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <Hero
        navItems={navItems}
        navCtaLabel="Demander une démo"
        navCtaHref="#"
        loginLabel="Login"
        loginHref="#"
        topTag={{ label: "Capacity Planning simplifié", variant: "muted" }}
        headline="Vos équipes sont surchargées ? C'est normal :"
        headlineGradient="personne ne sait ce qu'elles peuvent vraiment faire."
        subtitle='AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire "non" avec des données, pas au feeling.'
        bottomTags={[
          { label: "Opérationnel en 1 mois", variant: "success" },
          { label: "Accompagnement premium inclus", variant: "success" },
        ]}
        primaryCta={{ label: "Réservez une démo", href: "#" }}
        secondaryCta={{
          label: "Découvrir l'outil PPM en vidéo (5 min)",
          href: "#",
        }}
        illustrationSrc="https://placehold.co/1457x857/e8eafc/3a51e2?text=Product+Screenshot"
        illustrationAlt="AirSaas product screenshot"
      />

      {/* Logos bar */}
      <AnimateOnScroll animation="fade" duration={500}>
        <LogosBar logos={logos} />
      </AnimateOnScroll>

      {/* Value Proposition Frame — light */}
      <AnimateOnScroll animation="fade-up" duration={700}>
      <ValuePropositionFrame
        variant="light"
        tag="Capacity Planning & Gouvernance de portefeuille"
        titleHighlight="Les chiffres"
        title="qui vous feront adopter AirSaas"
        subtitle="Un déploiement simple et accompagné, pas un projet IT de 6 mois."
      >
        <FeatureCard icon={<Icon><CalendarDayIcon /></Icon>} title="1 mois" description="Déploiement complet en 4 semaines, pas un projet IT de 6 mois." className="flex-1" />
        <FeatureCard icon={<Icon><BullseyeArrowIcon /></Icon>} title="100%" description="De visibilité sur la capacité réelle de vos équipes." className="flex-1" />
        <FeatureCard icon={<Icon><StopwatchIcon /></Icon>} title="+40%" description="De gain de temps pour vos PMO sur les tâches administratives." className="flex-1" />
        <FeatureCard icon={<Icon><SuitcaseIcon /></Icon>} title="10min" description="Pour générer un rapport flash automatique pour le COMEX." className="flex-1" />
      </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* Comparison frame */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ComparisonFrame
          title="Les vrais problèmes du capacity planning"
          subtitle="Un déploiement simple et accompagné, pas un projet IT de 6 mois."
          items={[
            { value: 1, description: <>Les outils existants sont <strong>trop complexes</strong> → personne ne les maintient</> },
            { value: 2, description: <>Les <strong>ressources partagées</strong> créent des conflits entre équipes</> },
            { value: 3, description: <>Les décisions se prennent <strong>au feeling</strong>, pas sur des données fiables</> },
            { value: 4, description: <><strong>Aucune visibilité</strong> sur la capacité réelle des équipes</> },
            { value: 5, description: <>Les <strong>projets en retard</strong> s&apos;accumulent sans que personne ne sache pourquoi</> },
            { value: 6, description: <>Le <strong>PMO passe son temps</strong> à collecter des données au lieu de piloter</> },
          ]}
        />
      </AnimateOnScroll>

      {/* Feature frame right */}
      {/* Feature frame right — slide from right */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame imagePosition="right" tag="Intelligence Artificielle" titleHighlight="Agent IA" title="Brief projet" description='Quand une demande arrive floue ("on veut un truc"), l&apos;agent IA mène l&apos;entretien, collecte les informations critiques et transforme chaque demande en brief clair et comparable.' checklist={["Entretien guidé par l'IA", "Brief structuré automatiquement", "Comparaison objective des demandes", "Intégration native avec vos outils"]} ctaLabel="Découvrir" imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Agent+IA" />
      </AnimateOnScroll>

      {/* Feature frame left — slide from left */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame imagePosition="left" tag="Capacity Planning" titleHighlight="Vue capacitaire" title="en temps réel" description="Visualisez instantanément la charge de vos équipes, identifiez les surcharges et anticipez les conflits de ressources." checklist={["Vision macro des capacités", "Alertes automatiques de surcharge", "Simulation de scénarios", "Export pour le COMEX"]} ctaLabel="En savoir plus" imageSrc="https://placehold.co/1125x731/fffbeb/e58d05?text=Capacity+Planning" imageBgColor="#fffbeb" />
      </AnimateOnScroll>

      {/* Value Proposition Frame — dark */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame variant="dark" title="Opérationnel en 1 mois" subtitle="Un déploiement simple et accompagné, pas un projet IT de 6 mois.">
          <FeatureCard icon={<Icon><CalendarDayIcon /></Icon>} title="Équipes" description="Embarquez vos équipes sans formation complexe." className="flex-1" />
          <FeatureCard icon={<Icon><BullseyeArrowIcon /></Icon>} title="Projets" description="Importez vos projets en quelques clics." className="flex-1" />
          <FeatureCard icon={<Icon><StopwatchIcon /></Icon>} title="Scénarios" description="Testez différents scénarios capacitaires." className="flex-1" />
          <FeatureCard icon={<Icon><SuitcaseIcon /></Icon>} title="Décidez" description="Prenez vos décisions basées sur des données." className="flex-1" />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* Feature frame right */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame imagePosition="right" tag="Roadmap" titleHighlight="Roadmap" title="collaborative" description="Partagez une roadmap unique entre toutes les parties prenantes. Chaque changement est visible en temps réel." checklist={["Roadmap partagée", "Mises à jour en temps réel", "Notifications automatiques", "Vue timeline"]} ctaLabel="Découvrir la roadmap" imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Roadmap" />
      </AnimateOnScroll>

      {/* Feature frame left */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame imagePosition="left" tag="Reporting" titleHighlight="Flash report" title="automatisé" description="Générez des rapports flash en un clic pour vos comités de pilotage. Plus besoin de compiler des données manuellement." checklist={["Rapport en 1 clic", "Données consolidées", "Format COMEX-ready", "Historique complet"]} ctaLabel="Voir un exemple" imageSrc="https://placehold.co/1125x731/fffbeb/e58d05?text=Flash+Report" imageBgColor="#fffbeb" />
      </AnimateOnScroll>

      {/* Feature frame right */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame imagePosition="right" tag="Priorisation" titleHighlight="Scoring" title="intelligent" description="Évaluez et comparez vos projets avec un scoring objectif. Priorisez en fonction de la valeur et de la capacité disponible." checklist={["Scoring multicritère", "Matrice de priorisation", "Alignement stratégique", "Décision data-driven"]} ctaLabel="En savoir plus" imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Scoring" />
      </AnimateOnScroll>

      {/* Feature frame left */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame imagePosition="left" tag="Gouvernance" titleHighlight="Pilotage" title="de portefeuille" description="Centralisez la gouvernance de votre portefeuille de projets. Une vue unifiée pour le management et les équipes opérationnelles." checklist={["Vue portefeuille 360°", "Suivi des jalons", "Gestion des risques", "Tableau de bord DSI"]} ctaLabel="Découvrir" imageSrc="https://placehold.co/1125x731/fffbeb/e58d05?text=Gouvernance" imageBgColor="#fffbeb" />
      </AnimateOnScroll>

      {/* Value Proposition Frame — dark */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame variant="dark" titleHighlight="Intégrations" title="natives avec vos outils" subtitle="AirSaas se connecte à vos outils existants en quelques clics.">
          <FeatureCard icon={<Icon><CalendarDayIcon /></Icon>} title="Jira" description="Synchronisation bidirectionnelle avec Jira." className="flex-1" />
          <FeatureCard icon={<Icon><BullseyeArrowIcon /></Icon>} title="Monday" description="Import automatique de vos boards Monday." className="flex-1" />
          <FeatureCard icon={<Icon><StopwatchIcon /></Icon>} title="Asana" description="Connexion native avec Asana." className="flex-1" />
          <FeatureCard icon={<Icon><SuitcaseIcon /></Icon>} title="Teams" description="Notifications dans Microsoft Teams." className="flex-1" />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* Testimonials frame */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <TestimonialsFrame title="Ils ont simplifié leur" titleHighlight="capacity planning" testimonials={testimonials} />
      </AnimateOnScroll>

      {/* Value Proposition Frame — light */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame variant="light" titleHighlight="Pourquoi" title="choisir AirSaas ?" subtitle="La plateforme conçue pour les PMO qui veulent enfin piloter, pas subir.">
          <FeatureCard icon={<Icon><CalendarDayIcon /></Icon>} title="Simple" description="Interface intuitive, adoption immédiate par les équipes." className="flex-1" />
          <FeatureCard icon={<Icon><BullseyeArrowIcon /></Icon>} title="Rapide" description="Opérationnel en 4 semaines, pas 6 mois." className="flex-1" />
          <FeatureCard icon={<Icon><StopwatchIcon /></Icon>} title="Complet" description="Du capacity planning au flash report, tout en un." className="flex-1" />
          <FeatureCard icon={<Icon><SuitcaseIcon /></Icon>} title="Accompagné" description="Une équipe dédiée à votre succès." className="flex-1" />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* FAQ Frame */}
      <AnimateOnScroll animation="fade-up" duration={600}>
        <FaqFrame items={faqItems} />
      </AnimateOnScroll>

      {/* CTA Frame — 2 columns */}
      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaFrame title="Arrêtez de lancer des projets sans capacité" subtitle="Découvrez comment AirSaas simplifie votre capacity planning. AirSaas libère le PMO des tâches administratives pour qu'il puisse enfin se concentrer sur la stratégie.">
          <CardCta title="Réserver une démo" description='AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire "non" avec des données, pas au feeling.' ctaLabel="Réservez une démo" className="flex-1" />
          <CardCta title="Découvrir le guide Capacity Planning" description="Captez les gestes qui comptent et mettez-les en pratique." ctaLabel="Télécharger le guide" className="flex-1" />
        </CtaFrame>
      </AnimateOnScroll>

      {/* Footer */}
      <AnimateOnScroll animation="fade-up" duration={600}>
        <Footer columns={footerColumns} />
      </AnimateOnScroll>
    </div>
  );
}

const meta = {
  title: "Compositions/HomePage",
  component: HomePage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
