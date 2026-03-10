/**
 * Équipes pages data — hardcoded for Step 3.
 * Will be replaced by Strapi Collection Type `page` at Step 5.
 *
 * Équipes pages are essentially homepage variants: same section types
 * (hero, features, stats, press) but with team-specific content.
 */

export type EquipesSection = {
  type: "heading" | "feature" | "cta" | "stats";
  heading?: React.ReactNode;
  description?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  reversed?: boolean;
  variant?: "default" | "card";
  buttonText?: string;
  stats?: { value: string; label: string }[];
};

export type EquipesPageData = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    heading: React.ReactNode;
    description: string;
    image: string;
    imageAlt: string;
  };
  intro: {
    heading: React.ReactNode;
    description: React.ReactNode;
  };
  sections: EquipesSection[];
  hasPress: boolean;
};

export const EQUIPES_PAGES: EquipesPageData[] = [
  // ─── 1. Outil PMO ───
  {
    slug: "outil-pmo",
    meta: {
      title: "Outil PMO : pilotez votre portefeuille de projets | AirSaas",
      description:
        "AirSaas est l'outil PMO conçu pour les professionnels de la transformation. Pilotez votre portefeuille, suivez l'avancement et communiquez efficacement.",
    },
    hero: {
      heading: (
        <>
          L&apos;outil <strong className="font-extrabold">PMO</strong> conçu pour
          les professionnels de la transformation
        </>
      ),
      description:
        "AirSaas accompagne les PMO dans le pilotage de leur portefeuille de projets : vision consolidée, reporting automatisé, communication simplifiée.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Outil PMO AirSaas",
    },
    intro: {
      heading: (
        <>
          Le PMO mérite un outil à la hauteur de ses{" "}
          <strong className="font-extrabold">ambitions</strong>
        </>
      ),
      description:
        "Fini les usines à gaz et les fichiers Excel. AirSaas donne aux PMO la visibilité dont ils ont besoin pour piloter efficacement la transformation de l'entreprise.",
    },
    sections: [
      {
        type: "stats",
        stats: [
          { value: "4h", label: "gagnées par semaine sur le reporting" },
          { value: "100%", label: "de visibilité sur le portefeuille" },
          { value: "3x", label: "plus de projets livrés dans les temps" },
        ],
      },
      {
        type: "feature",
        heading: "Vue portefeuille en temps réel",
        description:
          "Visualisez l'état de tous vos projets en un coup d'œil. Statut, budget, charge, risques : tout est centralisé dans un tableau de bord intuitif.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Vue portefeuille PMO",
      },
      {
        type: "feature",
        heading: "Reporting automatisé",
        description:
          "Générez des rapports d'avancement en quelques clics. Les flash reports se compilent automatiquement à partir des données projet. Plus besoin de courir après l'information.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Reporting PMO automatisé",
      },
      {
        type: "cta",
        heading: (
          <>
            Rejoignez les PMO qui ont choisi{" "}
            <strong className="font-extrabold">AirSaas</strong>
          </>
        ),
        description:
          "Découvrez comment AirSaas transforme le quotidien des PMO et accélère la livraison des projets.",
      },
      {
        type: "feature",
        heading: "Gouvernance et arbitrages facilités",
        description:
          "Préparez vos comités de pilotage en quelques minutes. Toutes les données sont à jour et présentées dans un format clair pour faciliter les prises de décision.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Gouvernance PMO",
        variant: "card",
      },
    ],
    hasPress: true,
  },

  // ─── 2. Direction de la Transformation ───
  {
    slug: "direction-de-la-transformation",
    meta: {
      title: "Direction de la Transformation : pilotez le changement | AirSaas",
      description:
        "AirSaas aide les Directions de la Transformation à piloter leurs programmes, suivre les indicateurs clés et accélérer le changement.",
    },
    hero: {
      heading: (
        <>
          <strong className="font-extrabold">Direction de la Transformation</strong>{" "}
          : pilotez le changement avec confiance
        </>
      ),
      description:
        "Gardez une vision claire de vos programmes de transformation, suivez les indicateurs clés et communiquez efficacement avec toutes les parties prenantes.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Direction de la Transformation AirSaas",
    },
    intro: {
      heading: (
        <>
          Accélérez votre{" "}
          <strong className="font-extrabold">transformation</strong> d&apos;entreprise
        </>
      ),
      description:
        "La Direction de la Transformation a besoin d'un outil qui combine vision stratégique et exécution opérationnelle. AirSaas est conçu exactement pour ça.",
    },
    sections: [
      {
        type: "feature",
        heading: "Vision stratégique du portefeuille",
        description:
          "Suivez l'avancement de vos programmes de transformation avec des indicateurs agrégés. Identifiez les projets en dérive et prenez les mesures correctives rapidement.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Vision stratégique transformation",
      },
      {
        type: "feature",
        heading: "Communication descendante et ascendante",
        description:
          "Diffusez les priorités stratégiques et recevez les remontées terrain en temps réel. AirSaas fluidifie la communication entre la Direction et les équipes projet.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Communication transformation",
      },
      {
        type: "cta",
        heading: "Transformez avec AirSaas",
        description:
          "Découvrez comment AirSaas accompagne les Directions de la Transformation dans le pilotage de leurs programmes.",
      },
      {
        type: "feature",
        heading: "Tableaux de bord pour le COMEX",
        description:
          "Préparez des présentations claires et synthétiques pour votre comité exécutif. Indicateurs clés, avancement global, risques majeurs : tout est prêt en quelques clics.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Tableaux de bord COMEX",
        variant: "card",
      },
    ],
    hasPress: true,
  },

  // ─── 3. Comité Direction ───
  {
    slug: "comite-direction",
    meta: {
      title: "Comité de Direction : des décisions éclairées | AirSaas",
      description:
        "AirSaas fournit au Comité de Direction la visibilité nécessaire pour prendre des décisions éclairées sur le portefeuille de projets.",
    },
    hero: {
      heading: (
        <>
          <strong className="font-extrabold">Comité de Direction</strong> : prenez
          des décisions éclairées
        </>
      ),
      description:
        "Accédez en un clic à une vision consolidée de tous les projets de l'entreprise. Identifiez les priorités, les risques et les opportunités pour décider en confiance.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Comité de Direction AirSaas",
    },
    intro: {
      heading: (
        <>
          La bonne information, au{" "}
          <strong className="font-extrabold">bon moment</strong>
        </>
      ),
      description:
        "Le Comité de Direction a besoin de synthèse, pas de détails. AirSaas agrège l'information projet pour offrir une vue claire et actionnable au plus haut niveau.",
    },
    sections: [
      {
        type: "feature",
        heading: "Dashboard exécutif",
        description:
          "Un tableau de bord conçu pour les décideurs : indicateurs clés agrégés, tendances, alertes sur les projets critiques. L'essentiel en un coup d'œil.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Dashboard exécutif",
      },
      {
        type: "feature",
        heading: "Préparation de COPIL simplifiée",
        description:
          "Les données sont toujours à jour et présentées dans un format adapté aux comités de pilotage. Plus besoin de passer des heures à préparer des PowerPoints.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Préparation COPIL",
      },
      {
        type: "cta",
        heading: "Donnez de la visibilité à votre Direction",
        description:
          "Découvrez comment AirSaas aide le Comité de Direction à piloter efficacement le portefeuille de projets.",
      },
    ],
    hasPress: true,
  },

  // ─── 4. IT & Opérations ───
  {
    slug: "it-et-operation",
    meta: {
      title: "IT & Opérations : gérez vos projets IT efficacement | AirSaas",
      description:
        "AirSaas aide les équipes IT & Opérations à gérer leurs projets, suivre les livraisons et communiquer avec les métiers.",
    },
    hero: {
      heading: (
        <>
          <strong className="font-extrabold">IT &amp; Opérations</strong> : gérez
          vos projets avec fluidité
        </>
      ),
      description:
        "Pilotez vos projets IT, suivez les livraisons et maintenez une communication fluide avec les équipes métier. AirSaas s'intègre dans votre écosystème existant.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "IT et Opérations AirSaas",
    },
    intro: {
      heading: (
        <>
          L&apos;IT au service de la{" "}
          <strong className="font-extrabold">transformation</strong>
        </>
      ),
      description:
        "Les équipes IT sont au cœur de la transformation digitale. AirSaas leur donne les outils pour gérer la complexité sans perdre en agilité.",
    },
    sections: [
      {
        type: "feature",
        heading: "Suivi des livraisons IT",
        description:
          "Suivez l'avancement de vos projets IT avec des jalons clairs et des indicateurs de livraison. Identifiez rapidement les retards et les dépendances.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Suivi livraisons IT",
      },
      {
        type: "feature",
        heading: "Interface avec les équipes métier",
        description:
          "AirSaas facilite la collaboration entre IT et métier. Les demandeurs ont de la visibilité sur l'avancement, l'IT garde le contrôle de l'exécution.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Collaboration IT métier",
      },
      {
        type: "cta",
        heading: "Modernisez votre gestion de projets IT",
        description:
          "Découvrez comment AirSaas aide les équipes IT & Opérations à livrer plus efficacement.",
      },
    ],
    hasPress: true,
  },
];
