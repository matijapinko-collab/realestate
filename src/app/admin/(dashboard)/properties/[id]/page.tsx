import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import PropertyImageManager from "@/components/admin/PropertyImageManager";

export const dynamic = "force-dynamic";
export const metadata = { title: "Uredi nekretninu" };

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await prisma.property.findUnique({
    where: { id },
    include: { translations: true, images: { orderBy: { order: "asc" } }, features: true },
  });
  if (!property) notFound();

  return (
    <div className="space-y-8">
      <h1 className="font-playfair text-2xl font-bold">Uredi nekretninu</h1>
      <PropertyForm property={property} />
      <div className="border-t border-gray-200 pt-8">
        <h2 className="font-playfair text-xl font-bold mb-4">Galerija slika</h2>
        <PropertyImageManager propertyId={id} images={property.images} />
      </div>
    </div>
  );
}
