import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogPostForm from "@/components/admin/BlogPostForm";

export const metadata = { title: "Uredi blog post" };

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, categories] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id } }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!post) notFound();
  return (
    <div>
      <h1 className="font-playfair text-2xl font-bold mb-6">Uredi blog post</h1>
      <BlogPostForm post={post} categories={categories} />
    </div>
  );
}
