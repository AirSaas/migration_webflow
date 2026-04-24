import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";
import { Button, type ButtonVariant } from "@/components/library-design/ui/Button";
import {
  ClientCard,
  type ClientCardProps,
} from "@/components/library-design/ui/ClientCard";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

/**
 * ClientsFrame
 *
 * @purpose    Section wrapper for a large grid of <ClientCard> items — avatar +
 *             name + role + company + metadata rows. Dense social-proof block
 *             for when the page needs to show 6–9 clients at once without
 *             quotes ("Ils nous font confiance", "Laissez nos clients vous
 *             parler d'AirSaas"). Grid locked at 3 columns on desktop (lg);
 *             an optional CTA below links to the full client collection.
 * @useWhen    Equipes / Solution type-B pages surfacing 6–9 client cards as
 *             a dense trust signal. Grid renders 1 col mobile → 2 col md →
 *             3 col lg (fixed).
 * @dontUse    For fewer than 6 clients (use <TestimonialsFrame> +
 *             <TestimonialCard>). For quote-based testimonials (use
 *             <TestimonialsFrame> + <TestimonialCard>). For company-logo-only
 *             social proof with no metadata (use <LogosBar>).
 *
 * @limits
 *   - titleHighlight: max 40 chars
 *   - title: max 80 chars
 *   - subtitle: max 260 chars
 *   - clients: 6–9 items (below 6 looks sparse; above 9 breaks the 3×3 rhythm
 *     — use the collection CTA for overflow)
 *   - collectionCtaLabel: max 36 chars
 *
 * @forbidden
 *   - Do NOT use for fewer than 6 clients — use <TestimonialsFrame>
 *   - Do NOT pass className with bg / text / font / padding overrides
 *   - Do NOT mix clients prop AND children — children wins, clients ignored
 *   - Do NOT nest another ClientsFrame inside a client card
 *   - Do NOT hardcode collectionCtaLabel locale copy — pass via i18n
 */

interface ClientsFrameProps {
  variant?: "light" | "tinted";
  /** Dark-to-primary gradient portion of the title (rendered first). */
  title: string;
  /**
   * Primary-gradient portion of the title (rendered AFTER `title`, with a
   * space between). Used to emphasize the trailing phrase — matches the
   * "[dark sentence] [primary ending]" convention of client-grid headings
   * ("Laissez nos clients [vous parler d'AirSaas]").
   */
  titleHighlight?: string;
  subtitle?: string;
  /** Typed array of client cards. Ignored if `children` is provided. */
  clients?: ClientCardProps[];
  /** Flexible mode: pass any card arrangement as children (overrides `clients`). */
  children?: React.ReactNode;
  /**
   * Label for the optional "view all clients" CTA rendered below the grid.
   * Locale-driven — no default, pass translated via next-intl. When both
   * `collectionCtaLabel` and `collectionCtaHref` are provided, the CTA is
   * shown; otherwise it is omitted.
   */
  collectionCtaLabel?: string;
  /** Destination URL for the collection CTA. */
  collectionCtaHref?: string;
  /** Visual style for the collection CTA. Default "tertiary" (outline). */
  collectionCtaVariant?: ButtonVariant;
  /** Optional DOM id on the root <section> — scroll-spy target for TabsFrame / TocSidebar. */
  id?: string;
  className?: string;
}

export function ClientsFrame({
  variant = "tinted",
  title,
  titleHighlight,
  subtitle,
  clients,
  children,
  collectionCtaLabel,
  collectionCtaHref,
  collectionCtaVariant = "tertiary",
  id,
  className,
}: ClientsFrameProps) {
  if (titleHighlight)
    assertMaxLength("ClientsFrame", "titleHighlight", titleHighlight, 40);
  assertMaxLength("ClientsFrame", "title", title, 80);
  if (subtitle) assertMaxLength("ClientsFrame", "subtitle", subtitle, 260);
  if (!children && clients)
    assertArrayBounds("ClientsFrame", "clients", clients, 6, 9);
  if (collectionCtaLabel)
    assertMaxLength(
      "ClientsFrame",
      "collectionCtaLabel",
      collectionCtaLabel,
      36,
    );
  assertNoClassNameOverride("ClientsFrame", className, [
    "bg-",
    "text-",
    "font-",
    "p-",
  ]);

  const isTinted = variant === "tinted";
  const showCta = Boolean(collectionCtaLabel && collectionCtaHref);

  return (
    <section
      id={id}
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.125rem] lg:px-[10rem] lg:py-[6.25rem]",
        isTinted ? "bg-primary-2" : "bg-white",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
        <Heading level={2} gradient="none" align="center">
          <GradientText gradient="dark-to-primary">{title}</GradientText>
          {titleHighlight && " "}
          {titleHighlight && (
            <GradientText gradient="primary">{titleHighlight}</GradientText>
          )}
        </Heading>

        {subtitle && (
          <Text size="md" align="center" maxWidth="60rem">
            {subtitle}
          </Text>
        )}
      </div>

      <div className="grid w-full grid-cols-1 items-stretch gap-[1.5rem] md:grid-cols-2 lg:grid-cols-3">
        {children ??
          clients?.map((c, i) => <ClientCard key={i} {...c} />)}
      </div>

      {showCta && (
        <Button
          variant={collectionCtaVariant}
          size="md"
          href={collectionCtaHref}
        >
          {collectionCtaLabel}
        </Button>
      )}
    </section>
  );
}
