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
  [key: string]: string | undefined;
}

export const metadata = {
  title: "Properties",
  description: "All available properties — apartments, houses, land. Zagreb, Velika Gorica, Pag and surroundings.",
};

export default async function PropertiesPageEN({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const locale = "en";
  const dbLocale = "EN";

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
    properties = await prisma.property.findMany({
      where,
      include: {
        translations: { where: { locale: dbLocale } },
        images: { orderBy: [{ isCover: "desc" }, { order: "asc" }] },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    // Database not available
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3">
            Properties
          </p>
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-4">
            All Properties
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Browse the full listing or filter by location, price, size and property type. If something looks interesting, get in touch — we&apos;ll go through it together, not just what&apos;s in the listing but what you really need to know before entering negotiations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PropertyFilters locale={locale} currentParams={sp} />

        <div className="mt-8">
          {properties.length === 0 ? (
            <div className="text-center py-24 text-gray-500">
              <p className="text-lg">No properties found.</p>
              <p className="text-sm mt-2">Try different filters.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Found {properties.length} properties
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
