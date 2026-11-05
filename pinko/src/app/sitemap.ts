import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPublishedProjects } from "@/content/projects";

/**
 * Only real, published routes go in. /privatnost is reachable from the footer
 * but kept out of the sitemap and out of the index.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/usluge", priority: 0.9 },
    { path: "/usluge/development", priority: 0.9 },
    { path: "/usluge/marketing", priority: 0.8 },
    { path: "/usluge/business-development", priority: 0.8 },
    { path: "/cjenik", priority: 0.9 },
    { path: "/projekti", priority: 0.7 },
    { path: "/o-meni", priority: 0.7 },
    { path: "/kako-radim", priority: 0.6 },
    { path: "/kontakt", priority: 0.8 },
    { path: "/cv", priority: 0.6 },
  ];

  const projectRoutes = getPublishedProjects().map((project) => ({
    path: `/projekti/${project.slug}`,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: `${site.url}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
