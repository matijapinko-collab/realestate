import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/properties/PropertyCard";

export const metadata: Metadata = {
  title: "Nekretnine Pag",
  description: "Pag — jedinstvena kombinacija životnog stila, turizma i investicijskog potencijala.",
};

export default async function NekretnInePagPage() {
  let properties: any[] = [];

  try {
    properties = await prisma.property.findMany({
      where: {
        published: true,
        locationCity: { contains: "Pag", mode: "insensitive" },
      },
      include: {
        translations: { where: { locale: "HR" } },
        images: { orderBy: [{ isCover: "desc" }, { order: "asc" }] },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    properties = [];
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Pag</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Nekretnine Pag
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl space-y-6 text-gray-600 text-lg leading-relaxed mb-16">
          <p>
            Pag je jedno od onih tržišta koje ljudi često gledaju kroz dvije potpuno različite perspektive. Jedni vide mjesto za život, odmor i bijeg od svakodnevice, dok drugi vide investicijsku priliku koja dugoročno može imati vrlo ozbiljan potencijal. Istina je negdje između.
          </p>
          <p>
            Dobra nekretnina na Pagu može biti i jedno i drugo — ali samo ako je odluka donesena na temelju stvarnih informacija, a ne samo pogleda na more ili nekoliko lijepih fotografija.
          </p>
          <p>
            Nisu sve lokacije iste. Nisu sve nekretnine iste. Nije svaki pogled na more automatski dobra investicija. Upravo zato lokalno znanje čini veliku razliku.
          </p>
        </div>

        {properties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} locale="hr" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-16">
            <p className="text-gray-500 text-lg mb-4">Trenutno nema dostupnih nekretnina na Pagu.</p>
            <Link href="/hr/kontakt" className="text-[#D4AF37] font-semibold hover:underline">
              Javite mi se i reći ću vam što se nudi
            </Link>
          </div>
        )}

        <div className="border-t border-gray-100 pt-12 text-center">
          <Link
            href="/hr/kontakt"
            className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors"
          >
            Razgovarajmo o nekretninama na Pagu
          </Link>
        </div>
      </div>
    </div>
  );
}
