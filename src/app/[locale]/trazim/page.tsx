import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tražim nekretninu",
  description: "Kupnja nekretnine ne bi smjela biti lov na sreću.",
};

export default function TrazimPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Kupnja</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Ne morate sami prolaziti kroz stotine oglasa.
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Kupnja nekretnine na papiru zvuči jednostavno — otvoriš portal, upišeš lokaciju, budžet i kvadraturu, pogledaš što se nudi. Ali svatko tko je ozbiljno tražio stan, kuću, zemljište ili investicijsku nekretninu vrlo brzo shvati da stvarnost nije ni približno tako čista.
          </p>
          <p>
            Gledaš oglase koji su već prodani, nekretnine koje izgledaju puno bolje na fotografijama nego uživo, cijene koje nemaju veze s realnim tržištem, vlasnike koji još uvijek &ldquo;samo ispituju teren&rdquo;, agente koji ti guraju ono što imaju umjesto onoga što tražiš.
          </p>
          <p>
            I tu većina kupaca počne raditi ono što je potpuno ljudski, ali često skupo — počnu odlučivati iz umora, pritiska i straha da će propustiti priliku. A nekretnina nije stvar koju kupuješ zato što si umoran od traženja.
          </p>
        </div>

        <div className="border-l-4 border-[#D4AF37] pl-8 my-12">
          <p className="font-playfair text-2xl text-[#1A1A1A] font-medium">
            &ldquo;Moj posao nije da vam prodam prvu nekretninu koja izgleda dobro. Moj posao je da vam pomognem razmišljati hladnije nego što je lako razmišljati kada se radi o velikom novcu.&rdquo;
          </p>
        </div>

        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Zato prije nego krenemo gledati oglase, želim razumjeti što vam je stvarno važno — lokacija, budžet, način života, prometna povezanost, škola, vrtić, parking, potencijal rasta vrijednosti, mir, pogled, mogućnost adaptacije, najam, buduća prodaja. Tek kada se sve to posloži, potraga počinje imati smisla.
          </p>
          <p>
            To znači da ću vam ponekad reći da nekretnina koju ste gledali nema smisla, da je cijena previsoka, da lokacija nije dobra za ono što planirate, da adaptacija može pojesti puno više novca nego što mislite ili da je bolje pričekati nego ući u kupnju samo zato što se bojite da neće biti druge prilike.
          </p>
          <p>
            Kupnja nekretnine ne bi smjela biti lov na sreću. Na kraju, cilj nije kupiti bilo što. Cilj je kupiti nekretninu zbog koje ćete za nekoliko godina reći da je odluka imala smisla.
          </p>
        </div>

        <div className="bg-[#F8F8F8] p-10 mt-12">
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-4">Recite mi što tražite</h2>
          <p className="text-gray-600 mb-6">
            Ako tražite stan, kuću, zemljište ili investicijsku nekretninu u Zagrebu, Velikoj Gorici, Pagu ili okolici, javite mi se i krenut ćemo od onoga od čega svaka dobra kupnja mora krenuti — od jasnog razgovora.
          </p>
          <Link href="/hr/kontakt" className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors">
            Zatražite besplatne konzultacije
          </Link>
        </div>
      </div>
    </div>
  );
}
