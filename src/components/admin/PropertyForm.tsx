"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  transactionType: z.enum(["SALE", "RENT"]),
  propertyType: z.enum(["APARTMENT", "HOUSE", "LAND", "COMMERCIAL", "LUXURY_VILLA", "NEW_BUILD"]),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD", "RENTED", "DRAFT"]),
  price: z.string().optional(),
  currency: z.string().default("EUR"),
  locationCity: z.string().min(1, "Obavezno"),
  locationArea: z.string().optional(),
  address: z.string().optional(),
  livingArea: z.string().optional(),
  landArea: z.string().optional(),
  rooms: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  floor: z.string().optional(),
  totalFloors: z.string().optional(),
  yearBuilt: z.string().optional(),
  parkingSpaces: z.string().optional(),
  energyClass: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  // Translations
  titleHR: z.string().min(1, "Obavezno"),
  slugHR: z.string().min(1, "Obavezno"),
  shortDescriptionHR: z.string().optional(),
  titleEN: z.string().optional(),
  slugEN: z.string().optional(),
  shortDescriptionEN: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface PropertyFormProps {
  property?: {
    id: string;
    transactionType: string;
    propertyType: string;
    status: string;
    price?: unknown;
    currency?: string | null;
    locationCity: string;
    locationArea?: string | null;
    address?: string | null;
    livingArea?: unknown;
    landArea?: unknown;
    rooms?: unknown;
    bedrooms?: unknown;
    bathrooms?: unknown;
    floor?: unknown;
    totalFloors?: unknown;
    yearBuilt?: unknown;
    parkingSpaces?: unknown;
    energyClass?: string | null;
    featured: boolean;
    published: boolean;
    translations: Array<{ locale: string; title: string; slug: string; shortDescription?: string | null }>;
  };
}

export default function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const hrTrans = property?.translations?.find((t) => t.locale === "HR");
  const enTrans = property?.translations?.find((t) => t.locale === "EN");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
    defaultValues: {
      transactionType: (property?.transactionType as "SALE" | "RENT") || "SALE",
      propertyType: (property?.propertyType as "APARTMENT" | "HOUSE" | "LAND" | "COMMERCIAL" | "LUXURY_VILLA" | "NEW_BUILD") || "APARTMENT",
      status: (property?.status as "AVAILABLE" | "RESERVED" | "SOLD" | "RENTED" | "DRAFT") || "DRAFT",
      price: property?.price?.toString() || "",
      currency: property?.currency || "EUR",
      locationCity: property?.locationCity || "",
      locationArea: property?.locationArea || "",
      address: property?.address || "",
      livingArea: property?.livingArea?.toString() || "",
      landArea: property?.landArea?.toString() || "",
      rooms: property?.rooms?.toString() || "",
      bedrooms: property?.bedrooms?.toString() || "",
      bathrooms: property?.bathrooms?.toString() || "",
      floor: property?.floor?.toString() || "",
      totalFloors: property?.totalFloors?.toString() || "",
      yearBuilt: property?.yearBuilt?.toString() || "",
      parkingSpaces: property?.parkingSpaces?.toString() || "",
      energyClass: property?.energyClass || "",
      featured: property?.featured || false,
      published: property?.published || false,
      titleHR: hrTrans?.title || "",
      slugHR: hrTrans?.slug || "",
      shortDescriptionHR: hrTrans?.shortDescription || "",
      titleEN: enTrans?.title || "",
      slugEN: enTrans?.slug || "",
      shortDescriptionEN: enTrans?.shortDescription || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    setError("");
    try {
      const url = property ? `/api/admin/properties/${property.id}` : "/api/admin/properties";
      const method = property ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      const saved = await res.json();
      router.push(`/admin/properties/${saved.id}`);
      router.refresh();
    } catch {
      setError("Greška pri spremanju");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37]";
  const labelClass = "block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic info */}
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-5">Osnovne informacije</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Vrsta transakcije *</label>
            <select {...register("transactionType")} className={inputClass + " bg-white"}>
              <option value="SALE">Prodaja</option>
              <option value="RENT">Najam</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Vrsta nekretnine *</label>
            <select {...register("propertyType")} className={inputClass + " bg-white"}>
              <option value="APARTMENT">Stan</option>
              <option value="HOUSE">Kuća</option>
              <option value="LAND">Zemljište</option>
              <option value="COMMERCIAL">Poslovni prostor</option>
              <option value="LUXURY_VILLA">Luksuzna villa</option>
              <option value="NEW_BUILD">Novogradnja</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select {...register("status")} className={inputClass + " bg-white"}>
              <option value="DRAFT">Skica</option>
              <option value="AVAILABLE">Dostupno</option>
              <option value="RESERVED">Rezervirano</option>
              <option value="SOLD">Prodano</option>
              <option value="RENTED">Iznajmljeno</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Cijena</label>
            <input {...register("price")} className={inputClass} placeholder="150000" />
          </div>
          <div>
            <label className={labelClass}>Valuta</label>
            <input {...register("currency")} className={inputClass} placeholder="EUR" />
          </div>
          <div>
            <label className={labelClass}>Grad *</label>
            <input {...register("locationCity")} className={inputClass} />
            {errors.locationCity && <p className="text-red-500 text-xs mt-1">{errors.locationCity.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Kvart / Područje</label>
            <input {...register("locationArea")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Adresa</label>
            <input {...register("address")} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-5">Specifikacije</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { key: "livingArea", label: "Površina (m²)" },
            { key: "landArea", label: "Površina zemljišta (m²)" },
            { key: "rooms", label: "Sobe" },
            { key: "bedrooms", label: "Spavaće sobe" },
            { key: "bathrooms", label: "Kupaonice" },
            { key: "floor", label: "Kat" },
            { key: "totalFloors", label: "Ukupno katova" },
            { key: "yearBuilt", label: "Godina gradnje" },
            { key: "parkingSpaces", label: "Parking mjesta" },
            { key: "energyClass", label: "En. razred" },
          ].map((field) => (
            <div key={field.key}>
              <label className={labelClass}>{field.label}</label>
              <input {...register(field.key as keyof FormData)} className={inputClass} />
            </div>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-5">Vidljivost</h3>
        <div className="flex gap-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" {...register("published")} className="w-4 h-4 accent-[#D4AF37]" />
            <span className="text-sm font-medium">Objavljeno</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" {...register("featured")} className="w-4 h-4 accent-[#D4AF37]" />
            <span className="text-sm font-medium">Istaknuto</span>
          </label>
        </div>
      </div>

      {/* Translations */}
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-5">Prijevodi</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {/* HR */}
          <div>
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest mb-4">🇭🇷 Hrvatski</h4>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Naslov *</label>
                <input {...register("titleHR")} className={inputClass} />
                {errors.titleHR && <p className="text-red-500 text-xs mt-1">{errors.titleHR.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Slug *</label>
                <input {...register("slugHR")} className={inputClass} placeholder="npr. trosobni-stan-zagreb" />
                {errors.slugHR && <p className="text-red-500 text-xs mt-1">{errors.slugHR.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Kratki opis</label>
                <textarea {...register("shortDescriptionHR")} rows={3} className={inputClass + " resize-none"} />
              </div>
            </div>
          </div>
          {/* EN */}
          <div>
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest mb-4">🇬🇧 English</h4>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Title</label>
                <input {...register("titleEN")} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Slug</label>
                <input {...register("slugEN")} className={inputClass} placeholder="e.g. three-room-apartment-zagreb" />
              </div>
              <div>
                <label className={labelClass}>Short description</label>
                <textarea {...register("shortDescriptionEN")} rows={3} className={inputClass + " resize-none"} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-4">
        <button type="submit" disabled={saving} className="px-8 py-3 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors disabled:opacity-50">
          {saving ? "Spremam..." : "Spremi nekretninu"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-8 py-3 border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
          Odustani
        </button>
      </div>
    </form>
  );
}
