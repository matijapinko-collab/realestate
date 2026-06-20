"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface PropertyImage {
  id: string;
  url: string;
  alt?: string | null;
  order: number;
  isCover: boolean;
}

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) {
    return (
      <div className="w-full h-[60vh] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400">Nema dostupnih slika</p>
      </div>
    );
  }

  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrentIndex((i) => (i + 1) % images.length);

  return (
    <>
      <div className="relative">
        {/* Main image */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] bg-gray-100 overflow-hidden">
          <Image
            src={images[currentIndex].url}
            alt={images[currentIndex].alt || title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />

          {/* Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Counter + lightbox btn */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <span className="bg-black/60 text-white text-sm px-3 py-1.5">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setLightboxOpen(true)}
              className="bg-black/60 text-white px-3 py-1.5 hover:bg-black/80 transition-colors"
            >
              <ZoomIn size={18} />
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 p-4 bg-[#F8F8F8] overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setCurrentIndex(i)}
                className={`relative flex-shrink-0 w-20 h-16 overflow-hidden border-2 transition-colors ${
                  i === currentIndex ? "border-[#D4AF37]" : "border-transparent"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `${title} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={32} />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              >
                <ChevronLeft size={48} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              >
                <ChevronRight size={48} />
              </button>
            </>
          )}
          <div className="relative w-full max-w-5xl max-h-[90vh] mx-8">
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt || title}
              width={1200}
              height={800}
              className="object-contain w-full h-full"
              sizes="90vw"
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
