"use client";

import { useEffect, useRef } from "react";

/**
 * A large statement whose words darken one by one as the section scrolls
 * through the viewport — the reference's signature move.
 *
 * The words are in the markup as ordinary text; the effect only changes
 * their colour. Without JavaScript, or under reduced motion, the whole
 * sentence is simply readable from the start.
 */
export function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      return;
    }

    node.dataset.lit = "running";
    const spans = Array.from(
      node.querySelectorAll<HTMLElement>(".statement-word")
    );

    let frame = 0;
    const update = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      // Fully unlit when the block sits at the bottom of the viewport, fully
      // lit by the time its top reaches a third of the way up.
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.3;
      const progress = (start - box.top) / (start - end);
      const lit = Math.round(
        Math.max(0, Math.min(progress, 1)) * spans.length
      );
      spans.forEach((span, i) => {
        if (i < lit) span.setAttribute("data-lit", "");
        else span.removeAttribute("data-lit");
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p
      ref={ref}
      className="statement text-(length:--text-display) font-extrabold tracking-tight"
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="statement-word">
          {word}
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
