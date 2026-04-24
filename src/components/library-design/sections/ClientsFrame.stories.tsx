import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClientsFrame } from "./ClientsFrame";
import { type ClientCardProps } from "@/components/library-design/ui/ClientCard";
import {
  IndustryIcon,
  CalendarDayIcon,
} from "@/components/library-design/ui/icons/illustration-icons";

const meta = {
  title: "Sections/Social Proof Sections/ClientsFrame",
  component: ClientsFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ClientsFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

const infoRows = (sector: string, employees: string) => [
  { icon: <IndustryIcon />, label: "Secteur", value: sector },
  { icon: <CalendarDayIcon />, label: "Effectif", value: employees },
];

const avatar = (initials: string) =>
  `https://placehold.co/180x180/e8eafc/3a51e2?text=${initials}`;

const nineClients: ClientCardProps[] = [
  {
    avatarSrc: avatar("ML"),
    avatarAlt: "Marie Leroy",
    name: "Marie Leroy",
    jobTitle: "DSI",
    companyName: "Veolia",
    infoRows: infoRows("Environnement", "220 000"),
  },
  {
    avatarSrc: avatar("JD"),
    avatarAlt: "Jean Dupont",
    name: "Jean Dupont",
    jobTitle: "PMO Lead",
    companyName: "Bouygues Télécom",
    infoRows: infoRows("Télécom", "8 500"),
  },
  {
    avatarSrc: avatar("SR"),
    avatarAlt: "Sophie Roux",
    name: "Sophie Roux",
    jobTitle: "Directrice de la transformation",
    companyName: "Intuis",
    infoRows: infoRows("Industrie", "1 400"),
  },
  {
    avatarSrc: avatar("AM"),
    avatarAlt: "Antoine Martin",
    name: "Antoine Martin",
    jobTitle: "Head of PMO",
    companyName: "Groupe SEB",
    infoRows: infoRows("Biens de conso.", "33 000"),
  },
  {
    avatarSrc: avatar("CL"),
    avatarAlt: "Claire Laurent",
    name: "Claire Laurent",
    jobTitle: "Chief Digital Officer",
    companyName: "Pôle Emploi",
    infoRows: infoRows("Service public", "54 000"),
  },
  {
    avatarSrc: avatar("FB"),
    avatarAlt: "Florent Berger",
    name: "Florent Berger",
    jobTitle: "Portfolio Manager",
    companyName: "Crédit Agricole",
    infoRows: infoRows("Banque", "142 000"),
  },
  {
    avatarSrc: avatar("IM"),
    avatarAlt: "Inès Moreau",
    name: "Inès Moreau",
    jobTitle: "Transformation Lead",
    companyName: "Engie",
    infoRows: infoRows("Énergie", "96 000"),
  },
  {
    avatarSrc: avatar("TP"),
    avatarAlt: "Thomas Petit",
    name: "Thomas Petit",
    jobTitle: "IT Steering",
    companyName: "La Poste",
    infoRows: infoRows("Service public", "249 000"),
  },
  {
    avatarSrc: avatar("CV"),
    avatarAlt: "Camille Vidal",
    name: "Camille Vidal",
    jobTitle: "PMO Senior",
    companyName: "Vinci",
    infoRows: infoRows("Construction", "220 000"),
  },
];

/**
 * Canonical usage — 9 clients in 3×3 grid on tinted background.
 * Matches the "Laissez nos clients vous parler d'AirSaas" pattern used on
 * the PMO Tool page.
 */
export const Default9ClientsTinted: Story = {
  args: {
    title: "Laissez nos clients",
    titleHighlight: "vous parler d'AirSaas",
    subtitle:
      "Qui de mieux pour vous parler de la plateforme que ceux qui l'utilisent au quotidien pour améliorer la gestion de leurs projets de transformation ?",
    clients: nineClients,
  },
};

/**
 * With collection CTA — "Découvrir tous nos clients" button below the grid
 * links to the full client collection page.
 */
export const WithCollectionCta: Story = {
  args: {
    ...Default9ClientsTinted.args,
    collectionCtaLabel: "Découvrir tous nos clients",
    collectionCtaHref: "/clients",
  },
};

/**
 * Light variant — white background (no tinted section).
 */
export const Light: Story = {
  args: {
    ...Default9ClientsTinted.args,
    variant: "light",
  },
};

/**
 * Minimum bound — exactly 6 clients. Verifies the 2-row layout still feels
 * balanced.
 */
export const MinimumSixClients: Story = {
  args: {
    title: "Ils nous font",
    titleHighlight: "confiance",
    clients: nineClients.slice(0, 6),
    collectionCtaLabel: "Voir tous nos clients",
    collectionCtaHref: "/clients",
  },
};
