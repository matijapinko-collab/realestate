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
  async redirects() {
    return [
      {
        source: "/usluge/development",
        destination: "/usluge/web-stranice-i-aplikacije",
        permanent: true,
      },
      {
        source: "/usluge/marketing",
        destination: "/usluge/marketing-i-ecommerce-rast",
        permanent: true,
      },
      {
        source: "/usluge/business-development",
        destination: "/usluge/automatizacije-i-erp",
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
