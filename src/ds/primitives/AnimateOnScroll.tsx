"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/ds/utils";

type Animation =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "fade";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: Animation;
  /** Delay in ms */
  delay?: number;
  /** Duration in ms */
  duration?: number;
  /** Intersection threshold 0-1 */
  threshold?: number;
  /** Stagger children sequentially */
  stagger?: number;
  /** Play on mount (no scroll trigger) */
  onMount?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const animationStyles: Record<Animation, { from: string; to: string }> = {
  "fade-up": {
    from: "opacity-0 translate-y-[2.5rem]",
    to: "opacity-100 translate-y-0",
  },
  "fade-down": {
    from: "opacity-0 -translate-y-[2.5rem]",
    to: "opacity-100 translate-y-0",
  },
  "fade-left": {
    from: "opacity-0 translate-x-[-3.75rem]",
    to: "opacity-100 translate-x-0",
  },
  "fade-right": {
    from: "opacity-0 translate-x-[3.75rem]",
    to: "opacity-100 translate-x-0",
  },
  "scale-up": {
    from: "opacity-0 scale-[0.92]",
    to: "opacity-100 scale-100",
  },
  fade: {
    from: "opacity-0",
    to: "opacity-100",
  },
};

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.15,
  stagger,
  onMount = false,
  className,
  as: Tag = "div",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.classList.remove(...animationStyles[animation].from.split(" "));
      el.classList.add(...animationStyles[animation].to.split(" "));
      return;
    }

    if (onMount) {
      const timer = setTimeout(() => {
        el.classList.remove(...animationStyles[animation].from.split(" "));
        el.classList.add(...animationStyles[animation].to.split(" "));
      }, delay);
      return () => clearTimeout(timer);
    }

    const fromClasses = animationStyles[animation].from.split(" ");
    const toClasses = animationStyles[animation].to.split(" ");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate in
          if (stagger) {
            const children = el.querySelectorAll("[data-animate-child]");
            children.forEach((child, i) => {
              setTimeout(() => {
                (child as HTMLElement).classList.remove(...fromClasses);
                (child as HTMLElement).classList.add(...toClasses);
              }, delay + i * stagger);
            });
          } else {
            setTimeout(() => {
              el.classList.remove(...fromClasses);
              el.classList.add(...toClasses);
            }, delay);
          }
        } else {
          // Reset when out of viewport — replay on next scroll
          if (stagger) {
            const children = el.querySelectorAll("[data-animate-child]");
            children.forEach((child) => {
              (child as HTMLElement).classList.remove(...toClasses);
              (child as HTMLElement).classList.add(...fromClasses);
            });
          } else {
            el.classList.remove(...toClasses);
            el.classList.add(...fromClasses);
          }
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay, threshold, stagger, onMount]);

  const style = animationStyles[animation];

  return (
    // @ts-expect-error — dynamic tag
    <Tag
      ref={ref}
      className={cn(
        style.from,
        "transition-all ease-out motion-reduce:!opacity-100 motion-reduce:!translate-x-0 motion-reduce:!translate-y-0 motion-reduce:!scale-100",
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Wrap each child for stagger animations */
export function AnimateChild({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-animate-child className={className}>
      {children}
    </div>
  );
}
