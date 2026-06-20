import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { locale } = await params;
  const formData = await req.formData();

  const dbLocale = locale.toUpperCase() as "HR" | "EN";

  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = value.toString();
  });

  const settings = await prisma.siteSettings.upsert({
    where: { locale: dbLocale },
    update: data,
    create: { locale: dbLocale, ...data },
  });

  return NextResponse.redirect(new URL("/admin/settings", req.url));
}
