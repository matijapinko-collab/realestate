import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Home, BookOpen, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard" };

export default async function AdminDashboard() {
  let propertiesCount = 0, blogCount = 0, messagesCount = 0, newMessages = 0;
  let recentMessages: any[] = [];
  try {
    [propertiesCount, blogCount, messagesCount, newMessages] = await Promise.all([
      prisma.property.count({ where: { published: true } }),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
      prisma.propertyInquiry.count(),
      prisma.propertyInquiry.count({ where: { status: "NEW" } }),
    ]);
    recentMessages = await prisma.propertyInquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch {}

  const stats = [
    { label: "Objavljene nekretnine", value: propertiesCount, icon: Home, href: "/admin/properties" },
    { label: "Blog objave", value: blogCount, icon: BookOpen, href: "/admin/blog" },
    { label: "Ukupno poruka", value: messagesCount, icon: MessageSquare, href: "/admin/messages" },
    { label: "Nove poruke", value: newMessages, icon: MessageSquare, href: "/admin/messages", highlight: true },
  ];

  return (
    <div>
      <h1 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className={`p-6 rounded-sm border transition-shadow hover:shadow-md ${stat.highlight ? "bg-[#D4AF37] text-white border-[#D4AF37]" : "bg-white border-gray-200"}`}>
            <div className={`text-3xl font-bold font-playfair mb-1 ${stat.highlight ? "text-white" : "text-[#1A1A1A]"}`}>
              {stat.value}
            </div>
            <div className={`text-xs font-medium ${stat.highlight ? "text-white/80" : "text-gray-500"}`}>
              {stat.label}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Brze akcije</h2>
          <div className="space-y-2">
            <Link href="/admin/properties/new" className="block px-4 py-2.5 bg-[#D4AF37] text-white text-sm font-medium hover:bg-[#B8972E] transition-colors text-center">
              + Nova nekretnina
            </Link>
            <Link href="/admin/blog/new" className="block px-4 py-2.5 bg-[#1A1A1A] text-white text-sm font-medium hover:bg-black transition-colors text-center">
              + Novi blog post
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Zadnje poruke</h2>
          {recentMessages.length === 0 ? (
            <p className="text-sm text-gray-400">Nema poruka</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg: any) => (
                <div key={msg.id} className="flex justify-between items-start text-sm border-b border-gray-100 pb-2">
                  <div>
                    <div className="font-medium">{msg.name}</div>
                    <div className="text-gray-500 text-xs">{msg.email}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 ${msg.status === "NEW" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {msg.status}
                  </span>
                </div>
              ))}
              <Link href="/admin/messages" className="text-xs text-[#D4AF37] hover:underline">
                Sve poruke →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
