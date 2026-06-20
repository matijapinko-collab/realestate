import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface AboutPreviewSectionProps {
  locale: string;
}

export default function AboutPreviewSection({ locale }: AboutPreviewSectionProps) {
  const isHR = locale === "hr";

  const bullets = isHR
    ? [
        "Osobni pristup svakom klijentu",
        "Realna i transparentna procjena",
        "Brzo i učinkovito zatvaranje",
        "Lokalno znanje i mreža kontakata",
      ]
    : [
        "Personal approach to every client",
        "Honest and transparent valuation",
        "Fast and efficient closing",
        "Local knowledge and network",
      ];

  return (
    <section className="py-24 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
              alt="Matija Pinko"
              width={600}
              height={700}
              className="object-cover w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-[#D4AF37] text-white p-6 hidden lg:block">
              <div className="font-playfair text-3xl font-bold">10+</div>
              <div className="text-xs uppercase tracking-wider mt-1">
                {isHR ? "Godina iskustva" : "Years of experience"}
              </div>
            </div>
          </div>

          <div>
            <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">
              {isHR ? "O meni" : "About me"}
            </p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight mb-6">
              {isHR
                ? "Većina agenata prodaje nekretnine. Ja gradim strategije."
                : "Most agents sell property. I build strategies."}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {isHR
                ? "Kroz karijeru sam radio u prodaji, digitalnim proizvodima, marketingu, operacijama i vođenju projekata. Naučio sam najvažniju lekciju: veliki rezultati su najčešće rezultat kvalitetne pripreme, jasne komunikacije i dosljedne provedbe. Zato svakoj nekretnini pristupam kao projektu koji ima svoj cilj, svoje izazove i svoju strategiju."
                : "Before entering real estate, I spent years working in sales, operations, digital products, marketing, and project management. They taught me one of the most valuable lessons: results rarely happen by accident. They are usually the outcome of preparation, communication, and a clear strategy. That's exactly how I approach every property."}
            </p>

            <ul className="space-y-3 mb-10">
              {bullets.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-[#D4AF37] flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/${locale}/${isHR ? "kako-radim" : "how-i-work"}`}
              className="inline-flex items-center px-8 py-4 bg-[#1A1A1A] text-white font-semibold hover:bg-[#D4AF37] transition-colors"
            >
              {isHR ? "Upoznajte moj način rada" : "Learn How I Work"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
