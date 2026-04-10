/** Small 22×22 icons for Navbar dropdown items.
 *  Uses Font Awesome 6 Pro Regular glyphs via @font-face.
 */

interface NavIconProps {
  className?: string;
}

function FANavIcon({ char, className }: NavIconProps & { char: string }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: '"Font Awesome 6 Pro"',
        fontWeight: 400,
        color: "var(--color-primary)",
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        fontSize: "1rem",
      }}
    >
      {char}
    </span>
  );
}

/* ─── Solutions ─── */

/** U+F0B1 — briefcase (PMO) */
export function NavPmoIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF0B1"} {...props} />;
}

/** U+F233 — server (IT & Opérations) */
export function NavItIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF233"} {...props} />;
}

/** U+F0C0 — users (Comité de direction) */
export function NavComiteIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF0C0"} {...props} />;
}

/** U+F14E — compass (Direction de la transformation) */
export function NavDirectionIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF14E"} {...props} />;
}

/** U+F508 — user-tie (Experts de la Transfo) */
export function NavExpertIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF508"} {...props} />;
}

/* ─── Produit ─── */

/** U+F0AE — tasks / list-check (Priorisation) */
export function NavPriorisationIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF0AE"} {...props} />;
}

/** U+F080 — chart-bar (Capacitaire) */
export function NavCapacitaireIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF080"} {...props} />;
}

/** U+F0E0 — envelope (Email bilan) */
export function NavEmailIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF0E0"} {...props} />;
}

/** U+F1AB — language (Traduction) */
export function NavTraductionIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF1AB"} {...props} />;
}

/** U+F201 — chart-line (Reporting) */
export function NavReportingIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF201"} {...props} />;
}

/** U+F51E — coins (Budget) */
export function NavBudgetIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF51E"} {...props} />;
}

/* ─── Ressources ─── */

/** U+E533 — people-group (Communauté) */
export function NavCommunauteIcon(props: NavIconProps) {
  return <FANavIcon char={"\uE533"} {...props} />;
}

/** U+F1EA — newspaper (Blog) */
export function NavBlogIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF1EA"} {...props} />;
}

/** U+F130 — microphone (Podcast) */
export function NavPodcastIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF130"} {...props} />;
}

/** U+F19D — graduation-cap (Bootcamp) */
export function NavBootcampIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF19D"} {...props} />;
}

/** U+F133 — calendar (Évènements) */
export function NavEvenementsIcon(props: NavIconProps) {
  return <FANavIcon char={"\uF133"} {...props} />;
}
