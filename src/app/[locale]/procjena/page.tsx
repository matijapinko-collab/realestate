import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Procjena nekretnine",
  description: "Dobra procjena nije pogađanje — kombinacija je tržišta, lokacije, stanja i ponašanja kupaca.",
};

const metrics = [
  {
    title: "Tržišna analiza",
    desc: "Što se stvarno prodaje i za koliko. Ne oglašene cijene — realizirane.",
  },
  {
    title: "Konkurencija",
    desc: "Koje nekretnine se natječu s vašom i kako se pozicionirate u odnosu na njih.",
  },
  {
    title: "Potencijal nekretnine",
    desc: "Što se može poboljšati prezentacijom, a što je strukturalni faktor.",
  },
  {
    title: "Realni kupci",
    desc: "Tko su potencijalni kupci i što oni stvarno vrednuju.",
  },
];

export default function ProcjenaPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Procjena</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Koliko moja nekretnina stvarno vrijedi?
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Ne koliko bi bilo lijepo da vrijedi. Ne koliko susjed misli da vrijedi. Ne koliko netko traži za sličan stan na oglasniku. Nego koliko realno može postići na tržištu uz dobru prezentaciju, pametno pozicioniranje i kvalitetno vođen proces prodaje. Upravo tu većina prodaja krene krivo.
          </p>
          <p>
            Ako cijenu postavite prenisko, ostavljate novac na stolu. Ako je postavite previsoko, riskirate da nekretnina mjesecima stoji online, gubi svježinu, privlači krive upite i na kraju se prodaje slabije nego što je mogla.
          </p>
          <p>
            Zato dobra procjena nije pogađanje. Dobra procjena je kombinacija tržišta, lokacije, stanja nekretnine, konkurencije, potražnje i realnog ponašanja kupaca.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 my-12">
          {metrics.map((item) => (
            <div key={item.title} className="p-6 bg-[#F8F8F8]">
              <h3 className="font-semibold text-[#1A1A1A] mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Jedna od najvećih grešaka na tržištu nekretnina je prihvatiti procjenu koja zvuči odlično na papiru, ali nema veze s onim što kupci zapravo plaćaju. Svaka takva procjena ima cijenu — a tu cijenu plaća vlasnik.
          </p>
        </div>

        <div className="border-l-4 border-[#D4AF37] pl-8 my-12">
          <p className="font-playfair text-2xl text-[#1A1A1A] font-medium">
            &ldquo;Cilj nije dati vam brojku koja se dobro sluša. Cilj je dati vam informaciju koja pomaže donijeti bolju odluku.&rdquo;
          </p>
        </div>

        <div className="bg-[#F8F8F8] p-10 mt-12">
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-4">Zatražite procjenu</h2>
          <p className="text-gray-600 mb-6">
            Pošaljite mi osnovne informacije o nekretnini i dobit ćete iskreno mišljenje — bez napuhavanja, bez pritiska i bez prodajne predstave. Samo realna slika i konkretan sljedeći korak.
          </p>
          <Link href="/hr/kontakt" className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors">
            Zatražite procjenu
          </Link>
        </div>
      </div>
    </div>
  );
}
