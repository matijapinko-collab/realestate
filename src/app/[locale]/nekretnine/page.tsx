import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilters from "@/components/properties/PropertyFilters";

interface SearchParams {
  location?: string;
  type?: string;
  transaction?: string;
  minPrice?: string;
  maxPrice?: string;
  minArea?: string;
  maxArea?: string;
  rooms?: string;
  page?: string;
  [key: string]: string | undefined;
}

export const metadata = {
  title: "Nekretnine",
  description: "Sve dostupne nekretnine — stanovi, kuće, zemljišta. Zagreb, Velika Gorica, Pag i okolica.",
};

export default async function PropertiesPageHR({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const locale = "hr";
  const dbLocale = "HR";

  const where: any = {
    published: true,
    status: "AVAILABLE",
  };

  if (sp.location) where.locationCity = { contains: sp.location, mode: "insensitive" };
  if (sp.type) where.propertyType = sp.type;
  if (sp.transaction) where.transactionType = sp.transaction;
  if (sp.minPrice || sp.maxPrice) {
    where.price = {};
    if (sp.minPrice) where.price.gte = Number(sp.minPrice);
    if (sp.maxPrice) where.price.lte = Number(sp.maxPrice);
  }
  if (sp.minArea || sp.maxArea) {
    where.livingArea = {};
    if (sp.minArea) where.livingArea.gte = Number(sp.minArea);
    if (sp.maxArea) where.livingArea.lte = Number(sp.maxArea);
  }
  if (sp.rooms) where.rooms = { gte: Number(sp.rooms) };

  let properties: any[] = [];
  try {
  properties = (await prisma.property.findMany({
    where,
    include: {
      translations: { where: { locale: dbLocale } },
      images: { orderBy: [{ isCover: "desc" }, { order: "asc" }] },
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  })) as any[];
  } catch {
    // Database not available
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3">
            Nekretnine
          </p>
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-4">
            Sve nekretnine
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Možete pretraživati bez filtera i vidjeti cijelu ponudu, a možete odmah suziti izbor prema lokaciji, cijeni, površini i tipu nekretnine. Ako vam neka nekretnina izgleda zanimljivo, javite mi se — proći ćemo je zajedno.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PropertyFilters locale={locale} currentParams={sp} />

        <div className="mt-8">
          {properties.length === 0 ? (
            <div className="text-center py-24 text-gray-500">
              <p className="text-lg">Nema pronađenih nekretnina.</p>
              <p className="text-sm mt-2">Pokušajte drugačije filtere.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Pronađeno {properties.length} nekretnina
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    locale={locale}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
