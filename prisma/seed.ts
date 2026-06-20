import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("neon.tech") ? { rejectUnauthorized: false } : undefined,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...");

  // Admin user
  const hashedPassword = await bcrypt.hash("Admin123!", 12);
  await prisma.user.upsert({
    where: { email: "admin@matijapinko.hr" },
    update: {},
    create: {
      email: "admin@matijapinko.hr",
      name: "Matija Pinko",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created");

  // Site settings HR
  await prisma.siteSettings.upsert({
    where: { locale: "HR" },
    update: {},
    create: {
      locale: "HR",
      siteName: "Matija Pinko Nekretnine",
      tagline: "Vaš pouzdani partner u nekretninama",
      phone: "+385 91 xxx xxxx",
      email: "matija.pinko@gmail.com",
      whatsapp: "385091xxxxxxx",
      address: "Zagreb, Hrvatska",
      footerText: "© 2025 Matija Pinko. Sva prava pridržana.",
    },
  });

  // Site settings EN
  await prisma.siteSettings.upsert({
    where: { locale: "EN" },
    update: {},
    create: {
      locale: "EN",
      siteName: "Matija Pinko Real Estate",
      tagline: "Your trusted real estate partner",
      phone: "+385 91 xxx xxxx",
      email: "matija.pinko@gmail.com",
      whatsapp: "385091xxxxxxx",
      address: "Zagreb, Croatia",
      footerText: "© 2025 Matija Pinko. All rights reserved.",
    },
  });
  console.log("✅ Site settings created");

  // Blog categories HR
  const blogCategoriesHR = [
    { name: "Savjeti za kupce", slug: "savjeti-za-kupce", description: "Sve što trebate znati o kupnji nekretnine" },
    { name: "Savjeti za prodavatelje", slug: "savjeti-za-prodavatelje", description: "Kako uspješno prodati nekretninu" },
    { name: "Tržište nekretnina", slug: "trziste-nekretnina", description: "Aktualne vijesti i analize tržišta" },
    { name: "Zagreb", slug: "zagreb", description: "Nekretnine i život u Zagrebu" },
    { name: "Velika Gorica", slug: "velika-gorica", description: "Nekretnine u Velikoj Gorici" },
    { name: "Pag", slug: "pag", description: "Nekretnine na otoku Pagu" },
    { name: "Investiranje", slug: "investiranje-u-nekretnine", description: "Investiranje u nekretnine" },
    { name: "Vodiči", slug: "vodici", description: "Detaljni vodiči za kupce i prodavatelje" },
  ];

  const hrCategories: Record<string, string> = {};
  for (const cat of blogCategoriesHR) {
    const created = await prisma.blogCategory.upsert({
      where: { locale_slug: { locale: "HR", slug: cat.slug } },
      update: {},
      create: { locale: "HR", ...cat },
    });
    hrCategories[cat.slug] = created.id;
  }

  // Blog categories EN
  const blogCategoriesEN = [
    { name: "Buyer Guides", slug: "buyer-guides", description: "Everything you need to know about buying" },
    { name: "Seller Guides", slug: "seller-guides", description: "How to successfully sell your property" },
    { name: "Real Estate Market", slug: "real-estate-market", description: "Market news and analysis" },
    { name: "Zagreb", slug: "zagreb", description: "Real estate and life in Zagreb" },
    { name: "Velika Gorica", slug: "velika-gorica", description: "Real estate in Velika Gorica" },
    { name: "Pag", slug: "pag", description: "Real estate on Pag island" },
    { name: "Investing", slug: "real-estate-investing", description: "Real estate investing" },
    { name: "Guides", slug: "guides", description: "Detailed guides for buyers and sellers" },
  ];

  const enCategories: Record<string, string> = {};
  for (const cat of blogCategoriesEN) {
    const created = await prisma.blogCategory.upsert({
      where: { locale_slug: { locale: "EN", slug: cat.slug } },
      update: {},
      create: { locale: "EN", ...cat },
    });
    enCategories[cat.slug] = created.id;
  }
  console.log("✅ Blog categories created");

  // Sample properties
  const properties = [
    {
      transactionType: "SALE" as const,
      propertyType: "APARTMENT" as const,
      status: "AVAILABLE" as const,
      price: 185000,
      locationCity: "Zagreb",
      locationArea: "Trešnjevka",
      livingArea: 65,
      rooms: 3,
      bedrooms: 2,
      bathrooms: 1,
      floor: 3,
      totalFloors: 7,
      yearBuilt: 2005,
      featured: true,
      published: true,
      titleHR: "Trosobni stan u Trešnjevci",
      slugHR: "trosobni-stan-tresnjevka-zagreb",
      shortDescriptionHR: "Lijepo renoviran trosobni stan u mirnoj ulici Trešnjevke. Blizina tramvajske linije i svih sadržaja.",
      titleEN: "Three-Room Apartment in Trešnjevka",
      slugEN: "three-room-apartment-tresnjevka-zagreb",
      shortDescriptionEN: "Beautifully renovated three-room apartment in a quiet street in Trešnjevka. Close to tram lines and all amenities.",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      ],
    },
    {
      transactionType: "SALE" as const,
      propertyType: "HOUSE" as const,
      status: "AVAILABLE" as const,
      price: 320000,
      locationCity: "Velika Gorica",
      locationArea: "Centar",
      livingArea: 180,
      landArea: 450,
      rooms: 5,
      bedrooms: 4,
      bathrooms: 2,
      floor: 0,
      totalFloors: 2,
      yearBuilt: 2010,
      featured: true,
      published: true,
      titleHR: "Obiteljska kuća u Velikoj Gorici",
      slugHR: "obiteljska-kuca-velika-gorica",
      shortDescriptionHR: "Prostrana obiteljska kuća s vrtom u centru Velike Gorice. Odlična lokacija, mirna ulica.",
      titleEN: "Family House in Velika Gorica",
      slugEN: "family-house-velika-gorica",
      shortDescriptionEN: "Spacious family house with garden in the center of Velika Gorica. Excellent location, quiet street.",
      images: [
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      ],
    },
    {
      transactionType: "SALE" as const,
      propertyType: "LAND" as const,
      status: "AVAILABLE" as const,
      price: 95000,
      locationCity: "Pag",
      locationArea: "Jakišnica",
      landArea: 3000,
      featured: false,
      published: true,
      titleHR: "Građevinsko zemljište na Pagu",
      slugHR: "gradjevinsko-zemljiste-pag-jakisnica",
      shortDescriptionHR: "Atraktivno građevinsko zemljište u Jakišnici na otoku Pagu. Pogled na more, odlična infrastruktura.",
      titleEN: "Building Land on Pag Island",
      slugEN: "building-land-pag-jakisnica",
      shortDescriptionEN: "Attractive building land in Jakišnica on Pag island. Sea view, excellent infrastructure.",
      images: [
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
        "https://images.unsplash.com/photo-1465301055284-72b071c50612?w=800&q=80",
      ],
    },
    {
      transactionType: "RENT" as const,
      propertyType: "APARTMENT" as const,
      status: "AVAILABLE" as const,
      price: 850,
      locationCity: "Zagreb",
      locationArea: "Gornji Grad",
      livingArea: 55,
      rooms: 2,
      bedrooms: 1,
      bathrooms: 1,
      floor: 2,
      totalFloors: 4,
      yearBuilt: 1990,
      featured: false,
      published: true,
      titleHR: "Dvosobni stan u Gornjem Gradu",
      slugHR: "dvosobni-stan-gornji-grad-zagreb-najam",
      shortDescriptionHR: "Namješten dvosobni stan u centru Zagreba, Gornji Grad. Odmah useljivo.",
      titleEN: "Two-Room Apartment in Gornji Grad",
      slugEN: "two-room-apartment-gornji-grad-zagreb-rent",
      shortDescriptionEN: "Furnished two-room apartment in Zagreb city center, Gornji Grad. Available immediately.",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=800&q=80",
      ],
    },
    {
      transactionType: "SALE" as const,
      propertyType: "LUXURY_VILLA" as const,
      status: "AVAILABLE" as const,
      price: 850000,
      locationCity: "Pag",
      locationArea: "Pag Grad",
      livingArea: 350,
      landArea: 800,
      rooms: 7,
      bedrooms: 5,
      bathrooms: 4,
      yearBuilt: 2019,
      featured: true,
      published: true,
      titleHR: "Luksuzna villa na Pagu",
      slugHR: "luksuzna-villa-pag",
      shortDescriptionHR: "Izuzetna luksuzna villa s bazenom i direktnim pogledom na more. Potpuno opremljena, vrhunski materijali.",
      titleEN: "Luxury Villa on Pag",
      slugEN: "luxury-villa-pag",
      shortDescriptionEN: "Exceptional luxury villa with pool and direct sea view. Fully equipped, premium materials.",
      images: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      ],
    },
    {
      transactionType: "SALE" as const,
      propertyType: "COMMERCIAL" as const,
      status: "AVAILABLE" as const,
      price: 240000,
      locationCity: "Zagreb",
      locationArea: "Maksimir",
      livingArea: 120,
      floor: 0,
      totalFloors: 1,
      yearBuilt: 2003,
      featured: false,
      published: true,
      titleHR: "Poslovni prostor u Maksimiru",
      slugHR: "poslovni-prostor-maksimir-zagreb",
      shortDescriptionHR: "Atraktivan poslovni prostor u prizemlju pored frekventne ulice u Maksimiru. Prilagođen raznim djelatnostima.",
      titleEN: "Commercial Space in Maksimir",
      slugEN: "commercial-space-maksimir-zagreb",
      shortDescriptionEN: "Attractive ground-floor commercial space on a busy street in Maksimir. Suitable for various businesses.",
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      ],
    },
  ];

  for (const prop of properties) {
    const { titleHR, slugHR, shortDescriptionHR, titleEN, slugEN, shortDescriptionEN, images: imgUrls, ...propData } = prop;

    // Check if already exists
    const existing = await prisma.propertyTranslation.findUnique({
      where: { locale_slug: { locale: "HR", slug: slugHR } },
    });
    if (existing) continue;

    const created = await prisma.property.create({
      data: {
        ...propData,
        currency: "EUR",
        translations: {
          create: [
            { locale: "HR", slug: slugHR, title: titleHR, shortDescription: shortDescriptionHR },
            { locale: "EN", slug: slugEN, title: titleEN, shortDescription: shortDescriptionEN },
          ],
        },
        images: {
          create: imgUrls.map((url, i) => ({
            url,
            alt: `${titleHR} - slika ${i + 1}`,
            order: i,
            isCover: i === 0,
          })),
        },
      },
    });
    console.log(`  ✅ Property: ${titleHR}`);
  }

  console.log("✅ Sample properties created");

  // Testimonials
  const testimonials = [
    {
      locale: "HR" as const,
      authorName: "Ana Kovačević",
      authorTitle: "Kupac stana, Zagreb",
      content: "Matija je pronašao savršen stan za nas za samo tri tjedna. Profesionalan, brz i uvijek dostupan za pitanja. Preporučujem svima!",
      rating: 5,
      order: 1,
    },
    {
      locale: "HR" as const,
      authorName: "Ivan Petrić",
      authorTitle: "Prodavatelj kuće, Velika Gorica",
      content: "Prodali smo kuću za cijenu kojom smo bili zadovoljni, i to brže nego što smo očekivali. Matija zna što radi.",
      rating: 5,
      order: 2,
    },
    {
      locale: "HR" as const,
      authorName: "Marija Horvat",
      authorTitle: "Kupac zemljišta, Pag",
      content: "Tražili smo zemljište na Pagu godinama. Matija nam je pomogao pronaći pravo u roku od mjesec dana. Odlično znanje lokalnog tržišta.",
      rating: 5,
      order: 3,
    },
    {
      locale: "EN" as const,
      authorName: "Thomas Weber",
      authorTitle: "Property buyer, Zagreb",
      content: "As foreigners buying property in Croatia, we were nervous. Matija made the whole process smooth, transparent and stress-free. Highly recommended.",
      rating: 5,
      order: 1,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: {
        id: `testimonial-${t.authorName.toLowerCase().replace(/\s/g, "-")}`,
      },
      update: {},
      create: {
        id: `testimonial-${t.authorName.toLowerCase().replace(/\s/g, "-")}`,
        ...t,
        visible: true,
      },
    });
  }
  console.log("✅ Testimonials created");

  // Blog posts HR
  const blogPostsHR = [
    {
      locale: "HR" as const,
      title: "Kako pripremiti nekretninu za prodaju",
      slug: "kako-pripremiti-nekretninu-za-prodaju",
      excerpt: "Prvih nekoliko tjedana na tržištu su ključni. Evo konkretnih koraka koji mogu povećati vrijednost vaše nekretnine i ubrzati prodaju.",
      categorySlug: "savjeti-za-prodavatelje",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    },
    {
      locale: "HR" as const,
      title: "Što kupci prvo gledaju kod stana",
      slug: "sto-kupci-prvo-gledaju-kod-stana",
      excerpt: "Znate li što je prva stvar na koju kupci obraćaju pažnju kad uđu u stan? Odgovor može biti iznenađujući.",
      categorySlug: "savjeti-za-prodavatelje",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    },
    {
      locale: "HR" as const,
      title: "Kupnja nekretnine u Zagrebu — kompletan vodič",
      slug: "kupnja-nekretnine-u-zagrebu-vodic",
      excerpt: "Sve što trebate znati o kupnji stana ili kuće u Zagrebu: lokacije, cijene, postupak i na što paziti.",
      categorySlug: "zagreb",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1200&q=80",
    },
    {
      locale: "HR" as const,
      title: "Kako realno odrediti cijenu nekretnine",
      slug: "kako-odrediti-cijenu-nekretnine",
      excerpt: "Precijenjena nekretnina dugo sjedi na tržištu i na kraju se prodaje ispod vrijednosti. Evo kako postaviti pravu cijenu od početka.",
      categorySlug: "savjeti-za-prodavatelje",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
    },
    {
      locale: "HR" as const,
      title: "Najčešće greške prodavatelja nekretnina",
      slug: "najcesce-greske-prodavatelja",
      excerpt: "Pet grešaka koje prodavatelji rade najčešće — i kako ih izbjeći da biste prodali brže i za bolju cijenu.",
      categorySlug: "savjeti-za-prodavatelje",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    },
    {
      locale: "HR" as const,
      title: "Vodič za kupnju prve nekretnine",
      slug: "vodic-za-kupnju-prve-nekretnine",
      excerpt: "Kupujete prvu nekretninu? Korak po korak vodič koji će vam pomoći da donesete dobru odluku i izbjegnete skupe greške.",
      categorySlug: "savjeti-za-kupce",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&q=80",
    },
    {
      locale: "HR" as const,
      title: "Nekretnine u Velikoj Gorici — što trebate znati",
      slug: "nekretnine-u-velikoj-gorici",
      excerpt: "Velika Gorica je sve popularnija lokacija za kupnju kuće ili stana. Evo zašto i što tržište nudi.",
      categorySlug: "velika-gorica",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1200&q=80",
    },
    {
      locale: "HR" as const,
      title: "Kupnja zemljišta na Pagu — mogućnosti i zamke",
      slug: "kupnja-zemljista-pag",
      excerpt: "Pag nudi atraktivne mogućnosti za kupnju zemljišta, ali postoje specifičnosti koje morate znati prije nego potpišete.",
      categorySlug: "pag",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80",
    },
  ];

  for (const post of blogPostsHR) {
    const { categorySlug, ...postData } = post;
    const categoryId = hrCategories[categorySlug];
    const existing = await prisma.blogPost.findUnique({
      where: { locale_slug: { locale: "HR", slug: post.slug } },
    });
    if (existing) continue;

    await prisma.blogPost.create({
      data: {
        ...postData,
        status: "PUBLISHED",
        publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        readingTime: Math.floor(Math.random() * 5) + 3,
        categoryId: categoryId || null,
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: post.excerpt }],
            },
            {
              type: "heading",
              attrs: { level: 2 },
              content: [{ type: "text", text: "Uvod" }],
            },
            {
              type: "paragraph",
              content: [{ type: "text", text: "Ovo je placeholder sadržaj. Uredite ga putem admin panela." }],
            },
          ],
        },
      },
    });
    console.log(`  ✅ Blog HR: ${post.title}`);
  }

  // Blog posts EN
  const blogPostsEN = [
    {
      locale: "EN" as const,
      title: "How to Prepare Your Property for Sale",
      slug: "how-to-prepare-property-for-sale",
      excerpt: "The first few weeks on the market are critical. Here are concrete steps that can increase your property's value and speed up the sale.",
      categorySlug: "seller-guides",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    },
    {
      locale: "EN" as const,
      title: "What Buyers Notice First",
      slug: "what-buyers-notice-first",
      excerpt: "Do you know what is the very first thing buyers pay attention to when entering an apartment? The answer might surprise you.",
      categorySlug: "seller-guides",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    },
    {
      locale: "EN" as const,
      title: "Buying Property in Zagreb — A Complete Guide",
      slug: "buying-property-in-zagreb-guide",
      excerpt: "Everything you need to know about buying an apartment or house in Zagreb: neighborhoods, prices, process and what to watch out for.",
      categorySlug: "zagreb",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1200&q=80",
    },
    {
      locale: "EN" as const,
      title: "How to Price a Property Realistically",
      slug: "how-to-price-property-realistically",
      excerpt: "An overpriced property sits on the market for a long time and ultimately sells below value. Here's how to set the right price from the start.",
      categorySlug: "seller-guides",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
    },
    {
      locale: "EN" as const,
      title: "First-Time Buyer Guide",
      slug: "first-time-buyer-guide",
      excerpt: "Buying your first property? A step-by-step guide to help you make the right decision and avoid costly mistakes.",
      categorySlug: "buyer-guides",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&q=80",
    },
    {
      locale: "EN" as const,
      title: "Real Estate in Velika Gorica",
      slug: "real-estate-velika-gorica",
      excerpt: "Velika Gorica is an increasingly popular location for buying a house or apartment. Here's why and what the market offers.",
      categorySlug: "velika-gorica",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1200&q=80",
    },
    {
      locale: "EN" as const,
      title: "Buying Land on Pag Island",
      slug: "buying-land-on-pag",
      excerpt: "Pag offers attractive opportunities for buying land, but there are specifics you must know before signing.",
      categorySlug: "pag",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80",
    },
    {
      locale: "EN" as const,
      title: "Common Mistakes Sellers Make",
      slug: "common-mistakes-sellers-make",
      excerpt: "Five mistakes sellers make most often — and how to avoid them to sell faster and for a better price.",
      categorySlug: "seller-guides",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    },
  ];

  for (const post of blogPostsEN) {
    const { categorySlug, ...postData } = post;
    const categoryId = enCategories[categorySlug];
    const existing = await prisma.blogPost.findUnique({
      where: { locale_slug: { locale: "EN", slug: post.slug } },
    });
    if (existing) continue;

    await prisma.blogPost.create({
      data: {
        ...postData,
        status: "PUBLISHED",
        publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        readingTime: Math.floor(Math.random() * 5) + 3,
        categoryId: categoryId || null,
        content: {
          type: "doc",
          content: [
            { type: "paragraph", content: [{ type: "text", text: post.excerpt }] },
            { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Introduction" }] },
            { type: "paragraph", content: [{ type: "text", text: "This is placeholder content. Edit it through the admin panel." }] },
          ],
        },
      },
    });
    console.log(`  ✅ Blog EN: ${post.title}`);
  }

  console.log("✅ Blog posts created");
  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📋 Admin login:");
  console.log("   Email: admin@matijapinko.hr");
  console.log("   Password: Admin123!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
