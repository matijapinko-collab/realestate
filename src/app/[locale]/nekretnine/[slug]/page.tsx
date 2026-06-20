import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyInquiryForm from "@/components/properties/PropertyInquiryForm";
import PropertyCard from "@/components/properties/PropertyCard";
import { formatPrice, formatArea } from "@/lib/utils";
import { Bed, Bath, Square, MapPin, Calendar, Zap, Car } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const translation = await prisma.propertyTranslation.findUnique({
    where: { locale_slug: { locale: "HR", slug } },
    include: { property: true },
  });

  if (!translation) return { title: "Nekretnina" };

  return {
    title: translation.metaTitle || translation.title,
    description: translation.metaDescription || translation.shortDescription || "",
  };
}

export default async function PropertyDetailHR({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = "hr";
  const dbLocale = "HR";

  const translation = await prisma.propertyTranslation.findUnique({
    where: { locale_slug: { locale: dbLocale, slug } },
    include: {
      property: {
        include: {
          translations: true,
          images: { orderBy: [{ isCover: "desc" }, { order: "asc" }] },
          features: true,
        },
      },
    },
  });

  if (!translation || !translation.property.published) notFound();

  const property = translation.property;

  const relatedProperties = await prisma.property.findMany({
    where: {
      published: true,
      status: "AVAILABLE",
      propertyType: property.propertyType,
      id: { not: property.id },
    },
    include: {
      translations: { where: { locale: dbLocale } },
      images: { orderBy: [{ isCover: "desc" }, { order: "asc" }] },
    },
    take: 3,
  });

  const specs = [
    property.livingArea && { icon: Square, label: "Površina", value: formatArea(property.livingArea) },
    property.rooms && { icon: Bed, label: "Sobe", value: `${property.rooms}` },
    property.bedrooms && { icon: Bed, label: "Spavaće sobe", value: `${property.bedrooms}` },
    property.bathrooms && { icon: Bath, label: "Kupaonice", value: `${property.bathrooms}` },
    property.floor != null && { icon: Square, label: "Kat", value: `${property.floor}` },
    property.yearBuilt && { icon: Calendar, label: "Godina gradnje", value: `${property.yearBuilt}` },
    property.parkingSpaces && { icon: Car, label: "Parking", value: `${property.parkingSpaces}` },
    property.energyClass && { icon: Zap, label: "En. razred", value: property.energyClass },
  ].filter(Boolean) as Array<{ icon: any; label: string; value: string }>;

  return (
    <div className="pt-20">
      <PropertyGallery images={property.images} title={translation.title} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-[#D4AF37] text-white text-xs font-semibold uppercase">
                  {property.transactionType === "SALE" ? "Prodaja" : "Najam"}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold uppercase">
                  {property.propertyType}
                </span>
              </div>
              <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-3">
                {translation.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <MapPin size={18} className="text-[#D4AF37]" />
                <span>
                  {property.locationCity}
                  {property.locationArea && `, ${property.locationArea}`}
                  {property.address && ` — ${property.address}`}
                </span>
              </div>
              <div className="font-playfair text-3xl font-bold text-[#D4AF37]">
                {property.price
                  ? formatPrice(Number(property.price), property.currency)
                  : "Na upit"}
                {property.transactionType === "RENT" && (
                  <span className="text-base font-sans font-normal text-gray-500 ml-2">/ mj.</span>
                )}
              </div>
            </div>

            {/* Specs */}
            {specs.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-6 bg-[#F8F8F8]">
                {specs.map((spec, i) => (
                  <div key={i} className="text-center">
                    <div className="font-semibold text-[#1A1A1A] text-lg">{spec.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{spec.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            {translation.shortDescription && (
              <div className="mb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {translation.shortDescription}
                </p>
              </div>
            )}

            {/* Features */}
            {property.features.length > 0 && (
              <div className="mb-8">
                <h2 className="font-playfair text-2xl font-bold mb-4">
                  Karakteristike
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {property.features.map((feature) => (
                    <div key={feature.id} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0" />
                      <span className="font-medium">{feature.key}:</span>
                      <span>{feature.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PropertyInquiryForm
                propertyId={property.id}
                propertyTitle={translation.title}
                locale={locale}
              />
            </div>
          </div>
        </div>

        {/* Related properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-100">
            <h2 className="font-playfair text-3xl font-bold mb-8">
              Slične nekretnine
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
