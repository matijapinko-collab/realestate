import Link from "next/link";
import PropertyCard from "@/components/properties/PropertyCard";

interface Property {
  id: string;
  transactionType: string;
  propertyType: string;
  price: any;
  currency: string;
  locationCity: string;
  locationArea?: string | null;
  livingArea?: number | null;
  rooms?: number | null;
  featured: boolean;
  translations: Array<{
    locale: string;
    slug: string;
    title: string;
    shortDescription?: string | null;
  }>;
  images: Array<{
    id: string;
    url: string;
    alt?: string | null;
    order: number;
    isCover: boolean;
  }>;
}

interface FeaturedPropertiesSectionProps {
  properties: Property[];
  locale: string;
}

export default function FeaturedPropertiesSection({
  properties,
  locale,
}: FeaturedPropertiesSectionProps) {
  if (properties.length === 0) return null;

  const isHR = locale === "hr";

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <div>
            <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">
              {isHR ? "Istaknute nekretnine" : "Featured properties"}
            </p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-[#1A1A1A]">
              {isHR ? "Odabrane nekretnine" : "Selected Properties"}
            </h2>
          </div>
          <Link
            href={`/${locale}/${isHR ? "nekretnine" : "properties"}`}
            className="mt-6 sm:mt-0 text-sm font-semibold text-[#D4AF37] hover:text-[#B8972E] transition-colors uppercase tracking-wider"
          >
            {isHR ? "Pogledaj sve →" : "View all →"}
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
