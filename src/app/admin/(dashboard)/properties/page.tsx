import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Plus, Edit } from "lucide-react";
import DeletePropertyButton from "@/components/admin/DeletePropertyButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Nekretnine" };

export default async function AdminProperties({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const sp = await searchParams;

  const where: Record<string, unknown> = {};
  if (sp.q) {
    where.OR = [
      { locationCity: { contains: sp.q, mode: "insensitive" } },
      { translations: { some: { title: { contains: sp.q, mode: "insensitive" } } } },
    ];
  }
  if (sp.status) where.published = sp.status === "published";

  let properties: any[] = [];
  try {
    properties = await prisma.property.findMany({
      where,
      include: {
        translations: true,
        images: { where: { isCover: true }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {}

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-playfair text-2xl font-bold">Nekretnine</h1>
        <Link href="/admin/properties/new" className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-white text-sm font-medium hover:bg-[#B8972E] transition-colors">
          <Plus size={16} /> Nova nekretnina
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 p-4 mb-4 flex gap-4">
        <form className="flex gap-4 flex-1">
          <input name="q" defaultValue={sp.q} placeholder="Pretraži..." className="px-3 py-2 border border-gray-200 text-sm flex-1 focus:outline-none focus:border-[#D4AF37]" />
          <select name="status" defaultValue={sp.status} className="px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37] bg-white">
            <option value="">Sve</option>
            <option value="published">Objavljene</option>
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
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-gray-500 px-4 py-3 hidden md:table-cell">Lokacija</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-gray-500 px-4 py-3 hidden lg:table-cell">Cijena</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-gray-500 px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {properties.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-gray-400">Nema nekretnina</td></tr>
            ) : (
              properties.map((p: any) => {
                const hrTitle = p.translations.find((t: any) => t.locale === "HR")?.title || p.translations[0]?.title || "—";
                return (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">{hrTitle}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{p.locationCity}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">{p.price ? formatPrice(Number(p.price)) : "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 font-medium ${p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {p.published ? "Objavljeno" : "Skica"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/admin/properties/${p.id}`} className="p-1.5 text-gray-400 hover:text-[#D4AF37] transition-colors"><Edit size={16} /></Link>
                        <DeletePropertyButton propertyId={p.id} />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
