import Link from "next/link";

interface CtaSectionProps {
  locale: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function CtaSection({
  locale,
  title,
  subtitle,
  ctaText,
  ctaHref,
}: CtaSectionProps) {
  const isHR = locale === "hr";

  return (
    <section className="py-24 bg-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">
          {isHR ? "Kontaktirajte me" : "Get in touch"}
        </p>
        <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-6">
          {title ||
            (isHR
              ? "Razgovarajmo."
              : "Let's Have a Conversation.")}
        </h2>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          {subtitle ||
            (isHR
              ? "Bez pritiska. Bez obveza. Bez prodajnih trikova. Samo iskren razgovor o vašim planovima i mogućnostima."
              : "No pressure. No obligations. No sales tactics. Just an honest conversation about your goals, your options, and the smartest next step.")}
        </p>
        <Link
          href={
            ctaHref ||
            `/${locale}/${isHR ? "kontakt" : "contact"}`
          }
          className="inline-flex items-center px-10 py-4 bg-[#D4AF37] text-white font-semibold text-base hover:bg-[#B8972E] transition-colors"
        >
          {ctaText || (isHR ? "Dogovorite besplatne konzultacije" : "Schedule a Free Consultation")}
        </Link>
      </div>
    </section>
  );
}
