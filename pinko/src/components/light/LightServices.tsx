"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { lightServices } from "@/content/light-copy";

/**
 * The services accordion, with the reference's dot field reacting to the
 * open row.
 *
 * Built on real buttons with aria-expanded and aria-controls, so the
 * keyboard works with no key handling of our own and a screen reader
 * announces the state. The closed panels stay in the document and are
 * hidden with `hidden`, which keeps the text indexable without leaving
 * focusable elements inside a collapsed region.
 *
 * The dot field is a decorative SVG. Each service lights a different
 * figure: a bracket for development, a rising column for marketing, a
 * connected flow for business development.
 */

const FIGURES: Record<string, number[][]> = {
  // 8 x 8 grids. 1 means the dot is lit.
  development: [
    [0, 0, 1, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0, 1, 1, 0],
  ],
  marketing: [
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  "business-development": [
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
  ],
};

function DotField({ slug, open }: { slug: string; open: boolean }) {
  const grid = FIGURES[slug] ?? FIGURES.development!;
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="lx-dots">
      {grid.flatMap((row, y) =>
        row.map((on, x) => (
          <circle
            key={`${x}-${y}`}
            cx={10 + x * 14.3}
            cy={10 + y * 14.3}
            r={on ? 4.6 : 3}
            className={on && open ? "lx-dot-on" : "lx-dot"}
            style={{ transitionDelay: `${(x + y) * 22}ms` }}
          />
        )),
      )}
    </svg>
  );
}

export function LightServices() {
  const [open, setOpen] = useState(lightServices.areas[0]?.slug ?? "");
  const base = useId();

  return (
    <ul className="mt-16 space-y-4">
      {lightServices.areas.map((area) => {
        const isOpen = open === area.slug;
        const panelId = `${base}-${area.slug}`;

        return (
          <li key={area.slug} className="lx-card overflow-hidden" data-open={isOpen}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? "" : area.slug)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-6 p-7 text-left md:p-10"
              >
                <span className="lx-h3">{area.name}</span>
                <span className="lx-round">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
              </button>
            </h3>

            <div id={panelId} hidden={!isOpen} className="px-7 pb-9 md:px-10 md:pb-12">
              <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
                <div>
                  <p className="lx-h3 max-w-[22ch] font-medium">{area.title}</p>
                  <div className="mt-6 space-y-3">
                    {area.body.map((paragraph) => (
                      <p key={paragraph} className="lx-body">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <ul className="mt-7 grid gap-x-10 gap-y-2 sm:grid-cols-2">
                    {area.items.map((item) => (
                      <li key={item} className="lx-body text-[0.9375rem]">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/usluge/${area.slug}`} className="lx-btn mt-8">
                    {area.cta}
                  </Link>
                </div>

                <div className="hidden justify-self-end lg:block">
                  <DotField slug={area.slug} open={isOpen} />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
