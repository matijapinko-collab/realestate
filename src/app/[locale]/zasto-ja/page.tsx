import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zašto raditi sa mnom",
  description: "Neću vam prodavati priču. Dat ću vam iskreno mišljenje koje ima smisla.",
};

const pillars = [
  {
    title: "Iskustvo izvan nekretnina",
    desc: "Godinama sam radio u prodaji, operacijama, digitalnom marketingu i vođenju projekata. Naučio sam gledati širu sliku, razumjeti ljude, brojke, procese i rizike — a upravo to nedostaje kod kupnje i prodaje nekretnina.",
  },
  {
    title: "Direktnost i transparentnost",
    desc: "Radim direktno i bez uljepšavanja. Ako je cijena previsoka, reći ću vam. Ako mislim da se nekretnina može bolje pripremiti, reći ću vam. Ako vidim dobru priliku, reći ću vam i zašto mislim da je dobra.",
  },
  {
    title: "Strateški pristup",
    desc: "Ne gledam samo kvadraturu, lokaciju i cijenu. Gledam tko je realni kupac, zašto bi ga nekretnina zanimala, kako je treba predstaviti i gdje se može otvoriti prostor za pregovore.",
  },
];

export default function ZastoJaPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Zašto ja</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Ako vam treba samo još jedan agent, vjerojatno imate puno opcija.
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Neću vam prodavati priču da sam najbolji izbor samo zato što imam web stranicu i nekoliko dobro složenih rečenica o tržištu nekretnina — jer iskreno, to danas može napraviti bilo tko. I baš zato većina real estate komunikacije zvuči isto: svi su profesionalni, svi su posvećeni, svi poznaju tržište i svi obećavaju najbolju uslugu.
          </p>
          <p>
            Moja prednost nije u tome što ću vam reći da se nekretnina može prodati brzo, lako i po cijeni koju ste zamislili, nego u tome što ću vam vrlo jasno reći što je realno, što nije realno, gdje imate prednost, gdje postoji problem i što treba napraviti da iz situacije izvučemo najbolji mogući rezultat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 my-12">
          {pillars.map((item) => (
            <div key={item.title} className="p-6 bg-[#F8F8F8]">
              <h3 className="font-semibold text-[#1A1A1A] mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Neću vas gurati u odluku samo zato da se nešto dogodi što prije jer nekretnina nije mala odluka. Isto tako neću razvlačiti stvari kada je jasno da postoji dobra prilika, ozbiljan kupac ili trenutak koji treba iskoristiti.
          </p>
          <p>
            Poanta nije u tome da uvijek klimamo glavom jedni drugima, nego da dođemo do odluke koja je pametna, izvediva i u vašem interesu.
          </p>
        </div>

        <div className="border-l-4 border-[#D4AF37] pl-8 my-12">
          <p className="font-playfair text-2xl text-[#1A1A1A] font-medium">
            &ldquo;Ako želite nekoga tko će vašoj kupnji ili prodaji pristupiti kao ozbiljnom poslovnom procesu, onda možemo razgovarati.&rdquo;
          </p>
        </div>

        <div className="bg-[#F8F8F8] p-10 mt-12">
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-4">Razgovarajmo</h2>
          <p className="text-gray-600 mb-6">
            Bez pritiska, bez obveze. Samo iskren razgovor o vašim planovima i tome ima li suradnja smisla.
          </p>
          <Link href="/hr/kontakt" className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors">
            Kontaktirajte me
          </Link>
        </div>
      </div>
    </div>
  );
}
