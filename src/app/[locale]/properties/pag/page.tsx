import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/properties/PropertyCard";

export const metadata: Metadata = {
  title: "Real Estate on Pag",
  description: "Pag — a unique combination of lifestyle, tourism and investment potential.",
};

export default async function PropertiesPagPage() {
  let properties: any[] = [];

  try {
    properties = await prisma.property.findMany({
      where: {
        published: true,
        locationCity: { contains: "Pag", mode: "insensitive" },
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
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Pag</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Real Estate on Pag
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl space-y-6 text-gray-600 text-lg leading-relaxed mb-16">
          <p>
            People buy property on Pag for very different reasons. Some are looking for a place to escape the pace of city life. Some want a holiday home they can enjoy with family and friends. Others are focused entirely on investment potential, rental income and long-term appreciation. All three groups often end up looking at the same properties while evaluating them through completely different lenses.
          </p>
          <p>
            The island offers incredible opportunities, but not every opportunity is automatically a good investment. Location matters. Accessibility matters. Infrastructure matters. Tourism trends matter. Future development plans matter. And perhaps most importantly, your objective matters.
          </p>
          <p>
            Whether you&apos;re looking for a home, a holiday property, land or an investment opportunity, the goal should never be to buy because something looks attractive today. The goal should be to understand why it will still make sense years from now.
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
            <p className="text-gray-500 text-lg mb-4">No properties currently available on Pag.</p>
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
            Let&apos;s Talk About Pag
          </Link>
        </div>
      </div>
    </div>
  );
}
