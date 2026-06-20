import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: { default: "Matija Pinko | Nekretnine Zagreb", template: "%s | Matija Pinko" },
  description: "Osobni agent za nekretnine. Zagreb, Velika Gorica, Pag i okolica.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-white text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}
