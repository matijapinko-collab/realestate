import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();

  const property = await prisma.property.update({
    where: { id },
    data: {
      transactionType: data.transactionType,
      propertyType: data.propertyType,
      status: data.status,
      price: data.price ? parseFloat(data.price) : null,
      currency: data.currency || "EUR",
      locationCity: data.locationCity,
      locationArea: data.locationArea || null,
      address: data.address || null,
      livingArea: data.livingArea ? parseFloat(data.livingArea) : null,
      landArea: data.landArea ? parseFloat(data.landArea) : null,
      rooms: data.rooms ? parseInt(data.rooms) : null,
      bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
      bathrooms: data.bathrooms ? parseInt(data.bathrooms) : null,
      floor: data.floor ? parseInt(data.floor) : null,
      totalFloors: data.totalFloors ? parseInt(data.totalFloors) : null,
      yearBuilt: data.yearBuilt ? parseInt(data.yearBuilt) : null,
      parkingSpaces: data.parkingSpaces ? parseInt(data.parkingSpaces) : null,
      energyClass: data.energyClass || null,
      featured: data.featured || false,
      published: data.published || false,
    },
  });

  // Upsert translations
  if (data.titleHR) {
    await prisma.propertyTranslation.upsert({
      where: { propertyId_locale: { propertyId: id, locale: "HR" } },
      update: { slug: data.slugHR, title: data.titleHR, shortDescription: data.shortDescriptionHR || null },
      create: { propertyId: id, locale: "HR", slug: data.slugHR, title: data.titleHR, shortDescription: data.shortDescriptionHR || null },
    });
  }
  if (data.titleEN) {
    await prisma.propertyTranslation.upsert({
      where: { propertyId_locale: { propertyId: id, locale: "EN" } },
      update: { slug: data.slugEN, title: data.titleEN, shortDescription: data.shortDescriptionEN || null },
      create: { propertyId: id, locale: "EN", slug: data.slugEN, title: data.titleEN, shortDescription: data.shortDescriptionEN || null },
    });
  }

  return NextResponse.json(property);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.property.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
