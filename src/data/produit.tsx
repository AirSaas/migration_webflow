/**
 * Produit pages data — hardcoded for Step 3.
 * Will be replaced by Strapi Collection Type `page` at Step 5.
 */

export type ProduitSection = {
  type: "heading" | "feature" | "cta" | "faq";
  heading?: React.ReactNode;
  description?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  reversed?: boolean;
  variant?: "default" | "card";
  buttonText?: string;
  faqItems?: { question: string; answer: string }[];
};

export type ProduitPageData = {
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
  sections: ProduitSection[];
  hasPress: boolean;
};

export const PRODUIT_PAGES: ProduitPageData[] = [
  // ─── 1. Capacity Planning ───
  {
    slug: "capacity-planning",
    meta: {
      title: "Capacity Planning : planifiez vos ressources efficacement | AirSaas",
      description:
        "Planifiez la charge de vos équipes et anticipez les besoins en ressources avec l'outil de capacity planning AirSaas.",
    },
    hero: {
      badge: "PRODUIT",
      heading: (
        <>
          <strong className="font-extrabold">Capacity planning</strong> : anticipez
          la charge de vos équipes
        </>
      ),
      description:
        "Visualisez en un coup d'œil la disponibilité de vos équipes, identifiez les surcharges et planifiez vos ressources pour garantir la réussite de vos projets.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Capacity planning AirSaas",
    },
    intro: {
      heading: (
        <>
          Pilotez la charge de vos équipes avec{" "}
          <strong className="font-extrabold">précision</strong>
        </>
      ),
      description:
        "Le capacity planning d'AirSaas vous permet de visualiser la charge prévisionnelle de vos équipes, d'identifier les goulots d'étranglement et d'arbitrer en connaissance de cause.",
    },
    sections: [
      {
        type: "feature",
        heading: "Vue d'ensemble de la charge par équipe",
        description:
          "Visualisez instantanément qui est surchargé et qui a de la bande passante. Notre vue capacitaire agrège automatiquement les données de vos projets pour vous donner une vision claire des disponibilités.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Vue charge équipe",
      },
      {
        type: "feature",
        heading: "Anticipez les besoins en ressources",
        description:
          "Projetez la charge sur les semaines à venir et identifiez les conflits de ressources avant qu'ils n'impactent vos projets. Prenez des décisions d'arbitrage éclairées.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Anticipation ressources",
      },
      {
        type: "cta",
        heading: (
          <>
            Prêt à optimiser votre{" "}
            <strong className="font-extrabold">capacity planning</strong> ?
          </>
        ),
        description:
          "Découvrez comment AirSaas vous aide à mieux planifier vos ressources et à livrer vos projets dans les temps.",
      },
      {
        type: "feature",
        heading: "Réallouez les ressources en temps réel",
        description:
          "Ajustez la répartition de la charge en quelques clics. Déplacez des personnes d'un projet à un autre et voyez immédiatement l'impact sur l'ensemble du portefeuille.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Réallocation ressources",
        variant: "card",
      },
      {
        type: "faq",
        heading: "Questions fréquentes sur le capacity planning",
        faqItems: [
          {
            question: "Qu'est-ce que le capacity planning ?",
            answer:
              "Le capacity planning est une méthode de gestion qui consiste à évaluer et planifier les ressources nécessaires pour mener à bien un ensemble de projets. Il permet d'optimiser l'utilisation des équipes et d'anticiper les besoins.",
          },
          {
            question: "Comment AirSaas facilite le capacity planning ?",
            answer:
              "AirSaas agrège automatiquement les données de charge de vos projets et les affiche dans une vue synthétique. Vous pouvez visualiser la disponibilité de chaque équipe et arbitrer en connaissance de cause.",
          },
          {
            question: "Le capacity planning est-il adapté à toutes les tailles d'équipe ?",
            answer:
              "Oui, que vous gériez 5 ou 500 personnes, AirSaas s'adapte à votre contexte. La vue capacitaire est pertinente dès que vous avez plusieurs projets en parallèle.",
          },
        ],
      },
    ],
    hasPress: true,
  },

  // ─── 2. Priorisation par équipes ───
  {
    slug: "priorisation-par-equipes",
    meta: {
      title: "Priorisation par équipes : alignez vos priorités | AirSaas",
      description:
        "Priorisez vos projets par équipe et assurez l'alignement entre direction et opérations avec AirSaas.",
    },
    hero: {
      badge: "PRODUIT",
      heading: (
        <>
          <strong className="font-extrabold">Priorisation</strong> par équipes :
          alignez vos projets sur les priorités
        </>
      ),
      description:
        "Définissez les priorités au bon niveau, synchronisez les équipes et assurez-vous que chaque projet contribue aux objectifs stratégiques de l'entreprise.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Priorisation par équipes AirSaas",
    },
    intro: {
      heading: (
        <>
          Alignez les équipes sur les{" "}
          <strong className="font-extrabold">bonnes priorités</strong>
        </>
      ),
      description:
        "La priorisation est au cœur de la réussite de vos transformations. AirSaas vous permet de hiérarchiser les projets avec vos équipes et de garantir que les ressources sont allouées aux initiatives à plus fort impact.",
    },
    sections: [
      {
        type: "feature",
        heading: "Priorisez avec des critères objectifs",
        description:
          "Évaluez chaque projet selon des critères personnalisables : valeur business, complexité, urgence. Obtenez un scoring automatique pour faciliter vos arbitrages.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Critères de priorisation",
      },
      {
        type: "feature",
        heading: "Visibilité partagée sur les priorités",
        description:
          "Chaque équipe voit ses priorités et comprend comment elles s'inscrivent dans la stratégie globale. Plus de silos, plus de confusion sur ce qui compte vraiment.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Visibilité priorités",
      },
      {
        type: "cta",
        heading: "Alignez vos équipes dès aujourd'hui",
        description:
          "Découvrez comment AirSaas transforme la priorisation de vos projets en un exercice collectif et éclairé.",
      },
      {
        type: "faq",
        heading: "Questions fréquentes sur la priorisation",
        faqItems: [
          {
            question: "Comment fonctionne la priorisation dans AirSaas ?",
            answer:
              "AirSaas vous permet de définir des critères de priorisation personnalisés et d'attribuer un score à chaque projet. Les équipes peuvent contribuer à l'évaluation, ce qui garantit un alignement collectif.",
          },
          {
            question: "Peut-on personnaliser les critères de priorisation ?",
            answer:
              "Absolument. Vous pouvez créer vos propres critères (valeur business, urgence, complexité, alignement stratégique…) et les pondérer selon votre contexte.",
          },
        ],
      },
    ],
    hasPress: true,
  },

  // ─── 3. Reporting projet ───
  {
    slug: "reporting-projet",
    meta: {
      title: "Reporting projet : des rapports clairs et automatisés | AirSaas",
      description:
        "Générez des rapports projet automatisés et partagez une vision claire de l'avancement avec AirSaas.",
    },
    hero: {
      badge: "PRODUIT",
      heading: (
        <>
          <strong className="font-extrabold">Reporting projet</strong> : des
          rapports clairs en quelques clics
        </>
      ),
      description:
        "Fini les heures passées à compiler des tableaux Excel. AirSaas génère automatiquement des rapports clairs et synthétiques que vous pouvez partager en un clic.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Reporting projet AirSaas",
    },
    intro: {
      heading: (
        <>
          Le reporting projet, enfin{" "}
          <strong className="font-extrabold">simple et automatisé</strong>
        </>
      ),
      description:
        "AirSaas transforme le reporting en un exercice fluide et instantané. Vos données sont toujours à jour, vos rapports toujours prêts à être partagés.",
    },
    sections: [
      {
        type: "feature",
        heading: "Rapports automatisés et toujours à jour",
        description:
          "Les rapports se génèrent automatiquement à partir des données de vos projets. Plus besoin de compiler manuellement des informations dispersées dans des fichiers Excel.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Rapports automatisés",
      },
      {
        type: "feature",
        heading: "Partagez en un clic avec les parties prenantes",
        description:
          "Envoyez vos flash reports par email ou partagez un lien direct. Les destinataires voient l'essentiel en un coup d'œil, sans avoir besoin d'un compte AirSaas.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Partage rapports",
      },
      {
        type: "cta",
        heading: "Simplifiez votre reporting dès maintenant",
        description:
          "Découvrez comment AirSaas automatise vos rapports projet et vous fait gagner des heures chaque semaine.",
      },
      {
        type: "faq",
        heading: "Questions fréquentes sur le reporting",
        faqItems: [
          {
            question: "Quels types de rapports peut-on générer ?",
            answer:
              "AirSaas génère des flash reports (résumé hebdomadaire de l'état du projet), des rapports de portefeuille (vue d'ensemble de tous les projets) et des rapports personnalisés selon vos besoins.",
          },
          {
            question: "Les rapports sont-ils personnalisables ?",
            answer:
              "Oui, vous pouvez choisir les indicateurs à afficher, le format et la fréquence d'envoi. Chaque rapport s'adapte à son audience.",
          },
        ],
      },
    ],
    hasPress: true,
  },

  // ─── 4. Automatiser la com' projet ───
  {
    slug: "automatiser-la-com-projet",
    meta: {
      title: "Automatiser la communication projet | AirSaas",
      description:
        "Automatisez la communication de vos projets et gardez toutes les parties prenantes informées avec AirSaas.",
    },
    hero: {
      badge: "PRODUIT",
      heading: (
        <>
          <strong className="font-extrabold">Automatisez</strong> la communication
          de vos projets
        </>
      ),
      description:
        "Ne perdez plus de temps à rédiger des emails de suivi. AirSaas automatise la communication projet pour garder tout le monde informé, sans effort.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Communication projet automatisée AirSaas",
    },
    intro: {
      heading: (
        <>
          La com&apos; projet,{" "}
          <strong className="font-extrabold">sans friction</strong>
        </>
      ),
      description:
        "AirSaas envoie automatiquement les bonnes informations aux bonnes personnes au bon moment. Fini les suivis manuels et les relances oubliées.",
    },
    sections: [
      {
        type: "feature",
        heading: "Notifications automatiques aux parties prenantes",
        description:
          "Configurez des notifications automatiques pour tenir informés sponsors, chefs de projet et équipes. Chaque changement de statut déclenche le bon message.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Notifications automatiques",
      },
      {
        type: "feature",
        heading: "Flash reports envoyés automatiquement",
        description:
          "Programmez l'envoi automatique de vos flash reports. Les parties prenantes reçoivent un résumé clair de l'avancement sans que vous ayez à lever le petit doigt.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Flash reports automatiques",
      },
      {
        type: "cta",
        heading: "Automatisez votre communication projet",
        description:
          "Découvrez comment AirSaas vous libère des tâches de communication répétitives et maintient tout le monde aligné.",
      },
      {
        type: "faq",
        heading: "Questions fréquentes sur l'automatisation",
        faqItems: [
          {
            question: "Quels canaux de communication sont supportés ?",
            answer:
              "AirSaas envoie des notifications par email et via la plateforme. L'intégration avec Microsoft Teams et Slack permet aussi de pousser les informations dans vos outils du quotidien.",
          },
          {
            question: "Peut-on personnaliser les messages envoyés ?",
            answer:
              "Oui, vous définissez le contenu, la fréquence et les destinataires de chaque notification. AirSaas s'adapte à votre workflow de communication.",
          },
        ],
      },
    ],
    hasPress: true,
  },

  // ─── 5. Budget ───
  {
    slug: "budget",
    meta: {
      title: "Suivi budgétaire projet : maîtrisez vos coûts | AirSaas",
      description:
        "Suivez les budgets de vos projets en temps réel et maîtrisez vos dépenses avec l'outil de gestion budgétaire AirSaas.",
    },
    hero: {
      badge: "PRODUIT",
      heading: (
        <>
          <strong className="font-extrabold">Budget</strong> projet : gardez le
          contrôle de vos dépenses
        </>
      ),
      description:
        "Suivez vos budgets projet en temps réel, anticipez les dépassements et prenez les bonnes décisions financières pour votre portefeuille de projets.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Suivi budgétaire AirSaas",
    },
    intro: {
      heading: (
        <>
          Le suivi budgétaire,{" "}
          <strong className="font-extrabold">simplifié et centralisé</strong>
        </>
      ),
      description:
        "AirSaas centralise le suivi budgétaire de tous vos projets en un seul endroit. Visualisez les dépenses réelles vs prévisionnelles et anticipez les dérives.",
    },
    sections: [
      {
        type: "feature",
        heading: "Vue consolidée des budgets",
        description:
          "Visualisez en un coup d'œil le budget consommé, le reste à faire et les écarts par rapport au prévisionnel. Au niveau d'un projet ou de l'ensemble du portefeuille.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Vue budgets consolidée",
      },
      {
        type: "feature",
        heading: "Alertes de dépassement budgétaire",
        description:
          "Recevez des alertes automatiques quand un projet approche ou dépasse son budget. Réagissez avant qu'il ne soit trop tard.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Alertes budget",
      },
      {
        type: "cta",
        heading: "Maîtrisez vos budgets projet",
        description:
          "Découvrez comment AirSaas vous aide à garder le contrôle financier de votre portefeuille de projets.",
      },
      {
        type: "faq",
        heading: "Questions fréquentes sur le suivi budgétaire",
        faqItems: [
          {
            question: "Comment suivre les dépenses dans AirSaas ?",
            answer:
              "AirSaas vous permet de saisir les dépenses réelles et de les comparer au budget prévisionnel. Vous pouvez suivre les coûts par poste, par phase ou par projet.",
          },
          {
            question: "Peut-on exporter les données budgétaires ?",
            answer:
              "Oui, les données budgétaires sont exportables en format Excel/CSV pour vos reportings financiers ou vos outils de comptabilité.",
          },
        ],
      },
    ],
    hasPress: true,
  },

  // ─── 6. Traduction DeepL ───
  {
    slug: "traduction-one-click-avec-deepl",
    meta: {
      title: "Traduction one-click avec DeepL | AirSaas",
      description:
        "Traduisez vos contenus projet en un clic grâce à l'intégration DeepL dans AirSaas. Collaborez sans barrières linguistiques.",
    },
    hero: {
      badge: "PRODUIT",
      heading: (
        <>
          <strong className="font-extrabold">Traduction one-click</strong> avec
          DeepL
        </>
      ),
      description:
        "Traduisez instantanément vos flash reports, descriptions de projets et commentaires grâce à l'intégration native de DeepL dans AirSaas.",
      image: "/assets/images/home_app_screen-min.png",
      imageAlt: "Traduction DeepL AirSaas",
    },
    intro: {
      heading: (
        <>
          Collaborez sans{" "}
          <strong className="font-extrabold">barrières linguistiques</strong>
        </>
      ),
      description:
        "Vos équipes sont internationales ? AirSaas intègre DeepL pour vous permettre de traduire n'importe quel contenu en un clic, directement depuis la plateforme.",
    },
    sections: [
      {
        type: "feature",
        heading: "Traduction instantanée depuis la plateforme",
        description:
          "Un bouton suffit pour traduire un flash report, une description de projet ou un commentaire. DeepL assure une qualité de traduction professionnelle dans plus de 30 langues.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Traduction instantanée",
      },
      {
        type: "feature",
        heading: "Idéal pour les équipes internationales",
        description:
          "Vos collaborateurs lisent les contenus dans leur langue, sans effort supplémentaire de la part des chefs de projet. La collaboration internationale devient fluide.",
        image: "/assets/images/home_app_screen-min.png",
        imageAlt: "Équipes internationales",
      },
      {
        type: "cta",
        heading: "Éliminez les barrières linguistiques",
        description:
          "Découvrez comment l'intégration DeepL dans AirSaas facilite la collaboration internationale sur vos projets.",
      },
      {
        type: "faq",
        heading: "Questions fréquentes sur la traduction",
        faqItems: [
          {
            question: "La traduction DeepL est-elle incluse dans l'abonnement ?",
            answer:
              "L'intégration DeepL est disponible dans les formules Business et Enterprise d'AirSaas. Un quota de traductions est inclus, extensible selon vos besoins.",
          },
          {
            question: "Quelles langues sont supportées ?",
            answer:
              "DeepL supporte plus de 30 langues dont le français, l'anglais, l'allemand, l'espagnol, le portugais, l'italien, le néerlandais, le polonais et bien d'autres.",
          },
        ],
      },
    ],
    hasPress: true,
  },
];
