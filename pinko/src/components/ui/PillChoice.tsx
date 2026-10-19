"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Theme } from "@/components/ui/ThemeToggle";
import { applyTheme } from "@/lib/apply-theme";

/**
 * The doorway: red pill or blue pill, and the site opens in that world.
 *
 * Shown only to someone who has not chosen before — a returning visitor
 * goes straight to the world they picked. The choice is a pair of real
 * buttons, so it works with a keyboard and reads properly to a screen
 * reader; the pills are the visible target, the label above each one names
 * the world it opens, and either half of the button activates it.
 *
 * The hotspots are placed as percentages of the picture, measured from the
 * file itself (red at 24.0% / 76.7%, blue at 75.7% / 77.7%), so they stay on
 * the pills at every width instead of drifting off on a phone.
 *
 * Nothing here gates the content: without JavaScript the chooser never
 * renders and the site simply opens in the dark scheme.
 */

const CHOICES = [
  {
    theme: "dark" as Theme,
    label: "Fun web",
    x: 24.0,
    y: 76.7,
    ring: "#e23b3b",
    aria: "Crvena pilula — Fun web, tamni način",
  },
  {
    theme: "light" as Theme,
    label: "Pro web",
    x: 75.7,
    y: 77.7,
    ring: "#2f8ee0",
    aria: "Plava pilula — Pro web, svijetli način",
  },
];

export function PillChoice() {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // The cookie is the source of truth, because it is what the server
    // used to pick the world. Asking localStorage alone meant the chooser
    // reappeared over a visitor who had already chosen.
    let chosen: string | null =
      document.cookie.match(/(?:^|; )pinko-theme=(dark|light)/)?.[1] ?? null;
    if (!chosen) {
      try {
        chosen = localStorage.getItem("pinko-theme");
      } catch {
        // Storage blocked: treat it as a first visit and ask.
      }
    }
    if (chosen === "dark" || chosen === "light") return;

    // Opened on the next frame rather than during the effect, so the first
    // paint is the page itself and the chooser arrives over it.
    const frame = requestAnimationFrame(() => setOpen(true));
    document.documentElement.style.overflow = "hidden";
    // The counting curtain is a second entrance; one is enough.
    try {
      sessionStorage.setItem("pinko-intro", "seen");
    } catch {
      // Nothing to do; the curtain simply plays after this.
    }
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const choose = useCallback((theme: Theme) => {
    applyTheme(theme);
    setLeaving(true);
    document.documentElement.style.overflow = "";
    window.setTimeout(() => setOpen(false), 620);
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Odaberite kako želite vidjeti web"
      className={`pill-choice fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black transition-opacity duration-600 ease-[cubic-bezier(.22,1,.36,1)] ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <p className="pill-choice-intro">Izaberite svoju stvarnost.</p>

      <div className="pill-choice-stage">
        <Image
          src="/intro/izbor-pilule.webp"
          alt=""
          width={1409}
          height={1116}
          priority
          sizes="(min-width: 1024px) 60rem, 100vw"
          className="h-full w-full object-contain"
        />

        {CHOICES.map((choice) => (
          <button
            key={choice.theme}
            type="button"
            onClick={() => choose(choice.theme)}
            aria-label={choice.aria}
            className="pill-choice-target"
            style={{ left: `${choice.x}%`, top: `${choice.y}%` }}
          >
            <span className="pill-choice-label">
              <span className="pill-choice-title">{choice.label}</span>
            </span>
            <span
              aria-hidden="true"
              className="pill-choice-ring"
              style={{ borderColor: choice.ring }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
