import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="font-playfair text-8xl font-bold text-[#D4AF37] mb-4">404</div>
        <h1 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-4">Stranica nije pronađena</h1>
        <p className="text-gray-500 mb-8">Stranica koju tražite ne postoji.</p>
        <Link
          href="/hr"
          className="inline-flex items-center px-8 py-3 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors"
        >
          Povratak na početak
        </Link>
      </div>
    </div>
  );
}
