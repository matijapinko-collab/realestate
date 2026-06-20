import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4">
              Matija Pinko
            </h3>
            <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-medium mb-6">
              Osobni agent za nekretnine
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Prodaja i najam nekretnina u Zagrebu, Velikoj Gorici, Pagu i
              okolici. Iskustvo, transparentnost i osobni pristup.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#D4AF37] mb-6">
              Navigacija
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/hr" className="hover:text-white transition-colors">
                  Naslovnica
                </Link>
              </li>
              <li>
                <Link
                  href="/hr/o-meni"
                  className="hover:text-white transition-colors"
                >
                  O meni
                </Link>
              </li>
              <li>
                <Link
                  href="/hr/nekretnine"
                  className="hover:text-white transition-colors"
                >
                  Nekretnine
                </Link>
              </li>
              <li>
                <Link
                  href="/hr/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/hr/kako-radim"
                  className="hover:text-white transition-colors"
                >
                  Kako radim
                </Link>
              </li>
              <li>
                <Link
                  href="/hr/kontakt"
                  className="hover:text-white transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#D4AF37] mb-6">
              Kontakt
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#D4AF37] flex-shrink-0" />
                <a
                  href="tel:+385"
                  className="hover:text-white transition-colors"
                >
                  +385 xx xxx xxxx
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#D4AF37] flex-shrink-0" />
                <a
                  href="mailto:matija.pinko@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  matija.pinko@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>Zagreb, Velika Gorica, Pag</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} Matija Pinko. Sva prava pridržana.</p>
          <div className="flex gap-6">
            <Link
              href="/hr/pravila-privatnosti"
              className="hover:text-gray-300 transition-colors"
            >
              Pravila privatnosti
            </Link>
            <Link
              href="/hr/uvjeti-koristenja"
              className="hover:text-gray-300 transition-colors"
            >
              Uvjeti korištenja
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
