"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The opening sequence: a deck of real project screens while a counter rolls
 * to 100, then the deck fans out, gathers itself and drops away to leave the
 * page behind it.
 *
 * Rules it keeps to:
 *  - it never runs under `prefers-reduced-motion`;
 *  - it runs once per session, not on every navigation;
 *  - it is `aria-hidden` and the page behind is fully rendered the whole
 *    time, so nothing here gates the content;
 *  - a click, a key or four seconds end it, whichever comes first. A curtain
 *    that outlives the page is a bug, not an entrance.
 */

const CARDS = [
  { src: "/intro/sf-naslovnica.webp", label: "100% Smart Food" },
  { src: "/intro/sf-proizvod.webp", label: "Stranica proizvoda" },
  { src: "/intro/sf-trgovina.webp", label: "Katalog" },
  { src: "/intro/varel-pocetna.webp", label: "Varel" },
];

/** Where each card lands when the deck fans out. */
const FAN = [
  { x: -52, y: -42, r: -9 },
  { x: 46, y: -14, r: 7 },
  { x: -34, y: 30, r: -5 },
  { x: 40, y: 54, r: 10 },
];

type Phase = "off" | "count" | "fan" | "gather" | "leave";

/** One rolling digit column. */
function Digit({ value }: { value: number }) {
  return (
    <span className="intro-digit" aria-hidden="true">
      <span
        className="intro-digit-strip"
        style={{ transform: `translateY(${-value * 10}%)` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </span>
    </span>
  );
}

export function Intro() {
  const [phase, setPhase] = useState<Phase>("off");
  const [count, setCount] = useState(0);
  const [card, setCard] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const finish = useCallback(() => {
    setPhase((current) => (current === "off" ? current : "leave"));
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      return;
    }
    try {
      if (sessionStorage.getItem("pinko-intro") === "seen") return;
      sessionStorage.setItem("pinko-intro", "seen");
    } catch {
      // Storage blocked: play it, it is under four seconds.
    }

    setPhase("count");
    document.documentElement.style.overflow = "hidden";

    const started = performance.now();
    const duration = 1800;
    let frame = requestAnimationFrame(function step(now) {
      const progress = Math.min((now - started) / duration, 1);
      setCount(Math.round(100 * (1 - Math.pow(1 - progress, 2))));
      setCard(Math.min(CARDS.length - 1, Math.floor(progress * CARDS.length)));
      if (progress < 1) frame = requestAnimationFrame(step);
    });

    const schedule = (ms: number, fn: () => void) => {
      timers.current.push(setTimeout(fn, ms));
    };
    schedule(duration + 60, () => setPhase("fan"));
    schedule(duration + 900, () => setPhase("gather"));
    schedule(duration + 1500, () => setPhase("leave"));

    const list = timers.current;
    return () => {
      cancelAnimationFrame(frame);
      list.forEach(clearTimeout);
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Let anyone who does not want to watch skip it.
  useEffect(() => {
    if (phase === "off") return;
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [phase, finish]);

  useEffect(() => {
    if (phase !== "leave") return;
    document.documentElement.style.overflow = "";
    const done = setTimeout(() => setPhase("off"), 900);
    return () => clearTimeout(done);
  }, [phase]);

  if (phase === "off") return null;

  const digits = String(Math.min(count, 100)).padStart(3, "0").split("");

  return (
    <div aria-hidden="true" className="intro" data-phase={phase}>
      <div className="intro-deck">
        {CARDS.map((item, i) => (
          <figure
            key={item.src}
            className="intro-card"
            data-active={phase === "count" && i === card ? "" : undefined}
            style={
              {
                "--fan-x": `${FAN[i]?.x ?? 0}%`,
                "--fan-y": `${FAN[i]?.y ?? 0}%`,
                "--fan-r": `${FAN[i]?.r ?? 0}deg`,
                "--card-index": i,
                zIndex: CARDS.length - i,
              } as React.CSSProperties
            }
          >
            <Image
              src={item.src}
              alt=""
              width={960}
              height={600}
              priority={i === 0}
              sizes="(min-width: 768px) 30rem, 80vw"
              className="h-full w-full object-cover object-top"
            />
          </figure>
        ))}
      </div>

      <p className="intro-counter">
        {digits.map((digit, i) => (
          <Digit key={i} value={Number(digit)} />
        ))}
      </p>
    </div>
  );
}
