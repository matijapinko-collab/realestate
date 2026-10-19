"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  WORMHOLE_EVENT,
  prefetchPassage,
  wormholeAvailable,
} from "@/components/ui/Wormhole";

export type Theme = "dark" | "light";

/**
 * Switches between the two experiences.
 *
 * Not a light/dark toggle in the usual sense: the dark scheme is the
 * terminal site and the light one is a different design on the same
 * content. The choice is remembered, and applied before first paint by the
 * inline script in the document head, so the page never flashes the other
 * one first.
 */
/** The attribute on <html> is the source of truth, so React reads it. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    () =>
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark",
    // On the server the markup is rendered for the dark scheme; the inline
    // script in the head has already set the real one before first paint.
    () => "dark"
  );

  const switchTo = useCallback(
    (next: Theme) => {
      if (next === theme) return;
      // On a desktop pointer, with motion welcome, the change happens inside
      // the tunnel — which applies the theme itself, halfway through.
      if (wormholeAvailable()) {
        window.dispatchEvent(
          new CustomEvent<Theme>(WORMHOLE_EVENT, { detail: next })
        );
        return;
      }
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("pinko-theme", next);
      } catch {
        // Private browsing or blocked storage: the choice is simply not kept.
      }
    },
    [theme]
  );

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-(--radius-pill) border border-control p-0.5 ${className ?? ""}`}
      role="group"
      aria-label="Dimenzija weba"
    >
      {(
        [
          ["dark", "Dark"],
          ["light", "Light"],
        ] as const
      ).map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => switchTo(value)}
          onPointerEnter={() => prefetchPassage(value)}
          onFocus={() => prefetchPassage(value)}
          aria-pressed={theme === value}
          aria-label={
            value === "dark"
              ? "Uključi tamnu dimenziju"
              : "Uključi svijetlu dimenziju"
          }
          className={`mono-label rounded-(--radius-pill) px-3 py-1.5 font-semibold transition-colors ${
            theme === value
              ? "bg-accent text-on-accent"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
