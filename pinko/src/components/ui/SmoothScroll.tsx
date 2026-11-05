"use client";

import { useEffect } from "react";

/**
 * Eased scrolling, the way the reference feels.
 *
 * Hand-rolled rather than a library: it is about twenty lines, it stays off
 * under reduced motion, and it hands control straight back to the browser
 * on touch — phones already scroll beautifully and hijacking that is how
 * these effects earn their bad name.
 *
 * It also never swallows a keyboard scroll, so Page Down, Home, End and
 * tabbing to an off-screen control keep working.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      return;
    }
    if (window.matchMedia("(hover: none)").matches) return;

    let target = window.scrollY;
    let current = target;
    let frame = 0;
    let animating = false;

    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    const loop = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.4) {
        current = target;
        animating = false;
      }
      window.scrollTo(0, current);
      if (animating) frame = requestAnimationFrame(loop);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;
      // Let a scrollable panel — the portfolio frames, for one — keep its own
      // wheel events instead of moving the page.
      let node = event.target as HTMLElement | null;
      while (node && node !== document.body) {
        const style = getComputedStyle(node);
        if (
          /(auto|scroll)/.test(style.overflowY) &&
          node.scrollHeight > node.clientHeight
        ) {
          return;
        }
        node = node.parentElement;
      }

      event.preventDefault();
      target = Math.max(0, Math.min(target + event.deltaY, maxScroll()));
      if (!animating) {
        animating = true;
        frame = requestAnimationFrame(loop);
      }
    };

    // Anything that is not the wheel (keyboard, anchors, the scrollbar)
    // resets the target to wherever the browser actually took us.
    const sync = () => {
      if (!animating) {
        target = window.scrollY;
        current = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", sync);
    window.addEventListener("resize", sync);
    window.addEventListener("scrollend", sync);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("scrollend", sync);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
