/**
 * Landing pages data — hardcoded for Step 4.
 * Will be replaced by Strapi at Step 5.
 */

export type LpFeature = {
  badge?: string;
  heading: React.ReactNode;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

export type LpPageData = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    heading: React.ReactNode;
    description: string;
    videoHref?: string;
    videoText?: string;
    trustBadges: { icon: string; text: string }[];
  };
  stats: {
    heading?: string;
    items: { value: string; label: string }[];
  };
  painPoints: {
    heading: string;
    items: React.ReactNode[];
  };
  features: LpFeature[];
  whyAdopt: {
    heading: string;
    description?: string;
    items: { title: string; description: string }[];
  };
  howItWorks?: {
    heading?: string;
    description?: string;
    steps: { title: string; description: string }[];
  };
  faq: {
    heading: React.ReactNode;
    items: { question: string; answer: string }[];
  };
  finalCta: {
    heading: string;
    description?: string;
    videoTitle?: string;
    videoDescription?: string;
    videoHref?: string;
  };
};

export const LP_PAGES: LpPageData[] = [
  // ─── 1. PPM ───
  {
    slug: "ppm",
    meta: {
      title: "Outil PPM nouvelle génération | AirSaas",
      description:
        "Brief projet assisté par IA, flash report en 1 clic, roadmap partageable, vue macro consolidée. L'outil PPM que votre équipe va vraiment adopter.",
    },
    hero: {
      badge: "PPM nouvelle génération",
      heading: (
        <>
          Un PPM avec une UX au top ?{" "}
          <strong className="font-extrabold">Ça existe.</strong>
        </>
      ),
      description:
        "Brief projet assisté par IA, flash report en 1 clic, roadmap partageable, vue macro consolidée. L'outil PPM que votre équipe va vraiment adopter.",
      videoHref: "/fr/video/ppm",
      videoText: "▶️ Découvrir l'outil PPM en vidéo (5 min)",
      trustBadges: [
        { icon: "/assets/icons/check-circle.svg", text: "+100 clients nous font confiance" },
        { icon: "/assets/icons/check-circle.svg", text: "Opérationnel en 1 mois" },
        { icon: "/assets/icons/check-circle.svg", text: "Accompagnement premium inclus" },
      ],
    },
    stats: {
      heading: "Ils nous font confiance",
      items: [
        { value: "-80%", label: "de réunions projet" },
        { value: "0 PPT", label: "Reporting en 1 clic" },
        { value: "1 mois", label: "pour être opérationnel" },
        { value: "+60%", label: "des projets on time & on budget" },
      ],
    },
    painPoints: {
      heading: "⚠️ Vous vous reconnaissez ?",
      items: [
        <>Votre portefeuille projets vit dans <strong>un Excel à 1200 colonnes</strong> que vous seul comprenez</>,
        <>Vous passez <strong>2 jours à produire des PowerPoints</strong> qui sont obsolètes le lendemain</>,
        <>Le Comex vous demande une roadmap, vous avez <strong>une liste de 47 projets sans priorité claire</strong></>,
        <>Des projets se rajoutent alors que <strong>certaines équipes sont à 200%</strong>. Mais personne ne le voit.</>,
      ],
    },
    features: [
      {
        badge: "Gain de temps immédiat",
        heading: (
          <>
            <strong className="font-extrabold">Flash Report</strong> en 1 clic
          </>
        ),
        description:
          "Fini les 2 jours de PowerPoint. En un clic, générez un rapport complet, à jour, aux couleurs de votre entreprise. Partagez-le par email ou via un lien sécurisé.",
        bullets: [
          "Export PDF, PPT ou lien web",
          "Personnalisable aux couleurs de l'entreprise",
          "Données toujours à jour",
          "Envoi automatique programmable",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Flash report",
      },
      {
        badge: "Nouveau",
        heading: (
          <>
            <strong className="font-extrabold">Roadmap</strong> COMEX partageable en{" "}
            <strong className="font-extrabold">un clic</strong>
          </>
        ),
        description:
          "Partagez une roadmap dynamique avec le Comex via un lien sécurisé, sans qu'ils aient besoin de se connecter. Lecture seule, expiration configurable, droits personnalisés.",
        bullets: [
          "Export PDF, PPT ou lien web",
          "Droits de lecture configurables",
          "Expiration automatique",
          "Roadmap et Flash Report = même source de vérité",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Roadmap",
      },
      {
        badge: "Clarté absolue",
        heading: (
          <>
            <strong className="font-extrabold">Priorisation</strong> explicite #1, #2, #3
          </>
        ),
        description:
          "Chaque équipe doit pouvoir dire ce qui est #1, #2, #3 — pas un \"top 10\". Et dès que l'ordre change, tout le monde le voit. Fini les \"projets zombies\".",
        bullets: [
          "Liste unique par équipe",
          "Changements visibles (qui, quoi, pourquoi)",
          "Vue d'arbitrage inter-directions",
          "Historique des décisions",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Prioritization",
      },
      {
        badge: "Nouveau",
        heading: (
          <>
            <strong className="font-extrabold">Décisions</strong> pilotables
          </>
        ),
        description:
          "Les décisions changent, se perdent dans les CR, et chacun en garde une version différente. AirSaas transforme les décisions en objets pilotables avec owner, échéance et impact sur la roadmap.",
        bullets: [
          "Owner et échéance assignés",
          "Suivi du statut en temps réel",
          "Impact visible sur la roadmap",
          "Historique complet",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Decisions",
      },
      {
        badge: "Vue macro",
        heading: (
          <>
            <strong className="font-extrabold">Portfolio</strong> consolidé multi-vues
          </>
        ),
        description:
          "Tableau de bord, Kanban, Timeline, Liste filtrable... Visualisez votre portefeuille comme vous le souhaitez. Filtrez par météo, équipe, priorité, objectif.",
        bullets: [
          "Vue Liste, Kanban, Timeline, Dashboard",
          "Filtres personnalisables",
          "Drill-down par direction / équipe",
          "Export en 1 clic",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Portfolio",
      },
      {
        badge: "Quarter Plan",
        heading: (
          <>
            <strong className="font-extrabold">Capacité</strong> par quarter et par équipe
          </>
        ),
        description:
          "Visualisez en un clin d'œil la charge vs capacité de chaque équipe, trimestre par trimestre. Enfin un moyen simple de savoir si vous pouvez prendre ce nouveau projet.",
        bullets: [
          "Vue capacité par équipe et par trimestre",
          "Alerte surcharge automatique",
          "T-shirt sizing (S, M, L, XL)",
          "Arbitrer avant de créer de la friction",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Project capacity",
      },
      {
        badge: "Intelligence Artificielle",
        heading: (
          <>
            <strong className="font-extrabold">Scénarios</strong> d&apos;arbitrage avec l&apos;
            <strong className="font-extrabold">IA</strong>
          </>
        ),
        description:
          "Passez de \"roadmap figée\" à \"scénarios A/B/C\". L'IA structure ce qui manque, puis vous comparez les options en minutes : capacité consommée, délais, risques, valeur.",
        bullets: [
          "Comparaison visuelle des scénarios",
          "Impact sur la capacité en temps réel",
          "Arbitrages documentés et traçables",
          "Fonctionne même avec des données imparfaites",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Scenario",
      },
    ],
    whyAdopt: {
      heading: "Pourquoi les équipes adoptent AirSaas",
      description:
        "Un PPM n'a de valeur que s'il est utilisé. Voici ce qui fait la différence.",
      items: [
        {
          title: "Prise en main immédiate",
          description:
            "Interface intuitive. Vos équipes l'utilisent dès le premier jour.",
        },
        {
          title: "Connecté à vos outils",
          description:
            "Jira, Asana, Monday, Teams, Slack... Pas de double saisie.",
        },
        {
          title: "UX pensée pour tous",
          description:
            "Du chef de projet au Comex, chacun trouve l'info dont il a besoin.",
        },
      ],
    },
    howItWorks: {
      steps: [
        { title: "Import", description: "Importez votre Excel ou connectez Jira/Asana" },
        { title: "Configuration", description: "Paramétrez vos équipes et workflows" },
        { title: "Onboarding", description: "Accompagnement dédié par nos experts" },
        { title: "Go Live", description: "Premier Quarter Plan en production" },
      ],
    },
    faq: {
      heading: (
        <>
          <strong className="font-extrabold">Questions</strong> fréquentes
        </>
      ),
      items: [
        {
          question: "AirSaas remplace-t-il Jira ou Asana ?",
          answer:
            "Non. AirSaas se positionne au-dessus de vos outils opérationnels. Vos équipes gardent Jira/Asana pour l'exécution, AirSaas sert au pilotage stratégique du portefeuille.",
        },
        {
          question: "L'IA fonctionne-t-elle avec des données incomplètes ?",
          answer:
            "Oui. L'IA structure ce qui manque et vous permet de comparer des scénarios même avec une donnée imparfaite. Mieux vaut arbitrer avec des infos partielles que ne pas arbitrer du tout.",
        },
        {
          question: "Nos données sont-elles sécurisées ?",
          answer:
            "Oui. AirSaas est certifié ISO 27001, hébergé en France chez Scaleway. Nous mettons à disposition les résultats de pentest pour vos revues SSI.",
        },
        {
          question: "Combien de temps pour être opérationnel ?",
          answer:
            "1 mois pour le setup initial et la prise en main. Comptez 3 mois pour un Quarter Plan complet et bien ancré dans les rituels de l'organisation.",
        },
        {
          question: "Quel est le prix ?",
          answer:
            "Prix accessible. Tarification sur mesure selon la taille de votre organisation. Parlons-en lors d'une démo.",
        },
      ],
    },
    finalCta: {
      heading: "De contremaître à coach d'organisation",
      description:
        "AirSaas libère le PMO des tâches administratives pour qu'il puisse enfin se concentrer sur la stratégie.",
      videoTitle: "Découvrir l'outil PPM en vidéo (5 min)",
      videoDescription:
        "Découvrez comment AirSaas révolutionne l'organisation projet.",
      videoHref: "/fr/video/ppm",
    },
  },

  // ─── 2. PMO ───
  {
    slug: "pmo",
    meta: {
      title: "L'outil des PMO modernes | AirSaas",
      description:
        "AirSaas est l'outil PPM conçu pour les PMO qui veulent piloter leur portefeuille de projets efficacement.",
    },
    hero: {
      badge: "L'outil des PMO modernes",
      heading: (
        <>
          Le PMO mérite mieux qu&apos;Excel.{" "}
          <strong className="font-extrabold">Beaucoup mieux.</strong>
        </>
      ),
      description:
        "Pilotez votre portefeuille, automatisez votre reporting, et devenez le coach stratégique que votre organisation attend.",
      videoHref: "/fr/video/pmo",
      videoText: "▶️ Découvrir l'outil PMO en vidéo",
      trustBadges: [
        { icon: "/assets/icons/check-circle.svg", text: "+100 PMO nous font confiance" },
        { icon: "/assets/icons/check-circle.svg", text: "Opérationnel en 1 mois" },
        { icon: "/assets/icons/check-circle.svg", text: "Accompagnement premium inclus" },
      ],
    },
    stats: {
      heading: "Les chiffres parlent",
      items: [
        { value: "4h", label: "gagnées par semaine sur le reporting" },
        { value: "0 PPT", label: "Flash report en 1 clic" },
        { value: "100%", label: "de visibilité portefeuille" },
        { value: "+60%", label: "de projets livrés dans les temps" },
      ],
    },
    painPoints: {
      heading: "⚠️ Le quotidien du PMO aujourd'hui",
      items: [
        <>Vous passez <strong>plus de temps à compiler des données</strong> qu&apos;à analyser et conseiller</>,
        <>Votre reporting est <strong>un assemblage de PowerPoints</strong> que personne ne lit vraiment</>,
        <>Vous n&apos;avez <strong>aucune vue consolidée fiable</strong> de l&apos;avancement du portefeuille</>,
        <>Les chefs de projet <strong>ne remplissent pas l&apos;outil</strong> parce qu&apos;il est trop complexe</>,
      ],
    },
    features: [
      {
        badge: "Gain de temps",
        heading: (
          <>
            <strong className="font-extrabold">Flash Report</strong> automatisé
          </>
        ),
        description:
          "Générez des rapports d'avancement en un clic. Les données sont toujours à jour, le format est professionnel. Fini les 2 jours de PowerPoint.",
        bullets: [
          "Génération automatique",
          "Personnalisable par audience",
          "Export PDF, PPT ou lien web",
          "Envoi programmable",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Flash report PMO",
      },
      {
        badge: "Vue consolidée",
        heading: (
          <>
            <strong className="font-extrabold">Portfolio</strong> en temps réel
          </>
        ),
        description:
          "Visualisez l'état de tous vos projets en un coup d'œil. Statut, budget, charge, risques : tout est centralisé.",
        bullets: [
          "Vue multi-projets consolidée",
          "Filtres par météo, équipe, priorité",
          "Alertes automatiques",
          "Drill-down par direction",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Portfolio PMO",
      },
      {
        badge: "Gouvernance",
        heading: (
          <>
            <strong className="font-extrabold">COPIL</strong> préparé en 5 min
          </>
        ),
        description:
          "Préparez vos comités de pilotage en quelques minutes. Toutes les données sont prêtes, le format est clair pour les décideurs.",
        bullets: [
          "Données toujours à jour",
          "Format adapté aux décideurs",
          "Historique des décisions",
          "Suivi des actions",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "COPIL PMO",
      },
    ],
    whyAdopt: {
      heading: "Pourquoi les PMO choisissent AirSaas",
      items: [
        {
          title: "Adoption immédiate",
          description: "Interface intuitive que les chefs de projet utilisent vraiment.",
        },
        {
          title: "De PMO administratif à PMO stratégique",
          description: "Libérez du temps pour le coaching et l'accompagnement.",
        },
        {
          title: "Résultats en 1 mois",
          description: "Pas de projet d'implémentation de 6 mois.",
        },
      ],
    },
    howItWorks: {
      steps: [
        { title: "Import", description: "Importez vos projets depuis Excel" },
        { title: "Configuration", description: "Paramétrez vos workflows" },
        { title: "Onboarding", description: "Formation de vos équipes" },
        { title: "Go Live", description: "Premier reporting en production" },
      ],
    },
    faq: {
      heading: (
        <>
          <strong className="font-extrabold">Questions</strong> fréquentes
        </>
      ),
      items: [
        {
          question: "AirSaas remplace-t-il MS Project ?",
          answer:
            "AirSaas se positionne au niveau portefeuille. Il complète vos outils de gestion de projet opérationnels (MS Project, Jira, Asana) en offrant la vue consolidée et le reporting automatisé.",
        },
        {
          question: "Combien de temps pour déployer AirSaas ?",
          answer:
            "1 mois pour être opérationnel. Notre équipe vous accompagne dans l'import de vos données et la prise en main par vos équipes.",
        },
        {
          question: "AirSaas convient-il aux grands portefeuilles ?",
          answer:
            "Oui. AirSaas gère des portefeuilles de plusieurs centaines de projets sans perte de performance.",
        },
      ],
    },
    finalCta: {
      heading: "Passez de PMO administratif à PMO stratégique",
      description: "Rejoignez les PMO qui ont transformé leur quotidien avec AirSaas.",
      videoTitle: "Découvrir l'outil PMO en vidéo",
      videoDescription: "5 minutes pour comprendre comment AirSaas transforme le rôle du PMO.",
      videoHref: "/fr/video/pmo",
    },
  },

  // ─── 3. Capacity Planning ───
  {
    slug: "capacity-planning",
    meta: {
      title: "Capacity Planning simplifié | AirSaas",
      description:
        "Visualisez la charge de vos équipes et arbitrez en connaissance de cause. Le capacity planning enfin simple et actionnable.",
    },
    hero: {
      badge: "Capacity Planning simplifié",
      heading: (
        <>
          &laquo; On peut prendre ce projet ? &raquo;{" "}
          <strong className="font-extrabold">Enfin une réponse.</strong>
        </>
      ),
      description:
        "Visualisez la charge vs capacité de chaque équipe, trimestre par trimestre. Arbitrez en connaissance de cause, pas au feeling.",
      trustBadges: [
        { icon: "/assets/icons/check-circle.svg", text: "Vue par équipe et par quarter" },
        { icon: "/assets/icons/check-circle.svg", text: "T-shirt sizing (S, M, L, XL)" },
        { icon: "/assets/icons/check-circle.svg", text: "Alerte surcharge automatique" },
      ],
    },
    stats: {
      items: [
        { value: "100%", label: "de visibilité sur la charge" },
        { value: "0", label: "surprise de surcharge" },
        { value: "1 mois", label: "pour être opérationnel" },
        { value: "+60%", label: "de projets livrés dans les temps" },
      ],
    },
    painPoints: {
      heading: "⚠️ Vous vous reconnaissez ?",
      items: [
        <>Vos équipes sont <strong>à 200%</strong> mais personne ne le voit dans un tableau</>,
        <>On vous demande de <strong>prendre un nouveau projet</strong> alors que vous n&apos;avez plus de bande passante</>,
        <>Votre capacity planning vit dans <strong>un Excel que vous seul maintenez</strong></>,
      ],
    },
    features: [
      {
        badge: "Vue capacitaire",
        heading: (
          <>
            <strong className="font-extrabold">Charge vs capacité</strong> en un coup d&apos;œil
          </>
        ),
        description:
          "Visualisez instantanément quelles équipes sont surchargées et lesquelles ont de la bande passante. Par quarter, par équipe.",
        bullets: [
          "Vue par équipe et par quarter",
          "Alerte surcharge automatique",
          "T-shirt sizing",
          "Historique et tendances",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Capacity planning vue",
      },
      {
        badge: "Arbitrage",
        heading: (
          <>
            <strong className="font-extrabold">Scénarios</strong> d&apos;arbitrage
          </>
        ),
        description:
          "Comparez des scénarios A/B/C pour voir l'impact sur la charge de chaque équipe avant de décider.",
        bullets: [
          "Comparaison visuelle des scénarios",
          "Impact sur la capacité en temps réel",
          "Arbitrages documentés",
          "Fonctionne avec des données imparfaites",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Scénarios arbitrage",
      },
    ],
    whyAdopt: {
      heading: "Pourquoi AirSaas pour le capacity planning",
      items: [
        {
          title: "Simple et visuel",
          description: "Pas besoin d'un expert Excel. L'interface est intuitive et visuelle.",
        },
        {
          title: "Connecté au portefeuille",
          description: "La charge se calcule automatiquement à partir de vos projets.",
        },
        {
          title: "Actionnable",
          description: "Pas juste un tableau : des alertes et des scénarios pour décider.",
        },
      ],
    },
    faq: {
      heading: (
        <>
          <strong className="font-extrabold">Questions</strong> fréquentes
        </>
      ),
      items: [
        {
          question: "Comment fonctionne le T-shirt sizing ?",
          answer:
            "Attribuez une taille (S, M, L, XL) à chaque projet pour estimer la charge. AirSaas agrège automatiquement par équipe et par quarter.",
        },
        {
          question: "Faut-il saisir les temps passés ?",
          answer:
            "Non. Le capacity planning AirSaas fonctionne sur la charge prévisionnelle (T-shirt sizing), pas sur le timetracking.",
        },
      ],
    },
    finalCta: {
      heading: "Reprenez le contrôle de votre charge",
      description: "Découvrez comment AirSaas simplifie votre capacity planning.",
    },
  },

  // ─── 4. PI Planning ───
  {
    slug: "pi-planning",
    meta: {
      title: "PI Planning : la vue business qui manque à Jira | AirSaas",
      description:
        "Synchronisez vos features Jira, nettoyez vos données, donnez une vue claire aux métiers et au Comex. Opérationnel en 1 PI.",
    },
    hero: {
      badge: "Pour les RTE, PMO SAFe et équipes agiles à l'échelle",
      heading: (
        <>
          Miro + Jira + PowerBI :{" "}
          <strong className="font-extrabold">
            ce n&apos;est pas comme ça qu&apos;un RTE embarque les métiers.
          </strong>
        </>
      ),
      description:
        "Synchronisez vos features Jira, nettoyez vos données, donnez une vue claire aux métiers et au Comex. Opérationnel en 1 PI, pas en 6 mois.",
      videoHref: "/fr/video/pi-planning",
      videoText: "▶️ Découvrir l'outil PI Planning en vidéo",
      trustBadges: [
        { icon: "/assets/icons/check-circle.svg", text: "Import Jira en quelques clics" },
        { icon: "/assets/icons/check-circle.svg", text: "Nettoyage des données dans AirSaas" },
        { icon: "/assets/icons/check-circle.svg", text: "Accompagnement pragmatique et efficace" },
      ],
    },
    stats: {
      heading: "+100 clients nous font confiance",
      items: [
        { value: "0", label: "PowerBI à maintenir" },
        { value: "Jira", label: "Synchro native" },
        { value: "1 PI", label: "pour être opérationnel" },
        { value: "-80%", label: "de temps reporting" },
      ],
    },
    painPoints: {
      heading: "⚠️ Le quotidien du RTE aujourd'hui",
      items: [
        <>Le <strong>Program Board vit sur Miro</strong> pendant 2 jours. Après, c&apos;est le chaos.</>,
        <>Vous passez plus de temps à <strong>customiser Jira</strong> qu&apos;à piloter votre train. Vous êtes devenu <strong>certifié Jira, pas certifié RTE</strong>.</>,
        <>Les <strong>reports Jira sont moches</strong>. Et comme la donnée n&apos;est pas clean, ça coûte cher d&apos;en faire des vrais.</>,
        <>Une feature pas finie en fin de PI ? Vous la <strong>décalez et perdez l&apos;historique</strong>. Ou vous bricolez.</>,
        <>Les métiers <strong>ne se connectent pas à Jira</strong>. Et vous le savez.</>,
        <>Vous êtes devenu <strong>expert Excel/PowerBI</strong> alors que votre job c&apos;est de faire livrer.</>,
      ],
    },
    features: [
      {
        badge: "Connecteur Jira",
        heading: (
          <>
            Import Jira <strong className="font-extrabold">&rarr;</strong> Nettoyage{" "}
            <strong className="font-extrabold">&rarr;</strong> Vue claire
          </>
        ),
        description:
          "Vos données Jira sont sales ? Pas grave. Importez vos features, nettoyez et structurez dans AirSaas avant de finaliser.",
        bullets: [
          "Import des features Jira",
          "Nettoyage des données dans AirSaas (pas dans Jira)",
          "Remontée des consommés et de la charge",
          "Synchro continue",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Jira import",
      },
      {
        badge: "Vue Business",
        heading: (
          <>
            Sync Features Jira.{" "}
            <strong className="font-extrabold">Enlevez le bruit. Parlez initiatives.</strong>
          </>
        ),
        description:
          "Vos features Jira remontent dans AirSaas. Les tickets et stories en dessous ? On les enlève du radar. Le Comex voit des initiatives business, pas du bruit technique.",
        bullets: [
          "Features Jira ↔ Features AirSaas (sync)",
          "Tickets/stories masqués (zéro bruit)",
          "Agrégation en initiatives lisibles",
          "Langage métier, pas langage dev",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Vue business",
      },
      {
        badge: "Nouveau",
        heading: (
          <>
            <strong className="font-extrabold">Roadmap partageable</strong> aux sponsors
          </>
        ),
        description:
          "Vos sponsors ne se connectent pas à Jira. Partagez une roadmap dynamique via un lien sécurisé. Lecture seule, expiration configurable.",
        bullets: [
          "Lien sécurisé sans connexion requise",
          "Vue temps réel (pas un export figé)",
          "Les métiers voient enfin la roadmap",
          "Fini les slides à mettre à jour",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Roadmap",
      },
      {
        badge: "Capacité",
        heading: (
          <>
            &laquo; Peut-on prendre ce projet ? &raquo;{" "}
            <strong className="font-extrabold">Enfin une réponse.</strong>
          </>
        ),
        description:
          "La vélocité ne répond pas à la question du métier. Visualisez la charge vs capacité de chaque équipe sur les prochains PI.",
        bullets: [
          "Vue capacité par équipe et par PI",
          "Alerte surcharge automatique",
          "T-shirt sizing (S, M, L, XL)",
          "Scénarios d'arbitrage",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Capacity",
      },
      {
        badge: "Gain de temps",
        heading: (
          <>
            <strong className="font-extrabold">Flash Report</strong> en 1 clic
          </>
        ),
        description:
          "Vous passiez 2 jours à construire des slides pour le Comex. Maintenant, vos données Jira génèrent un reporting business en 1 clic.",
        bullets: [
          "Données Jira → Reporting Comex automatique",
          "Format présentation ou export",
          "Personnalisable par audience",
          "Historique des versions",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Flash report",
      },
      {
        badge: "Suivi continu",
        heading: (
          <>
            <strong className="font-extrabold">Les objectifs PI</strong> ne disparaissent plus
          </>
        ),
        description:
          "Le PI Planning c'est 2 jours intenses... puis les objectifs disparaissent. Avec AirSaas, le suivi est continu.",
        bullets: [
          "Objectifs PI visibles en permanence",
          "Taux de delivery par PI",
          "Identification des blocages",
          "Amélioration continue cycle après cycle",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Objectifs PI",
      },
      {
        badge: "Intelligence Artificielle",
        heading: (
          <>
            <strong className="font-extrabold">IA</strong> pour découper vos initiatives
          </>
        ),
        description:
          "L'IA vous aide à découper vos initiatives en se basant sur vos équipes et leur vélocité passée. Fini les estimations au doigt mouillé.",
        bullets: [
          "Analyse de la vélocité historique par équipe",
          "Suggestions de découpage réalistes",
          "Prise en compte des compétences équipes",
          "Estimations basées sur des données, pas du feeling",
        ],
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "AI initiatives",
      },
    ],
    whyAdopt: {
      heading: "Pourquoi pas Jira Align, PowerBI ou piplanning.io ?",
      description:
        "On ne vous jette pas la pierre. Vous avez essayé. Voici pourquoi ça coince.",
      items: [
        {
          title: "Jira Align",
          description: "6 mois de déploiement. Prix délirant. Usine à gaz que seul le RTE utilise vraiment.",
        },
        {
          title: "PowerBI + Jira",
          description: "Maintenance infinie. Casse à chaque évolution workflow. Compétences BI requises.",
        },
        {
          title: "piplanning.io",
          description: "Super pour l'event PI Planning. Et après ? Rien pour le suivi, rien pour le Comex.",
        },
      ],
    },
    faq: {
      heading: (
        <>
          <strong className="font-extrabold">Questions</strong> fréquentes
        </>
      ),
      items: [
        {
          question: "Ça remplace Jira ?",
          answer:
            "Non. Jira reste votre outil de delivery pour les équipes. AirSaas est la couche business au-dessus : reporting, roadmap, capacité, communication avec les métiers et le Comex.",
        },
        {
          question: "Ça marche avec plusieurs ARTs ?",
          answer:
            "Oui. Vue consolidée multi-train. Chaque ART garde son autonomie, vous avez une vision globale pour le pilotage transverse.",
        },
        {
          question: "Combien ça coûte ?",
          answer: "Prix accessible. Parlons-en lors d'une démo.",
        },
        {
          question: "Mes données Jira sont sales, c'est un problème ?",
          answer:
            "Non. Vous importez vos features puis vous nettoyez et structurez dans AirSaas avant de finaliser. Pas besoin de faire le ménage dans Jira.",
        },
        {
          question: "Combien de temps pour démarrer ?",
          answer:
            "1 PI pour être opérationnel. Pas 6 mois comme Jira Align. Accompagnement dédié par nos experts inclus.",
        },
      ],
    },
    finalCta: {
      heading: "Arrêtez le bricolage. Embarquez enfin les métiers.",
      description: "Rejoignez les RTE et PMO qui ont transformé leur pilotage.",
      videoTitle: "Découvrir l'outil PI Planning en vidéo (5 min)",
      videoDescription: "AirSaas pour les équipes SAFe, en action.",
      videoHref: "/fr/video/pi-planning",
    },
  },
];
