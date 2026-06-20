import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { hr, enUS } from "date-fns/locale";
import BlogContent from "@/components/blog/BlogContent";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dbLocale = locale.toUpperCase() as "HR" | "EN";
  const post = await prisma.blogPost.findUnique({
    where: { locale_slug: { locale: dbLocale, slug } },
  });
  if (!post) return { title: "Blog" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || "",
    openGraph: {
      images: post.ogImage ? [post.ogImage] : post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dbLocale = locale.toUpperCase() as "HR" | "EN";
  const isHR = locale === "hr";
  const dateLocale = isHR ? hr : enUS;

  const post = await prisma.blogPost.findUnique({
    where: { locale_slug: { locale: dbLocale, slug } },
    include: { category: true },
  });

  if (!post || post.status !== "PUBLISHED") notFound();

  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      locale: dbLocale,
      status: "PUBLISHED",
      categoryId: post.categoryId || undefined,
      id: { not: post.id },
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });

  const blogListPath = isHR ? "/hr/blog" : "/en/blog";

  return (
    <article className="pt-20">
      {/* Cover image */}
      {post.coverImage && (
        <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden bg-gray-100">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back */}
        <Link
          href={blogListPath}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#D4AF37] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          {isHR ? "Natrag na blog" : "Back to blog"}
        </Link>

        {/* Header */}
        <header className="mb-10">
          {post.category && (
            <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4 block">
              {post.category.name}
            </span>
          )}
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight mb-6">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-8 border-b border-gray-100">
            <span className="flex items-center gap-1.5">
              <User size={14} className="text-[#D4AF37]" />
              {post.authorName}
            </span>
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#D4AF37]" />
                {format(new Date(post.publishedAt), "d. MMMM yyyy.", {
                  locale: dateLocale,
                })}
              </span>
            )}
            {post.readingTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#D4AF37]" />
                {post.readingTime} {isHR ? "min čitanja" : "min read"}
              </span>
            )}
          </div>
        </header>

        {/* Content */}
        {post.content && (
          <div className="prose prose-lg max-w-none mb-12">
            <BlogContent content={post.content} />
          </div>
        )}

        {/* CTA */}
        <div className="bg-[#1A1A1A] text-white p-8 mt-12 text-center">
          <h3 className="font-playfair text-2xl font-bold mb-3">
            {isHR ? "Imate pitanje o nekretninama?" : "Have a real estate question?"}
          </h3>
          <p className="text-gray-400 mb-6">
            {isHR
              ? "Kontaktirajte me i dobit ćete konkretan odgovor."
              : "Contact me and get a concrete answer."}
          </p>
          <Link
            href={`/${locale}/${isHR ? "kontakt" : "contact"}`}
            className="inline-flex items-center px-8 py-3 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors"
          >
            {isHR ? "Kontaktirajte me" : "Get in Touch"}
          </Link>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-playfair text-3xl font-bold mb-8">
              {isHR ? "Slični članci" : "Related Articles"}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={isHR ? `/hr/blog/${rp.slug}` : `/en/blog/${rp.slug}`}
                  className="group block"
                >
                  {rp.coverImage && (
                    <div className="relative aspect-[16/9] overflow-hidden mb-3">
                      <Image
                        src={rp.coverImage}
                        alt={rp.coverImageAlt || rp.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="33vw"
                      />
                    </div>
                  )}
                  <h3 className="font-playfair text-lg font-bold group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                    {rp.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
