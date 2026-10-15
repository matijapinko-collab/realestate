import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Pinko — Razvoj. Marketing. Posao koji ide dalje.";

/**
 * Social share image, generated from the same brand tokens as the site.
 * ImageResponse supports only flexbox and a subset of CSS, so the layout here
 * is deliberately plain.
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
          backgroundColor: "#FAFAF7",
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
            color: "#171A20",
          }}
        >
          <span>pinko</span>
          <span style={{ color: "#2457F5" }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#171A20",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {site.tagline}
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#535963" }}>
            {`Next.js webovi, webshopovi i aplikacije · ${site.person}`}
          </div>
        </div>

        <div style={{ display: "flex", height: 10, width: 220, backgroundColor: "#2457F5" }} />
      </div>
    ),
    size
  );
}
