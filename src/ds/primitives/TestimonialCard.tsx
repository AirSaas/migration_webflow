import { cn } from "@/ds/utils";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarSrc?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  name,
  role,
  avatarSrc,
  className,
}: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <article
      className={cn(
        "flex flex-col justify-between rounded-[1.5625rem] border border-primary-10 bg-white transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.05)]",
        className
      )}
      style={{ padding: "2.274rem", minHeight: "20.4375rem" }}
    >
      {/* Quote */}
      <p
        className="font-light text-foreground"
        style={{ fontSize: "1.5rem", lineHeight: "1.423" }}
      >
        {quote}
      </p>

      {/* User info */}
      <div className="flex flex-col gap-[0.43rem]">
        {/* Tag user — green pill */}
        <div
          className="inline-flex items-center gap-[0.516rem] self-start rounded-full bg-emerald"
          style={{ height: "2.41rem", paddingInline: "1.033rem" }}
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
