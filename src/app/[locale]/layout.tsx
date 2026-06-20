import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Matija Pinko | Nekretnine Zagreb",
    template: "%s | Matija Pinko",
  },
  description:
    "Osobni agent za nekretnine. Zagreb, Velika Gorica, Pag i okolica. Prodaja i najam nekretnina.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <WhatsAppButton />
      <Toaster />
    </NextIntlClientProvider>
  );
}
