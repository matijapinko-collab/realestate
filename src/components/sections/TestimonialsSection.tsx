import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  authorName: string;
  authorTitle?: string | null;
  content: string;
  rating?: number | null;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  locale: string;
}

export default function TestimonialsSection({
  testimonials,
  locale,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">
            {locale === "hr" ? "Recenzije" : "Testimonials"}
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-[#1A1A1A]">
            {locale === "hr" ? "Što kažu klijenti" : "What clients say"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#F8F8F8] p-8 border-l-4 border-[#D4AF37]"
            >
              {t.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-[#D4AF37] fill-[#D4AF37]"
                    />
                  ))}
                </div>
              )}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                &ldquo;{t.content}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-[#1A1A1A]">
                  {t.authorName}
                </div>
                {t.authorTitle && (
                  <div className="text-sm text-gray-500">{t.authorTitle}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
