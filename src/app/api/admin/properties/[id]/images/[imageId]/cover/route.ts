import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, imageId } = await params;

  // Remove cover from all images of this property
  await prisma.propertyImage.updateMany({
    where: { propertyId: id },
    data: { isCover: false },
  });

  // Set new cover
  const image = await prisma.propertyImage.update({
    where: { id: imageId },
    data: { isCover: true },
  });

  return NextResponse.json(image);
}
