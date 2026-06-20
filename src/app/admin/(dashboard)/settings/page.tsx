import { prisma } from "@/lib/prisma";
export const metadata = { title: "Postavke" };

export default async function AdminSettings() {
  const [hrSettings, enSettings] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { locale: "HR" } }),
    prisma.siteSettings.findUnique({ where: { locale: "EN" } }),
  ]);

  return (
    <div>
      <h1 className="font-playfair text-2xl font-bold mb-6">Postavke stranice</h1>
      <div className="bg-white border border-gray-200 p-6">
        <p className="text-gray-600 text-sm mb-6">Uredite kontakt podatke i opće postavke.</p>
        <div className="grid md:grid-cols-2 gap-8">
          {[{ label: "Hrvatski (HR)", settings: hrSettings, locale: "HR" }, { label: "English (EN)", settings: enSettings, locale: "EN" }].map(({ label, settings, locale }) => (
            <div key={locale}>
              <h3 className="font-semibold text-[#D4AF37] uppercase tracking-widest text-xs mb-4">{label}</h3>
              <form action={`/api/admin/settings/${locale}`} method="POST" className="space-y-3">
                {[
                  { name: "phone", label: "Telefon", value: settings?.phone },
                  { name: "email", label: "Email", value: settings?.email },
                  { name: "whatsapp", label: "WhatsApp broj", value: settings?.whatsapp },
                  { name: "address", label: "Adresa", value: settings?.address },
                  { name: "facebookUrl", label: "Facebook URL", value: settings?.facebookUrl },
                  { name: "instagramUrl", label: "Instagram URL", value: settings?.instagramUrl },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">{field.label}</label>
                    <input name={field.name} defaultValue={field.value || ""} className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37]" />
                  </div>
                ))}
                <button type="submit" className="w-full py-2.5 bg-[#D4AF37] text-white text-sm font-medium hover:bg-[#B8972E] transition-colors">
                  Spremi {locale} postavke
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
