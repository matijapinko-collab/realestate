import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  locale: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  imageUrl?: string;
}

export default function HeroSection({
  locale,
  title,
  subtitle,
  ctaText,
  ctaHref,
  imageUrl,
}: HeroSectionProps) {
  const defaultTitle =
    locale === "hr"
      ? "Prodaja ili kupnja nekretnine ne bi trebala biti igra pogađanja."
      : "Buying or Selling Property Shouldn't Feel Like a Guessing Game.";
  const defaultSubtitle =
    locale === "hr"
      ? "Većina ljudi tijekom života kupi ili proda svega nekoliko nekretnina. Upravo zato svaka odluka nosi veliku težinu. Moj posao nije samo pronaći kupca ili pokazati stan. Moj posao je pomoći vam donijeti bolju odluku, izbjeći skupe pogreške i voditi vas kroz proces s jasnim planom i potpunom transparentnošću."
      : "Most people will buy or sell only a handful of properties in their lifetime. That's exactly why every decision matters. My role isn't simply to find a buyer or show you a property. My role is to help you make better decisions, avoid expensive mistakes, and navigate the entire process with clarity, strategy, and confidence.";
  const defaultCta = locale === "hr" ? "Zatražite besplatne konzultacije" : "Book a Free Consultation";
  const defaultCtaHref =
    locale === "hr" ? "/hr/kontakt" : "/en/contact";

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          }
          alt="Luxury real estate"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">
            Matija Pinko · Osobni agent
          </p>
          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            {title || defaultTitle}
          </h1>
          <p className="text-gray-200 text-xl sm:text-2xl mb-10 font-light">
            {subtitle || defaultSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={ctaHref || defaultCtaHref}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-white font-semibold text-base hover:bg-[#B8972E] transition-colors"
            >
              {ctaText || defaultCta}
            </Link>
            <Link
              href={`/${locale}/${locale === "hr" ? "nekretnine" : "properties"}`}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold text-base hover:bg-white/10 transition-colors"
            >
              {locale === "hr" ? "Pregledajte nekretnine" : "Browse Properties"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
