import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "hr") {
    return {
      title: "Često postavljana pitanja",
      description: "Odgovori na najčešća pitanja o kupnji, prodaji i procjeni nekretnina.",
    };
  }
  return {
    title: "Frequently Asked Questions",
    description: "Answers to the most common questions about buying, selling and valuing property.",
  };
}

const hrFaq = [
  {
    q: "Koliko vrijedi moja nekretnina?",
    a: "To je vjerojatno najčešće pitanje koje dobijem i ujedno pitanje na koje je najteže odgovoriti bez dodatnih informacija. Ljudi često gledaju oglase i uspoređuju svoju nekretninu s nekoliko sličnih koje pronađu online, ali tržište rijetko funkcionira tako jednostavno. Na vrijednost utječu lokacija, stanje nekretnine, kat, orijentacija, kvaliteta gradnje, konkurencija, trenutna potražnja i još niz detalja koje kupci primjećuju čak i kada ih ne izgovore naglas. Upravo zato ozbiljna procjena nikada nije puko pogađanje nego kombinacija iskustva, tržišnih podataka i razumijevanja ponašanja kupaca.",
  },
  {
    q: "Koliko traje prodaja nekretnine?",
    a: "Iskren odgovor je da ne postoji univerzalan rok. Neke nekretnine pronađu kupca vrlo brzo, dok druge mogu biti na tržištu mjesecima. Najčešći razlog nije sama nekretnina nego način na koji je postavljena na tržište. Kada su cijena, prezentacija i očekivanja usklađeni s realnom situacijom, proces obično ide znatno brže i jednostavnije.",
  },
  {
    q: "Trebam li prvo kupiti ili prvo prodati?",
    a: "To ovisi o vašoj situaciji, financijama i razini rizika koju ste spremni preuzeti. Neki klijenti žele prvo prodati kako bi imali potpunu kontrolu nad budžetom, dok drugi prvo traže novu nekretninu kako ne bi ostali bez opcije koja im odgovara. Ne postoji univerzalno točan odgovor i upravo zato je važno sagledati cijelu situaciju prije donošenja odluke.",
  },
  {
    q: "Isplati li se ulagati u renovaciju prije prodaje?",
    a: "Ponekad da, ponekad ne. Jedna od najvećih grešaka koju vlasnici rade jest da ulažu desetke tisuća eura u stvari koje kupci zapravo ne cijene dovoljno da bi ih platili kroz veću cijenu. S druge strane, postoje relativno male intervencije koje mogu značajno poboljšati prvi dojam i povećati interes kupaca. Prije bilo kakvog ulaganja uvijek je dobro procijeniti kakav se povrat realno može očekivati.",
  },
  {
    q: "Zašto jednostavno ne bih sam prodao nekretninu?",
    a: "Možete. I mnogi ljudi to uspješno naprave. Pitanje nije možete li sami prodati nekretninu, nego koliko vremena želite uložiti, koliko dobro poznajete tržište, koliko ste spremni pregovarati i koliko ste sigurni da ćete kroz cijeli proces donijeti optimalne odluke. Nekome ima smisla raditi samostalno, nekome nema. Moj posao nije uvjeriti vas da vam trebam — moj posao je pokazati gdje mogu donijeti dodatnu vrijednost.",
  },
  {
    q: "Što se događa nakon što vas kontaktiram?",
    a: "Ništa dramatično. Nećete dobiti prodajni monolog niti pritisak da odmah donesete odluku. Prvo ćemo razgovarati o vašoj situaciji, vidjeti što želite postići i procijeniti koje opcije imaju najviše smisla. Nakon toga možete odlučiti želite li nastaviti suradnju ili ne.",
  },
];

const enFaq = [
  {
    q: "How much is my property actually worth?",
    a: "That is usually the first question owners ask, and it is also the question that gets the most dangerous answers when people try to solve it by looking at a few listings online. Asking prices are not market value, neighbor opinions are not market value, and the fact that a similar apartment is listed for a certain amount does not mean buyers are actually willing to pay that amount. A realistic valuation has to look at the property, the location, recent demand, competing listings, buyer behavior, condition, layout, presentation and timing.",
  },
  {
    q: "How long does it take to sell a property?",
    a: "There is no honest universal answer, because a well-positioned property with realistic expectations can move quickly, while a property launched with the wrong price, weak presentation or unclear strategy can sit on the market for months and slowly lose momentum. The question is not only how long the sale takes, but whether the property enters the market in a way that gives it the best chance to attract serious buyers from the beginning.",
  },
  {
    q: "Should I renovate before selling?",
    a: "Sometimes yes, sometimes absolutely not, and this is where many owners waste money. Not every renovation increases the final sale price, and in some cases buyers would rather pay less and renovate according to their own taste. What usually matters more is whether the property feels clean, functional, well-presented and easy to understand.",
  },
  {
    q: "Should I sell first or buy first?",
    a: "That depends on your financial position, risk tolerance and how specific your next property needs to be. Selling first gives you a clearer budget and stronger negotiating position, but it can create pressure if you have not found your next property. Buying first can secure the right opportunity, but it can also create financial stress if your current property does not sell as quickly as expected. There is no perfect answer, only the answer that fits your situation.",
  },
  {
    q: "Can I sell my property without an agent?",
    a: "Of course you can, and some people do it successfully. The real question is not whether it is possible, but whether you want to handle pricing, positioning, inquiries, viewings, negotiation, buyer qualification, documentation coordination and emotional pressure on your own. For some owners, that makes sense. For others, the value of having someone manage the process, protect their interests and negotiate from a stronger position is worth far more than the fee.",
  },
  {
    q: "Why do some properties sit on the market for months?",
    a: "Usually because something is misaligned. It can be the price, the presentation, the location, the condition, the target buyer, the timing or the way the property is being communicated. The market is rarely completely silent without a reason, and when a property does not generate serious interest, the smart move is not to wait forever — it is to identify what the market is rejecting and adjust the strategy.",
  },
  {
    q: "What should I look at before buying a property?",
    a: "Most buyers focus on the obvious things — location, size, layout, price and photos — but the real risk is often hidden in the details. You need to understand the building condition, ownership situation, future maintenance costs, parking, noise, infrastructure, resale potential, neighborhood dynamics and whether the property still makes sense if your life changes in five years.",
  },
  {
    q: "What happens after I contact you?",
    a: "Nothing dramatic, and definitely no pressure. First, we talk. I want to understand what you are trying to achieve, where you are in the process and what kind of decision you are facing. After that, I can give you a clearer view of your options and suggest the next step that makes the most sense. Maybe we work together, maybe you simply leave the conversation with better information — both outcomes are fine.",
  },
];

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  const isHr = locale === "hr";
  const faqItems = isHr ? hrFaq : enFaq;

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">FAQ</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            {isHr ? "Često postavljana pitanja" : "Frequently Asked Questions"}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="divide-y divide-gray-100">
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="group border-b border-gray-100 last:border-b-0"
            >
              <summary className="flex items-center justify-between py-6 cursor-pointer list-none font-medium text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">
                <span>{item.q}</span>
                <span className="ml-4 flex-shrink-0 text-[#D4AF37] text-xl leading-none group-open:rotate-45 transition-transform duration-200">+</span>
              </summary>
              <div className="bg-[#F8F8F8] border-l-4 border-[#D4AF37] px-6 pt-4 pb-6 mb-4">
                <p className="text-gray-600 text-base leading-relaxed">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
