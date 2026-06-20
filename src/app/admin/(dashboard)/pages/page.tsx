import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Edit, Eye } from "lucide-react";

export const metadata = { title: "Stranice" };

export default async function AdminPages() {
  const pages = await prisma.page.findMany({
    orderBy: [{ locale: "asc" }, { pageType: "asc" }],
    include: { _count: { select: { sections: true } } },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-playfair text-2xl font-bold">Stranice</h1>
      </div>
      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-gray-500 px-4 py-3">Naslov</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-gray-500 px-4 py-3 hidden sm:table-cell">Jezik</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-gray-500 px-4 py-3 hidden md:table-cell">Sekcije</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-gray-500 px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pages.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-gray-400">Nema stranica — pokrenite seed skriptu</td></tr>
            ) : pages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">{page.title}</td>
                <td className="px-4 py-3 text-xs font-semibold text-gray-500 hidden sm:table-cell">{page.locale}</td>
                <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{page._count.sections}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 font-medium ${page.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {page.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/admin/pages/${page.id}`} className="p-1.5 text-gray-400 hover:text-[#D4AF37] transition-colors"><Edit size={16} /></Link>
                    <Link href={page.fullPath} target="_blank" className="p-1.5 text-gray-400 hover:text-[#D4AF37] transition-colors"><Eye size={16} /></Link>
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
