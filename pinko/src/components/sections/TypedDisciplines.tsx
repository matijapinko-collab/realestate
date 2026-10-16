"use client";

import { useEffect, useState } from "react";

const DISCIPLINES = ["Development", "Marketing", "Business Development"];

/**
 * The hero's terminal card types the three disciplines in turn.
 *
 * Server-rendered as the full list, so the words are there before and
 * without JavaScript. Only once the effect is allowed does it collapse into
 * a single typed line — a decoration that can never cost a visitor the
 * content.
 */
export function TypedDisciplines() {
  const [typed, setTyped] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      return;
    }

    let word = 0;
    let letters = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = DISCIPLINES[word] ?? "";
      letters += deleting ? -1 : 1;
      setTyped(current.slice(0, letters));

      let wait = deleting ? 35 : 70;
      if (!deleting && letters === current.length) {
        wait = 1600;
        deleting = true;
      } else if (deleting && letters === 0) {
        deleting = false;
        word = (word + 1) % DISCIPLINES.length;
        wait = 260;
      }
      timer = setTimeout(tick, wait);
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, []);

  if (typed === null) {
    return (
      <ul className="mt-5 space-y-3">
        {DISCIPLINES.map((discipline) => (
          <li
            key={discipline}
            className="flex items-baseline gap-3 font-mono text-ink"
          >
            <span aria-hidden="true" className="text-accent">
              &gt;
            </span>
            {discipline}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="mt-5 flex min-h-[7.5rem] items-baseline gap-3 font-mono text-(length:--text-title) text-ink">
      <span aria-hidden="true" className="text-accent">
        &gt;
      </span>
      {/* The animated text repeats what the list above already said, so it is
          hidden from assistive technology rather than read letter by letter. */}
      <span aria-hidden="true" className="caret">
        {typed}
      </span>
      <span className="sr-only">{DISCIPLINES.join(", ")}</span>
    </p>
  );
}
