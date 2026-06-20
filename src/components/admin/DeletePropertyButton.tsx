"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeletePropertyButton({ propertyId }: { propertyId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Jeste li sigurni da želite obrisati ovu nekretninu?")) return;
    await fetch(`/api/admin/properties/${propertyId}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <button onClick={handleDelete} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
      <Trash2 size={16} />
    </button>
  );
}
