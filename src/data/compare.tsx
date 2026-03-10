/**
 * Compare pages data — hardcoded for Step 3.
 * Will be replaced by Strapi Collection Type `page` at Step 5.
 */

export type CompareSection = {
  type: "heading" | "feature" | "cta" | "comparison" | "faq";
  heading?: React.ReactNode;
  description?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  reversed?: boolean;
  variant?: "default" | "card";
  buttonText?: string;
  // For comparison type
  competitorName?: string;
  rows?: {
    feature: string;
    description: string;
    airsaas: boolean;
    competitor: boolean;
  }[];
  // For faq type
  faqItems?: { question: string; answer: string }[];
};

export type ComparePageData = {
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
  sections: CompareSection[];
  hasPress: boolean;
};

export const COMPARE_PAGES: ComparePageData[] = [
  // ─── 1. Alternative Triskell PPM ───
  {
    slug: "alternative-triskell-ppm",
    meta: {
      title: "Alternative à Triskell PPM : découvrez AirSaas | AirSaas",
      description:
        "Vous cherchez une alternative à Triskell PPM ? Découvrez AirSaas, l'outil de gestion de portefeuille projet pensé pour les PMO et DSI.",
    },
    hero: {
      heading: (
        <>
          L&apos;alternative à{" "}
          <strong className="font-extrabold">Triskell PPM</strong> pensée pour les
          pros de la transformation
        </>
      ),
      description:
        "Vous cherchez un outil PPM plus intuitif que Triskell ? AirSaas a été conçu pour les PMO et DSI qui veulent piloter leur portefeuille de projets sans complexité inutile.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Alternative Triskell PPM",
    },
    intro: {
      heading: (
        <>
          Pourquoi choisir AirSaas plutôt que{" "}
          <strong className="font-extrabold">Triskell</strong> ?
        </>
      ),
      description:
        "AirSaas et Triskell PPM partagent le même objectif : piloter un portefeuille de projets. Mais AirSaas mise sur la simplicité et l'adoption rapide plutôt que sur la complexité fonctionnelle.",
    },
    sections: [
      {
        type: "comparison",
        heading: (
          <>
            AirSaas vs <strong className="font-extrabold">Triskell PPM</strong>
          </>
        ),
        description:
          "Comparez les fonctionnalités clés des deux solutions pour faire le meilleur choix pour votre organisation.",
        competitorName: "Triskell",
        rows: [
          {
            feature: "Prise en main rapide",
            description:
              "Interface intuitive, pas besoin de formation de plusieurs jours",
            airsaas: true,
            competitor: false,
          },
          {
            feature: "Flash reports automatisés",
            description:
              "Rapports d'avancement générés automatiquement et envoyés par email",
            airsaas: true,
            competitor: false,
          },
          {
            feature: "Vue portefeuille consolidée",
            description:
              "Vision globale de tous les projets avec indicateurs clés",
            airsaas: true,
            competitor: true,
          },
          {
            feature: "Gestion budgétaire",
            description: "Suivi des budgets par projet et par portefeuille",
            airsaas: true,
            competitor: true,
          },
          {
            feature: "Capacity planning",
            description:
              "Planification de la charge des équipes et allocation des ressources",
            airsaas: true,
            competitor: true,
          },
          {
            feature: "Déploiement SaaS rapide",
            description:
              "Mise en place en quelques jours, pas en plusieurs mois",
            airsaas: true,
            competitor: false,
          },
        ],
      },
      {
        type: "feature",
        heading: "Une adoption 3x plus rapide",
        description:
          "AirSaas a été conçu pour être adopté en quelques jours, pas en quelques mois. L'interface intuitive et le onboarding guidé garantissent une prise en main rapide par toutes les équipes.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Adoption rapide AirSaas",
      },
      {
        type: "feature",
        heading: "Le reporting qui se fait tout seul",
        description:
          "Là où Triskell nécessite de configurer des rapports complexes, AirSaas génère automatiquement des flash reports clairs et prêts à être partagés.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Reporting automatique",
      },
      {
        type: "cta",
        heading: "Passez à AirSaas",
        description:
          "Rejoignez les entreprises qui ont choisi AirSaas comme alternative à Triskell PPM. Démo gratuite, migration accompagnée.",
      },
      {
        type: "faq",
        heading: "Questions fréquentes",
        faqItems: [
          {
            question: "Est-il facile de migrer depuis Triskell vers AirSaas ?",
            answer:
              "Oui, notre équipe vous accompagne dans la migration de vos données. Le processus prend généralement quelques jours et nous nous assurons que toutes vos informations sont transférées correctement.",
          },
          {
            question: "AirSaas convient-il aux grandes entreprises ?",
            answer:
              "Absolument. AirSaas accompagne des entreprises de toutes tailles, de la PME au grand groupe. Notre architecture SaaS garantit la performance même avec des centaines de projets.",
          },
          {
            question: "Quelles intégrations sont disponibles ?",
            answer:
              "AirSaas s'intègre avec Microsoft Teams, Slack, Jira, Azure DevOps, et propose une API ouverte pour vos intégrations personnalisées.",
          },
        ],
      },
    ],
    hasPress: true,
  },

  // ─── 2. Alternative Planview Portfolio ───
  {
    slug: "alternative-planview-portfolio",
    meta: {
      title: "Alternative à Planview : découvrez AirSaas | AirSaas",
      description:
        "Vous cherchez une alternative à Planview ? Découvrez AirSaas, l'outil de gestion de portefeuille projet plus simple et plus rapide à déployer.",
    },
    hero: {
      heading: (
        <>
          L&apos;alternative à{" "}
          <strong className="font-extrabold">Planview</strong> qui mise sur la
          simplicité
        </>
      ),
      description:
        "Planview est puissant mais complexe. AirSaas vous offre les fonctionnalités essentielles du PPM dans une interface que vos équipes adopteront réellement.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Alternative Planview",
    },
    intro: {
      heading: (
        <>
          Pourquoi choisir AirSaas plutôt que{" "}
          <strong className="font-extrabold">Planview</strong> ?
        </>
      ),
      description:
        "Planview est un mastodonte du PPM. Mais avez-vous vraiment besoin de toute cette complexité ? AirSaas se concentre sur l'essentiel : piloter, communiquer, décider.",
    },
    sections: [
      {
        type: "comparison",
        heading: (
          <>
            AirSaas vs <strong className="font-extrabold">Planview</strong>
          </>
        ),
        description:
          "Comparez les deux solutions sur les critères qui comptent pour votre organisation.",
        competitorName: "Planview",
        rows: [
          {
            feature: "Time-to-value",
            description: "Délai entre l'achat et l'utilisation productive",
            airsaas: true,
            competitor: false,
          },
          {
            feature: "Facilité d'utilisation",
            description: "Interface intuitive accessible à tous les profils",
            airsaas: true,
            competitor: false,
          },
          {
            feature: "Flash reports",
            description:
              "Rapports d'avancement automatiques pour les parties prenantes",
            airsaas: true,
            competitor: false,
          },
          {
            feature: "Gestion de portefeuille",
            description: "Vue consolidée et arbitrages multi-projets",
            airsaas: true,
            competitor: true,
          },
          {
            feature: "Gestion des ressources",
            description: "Capacity planning et allocation des équipes",
            airsaas: true,
            competitor: true,
          },
          {
            feature: "Coût total de possession",
            description:
              "Licence + implémentation + formation + maintenance",
            airsaas: true,
            competitor: false,
          },
        ],
      },
      {
        type: "feature",
        heading: "Déploiement en jours, pas en mois",
        description:
          "Là où Planview nécessite un projet d'implémentation de plusieurs mois avec des consultants, AirSaas se déploie en quelques jours. Vos équipes sont productives immédiatement.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Déploiement rapide",
      },
      {
        type: "feature",
        heading: "Un coût transparent et maîtrisé",
        description:
          "Pas de coûts cachés d'implémentation, de personnalisation ou de formation. AirSaas propose une tarification simple et prévisible.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Tarification transparente",
      },
      {
        type: "cta",
        heading: "Simplifiez votre PPM",
        description:
          "Découvrez pourquoi les entreprises qui cherchent une alternative à Planview choisissent AirSaas.",
      },
      {
        type: "faq",
        heading: "Questions fréquentes",
        faqItems: [
          {
            question: "AirSaas peut-il remplacer Planview pour un grand groupe ?",
            answer:
              "Oui, AirSaas accompagne des grands groupes avec des centaines de projets. Si votre besoin principal est le pilotage de portefeuille et la communication projet, AirSaas est une excellente alternative.",
          },
          {
            question: "Comment se passe la migration depuis Planview ?",
            answer:
              "Notre équipe vous accompagne pour importer vos données projet. Nous avons l'expérience de migrations depuis Planview et le processus est bien rodé.",
          },
        ],
      },
    ],
    hasPress: true,
  },

  // ─── 3. Alternative Sciforma ───
  {
    slug: "alternative-sciforma",
    meta: {
      title: "Alternative à Sciforma : découvrez AirSaas | AirSaas",
      description:
        "Vous cherchez une alternative à Sciforma ? Découvrez AirSaas, la solution PPM moderne, intuitive et rapide à déployer.",
    },
    hero: {
      heading: (
        <>
          L&apos;alternative à{" "}
          <strong className="font-extrabold">Sciforma</strong> pour un PPM moderne
          et intuitif
        </>
      ),
      description:
        "Sciforma offre des fonctionnalités PPM complètes mais son interface peut freiner l'adoption. AirSaas propose une approche moderne qui séduit les utilisateurs.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Alternative Sciforma",
    },
    intro: {
      heading: (
        <>
          Pourquoi choisir AirSaas plutôt que{" "}
          <strong className="font-extrabold">Sciforma</strong> ?
        </>
      ),
      description:
        "Sciforma est un acteur historique du PPM. AirSaas est né de la conviction qu'un outil PPM doit être aussi simple qu'un outil grand public pour être réellement adopté.",
    },
    sections: [
      {
        type: "comparison",
        heading: (
          <>
            AirSaas vs <strong className="font-extrabold">Sciforma</strong>
          </>
        ),
        description:
          "Découvrez ce qui différencie AirSaas de Sciforma sur les critères essentiels.",
        competitorName: "Sciforma",
        rows: [
          {
            feature: "Interface moderne",
            description:
              "UX pensée pour les utilisateurs de 2024, pas les années 2000",
            airsaas: true,
            competitor: false,
          },
          {
            feature: "Adoption utilisateur",
            description: "Taux d'adoption élevé grâce à la simplicité d'usage",
            airsaas: true,
            competitor: false,
          },
          {
            feature: "Flash reports",
            description:
              "Communication automatisée vers les parties prenantes",
            airsaas: true,
            competitor: false,
          },
          {
            feature: "Gestion de portefeuille",
            description:
              "Priorisation, arbitrage et suivi multi-projets",
            airsaas: true,
            competitor: true,
          },
          {
            feature: "Gestion des ressources avancée",
            description:
              "Planification fine des ressources avec compétences",
            airsaas: true,
            competitor: true,
          },
          {
            feature: "SaaS natif",
            description:
              "Solution 100% cloud, mises à jour automatiques",
            airsaas: true,
            competitor: false,
          },
        ],
      },
      {
        type: "feature",
        heading: "Une UX qui fait la différence",
        description:
          "L'interface d'AirSaas a été conçue pour que chaque utilisateur s'y retrouve dès la première connexion. Pas de formation de 3 jours nécessaire, pas de résistance au changement.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "UX moderne AirSaas",
      },
      {
        type: "feature",
        heading: "Communication projet intégrée",
        description:
          "AirSaas ne se contente pas de collecter des données : il les diffuse. Flash reports, notifications, partage avec les parties prenantes externes — la communication est au cœur de l'outil.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Communication projet",
      },
      {
        type: "cta",
        heading: "Modernisez votre PPM",
        description:
          "Rejoignez les entreprises qui ont remplacé Sciforma par AirSaas. Démo gratuite et migration accompagnée.",
      },
      {
        type: "faq",
        heading: "Questions fréquentes",
        faqItems: [
          {
            question: "AirSaas propose-t-il la gestion des ressources comme Sciforma ?",
            answer:
              "Oui, AirSaas propose le capacity planning et l'allocation des ressources. Si vous avez besoin de la planification fine par compétences, notre équipe peut vous montrer comment AirSaas répond à ce besoin.",
          },
          {
            question: "Le passage de Sciforma à AirSaas est-il complexe ?",
            answer:
              "Non, notre équipe accompagne la migration et le transfert des données. Le déploiement d'AirSaas est rapide et nos clients sont opérationnels en quelques jours.",
          },
          {
            question: "AirSaas est-il conforme au RGPD ?",
            answer:
              "Oui, AirSaas est une solution française hébergée en Europe. Nous sommes pleinement conformes au RGPD et proposons un DPA à nos clients.",
          },
        ],
      },
    ],
    hasPress: true,
  },
];
