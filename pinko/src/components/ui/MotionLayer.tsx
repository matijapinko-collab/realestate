"use client";

import { useEffect } from "react";

/**
 * One small script for every motion effect on the site.
 *
 * It is deliberately not a library and deliberately not a component per
 * animated element: one observer, one scroll listener and one pointer
 * listener serve the whole page, so the cost stays near zero. The homepage
 * was measured at a Lighthouse 96 with a 70 ms blocking time and this is not
 * the thing that should spend it.
 *
 * Nothing here runs when the visitor asked for reduced motion, and nothing
 * here is required to read the page: the markup renders in its final state
 * and only becomes animatable once `.js-motion` lands on <html>.
 */
export function MotionLayer() {
  useEffect(() => {
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!motionOk.matches) return;

    const root = document.documentElement;
    root.classList.add("js-motion");

    // --- Reveal on scroll ------------------------------------------------
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    const watch = () => {
      document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach(
        (el, i) => {
          // Siblings arrive one after another rather than all at once.
          const delay = Number(el.getAttribute("data-reveal-delay") ?? i % 6);
          (el as HTMLElement).style.setProperty(
            "--reveal-delay",
            `${Math.min(delay, 5) * 70}ms`
          );
          observer.observe(el);
        }
      );
    };
    watch();

    // Client-side navigation swaps the markup; pick up whatever is new.
    const mutations = new MutationObserver(watch);
    mutations.observe(document.body, { childList: true, subtree: true });

    // --- Reading progress -------------------------------------------------
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        root.style.setProperty("--scroll-progress", String(Math.min(ratio, 1)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // --- Pointer spotlight on cards ---------------------------------------
    const onPointerMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.(".spotlight");
      if (!target) return;
      const box = target.getBoundingClientRect();
      (target as HTMLElement).style.setProperty(
        "--spot-x",
        `${event.clientX - box.left}px`
      );
      (target as HTMLElement).style.setProperty(
        "--spot-y",
        `${event.clientY - box.top}px`
      );
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("js-motion");
    };
  }, []);

  return <div aria-hidden="true" className="scroll-progress" />;
}
