"use client";

import { useEffect, useState } from "react";

/**
 * The counting curtain the reference opens with.
 *
 * It is mounted empty and only appears if motion is allowed, so a visitor
 * who asked for reduced motion — or one without JavaScript — never waits
 * behind a curtain for content that is already there. It also gives up
 * after a second and a half regardless: a preloader that outlives the page
 * is a bug, not an entrance.
 */
export function Preloader() {
  const [state, setState] = useState<"off" | "running" | "leaving">("off");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      return;
    }
    // Returning visitors should not sit through it again this session.
    try {
      if (sessionStorage.getItem("pinko-intro") === "seen") return;
      sessionStorage.setItem("pinko-intro", "seen");
    } catch {
      // Storage blocked: show it, it is only a second.
    }

    setState("running");
    document.documentElement.style.overflow = "hidden";

    const started = performance.now();
    const duration = 1500;
    let frame = requestAnimationFrame(function step(now) {
      const progress = Math.min((now - started) / duration, 1);
      setCount(Math.round(100 * (1 - Math.pow(1 - progress, 2))));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setState("leaving");
    });

    const stop = setTimeout(() => setState("leaving"), duration + 400);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(stop);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (state !== "leaving") return;
    document.documentElement.style.overflow = "";
    const done = setTimeout(() => setState("off"), 800);
    return () => clearTimeout(done);
  }, [state]);

  if (state === "off") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[90] flex items-end justify-center bg-paper transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] ${
        state === "leaving" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <p className="pb-[12vh] font-mono text-[clamp(4rem,18vw,14rem)] leading-none font-extrabold tracking-tighter">
        {String(count).padStart(3, "0")}
      </p>
    </div>
  );
}
