import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Staging and preview environments must stay out of the index. Indexing is
 * only allowed once NEXT_PUBLIC_ALLOW_INDEXING is explicitly set on the real
 * canonical domain.
 */
export default function robots(): MetadataRoute.Robots {
  if (!site.allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/privatnost"] },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
