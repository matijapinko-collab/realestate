import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const propertyId = formData.get("propertyId") as string;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  // If Cloudinary is configured, use it; otherwise use a placeholder
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  let imageUrl: string;

  if (cloudName && apiKey && apiSecret) {
    // Upload to Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const uploadFormData = new FormData();
    uploadFormData.append("file", dataUri);
    uploadFormData.append("upload_preset", "ml_default");
    uploadFormData.append("folder", "matija-pinko-realestate");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
        },
        body: uploadFormData,
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    const cloudinaryData = await res.json();
    imageUrl = cloudinaryData.secure_url;
  } else {
    // Fallback: use a placeholder image URL
    imageUrl = `https://picsum.photos/seed/${Date.now()}/800/600`;
  }

  const existingCount = await prisma.propertyImage.count({ where: { propertyId } });

  const image = await prisma.propertyImage.create({
    data: {
      propertyId,
      url: imageUrl,
      alt: file.name.replace(/\.[^/.]+$/, ""),
      order: existingCount,
      isCover: existingCount === 0,
    },
  });

  return NextResponse.json(image);
}
