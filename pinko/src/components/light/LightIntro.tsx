"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The light world's opening sequence.
 *
 * The reference opens with a counter running to 100 while layers of work
 * assemble above it. This is the same idea built from Matija's own
 * material: three real captures stack and settle, the wordmark arrives,
 * the counter runs out, and the whole thing lifts away.
 *
 * Rules it keeps, because an intro that breaks them is a liability:
 *  - the page underneath is already rendered; this only sits over it
 *  - it runs once per session, so a second page view is immediate
 *  - reduced motion skips it entirely
 *  - it never traps: it removes itself after at most 2.2s, and the
 *    timers are cleared on unmount
 *  - no JavaScript means no overlay at all, since it renders client-side
 *
 * The counter is aria-hidden and the overlay is inert: a screen reader
 * goes straight to the page, which is the point.
 */

const PLATES = [
  {
    src: "/projekti/smart-food/desktop-home.webp",
    alt: "",
    width: 1600,
    height: 1000,
    className: "lx-intro-plate lx-intro-plate-1",
  },
  {
    src: "/projekti/smart-food/mobile-product.webp",
    alt: "",
    width: 720,
    height: 1559,
    className: "lx-intro-plate lx-intro-plate-2",
  },
  {
    src: "/projekti/bolero-temu-featured.webp",
    alt: "",
    width: 1600,
    height: 900,
    className: "lx-intro-plate lx-intro-plate-3",
  },
];

export function LightIntro() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = host.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let seen = false;
    try {
      seen = sessionStorage.getItem("pinko-light-intro") === "seen";
    } catch {
      // Storage blocked: treat it as a first view and play it once.
    }

    if (reduced || seen) {
      node.remove();
      return;
    }

    try {
      sessionStorage.setItem("pinko-light-intro", "seen");
    } catch {
      // Nothing to do; it will simply play again next time.
    }

    node.dataset.play = "true";
    document.documentElement.style.overflow = "hidden";

    const counter = node.querySelector<HTMLElement>("[data-count]");
    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / 1500);
      if (counter) {
        counter.textContent = String(Math.round(progress * 100)).padStart(
          3,
          "0",
        );
      }
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const leave = window.setTimeout(() => {
      node.dataset.leaving = "true";
      document.documentElement.style.overflow = "";
    }, 1700);

    const done = window.setTimeout(() => node.remove(), 2200);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(leave);
      window.clearTimeout(done);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div ref={host} className="lx-intro" inert aria-hidden="true">
      <div className="lx-intro-stage">
        {PLATES.map((plate) => (
          <figure key={plate.src} className={plate.className}>
            <Image
              src={plate.src}
              alt={plate.alt}
              width={plate.width}
              height={plate.height}
              sizes="40rem"
              priority={false}
              className="h-full w-full object-cover object-top"
            />
          </figure>
        ))}
      </div>

      <p className="lx-intro-mark">
        pink<span>o</span>.
      </p>
      <p className="lx-intro-count" data-count>
        000
      </p>
    </div>
  );
}
