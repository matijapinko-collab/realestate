"use client";

import { useState } from "react";
import type { CvExperience } from "@/content/cv";

/**
 * Professional references, switched in place.
 *
 * The brief is explicit that there are no client testimonials to publish,
 * so this is what it says it is: real roles from the CV, one open at a
 * time. Real buttons with aria-expanded; the container keeps a stable
 * minimum height so switching does not shove the page around.
 */
export function LightReferences({ entries }: { entries: CvExperience[] }) {
  const [active, setActive] = useState(0);
  const current = entries[active];

  return (
    <div className="mt-16">
      <ul className="lx-ref-list">
        {entries.map((entry, i) => (
          <li key={`${entry.organisation}-${entry.period}`}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-expanded={active === i}
              data-active={active === i}
              className="lx-ref-row"
            >
              <span className="lx-h3">{entry.organisation}</span>
              <span className="lx-kicker text-right">{entry.role}</span>
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div className="lx-card mt-6 min-h-44 p-7 md:p-10">
          <p className="lx-kicker">{current.period}</p>
          <p className="lx-body mt-4 max-w-[70ch] text-[1.0625rem]">
            {current.summary}
          </p>
        </div>
      ) : null}
    </div>
  );
}
