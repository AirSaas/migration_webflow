"use client";

import { Hero } from "@/components/library-design/sections/Hero";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { TestimonialsFrame } from "@/components/library-design/sections/TestimonialsFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { FeatureCard } from "@/components/library-design/ui/FeatureCard";
import { TestimonialCard } from "@/components/library-design/ui/TestimonialCard";
import { TestimonialCompanyCard } from "@/components/library-design/ui/TestimonialCompanyCard";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import { AnimateOnScroll } from "@/components/library-design/ui/AnimateOnScroll";
import {
  AtomIcon,
  BoltLightningIcon,
  BullseyeArrowIcon,
} from "@/components/library-design/ui/icons/illustration-icons";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

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
      { label: "Newsletter des DSI" },
      { label: "Newsletter des Pro. de la Transfo." },
      { label: "Le blog d'AirSaas" },
      { label: "Podcast CIO Révolution" },
      { label: "La conduite de projet" },
      { label: "Portfolio project Management" },
      { label: "Le comité de pilotage" },
      { label: "Témoignages clients" },
      { label: "Évènements" },
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
      { label: "Tableau de bord portefeuille de projet" },
      { label: "Tableau de bord DSI" },
    ],
  },
  {
    title: "Le Quarter Plan & les cadres méthodologiques",
    links: [
      { label: "AirSaas, le Quarter Plan et l'effectuation : piloter l'incertitude" },
    ],
    sections: [
      {
        title: "Alternative à",
        links: [{ label: "Sciforma" }, { label: "Planview Portfolio" }],
      },
    ],
  },
];

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <IconIllustration variant="dark" size="md">
      {children}
    </IconIllustration>
  );
}

const pressQuotes = [
  {
    quote:
      "Hub de pilotage [...] donnant le bon niveau de visibilité aux métiers, aux Codir et Comex",
    logoSrc: "/assets/images/revue-de-portefeuille/press/alliancy.png",
    logoAlt: "Alliancy",
  },
  {
    quote:
      "AirSaas vise à rendre réel l'alignement entre les directions métiers, la DSI et la direction générale",
    logoSrc: "/assets/images/revue-de-portefeuille/press/jdn.png",
    logoAlt: "JDN — Journal du NET",
  },
  {
    quote: "Une nouvelle manière d'embarquer les équipes",
    logoSrc: "/assets/images/revue-de-portefeuille/press/le-point.png",
    logoAlt: "Le Point",
  },
  {
    quote:
      "la DSI a choisi de mettre en place deux solutions complémentaires : AirSaas pour le pilotage stratégique et Asana pour la gestion opérationnelle des projets",
    logoSrc: "/assets/images/revue-de-portefeuille/press/lmi.png",
    logoAlt: "Le Monde Informatique",
  },
];

const linkedinTestimonials = [
  {
    quote:
      "Super outil qui nous permet de fluidifier le pilotage de notre portefeuille projet. Je recommande!",
    name: "Thomas Sagnimorte",
    role: "DSI chez Millet Mountain Group",
    avatarSrc: "/assets/images/revue-de-portefeuille/avatars/thomas-sagnimorte.webp",
  },
  {
    quote:
      "Un beau projet et une vraie dynamique d'équipe transverse DSI et Métiers au service du management du portefeuille de projets...",
    name: "Marie-Odile Lhomme",
    role: "Chief Digital & Information Officer",
    avatarSrc: "/assets/images/revue-de-portefeuille/avatars/marie-odile-lhomme.webp",
  },
  {
    quote:
      "Avec l'outil AirSaas nous avons pu ritualiser nos réunions de revu projet en supprimant les PowerPoints et les réunions peu efficaces...",
    name: "Clement Royer",
    role: "DSI - ICT MANAGER chez Chiesi France",
    avatarSrc: "/assets/images/revue-de-portefeuille/avatars/clement-royer.webp",
  },
];

/* ------------------------------------------------------------------ */
/*  Composition                                                        */
/* ------------------------------------------------------------------ */

export default function RevuePortefeuillePage() {
  return (
    <div className="w-full">
      {/* 1. Hero — split layout (text left, illustration right with print-style bleed) */}
      <Hero
        variant="light"
        layout="split"
        navItems={navItems}
        navCtaLabel="Demander une démo"
        navCtaHref="#"
        loginLabel="Login"
        loginHref="#"
        topTag={{ label: "Revue de portefeuille", variant: "muted" }}
        headline="L'outil de revue de"
        headlineGradient="portefeuille projets moderne"
        headlineSuffix=" qui simplifie votre gouvernance"
        subtitle="Parce que la revue de portefeuille est au cœur de votre process de transformation d'entreprise, AirSaas simplifie leur planification et leur préparation, en vous proposant des tableaux de bord consolidés et un reporting automatisé."
        primaryCta={{ label: "Réservez une démo", href: "#" }}
        illustrationSrc="/assets/images/revue-de-portefeuille/feature-portfolio-timeline.webp"
        illustrationAlt="Vue timeline du portefeuille projet AirSaas"
      />

      {/* 2. Value proposition — 3 feature cards */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="light"
          titleHighlight="Le tableau de bord préféré des DSI et PMO"
          title="pour leurs revues de portefeuille"
          subtitle="Les portefeuilles de projets les plus larges ont besoin d'un outil PPM simple à prendre en main, personnalisable et orienté valeur."
          columns={3}
        >
          <FeatureCard
            icon={<Icon><AtomIcon /></Icon>}
            title="Une visualisation macro claire de votre portefeuille"
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><BoltLightningIcon /></Icon>}
            title="Un flash report pour bien préparer vos revues"
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><BullseyeArrowIcon /></Icon>}
            title="Une expérience utilisateur simplissime"
            className="flex-1"
          />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* 3. Feature — Vos données consolidées (image right) */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Vos données"
          title="consolidées dans une seule plateforme"
          description="Grâce à AirSaas, visualisez toutes les données dont vous avez besoin pour préparer vos revues de portefeuille, sans avoir besoin d'aller les chercher à droite et à gauche."
          imageSrc="/assets/images/revue-de-portefeuille/feature-portfolio-decisions.webp"
          imageAlt="Vue décisions du portefeuille AirSaas"
        />
      </AnimateOnScroll>

      {/* 4. Feature stacked — Des vues personnalisables */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          titleHighlight="Des vues personnalisables"
          title="pour mieux classifier vos projets"
          description="Sur AirSaas, visualisez vos projets en fonction de leur niveau de risque, de leur météo, ou encore de leur statut."
        />
      </AnimateOnScroll>

      {/* 5. Feature — Votre reporting flash automatisé (image left) */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          titleHighlight="Votre reporting flash"
          title="automatisé"
          description="Parce que le reporting est un moment-phare de toute gestion de portefeuille de projets, automatisez-le grâce à AirSaas, pour vous focaliser sur le pilotage de vos programmes de transformation."
          imageSrc="/assets/images/revue-de-portefeuille/feature-flash-report.webp"
          imageAlt="Rapport flash PPT exporté depuis AirSaas"
        />
      </AnimateOnScroll>

      {/* 6. Feature stacked — Une expérience utilisateur moderne et fluide */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          titleHighlight="Une expérience utilisateur"
          title="moderne et fluide"
          description="Les PMO et DSI qui nous ont aidé à concevoir AirSaas nous l'ont dit : bon nombre d'outils de gestion de portefeuille projets sont trop complexes, trop peu lisibles et personnalisables."
        />
      </AnimateOnScroll>

      {/* 7. CTA — Choisissez de gagner du temps et du contrôle */}
      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaFrame
          title="Choisissez de gagner du temps et du contrôle"
          subtitle="Adoptez dès maintenant une solution efficace de flash report projet"
        >
          <div style={{ gridColumn: "1 / -1", width: "70%", margin: "0 auto" }}>
            <CardCta
              title="Réservez une démo"
              description="Découvrez comment AirSaas automatise la préparation de vos revues de portefeuille."
              ctaLabel="Réservez une démo"
              className="w-full"
            />
          </div>
        </CtaFrame>
      </AnimateOnScroll>

      {/* 8. Feature stacked — Fluidifiez votre gouvernance projet (intro) */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          titleHighlight="Fluidifiez votre gouvernance projet"
          title="grâce à votre outil PPM nouvelle génération"
          description="Plus qu'un simple outil de revue de portefeuille, AirSaas est une véritable solution de gestion de portfolio de projets, qui vous accompagne dans chacune de vos missions, depuis la planification stratégique au Copil."
        />
      </AnimateOnScroll>

      {/* 9. Feature — Collaborez lors de la création (image right) */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Collaborez"
          title="lors de la création de vos fiches de cadrage de projet"
          description="Rassemblez vos chefs de projet et métiers dans votre logiciel de gestion de portfolio, pour co-créer avec eux les fiches de cadrage de vos projets."
          imageSrc="/assets/images/revue-de-portefeuille/feature-presentation-scope.webp"
          imageAlt="Fiche de cadrage projet collaborative AirSaas"
        />
      </AnimateOnScroll>

      {/* 10. Feature stacked — Générez vos bilans de projets */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          titleHighlight="Générez vos bilans de projets"
          title="en quelques clics"
          description="Un projet est finalisé ? Il est temps d'en faire le bilan auprès de vos différentes parties prenantes grâce à AirSaas."
        />
      </AnimateOnScroll>

      {/* 11. Feature — Synchronisez vos outils préférés (image left) */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          titleHighlight="Synchronisez vos outils préférés"
          title="grâce à nos intégrations natives"
          description="Fini le temps passé à reporter à la main des informations d'une plateforme à une autre !"
          imageSrc="/assets/images/revue-de-portefeuille/feature-portfolio-integrated.webp"
          imageAlt="Intégrations natives AirSaas avec Jira, Asana, Monday, Teams"
        />
      </AnimateOnScroll>

      {/* 12. CTA — Simplifiez vos revues de portefeuille */}
      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaFrame
          title="Simplifiez vos revues de portefeuille dès maintenant"
          subtitle="Choisissez une solution PPM collaborative et moderne, qui fluidifie vos prises de décisions et booste votre reporting."
        >
          <div style={{ gridColumn: "1 / -1", width: "70%", margin: "0 auto" }}>
            <CardCta
              title="Réservez une démo"
              description="Fluidifiez vos prises de décisions et boostez votre reporting."
              ctaLabel="Réservez une démo"
              className="w-full"
            />
          </div>
        </CtaFrame>
      </AnimateOnScroll>

      {/* 13. 6 clés — 6 feature rows, alternating image right/left */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          titleHighlight="6 clés"
          title="pour rendre vos revues de portefeuille de projet plus efficaces"
          description="Préparation, priorisation et arbitrage : voici les trois maîtres-mots d'une bonne revue de portefeuille projets."
        />
      </AnimateOnScroll>

      {/* 13.1 Clé 1 — Prioriser les sujets (image right) */}
      <AnimateOnScroll animation="fade-right" duration={700}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Prioriser"
          title="les sujets à aborder"
          description="Appliquez une priorisation des sujets à aborder lors de votre revue en fonction de leur alignement par rapport aux objectifs stratégiques et organisationnels. L'idée ? Faire en sorte d'aborder les sujets les plus importants en premier - soit ceux qui apportent le plus de valeur à l'organisation, et qui sont les plus à risques au moment de la revue de portefeuille. Privilégiez le fait de retarder ou rejeter un projet à faible valeur ajoutée pour l'entreprise, plutôt qu'un projet-phare qui permet de lui donner un nouvel avantage concurrentiel ou une nouvelle innovation."
          imageSrc="/assets/images/revue-de-portefeuille/cle-portfolio-kanban.webp"
          imageAlt="Vue kanban du portefeuille de projets AirSaas"
        />
      </AnimateOnScroll>

      {/* 13.2 Clé 2 — Inviter les bonnes personnes (image left) */}
      <AnimateOnScroll animation="fade-left" duration={700}>
        <FeatureFrame
          imagePosition="left"
          titleHighlight="Inviter"
          title="les bonnes personnes à votre revue de portefeuille"
          description="Invitez à vos revues de portefeuille de projets uniquement les personnes qui peuvent prendre des décisions et qui permettent d'éclairer le processus décisionnel. Vous pouvez ainsi focaliser l'attention sur le fait de faire avancer votre portfolio project management, et de resserrer les débats autour de l'essentiel. L'idéal ? Inviter le Codir, les sponsors des différents programmes (les directions), et éventuellement les gestionnaires des projets des projets à risques sur le moment."
          imageSrc="/assets/images/revue-de-portefeuille/cle-modal-people.webp"
          imageAlt="Modale des personnes impliquées dans un projet AirSaas"
        />
      </AnimateOnScroll>

      {/* 13.3 Clé 3 — Envoyer le reporting en amont (image right, rich content with link) */}
      <AnimateOnScroll animation="fade-right" duration={700}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Envoyer"
          title="votre reporting en amont"
          richContent={
            <p>
              L&apos;envoi en amont de votre flash report permet de fluidifier
              la{" "}
              <a
                href="https://www.airsaas.io/fr/gestion-de-projet/comment-decider-en-copil"
                target="_blank"
                rel="noopener noreferrer"
              >
                prise de décision
              </a>{" "}
              en revue de portefeuille, en alignant toutes les parties
              prenantes autour des mêmes informations. Vous pouvez alors
              piloter la réunion de manière plus efficace, plus fluide.
            </p>
          }
          imageSrc="/assets/images/revue-de-portefeuille/feature-flash-report.webp"
          imageAlt="Flash report PPT exporté depuis AirSaas"
        />
      </AnimateOnScroll>

      {/* 13.4 Clé 4 — Adopter une structure claire (image left) */}
      <AnimateOnScroll animation="fade-left" duration={700}>
        <FeatureFrame
          imagePosition="left"
          titleHighlight="Adopter"
          title="une structure claire pour votre revue de portfolio"
          description="Mettez toujours en place la même structure de présentation, et un ordre du jour bien structuré : état d'avancement des projets, achèvement des projets finalisés, décisions à venir, gestion des ressources nécessaire, et informations sur les nouveaux projets à venir. Votre flash report multi-projets doit lui-même toujours adopter le même format pour être vraiment efficace."
          imageSrc="/assets/images/revue-de-portefeuille/feature-flash-report.webp"
          imageAlt="Structure type d'un flash report AirSaas"
        />
      </AnimateOnScroll>

      {/* 13.5 Clé 5 — Ritualiser votre revue (image right) */}
      <AnimateOnScroll animation="fade-right" duration={700}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Ritualiser"
          title="votre revue de portefeuille"
          description="Organisez vos revues à échéances fixes, en fonction des besoins de votre organisation. La plupart des PMO et DSI. font une revue de portefeuille de projets mensuelle. Organisez également cette revue après les autres types de réunions liées à votre gouvernance de portfolio de projets (après vos réunions d'avancement hebdomadaires avec les chefs de projets, et après votre réunion de coordination des ressources bi-mensuelle avec les chefs d'équipes. Ainsi, vous êtes sûr d'avoir toutes les informations nécessaires à la revue de portefeuille, et de présenter des métriques-clés bien à jour en temps réel."
          imageSrc="/assets/images/revue-de-portefeuille/cle-portfolio8.svg"
          imageAlt="Illustration du rituel de revue de portefeuille AirSaas"
        />
      </AnimateOnScroll>

      {/* 13.6 Clé 6 — Aller au-delà des chiffres (stacked, no image) */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          titleHighlight="Aller au-delà"
          title="des chiffres"
          description="Ne vous focalisez pas uniquement sur les métriques-clés liées à vos projets. Les chiffres parlent autant que les retours des équipes elles-mêmes - y compris du chef de projet en charge d'un projet spécifique. Dédiez toujours un temps de parole aux différents responsables, ou incluez à vos présentations des verbatims pour mobiliser l'attention des différents décideurs pendant la revue de portefeuille."
        />
      </AnimateOnScroll>

      {/* 14. Testimonials — Ils parlent de nous (4 press + 3 LinkedIn) */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <TestimonialsFrame title="Ils parlent de" titleHighlight="nous">
          <div className="grid grid-cols-1 gap-[1rem] items-stretch w-full md:grid-cols-2 lg:grid-cols-4">
            {pressQuotes.map((p, i) => (
              <TestimonialCompanyCard
                key={i}
                quote={p.quote}
                logoSrc={p.logoSrc}
                logoAlt={p.logoAlt}
                className="!w-auto flex-1"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-[1rem] items-stretch w-full md:grid-cols-3">
            {linkedinTestimonials.map((t, i) => (
              <TestimonialCard
                key={i}
                quote={t.quote}
                name={t.name}
                role={t.role}
                avatarSrc={t.avatarSrc}
                linkedinHref="#"
                className="flex-1"
              />
            ))}
          </div>
        </TestimonialsFrame>
      </AnimateOnScroll>

      {/* 15. Footer */}
      <AnimateOnScroll animation="fade-up" duration={600}>
        <Footer columns={footerColumns} />
      </AnimateOnScroll>
    </div>
  );
}
