"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Theme } from "@/components/ui/ThemeToggle";

/**
 * The passage between the two worlds.
 *
 * Switching theme plays a full-screen tunnel and swaps the theme in the
 * middle of it, while the screen is covered — so the change itself is never
 * seen happening. Desktop only, and only when motion is welcome.
 *
 * The clips run ten seconds each; only the stretch where the tunnel actually
 * forms is used, played faster, which lands the whole passage at roughly
 * 1.8s. They are never fetched until the first switch (`preload="none"`), so
 * a visitor who never changes world never pays for them.
 *
 * Every failure path ends the same way: the theme is applied and the page is
 * released. A transition that strands the visitor is worse than no
 * transition at all.
 */

type Passage = {
  src: string;
  /** Seconds into the clip where the tunnel starts to form. */
  from: number;
  /** Seconds where it has fully taken the screen. */
  to: number;
  rate: number;
};

const PASSAGES: Record<Theme, Passage> = {
  // Switching TO light: the dark tunnel opens into white.
  light: { src: "/wormhole/dark-to-light.mp4", from: 1.5, to: 6.6, rate: 2.7 },
  // Switching TO dark: the bright room folds into the green tunnel.
  dark: { src: "/wormhole/light-to-dark.mp4", from: 1.2, to: 6.4, rate: 2.7 },
};

export const WORMHOLE_EVENT = "pinko:wormhole";

/**
 * Warm the clip while the pointer is still on its way to the switch. The
 * files are several megabytes, and without this a slow connection would
 * always hit the watchdog and get the plain switch instead.
 */
export function prefetchPassage(theme: Theme) {
  if (!wormholeAvailable()) return;
  const { src } = PASSAGES[theme];
  if (prefetched.has(src)) return;
  prefetched.add(src);
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "video";
  link.href = src;
  document.head.appendChild(link);
}

const prefetched = new Set<string>();

/** Does this visitor get the passage, or the plain switch? */
export function wormholeAvailable() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches &&
    window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches
  );
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("pinko-theme", theme);
  } catch {
    // Storage blocked: the choice simply is not kept.
  }
}

export function Wormhole() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [passage, setPassage] = useState<Passage | null>(null);
  const running = useRef(false);
  const [leaving, setLeaving] = useState(false);

  const end = useCallback(() => {
    running.current = false;
    setLeaving(true);
    document.documentElement.style.overflow = "";
    window.setTimeout(() => {
      setPassage(null);
      setLeaving(false);
    }, 320);
  }, []);

  useEffect(() => {
    const onRequest = (event: Event) => {
      const next = (event as CustomEvent<Theme>).detail;
      if (running.current) return;
      running.current = true;
      setPassage(PASSAGES[next]);
      document.documentElement.style.overflow = "hidden";

      const timers: number[] = [];
      // Whatever happens, the theme lands and the page is released.
      const settle = (immediate: boolean) => {
        applyTheme(next);
        if (immediate) end();
      };

      window.requestAnimationFrame(() => {
        const video = videoRef.current;
        if (!video) return settle(true);

        const config = PASSAGES[next];
        video.playbackRate = config.rate;
        video.currentTime = config.from;

        const span = ((config.to - config.from) / config.rate) * 1000;
        // The theme changes while the tunnel covers the screen.
        timers.push(window.setTimeout(() => settle(false), span * 0.5));
        timers.push(window.setTimeout(end, span));
        // If it never starts playing — slow connection, blocked codec —
        // do not make anyone wait for it.
        timers.push(
          window.setTimeout(() => {
            if (video.paused || video.currentTime < config.from) settle(true);
          }, 1200)
        );

        video.play().catch(() => settle(true));
        video.addEventListener("error", () => settle(true), { once: true });
      });

      return () => timers.forEach(window.clearTimeout);
    };

    window.addEventListener(WORMHOLE_EVENT, onRequest);
    return () => {
      window.removeEventListener(WORMHOLE_EVENT, onRequest);
      document.documentElement.style.overflow = "";
    };
  }, [end]);

  if (!passage) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] bg-black transition-opacity duration-300 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src={passage.src}
        muted
        playsInline
        preload="none"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
