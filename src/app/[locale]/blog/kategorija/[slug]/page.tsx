import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { hr } from "date-fns/locale";

export default async function BlogCategoryHR({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dbLocale = "HR";

  const category = await prisma.blogCategory.findUnique({
    where: { locale_slug: { locale: dbLocale, slug } },
  });

  if (!category) notFound();

  const posts = await prisma.blogPost.findMany({
    where: { locale: dbLocale, status: "PUBLISHED", categoryId: category.id },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/hr/blog" className="text-[#D4AF37] text-sm hover:underline mb-4 block">
            ← Blog
          </Link>
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-white">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-gray-400 mt-3">{category.description}</p>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-16">Nema objavljenih članaka u ovoj kategoriji.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/hr/blog/${post.slug}`} className="group block">
                {post.coverImage && (
                  <div className="relative aspect-[16/9] overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="33vw"
                    />
                  </div>
                )}
                <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                )}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {post.publishedAt && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {format(new Date(post.publishedAt), "d. MMM yyyy.", { locale: hr })}
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
