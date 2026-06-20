import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import UpdateLeadStatusButton from "@/components/admin/UpdateLeadStatusButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Poruke i upiti" };

export default async function AdminMessages({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string }>;
}) {
  const sp = await searchParams;
  const where: Record<string, unknown> = {};
  if (sp.status) where.status = sp.status;
  if (sp.type) where.leadType = sp.type;

  let messages: any[] = [];
  try {
    messages = await prisma.propertyInquiry.findMany({
      where,
      include: { property: { include: { translations: { where: { locale: "HR" } } } } },
      orderBy: { createdAt: "desc" },
    });
  } catch {}

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-playfair text-2xl font-bold">Poruke i upiti</h1>
        <span className="text-sm text-gray-500">{messages.length} poruka</span>
      </div>

      <div className="bg-white border border-gray-200 p-4 mb-4">
        <form className="flex gap-4 flex-wrap">
          <select name="status" defaultValue={sp.status} className="px-3 py-2 border border-gray-200 text-sm bg-white focus:outline-none">
            <option value="">Svi statusi</option>
            <option value="NEW">Nove</option>
            <option value="CONTACTED">Kontaktirani</option>
            <option value="QUALIFIED">Kvalificirani</option>
            <option value="CLOSED">Zatvoreni</option>
            <option value="SPAM">Spam</option>
          </select>
          <select name="type" defaultValue={sp.type} className="px-3 py-2 border border-gray-200 text-sm bg-white focus:outline-none">
            <option value="">Sve vrste</option>
            <option value="CONTACT">Kontakt</option>
            <option value="INQUIRY">Upit za nekretninu</option>
            <option value="SELLER">Prodavatelj</option>
            <option value="BUYER">Kupac</option>
          </select>
          <button type="submit" className="px-4 py-2 bg-[#1A1A1A] text-white text-sm">Filtriraj</button>
        </form>
      </div>

      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center text-gray-400">Nema poruka</div>
        ) : messages.map((msg: any) => (
          <div key={msg.id} className="bg-white border border-gray-200 p-5">
            <div className="flex justify-between items-start gap-4 mb-3">
              <div>
                <div className="font-semibold text-[#1A1A1A]">{msg.name}</div>
                <div className="text-sm text-gray-500">{msg.email} {msg.phone && `• ${msg.phone}`}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs px-2 py-1 font-medium ${msg.status === "NEW" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                  {msg.status}
                </span>
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 font-medium">{msg.leadType}</span>
              </div>
            </div>
            {msg.message && <p className="text-sm text-gray-700 mb-3 leading-relaxed">{msg.message}</p>}
            {msg.property && (
              <p className="text-xs text-gray-500 mb-3">
                Nekretnina: {msg.property.translations[0]?.title || "—"}
              </p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{format(new Date(msg.createdAt), "d. MM. yyyy. HH:mm")}</span>
              <UpdateLeadStatusButton messageId={msg.id} currentStatus={msg.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
