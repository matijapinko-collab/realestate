import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/properties/PropertyCard";

export const metadata: Metadata = {
  title: "Real Estate in Zagreb",
  description: "Zagreb — Croatia's largest and most dynamic property market.",
};

export default async function PropertiesZagrebPage() {
  let properties: any[] = [];

  try {
    properties = await prisma.property.findMany({
      where: {
        published: true,
        locationCity: { contains: "Zagreb", mode: "insensitive" },
      },
      include: {
        translations: { where: { locale: "EN" } },
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
            Real Estate in Zagreb
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl space-y-6 text-gray-600 text-lg leading-relaxed mb-16">
          <p>
            Zagreb is one of those markets that becomes more interesting the deeper you look. From the outside, people often treat it as a single market. They talk about average prices, average demand and average trends as if the city operates as one cohesive system. It doesn&apos;t.
          </p>
          <p>
            Someone looking at a property in Maksimir isn&apos;t competing with the same buyers as someone looking in Jarun. A family searching for a house in Šestine isn&apos;t evaluating the same opportunities as a young professional searching for an apartment near the city center. Even within the same neighborhood, two streets can produce dramatically different outcomes.
          </p>
          <p>
            That&apos;s why I don&apos;t view Zagreb as a single market. I view it as dozens of interconnected micro-markets, each with its own opportunities, challenges and buyer behavior. And understanding those differences is often what separates an average decision from a great one.
          </p>
        </div>

        {properties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} locale="en" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-16">
            <p className="text-gray-500 text-lg mb-4">No properties currently available in Zagreb.</p>
            <Link href="/en/contact" className="text-[#D4AF37] font-semibold hover:underline">
              Get in touch to learn what&apos;s available
            </Link>
          </div>
        )}

        <div className="border-t border-gray-100 pt-12 text-center">
          <Link
            href="/en/contact"
            className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors"
          >
            Let&apos;s Talk About Zagreb
          </Link>
        </div>
      </div>
    </div>
  );
}
