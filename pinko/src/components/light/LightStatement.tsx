"use client";

import { useEffect, useRef } from "react";

/**
 * The editorial statement: words arrive from grey to near black as the
 * section crosses the viewport, the way the reference does it.
 *
 * The sentence is plain text in the markup, split into words on the
 * server. A crawler and a screen reader read one ordinary paragraph; the
 * only thing the script adds is how far through the reveal we are, as a
 * single custom property. One IntersectionObserver and one rAF-throttled
 * scroll read, cleaned up on unmount, and nothing re-renders per frame.
 */
export function LightStatement({
  lead,
  text,
}: {
  lead: string;
  text: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Written straight to the node rather than through state: this is a
    // flag for the stylesheet, not something React needs to re-render for.
    node.dataset.enabled = "true";
    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      // 0 when the block's top reaches the lower third, 1 once its bottom
      // has passed the middle of the screen.
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.35;
      const progress = (start - box.top) / Math.max(1, start - end + box.height * 0.5);
      node.style.setProperty("--reveal", String(Math.min(1, Math.max(0, progress))));
    };

    const onScroll = () => {
      if (!visible || frame) return;
      frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? false;
      if (visible) update();
    });
    io.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={host} className="lx-statement">
      <p className="lx-kicker">{lead}</p>
      <p className="lx-statement-text lx-display mt-8">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="lx-word"
            style={{ "--i": i, "--n": words.length } as React.CSSProperties}
          >
            {word}{" "}
          </span>
        ))}
      </p>
    </div>
  );
}
