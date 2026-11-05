import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

/**
 * This app lives in a subdirectory of a repository that also holds an
 * unrelated Next.js project. Turbopack finds the project root by walking up to
 * the nearest lockfile, which would land on the parent repo and pull in its
 * files, so the root is pinned here explicitly.
 */
// `fileURLToPath` decodes the URL; `new URL(...).pathname` would keep percent
// escapes and break on any path containing a space.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  // Self-hosting (Hetzner/Coolify/Docker) builds a minimal server bundle.
  // Harmless on platforms that ignore it.
  output: "standalone",
  outputFileTracingRoot: projectRoot,
  poweredByHeader: false,
  /**
   * The three discipline pages became four service pages with the brief of
   * 19 Oct 2026. These are permanent redirects, not rewrites: the old
   * addresses are gone for good, and anything already linked or indexed
   * should be told so once rather than served the same page at two URLs.
   */
  /**
   * Service addresses. The site split into four services on the morning of
   * 19 Oct 2026 and went back to three the same afternoon, when the copy
   * arrived written that way. The three slugs are the originals, so only
   * the four interim addresses need forwarding — and none of these targets
   * is itself a source, so there is no redirect loop.
   */
  async redirects() {
    return [
      {
        source: "/usluge/web-stranice-i-aplikacije",
        destination: "/usluge/development",
        permanent: true,
      },
      {
        source: "/usluge/webshopovi",
        destination: "/usluge/development",
        permanent: true,
      },
      {
        source: "/usluge/automatizacije-i-erp",
        destination: "/usluge/business-development",
        permanent: true,
      },
      {
        source: "/usluge/marketing-i-ecommerce-rast",
        destination: "/usluge/marketing",
        permanent: true,
      },
    ];
  },
  images: {
    // Only local images are used for now. Add remote hosts here deliberately.
    remotePatterns: [],
  },
};

export default nextConfig;
