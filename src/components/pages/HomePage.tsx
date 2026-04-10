"use client";

import { Hero } from "@/components/library-design/sections/Hero";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { FeatureSectionStacked } from "@/components/library-design/sections/FeatureSectionStacked";
import { Footer } from "@/components/library-design/sections/Footer";
import { FeatureCard } from "@/components/library-design/ui/FeatureCard";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import { SectionHeading } from "@/components/library-design/ui/SectionHeading";
import { TestimonialCompanyCard } from "@/components/library-design/ui/TestimonialCompanyCard";
import { TestimonialCard } from "@/components/library-design/ui/TestimonialCard";
import { Slider } from "@/components/library-design/ui/Slider";
import { Button } from "@/components/library-design/ui/Button";
import { GradientBackground } from "@/components/library-design/ui/GradientBackground";
import { FloatingCard } from "@/components/library-design/ui/FloatingCard";
import { Float } from "@/components/library-design/ui/Float";
import { AnimateOnScroll } from "@/components/library-design/ui/AnimateOnScroll";
import {
  CalendarDayIcon,
  StopwatchIcon,
  SuitcaseIcon,
} from "@/components/library-design/ui/icons/illustration-icons";
import {
  NavPmoIcon,
  NavItIcon,
  NavComiteIcon,
  NavDirectionIcon,
  NavExpertIcon,
  NavPriorisationIcon,
  NavCapacitaireIcon,
  NavEmailIcon,
  NavTraductionIcon,
  NavReportingIcon,
  NavBudgetIcon,
  NavCommunauteIcon,
  NavBlogIcon,
  NavPodcastIcon,
  NavBootcampIcon,
  NavEvenementsIcon,
} from "@/components/library-design/ui/icons/nav-icons";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <IconIllustration variant="dark" size="md">
      {children}
    </IconIllustration>
  );
}

/* ─── Data ─── */

const navItems = [
  {
    label: "Solutions",
    hasDropdown: true,
    dropdownItems: [
      {
        icon: <NavPmoIcon />,
        title: "PMO",
        subtitle: "Pilotez le portefeuille de projets simplement",
        href: "/fr/equipes/outil-pmo",
      },
      {
        icon: <NavItIcon />,
        title: "IT & Opérations",
        subtitle: "Devenez le business partner des métiers",
        href: "/fr/equipes/it-et-operation",
      },
      {
        icon: <NavComiteIcon />,
        title: "Comité de direction",
        subtitle: "Obtenez une vue globale de la transformation de toute l'entreprise",
        href: "/fr/equipes/comite-direction",
      },
      {
        icon: <NavDirectionIcon />,
        title: "Direction de la transformation",
        subtitle: "Alignez les business units autour d'une vision commune",
        href: "/fr/equipes/direction-de-la-transformation",
      },
      {
        icon: <NavExpertIcon />,
        title: "Experts de la Transfo.",
        subtitle: "Indépendant(e) ? ESN spécialisée ? Nous outillons vos missions",
        href: "/fr/solution/airsaas-et-les-experts-de-la-transfo",
      },
    ],
  },
  {
    label: "Produit",
    hasDropdown: true,
    dropdownItems: [
      {
        icon: <NavPriorisationIcon />,
        title: "Priorisation par équipe en demande",
        subtitle: "Tout n'est pas prioritaire, faire un choix c'est renoncer",
        href: "/fr/produit/priorisation-par-equipes",
      },
      {
        icon: <NavCapacitaireIcon />,
        title: "Capacitaire par équipe",
        subtitle: "Une projection dans le futur pour savoir ce que nous pouvons faire",
        href: "/fr/produit/capacity-planning",
      },
      {
        icon: <NavEmailIcon />,
        title: 'Email "bilan de santé" des projets',
        subtitle: "Un email récap' de la santé de vos projets, une fois par semaine",
        href: "/fr/produit/automatiser-la-com-projet",
      },
      {
        icon: <NavTraductionIcon />,
        title: "Traduction instantanée",
        subtitle: "Utiliser AirSaas dans un contexte international",
        href: "/fr/produit/traduction-one-click-avec-deepl",
      },
      {
        icon: <NavReportingIcon />,
        title: "Reporting projet",
        subtitle: "Un rapport flash complet, homogène, à jour et surtout actionnable",
        href: "/fr/produit/reporting-projet",
      },
      {
        icon: <NavBudgetIcon />,
        title: "Suivi budgétaire",
        subtitle: "Gardez un œil sur l'évolution de vos budgets projets",
        href: "/fr/produit/budget",
      },
    ],
  },
  {
    label: "Ressources",
    hasDropdown: true,
    dropdownItems: [
      {
        icon: <NavCommunauteIcon />,
        title: "La communauté",
        subtitle: "Rejoignez les Pro. de la Transfo.",
        href: "/fr/lesprodelatransfo",
      },
      {
        icon: <NavBlogIcon />,
        title: "Le blog : Les Pro. de la Transfo.",
        subtitle: "Découvrez des contenus pragmatiques et actionnables",
        href: "/fr/blog-2",
      },
      {
        icon: <NavPodcastIcon />,
        title: "Le podcast : CIO Révolution",
        subtitle: "Écoutez les CIO dévoiler l'envers du décor",
        href: "/fr/blog-3/cio-revolution",
      },
      {
        icon: <NavBootcampIcon />,
        title: "BOOTCAMP - Pro de la Transfo",
        subtitle: "Un programme de formation pour celles et ceux qui transforment",
        href: "/fr/bootcamp-airsaas-expert",
      },
      {
        icon: <NavEvenementsIcon />,
        title: "Évènements",
        subtitle: "Rencontrez les Pro. de la Transfo, en ligne ou IRL",
        href: "https://club.airsaas.io/c/le-live/",
      },
    ],
  },
  { label: "Témoignages", href: "/fr/temoignages" },
  { label: "Intégrations", href: "/fr/les-integrations" },
  { label: "Nouveautés", href: "/fr/les-nouveautes-produit" },
  { label: "Le Quarter Plan", href: "/fr/quarter-plan" },
  { label: "Intégration teams", href: "/fr/microsoft-teams-airsaas" },
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

const companyTestimonials = [
  {
    quote:
      "Hub de pilotage donnant le bon niveau de visibilité aux métiers, aux Codir et Comex",
    logoSrc: "https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/63d10687150c6042f155dcd4_logo-alliancy-monotone.png",
    logoAlt: "Alliancy",
  },
  {
    quote:
      "AirSaas vise à rendre réel l'alignement entre les directions métiers, la DSI et la direction générale",
    logoSrc: "https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/63d106ab9c5e18b386c84505_JDN-monotone.png",
    logoAlt: "JDN Journal du NET",
  },
  {
    quote:
      "Une nouvelle manière d'embarquer les équipes",
    logoSrc: "https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/63d10458acb275dbac3ecb65_LePoint-monotone.png",
    logoAlt: "Le Point",
  },
];

const testimonials = [
  {
    quote:
      "Super outil qui nous permet de fluidifier le pilotage de notre portefeuille projet. Je recommande !",
    name: "Thomas Sagnimorte",
    role: "DSI @Millet Mountain Group",
    linkedinHref: "#",
  },
  {
    quote:
      "Un beau projet et vraie dynamique d'équipe transverse... Heureuse de constater la progression et premiers résultats !",
    name: "Marie-Odile Lhomme",
    role: "CDIO",
    linkedinHref: "#",
  },
  {
    quote:
      "Avec AirSaas nous avons pu ritualiser nos réunions en supprimant les PowerPoints... Outil vraiment TOP !",
    name: "Clément Royer",
    role: "DSI @Chiesi France",
    linkedinHref: "#",
  },
];

const comparisonItemsSans = [
  {
    value: 1,
    description: (
      <>
        Des projets cadrés sur <strong>PowerPoint ou Excel</strong>, sans
        collaboration et sans homogénéité
      </>
    ),
  },
  {
    value: 2,
    description: (
      <>
        Un <strong>reporting projet / CoPil à la main</strong>, qui vous prend
        un temps significatif
      </>
    ),
  },
  {
    value: 3,
    description: (
      <>
        Trop de <strong>micro-information dispersée</strong> entre vos
        différents outils de gestion de tâches et de ticketing
      </>
    ),
  },
  {
    value: 4,
    description: (
      <>
        Une difficulté pour les chefs de projet à comprendre les{" "}
        <strong>décisions prises et à prendre</strong>
      </>
    ),
  },
  {
    value: 5,
    description: (
      <>
        Un <strong>pilotage à la tâche</strong> complexe
      </>
    ),
  },
  {
    value: 6,
    description: (
      <>
        Une <strong>culture projet hétérogène</strong>, voire inexistante
      </>
    ),
  },
  {
    value: 7,
    description: (
      <>
        Du <strong>micro-management</strong> pour gérer vos différents
        collaborateurs
      </>
    ),
  },
];

const comparisonItemsAvec = [
  {
    value: 1,
    description: (
      <>
        Un <strong>cadrage projet collaboratif</strong> et uniformisé, guidé par
        des bonnes pratiques en la matière
      </>
    ),
  },
  {
    value: 2,
    description: (
      <>
        Un <strong>reporting décisionnel généré automatiquement</strong> aux
        couleurs de votre entreprise
      </>
    ),
  },
  {
    value: 3,
    description: (
      <>
        Un focus sur les <strong>décisions et les points d&apos;attention</strong>{" "}
        de vos projets, grâce à une gouvernance structurée
      </>
    ),
  },
  {
    value: 4,
    description: (
      <>
        Une véritable <strong>transparence</strong> de vos projets pour toutes
        les parties prenantes de votre entreprise
      </>
    ),
  },
  {
    value: 5,
    description: (
      <>
        Un <strong>pilotage agile</strong> par les jalons de vos projets
      </>
    ),
  },
  {
    value: 6,
    description: (
      <>
        Une <strong>culture projet standardisée</strong>, qui pousse tous les
        collaborateurs vers l&apos;excellence
      </>
    ),
  },
  {
    value: 7,
    description: (
      <>
        Une <strong>responsabilisation</strong> de chacun, grâce à une vision
        simplifiée et collaborative de l&apos;avancement des projets
      </>
    ),
  },
];

const sliderSlides = [
  {
    imageSrc:
      "https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/65d484f5bef7b761e48fea37_Automation%20-%20integrations.webp",
    imageAlt: "Marketplace AirSaas - Automatisations et intégrations",
  },
  {
    imageSrc:
      "https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/65d48497b08e93531f3ba49b_Graphic%20Integrations.webp",
    imageAlt: "Marketplace AirSaas - Intégrations graphiques",
  },
];

/* ─── Inline Section: Newsletter ─── */

function NewsletterSection() {
  return (
    <section
      className="flex flex-col gap-[2rem] bg-white lg:flex-row lg:items-center lg:gap-[3.125rem]"
      style={{
        paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingRight: "0",
        paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
        paddingBottom: "clamp(3rem, 5.2vw, 6.25rem)",
      }}
    >
      {/* Text content */}
      <div className="flex flex-1 flex-col gap-[1.25rem] items-start min-w-0">
        <h2
          className="font-black leading-tight"
          style={{ fontSize: "var(--text-h2)" }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
            }}
          >
            Une newsletter sponsor
          </span>
          <br />
          <span className="text-foreground">
            que votre direction va adorer
          </span>
        </h2>

        {/* Subtitle + paragraph blocks */}
        <div className="flex flex-col gap-[1.25rem] w-full">
          <div className="flex flex-col gap-[0.3125rem]">
            <p
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.25rem, 1.8vw, 2.125rem)", lineHeight: "1.4" }}
            >
              Tendance des projets vitaux
            </p>
            <p
              className="font-light text-foreground"
              style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
            >
              Un récapitulatif de la santé des projets vitaux de votre
              organisation pour leur permettre de &ldquo;sentir&rdquo; la
              tendance du moment.
            </p>
          </div>

          <div className="flex flex-col gap-[0.3125rem]">
            <p
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.25rem, 1.8vw, 2.125rem)", lineHeight: "1.4" }}
            >
              Tendance de leurs projets à eux
            </p>
            <p
              className="font-light text-foreground"
              style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
            >
              Un aperçu de leurs projets, ceux en amélioration et ceux en
              dégradation qui nécessitent leur attention. En un clic, ils peuvent
              accéder à la fiche projet.
            </p>
          </div>

          <div className="flex flex-col gap-[0.3125rem]">
            <p
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.25rem, 1.8vw, 2.125rem)", lineHeight: "1.4" }}
            >
              Projets en retard d&apos;actualisation
            </p>
            <p
              className="font-light text-foreground"
              style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
            >
              Un rappel des projets qui méritent d&apos;être mis à jour. Si
              cette section est vide, vous êtes tranquilles !
            </p>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div
        className="shrink-0 overflow-hidden lg:w-[67.5rem] lg:max-w-[60%]"
        style={{
          backgroundColor: "var(--color-primary-5, #f3f3fc)",
          borderRadius: "2.1875rem",
          padding: "2.5rem 0 2.5rem 2.5rem",
        }}
      >
        <img
          src="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/66543b6b307a64952dc9c936_Control%20tower%20email%20FR-1.png"
          alt="Control tower email - Newsletter sponsor pour la direction"
          className="w-full h-auto rounded-[0.625rem] object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
}

/* ─── Inline Section: CTA with gradient ─── */

function CtaGradientSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <GradientBackground
        variant="cta"
        className="absolute inset-0 w-full"
      />
      <div
        className="relative z-10 flex flex-col items-center gap-[1.25rem] text-center overflow-clip"
        style={{
          paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
          paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
          paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
          paddingBottom: "clamp(3rem, 5.2vw, 6.25rem)",
        }}
      >
        <h2
          className="font-black leading-tight max-w-[78.125rem]"
          style={{ fontSize: "var(--text-h2)" }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(41deg, #061333 20%, #3C51E2 124%)",
              WebkitBackgroundClip: "text",
            }}
          >
            Et si vous repreniez l
          </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
            }}
          >
            e contrôle de votre portefeuille
          </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(41deg, #061333 20%, #3C51E2 124%)",
              WebkitBackgroundClip: "text",
            }}
          >
            {" "}
            de projets ?
          </span>
        </h2>

        {/* White card wrapping subtitle + CTA */}
        <div
          className="flex flex-col items-center gap-[1.25rem] bg-white"
          style={{
            borderRadius: "1.5625rem",
            padding: "clamp(1.5rem, 2.5vw, 2.5rem) clamp(2rem, 5vw, 5rem)",
            maxWidth: "53rem",
            width: "100%",
            boxShadow: "0px 4px 50px 0px rgba(0,0,0,0.07)",
          }}
        >
          <p
            className="font-light text-foreground text-center"
            style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
          >
            Adoptez dès maintenant une solution de gestion de gouvernance
            moderne, qui fait gagner vos projets en temps et en efficacité.
          </p>

          <Button variant="primary" size="md" href="/fr/bookademo">
            Réservez une démo
          </Button>
        </div>
      </div>

      {/* Floating cards */}
      <Float
        variant={3}
        duration={3.5}
        delay={0}
        className="absolute z-20 left-[2%] top-[17rem] hidden xl:block"
      >
        <FloatingCard />
      </Float>
      <Float
        variant={1}
        duration={4}
        delay={1.5}
        className="absolute z-20 right-[2%] top-[6rem] hidden xl:block"
      >
        <FloatingCard />
      </Float>
    </section>
  );
}

/* ─── Inline Section: Marketplace + Slider ─── */

function MarketplaceSliderSection() {
  return (
    <section
      className="flex flex-col items-center w-full"
      style={{
        gap: "3.125rem",
        paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
      }}
    >
      {/* Heading */}
      <div className="flex flex-col items-center gap-[1.25rem] text-center w-full">
        <h2
          className="font-black leading-tight"
          style={{ fontSize: "var(--text-h2)" }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
            }}
          >
            Grâce à sa marketplace AirSaas
          </span>
          <span className="text-foreground">
            {" "}
            s&apos;intègre nativement à vos outils du quotidien
          </span>
        </h2>

        <p
          className="font-light text-foreground text-center max-w-[91rem]"
          style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.56" }}
        >
          Centralisez toutes vos informations cruciales (tickets, jalons…)
          depuis vos outils de gestion de tâches sur AirSaas, et diffusez-les
          via vos canaux de communication interne. Tout le monde est au
          diapason, et vous gouvernez de manière optimale.
        </p>
      </div>

      {/* Slider */}
      <Slider slides={sliderSlides} />
    </section>
  );
}

/* ─── Inline Section: Comparison (dual column) ─── */

function ComparisonDualSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <GradientBackground
        variant="comparison"
        className="absolute inset-0 w-full"
      />
      <div
        className="relative z-10 flex flex-col items-center gap-[3.125rem] overflow-clip"
        style={{
          paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
          paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
          paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
          paddingBottom: "clamp(3rem, 5.2vw, 6.25rem)",
        }}
      >
        {/* Title */}
        <h2
          className="font-bold leading-tight text-center max-w-[78.125rem]"
          style={{ fontSize: "var(--text-h2)" }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(41deg, #061333 20%, #3C51E2 124%)",
              WebkitBackgroundClip: "text",
            }}
          >
            Nos clients ne peuvent plus imaginer leurs vies sans{" "}
          </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
            }}
          >
            AirSaas
          </span>
        </h2>

        {/* Dual column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[0.875rem] gap-y-[0.9375rem] w-full">
          {/* Column headers */}
          <div
            className="flex items-center gap-[0.5rem] px-[1.875rem] py-[0.125rem] rounded-[1.5625rem] self-start w-fit"
            style={{ backgroundColor: "#FFF6D8", color: "#8A6D00" }}
          >
            <span className="font-normal" style={{ fontSize: "1.6875rem" }}>
              Sans AirSaas
            </span>
          </div>
          <div
            className="flex items-center gap-[0.5rem] px-[1.875rem] py-[0.125rem] rounded-[1.5625rem] self-start w-fit"
            style={{
              backgroundColor: "var(--color-primary-5, #F3F3FC)",
              color: "var(--color-primary, #3C51E2)",
            }}
          >
            <span className="font-normal" style={{ fontSize: "1.6875rem" }}>
              Avec AirSaas
            </span>
          </div>

          {/* Items */}
          {comparisonItemsSans.map((item, i) => (
            <div
              key={`sans-${i}`}
              className="flex gap-[1.4375rem] items-start bg-white rounded-[1.5625rem]"
              style={{
                border: "1px solid #FCD977",
                padding: "1.6875rem 1.375rem 1.6875rem 1.8125rem",
                minHeight: "9.1875rem",
              }}
            >
              <span
                className="font-bold shrink-0 bg-clip-text text-transparent"
                style={{
                  fontSize: "4.8125rem",
                  lineHeight: "normal",
                  backgroundImage:
                    "linear-gradient(to right, #FFBE80, #FF922B 28%)",
                  WebkitBackgroundClip: "text",
                }}
              >
                {item.value}
              </span>
              <p
                className="font-light text-foreground flex-1"
                style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
              >
                {item.description}
              </p>
            </div>
          ))}

          {comparisonItemsAvec.map((item, i) => (
            <div
              key={`avec-${i}`}
              className="flex gap-[1.4375rem] items-start bg-white rounded-[1.5625rem]"
              style={{
                border: "1px solid #FCD977",
                padding: "1.6875rem 1.375rem 1.6875rem 1.8125rem",
                minHeight: "9.1875rem",
                gridColumn: 2,
                gridRow: i + 2,
              }}
            >
              <span
                className="font-bold shrink-0 bg-clip-text text-transparent"
                style={{
                  fontSize: "4.8125rem",
                  lineHeight: "normal",
                  backgroundImage: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                }}
              >
                {item.value}
              </span>
              <p
                className="font-light text-foreground flex-1"
                style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <Button variant="primary" size="md" href="#">
          Réservez une démo
        </Button>
      </div>
    </section>
  );
}

/* ─── Inline Section: Testimonials "Ils parlent de nous" ─── */

function TestimonialsFullSection() {
  return (
    <section
      className="flex flex-col items-center w-full"
      style={{
        backgroundColor: "var(--color-primary-2, #F8F9FF)",
        gap: "3.125rem",
        paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
        paddingBottom: "clamp(3rem, 5.2vw, 6.25rem)",
      }}
    >
      {/* Title */}
      <h2
        className="font-black leading-tight text-center"
        style={{ fontSize: "var(--text-h2)" }}
      >
        <span className="text-foreground">Ils parlent de </span>
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "var(--gradient-primary)",
            WebkitBackgroundClip: "text",
          }}
        >
          nous
        </span>
      </h2>

      {/* Row 1: TestimonialCompanyCards */}
      <div className="grid grid-cols-1 gap-[1.5625rem] items-stretch w-full md:grid-cols-2 lg:grid-cols-3">
        {companyTestimonials.map((t, i) => (
          <TestimonialCompanyCard
            key={i}
            quote={t.quote}
            logoSrc={t.logoSrc}
            logoAlt={t.logoAlt}
            className="flex-1 !w-auto"
          />
        ))}
      </div>

      {/* Row 2: TestimonialCards */}
      <div className="grid grid-cols-1 gap-[1.5625rem] items-stretch w-full md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <TestimonialCard
            key={i}
            quote={t.quote}
            name={t.name}
            role={t.role}
            linkedinHref={t.linkedinHref}
            className="flex-1"
          />
        ))}
      </div>
    </section>
  );
}

/* ─── Main Composition ─── */

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero */}
      <Hero
        navItems={navItems}
        navCtaLabel="Demander une démo"
        navCtaHref="/fr/bookademo"
        loginLabel="Login"
        loginHref="https://app.airsaas.io/fr/login"
        headline="La solution de"
        headlineGradient="portfolio"
        headlineSuffix="pour aligner le top management"
        subtitle="Stop au gaspillage, à trop de projets en parallèle, trop de projets en retard, des équipes sous l'eau, un top management en tension. Votre croissance est liée à la réussite de vos projets."
        primaryCta={{ label: "Réservez une démo", href: "/fr/bookademo" }}
        illustrationSrc="/assets/screenshots/hero-dashboard.png"
        illustrationAlt="AirSaas - Quarter Plan Dashboard Q1 2025"
      />

      {/* 2. Value Proposition — "Les chiffres qui vous feront adopter AirSaas" */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="light"
          titleHighlight="Les chiffres"
          title="qui vous feront adopter AirSaas"
          subtitle=""
          columns={3}
        >
          <FeatureCard
            icon={
              <Icon>
                <SuitcaseIcon />
              </Icon>
            }
            title="80%"
            description="C'est la réduction moyenne du nombre de réunions projets constatée après 4 mois d'utilisation d'AirSaas. Pourquoi faire un meeting quand l'information est claire, centralisée et accessible à tous ?"
            className="flex-1"
          />
          <FeatureCard
            icon={
              <Icon>
                <StopwatchIcon />
              </Icon>
            }
            title="100%"
            description="C'est le taux de réduction du nombre de projets lancés sans capacité à faire ou sans objectif clair."
            className="flex-1"
          />
          <FeatureCard
            icon={
              <Icon>
                <CalendarDayIcon />
              </Icon>
            }
            title="30K€"
            description="C'est le montant annuel moyen que vous dépensez en temps-homme pour faire du PowerPoint projet (si vous avez plus de 20 projets)."
            className="flex-1"
          />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* 4. Section Heading — "Une plateforme de gouvernance projet" */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <SectionHeading
          titleGradient="Une plateforme de gouvernance projet"
          titleDark="à la hauteur de vos ambitions"
          subtitle="Notre mission ? Vous permettre de devenir le pivot de la transformation de l'entreprise en structurant la gouvernance de tous les projets, grâce à une plateforme simple que le top management va adorer."
        />
      </AnimateOnScroll>

      {/* 5. Feature Frame right — Roadmaps */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Partagez"
          title="simplement les roadmaps à toute l'organisation"
          description="Une roadmap, ça bouge, ça vit, c'est un élément clé pour aligner le top management en continu. Avec AirSaas, plus besoin de faire des PowerPoints à rallonge : l'information est centralisée, partageable et sympa à visualiser (parce que quand c'est beau, c'est quand même plus impactant)."
          imageSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/65ce3c00c0a4886fc8e9f671_Portfolio%20project%20timeline%20view.webp"
        />
      </AnimateOnScroll>

      {/* 6. Feature Section Stacked — Capacity planning */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureSectionStacked
          variant="primary2"
          titleDarkPrefix="Un"
          titleGradient="capacity planning par équipe"
          titleDark="simple et actionnable"
          subtitle="Visualisez en un clin d'oeil si vous êtes dans les clous... ou dans les choux. Grâce à cette vue vous avez les bases d'une discussion pragmatique pour prendre les décisions :"
          listItems={[
            "Peut-on faire plus de projets ? Faut-il en enlever ?",
            "Quels sont les jalons qui nous plombent ? Peut-on les découper ?",
            "Doit-on recruter ou mettre l'équipe en tension ? Pendant combien de temps ?",
          ]}
          imageSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/66334ee7bcfcb0aa45802537_Capacity%20screen.webp"
          imageAlt="Vue capacity planning par équipe"
        />
      </AnimateOnScroll>

      {/* 7. Feature Frame right — Priorisation */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Chaque directeur définit"
          title="ses prios"
          description="Demandez aux directeurs de prioriser parmi les projets dont son équipe est à l'origine. Deux projets ne peuvent pas avoir la même priorité. Une fois prêts, ils valident leur choix. C'est simple, transparent et puissant."
          imageSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/663d07a346b12e77e37ddd72_Prioritization%20per%20team%20ppt%20d%26d.webp"
        />
      </AnimateOnScroll>

      {/* 8. Feature Frame left — Cadrage projet */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          titleHighlight="Diffusez"
          title="un cadrage projet standardisé"
          description="Remplissez les fiches cadrage de projet de manière collaborative, et guidez vos collaborateurs vers un véritable niveau d'excellence en gestion de projet. À vous une culture projet homogénéisée !"
          imageSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/65d35d6a6c51a9712103f44c_Presentation-scope-slide.webp"
        />
      </AnimateOnScroll>

      {/* 9. Newsletter Section */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <NewsletterSection />
      </AnimateOnScroll>

      {/* 10. Feature Frame left — Reporting projet */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          titleHighlight="Votre reporting projet"
          title="en un clic"
          description="Générez votre reporting flash en un seul clic, et homogénéisez vos présentations, pour faciliter la prise de décision. Autant de temps gagné pour vous focaliser sur le coaching de vos chefs de projet et votre gouvernance."
          imageSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/65d35ce9e34fd87ad7612c9d_Flash%20report%20ppt.webp"
        />
      </AnimateOnScroll>

      {/* 11. Feature Frame right — Décisions */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Fluidifiez"
          title="votre prise de décisions importantes et urgentes"
          description="Centralisez vos décisions sous forme de Kanban, et partagez-les aisément avec toutes les parties prenantes de vos projets. Finies les informations perdues dans vos mails ou flux de discussions instantanées !"
          imageSrc="https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/65d35c96ec9fbf11d78e4b44_Portfolio%20decisions%20(show%20projects%20title).webp"
        />
      </AnimateOnScroll>

      {/* 12. CTA Gradient — "Et si vous repreniez le contrôle..." */}
      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaGradientSection />
      </AnimateOnScroll>

      {/* 13. Marketplace + Slider */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <MarketplaceSliderSection />
      </AnimateOnScroll>

      {/* 14. Comparison Dual — "Nos clients ne peuvent plus imaginer..." */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ComparisonDualSection />
      </AnimateOnScroll>

      {/* 15. Testimonials — "Ils parlent de nous" */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <TestimonialsFullSection />
      </AnimateOnScroll>

      {/* 16. Footer */}
      <AnimateOnScroll animation="fade-up" duration={600}>
        <Footer columns={footerColumns} />
      </AnimateOnScroll>
    </div>
  );
}
