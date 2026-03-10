import { HeroAnimated } from "@/components/sections/HeroAnimated";
import { QuoteCards } from "@/components/sections/QuoteCards";
import { TestimonialCards } from "@/components/sections/TestimonialCards";
import { Stats } from "@/components/sections/Stats";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { FeatureNewsletter } from "@/components/sections/FeatureNewsletter";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ComparisonGrid } from "@/components/sections/ComparisonGrid";
import { CustomerStories } from "@/components/sections/CustomerStories";

const PRESS_ITEMS = [
  {
    quote: "Hub de pilotage [...] donnant le bon niveau de visibilité aux métiers, aux Codir et Comex",
    logo: "/assets/images/logo-alliancy-monotone.png",
    logoAlt: "Alliancy",
    href: "https://www.alliancy.fr/comexposium-dsi-dialogue-metiers-evenementiel",
  },
  {
    quote: "AirSaas vise à rendre réel l'alignement entre les directions métiers, la DSI et la direction générale",
    logo: "/assets/images/JDN-monotone.png",
    logoAlt: "JDN Journal du NET",
    href: "https://www.journaldunet.com/solutions/dsi/1514525-airsaas-la-solution-pour-piloter-les-plans-de-transformation-des-entreprises/",
  },
  {
    quote: "Une nouvelle manière d'embarquer les équipes",
    logo: "/assets/images/LePoint-monotone.png",
    logoAlt: "Le Point",
    href: "https://www.lepoint.fr/services/gouvernance-projet-comment-airsaas-aide-les-entreprises-a-reussir-leurs-programmes-de-transformation-05-12-2022-2500422_4345.php",
  },
  {
    quote: "la DSI a choisi de mettre en place deux solutions complémentaires : AirSaas pour le pilotage stratégique et Asana pour la gestion opérationnelle des projets",
    logo: "/assets/images/LMI.png",
    logoAlt: "lemondeinformatique.fr",
    href: "https://www.lemondeinformatique.fr/actualites/lire-aurore-butrot-dsi-d-intuis-revient-sur-le-pilotage-des-projets-it-89605.html",
  },
];

const TESTIMONIALS = [
  {
    name: "Thomas Sagnimorte",
    role: "DSI chez Millet Mountain Group",
    initials: "TS",
    text: "Super outil qui nous permet de fluidifier le pilotage de notre portefeuille projet. Je recommande!",
    href: "https://www.linkedin.com/posts/thomas-sagnimorte-593b2b1_cest-tellement-agr%C3%A9able-de-co-construire-activity-7084118266675101697-6OuH/",
  },
  {
    name: "Marie-Odile Lhomme",
    role: "Chief Digital & Information Officer",
    initials: "ML",
    text: "Un beau projet et une vraie dynamique d'équipe transverse DSI et Métiers au service du management du portefeuille de projets Audencia. Heureuse de constater au jour le jour la progression... et les premiers résultats! On continue!",
    href: "https://www.linkedin.com/posts/molhomme_mon-top-workshop-de-la-semaine-%C3%A9tait-avec-activity-7080456869751713792-NQT9/",
  },
  {
    name: "Clement Royer",
    role: "DSI - ICT MANAGER chez Chiesi France",
    initials: "CR",
    text: "Avec l'outil AirSaas nous avons pu ritualiser nos réunions de revu projet en supprimant les PowerPoints et les réunions peu efficaces. Cela nous permet d'avoir toute la DSI alignée et informée sur l'ensemble des projets au quotidien. Un outil vraiment TOP !",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7122982646506278912/",
  },
];

const HOMEPAGE_STATS = [
  {
    value: "80%",
    description: "C'est la réduction moyenne du nombre de réunions projets constatée après 4 mois d'utilisation d'AirSaas. Pourquoi faire un meeting quand l'information est claire, centralisée et accessible à tous ?",
  },
  {
    value: "100%",
    description: "C'est le taux de réduction du nombre de projets lancés sans capacité à faire ou sans objectif clair.",
  },
  {
    value: "30K\u20AC",
    description: "C'est le montant annuel moyen que vous dépensez en temps-homme pour faire du PowerPoint projet (si vous avez plus de 20 projets).",
  },
];

const COMPARISON_ROWS = [
  { left: "Des projets cadrés sur PowerPoint ou Excel, sans collaboration et sans homogénéité", right: "Un cadrage projet collaboratif et uniformisé, guidé par des bonnes pratiques en la matière" },
  { left: "Un reporting projet / CoPil à la main, qui vous prend un temps significatif", right: "Un reporting décisionnel généré automatiquement aux couleurs de votre entreprise" },
  { left: "Trop de micro-information dispersée entre vos différents outils de gestion de tâches et de ticketing", right: "Un focus sur les décisions et les points d'attentions de vos projets, grâce à une gouvernance structurée" },
  { left: "Une difficulté pour les chefs de projet à comprendre les décisions prises et à prendre", right: "Une véritable transparence de vos projets pour toutes les parties prenantes de votre entreprise" },
  { left: "Un pilotage à la tâche complexe", right: "Un pilotage agile par les jalons de vos projets" },
  { left: "Une culture projet hétérogène, voire inexistante", right: "Une culture projet standardisée, qui pousse tous les collaborateurs vers l'excellence" },
  { left: "Du micro-management pour gérer vos différents collaborateurs", right: "Une responsabilisation de chacun, grâce à une vision simplifiée et collaborative de l'avancement des projets" },
];

const CUSTOMER_STORIES = [
  { name: "Laurent Citton", role: "Directeur des Systèmes d'Information Groupe chez Picoty", company: "Groupe Picoty", sector: "Énergie et combustibles", employees: "1300", initials: "LC", href: "/fr/testimonials/cas-client-picoty-gamac-quarter-plan-roadmap-dsi" },
  { name: "Émilie Lecart", role: "CIO Office", sector: "Hôtellerie & loisirs", employees: "40000", initials: "EL", href: "/fr/testimonials/donner-du-rythme-a-la-roadmap-projet-grace-au-quarter-plan" },
  { name: "Sébastien Louyot", role: "Group CIO", company: "Altavia", sector: "Communication et marketing", employees: "2800", initials: "SL", href: "/fr/testimonials/aligner-capacite-a-faire-et-demandes-entrantes-grace-a-quarter-plan" },
  { name: "David Langlade", role: "Conseil / DSI de transition CTO/ - CIO", company: "Dynamical", sector: "Conseil", employees: "2", initials: "DL", href: "/fr/testimonials/ameliorer-son-suivi-de-mission-en-tant-quindependant" },
  { name: "Clément Royer", role: "DSI - ICT MANAGER chez Chiesi France", company: "Chiesi France", sector: "Santé-Pharma", employees: "6500", initials: "CR", href: "/fr/testimonials/rationaliser-les-rituels-autour-du-portfolio-projet" },
  { name: "Aurore Butrot", role: "DSI Intuis (Ex Groupe Muller)", company: "Groupe Intuis (Ex Muller)", sector: "Industrie", employees: "1000", initials: "AB", href: "/fr/testimonials/copiloter-la-strategie-et-les-operations-grace-a-airsaas-asana-groupe-intuis" },
  { name: "Stephan Boisson", role: "Group Chief Digital & Information Officer Comexposium", company: "Comexposium", sector: "Événementiel", employees: "900", initials: "SB", href: "/fr/testimonials/transformer-la-relation-entre-lit-et-les-metiers-et-se-focaliser-sur-la-valeur-les-infos-pertinentes-et-decisions-a-prendre-avec-airsaas-comexposium" },
  { name: "Sylvain Bourdette", role: "DSI/CTO/Pro de la transfo", company: "Indexia Groupe", sector: "Assurance et Distribution", employees: "3000", initials: "SB", href: "/fr/testimonials/renforcer-les-liens-de-confiance-avec-les-directions-metiers-grace-a-airsaas-indexia-group" },
  { name: "Vincent Potel", role: "Directeur Général de transition", company: "Caduciel", sector: "Santé - Editeur de logiciel", employees: "50", initials: "VP", href: "/fr/testimonials/management-transition-caduciel" },
];

export default function HomePage() {
  return (
    <>
      <HeroAnimated />
      <QuoteCards heading={<>Ils parlent de <strong className="font-extrabold">nous</strong></>} items={PRESS_ITEMS} />
      <TestimonialCards testimonials={TESTIMONIALS} />
      <Stats heading={<><strong className="font-extrabold">Les chiffres</strong> qui vous feront adopter AirSaas</>} stats={HOMEPAGE_STATS} />
      <SectionHeading
        heading={<><strong className="font-extrabold text-primary">Une plateforme de gouvernance projet</strong> à la hauteur de vos ambitions</>}
        description="Notre mission ? Vous permettre de devenir le pivot de la transformation de l'entreprise en structurant la gouvernance de tous les projets, grâce à une plateforme simple que le top management va adorer. La vôtre ? Faire passer votre entreprise à l'étape supérieure en gouvernance de projet !"
      />
      <FeatureRow heading={<><em className="not-italic">Partagez</em> simplement les roadmaps <strong className="font-bold">à toute l&apos;organisation</strong></>} description="Une roadmap, ça bouge, ça vit, c'est un élément clé pour aligner le top management en continu. Avec AirSaas, plus besoin de faire des PowerPoints à rallonge : l'information est centralisée, partageable et sympa à visualiser (parce que quand c'est beau, c'est quand même plus impactant)." image="/assets/images/Portfolio project timeline view.webp" imageAlt="Portfolio timeline" />
      <FeatureRow heading={<>Un <strong className="font-bold">capacity planning par équipe</strong> simple et actionnable</>} description={<><p>Visualisez en un clin d&apos;oeil si vous êtes dans les clous... ou dans les choux. Grâce à cette vue vous avez les bases d&apos;une discussion pragmatique pour prendre les décisions :</p><blockquote className="mt-3 border-l-2 border-primary pl-4 text-primary-70">Peut-on faire plus de projets ? Faut-il en enlever ?</blockquote><blockquote className="mt-2 border-l-2 border-primary pl-4 text-primary-70">Quels sont les jalons qui nous plombent ? Peut-on les découper ?</blockquote><blockquote className="mt-2 border-l-2 border-primary pl-4 text-primary-70">Doit-on recruter ou mettre l&apos;équipe en tension ? Pendant combien de temps ?</blockquote></>} image="/assets/images/Capacity screen.webp" imageAlt="Capacity Marketing" variant="card" />
      <FeatureRow heading={<><em className="not-italic">C</em>haque directeur définit <strong className="font-bold">ses prios</strong></>} description="Demandez aux directeurs de prioriser parmi les projets dont son équipe est à l'origine. Deux projets ne peuvent pas avoir la même priorité. Une fois prêts, ils valident leur choix. C'est simple, transparent et puissant." image="/assets/images/Portfolio project priority.webp" imageAlt="Priorisation options" />
      <FeatureRow heading={<><em className="not-italic">Diffusez</em> un cadrage projet <strong className="font-bold">standardisé</strong></>} description="Remplissez les fiches cadrage de projet de manière collaborative, et guidez vos collaborateurs vers un véritable niveau d'excellence en gestion de projet. A vous une culture projet homogénéisée !" image="/assets/images/Presentation cadrage screen.webp" imageAlt="Presentation scope" reversed />
      <FeatureNewsletter />
      <FeatureRow heading={<><em className="not-italic">Votre reporting projet</em> <strong className="font-bold">en un clic</strong></>} description={<p>Générez votre <strong className="font-semibold">reporting flash en un seul clic</strong>, et homogénéisez vos présentations, pour faciliter la prise de décision. Autant de temps gagné pour vous focaliser sur le coaching de vos chefs de projet et votre gouvernance.</p>} image="/assets/images/Flash report ppt.webp" imageAlt="Flash report ppt" />
      <FeatureRow heading={<><em className="not-italic">Fluidifiez</em> votre prise de décisions <strong className="font-bold">importantes et urgentes</strong></>} description={<p><strong className="font-semibold">Centralisez vos décisions</strong> sous forme de Kanban, et partagez-les aisément avec toutes les parties prenantes de vos projets. Finies les informations perdues dans vos mails ou flux de discussions instantanées !</p>} image="/assets/images/Portfolio decisions-min.png" imageAlt="Portfolio decisions" reversed />
      <CtaBanner heading={<>Et si vous repreniez <strong className="text-primary">le contrôle de votre portefeuille</strong> de projets ?</>} description="Adoptez dès maintenant une solution de gestion de gouvernance moderne, qui fait gagner vos projets en temps et en efficacité." />
      <FeatureRow heading={<><strong className="font-extrabold">Grâce à sa marketplace AirSaas</strong> s&apos;intègre nativement à vos outils du quotidien</>} description="Centralisez toutes vos informations cruciales (tickets, jalons…) depuis vos outils de gestion de tâches sur AirSaas, et diffusez-les via vos canaux de communication interne. Tout le monde est au diapason, et vous gouvernez de manière optimale." image="/assets/images/Automation - integrations.webp" imageAlt="Automation - integrations" />
      <ComparisonGrid heading={<>Nos clients ne peuvent plus imaginer leurs vies sans <strong className="font-extrabold text-primary">AirSaas</strong></>} leftLabel="Sans AirSaas" rightLabel="Avec AirSaas" rows={COMPARISON_ROWS} />
      <CustomerStories heading={<>Laissez <strong className="font-extrabold">nos clients</strong> vous parler d&apos;AirSaas</>} description="Qui de mieux pour vous parler de la plateforme que ceux qui l'utilisent au quotidien pour améliorer la gestion de leurs projets de transformation ?" stories={CUSTOMER_STORIES} moreLink={{ text: "Consultez les témoignages de nos clients", href: "/fr/temoignages" }} />
    </>
  );
}
