"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { site } from "@/config/site";
import { bioLong } from "@/content/copy";
import { career } from "@/content/career";

/**
 * The portrait in the hero: Matija inside a turning accent ring, and the
 * whole thing is a button that opens his biography.
 *
 * A native `<dialog>` does the heavy lifting — focus is trapped, Escape
 * closes, the rest of the page goes inert — so none of that has to be
 * reimplemented badly. The biography itself is plain markup inside it, so
 * the text is in the HTML whether or not the dialog is ever opened.
 */
export function PortraitBio() {
  const portrait = site.portrait;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    dialogRef.current?.showModal();
    // The page behind the dialog must not scroll with it.
    document.body.style.overflow = "hidden";
  }, []);
  const close = useCallback(() => dialogRef.current?.close(), []);

  // Escape closes the dialog without going through `close()`, so the scroll
  // lock is lifted on the dialog's own close event instead.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const unlock = () => {
      document.body.style.overflow = "";
    };
    dialog.addEventListener("close", unlock);
    return () => {
      dialog.removeEventListener("close", unlock);
      unlock();
    };
  }, []);

  if (!portrait) return null;

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="group relative aspect-square w-full max-w-sm cursor-pointer rounded-full"
      >
        {/* The turning ring. Decorative, and it stops under reduced motion. */}
        <span
          aria-hidden="true"
          className="portrait-ring absolute inset-0 rounded-full"
        />
        <span
          aria-hidden="true"
          className="absolute inset-[3px] rounded-full border border-rule"
        />
        <Image
          src={portrait.src}
          alt={portrait.alt}
          width={portrait.width}
          height={portrait.height}
          priority
          sizes="(min-width: 1024px) 24rem, 80vw"
          className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-full object-cover transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.02]"
        />
        <span className="mono-label absolute inset-x-0 -bottom-9 flex items-center justify-center gap-2 text-ink-soft transition-colors group-hover:text-accent">
          Otvorite biografiju <span aria-hidden="true">↗</span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="bio-naslov"
        className="m-auto w-[min(56rem,92vw)] max-w-none rounded-(--radius-card) border border-rule bg-surface p-0 text-ink backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="max-h-[85vh] overflow-y-auto overscroll-contain">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-rule bg-surface/95 px-6 py-4 backdrop-blur-md md:px-8">
            <p className="mono-label text-ink-soft">Biografija</p>
            <button
              type="button"
              onClick={close}
              className="mono-label rounded-(--radius-pill) border border-control px-3 py-1.5 font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Zatvori ✕
            </button>
          </div>

          <div className="px-6 py-8 md:px-8 md:py-10">
            <div className="flex flex-wrap items-center gap-5">
              <Image
                src={portrait.src}
                alt=""
                width={portrait.width}
                height={portrait.height}
                sizes="88px"
                className="size-22 rounded-full object-cover"
              />
              <div>
                <h2
                  id="bio-naslov"
                  className="text-(length:--text-title) font-extrabold"
                >
                  {site.person}
                </h2>
                <p className="mono-label mt-1.5 text-ink-soft">
                  Development / Marketing / Business Development
                </p>
              </div>
            </div>

            <div className="measure-wide mt-7 space-y-4 text-ink-soft">
              {bioLong.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h3 className="mt-10 text-(length:--text-title) font-extrabold">
              Put do ovdje
            </h3>
            <ol className="mt-5 space-y-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule">
              {career.map((entry) => (
                <li
                  key={`${entry.organisation}-${entry.period}`}
                  className="bg-surface p-5 md:p-6"
                >
                  <p className="mono-label text-ink-soft">{entry.period}</p>
                  <p className="mt-1.5 font-extrabold">{entry.role}</p>
                  <p className="text-sm font-semibold text-accent">
                    {entry.organisation}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">{entry.summary}</p>
                </li>
              ))}
            </ol>

            <Link
              href="/o-meni"
              onClick={close}
              className="mt-8 inline-flex min-h-11 items-center rounded-(--radius-pill) bg-accent px-5 text-[0.9375rem] font-semibold text-on-accent transition-colors hover:bg-accent-ink"
            >
              Cijela stranica o meni <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
