"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { cn } from "@/lib/utils";
import { assertNoClassNameOverride } from "@/lib/ds-validators";

/**
 * LottiePlayer
 *
 * @purpose    Render a Bodymovin / Lottie JSON animation as an inline media
 *             element inside a section (FeatureFrame's image slot,
 *             IllustrationFrame, etc.). Client-only component — fetches the
 *             JSON at mount and plays it through lottie-react.
 * @useWhen    The live page uses Webflow's Lottie loader
 *             (`<div data-animation-type="lottie" data-src="*.json">`) for
 *             an animated illustration that conveys product behavior. Example:
 *             `Programs-video.json` on `/fr/equipes/comite-direction` section
 *             "Suivez l'avancée de vos programmes".
 * @dontUse    For static images (use plain `<img>` or the parent component's
 *             `imageSrc` prop). For interactive videos with audio (use HTML5
 *             `<video>`). For decorative SVG illustrations (use
 *             `<IllustrationFrame>` or an inline `<svg>`).
 *
 * @limits
 *   - src: must be a fully-qualified URL ending in `.json` (Bodymovin export).
 *     The fetch happens client-side at mount.
 *   - loop / autoplay: both default true (matches Webflow's Lottie default).
 *   - speed: 0.25–4 reasonable range; default 1.
 *
 * @forbidden
 *   - Do NOT pass className with bg / text / font / padding overrides — only
 *     sizing (width / height / aspect-ratio) is permitted on the wrapper.
 *   - Do NOT render server-side (component is `"use client"` for a reason —
 *     lottie-web touches `window` and `document` at import).
 *   - Do NOT pass an animationData object directly — fetch via the `src` URL
 *     so it stays in sync with the source on the live page.
 */

interface LottiePlayerProps {
  /** Fully-qualified URL of the Bodymovin JSON file. */
  src: string;
  /** Loop the animation indefinitely. @default true */
  loop?: boolean;
  /** Start playing automatically once the JSON is fetched. @default true */
  autoplay?: boolean;
  /** Playback speed multiplier. @default 1 */
  speed?: number;
  /** Accessible label for screen readers (renders as `aria-label` on the root). */
  ariaLabel?: string;
  /** Optional sizing className (width / height / aspect-ratio only — see @forbidden). */
  className?: string;
}

export function LottiePlayer({
  src,
  loop = true,
  autoplay = true,
  speed = 1,
  ariaLabel,
  className,
}: LottiePlayerProps) {
  assertNoClassNameOverride("LottiePlayer", className, [
    "bg-",
    "text-",
    "font-",
    "p-",
  ]);

  const [animationData, setAnimationData] = useState<unknown | null>(null);
  const [failed, setFailed] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    if (animationData && lottieRef.current && speed !== 1) {
      lottieRef.current.setSpeed(speed);
    }
  }, [animationData, speed]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={ariaLabel ?? "Animation"}
        className={cn(
          "flex min-h-[12rem] items-center justify-center bg-primary-2 text-text-muted text-micro-md",
          className,
        )}
      >
        {/* Locale-agnostic fallback — caller can wrap & translate via context if needed */}
        <span>Animation unavailable</span>
      </div>
    );
  }

  if (!animationData) {
    return (
      <div
        role="img"
        aria-label={ariaLabel ?? "Animation loading"}
        className={cn("min-h-[12rem] bg-primary-2", className)}
        aria-busy="true"
      />
    );
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      lottieRef={lottieRef}
      role="img"
      aria-label={ariaLabel}
      className={className}
    />
  );
}
