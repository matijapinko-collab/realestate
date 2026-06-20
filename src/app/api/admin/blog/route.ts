import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateReadingTime } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const readingTime = data.content ? calculateReadingTime(data.content) : 1;

  const post = await prisma.blogPost.create({
    data: {
      locale: data.locale,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      content: data.content || null,
      coverImage: data.coverImage || null,
      coverImageAlt: data.coverImageAlt || null,
      authorName: data.authorName || "Matija Pinko",
      status: data.status || "DRAFT",
      featured: data.featured || false,
      categoryId: data.categoryId || null,
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
      readingTime,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  return NextResponse.json(post);
}
