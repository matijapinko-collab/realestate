"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Star, Upload } from "lucide-react";

interface PropertyImageManagerProps {
  propertyId: string;
  images: Array<{ id: string; url: string; alt?: string | null; order: number; isCover: boolean }>;
}

export default function PropertyImageManager({ propertyId, images: initialImages }: PropertyImageManagerProps) {
  const router = useRouter();
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("propertyId", propertyId);

      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        if (res.ok) {
          const newImage = await res.json();
          setImages((prev) => [...prev, newImage]);
        }
      } catch {
        console.error("Upload failed");
      }
    }
    setUploading(false);
    router.refresh();
  };

  const handleSetCover = async (imageId: string) => {
    await fetch(`/api/admin/properties/${propertyId}/images/${imageId}/cover`, { method: "PUT" });
    setImages((prev) => prev.map((img) => ({ ...img, isCover: img.id === imageId })));
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm("Obrisati sliku?")) return;
    await fetch(`/api/admin/properties/${propertyId}/images/${imageId}`, { method: "DELETE" });
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleAltChange = useCallback(
    async (imageId: string, alt: string) => {
      await fetch(`/api/admin/properties/${propertyId}/images/${imageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alt }),
      });
    },
    [propertyId]
  );

  return (
    <div className="bg-white border border-gray-200 p-6">
      {/* Upload */}
      <div className="mb-6">
        <label className={`flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#D4AF37] transition-colors ${uploading ? "opacity-50" : ""}`}>
          <Upload size={20} className="text-gray-400" />
          <span className="text-sm text-gray-500">
            {uploading ? "Uploading..." : "Kliknite za dodavanje slika"}
          </span>
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      {/* Image grid */}
      {images.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">Nema slika</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className={`relative group border-2 ${img.isCover ? "border-[#D4AF37]" : "border-gray-200"}`}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={img.url} alt={img.alt || ""} fill className="object-cover" sizes="200px" />
              </div>
              {img.isCover && (
                <div className="absolute top-2 left-2 bg-[#D4AF37] text-white text-xs px-1.5 py-0.5 font-medium">
                  Cover
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleSetCover(img.id)} title="Set as cover" className="w-7 h-7 bg-[#D4AF37] text-white flex items-center justify-center hover:bg-[#B8972E]">
                  <Star size={13} />
                </button>
                <button onClick={() => handleDelete(img.id)} title="Delete" className="w-7 h-7 bg-red-500 text-white flex items-center justify-center hover:bg-red-600">
                  <Trash2 size={13} />
                </button>
              </div>
              <input
                defaultValue={img.alt || ""}
                placeholder="Alt tekst..."
                className="w-full px-2 py-1.5 text-xs border-t border-gray-200 focus:outline-none focus:border-[#D4AF37]"
                onBlur={(e) => handleAltChange(img.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
