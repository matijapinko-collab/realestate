import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: `${BASE_URL}/hr`, priority: 1.0 },
    { url: `${BASE_URL}/en`, priority: 1.0 },
    { url: `${BASE_URL}/hr/o-meni`, priority: 0.8 },
    { url: `${BASE_URL}/en/about-me`, priority: 0.8 },
    { url: `${BASE_URL}/hr/nekretnine`, priority: 0.9 },
    { url: `${BASE_URL}/en/properties`, priority: 0.9 },
    { url: `${BASE_URL}/hr/blog`, priority: 0.8 },
    { url: `${BASE_URL}/en/blog`, priority: 0.8 },
    { url: `${BASE_URL}/hr/kako-radim`, priority: 0.7 },
    { url: `${BASE_URL}/en/how-i-work`, priority: 0.7 },
    { url: `${BASE_URL}/hr/kontakt`, priority: 0.7 },
    { url: `${BASE_URL}/en/contact`, priority: 0.7 },
  ];

  let properties: any[] = [];
  let blogPosts: any[] = [];
  let categories: any[] = [];

  try {
    [properties, blogPosts, categories] = await Promise.all([
      prisma.propertyTranslation.findMany({
        where: { property: { published: true } },
        select: { locale: true, slug: true, updatedAt: true },
      }),
      prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        select: { locale: true, slug: true, updatedAt: true },
      }),
      prisma.blogCategory.findMany({
        select: { locale: true, slug: true },
      }),
    ]);
  } catch {}

  const propertyUrls = properties.map((p: any) => ({
    url: p.locale === "HR" ? `${BASE_URL}/hr/nekretnine/${p.slug}` : `${BASE_URL}/en/properties/${p.slug}`,
    lastModified: p.updatedAt,
    priority: 0.8,
  }));

  const blogUrls = blogPosts.map((p: any) => ({
    url: p.locale === "HR" ? `${BASE_URL}/hr/blog/${p.slug}` : `${BASE_URL}/en/blog/${p.slug}`,
    lastModified: p.updatedAt,
    priority: 0.7,
  }));

  const categoryUrls = categories.map((c: any) => ({
    url: c.locale === "HR" ? `${BASE_URL}/hr/blog/kategorija/${c.slug}` : `${BASE_URL}/en/blog/category/${c.slug}`,
    priority: 0.6,
  }));

  return [...staticPages, ...propertyUrls, ...blogUrls, ...categoryUrls];
}
