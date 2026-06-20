import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedPropertiesSection from "@/components/sections/FeaturedPropertiesSection";
import AboutPreviewSection from "@/components/sections/AboutPreviewSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaSection from "@/components/sections/CtaSection";
import StatsSection from "@/components/sections/StatsSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dbLocale = locale.toUpperCase() as "HR" | "EN";

  let featuredProperties: any[] = [];
  let testimonials: any[] = [];

  try {
    featuredProperties = await prisma.property.findMany({
      where: { featured: true, published: true },
      include: {
        translations: { where: { locale: dbLocale } },
        images: { orderBy: [{ isCover: "desc" }, { order: "asc" }] },
      },
      take: 6,
      orderBy: { createdAt: "desc" },
    });

    testimonials = await prisma.testimonial.findMany({
      where: { locale: dbLocale, visible: true },
      orderBy: { order: "asc" },
      take: 6,
    });
  } catch {
    // Database not available yet — show static sections only
  }

  return (
    <>
      <HeroSection locale={locale} />
      <StatsSection locale={locale} />
      <FeaturedPropertiesSection
        properties={featuredProperties}
        locale={locale}
      />
      <AboutPreviewSection locale={locale} />
      <TestimonialsSection testimonials={testimonials} locale={locale} />
      <CtaSection locale={locale} />
    </>
  );
}
