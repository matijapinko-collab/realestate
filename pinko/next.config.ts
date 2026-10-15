import path from "node:path";
import type { NextConfig } from "next";

/**
 * This app lives in a subdirectory of a repository that also holds an
 * unrelated Next.js project. Turbopack finds the project root by walking up to
 * the nearest lockfile, which would land on the parent repo and pull in its
 * files, so the root is pinned here explicitly.
 */
const projectRoot = path.dirname(new URL(import.meta.url).pathname);

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
