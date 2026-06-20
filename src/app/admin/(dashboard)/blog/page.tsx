import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog" };

export default async function AdminBlog({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; locale?: string; status?: string }>;
}) {
  const sp = await searchParams;

  const where: Record<string, unknown> = {};
  if (sp.q) where.title = { contains: sp.q, mode: "insensitive" };
  if (sp.locale) where.locale = sp.locale.toUpperCase();
  if (sp.status) where.status = sp.status.toUpperCase();

  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {}

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-playfair text-2xl font-bold">Blog</h1>
        <Link href="/admin/blog/new" className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-white text-sm font-medium hover:bg-[#B8972E] transition-colors">
          <Plus size={16} /> Novi post
        </Link>
      </div>

      <div className="bg-white border border-gray-200 p-4 mb-4">
        <form className="flex gap-4 flex-wrap">
          <input name="q" defaultValue={sp.q} placeholder="Pretraži naslove..." className="px-3 py-2 border border-gray-200 text-sm flex-1 min-w-[200px] focus:outline-none focus:border-[#D4AF37]" />
          <select name="locale" defaultValue={sp.locale} className="px-3 py-2 border border-gray-200 text-sm bg-white focus:outline-none">
            <option value="">Svi jezici</option>
            <option value="hr">HR</option>
            <option value="en">EN</option>
          </select>
          <select name="status" defaultValue={sp.status} className="px-3 py-2 border border-gray-200 text-sm bg-white focus:outline-none">
            <option value="">Svi statusi</option>
            <option value="published">Objavljeni</option>
            <option value="draft">Skice</option>
          </select>
          <button type="submit" className="px-4 py-2 bg-[#1A1A1A] text-white text-sm">Filtriraj</button>
        </form>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-gray-500 px-4 py-3">Naslov</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-gray-500 px-4 py-3 hidden md:table-cell">Kategorija</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-gray-500 px-4 py-3 hidden sm:table-cell">Jezik</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-gray-500 px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-gray-400">Nema postova</td></tr>
            ) : posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A] max-w-xs truncate">{post.title}</td>
                <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{post.category?.name || "—"}</td>
                <td className="px-4 py-3 text-xs font-semibold text-gray-600 hidden sm:table-cell">{post.locale}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 font-medium ${post.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {post.status === "PUBLISHED" ? "Objavljeno" : "Skica"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/admin/blog/${post.id}`} className="p-1.5 text-gray-400 hover:text-[#D4AF37] transition-colors"><Edit size={16} /></Link>
                    <DeleteBlogButton postId={post.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
