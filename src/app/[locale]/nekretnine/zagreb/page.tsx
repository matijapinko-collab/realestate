import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/properties/PropertyCard";

export const metadata: Metadata = {
  title: "Nekretnine Zagreb",
  description: "Zagreb — najveće i najdinamičnije tržište nekretnina u Hrvatskoj.",
};

export default async function NekretnineZagrebPage() {
  let properties: any[] = [];

  try {
    properties = await prisma.property.findMany({
      where: {
        published: true,
        locationCity: { contains: "Zagreb", mode: "insensitive" },
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
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Zagreb</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Nekretnine Zagreb
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl space-y-6 text-gray-600 text-lg leading-relaxed mb-16">
          <p>
            Zagreb je tržište na kojem jedna ulica može imati potpuno drugačiju dinamiku od ulice udaljene svega nekoliko minuta hoda. Upravo zato kupnja ili prodaja nekretnine u Zagrebu nije samo pitanje kvadrature i cijene nego razumijevanja lokacije, potražnje i dugoročnog potencijala.
          </p>
          <p>
            Neki kupci traže život u centru grada, drugi žele mirniji kvart za obitelj, treći gledaju isključivo investicijski potencijal i mogućnost budućeg rasta vrijednosti.
          </p>
          <p>
            Tržište nekretnina u Zagrebu mijenja se brže nego što većina ljudi misli. Upravo zato vjerujem da je važno gledati dalje od oglasa i razumjeti širu sliku prije nego donesete odluku.
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
            <p className="text-gray-500 text-lg mb-4">Trenutno nema dostupnih nekretnina u Zagrebu.</p>
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
            Razgovarajmo o vašim planovima u Zagrebu
          </Link>
        </div>
      </div>
    </div>
  );
}
