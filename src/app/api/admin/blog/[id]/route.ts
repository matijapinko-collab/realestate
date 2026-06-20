import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateReadingTime } from "@/lib/utils";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();
  const readingTime = data.content ? calculateReadingTime(data.content) : 1;

  const existing = await prisma.blogPost.findUnique({ where: { id } });

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      locale: data.locale,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      content: data.content || null,
      coverImage: data.coverImage || null,
      coverImageAlt: data.coverImageAlt || null,
      authorName: data.authorName || "Matija Pinko",
      status: data.status,
      featured: data.featured || false,
      categoryId: data.categoryId || null,
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
      readingTime,
      publishedAt:
        data.status === "PUBLISHED" && !existing?.publishedAt
          ? new Date()
          : existing?.publishedAt,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
