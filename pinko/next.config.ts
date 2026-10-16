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
  images: {
    // Only local images are used for now. Add remote hosts here deliberately.
    remotePatterns: [],
  },
};

export default nextConfig;
