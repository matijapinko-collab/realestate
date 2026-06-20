"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitPropertyInquiry } from "@/lib/actions/contact";

const schema = z.object({
  name: z.string().min(2, "Unesite ime"),
  email: z.string().email("Nevažeći email"),
  phone: z.string().optional(),
  message: z.string().min(5, "Unesite poruku"),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

interface PropertyInquiryFormProps {
  propertyId: string;
  propertyTitle: string;
  locale: string;
}

export default function PropertyInquiryForm({
  propertyId,
  propertyTitle,
  locale,
}: PropertyInquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const isHR = locale === "hr";

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const result = await submitPropertyInquiry({ ...data, propertyId });
    if (result.success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#F8F8F8] p-6 border border-gray-200">
      <h3 className="font-playfair text-xl font-bold mb-1">
        {isHR ? "Upit za nekretninu" : "Property Inquiry"}
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        {isHR ? `Zainteresirani ste za: ${propertyTitle}` : `Interested in: ${propertyTitle}`}
      </p>

      {status === "success" ? (
        <div className="text-center py-8">
          <div className="text-[#D4AF37] text-4xl mb-3">✓</div>
          <p className="font-semibold text-[#1A1A1A]">
            {isHR ? "Hvala! Javit ću vam se uskoro." : "Thank you! I'll be in touch soon."}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Honeypot */}
          <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              {isHR ? "Ime i prezime *" : "Full name *"}
            </label>
            <input
              {...register("name")}
              className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37] bg-white"
              placeholder={isHR ? "Vaše ime" : "Your name"}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              {isHR ? "E-mail *" : "Email *"}
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37] bg-white"
              placeholder="email@primjer.hr"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              {isHR ? "Telefon" : "Phone"}
            </label>
            <input
              {...register("phone")}
              type="tel"
              className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37] bg-white"
              placeholder="+385 xx xxx xxxx"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              {isHR ? "Poruka *" : "Message *"}
            </label>
            <textarea
              {...register("message")}
              rows={4}
              className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37] bg-white resize-none"
              placeholder={isHR ? "Vaša poruka..." : "Your message..."}
              defaultValue={isHR ? `Zanima me više o nekretnini: ${propertyTitle}` : `I'm interested in: ${propertyTitle}`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>

          {status === "error" && (
            <p className="text-red-500 text-sm">
              {isHR ? "Greška. Pokušajte ponovo." : "Error. Please try again."}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#D4AF37] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#B8972E] transition-colors disabled:opacity-50"
          >
            {isSubmitting
              ? (isHR ? "Šaljem..." : "Sending...")
              : (isHR ? "Pošalji upit" : "Send Inquiry")}
          </button>
        </form>
      )}
    </div>
  );
}
