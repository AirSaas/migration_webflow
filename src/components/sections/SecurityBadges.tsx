import { Container } from "@/components/ui/Container";

const BADGES = [
  { title: "ISO 27001", description: "Certifié" },
  { title: "Hébergé en France", description: "Scaleway" },
  { title: "Pentest", description: "Résultats sur demande" },
  { title: "SSO / SAML", description: "Intégration AD" },
];

type SecurityBadgesProps = {
  heading?: string;
  description?: string;
};

export function SecurityBadges({
  heading = "Sécurité au top",
  description = "AirSaas passe la porte des DSI les plus exigeantes.",
}: SecurityBadgesProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-[2rem] font-semibold">{heading}</h2>
          <p className="mt-3 text-[17px] text-text-secondary">{description}</p>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {BADGES.map((badge) => (
            <div
              key={badge.title}
              className="rounded-xl border border-border p-6 text-center"
            >
              <h3 className="text-lg font-bold">{badge.title}</h3>
              <p className="mt-1 text-sm text-text-secondary">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
