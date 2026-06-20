"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Bed, Bath, Square, MapPin } from "lucide-react";
import { cn, formatPrice, formatArea } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PropertyImage {
  id: string;
  url: string;
  alt?: string | null;
  order: number;
  isCover: boolean;
}

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
  bedrooms?: number | null;
  featured: boolean;
  translations: Array<{
    locale: string;
    slug: string;
    title: string;
    shortDescription?: string | null;
  }>;
  images: PropertyImage[];
}

interface PropertyCardProps {
  property: Property;
  locale: string;
}

export default function PropertyCard({ property, locale }: PropertyCardProps) {
  const [imgIndex, setImgIndex] = useState(0);

  const translation = property.translations.find(
    (t) => t.locale === locale.toUpperCase()
  ) || property.translations[0];

  if (!translation) return null;

  const images = property.images.length > 0 ? property.images : null;
  const currentImage = images ? images[imgIndex] : null;

  const detailPath =
    locale === "hr"
      ? `/hr/nekretnine/${translation.slug}`
      : `/en/properties/${translation.slug}`;

  const transactionLabel =
    property.transactionType === "SALE"
      ? locale === "hr" ? "Prodaja" : "For Sale"
      : locale === "hr" ? "Najam" : "For Rent";

  const propertyTypeLabel: Record<string, string> = {
    APARTMENT: locale === "hr" ? "Stan" : "Apartment",
    HOUSE: locale === "hr" ? "Kuća" : "House",
    LAND: locale === "hr" ? "Zemljište" : "Land",
    COMMERCIAL: locale === "hr" ? "Poslovni" : "Commercial",
    LUXURY_VILLA: locale === "hr" ? "Villa" : "Villa",
    NEW_BUILD: locale === "hr" ? "Novogradnja" : "New Build",
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!images) return;
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!images) return;
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="group bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {currentImage ? (
          <Image
            src={currentImage.url}
            alt={currentImage.alt || translation.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <Square size={48} className="text-gray-300" />
          </div>
        )}

        {/* Gallery arrows */}
        {images && images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1">
              {imgIndex + 1} / {images.length}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className="px-2 py-1 bg-[#D4AF37] text-white text-xs font-semibold uppercase tracking-wide">
            {transactionLabel}
          </span>
          {property.featured && (
            <span className="px-2 py-1 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wide">
              {locale === "hr" ? "Istaknuto" : "Featured"}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <Link href={detailPath} className="block p-5">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-playfair text-lg font-semibold text-[#1A1A1A] leading-tight line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
            {translation.title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
          <MapPin size={14} className="text-[#D4AF37]" />
          <span>
            {property.locationCity}
            {property.locationArea && `, ${property.locationArea}`}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {property.livingArea && (
            <div className="flex items-center gap-1">
              <Square size={14} className="text-[#D4AF37]" />
              <span>{formatArea(property.livingArea)}</span>
            </div>
          )}
          {property.rooms && (
            <div className="flex items-center gap-1">
              <Bed size={14} className="text-[#D4AF37]" />
              <span>{property.rooms} {locale === "hr" ? "sob." : "rooms"}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <div className="font-playfair text-xl font-bold text-[#1A1A1A]">
            {property.price
              ? formatPrice(Number(property.price), property.currency)
              : locale === "hr" ? "Na upit" : "On request"}
            {property.transactionType === "RENT" && (
              <span className="text-xs font-sans font-normal text-gray-500 ml-1">
                {locale === "hr" ? "/ mj." : "/ mo."}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {propertyTypeLabel[property.propertyType] || property.propertyType}
          </span>
        </div>
      </Link>
    </div>
  );
}
