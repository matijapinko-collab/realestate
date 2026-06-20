import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/properties/PropertyCard";

export const metadata: Metadata = {
  title: "Nekretnine Velika Gorica",
  description: "Velika Gorica — jedno od najzanimljivijih tržišta nekretnina za ljude koji žele više prostora i bolju kvalitetu života.",
};

export default async function NekretnineVelikaGoricaPage() {
  let properties: any[] = [];

  try {
    properties = await prisma.property.findMany({
      where: {
        published: true,
        locationCity: { contains: "Velika Gorica", mode: "insensitive" },
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
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Velika Gorica</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Nekretnine Velika Gorica
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl space-y-6 text-gray-600 text-lg leading-relaxed mb-16">
          <p>
            Velika Gorica već godinama nije samo grad pokraj Zagreba. Postala je jedno od najzanimljivijih tržišta nekretnina za ljude koji žele više prostora, bolju kvalitetu života i dobru povezanost s glavnim gradom.
          </p>
          <p>
            Grad nudi snažnu prometnu povezanost, blizinu aerodroma, rastuću infrastrukturu, kvartove prilagođene obiteljima i znatno više opcija za one koji traže veće stambene površine nego što ih mogu pronaći u Zagrebu.
          </p>
          <p>
            Ne postoje iste mogućnosti u svim dijelovima Velike Gorice. Neke lokacije privlače mlade obitelji, neke investitore, a neke ljude koji jednostavno žele više mira. Razumijevanje tih razlika presudno je za dobru odluku.
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
            <p className="text-gray-500 text-lg mb-4">Trenutno nema dostupnih nekretnina u Velikoj Gorici.</p>
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
            Razgovarajmo o vašim planovima u Velikoj Gorici
          </Link>
        </div>
      </div>
    </div>
  );
}
