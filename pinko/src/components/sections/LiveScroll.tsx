import Image from "next/image";
import type { LiveScreen } from "@/content/projects";

/**
 * Lets the reader scroll through the real site without leaving the portfolio.
 *
 * These are full-page captures inside a scrollable frame, not an iframe: the
 * sites send `frame-ancestors 'self'`, and loosening a client's security
 * header so a portfolio can embed them is not a trade worth making. The frame
 * carries the capture date, because a screenshot is a photograph of a moment
 * and the page should not pretend otherwise.
 *
 * The scroll container is focusable so it can be scrolled from the keyboard,
 * and labelled so a screen reader announces what it is.
 */
export function LiveScroll({ screens }: { screens: LiveScreen[] }) {
  return (
    <ul className="grid gap-8 lg:grid-cols-2">
      {screens.map((screen, i) => (
        // `min-w-0`, without which this grid item takes the min-content
        // width of the URL below and pushes the page sideways on a phone:
        // a grid item defaults to `min-width: auto`, and `truncate` cannot
        // shrink a flex child that is not allowed to.
        <li
          key={screen.href + screen.label}
          data-reveal
          data-reveal-delay={i}
          className="min-w-0"
        >
          <figure className="spotlight overflow-hidden rounded-(--radius-card) border border-rule bg-surface transition-colors duration-300 hover:border-accent">
            {/* Browser chrome, purely decorative. */}
            <div className="flex min-w-0 items-center gap-3 border-b border-rule px-4 py-3">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-control" />
                <span className="size-2.5 rounded-full bg-control" />
                <span className="size-2.5 rounded-full bg-control" />
              </span>
              <span className="mono-label min-w-0 truncate text-ink-soft">
                {screen.href.replace(/^https:\/\//, "")}
              </span>
            </div>

            <div
              tabIndex={0}
              role="group"
              aria-label={`${screen.label} — snimka cijele stranice, pomičite za pregled`}
              className="h-[26rem] overflow-y-auto overscroll-contain md:h-[34rem]"
            >
              <Image
                src={screen.image.src}
                alt={screen.image.alt}
                width={screen.image.width}
                height={screen.image.height}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-auto w-full"
              />
            </div>

            <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-rule px-4 py-3">
              <span className="font-semibold">{screen.label}</span>
              <span className="mono-label text-ink-soft">
                snimljeno {screen.capturedOn}
              </span>
              <a
                href={screen.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-6 items-center text-sm font-semibold text-accent underline underline-offset-4"
              >
                Otvorite uživo <span aria-hidden="true">↗</span>
              </a>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
