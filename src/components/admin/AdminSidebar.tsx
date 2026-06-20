"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Home,
  BookOpen,
  MessageSquare,
  Settings,
  Star,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/pages", label: "Stranice", icon: FileText },
  { href: "/admin/properties", label: "Nekretnine", icon: Home },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/testimonials", label: "Recenzije", icon: Star },
  { href: "/admin/messages", label: "Poruke", icon: MessageSquare },
  { href: "/admin/settings", label: "Postavke", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1A1A1A] flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-gray-800">
        <h1 className="font-playfair text-lg font-bold text-white">Matija Pinko</h1>
        <p className="text-[#D4AF37] text-xs uppercase tracking-widest mt-0.5">Admin</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-sm transition-colors",
                active
                  ? "bg-[#D4AF37] text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <Link href="/hr" target="_blank" className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          <ChevronRight size={14} />
          Pogledaj stranicu
        </Link>
      </div>
    </aside>
  );
}
