"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
export default function DeleteTestimonialButton({ testimonialId }: { testimonialId: string }) {
  const router = useRouter();
  const handle = async () => {
    if (!confirm("Obrisati?")) return;
    await fetch(`/api/admin/testimonials/${testimonialId}`, { method: "DELETE" });
    router.refresh();
  };
  return <button onClick={handle} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>;
}
