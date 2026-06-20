import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { hr, enUS } from "date-fns/locale";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "hr" ? "Blog — Nekretnine" : "Blog — Real Estate",
    description:
      locale === "hr"
        ? "Savjeti, tržište i vodič kroz nekretnine."
        : "Tips, market updates and real estate guides.",
  };
}

export default async function BlogListPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const dbLocale = locale.toUpperCase() as "HR" | "EN";
  const isHR = locale === "hr";

  let categories: any[] = [];
  let posts: any[] = [];
  try {
    categories = await prisma.blogCategory.findMany({
      where: { locale: dbLocale },
      orderBy: { name: "asc" },
    });

    const where: Record<string, unknown> = { locale: dbLocale, status: "PUBLISHED" };
    if (sp.category) {
      const cat = categories.find((c: any) => c.slug === sp.category);
      if (cat) where.categoryId = cat.id;
    }

    posts = await prisma.blogPost.findMany({
      where,
      include: { category: true },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    });
  } catch {
    // Database not available
  }

  const featuredPost = posts.find((p) => p.featured) || posts[0] || null;
  const regularPosts = posts.filter((p) => p.id !== featuredPost?.id);

  const dateLocale = isHR ? hr : enUS;

  const blogPath = isHR ? "/hr/blog" : "/en/blog";
  const postPath = (slug: string) =>
    isHR ? `/hr/blog/${slug}` : `/en/blog/${slug}`;
  const categoryPath = (slug: string) =>
    isHR ? `/hr/blog/kategorija/${slug}` : `/en/blog/category/${slug}`;

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="bg-[#1A1A1A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3">
            Blog
          </p>
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-4">
            {isHR
              ? "Savjeti i vodič kroz nekretnine"
              : "Real Estate Tips & Guides"}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            {isHR
              ? "Ovaj blog nije zamišljen kao još jedno mjesto koje će ponavljati općenite savjete. Cilj mu je pomoći ljudima da bolje razumiju tržište nekretnina, donose pametnije odluke i izbjegnu pogreške koje često koštaju puno više nego što očekuju."
              : "This blog isn't designed to repeat the same recycled advice. The goal is to help people understand the property market better, make smarter decisions, and avoid mistakes that often cost far more than expected."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href={blogPath}
              className={`px-4 py-2 text-sm font-medium border transition-colors ${
                !sp.category
                  ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                  : "border-gray-200 text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              }`}
            >
              {isHR ? "Sve" : "All"}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={categoryPath(cat.slug)}
                className={`px-4 py-2 text-sm font-medium border transition-colors ${
                  sp.category === cat.slug
                    ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                    : "border-gray-200 text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Featured post */}
        {featuredPost && !sp.category && (
          <div className="mb-16">
            <Link href={postPath(featuredPost.slug)} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  {featuredPost.coverImage ? (
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.coverImageAlt || featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#D4AF37] text-white text-xs font-semibold uppercase">
                      {isHR ? "Istaknuto" : "Featured"}
                    </span>
                  </div>
                </div>
                <div>
                  {featuredPost.category && (
                    <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-3 block">
                      {featuredPost.category.name}
                    </span>
                  )}
                  <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4 group-hover:text-[#D4AF37] transition-colors">
                    {featuredPost.title}
                  </h2>
                  {featuredPost.excerpt && (
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {featuredPost.publishedAt && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#D4AF37]" />
                        {format(new Date(featuredPost.publishedAt), "d. MMMM yyyy.", {
                          locale: dateLocale,
                        })}
                      </span>
                    )}
                    {featuredPost.readingTime && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-[#D4AF37]" />
                        {featuredPost.readingTime} {isHR ? "min čitanja" : "min read"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog grid */}
        {regularPosts.length === 0 && !featuredPost ? (
          <div className="text-center py-24 text-gray-500">
            <p className="text-lg">{isHR ? "Nema objavljenih članaka." : "No published articles yet."}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                href={postPath(post.slug)}
                className="group block"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 mb-4">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
                {post.category && (
                  <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-2 block">
                    {post.category.name}
                  </span>
                )}
                <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {post.publishedAt && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {format(new Date(post.publishedAt), "d. MMM yyyy.", {
                        locale: dateLocale,
                      })}
                    </span>
                  )}
                  {post.readingTime && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readingTime} min
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
