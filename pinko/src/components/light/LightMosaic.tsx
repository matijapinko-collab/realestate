"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { LightMosaic as Mosaic } from "@/content/light-mosaics";

/**
 * A project mosaic with the reference's cursor-following detail button.
 *
 * The whole block is one link, so a keyboard reaches the project in one
 * stop and a screen reader hears one destination. The round button is
 * decorative chrome on top of that link: it is aria-hidden, follows the
 * pointer with a transform rather than by writing layout properties, and
 * never appears on touch, where a hover state is a trap.
 *
 * Pointer position is written straight to CSS custom properties on the
 * element. No state, so React does not re-render on mousemove.
 */
export function LightMosaic({ mosaic }: { mosaic: Mosaic }) {
  const frame = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState(false);

  function track(event: React.PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse") return;
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    frame.current?.style.setProperty("--x", `${event.clientX - box.left}px`);
    frame.current?.style.setProperty("--y", `${event.clientY - box.top}px`);
  }

  return (
    <Link
      ref={frame}
      href={`/projekti/${mosaic.slug}`}
      className="lx-mosaic group"
      onPointerMove={track}
      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      <div className="lx-mosaic-grid">
        {mosaic.plates.map((plate) => (
          <figure
            key={plate.src}
            className="lx-plate"
            style={
              {
                "--span": plate.span,
                aspectRatio: plate.ratio,
              } as React.CSSProperties
            }
          >
            <Image
              src={plate.src}
              alt={plate.alt}
              width={plate.width}
              height={plate.height}
              sizes="(min-width: 1024px) 45rem, 92vw"
              className="h-full w-full object-cover object-top"
            />
          </figure>
        ))}
      </div>

      <span
        aria-hidden="true"
        data-active={active}
        className="lx-detail"
      >
        Detalji
      </span>
    </Link>
  );
}
