import { cn } from "@/lib/utils";

function LinkedInIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#li-clip)">
        <path fillRule="evenodd" clipRule="evenodd" d="M8 72H64C68.4183 72 72 68.4183 72 64V8C72 3.58172 68.4183 0 64 0H8C3.58172 0 0 3.58172 0 8V64C0 68.4183 3.58172 72 8 72Z" fill="#007EBB" />
        <path fillRule="evenodd" clipRule="evenodd" d="M62 62H51.3156V43.8021C51.3156 38.8128 49.4198 36.0245 45.4707 36.0245C41.1746 36.0245 38.9301 38.9261 38.9301 43.8021V62H28.6333V27.3333H38.9301V32.0029C38.9301 32.0029 42.026 26.2742 49.3826 26.2742C56.7357 26.2742 62 30.7645 62 40.0512V62ZM16.3493 22.794C12.8421 22.794 10 19.9297 10 16.397C10 12.8644 12.8421 10 16.3493 10C19.8566 10 22.697 12.8644 22.697 16.397C22.697 19.9297 19.8566 22.794 16.3493 22.794ZM11.0326 62H21.7694V27.3333H11.0326V62Z" fill="white" />
      </g>
      <defs>
        <clipPath id="li-clip">
          <rect width="72" height="72" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Badge colors from Figma DS palette */
const BADGE_COLORS = [
  "var(--color-success, #03e26b)",
  "var(--color-primary, #3c51e2)",
  "var(--color-secondary, #061333)",
  "var(--color-orange, #ff922b)",
  "var(--color-warning, #ff0a55)",
  "var(--color-terracotta, #d9480f)",
  "var(--color-primary-70, #6b7be9)",
  "var(--color-secondary-70, #50596f)",
];

/** Deterministic color from name so it stays stable across renders */
function nameToColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BADGE_COLORS[Math.abs(hash) % BADGE_COLORS.length];
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarSrc?: string;
  /** Optional LinkedIn profile URL */
  linkedinHref?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  name,
  role,
  avatarSrc,
  linkedinHref,
  className,
}: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  const badgeColor = nameToColor(name);

  return (
    <article
      className={cn(
        "flex flex-col justify-between rounded-[1.25rem] md:rounded-[1.5625rem] border border-primary-10 bg-white transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.05)]",
        className
      )}
      style={{ padding: "1.5rem", minHeight: "auto", rowGap: "0.8rem" }}
    >
      {/* Quote */}
      <p
        className="font-light text-foreground"
        style={{ fontSize: "1.15rem", lineHeight: "1.45" }}
      >
        {quote}
      </p>

      {/* User info */}
      <div className="flex flex-col gap-[0.43rem]">
        {/* Row: colored pill + optional LinkedIn */}
        <div className="flex items-center justify-between">
          {/* Tag user — colored pill */}
          <div
            className="inline-flex items-center gap-[0.516rem] rounded-full"
            style={{ height: "2.41rem", paddingInline: "1.033rem", backgroundColor: badgeColor }}
          >
            {/* Avatar */}
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt=""
                className="rounded-full object-cover"
                style={{ width: "1.721rem", height: "1.721rem" }}
                loading="lazy"
              />
            ) : (
              <span
                className="flex items-center justify-center rounded-full bg-white/30 text-white font-bold"
                style={{ width: "1.721rem", height: "1.721rem", fontSize: "0.625rem" }}
              >
                {initials}
              </span>
            )}
            {/* Name */}
            <span
              className="font-bold text-white whitespace-nowrap"
              style={{ fontSize: "1.119rem", lineHeight: "1.68rem" }}
            >
              {name}
            </span>
          </div>

          {/* LinkedIn icon */}
          {linkedinHref && (
            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Profil LinkedIn de ${name}`}
              className="shrink-0 transition-opacity hover:opacity-80"
            >
              <LinkedInIcon />
            </a>
          )}
        </div>

        {/* Role */}
        <span
          className="text-text-light"
          style={{ fontSize: "1.119rem", lineHeight: "1.68rem" }}
        >
          {role}
        </span>
      </div>
    </article>
  );
}
