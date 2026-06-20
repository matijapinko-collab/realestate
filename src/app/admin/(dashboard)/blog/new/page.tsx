import BlogPostForm from "@/components/admin/BlogPostForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Novi blog post" };

export default async function NewBlogPostPage() {
  let categories: any[] = [];
  try {
    categories = await prisma.blogCategory.findMany({ orderBy: { name: "asc" } });
  } catch {}
  return (
    <div>
      <h1 className="font-playfair text-2xl font-bold mb-6">Novi blog post</h1>
      <BlogPostForm categories={categories} />
    </div>
  );
}
