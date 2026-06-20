import Link from "next/link";

export const metadata = {
  title: "Kako radim",
  description: "Jedna od stvari koju vrlo brzo primijetim jest da većina ljudi zapravo ne traži agenta — nego sigurnost.",
};

export default function HowIWorkHR() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Proces</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white">Kako radim</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10 text-gray-600 text-lg leading-relaxed">
        <p>
          Jedna od stvari koju vrlo brzo primijetim kada razgovaram s ljudima koji kupuju ili prodaju nekretninu jest da većina njih zapravo ne traži agenta. Na prvu zvuči čudno, ali je istina. Ljudi misle da traže agenta, a u stvarnosti traže sigurnost. Traže nekoga tko će im pomoći donijeti dobru odluku. Traže osobu koja će im reći što ne vide.
        </p>
        <p>
          Upravo zato moj način rada možda izgleda malo drugačije od onoga na što ste navikli. Ne volim improvizirati. Ne volim nagađati. Ne volim donositi odluke na temelju osjećaja ako postoje podaci koji mogu pomoći da odluka bude bolja.
        </p>

        <div className="border-l-4 border-[#D4AF37] pl-8 my-12">
          <p className="font-playfair text-2xl text-[#1A1A1A] font-medium">
            Suradnja sa mnom gotovo nikada ne počinje nekretninom. Počinje razgovorom.
          </p>
        </div>

        <p>
          Želim razumjeti što pokušavate postići jer nije isto prodajete li obiteljsku kuću u kojoj ste proveli dvadeset godina, stan koji ste kupili kao investiciju ili zemljište koje vam više nije potrebno. Nije isto kupujete li prvi stan, tražite veći prostor za obitelj ili želite investirati novac koji ste godinama stvarali.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          {[
            { num: "01", title: "Razumijevanje situacije", desc: "Što prodajete ili tražite? Zašto? Koliko vam je važna brzina, a koliko cijena? Koji su rizici koje želite izbjeći? Tek kada razumijem situaciju, kreće analiza." },
            { num: "02", title: "Analiza tržišta", desc: "Ne zanima me samo što piše na portalima. Zanima me što se stvarno događa — koliko dugo se slične nekretnine prodaju, kakav je interes kupaca i koje su prednosti vaše nekretnine." },
            { num: "03", title: "Strategija i prezentacija", desc: "Na temelju analize definiramo pozicioniranje. Zatim dolazi prezentacija: fotografije, opis, komunikacija. Kupci donose odluke u nekoliko sekundi — prvi dojam ima ogroman utjecaj." },
            { num: "04", title: "Pregovori i zatvaranje", desc: "Vodim komunikaciju s kupcima, organiziram razgledavanja, filtriram ozbiljne upite i pregovaram. Upravo se tu najčešće odlučuje hoće li rezultat biti prosječan ili izvrstan." },
          ].map((step) => (
            <div key={step.num} className="p-8 bg-[#F8F8F8]">
              <div className="font-playfair text-5xl font-bold text-[#D4AF37]/20 mb-3">{step.num}</div>
              <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <p>
          To je dio posla koji većina ljudi nikada ne vidi. Vide fotografije. Vide oglas. Vide tablicu s cijenom. Ali ne vide sate provedene u analizi, razgovorima, istraživanju tržišta, komunikaciji s potencijalnim kupcima i pripremi pregovora. A upravo tamo se najčešće stvara vrijednost.
        </p>
        <p>
          Tijekom cijelog procesa vjerujem u jednu stvar više nego u bilo koju prodajnu tehniku — transparentnost. Ako mislim da nešto nije dobra ideja, reći ću vam. Ako smatram da su očekivanja previsoka, objasnit ću zašto. Ako vidim priliku koju vrijedi iskoristiti, reći ću vam i to.
        </p>
        <p className="font-medium text-[#1A1A1A]">
          Na kraju dana ne želim da me ljudi pamte kao osobu koja im je prodala nekretninu. Želim da me pamte kao osobu koja im je pomogla donijeti dobru odluku.
        </p>

        <div className="pt-4">
          <Link
            href="/hr/kontakt"
            className="inline-flex items-center px-10 py-4 bg-[#D4AF37] text-white font-semibold text-base hover:bg-[#B8972E] transition-colors"
          >
            Počnimo razgovorom
          </Link>
        </div>
      </div>
    </div>
  );
}
