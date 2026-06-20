import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investicijske nekretnine",
  description: "Nije svaka nekretnina investicija. Neke čuvaju vrijednost. Neke je stvaraju.",
};

const metrics = [
  {
    title: "Potencijal najma",
    desc: "Koliki je realni prinos od najma i kako se uspoređuje s alternativama?",
  },
  {
    title: "Potencijal prodaje",
    desc: "Hoće li nekretnina biti lakše ili teže prodati za 5-10 godina?",
  },
  {
    title: "Razvoj lokacije",
    desc: "Što se gradi, planira ili mijenja u okolici koja utječe na vrijednost?",
  },
  {
    title: "Infrastruktura",
    desc: "Prometna povezanost, škole, servisi — što kupci budućnosti traže?",
  },
  {
    title: "Troškovi održavanja",
    desc: "Što će nekretnina koštati na godišnjoj razini bez prihoda?",
  },
  {
    title: "Rast vrijednosti",
    desc: "Postoji li fundamentalni razlog da ova lokacija vrijedi više za 10 godina?",
  },
];

export default function InvesticijecPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Investicije</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Jedna od najvećih zabluda jest da je svaka nekretnina investicija.
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Nije. Neke nekretnine troše novac. Neke čuvaju vrijednost. A neke stvaraju novu vrijednost. Razlika između te tri kategorije često nije vidljiva na prvi pogled.
          </p>
          <p>
            Zbog toga investicijske nekretnine promatram drugačije od klasične kupnje za život. Kada netko kupuje stan za sebe, emocije su potpuno normalan dio procesa. Kada netko ulaže novac, emocije bi trebale biti što manji dio jednadžbe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
          {metrics.map((item) => (
            <div key={item.title} className="p-6 bg-[#F8F8F8]">
              <h3 className="font-semibold text-[#1A1A1A] mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Upravo zato dobra investicijska nekretnina nije nužno ona koja izgleda najbolje, nego ona koja dugoročno donosi najbolji omjer rizika i potencijalnog povrata.
          </p>
        </div>

        <div className="border-l-4 border-[#D4AF37] pl-8 my-12">
          <p className="font-playfair text-2xl text-[#1A1A1A] font-medium">
            &ldquo;Moj cilj nije pronaći bilo koju priliku. Moj cilj je pronaći priliku koja ima smisla.&rdquo;
          </p>
        </div>

        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Fokusiran sam na Zagreb, Veliku Goricu i Pag — tržišta koja poznajem iznutra i gdje razumijem lokalne dinamike koje nisu vidljive iz široke slike.
          </p>
        </div>

        <div className="bg-[#F8F8F8] p-10 mt-12">
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-4">Razgovarajmo o investiciji</h2>
          <p className="text-gray-600 mb-6">
            Ako razmišljate o ulaganju u nekretnine, javite mi se i zajedno ćemo procijeniti ima li prilika koju gledate stvarnu investicijsku logiku.
          </p>
          <Link href="/hr/kontakt" className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors">
            Zatražite konzultacije
          </Link>
        </div>
      </div>
    </div>
  );
}
