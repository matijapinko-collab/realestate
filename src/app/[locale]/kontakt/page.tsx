"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm } from "@/lib/actions/contact";
import { Phone, Mail, MapPin } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Unesite ime"),
  email: z.string().email("Nevažeći email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Poruka mora imati minimalno 10 znakova"),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactPageHR() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const result = await submitContactForm(data);
    if (result.success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3">Kontakt</p>
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-white">Javite se</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Razmišljate o prodaji, kupnji ili samo želite znati koliko vaša nekretnina realno vrijedi? Javite mi se. Bez pritiska, bez obveze i bez prodajnih trikova — samo kratak razgovor u kojem ćemo vidjeti gdje ste sada, što želite postići i koji bi sljedeći korak imao najviše smisla.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Telefon</div>
                  <a href="tel:+385" className="text-[#1A1A1A] font-medium hover:text-[#D4AF37] transition-colors">+385 xx xxx xxxx</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">E-mail</div>
                  <a href="mailto:matija.pinko@gmail.com" className="text-[#1A1A1A] font-medium hover:text-[#D4AF37] transition-colors">matija.pinko@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Područje rada</div>
                  <span className="text-[#1A1A1A] font-medium">Zagreb, Velika Gorica, Pag</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {status === "success" ? (
              <div className="text-center py-16 bg-[#F8F8F8]">
                <div className="text-[#D4AF37] text-5xl mb-4">✓</div>
                <h3 className="font-playfair text-2xl font-bold mb-2">Hvala!</h3>
                <p className="text-gray-600">Javit ću vam se uskoro.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} />
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">Ime i prezime *</label>
                  <input {...register("name")} className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37]" placeholder="Vaše ime" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">E-mail *</label>
                  <input {...register("email")} type="email" className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37]" placeholder="email@primjer.hr" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">Telefon</label>
                  <input {...register("phone")} type="tel" className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37]" placeholder="+385 xx xxx xxxx" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">Poruka *</label>
                  <textarea {...register("message")} rows={5} className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37] resize-none" placeholder="Vaša poruka..." />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                {status === "error" && <p className="text-red-500 text-sm">Greška. Pokušajte ponovo.</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#D4AF37] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#B8972E] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Šaljem..." : "Pošalji poruku"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
