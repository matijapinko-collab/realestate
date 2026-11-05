import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Pinko — Razvoj. Marketing. Posao koji ide dalje.";

/**
 * Social share image.
 *
 * Painted in the dark scheme, which is what a first visitor sees, with the
 * same pink "o" as the wordmark on the site. The values are written out
 * rather than read from CSS because `ImageResponse` renders outside the
 * document and never sees the stylesheet — so they have to be kept in step
 * with `globals.css` by hand.
 *
 * ImageResponse supports only flexbox and a subset of CSS, so the layout
 * here is deliberately plain.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0C11",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 44,
            fontWeight: 800,
            color: "#E8ECF3",
          }}
        >
          <span>pink</span>
          <span style={{ color: "#FF6BB3" }}>o</span>
          <span style={{ color: "#36E27E" }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#E8ECF3",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {site.tagline}
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#9AA5B4" }}>
            {`Next.js webovi, webshopovi i aplikacije · ${site.person}`}
          </div>
        </div>

        <div style={{ display: "flex", height: 10, width: 220, backgroundColor: "#36E27E" }} />
      </div>
    ),
    size
  );
}
