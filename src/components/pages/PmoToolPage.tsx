"use client";

import { Hero } from "@/components/library-design/sections/Hero";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { ComparisonTableFrame } from "@/components/library-design/sections/ComparisonTableFrame";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { TestimonialsFrame } from "@/components/library-design/sections/TestimonialsFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import { FeatureCard } from "@/components/library-design/ui/FeatureCard";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { ClientCard } from "@/components/library-design/ui/ClientCard";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";
import { AnimateOnScroll } from "@/components/library-design/ui/AnimateOnScroll";
import {
  CalendarDayIcon,
  BullseyeArrowIcon,
  StopwatchIcon,
  CalendarStarIcon,
  IndustryIcon,
} from "@/components/library-design/ui/icons/illustration-icons";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <IconIllustration variant="dark" size="md">
      {children}
    </IconIllustration>
  );
}

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
      { label: "Les Pro. de la Transfo." },
      { label: "Le blog d'AirSaas" },
      { label: "Podcast CIO Révolution" },
      { label: "La conduite de projet" },
      { label: "Portfolio project Management" },
      { label: "Le comité de pilotage" },
      { label: "Etre PMO en 2023" },
      { label: "Témoignages clients" },
      { label: "Évènements" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Management de portefeuille projet" },
      { label: "Moteur de recherche startup" },
      { label: "Flash report automatisé" },
      { label: "Flash report projet" },
      { label: "Outil PPM" },
      { label: "Outil de pilotage projet" },
      { label: "Outil de gestion de portefeuille projet" },
      { label: "Plan stratégique" },
      { label: "Portfolio management" },
      { label: "Revue de portefeuille" },
      { label: "Tableau de bord portefeuille de projet" },
      { label: "Tableau de bord DSI" },
      { label: "Tableau de bord de gestion de projet" },
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
        links: [
          { label: "Sciforma" },
          { label: "Planview Portfolio" },
        ],
      },
    ],
  },
];

/* Press / media quotes */
const pressTestimonials = [
  {
    quote:
      "Hub de pilotage […] donnant le bon niveau de visibilité aux métiers, aux Codir et Comex.",
    name: "Alliancy",
    role: "Média",
  },
  {
    quote:
      "AirSaas vise à rendre réel l'alignement entre les directions métiers, la DSI et la direction générale.",
    name: "JDN",
    role: "Journal du Net",
  },
  {
    quote: "Une nouvelle manière d'embarquer les équipes.",
    name: "Le Point",
    role: "Presse",
  },
  {
    quote:
      "La DSI a choisi de mettre en place deux solutions complémentaires : AirSaas pour le pilotage stratégique et Asana pour la gestion opérationnelle des projets.",
    name: "Le Monde Informatique",
    role: "Presse",
  },
];

/* LinkedIn verbatim quotes */
const linkedinTestimonials = [
  {
    quote:
      "Super outil qui nous permet de fluidifier le pilotage de notre portefeuille projet. Je recommande !",
    name: "Thomas Sagnimorte",
    role: "DSI chez Millet Mountain Group",
  },
  {
    quote:
      "Un beau projet et une vraie dynamique d'équipe transverse DSI et Métiers au service du management du portefeuille de projets. Un beau partenariat AirSaas ! Heureuse de constater au jour le jour la progression… et les premiers résultats ! On continue !",
    name: "Marie-Odile Lhomme",
    role: "Chief Digital & Information Officer",
  },
  {
    quote:
      "Avec l'outil AirSaas nous avons pu ritualiser nos réunions de revue projet en supprimant les PowerPoints et les réunions peu efficaces. Cela nous permet d'avoir toute la DSI alignée et informée sur l'ensemble des projets au quotidien. Un outil vraiment TOP !",
    name: "Clément Royer",
    role: "DSI - ICT Manager chez Chiesi France",
  },
];

/* Customer profiles — "Laissez nos clients vous parler d'AirSaas" */
const clientProfiles = [
  {
    name: "Laurent Citton",
    jobTitle: "Directeur des Systèmes d'Information Groupe",
    companyName: "Groupe Picoty",
    sector: "Énergie et combustibles",
    employees: "1 300",
    initials: "LC",
  },
  {
    name: "Émilie Lecart",
    jobTitle: "CIO Office",
    companyName: "Hôtellerie & loisirs",
    sector: "Hôtellerie & loisirs",
    employees: "40 000",
    initials: "EL",
  },
  {
    name: "Sébastien Louyot",
    jobTitle: "Group CIO",
    companyName: "Altavia",
    sector: "Communication et marketing",
    employees: "2 800",
    initials: "SL",
  },
  {
    name: "David Langlade",
    jobTitle: "Conseil / DSI de transition CTO - CIO",
    companyName: "Dynamical",
    sector: "Conseil",
    employees: "2",
    initials: "DL",
  },
  {
    name: "Clément Royer",
    jobTitle: "DSI - ICT Manager",
    companyName: "Chiesi France",
    sector: "Santé - Pharma",
    employees: "6 500",
    initials: "CR",
  },
  {
    name: "Aurore Butrot",
    jobTitle: "DSI Intuis (ex Groupe Muller)",
    companyName: "Groupe Intuis",
    sector: "Industrie",
    employees: "1 000",
    initials: "AB",
  },
  {
    name: "Stephan Boisson",
    jobTitle: "Group Chief Digital & Information Officer",
    companyName: "Comexposium",
    sector: "Événementiel",
    employees: "900",
    initials: "SB",
  },
  {
    name: "Sylvain Bourdette",
    jobTitle: "DSI / CTO / Pro de la transfo",
    companyName: "Indexia Groupe",
    sector: "Assurance et Distribution",
    employees: "3 000",
    initials: "SY",
  },
  {
    name: "Vincent Potel",
    jobTitle: "Directeur Général de transition",
    companyName: "Caduciel",
    sector: "Santé – Éditeur de logiciel",
    employees: "50",
    initials: "VP",
  },
];

/* ------------------------------------------------------------------ */
/*  Composition                                                        */
/* ------------------------------------------------------------------ */

export default function PmoToolPage() {
  return (
    <div className="w-full">
      {/* 1. Hero */}
      <Hero
        navItems={navItems}
        navCtaLabel="Réservez une démo"
        navCtaHref="#"
        loginLabel="Login"
        loginHref="#"
        topTag={{ label: "Outil PPM pour PMO moderne", variant: "muted" }}
        title="L'outil PPM pour"
        titleHighlight="un PMO moderne"
        subtitle="AirSaas c'est la solution la plus simple pour avoir une vue macro consolidée du portefeuille projet. Avec AirSaas vous n'aurez plus besoin de faire des PowerPoints et de courir après les chefs de projets pour avoir les informations clefs. Et oui un PPM peut avoir une UX au top."
        primaryCta={{ label: "Réservez une démo", href: "#" }}
        imageSrc="https://placehold.co/1457x857/e8eafc/3a51e2?text=Portfolio+AirSaas"
        imageAlt="Portfolio AirSaas"
      />

      {/* 2. Ils parlent de nous — press mentions */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <TestimonialsFrame
          title="Ils parlent"
          titleHighlight="de nous"
          testimonials={pressTestimonials}
        />
      </AnimateOnScroll>

      {/* 4. LinkedIn testimonials carousel */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <TestimonialsFrame
          title="Nos utilisateurs"
          titleHighlight="témoignent"
          testimonials={linkedinTestimonials}
        />
      </AnimateOnScroll>

      {/* 5. Les chiffres qui vous feront adopter AirSaas */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="light"
          titleHighlight="Les chiffres"
          title="qui vous feront adopter AirSaas"
          subtitle=""
          columns={3}
        >
          <FeatureCard
            icon={<Icon><StopwatchIcon /></Icon>}
            title="80%"
            description="C'est la réduction moyenne du nombre de réunions projets constatée après 4 mois d'utilisation d'AirSaas. Pourquoi faire un meeting quand l'information est claire, centralisée et accessible à tous ?"
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><BullseyeArrowIcon /></Icon>}
            title="100%"
            description="C'est le taux de réduction du nombre de projet lancé sans capacité à faire ou sans objectif clair."
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><CalendarDayIcon /></Icon>}
            title="30K€"
            description="C'est le montant annuel moyen que vous dépensez en temps-homme pour faire du PowerPoint projet (si vous avez plus de 20 projets)."
            className="flex-1"
          />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* 6. Une plateforme de gouvernance projet à la hauteur de vos ambitions */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          title="Une plateforme de gouvernance projet à la hauteur de vos ambitions"
          subtitle="Notre mission ? Vous permettre de devenir le pivot de la transformation de l'entreprise en structurant la gouvernance de tous les projets, grâce à une plateforme simple que le top management va adorer. La vôtre ? Faire passer votre entreprise à l'étape supérieure en gouvernance de projet !"
        />
      </AnimateOnScroll>

      {/* 7. Feature — Partagez simplement les roadmaps */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          title="Partagez simplement les roadmaps à toute l'organisation"
          subtitle="Une roadmap, ça bouge, ça vit, c'est un élément clé pour aligner le top management en continu. Avec AirSaas, plus besoin de faire des PowerPoints à rallonge : l'information est centralisée, partageable et sympa à visualiser (parce que quand c'est beau, c'est quand même plus impactant)."
          imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Portfolio+Timeline" imageAlt=""
        />
      </AnimateOnScroll>

      {/* 8. Feature — Capacity planning (with 3 bullets verbatim) */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          title="Un capacity planning par équipe simple et actionnable"
          subtitle="Visualisez en un clin d'œil si vous êtes dans les clous… ou dans les choux. Grâce à cette vue vous avez les bases d'une discussion pragmatique pour prendre les décisions :"
          checklist={[
            "Peut-on faire plus de projets ? Faut-il en enlever ?",
            "Quels sont les jalons qui nous plombent ? Peut-on les découper ?",
            "Doit-on recruter ou mettre l'équipe en tension ? Pendant combien de temps ?",
          ]}
          imageSrc="https://placehold.co/1125x731/fffbeb/e58d05?text=Capacity+Marketing" imageAlt=""
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      {/* 9. Feature — Chaque directeur définit ses prios */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          title="Chaque directeur définit ses prios"
          subtitle="Demandez aux directeurs de prioriser parmi les projets dont son équipe est à l'origine. Deux projets ne peuvent pas avoir la même priorité. Une fois prêts, ils valident leur choix. C'est simple, transparent et puissant."
          imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Priorisation" imageAlt=""
        />
      </AnimateOnScroll>

      {/* 10. Feature — Diffusez un cadrage projet standardisé */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          title="Diffusez un cadrage projet standardisé"
          subtitle="Remplissez les fiches cadrage de projet de manière collaborative, et guidez vos collaborateurs vers un véritable niveau d'excellence en gestion de projet. À vous une culture projet homogénéisée !"
          imageSrc="https://placehold.co/1125x731/fffbeb/e58d05?text=Cadrage+Projet" imageAlt=""
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      {/* 11. Une newsletter sponsor — FeatureFrame Rich, image left */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          titleHighlight="Une newsletter sponsor"
          title="que votre direction va adorer"
          richContent={
            <>
              <h5>← Tendance des projets vitaux</h5>
              <p>
                Un récapitulatif de la santé des projets vitaux de votre
                organisation pour leur permettre de « sentir » la tendance du
                moment.
              </p>
              <h5>← Tendance de leurs projets à eux</h5>
              <p>
                Un aperçu de leurs projets, ceux en amélioration et ceux en
                dégradation qui nécessitent leur attention. En un clic, ils
                peuvent accéder à la fiche projet.
              </p>
              <h5>← Projets en retard d&apos;actualisation</h5>
              <p>
                Un rappel des projets qui méritent d&apos;être mis à jour. Si cette
                section est vide, vous êtes tranquille !
              </p>
            </>
          }
          imageSrc="https://placehold.co/1125x731/e8eafc/3a51e2?text=Newsletter+Sponsor" imageAlt=""
        />
      </AnimateOnScroll>

      {/* 12. Feature — Votre reporting projet en un clic */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          title="Votre reporting projet en un clic"
          subtitle="Générez votre reporting flash en un seul clic, et homogénéisez vos présentations, pour faciliter la prise de décision. Autant de temps gagné pour vous focaliser sur le coaching de vos chefs de projet et votre gouvernance."
          imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Flash+Report" imageAlt=""
        />
      </AnimateOnScroll>

      {/* 13. Feature — Fluidifiez votre prise de décisions */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          title="Fluidifiez votre prise de décisions importantes et urgentes"
          subtitle="Centralisez vos décisions sous forme de Kanban, et partagez-les aisément avec toutes les parties prenantes de vos projets. Finies les informations perdues dans vos mails ou flux de discussions instantanées !"
          imageSrc="https://placehold.co/1125x731/fffbeb/e58d05?text=Portfolio+Decisions" imageAlt=""
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      {/* 14. Feature — Impliquez simplement les chefs de projet */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          title="Impliquez simplement les chefs de projet"
          subtitle='En 5 minutes par semaine par projet, les chefs de projets remontent les informations cruciales pour le suivi : jalon, décision à prendre, point d&apos;attention. Évitez les réunions « informationnelles » et les rush de dernière minute pour faire un reporting.'
          imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Project+Page" imageAlt=""
        />
      </AnimateOnScroll>

      {/* 15. Feature — Animez clairement et simplement vos CoPil */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          title="Animez clairement et simplement vos CoPil"
          subtitle="Pilotez par la décision : pendant votre comité de pilotage vous aurez accès à toutes les décisions à prendre et historiques clés. Vous ne serez plus pris de court parce que vous n'avez pas la bonne information."
          imageSrc="https://placehold.co/1125x731/fffbeb/e58d05?text=CoPil+Decisions" imageAlt=""
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      {/* 16. Big CTA — Et si vous repreniez le contrôle ? */}
      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaFrame
          title="Et si vous repreniez le contrôle de votre portefeuille de projets ?"
          subtitle="Adoptez dès maintenant une solution de gestion de gouvernance moderne, qui fait gagner vos projets en temps et en efficacité."
        >
          <div
            style={{
              gridColumn: "1 / -1",
              width: "70%",
              margin: "0 auto",
            }}
          >
            <CardCta
              title="Réserver une démo"
              description="Adoptez dès maintenant une solution de gouvernance moderne pour votre portefeuille de projets."
              ctaLabel="Réservez une démo"
              className="w-full"
            />
          </div>
        </CtaFrame>
      </AnimateOnScroll>

      {/* 17. Feature — Marketplace / intégrations */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          title="Grâce à sa marketplace AirSaas s'intègre nativement à vos outils du quotidien"
          subtitle="Centralisez toutes vos informations cruciales (tickets, jalons…) depuis vos outils de gestion de tâches sur AirSaas, et diffusez-les via vos canaux de communication interne. Tout le monde est au diapason, et vous gouvernez de manière optimale."
          imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Automation+Integrations" imageAlt=""
        />
      </AnimateOnScroll>

      {/* 18. Before / After comparison table — Nos clients ne peuvent plus imaginer leurs vies sans AirSaas */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ComparisonTableFrame
          titleHighlight="Nos clients"
          title="ne peuvent plus imaginer leurs vies sans AirSaas"
          featuresLabel="Quotidien PMO"
          columns={[
            { label: "Sans AirSaas" },
            { label: "Avec AirSaas", highlight: true },
          ]}
          rows={[
            {
              feature: "Cadrage projet",
              values: [
                "Des projets cadrés sur PowerPoint ou Excel, sans collaboration et sans homogénéité",
                "Un cadrage projet collaboratif et uniformisé, guidé par des bonnes pratiques en la matière",
              ],
            },
            {
              feature: "Reporting projet / CoPil",
              values: [
                "Un reporting projet / CoPil à la main, qui vous prend un temps significatif",
                "Un reporting décisionnel généré automatiquement aux couleurs de votre entreprise",
              ],
            },
            {
              feature: "Information projet",
              values: [
                "Trop de micro-information dispersée entre vos différents outils de gestion de tâches et de ticketing",
                "Un focus sur les décisions et les points d'attentions de vos projets, grâce à une gouvernance structurée",
              ],
            },
            {
              feature: "Transparence",
              values: [
                "Une difficulté pour les chefs de projet à comprendre les décisions prises et à prendre",
                "Une véritable transparence de vos projets pour toutes les parties prenantes de votre entreprise",
              ],
            },
            {
              feature: "Pilotage",
              values: [
                "Un pilotage à la tâche complexe",
                "Un pilotage agile par les jalons de vos projets",
              ],
            },
            {
              feature: "Culture projet",
              values: [
                "Une culture projet hétérogène, voire inexistante",
                "Une culture projet standardisée, qui pousse tous les collaborateurs vers l'excellence",
              ],
            },
            {
              feature: "Management",
              values: [
                "Du micro-management pour gérer vos différents collaborateurs",
                "Une responsabilisation de chacun, grâce à une vision simplifiée et collaborative de l'avancement des projets",
              ],
            },
          ]}
        />
      </AnimateOnScroll>

      {/* 19. Laissez nos clients vous parler d'AirSaas — 9 ClientCards */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <section className="flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.125rem] lg:px-[10rem] lg:py-[6.25rem] bg-primary-2">
          <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
            <Heading level={2} gradient="none" align="center">
              <GradientText gradient="dark-to-primary">Laissez nos clients</GradientText>{" "}
              <GradientText gradient="primary">vous parler d&apos;AirSaas</GradientText>
            </Heading>
            <Text size="md" align="center" maxWidth="60rem">
              Qui de mieux pour vous parler de la plateforme que ceux qui l&apos;utilisent au quotidien pour améliorer la gestion de leurs projets de transformation ?
            </Text>
          </div>

          <div className="grid grid-cols-1 gap-[1.5rem] items-stretch w-full md:grid-cols-2 lg:grid-cols-3">
            {clientProfiles.map((c, i) => (
              <ClientCard
                key={i}
                avatarSrc={`https://placehold.co/180x180/e8eafc/3a51e2?text=${c.initials}`}
                avatarAlt={c.name}
                name={c.name}
                jobTitle={c.jobTitle}
                companyName={c.companyName}
                infoRows={[
                  { icon: <IndustryIcon />, label: "Secteur", value: c.sector },
                  { icon: <CalendarDayIcon />, label: "Effectif", value: c.employees },
                ]}
                className="!w-auto flex-1"
              />
            ))}
          </div>
        </section>
      </AnimateOnScroll>

      {/* 20. Replay — Le replay à ne pas manquer ! */}
      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaFrame
          title="Le replay à ne pas manquer !"
          subtitle="Aurore Butrot, DSI du groupe Intuis, nous explique comment elle combine l'utilisation d'AirSaas et d'Asana pour piloter respectivement la gouvernance et l'exécution de ses projets."
        >
          <div
            style={{
              gridColumn: "1 / -1",
              width: "70%",
              margin: "0 auto",
            }}
          >
            <CardCta
              title="Voir le replay"
              description="Intuis × Asana — Gouvernance et exécution des projets."
              ctaLabel="Voir le replay"
              className="w-full"
            />
          </div>
        </CtaFrame>
      </AnimateOnScroll>

      {/* 21. Footer */}
      <AnimateOnScroll animation="fade-up" duration={600}>
        <Footer
          columns={footerColumns}
          copyright="Made with love in France | © 2025 AirSaas · Mentions légales · Confidentialité"
          copyrightIcon={<span aria-label="Français">🇫🇷</span>}
        />
      </AnimateOnScroll>
    </div>
  );
}
