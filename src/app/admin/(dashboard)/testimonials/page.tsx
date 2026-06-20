import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteTestimonialButton from "@/components/admin/DeleteTestimonialButton";

export const metadata = { title: "Recenzije" };

export default async function AdminTestimonials() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-playfair text-2xl font-bold">Recenzije</h1>
        <Link href="/admin/testimonials/new" className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-white text-sm font-medium hover:bg-[#B8972E] transition-colors">
          <Plus size={16} /> Nova recenzija
        </Link>
      </div>
      <div className="space-y-3">
        {testimonials.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center text-gray-400">Nema recenzija</div>
        ) : testimonials.map((t) => (
          <div key={t.id} className="bg-white border border-gray-200 p-4 flex justify-between items-start gap-4">
            <div>
              <div className="font-semibold text-sm">{t.authorName}</div>
              {t.authorTitle && <div className="text-xs text-gray-500">{t.authorTitle}</div>}
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">{t.content}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-gray-500">{t.locale}</span>
              <span className={`text-xs px-2 py-1 ${t.visible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {t.visible ? "Vidljivo" : "Skriveno"}
              </span>
              <Link href={`/admin/testimonials/${t.id}`} className="p-1.5 text-gray-400 hover:text-[#D4AF37]"><Edit size={16} /></Link>
              <DeleteTestimonialButton testimonialId={t.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
