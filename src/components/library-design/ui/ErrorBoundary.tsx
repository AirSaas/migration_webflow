"use client";

import { Component, type ReactNode } from "react";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { Button } from "./Button";

/**
 * ErrorBoundary
 *
 * @purpose    React class component that catches render-time errors in its
 *             subtree and renders a branded fallback instead of a crashed page.
 * @useWhen    Wrapping dynamic / client-side features (search, forms, widgets)
 *             that could throw at render. One per isolated feature, not
 *             page-wide (page-wide is Next.js `error.tsx`).
 * @dontUse    For async errors (catch them in the handler, not via boundary).
 *             For 404s (use Next.js `not-found.tsx`). For form validation
 *             (use inline field errors).
 *
 * @limits
 *   - fallback: optional custom ReactNode; if absent, a default branded
 *     error block with a "Rafraîchir" CTA is rendered
 *
 * @forbidden
 *   - Do NOT use as the root page fallback — Next.js `error.tsx` owns that
 */

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optional custom fallback UI. Receives the caught error. */
  fallback?: (error: Error, reset: () => void) => ReactNode;
  /** Called when an error is caught — useful for logging to Sentry/PostHog. */
  onError?: (error: Error, info: { componentStack: string }) => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    this.props.onError?.(error, info);
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("[DS] ErrorBoundary caught an error:", error, info);
    }
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }
      return <DefaultFallback error={this.state.error} onReset={this.reset} />;
    }
    return this.props.children;
  }
}

function DefaultFallback({ error, onReset }: { error: Error; onReset: () => void }) {
  return (
    <div
      className="flex flex-col items-center gap-[1rem] text-center px-[1.5rem] py-[3rem]"
      role="alert"
    >
      <div aria-hidden="true" style={{ fontSize: "3rem" }}>
        ⚠️
      </div>
      <Heading level={4} gradient="none" align="center">
        Quelque chose s&apos;est mal passé
      </Heading>
      <Text size="md" align="center" maxWidth="40rem">
        Cette section n&apos;a pas pu charger. Essayez de rafraîchir ou revenez
        plus tard.
      </Text>
      {process.env.NODE_ENV === "development" && (
        <pre
          className="rounded bg-secondary-5 text-secondary-70 text-xs p-[1rem] max-w-[40rem] overflow-auto"
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {error.message}
        </pre>
      )}
      <Button variant="primary" size="sm" onClick={onReset}>
        Rafraîchir
      </Button>
    </div>
  );
}
