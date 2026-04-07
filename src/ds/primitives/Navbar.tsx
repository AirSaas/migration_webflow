"use client";

import { useState } from "react";
import { cn } from "@/ds/utils";
import { Button } from "@/ds/primitives/Button";

interface NavItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
}

interface NavbarProps {
  logo?: React.ReactNode;
  items: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  loginLabel?: string;
  loginHref?: string;
  flagIcon?: React.ReactNode;
  className?: string;
}

function AirSaasLogo() {
  return (
    <svg
      width="45"
      height="47"
      viewBox="0 0 45 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M23.1467 0L45 44.4294L22.4639 37.7365L29.1182 33.8645L33.9981 35.3165L23.1446 13.2607L13.5626 32.7303L25.7325 25.7469L28.2315 30.8216L0 47L23.1467 0Z"
        fill="var(--color-primary)"
      />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 1L4 4L7 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Navbar({
  logo,
  items,
  ctaLabel = "Demander une démo",
  ctaHref = "#",
  loginLabel,
  loginHref = "#",
  flagIcon = <span aria-label="Français">🇫🇷</span>,
  className,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "relative flex w-full max-w-[115rem] h-[6.375rem] items-center justify-between",
        "rounded-[1.5625rem] border border-border bg-white",
        "px-[1.875rem]",
        "shadow-[0px_4px_50px_0px_rgba(0,0,0,0.07)]",
        className,
      )}
    >
      {/* Logo */}
      <a href="/" aria-label="AirSaas" className="shrink-0">
        {logo ?? <AirSaasLogo />}
      </a>

      {/* Desktop nav items */}
      <ul className="hidden items-center gap-[1.5rem] xl:flex" role="menubar">
        {items.map((item) => (
          <li key={item.label} role="none">
            {item.hasDropdown ? (
              <button
                type="button"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={false}
                className="inline-flex items-center gap-[0.375rem] font-normal text-foreground transition-colors duration-150 hover:text-primary whitespace-nowrap"
                style={{ fontSize: "0.875rem" }}
              >
                {item.label}
                <ChevronDown className="mt-px" />
              </button>
            ) : (
              <a
                href={item.href ?? "#"}
                role="menuitem"
                className="font-normal text-foreground transition-colors duration-150 hover:text-primary whitespace-nowrap"
                style={{ fontSize: "0.875rem" }}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Right section: flag → login → CTA */}
      <div className="hidden items-center gap-[0.75rem] xl:flex shrink-0">
        {flagIcon && (
          <span className="text-[1.25rem]">{flagIcon}</span>
        )}
        {loginLabel && (
          <Button variant="tertiary" size="sm" href={loginHref}>
            {loginLabel}
          </Button>
        )}
        <Button variant="primary" size="sm" href={ctaHref}>
          {ctaLabel}
        </Button>
      </div>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        className="inline-flex items-center justify-center text-foreground xl:hidden"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className={cn(
            "absolute left-0 top-full z-50 mt-2 w-full",
            "rounded-[1.5625rem] border border-border bg-white",
            "p-[1.5rem] shadow-[0px_4px_50px_0px_rgba(0,0,0,0.07)]",
            "xl:hidden",
          )}
        >
          <ul className="flex flex-col gap-[1rem]" role="menu">
            {items.map((item) => (
              <li key={item.label} role="none">
                {item.hasDropdown ? (
                  <button
                    type="button"
                    role="menuitem"
                    aria-haspopup="true"
                    aria-expanded={false}
                    className="inline-flex w-full items-center gap-[0.375rem] font-normal text-foreground transition-colors duration-150 hover:text-primary"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {item.label}
                    <ChevronDown />
                  </button>
                ) : (
                  <a
                    href={item.href ?? "#"}
                    role="menuitem"
                    className="block font-normal text-foreground transition-colors duration-150 hover:text-primary"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-[1.5rem] flex flex-col gap-[0.75rem]">
            {loginLabel && (
              <Button variant="tertiary" size="sm" href={loginHref} className="w-full">
                {loginLabel}
              </Button>
            )}
            <Button variant="primary" size="sm" href={ctaHref} className="w-full">
              {ctaLabel}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
