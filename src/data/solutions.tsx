/**
 * Solution pages data — hardcoded for Step 2.
 * Will be replaced by Strapi Collection Type `page` at Step 5.
 */

export type SolutionFeature = {
  heading: React.ReactNode;
  description: React.ReactNode;
  image: string;
  imageAlt: string;
  reversed?: boolean;
  variant?: "default" | "card";
};

export type SolutionSection = {
  type: "heading" | "feature" | "cta";
  heading?: React.ReactNode;
  description?: React.ReactNode;
  // For feature type
  image?: string;
  imageAlt?: string;
  reversed?: boolean;
  variant?: "default" | "card";
  // For CTA type
  buttonText?: string;
};

export type SolutionPageData = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge?: string;
    heading: React.ReactNode;
    description: string;
    image: string;
    imageAlt: string;
  };
  intro: {
    heading: React.ReactNode;
    description: React.ReactNode;
  };
  sections: SolutionSection[];
  hasPress: boolean;
};

export const SOLUTION_PAGES: SolutionPageData[] = [
  // ─── 1. Management de portefeuille projet ───
  {
    slug: "management-de-portefeuille-projet",
    meta: {
      title: "Management de portefeuille projet : l'outil des DSI et PMO",
      description:
        "AirSaas a été conçu pour vous aider à transformer votre entreprise de manière efficace, en vous faisant gagner en temps et en visibilité sur votre portfolio.",
    },
    hero: {
      heading: (
        <>
          L&apos;outil de management de{" "}
          <strong className="font-extrabold">portefeuille projet</strong> qui
          révolutionne votre gouvernance
        </>
      ),
      description:
        "AirSaas a été conçu pour vous aider à transformer votre entreprise de manière efficace, en vous faisant gagner en temps et en visibilité sur votre portfolio. Révolutionnez votre management de portefeuille de projet en gardant une vision précise de vos priorités, des décisions à prendre, et en communiquant mieux au quotidien.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Management de portefeuille projet",
    },
    intro: {
      heading: (
        <>
          La solution de portfolio project management favorite des{" "}
          <strong className="font-extrabold">PMO et DSI</strong>
        </>
      ),
      description:
        "C'est parce que les outils traditionnels de gestion de portefeuille projet n'étaient pas adaptés aux besoins des professionnels de la transformation d'entreprise que nous avons conçu AirSaas. Fluide et simplissime, AirSaas accompagne désormais les Pro. de la Transfo. qui veulent accélérer leur prise de décision et mener leurs projets plus loin, plus vite.",
    },
    sections: [
      {
        type: "heading",
        heading: (
          <>
            <strong className="font-extrabold">Visualisez votre portfolio</strong>{" "}
            en vue macro
          </>
        ),
        description:
          "Perdu dans les outils de gestion de projet traditionnels, qui vous empêchent de sortir du suivi micro des tâches de chaque projet ? Avec AirSaas, profitez d'une vue exhaustive multi-projets de tout ce qui compte pour assurer la gouvernance de votre portefeuille.",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em>e{" "}
            <strong className="font-bold">planification stratégique simplifiée</strong>{" "}
            grâce à votre vue macro
          </>
        ),
        description:
          "AirSaas vous permet d'accéder à un tableau de bord de portefeuille projet simple à lire, où toutes vos informations-clés sont rassemblées, consolidées, et à jour en temps réel. Prenez de la hauteur sur votre portfolio de projets avec votre vue macro, et prenez des décisions plus rapides, alignées avec les véritables priorités stratégiques de votre entreprise.",
        image: "/assets/images/Portfolio project timeline view.webp",
        imageAlt: "planification stratégique",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">De</em>s{" "}
            <strong className="font-bold">intégrations natives</strong> pour
            limiter le report de données manuel
          </>
        ),
        description:
          "Profitez de la marketplace d'intégrations natives d'AirSaas, qui synchronise votre plateforme PPM à vos outils préférés : gestion de tâches (Jira, ClickUp, Asana, Monday), communication interne (Microsoft Teams) et logiciel de service client (Zendesk). Vos tableaux de bord se mettent à jour automatiquement et en temps réel avec les données qui comptent.",
        image: "/assets/images/Automation - integrations.webp",
        imageAlt: "intégrations natives",
        reversed: true,
      },
      {
        type: "heading",
        heading: (
          <>
            <strong className="font-extrabold">Concevez des vues personnalisées</strong>{" "}
            de votre tableau de bord
          </>
        ),
        description:
          "Le management de projets demande parfois de pouvoir se focaliser sur les projets à risques ou qui viennent tout juste d'être lancés. Profitez des filtres personnalisables d'AirSaas, qui vous aide à visualiser votre portefeuille en fonction de la météo, des risques ou de l'avancement de vos projets.",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">La</em> vue{" "}
            <strong className="font-bold">liste</strong>
          </>
        ),
        description:
          "Besoin de suivre l'avancée de vos projets, et de leurs indicateurs-clés ? Rendez-vous sur la vue liste, et passez en revue les différents projets de votre portefeuille aisément.",
        image: "/assets/images/Portfolio project list view.webp",
        imageAlt: "List",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">La</em> vue{" "}
            <strong className="font-bold">Kanban</strong>
          </>
        ),
        description:
          "Pour observer les tendances générales de votre portfolio, choisissez la vue Kanban, et analysez les états d'avancement de vos projets. Rien de tel pour optimiser votre stratégie de pilotage !",
        image: "/assets/images/Portfolio projects kanban-min.png",
        imageAlt: "Kanban",
        reversed: true,
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">La</em> vue{" "}
            <strong className="font-bold">timeline</strong>
          </>
        ),
        description:
          "Cette vue sous forme de diagramme de Gantt est idéale pour optimiser votre gestion des ressources, anticiper les retards, et repérer en amont les dépendances inter-projets. Vous organisez vos projets sur le temps long, pour ne plus rien laisser au hasard.",
        image: "/assets/images/1 Projects timeline-min.png",
        imageAlt: "Timeline",
      },
      {
        type: "cta",
        heading: (
          <>
            <strong className="font-extrabold">Boostez</strong> votre management
            de portefeuille projet et votre prise de décision
          </>
        ),
        description:
          "Optez pour un outil PPM moderne et simple, où le collaboratif mène vos portefeuilles de projets plus loin, plus rapidement.",
      },
      {
        type: "heading",
        heading: (
          <>
            <strong className="font-extrabold">Automatisez</strong> votre flash
            report
          </>
        ),
        description:
          "Le Copil approche, et vous perdez un temps fou à récolter les données dont vous avez besoin auprès des chefs de projets, des métiers, et des différentes parties prenantes de vos projets ? Économisez ce temps grâce à la fonctionnalité de reporting automatisée d'AirSaas : elle vous fait gagner une journée de travail par semaine en moyenne.",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Vo</em>tre{" "}
            <strong className="font-bold">reporting</strong>, véritable outil
            d&apos;aide à la décision
          </>
        ),
        description:
          "Avec le flash report automatisé d'AirSaas, vous permettez à chacun de visualiser aisément les décisions qui doivent être prises à l'instant T. Décisionnaires, chefs d'équipe et de projets, sponsors : tout le monde est aligné, pour fluidifier la prise de décision.",
        image: "/assets/images/Flash report ppt.webp",
        imageAlt: "la prise de décision",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em>e{" "}
            <strong className="font-bold">structure personnalisable</strong> et
            ultra-lisible
          </>
        ),
        description:
          "En un clic sur AirSaas, créez votre flash report au format .pdf ou .ppt, et personnalisez-en le design selon la charte de votre entreprise. Vous pouvez également y ajouter des métriques-clés supplémentaires, des précisions sur vos plannings, ou encore un récapitulatif exhaustif des décisions à prendre.",
        image: "/assets/images/Flash report-min.png",
        imageAlt: "Reporting projet",
        reversed: true,
      },
      {
        type: "heading",
        heading: (
          <>
            <strong className="font-extrabold">Collaborez</strong> pour mieux
            transformer votre entreprise
          </>
        ),
        description:
          "La gestion de votre portefeuille de projets nécessite une véritable collaboration entre vous, les métiers et les chefs de projet pour être optimale. Sur AirSaas, toutes les parties prenantes apportent leur pierre à l'édifice, depuis le cadrage des projets jusqu'à leur mise en œuvre quotidienne.",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">De</em>s fiches de cadrage{" "}
            <strong className="font-bold">co-créées</strong>
          </>
        ),
        description:
          "Impliquez chaque chef de projet dans le cadrage de vos projets, depuis la structure fixe AirSaas qui vous permet de définir un standard à votre culture projet. Cette méthodologie forte vous permet de faire démarrer chaque projet sur le bon pied.",
        image: "/assets/images/Copil - cadrage-min.png",
        imageAlt: "cadrage",
        reversed: true,
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em>e{" "}
            <strong className="font-bold">communication fluide</strong> avec tous
            les acteurs de votre transformation
          </>
        ),
        description:
          "Sur AirSaas, notifiez automatiquement vos équipes opérationnelles quand un projet est à risque, et envoyez des bilans aisément. Tout est paramétrable à échéances fixes, selon les rituels que vous avez créé dans votre management de portefeuille de projet.",
        image: "/assets/images/Block - people involved screen.webp",
        imageAlt: "Communiquez",
      },
      {
        type: "cta",
        heading: (
          <>
            Choisissez de{" "}
            <strong className="font-extrabold">gagner du temps</strong> et du
            contrôle
          </>
        ),
        description:
          "Adoptez dès maintenant une solution de management de portefeuille projet efficace, à l'expérience utilisateur vraiment fluide.",
      },
    ],
    hasPress: true,
  },

  // ─── 2. Flash report projet ───
  {
    slug: "flash-report-projet",
    meta: {
      title:
        "l'outil de flash report projet automatisé favori des PMO et DSI",
      description:
        "Grâce à AirSaas, automatisez vos flash reports projets, et rendez votre prise de décision plus fluide, plus rapide.",
    },
    hero: {
      heading: (
        <>
          L&apos;outil de <strong className="font-extrabold">flash report</strong>{" "}
          projet qui vous fait gagner en temps et en efficacité
        </>
      ),
      description:
        "Grâce à AirSaas, automatisez vos flash reports projets, et rendez votre prise de décision plus fluide, plus rapide, tout en alignant les parties prenantes de la transformation de votre entreprise.",
      image: "/assets/images/Flash report ppt.webp",
      imageAlt: "Flash report projet",
    },
    intro: {
      heading: (
        <>
          L&apos;outil de flash report projet favori des{" "}
          <strong className="font-extrabold">DSI et PMO</strong>
        </>
      ),
      description:
        "Pour faire vos reportings projets, vous allez probablement chercher les informations à droite et à gauche auprès de vos chefs de projet et métiers. Un process qui génère une véritable perte de temps. C'est à partir de ce constat que nous avons conçu AirSaas, la solution de flash report projet simplissime, orientée expérience utilisateur.",
    },
    sections: [
      {
        type: "heading",
        heading: (
          <>
            Consolidez toutes vos données en{" "}
            <strong className="font-extrabold">un seul clic</strong>
          </>
        ),
        description:
          "Dites adieu aux heures passées sur PowerPoint ! Depuis la plateforme AirSaas, toutes vos données sont consolidées, et vous générez automatiquement un flash report projet clair comme de l'eau de source à transmettre à votre Copil.",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Vo</em>tre flash report{" "}
            <strong className="font-bold">100% automatisé</strong>
          </>
        ),
        description:
          "Sur AirSaas, vous pouvez observer toutes les données que vous souhaitez intégrer à vos reportings projets dans des tableaux de bord consolidés. Finie la recherche d'information dans votre outil de gestion de tâche ou de gestion de projet ! Toute votre data est ici, homogénéisée, et automatiquement reportée dans votre flash report projet en un simple clic, au format .ppt ou .pdf.",
        image: "/assets/images/Flash report-min.png",
        imageAlt: "Flash report",
        reversed: true,
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">De</em>s{" "}
            <strong className="font-bold">intégrations natives</strong> pour
            éviter le report de données manuel
          </>
        ),
        description:
          "Sur la marketplace AirSaas, vous trouverez des intégrations natives à tous vos outils favoris, pour synchroniser les données qui s'y trouvent automatiquement et en temps réel.",
        image: "/assets/images/Automation - integrations.webp",
        imageAlt: "intégrations natives",
      },
      {
        type: "heading",
        heading: (
          <>
            <strong className="font-extrabold">Personnalisez</strong> votre
            reporting projet
          </>
        ),
        description:
          "Customisez les livrables que vous donnez à voir à vos différentes parties prenantes, grâce à des fonctionnalités de personnalisation de votre flash report projet automatisé.",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em>e{" "}
            <strong className="font-bold">structure fixe</strong> hyper-lisible
          </>
        ),
        description:
          "La structure automatique de votre flash report est faite pour en simplifier la lecture pour les membres de votre Copil. Elle rappelle les grandes lignes de vos projets (timeline, indicateurs-clés, planning…), avant de détailler les éléments-clés à savoir sur vos projets les plus urgents.",
        image: "/assets/images/Copil -  Bilan - Jalons-min.png",
        imageAlt: "Jalons",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em>e personnalisation pour coller à
            vos <strong className="font-bold">objectifs stratégiques</strong>
          </>
        ),
        description:
          "Parce que votre reporting doit ressembler à votre organisation, personnalisez-le aux couleurs de votre entreprise, selon votre charte graphique. Besoin d'ajouter à votre flash report projet d'autres données ? Intégrez-y des métriques-clés supplémentaires sur l'avancement du projet.",
        image: "/assets/images/Flash report export modal.webp",
        imageAlt: "Flash report",
        reversed: true,
      },
      {
        type: "cta",
        heading: (
          <>
            Choisissez de{" "}
            <strong className="font-extrabold">gagner du temps</strong> et du
            contrôle
          </>
        ),
        description:
          "Adoptez dès maintenant une solution efficace de flash report projet",
      },
      {
        type: "heading",
        heading: (
          <>
            <strong className="font-extrabold">Fluidifiez</strong> la prise de
            décision en Copil
          </>
        ),
        description:
          "Grâce à AirSaas, faites de votre flash report projet un véritable outil d'aide à la décision, qui aligne toutes vos parties prenantes autour d'un même objectif stratégique : faire avancer la transformation de votre entreprise.",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Vo</em>tre reporting : l&apos;allié pour
            vous aider dans{" "}
            <strong className="font-bold">vos décisions</strong>
          </>
        ),
        description:
          "Grâce au flash report d'AirSaas, chaque chef de projet, décisionnaire et sponsor est aligné autour d'un livrable qui facilite les décisions. Parce que piloter des projets nécessite une valeur partagée par tous : la collaboration, grâce à une vision claire et unifiée du portfolio.",
        image: "/assets/images/Portfolio decisions-min.png",
        imageAlt: "la prise de décision",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em> gain de{" "}
            <strong className="font-bold">temps précieux</strong> pour votre
            gouvernance projet
          </>
        ),
        description:
          "AirSaas fait gagner en moyenne une journée par semaine aux PMO et DSI qui s'en emparent. Focalisez-vous sur la vraie valeur que vous apportez : la gouvernance de votre portefeuille projet, et le coaching des métiers, pour que les projets avancent plus vite, plus loin.",
        image: "/assets/images/Portfolio project timeline view.webp",
        imageAlt: "Programs",
        reversed: true,
      },
      {
        type: "cta",
        heading: (
          <>
            Faites passer{" "}
            <strong className="font-extrabold">
              votre gouvernance projet
            </strong>{" "}
            à la vitesse supérieure
          </>
        ),
        description:
          "Choisissez une solution PPM collaborative et moderne, qui simplifie votre flash report et accélère vos prises de décisions.",
      },
    ],
    hasPress: true,
  },

  // ─── 3. Flash report ───
  {
    slug: "flash-report",
    meta: {
      title: "Flash report automatisé pour vos projets | AirSaas",
      description:
        "Automatisez votre flash report projet et gagnez du temps sur vos reportings avec AirSaas.",
    },
    hero: {
      heading: (
        <>
          Le <strong className="font-extrabold">flash report</strong> automatisé
          pour vos projets de transformation
        </>
      ),
      description:
        "Automatisez votre flash report projet et gagnez du temps sur vos reportings. AirSaas génère vos présentations en un clic, au format .ppt ou .pdf.",
      image: "/assets/images/Flash report ppt.webp",
      imageAlt: "Flash report automatisé",
    },
    intro: {
      heading: (
        <>
          Gagnez du temps sur vos{" "}
          <strong className="font-extrabold">reportings projets</strong>
        </>
      ),
      description:
        "Le flash report automatisé d'AirSaas consolide toutes vos données projets et génère vos présentations en un clic. Finie la collecte manuelle d'informations.",
    },
    sections: [
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Vo</em>tre flash report{" "}
            <strong className="font-bold">en un clic</strong>
          </>
        ),
        description:
          "Générez votre reporting flash en un seul clic, et homogénéisez vos présentations, pour faciliter la prise de décision.",
        image: "/assets/images/Flash report export modal.webp",
        imageAlt: "Flash report en un clic",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">De</em>s données{" "}
            <strong className="font-bold">consolidées</strong> en temps réel
          </>
        ),
        description:
          "Toutes vos informations-clés sont rassemblées et à jour grâce aux intégrations natives avec vos outils de gestion de tâches.",
        image: "/assets/images/Automation - integrations.webp",
        imageAlt: "Données consolidées",
        reversed: true,
      },
      {
        type: "cta",
        heading: (
          <>
            Choisissez de{" "}
            <strong className="font-extrabold">gagner du temps</strong> et du
            contrôle
          </>
        ),
        description:
          "Adoptez dès maintenant une solution efficace de flash report projet",
      },
    ],
    hasPress: true,
  },

  // ─── 4. Revue de portefeuille ───
  {
    slug: "revue-de-portefeuille",
    meta: {
      title: "Revue de portefeuille projet | AirSaas",
      description:
        "Structurez vos revues de portefeuille projet pour aligner toutes les parties prenantes et prendre les bonnes décisions.",
    },
    hero: {
      heading: (
        <>
          Structurez vos{" "}
          <strong className="font-extrabold">revues de portefeuille</strong>{" "}
          projet efficacement
        </>
      ),
      description:
        "Alignez toutes les parties prenantes de votre transformation grâce à des revues de portefeuille projet structurées, régulières et outillées avec AirSaas.",
      image: "/assets/images/Portfolio project timeline view.webp",
      imageAlt: "Revue de portefeuille",
    },
    intro: {
      heading: (
        <>
          La revue de portefeuille,{" "}
          <strong className="font-extrabold">clé de votre gouvernance</strong>
        </>
      ),
      description:
        "La revue de portefeuille est un rituel essentiel pour piloter votre transformation d'entreprise. Elle permet de faire le point sur l'avancement des projets, de prendre les décisions stratégiques et d'aligner les équipes.",
    },
    sections: [
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em> tableau de bord{" "}
            <strong className="font-bold">consolidé</strong>
          </>
        ),
        description:
          "Visualisez l'ensemble de votre portefeuille en un coup d'œil : météos, jalons, risques, KPIs. Tout est à jour en temps réel pour des revues productives.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Tableau de bord consolidé",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">De</em>s{" "}
            <strong className="font-bold">décisions tracées</strong> et suivies
          </>
        ),
        description:
          "Centralisez vos décisions sous forme de Kanban, et partagez-les avec toutes les parties prenantes. Finies les informations perdues dans vos mails ou flux de discussions.",
        image: "/assets/images/Portfolio decisions-min.png",
        imageAlt: "Décisions tracées",
        reversed: true,
      },
      {
        type: "cta",
        heading: (
          <>
            Choisissez de{" "}
            <strong className="font-extrabold">gagner du temps</strong> et du
            contrôle
          </>
        ),
        description:
          "Adoptez dès maintenant une solution de revue de portefeuille projet efficace.",
      },
    ],
    hasPress: true,
  },

  // ─── 5. Portfolio management ───
  {
    slug: "portfolio-management",
    meta: {
      title: "Portfolio management | AirSaas",
      description:
        "Simplifiez votre portfolio management avec AirSaas, l'outil PPM moderne conçu pour les DSI et PMO.",
    },
    hero: {
      heading: (
        <>
          Le <strong className="font-extrabold">portfolio management</strong>{" "}
          simplifié pour les DSI et PMO
        </>
      ),
      description:
        "Simplifiez votre portfolio management avec AirSaas, l'outil PPM moderne qui vous fait gagner en visibilité et en efficacité sur vos projets de transformation.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Portfolio management",
    },
    intro: {
      heading: (
        <>
          L&apos;outil de{" "}
          <strong className="font-extrabold">portfolio management</strong>{" "}
          nouvelle génération
        </>
      ),
      description:
        "AirSaas offre une solution de portfolio management intuitive qui permet aux DSI et PMO de piloter leur portefeuille de projets avec une efficacité redoublée.",
    },
    sections: [
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em>e vue{" "}
            <strong className="font-bold">macro</strong> de votre portfolio
          </>
        ),
        description:
          "Accédez à un tableau de bord consolidé de tous vos projets. Visualisez les priorités, les risques et les avancées en temps réel.",
        image: "/assets/images/Portfolio project timeline view.webp",
        imageAlt: "Vue macro portfolio",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">De</em>s vues{" "}
            <strong className="font-bold">personnalisables</strong>
          </>
        ),
        description:
          "Vue liste, Kanban, timeline : choisissez la vue qui correspond à votre besoin du moment pour piloter votre portefeuille efficacement.",
        image: "/assets/images/Portfolio projects kanban-min.png",
        imageAlt: "Vues personnalisables",
        reversed: true,
      },
      {
        type: "cta",
        heading: (
          <>
            Choisissez de{" "}
            <strong className="font-extrabold">gagner du temps</strong> et du
            contrôle
          </>
        ),
        description:
          "Adoptez dès maintenant une solution de portfolio management efficace.",
      },
    ],
    hasPress: true,
  },

  // ─── 6. Tableau de bord portefeuille de projet ───
  {
    slug: "tableau-de-bord-portefeuille-de-projet",
    meta: {
      title: "Tableau de bord portefeuille de projet | AirSaas",
      description:
        "Créez des tableaux de bord portefeuille de projet clairs et personnalisables avec AirSaas.",
    },
    hero: {
      heading: (
        <>
          Votre{" "}
          <strong className="font-extrabold">
            tableau de bord portefeuille
          </strong>{" "}
          de projet, simple et puissant
        </>
      ),
      description:
        "Créez des tableaux de bord portefeuille de projet clairs et personnalisables. Visualisez vos priorités, risques et avancées en temps réel avec AirSaas.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Tableau de bord portefeuille de projet",
    },
    intro: {
      heading: (
        <>
          Un tableau de bord{" "}
          <strong className="font-extrabold">pensé pour les décideurs</strong>
        </>
      ),
      description:
        "Votre tableau de bord portefeuille de projet centralise toutes les informations nécessaires à la prise de décision. Météos, jalons, KPIs : tout est consolidé et à jour.",
    },
    sections: [
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">De</em>s{" "}
            <strong className="font-bold">filtres personnalisables</strong>
          </>
        ),
        description:
          "Focalisez-vous sur les projets à risques, les projets récemment lancés, ou ceux d'une équipe spécifique grâce aux filtres personnalisables d'AirSaas.",
        image: "/assets/images/Portfolio project filter open.webp",
        imageAlt: "Filtres personnalisables",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em> reporting{" "}
            <strong className="font-bold">automatisé</strong>
          </>
        ),
        description:
          "Générez automatiquement des flash reports depuis votre tableau de bord. Plus besoin de passer des heures sur PowerPoint.",
        image: "/assets/images/Flash report ppt.webp",
        imageAlt: "Reporting automatisé",
        reversed: true,
      },
      {
        type: "cta",
        heading: (
          <>
            Choisissez de{" "}
            <strong className="font-extrabold">gagner du temps</strong> et du
            contrôle
          </>
        ),
        description:
          "Adoptez dès maintenant un tableau de bord portefeuille de projet moderne et efficace.",
      },
    ],
    hasPress: true,
  },

  // ─── 7. Tableau de bord DSI ───
  {
    slug: "tableau-de-bord-dsi",
    meta: {
      title: "Tableau de bord DSI | AirSaas",
      description:
        "Le tableau de bord DSI qui vous donne une visibilité complète sur vos projets de transformation.",
    },
    hero: {
      heading: (
        <>
          Le <strong className="font-extrabold">tableau de bord DSI</strong> qui
          accélère votre transformation
        </>
      ),
      description:
        "Obtenez une visibilité complète sur vos projets de transformation avec un tableau de bord DSI pensé pour la prise de décision rapide et le pilotage efficace.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Tableau de bord DSI",
    },
    intro: {
      heading: (
        <>
          La visibilité dont votre{" "}
          <strong className="font-extrabold">DSI</strong> a besoin
        </>
      ),
      description:
        "En tant que DSI, vous avez besoin d'une vue consolidée de votre portefeuille de projets. AirSaas vous donne les clés pour piloter votre transformation efficacement.",
    },
    sections: [
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em>e vue{" "}
            <strong className="font-bold">consolidée</strong> de vos projets
          </>
        ),
        description:
          "Visualisez l'ensemble de vos projets IT et métiers sur un seul tableau de bord. Météos, jalons, risques, budgets : tout est là.",
        image: "/assets/images/Portfolio project list view.webp",
        imageAlt: "Vue consolidée",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">De</em>s{" "}
            <strong className="font-bold">alertes automatiques</strong>
          </>
        ),
        description:
          "Soyez notifié automatiquement quand un projet est à risque ou quand des décisions doivent être prises. Ne manquez plus rien d'important.",
        image: "/assets/images/Portfolio project reminder late.webp",
        imageAlt: "Alertes automatiques",
        reversed: true,
      },
      {
        type: "cta",
        heading: (
          <>
            Choisissez de{" "}
            <strong className="font-extrabold">gagner du temps</strong> et du
            contrôle
          </>
        ),
        description:
          "Adoptez un tableau de bord DSI moderne pour piloter votre transformation.",
      },
    ],
    hasPress: false,
  },

  // ─── 8. Tableau de bord gestion de projet ───
  {
    slug: "tableau-de-bord-gestion-de-projet",
    meta: {
      title: "Tableau de bord gestion de projet | AirSaas",
      description:
        "Un tableau de bord de gestion de projet pour visualiser, piloter et communiquer sur vos projets en temps réel.",
    },
    hero: {
      heading: (
        <>
          Votre{" "}
          <strong className="font-extrabold">
            tableau de bord gestion de projet
          </strong>{" "}
          en temps réel
        </>
      ),
      description:
        "Visualisez, pilotez et communiquez sur vos projets en temps réel avec un tableau de bord de gestion de projet pensé pour l'efficacité.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Tableau de bord gestion de projet",
    },
    intro: {
      heading: (
        <>
          Pilotez vos projets avec{" "}
          <strong className="font-extrabold">clarté</strong>
        </>
      ),
      description:
        "AirSaas offre un tableau de bord de gestion de projet qui centralise toutes les informations nécessaires au pilotage efficace de vos projets de transformation.",
    },
    sections: [
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">De</em>s{" "}
            <strong className="font-bold">indicateurs clairs</strong>
          </>
        ),
        description:
          "Météos, jalons, risques, budgets, ressources : tous les indicateurs dont vous avez besoin sont consolidés et accessibles en un coup d'œil.",
        image: "/assets/images/Des indicateurs.webp",
        imageAlt: "Indicateurs clairs",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em>e{" "}
            <strong className="font-bold">collaboration</strong> simplifiée
          </>
        ),
        description:
          "Partagez facilement les avancées de vos projets avec les métiers et la direction. Tout le monde est aligné, tout le temps.",
        image: "/assets/images/Block - people involved screen.webp",
        imageAlt: "Collaboration simplifiée",
        reversed: true,
      },
      {
        type: "cta",
        heading: (
          <>
            Choisissez de{" "}
            <strong className="font-extrabold">gagner du temps</strong> et du
            contrôle
          </>
        ),
        description:
          "Adoptez un tableau de bord de gestion de projet moderne et collaboratif.",
      },
    ],
    hasPress: false,
  },

  // ─── 9. Gestion portefeuille projet ───
  {
    slug: "gestion-portefeuille-projet",
    meta: {
      title: "Gestion de portefeuille projet | AirSaas",
      description:
        "Simplifiez votre gestion de portefeuille projet avec AirSaas, l'outil PPM conçu pour les professionnels de la transformation.",
    },
    hero: {
      heading: (
        <>
          La{" "}
          <strong className="font-extrabold">
            gestion de portefeuille projet
          </strong>{" "}
          simplifiée
        </>
      ),
      description:
        "Simplifiez votre gestion de portefeuille projet avec AirSaas. Visualisez, priorisez et pilotez vos projets de transformation efficacement.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Gestion portefeuille projet",
    },
    intro: {
      heading: (
        <>
          L&apos;outil de{" "}
          <strong className="font-extrabold">
            gestion de portefeuille projet
          </strong>{" "}
          qui change tout
        </>
      ),
      description:
        "AirSaas a été conçu pour les professionnels de la transformation d'entreprise qui veulent piloter leur portefeuille de projets avec simplicité et efficacité.",
    },
    sections: [
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Vi</em>sualisez votre{" "}
            <strong className="font-bold">portfolio</strong> en un coup
            d&apos;œil
          </>
        ),
        description:
          "Accédez à une vue macro de votre portefeuille avec toutes les informations-clés : météos, jalons, risques, priorités. Tout est consolidé en temps réel.",
        image: "/assets/images/Portfolio project timeline view.webp",
        imageAlt: "Portfolio en un coup d'œil",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Pr</em>iorisez vos{" "}
            <strong className="font-bold">projets</strong> efficacement
          </>
        ),
        description:
          "Demandez aux directeurs de prioriser leurs projets. Deux projets ne peuvent pas avoir la même priorité. Simple, transparent et puissant.",
        image: "/assets/images/Portfolio project priority.webp",
        imageAlt: "Priorisation des projets",
        reversed: true,
      },
      {
        type: "cta",
        heading: (
          <>
            Choisissez de{" "}
            <strong className="font-extrabold">gagner du temps</strong> et du
            contrôle
          </>
        ),
        description:
          "Adoptez dès maintenant une solution de gestion de portefeuille projet efficace.",
      },
    ],
    hasPress: false,
  },

  // ─── 10. Outils de pilotage projet ───
  {
    slug: "outils-de-pilotage-projet",
    meta: {
      title: "Outils de pilotage projet | AirSaas",
      description:
        "Découvrez les outils de pilotage projet d'AirSaas pour une gouvernance efficace de votre transformation.",
    },
    hero: {
      heading: (
        <>
          Les{" "}
          <strong className="font-extrabold">outils de pilotage projet</strong>{" "}
          des professionnels de la transformation
        </>
      ),
      description:
        "Découvrez les outils de pilotage projet d'AirSaas : tableau de bord, reporting automatisé, priorisation, capacity planning. Tout pour piloter votre transformation.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Outils de pilotage projet",
    },
    intro: {
      heading: (
        <>
          Des outils de pilotage{" "}
          <strong className="font-extrabold">pensés pour vous</strong>
        </>
      ),
      description:
        "AirSaas réunit tous les outils de pilotage projet dont vous avez besoin pour assurer une gouvernance efficace de votre portefeuille de projets.",
    },
    sections: [
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em> tableau de bord{" "}
            <strong className="font-bold">consolidé</strong>
          </>
        ),
        description:
          "Centralisez toutes vos informations projets dans un tableau de bord unique. Météos, jalons, risques : tout est à portée de clic.",
        image: "/assets/images/Portfolio project list view.webp",
        imageAlt: "Tableau de bord consolidé",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em> reporting{" "}
            <strong className="font-bold">automatisé</strong>
          </>
        ),
        description:
          "Générez vos flash reports en un clic. Plus besoin de passer des heures sur PowerPoint pour préparer vos Copils.",
        image: "/assets/images/Flash report ppt.webp",
        imageAlt: "Reporting automatisé",
        reversed: true,
      },
      {
        type: "cta",
        heading: (
          <>
            Choisissez de{" "}
            <strong className="font-extrabold">gagner du temps</strong> et du
            contrôle
          </>
        ),
        description:
          "Adoptez les outils de pilotage projet qui accélèrent votre transformation.",
      },
    ],
    hasPress: false,
  },

  // ─── 11. Outil PPM ───
  {
    slug: "outil-ppm",
    meta: {
      title: "Outil PPM nouvelle génération pour accélérer votre transfo",
      description:
        "AirSaas propose un outil PPM nouvelle génération. Finissez-en aujourd'hui avec votre Excel à 1200 colonnes !",
    },
    hero: {
      badge: undefined,
      heading: (
        <>
          <em className="not-italic">AirSaas</em> : un outil PPM{" "}
          <strong className="font-extrabold">
            nouvelle génération - Logiciel ppm
          </strong>
        </>
      ),
      description:
        "Souvent complexes et coûteux à implémenter, AirSaas propose un outil PPM nouvelle génération. Finissez-en aujourd'hui avec votre Excel à 1200 colonnes !",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Outil PPM",
    },
    intro: {
      heading: (
        <>
          Quels sont{" "}
          <strong className="font-extrabold">les meilleurs logiciels PPM</strong>{" "}
          ? L&apos;exemple AirSaas
        </>
      ),
      description:
        "Un outil PPM (Project Portfolio Management), permet de donner de la visibilité aux managers et de prioriser les projets en fonction des retombées potentielles pour l'entreprise.",
    },
    sections: [
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Prenez</em> des décisions avisées en{" "}
            <strong className="font-bold">Copil</strong>
          </>
        ),
        description:
          "Pour prendre les bonnes décisions il faut les bonnes informations en entrée, à jour et consolidées. AirSaas vous fournit un tableau de bord de tous vos projets, filtrable suivant les indicateurs essentiels, permettant de ne voir que les informations importantes à la prise de décision.",
        image: "/assets/images/Portfolio decisions-min.png",
        imageAlt: "Portfolio decisions",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Gagnez</em> du temps en{" "}
            <strong className="font-bold">reporting</strong>
          </>
        ),
        description:
          "Vos équipes reçoivent régulièrement des questions sur l'état d'avancement des projets. Nous avons créé pour vous le rapport flash. En un clic une présentation est générée, contenant les slides projet avec toutes les données à jour.",
        image: "/assets/images/Flash report ppt.webp",
        imageAlt: "Reporting flash avec votre logiciel PPM",
        reversed: true,
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Améliorez</em> votre gestion des{" "}
            <strong className="font-bold">ressources</strong>
          </>
        ),
        description:
          "La vue timeline vous permet d'avoir une vision d'ensemble des projets en cours et leurs jalons associés. Assurez-vous de la disponibilité des ressources et priorisez les projets par importance.",
        image: "/assets/images/Capacity screen.webp",
        imageAlt: "Gestion des ressources depuis votre outil PPM",
      },
      {
        type: "cta",
        heading: (
          <>
            Choisissez de gagner du{" "}
            <strong className="font-extrabold">temps et du contrôle</strong>
          </>
        ),
        description:
          "Adoptez dès maintenant une solution efficace de flash report projet",
      },
      {
        type: "feature",
        heading: (
          <>
            Fluidifiez les{" "}
            <strong className="font-bold">relations entre l&apos;IT et les métiers</strong>
          </>
        ),
        description:
          "AirSaas est collaboratif \"by design\" permettant de rassembler les parties prenantes autour d'un même outil, compréhensible de tous. L'outil permet un reporting régulier, ainsi qu'une remontée des problèmes rencontrés et des succès du parcours.",
        image: "/assets/images/Block - people involved screen.webp",
        imageAlt: "Pilotage de projet",
      },
      {
        type: "feature",
        heading: (
          <>
            Améliorez la phase de{" "}
            <strong className="font-bold">cadrage</strong>
          </>
        ),
        description:
          "Un cadrage guidé où les utilisateurs sont accompagnés pour remplir les informations essentielles au bon démarrage. Quand le niveau de remplissage est suffisant, le projet peut partir en validation au comité de pilotage.",
        image: "/assets/images/Presentation cadrage screen.webp",
        imageAlt: "Cadrage de projet dans votre logiciel PPM",
        reversed: true,
      },
      {
        type: "cta",
        heading: (
          <>
            Choisissez de gagner du{" "}
            <strong className="font-extrabold">temps et du contrôle</strong>
          </>
        ),
        description:
          "Adoptez dès maintenant une solution efficace de flash report projet",
      },
    ],
    hasPress: false,
  },

  // ─── 12. AirSaas et les experts de la transfo ───
  {
    slug: "airsaas-et-les-experts-de-la-transfo",
    meta: {
      title: "AirSaas et les experts de la transformation | AirSaas",
      description:
        "Découvrez comment les experts de la transformation utilisent AirSaas pour accompagner leurs clients.",
    },
    hero: {
      heading: (
        <>
          <strong className="font-extrabold">AirSaas</strong> et les experts de
          la transformation
        </>
      ),
      description:
        "Découvrez comment les experts de la transformation d'entreprise utilisent AirSaas pour accompagner leurs clients dans leurs projets de transformation.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "AirSaas et les experts de la transfo",
    },
    intro: {
      heading: (
        <>
          L&apos;outil des{" "}
          <strong className="font-extrabold">
            professionnels de la transformation
          </strong>
        </>
      ),
      description:
        "AirSaas est l'outil de référence des experts de la transformation d'entreprise. DSI de transition, consultants en transformation, PMO : ils utilisent AirSaas au quotidien pour piloter les projets de leurs clients.",
    },
    sections: [
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em> outil{" "}
            <strong className="font-bold">prêt à l&apos;emploi</strong>
          </>
        ),
        description:
          "Pas besoin de 5 jours de formation. Importez votre Excel, invitez votre équipe et c'est parti. L'interface est ergonomique et intuitive, la prise en main se fait dès le premier jour.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Outil prêt à l'emploi",
      },
      {
        type: "feature",
        heading: (
          <>
            <em className="not-italic">Un</em>e{" "}
            <strong className="font-bold">méthodologie</strong> éprouvée
          </>
        ),
        description:
          "AirSaas porte une méthodologie collaborative forte qui aide vos clients à structurer leur gestion de portefeuille de projets et à développer leur culture projet.",
        image: "/assets/images/Portfolio- bt-presentation.webp",
        imageAlt: "Méthodologie éprouvée",
        reversed: true,
      },
      {
        type: "cta",
        heading: (
          <>
            Rejoignez le réseau des{" "}
            <strong className="font-extrabold">
              experts de la transformation
            </strong>
          </>
        ),
        description:
          "Découvrez comment AirSaas peut vous aider à accompagner vos clients plus efficacement.",
      },
    ],
    hasPress: true,
  },
];
