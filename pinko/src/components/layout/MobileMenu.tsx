"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/config/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Mobile navigation. Keyboard-operable: the trigger and the panel are plain
 * buttons and links, focus moves into the panel on open and returns to the
 * trigger on close, Escape closes it, and focus is trapped while it is open.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = panel
      ? panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      : null;
    focusables?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusables || focusables.length === 0) return;

      const first = focusables[0] as HTMLElement;
      const last = focusables[focusables.length - 1] as HTMLElement;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobilni-meni"
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-control bg-surface px-4 text-[0.9375rem] font-semibold"
      >
        <span
          aria-hidden="true"
          className="relative flex h-3 w-4 flex-col justify-between"
        >
          <span className="block h-0.5 w-full bg-ink" />
          <span className="block h-0.5 w-full bg-ink" />
          <span className="block h-0.5 w-full bg-ink" />
        </span>
        Meni
      </button>

      {open ? (
        <div
          id="mobilni-meni"
          role="dialog"
          aria-modal="true"
          aria-label="Navigacija"
          className="fixed inset-0 z-50 flex flex-col bg-paper"
        >
          <div ref={panelRef} className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-rule px-4 py-4">
              <span className="text-2xl font-extrabold tracking-tight">
                pinko<span className="text-accent">.</span>
              </span>
              <button
                type="button"
                onClick={close}
                className="min-h-11 rounded-full border border-control bg-surface px-4 text-[0.9375rem] font-semibold"
              >
                Zatvori
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {nav.primary.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3.5 text-2xl font-bold hover:bg-accent-wash"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 space-y-1 border-t border-rule pt-6">
                {nav.secondary.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-2.5 font-medium text-ink-soft hover:bg-accent-wash hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* The switch is hidden in the header on phones because it did
                not fit; it must still exist somewhere, so it lives here. */}
            <div className="border-t border-rule p-4">
              <p className="mono-label mb-3 text-ink-soft">Način prikaza</p>
              <ThemeToggle className="flex w-full justify-center" />
            </div>

            <div className="border-t border-rule p-4">
              <Link
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                className="flex min-h-13 w-full items-center justify-center rounded-full bg-accent px-6 font-semibold text-on-accent"
              >
                {nav.cta.label}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
