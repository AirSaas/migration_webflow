"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonVariant } from "@/components/library-design/ui/Button";
import { NavbarDropdown, type NavbarDropdownItem } from "@/components/library-design/ui/NavbarDropdown";
import { assertMaxLength, assertArrayBounds } from "@/lib/ds-validators";

/**
 * Navbar
 *
 * @purpose    Top-of-page navigation. Logo + links (flat or with dropdown) + optional
 *             flag / locale / login / CTA.
 * @useWhen    On every marketing / product page as the first interactive element.
 *             Mount inside a `<Hero>` so it picks up the hero background gradient.
 * @dontUse    For in-app chrome / admin layouts — build a dedicated component.
 *
 * @limits
 *   - items: 2–9 top-level items (past that the nav overflows on desktop)
 *   - dropdownItems per menu: 2–10
 *   - ctaLabel: max 24 chars
 *   - loginLabel: max 12 chars
 *
 * @forbidden
 *   - Do NOT hardcode text inside the Navbar file — all copy comes from props
 *     (callers pass translated strings via next-intl / CMS)
 *   - Do NOT override typography / color via className — extend the DS if needed
 *   - Do NOT pass an image `<img>` as `logo` — use an inline SVG so it adopts
 *     currentColor and scales cleanly
 *
 * @figma node-id 123-55815
 */

export interface NavItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
  /** Dropdown items — rendered when hasDropdown is true */
  dropdownItems?: NavbarDropdownItem[];
}

interface NavbarProps {
  /** Brand logo node. Use an inline SVG for best quality. Falls back to the AirSaas logo. */
  logo?: React.ReactNode;
  /** Href the logo links to. Defaults to "/". */
  logoHref?: string;
  /** Accessible label for the logo link. */
  logoAriaLabel?: string;

  /** Navigation items (required) */
  items: NavItem[];

  /** Primary CTA in the right section. Rendered when `ctaLabel` is provided. */
  ctaLabel?: string;
  ctaHref?: string;
  /** Button variant for the CTA. Defaults to "primary". */
  ctaVariant?: ButtonVariant;

  /** Optional secondary login / quiet link before the CTA */
  loginLabel?: string;
  loginHref?: string;

  /** Locale flag or selector. Pass any React node. */
  flagIcon?: React.ReactNode;

  /** ARIA label for the <nav> element. */
  ariaLabel?: string;

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

const NAV_LINK_CLASSES = "font-normal text-sm whitespace-nowrap transition-colors duration-150";

export function Navbar({
  logo,
  logoHref = "/",
  logoAriaLabel = "Home",
  items,
  ctaLabel,
  ctaHref = "#",
  ctaVariant = "primary",
  loginLabel,
  loginHref = "#",
  flagIcon,
  ariaLabel = "Main navigation",
  className,
}: NavbarProps) {
  assertArrayBounds("Navbar", "items", items, 2, 9);
  if (ctaLabel) assertMaxLength("Navbar", "ctaLabel", ctaLabel, 24);
  if (loginLabel) assertMaxLength("Navbar", "loginLabel", loginLabel, 12);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobile menu: Escape to close, focus trap, return focus to hamburger on close.
  useEffect(() => {
    if (!mobileOpen) return;

    const menu = mobileMenuRef.current;
    if (!menu) return;

    // Focus first interactive element in the menu
    const focusables = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusables[0]?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  return (
    <nav
      ref={navRef}
      aria-label={ariaLabel}
      className={cn(
        "relative flex w-full max-w-[115rem] h-[4rem] md:h-[5rem] lg:h-[6.375rem] items-center justify-between",
        "rounded-[1rem] md:rounded-[1.25rem] lg:rounded-[1.5625rem] border border-border bg-white",
        "px-[1rem] md:px-[1.5rem] lg:px-[1.875rem]",
        className,
      )}
      style={{ boxShadow: "var(--shadow-floating)" }}
    >
      {/* Logo */}
      <a href={logoHref} aria-label={logoAriaLabel} className="shrink-0">
        {logo ?? <AirSaasLogo />}
      </a>

      {/* Desktop nav items */}
      <ul className="hidden items-center gap-[1.5rem] xl:flex" role="menubar">
        {items.map((item) => (
          <li key={item.label} role="none" className="relative">
            {item.hasDropdown ? (
              <>
                <button
                  type="button"
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === item.label}
                  className={cn(
                    NAV_LINK_CLASSES,
                    "inline-flex items-center gap-[0.375rem]",
                    openDropdown === item.label ? "text-primary" : "text-foreground hover:text-primary",
                  )}
                  onClick={() =>
                    setOpenDropdown((prev) =>
                      prev === item.label ? null : item.label
                    )
                  }
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "mt-px transition-transform duration-200",
                      openDropdown === item.label && "rotate-180",
                    )}
                  />
                </button>
                {/* Dropdown panel */}
                {openDropdown === item.label && item.dropdownItems && (
                  <div className="absolute left-0 top-full pt-[0.75rem] z-50">
                    <NavbarDropdown items={item.dropdownItems} />
                  </div>
                )}
              </>
            ) : (
              <a
                href={item.href ?? "#"}
                role="menuitem"
                className={cn(NAV_LINK_CLASSES, "text-foreground hover:text-primary")}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Right section: flag → login → CTA */}
      <div className="hidden items-center gap-[0.75rem] xl:flex shrink-0">
        {flagIcon && <span style={{ fontSize: "1.25rem" }}>{flagIcon}</span>}
        {loginLabel && (
          <Button variant="tertiary" size="sm" href={loginHref}>
            {loginLabel}
          </Button>
        )}
        {ctaLabel && (
          <Button variant={ctaVariant} size="sm" href={ctaHref}>
            {ctaLabel}
          </Button>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        ref={hamburgerRef}
        type="button"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        className="inline-flex items-center justify-center text-foreground xl:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className={cn(
            "absolute left-0 top-full z-50 mt-2 w-full",
            "rounded-[1.5625rem] border border-border bg-white",
            "p-[1.5rem]",
            "xl:hidden",
          )}
          style={{ boxShadow: "var(--shadow-floating)" }}
        >
          <ul className="flex flex-col gap-[1rem]" role="menu">
            {items.map((item) => (
              <li key={item.label} role="none">
                {item.hasDropdown ? (
                  <>
                    <button
                      type="button"
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={openDropdown === item.label}
                      className={cn(
                        NAV_LINK_CLASSES,
                        "inline-flex w-full items-center gap-[0.375rem]",
                        openDropdown === item.label ? "text-primary" : "text-foreground hover:text-primary",
                      )}
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "transition-transform duration-200",
                          openDropdown === item.label && "rotate-180",
                        )}
                      />
                    </button>
                    {openDropdown === item.label && item.dropdownItems && (
                      <div className="mt-[0.5rem]">
                        <NavbarDropdown items={item.dropdownItems} />
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href ?? "#"}
                    role="menuitem"
                    className={cn(NAV_LINK_CLASSES, "block text-foreground hover:text-primary")}
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
            {ctaLabel && (
              <Button variant={ctaVariant} size="sm" href={ctaHref} className="w-full">
                {ctaLabel}
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
