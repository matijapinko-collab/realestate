"use client";

import Link from "next/link";
import { useId, useState } from "react";

/**
 * "Što vam trenutno koči posao?" (brief 9.4)
 *
 * Real buttons with `aria-pressed`, so the selected state is exposed and the
 * keyboard works without any custom key handling. The first option is selected
 * by default, so the panel always has content and nothing depends on a click.
 */

const options = [
  {
    id: "web",
    label: "Treba mi bolji web ili webshop.",
    approach:
      "Krećemo od kupovnog toka i sadržaja, pa onda biramo tehnologiju. Web dobiva strukturu koju vaši kupci razumiju i koju vi možete sami uređivati.",
    projectType: "Web koji radi posao ili Shop s planom",
    href: "/usluge/web-stranice-i-aplikacije",
  },
  {
    id: "kupci",
    label: "Želim da me kupci lakše pronađu.",
    approach:
      "Prvo pogledamo što ljudi zapravo traže i kako to objašnjavate. SEO, sadržaj i email tokovi onda rade na istoj priči, a ne svaki za sebe.",
    projectType: "SEO smjer, Sadržaj koji prodaje ili Email start",
    href: "/usluge/marketing-i-ecommerce-rast",
  },
  {
    id: "rucno",
    label: "Previše toga radimo ručno.",
    approach:
      "Popišemo gdje se podaci prepisuju i koliko to košta u vremenu. Zatim automatiziramo korake koji se najviše ponavljaju i povezujemo sustave koji to dopuštaju.",
    projectType: "API integracija, Aplikacija po mjeri ili Digitalni audit",
    href: "/usluge/automatizacije-i-erp",
  },
] as const;

export function ProblemPicker() {
  const [activeId, setActiveId] = useState<string>(options[0].id);
  const panelId = useId();
  const active = options.find((o) => o.id === activeId) ?? options[0];

  return (
    <div className="rounded-(--radius-card) border border-rule bg-surface p-5 sm:p-7">
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
        Što vam trenutno koči posao?
      </h2>

      <div className="mt-4 flex flex-col gap-2">
        {options.map((option) => {
          const selected = option.id === activeId;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              aria-controls={panelId}
              onClick={() => setActiveId(option.id)}
              className={[
                "min-h-11 rounded-xl px-4 py-3 text-left font-semibold transition-colors duration-200",
                selected
                  ? "bg-accent text-on-accent"
                  : "border border-control bg-paper text-ink hover:border-ink",
              ].join(" ")}
            >
              <span className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className={selected ? "text-on-accent/70" : "text-accent"}
                >
                  →
                </span>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={panelId}
        aria-live="polite"
        className="mt-5 border-t border-rule pt-5"
      >
        <p className="text-ink-soft">{active.approach}</p>
        <p className="mt-4 text-sm">
          <span className="font-semibold">Obično krećemo s: </span>
          <span className="text-ink-soft">{active.projectType}</span>
        </p>
        <Link
          href={active.href}
          className="mt-5 inline-flex min-h-11 items-center rounded-full border border-accent bg-accent px-5 text-[0.9375rem] font-semibold text-on-accent transition-colors hover:bg-accent-ink hover:border-accent-ink"
        >
          Pogledajte kako mogu pomoći
        </Link>
      </div>
    </div>
  );
}
