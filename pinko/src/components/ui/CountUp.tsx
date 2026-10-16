"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to a figure the first time it is seen.
 *
 * The final value is rendered on the server, so the number is correct before
 * any JavaScript runs and correct again if JavaScript never runs. The count
 * is decoration on top of a value that is already there — a visitor who
 * asked for reduced motion simply sees the number.
 */
export function CountUp({
  value,
  className,
}: {
  /** The text as it should finally read, e.g. "75+" or "2018." */
  value: string;
  className?: string;
}) {
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      return;
    }

    // Only the digits animate; any prefix or suffix is left alone.
    const match = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    if (!Number.isFinite(target) || target === 0) return;
    // A year is a label, not a quantity: counting 0→2018 reads as nonsense.
    if (target >= 1900) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const duration = 1100;
        const started = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - started) / duration, 1);
          // Ease out, so it lands softly instead of stopping dead.
          const eased = 1 - Math.pow(1 - progress, 3);
          setShown(`${prefix}${Math.round(target * eased)}${suffix}`);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
