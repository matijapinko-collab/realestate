import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "O meni",
  description: "Matija Pinko — osobni agent za nekretnine u Zagrebu, Velikoj Gorici i Pagu.",
};

export default function AboutPageHR() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">O meni</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Matija Pinko<br />Vaš osobni agent
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
              alt="Matija Pinko"
              width={600}
              height={750}
              className="object-cover w-full"
            />
          </div>
          <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
            <p>
              Ako ste ikada kupovali ili prodavali nekretninu, vrlo brzo ste shvatili da problem nije pronaći agenta. Problem je pronaći osobu kojoj možete vjerovati kada se radi o jednoj od najvećih financijskih odluka koje ćete donijeti.
            </p>
            <p>
              Zanimljivo je da nisam došao iz svijeta nekretnina. Veći dio svoje karijere proveo sam u prodaji, digitalnim proizvodima, marketingu, operacijama i upravljanju projektima, radeći s ljudima koji su svakodnevno donosili odluke vrijedne desetke ili stotine tisuća eura.
            </p>
            <p>
              Upravo tamo sam naučio nešto što danas vidim i na tržištu nekretnina: većina ljudi ne donosi loše odluke zato što nema dovoljno informacija, nego zato što ne zna kojim informacijama vjerovati.
            </p>
            <p>
              Zbog toga nikada nisam želio graditi posao na agresivnoj prodaji, velikim obećanjima ili pričama o tome kako se svaka nekretnina može prodati brzo i po rekordnoj cijeni. Svaka nekretnina ima svoje prednosti, svoje nedostatke, svoje kupce i svoju realnu tržišnu vrijednost. Moj posao nije da vam govorim ono što želite čuti, moj posao je da vam pomognem razumjeti situaciju u kojoj se nalazite i da zajedno donesemo najbolju moguću odluku.
            </p>
            <p>
              Možda zvuči neobično, ali nekretnine promatram na isti način na koji sam godinama promatrao poslovne projekte. Prvo pokušavam razumjeti cilj, zatim analizirati situaciju, identificirati prilike i rizike, definirati strategiju i tek onda krenuti u provedbu. Upravo zato suradnja sa mnom ne počinje fotografiranjem stana ili objavom oglasa. Počinje razgovorom.
            </p>
            <p>
              Danas svoj fokus usmjeravam na Zagreb, Veliku Goricu, Pag i okolna tržišta jer vjerujem da lokalno znanje ima ogromnu vrijednost. Tržište nekretnina nije isto u svakoj ulici, svakom kvartu ili svakom gradu, a ljudi koji to zanemare često plaćaju cijenu kroz lošije odluke.
            </p>
            <p>
              Ako odlučimo surađivati, možete očekivati iskrenu komunikaciju, transparentan pristup i maksimalan angažman. Ne mogu vam obećati da će svaki proces biti jednostavan — nekretnine rijetko jesu jednostavne. Mogu vam obećati da ćete uvijek znati gdje se nalazimo, koje su opcije ispred nas i što radimo kako bismo došli do najboljeg mogućeg rezultata.
            </p>
            <p className="font-medium text-[#1A1A1A]">
              Na kraju dana ne želim biti osoba koja vam je samo prodala ili pronašla nekretninu. Želim biti osoba za koju ćete nakon završene suradnje reći: &ldquo;Da ponovno prolazim kroz isti proces, nazvao bih njega.&rdquo;
            </p>
            <div className="pt-4">
              <Link
                href="/hr/kontakt"
                className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors"
              >
                Razgovarajmo
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-16">
          <h2 className="font-playfair text-3xl font-bold text-center mb-4">Zašto klijenti odabiru suradnju sa mnom</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Ne zato što obećavam najviše. Nego zato što govorim ono što trebate čuti.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Transparentnost", desc: "Nećete dobiti nerealna obećanja samo zato da bismo počeli suradnju. Nećete dobiti procjenu koja zvuči odlično na papiru, ali nema dodira sa stvarnošću." },
              { title: "Komunikacija", desc: "Uvijek znate gdje se nalazimo i što dolazi sljedeće. Bez iznenađenja, bez čekanja na informacije koje trebate." },
              { title: "Strateški pristup", desc: "Svakoj nekretnini pristupam kao projektu. Analiza tržišta, pozicioniranje, pregovaranje — sve s jasnim planom i ciljem." },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-[#F8F8F8]">
                <div className="w-10 h-0.5 bg-[#D4AF37] mb-4" />
                <h3 className="font-playfair text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
