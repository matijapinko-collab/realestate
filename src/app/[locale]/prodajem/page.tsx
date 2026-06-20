import Link from "next/link";

export const metadata = {
  title: "Prodajem nekretninu",
  description: "Dobra prodaja počinje mnogo prije prvog kupca. Strategija, pozicioniranje i realna procjena.",
};

export default function SellingHR() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Prodaja</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Dobra prodaja počinje mnogo prije prvog kupca.
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8 text-gray-600 text-lg leading-relaxed">
        <p>
          Mnogi vlasnici vjeruju da je najvažnije odrediti cijenu. Istina je da je cijena samo jedan dio jednadžbe. Dvije gotovo identične nekretnine mogu postići potpuno različit rezultat — jedna se može prodati unutar nekoliko tjedana, dok druga može mjesecima stajati bez ozbiljnog interesa.
        </p>
        <p>
          Razlog za to vrlo često nije sama nekretnina. Razlog je način na koji je predstavljena tržištu.
        </p>

        <div className="grid md:grid-cols-3 gap-6 my-12">
          {["Pozicioniranje nekretnine", "Kvaliteta prezentacije", "Fotografije i opis", "Ciljana publika", "Način komunikacije", "Pregovori"].map((item) => (
            <div key={item} className="flex items-center gap-3 p-4 bg-[#F8F8F8]">
              <div className="w-2 h-2 bg-[#D4AF37] flex-shrink-0" />
              <span className="text-[#1A1A1A] font-medium text-base">{item}</span>
            </div>
          ))}
        </div>

        <p>
          Upravo zato dvije gotovo identične nekretnine mogu postići potpuno različite rezultate. Ako razmišljate o prodaji, prvi korak nije objava oglasa. Moj pristup prodaji ne počinje objavom oglasa — počinje razumijevanjem vaše situacije.
        </p>

        <div className="border-l-4 border-[#D4AF37] pl-8 my-12">
          <p className="font-playfair text-2xl text-[#1A1A1A] font-medium">
            Želim znati zašto prodajete, koji su vam planovi, koliko vam je važna brzina realizacije i što za vas predstavlja uspješan rezultat.
          </p>
        </div>

        <p>
          Nakon toga slijedi analiza tržišta. Ne zanima me samo za koliko su slične nekretnine oglašene. Zanima me za koliko se stvarno prodaju, koliko dugo ostaju na tržištu, tko su potencijalni kupci i koje prednosti vaša nekretnina ima u odnosu na konkurenciju. Na temelju toga definiramo pozicioniranje.
        </p>
        <p>
          Zatim dolazi prezentacija. Kvalitetne fotografije, detaljan opis, jasna komunikacija i profesionalna prezentacija nisu luksuz — danas su očekivanje ozbiljnih kupaca. Ljudi donose odluke u nekoliko sekundi.
        </p>
        <p>
          Nakon što nekretnina izađe na tržište, posao tek počinje. Slijedi komunikacija s kupcima, organizacija razgledavanja, filtriranje ozbiljnih upita, pregovaranje i vođenje cijelog procesa prema realizaciji.
        </p>
        <p>
          Mnogi ljudi podcjenjuju važnost pregovora. U stvarnosti upravo se tijekom pregovora često odlučuje hoće li konačni rezultat biti prosječan ili izvrstan.
        </p>
        <p>
          Nećete dobiti nerealna obećanja samo zato da bismo započeli suradnju. Nećete dobiti procjenu koja zvuči odlično na papiru, ali nema dodira sa stvarnošću. Dobit ćete iskreno mišljenje, realne podatke i jasnu strategiju.
        </p>
        <p className="font-medium text-[#1A1A1A]">
          Jer dobra prodaja ne počinje kupcem. Dobra prodaja počinje strategijom.
        </p>

        <div className="bg-[#F8F8F8] p-10 mt-12">
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-4">Zatražite procjenu nekretnine</h2>
          <p className="text-gray-600 mb-6">
            Kroz kratke konzultacije možemo procijeniti situaciju, analizirati tržište i definirati sljedeće korake — bez ikakve obveze. Možda ćete odlučiti prodavati odmah. Možda ćete zaključiti da je bolje pričekati. Bez obzira na ishod, cilj je isti — donijeti odluku na temelju informacija.
          </p>
          <Link
            href="/hr/kontakt"
            className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors"
          >
            Zatražite besplatne konzultacije
          </Link>
        </div>
      </div>
    </div>
  );
}
