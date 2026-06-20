"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteBlogButton({ postId }: { postId: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm("Obrisati ovaj post?")) return;
    await fetch(`/api/admin/blog/${postId}`, { method: "DELETE" });
    router.refresh();
  };
  return (
    <button onClick={handleDelete} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
      <Trash2 size={16} />
    </button>
  );
}
