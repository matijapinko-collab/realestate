/**
 * Project case studies.
 *
 * Publication rules from the brief (section 12):
 *  - only records with `approvedForPublication: true` may reach production
 *  - every record states the relationship type, Matija's role and the status
 *  - no invented results, logos, testimonials or growth figures
 *  - personal career history is NOT presented as a client of the Pinko trade
 *
 * `getPublishedProjects()` is the only accessor pages use, so an unapproved
 * record cannot leak into a page by accident.
 */

export type RelationshipType =
  /** Contracted work for a client of the Pinko trade. */
  | "klijent"
  /** Ongoing in-house / operational work. */
  | "interni-razvoj"
  /** Authored or editorial contribution. */
  | "autorski-rad"
  /** Employment or contract role in someone else's organisation. */
  | "profesionalna-uloga";

export type ProjectStatus = "lansirano" | "u-razvoju" | "u-pripremi";

export type EvidenceLink = {
  label: string;
  href: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * A full-page capture of the live site, shown in a frame the visitor can
 * scroll. An iframe is not an option: the sites we would embed send
 * `frame-ancestors 'self'`, and asking a client to loosen that header just so
 * a portfolio can frame them is the wrong trade.
 */
export type LiveScreen = {
  label: string;
  /** Full-page capture, tall. Real pixel dimensions, no guessing. */
  image: ProjectImage;
  /** The page the capture was taken from, so the reader can open the real thing. */
  href: string;
  /** Date of the capture — a screenshot ages, and the page says so. */
  capturedOn: string;
};

export type Project = {
  slug: string;
  projectName: string;
  relationshipType: RelationshipType;
  /** Precise description of Matija's contribution. No overstating. */
  role: string;
  status: ProjectStatus;
  approvedForPublication: boolean;
  /** One line under the project name. Optional; most records do without. */
  tagline?: string;
  summary: string;
  context: string;
  /**
   * The long form, when a project has one written out. Rendered in place of
   * the short context/challenge pair, which stay as the card's fallback.
   */
  story?: { heading: string; body: string[] }[];
  challenge: string;
  /**
   * What turned out to be harder than it looked. The brief of 19 Oct 2026
   * asks every case study to say this out loud instead of jumping from the
   * problem straight to the tidy solution. Optional: a record only has one
   * when the work actually produced complications worth naming.
   */
  complications?: string[];
  decisions: string[];
  deliverables: string[];
  /** Functional or operational outcomes only — never invented revenue. */
  outcomes: string[];
  /**
   * Measured figures. A number may be published only with the basis it was
   * measured on — which report, which period, which metric — so the reader
   * can judge it instead of taking it on faith. `outcomes` stays free of
   * numbers; they live here, next to their source.
   */
  metrics?: { value: string; label: string; basis: string }[];
  /**
   * Heading for the list above. Defaults to "Rezultat"; a project whose
   * outcome was never measured says "Moj doprinos" instead, rather than
   * dressing responsibilities up as results.
   */
  outcomesLabel?: string;
  /** What is still ahead on the project. Omitted when nothing is planned. */
  roadmap?: string[];
  nextStep: string;
  /**
   * The picture that stands for the project: on its card and at the top of
   * its page. A real screenshot of the real thing, never a mockup.
   */
  featuredImage?: ProjectImage;
  evidenceLinks: EvidenceLink[];
  /**
   * Why a published record has no public link to check. Internal systems —
   * an ERP, a warehouse process — leave nothing on the open web, and an
   * unrelated marketing site is not evidence of them. Stating the reason is
   * honest; quietly dropping the requirement would not be.
   */
  noPublicEvidence?: string;
  images: ProjectImage[];
  /** Scrollable captures of the live site. */
  liveScreens?: LiveScreen[];
  publishedAt: string | null;
  /** Shown on the card as a one-line contribution label. */
  contributionLabel: string;
  /**
   * An optional visual motif for the case study's title. "glitch" gives the
   * terminal scheme a short digital stutter and leaves the studio scheme
   * untouched — the studio reads as an editorial magazine, and a glitch
   * would be out of place there. Reduced motion switches it off entirely.
   */
  motif?: "glitch";
  /** Internal note for the launch checklist; never rendered. */
  internalNote?: string;
};

export const relationshipLabels: Record<RelationshipType, string> = {
  klijent: "Klijent",
  "interni-razvoj": "Interni razvoj i operativa",
  "autorski-rad": "Autorski i urednički rad",
  "profesionalna-uloga": "Profesionalna uloga",
};

export const statusLabels: Record<ProjectStatus, string> = {
  lansirano: "Lansirano",
  "u-razvoju": "U razvoju",
  "u-pripremi": "U pripremi",
};

/**
 * Records drafted from the brief (12). A record stays
 * `approvedForPublication: false` until Matija confirms the exact status,
 * contribution and what may be shown. That is the brief's rule, not a
 * technical limitation — flipping the flag is a business decision, so it is
 * deliberately left to him.
 *
 * Approved on 16 October 2026: `100-smart-food` and `varel`. The record for
 * the rare-disease association was parked at Matija's request (its official
 * name was never verified); it is recoverable from git history.
 */
export const projects: Project[] = [
  {
    slug: "bolero-temu",
    projectName: "Bolero Adria — Temu",
    tagline: "Klijent je postao #1 u kategoriji pića na Temu Hrvatska.",
    relationshipType: "klijent",
    role:
      "Razvoj prodajnog kanala na Temuu: ponuda i podaci o artiklima, odnos cijene i promocije, analiza prodaje te operativa od narudžbe do dostave.",
    status: "lansirano",
    approvedForPublication: true,
    summary:
      "Novi prodajni kanal za Bolero na Temuu — od asortimana i cijena do narudžbi, skladišta i dostave. Proizvod je došao na prvo mjesto kategorije pića.",
    context:
      "Bolero je imao proizvod i širok izbor okusa. Trebalo je razviti prodaju na platformi na kojoj se za kupčevu pažnju natječe gotovo sve što ima cijenu i fotografiju. Otvoriti trgovinu bio je početak; posao je bio povezati asortiman s Temu prodajnim modelom, razumjeti uvjete platforme i organizirati sve iza kupnje.",
    challenge:
      "Kupac vidi proizvod i cijenu. Iza toga moraju raditi podaci o artiklu, pakiranje, raspoloživost, obrada narudžbe i put do kupčevih vrata. Drugim riječima, puno više od „stavili smo proizvode na internet”. To danas može i toster, ako ima dovoljno dobar Wi-Fi.",
    story: [
      {
        heading: "Ponuda dovoljno široka da izbor ima smisla",
        body: [
          "U početnom izvještajnom razdoblju trgovina je imala 78 aktivnih Bolero artikala, uključujući Sticks, Classic i Ice Tea asortiman.",
          "Rad na kanalu uključivao je ponudu i podatke potrebne za prodaju: proizvode, formate pakiranja, informacije o uporabi i njihovo predstavljanje u marketplace okruženju.",
          "Kod instant napitaka kupac mora razumjeti što dobiva. Okus privlači pažnju, ali količina i format pakiranja moraju biti jednako jasni. Nitko ne želi naručiti osvježenje pa nakon otvaranja paketa upisati diplomski iz tumačenja listinga.",
        ],
      },
      {
        heading: "Cijena i Temu prodajni model",
        body: [
          "U razradi kanala bavio sam se odnosom osnovne cijene, promotivne ponude i uvjeta dostave.",
          "Temu ima vlastitu logiku prikaza i formiranja ponude, pa je trebalo razlikovati osnovnu cijenu prodavatelja od cijene koju vidi kupac — i prema tome ispravno čitati rezultate.",
          "Ponuda mora biti privlačna kupcu i imati smisla za trgovca. Sama činjenica da je nešto sniženo još nije poslovna strategija. Inače bi tipka „−20 %” već odavno imala vlastiti ured.",
        ],
      },
      {
        heading: "Analiza koja razlikuje pažnju od prodaje",
        body: [
          "Pratio sam jedinstvene posjetitelje, preglede proizvoda, konverziju, prosječnu vrijednost narudžbe i prodaju po osnovnoj cijeni.",
          "Važna je razlika između ta dva: posjećenost i narudžbe su u promatranoj usporedbi rasli zajedno, dakle rast se vidio i u stvarnoj kupnji, ne samo u pažnji.",
          "Graf je napokon počeo izgledati kao graf. A ne kao ravna crta koju liječnik u filmu zabrinuto pogleda.",
        ],
      },
      {
        heading: "Operativa: svaka narudžba mora dobiti svoj paket",
        body: [
          "Bolero je na Temuu prodavao iz vlastitog skladišta, što je značilo stvarnu obradu narudžbi i organizaciju slanja kupcima.",
          "Rad je obuhvaćao pripremu podataka za otpremu, povezivanje naručenih artikala s paketima i rješavanje dostavnih pitanja. U operativi su korišteni BoxNow i GLS, uz rad na podršci za dodatne dostavne opcije i praćenje pošiljaka.",
          "Tu e-commerce prestaje biti prezentacija i postaje posao. Netko mora pripremiti paket, provjeriti adresu i pobrinuti se da obećanje iz listinga dobije svoju dostavnu naljepnicu.",
        ],
      },
      {
        heading: "A onda je Bolero završio na prvom mjestu",
        body: [
          "Bolero proizvod zauzeo je prvo mjesto u kategoriji pića na Temu Hrvatska. Za klijenta je to bio vrijedan trenutak razvoja kanala: proizvod je dobio istaknuto mjesto u kategoriji u kojoj želi biti prepoznat.",
          "A prvo mjesto zvuči dosta dobro. Pogotovo kad prodajete piće — tada uspjeh doslovno možete zaliti vlastitim proizvodom.",
        ],
      },
    ],
    metrics: [
      {
        value: "#1",
        label: "proizvod u kategoriji pića na Temu Hrvatska",
        basis: "Pozicija Bolero proizvoda u kategoriji, prema klijentovoj potvrdi.",
      },
      {
        value: "+433\u00A0%",
        label: "narudžbi",
        basis: "Usporedba dvaju uzastopnih punih tjedana: 17.–23. i 24.–30. 8. 2026.",
      },
      {
        value: "+274\u00A0%",
        label: "jedinstvenih posjetitelja",
        basis: "Ista tjedna usporedba, Temu izvještaj.",
      },
      {
        value: "+396\u00A0%",
        label: "prodaje po osnovnoj cijeni",
        basis: "Ista tjedna usporedba, Temu metrika „Base price sales”. Nije dobit ni marža.",
      },
    ],
    decisions: [
      "Ponudu posložiti tako da kupcu budu jasni okus, količina i format pakiranja",
      "Razlikovati osnovnu cijenu prodavatelja od cijene koju kupac vidi, i rezultate čitati prema tome",
      "Posjećenost i narudžbe pratiti zajedno, da se pažnja ne pomiješa s prodajom",
      "Prodaja iz vlastitog skladišta, uz BoxNow i GLS i praćenje pošiljaka",
    ],
    deliverables: [
      "Razvoj kanala na Temuu: ponuda, podaci o artiklima i njihovo predstavljanje",
      "Razrada odnosa osnovne cijene, promocije i uvjeta dostave",
      "Praćenje posjećenosti, konverzije, prosječne vrijednosti narudžbe i prodaje",
      "Operativa narudžbi: priprema otpreme, povezivanje artikala s paketima, dostavna pitanja",
    ],
    outcomes: [
      "Proizvod je zauzeo prvo mjesto u kategoriji pića na Temu Hrvatska",
      "U početnoj fazi kanala rast posjećenosti pratio je i rast narudžbi, ne samo pažnje",
      "Kanal je dobio svakodnevnu operativu, od narudžbe do dostavne naljepnice",
    ],
    nextStep:
      "Imate dobar proizvod, a novi prodajni kanal još je na popisu „budemo”?",
    featuredImage: {
      src: "/projekti/bolero-temu-featured.webp",
      alt: "Grafika: Temu logo i kutije s hrvatskom zastavom, zlatni pehar s oznakom #1, Bolero proizvodi i mobitel s Temu popisom na kojem Bolero vrećice nose oznaku najprodavanijeg.",
      width: 1024,
      height: 572,
    },
    evidenceLinks: [
      { label: "bolerodrinks.com.hr", href: "https://bolerodrinks.com.hr/" },
    ],
    images: [],
    publishedAt: "2026-10-16",
    contributionLabel: "Razvoj Temu prodajnog kanala",
    internalNote:
      "Tekst je Matijin, dostavljen 16. 10. 2026., prebačen iz množine u jedninu kao i Elektronim. VAŽNO iz uredničkih napomena: #1 je pozicija Bolero PROIZVODA u kategoriji, ne tvrdnja da je trgovina najveći prodavatelj pića; nema screenshota rang-liste ni dokaza o trajanju pozicije. Postotci su iz Temu izvještaja za 17.–23. i 24.–30. 8. 2026., osnovica je mala pa NISU trajna stopa rasta. Apsolutni brojevi narudžbi i financijski iznosi se NE objavljuju. Base price sales nije dobit ni marža. Nije potvrđeno oglašavanje, pa tekst ne tvrdi ni da je rast organski ni da je plaćen. WooCommerce mix builder, Odoo, Amazon i druga tržišta NISU pripisani ovom rezultatu. Službeni web je bolerodrinks.com.hr (Matija potvrdio 16. 10. 2026.) — NE boleroadria.com. Naslovna slika je promotivna grafika koju je dostavio.",
  },
  {
    slug: "elektronim-instalacije",
    projectName: "Elektronim Instalacije",
    tagline: "Spojio sam firmu na internet. Bez bušenja zidova.",
    relationshipType: "klijent",
    role:
      "Izrada poslovnog weba i postavljanje temelja digitalne prisutnosti: struktura sadržaja, tekstovi, vizualno oblikovanje i put do upita.",
    status: "lansirano",
    approvedForPublication: true,
    summary:
      "Elektronim zna kako dovesti struju tamo gdje treba. Trebalo je omogućiti da do njih jednako jednostavno dođe i čovjek koji firmu prvi put traži na internetu.",
    context:
      "Elektroinstalacije za stambene, poslovne i industrijske objekte. Zadatak je bio postaviti digitalnu prisutnost tvrtke koja ima konkretne usluge i znanje, ali ih tek treba jasno predstaviti online: objasniti što rade, kome mogu pomoći i zašto ih vrijedi kontaktirati. Jer možete biti odlični u svom poslu, ali Google još uvijek nema opciju „Ma znaš onog dobrog električara, netko mi ga je spominjao kod šogora”.",
    challenge:
      "Preporuka vas dovede do razgovora — ali što se dogodi prije njega? Preporučeni izvođač najčešće prolazi još jedan mali razgovor za posao: onaj koji potencijalni klijent obavi sam sa sobom, gledajući rezultate pretraživanja.",
    story: [
      {
        heading: "Problem: preporuka vas dovede do razgovora. Što se događa prije njega?",
        body: [
          "Kod izvođačkih tvrtki velik dio posla dolazi preko poznanstava, preporuka i prethodnih suradnji. To je odličan temelj. Ali preporučeni izvođač nakon toga često završi na još jednom malom razgovoru za posao — onom koji potencijalni klijent obavi sam sa sobom, gledajući rezultate pretraživanja.",
          "Čime se točno bave? Rade li ovakve projekte? Mogu li im poslati upit?",
          "Firma bez digitalne prisutnosti na ta pitanja teško odgovara prije prvog kontakta. Osoba koja je dobila preporuku nema gdje provjeriti ponudu, a netko tko za firmu još nije čuo ima jednu priliku manje da je upozna.",
          "Elektronimu je trebao jasan, profesionalan prostor koji može preuzeti taj prvi dio predstavljanja.",
        ],
      },
      {
        heading: "Prvi izazov: krenuti od poslovanja, a ne od boje gumba",
        body: [
          "Kad tvrtka kreće graditi digitalnu prisutnost, lako je odmah preskočiti na fotografije, animacije i pitanje treba li naslov biti „malo veći”. Prije toga treba riješiti važnije stvari: koje usluge tvrtka nudi, kome ih želi predstaviti, što potencijalni klijent treba razumjeti prije slanja upita i koji je najjednostavniji put do kontakta.",
          "Za Elektronim sam prezentaciju organizirao oko njihovih područja rada, s naglaskom na stanogradnju i industrijske elektroinstalacije. Time široka ponuda dobiva strukturu: posjetitelj prepozna vlastitu potrebu i nastavi prema relevantnim informacijama.",
          "A gumb? Došao je i on na red. Preživio je.",
        ],
      },
      {
        heading: "Drugi izazov: tehničku stručnost prevesti na jezik kupca",
        body: [
          "Izvođač i naručitelj često gledaju isti projekt iz različitih perspektiva. Izvođač razmišlja o sustavima, izvedbi i tehničkim zahtjevima. Naručitelj želi znati može li mu netko kvalitetno riješiti instalacije u objektu koji gradi, uređuje ili modernizira.",
          "Zato sam usluge smjestio u razumljiv poslovni kontekst: vrste objekata, područja primjene i konkretne radove. Posjetitelj tako dobiva polazište za razgovor, bez očekivanja da prije slanja upita položi stručni ispit.",
          "Dobar web izvođača treba pokazati stručnost i olakšati kupcu da objasni što mu treba.",
        ],
      },
      {
        heading: "Treći izazov: izgraditi povjerenje prije prvog rukovanja",
        body: [
          "Tvrtka koja tek dolazi online treba predstaviti identitet i ponudu dovoljno jasno da posjetitelj dobije osjećaj s kim razgovara. Za to nisu potrebne rečenice poput „vodeći inovativni lider vrhunskih rješenja budućnosti”. Potrebno je odgovoriti na praktična pitanja: tko ste, što radite, za kakve projekte vas možemo angažirati i kako vas kontaktirati.",
          "Prezentaciju sam zato povezao kroz informacije o tvrtki, pregled usluga, vizualne prikaze i dostupne kontaktne podatke. Cilj je da potencijalni klijent dođe do prvog razgovora s više razumijevanja ponude.",
          "Povjerenje se gradi i time što čovjek ne mora pet minuta tražiti broj telefona kao da je riječ o nagradnoj igri.",
        ],
      },
      {
        heading: "Kako staviti firmu bez digitalne prisutnosti na tržište?",
        body: [
          "Prvi korak je dati joj adresu koju može poslati uz preporuku, uključiti u ponudu i pokazati potencijalnom partneru. Ali sama adresa nije dovoljna. Na njoj mora biti sadržaj koji predstavlja stvarno poslovanje.",
          "U Elektronimovu slučaju web je postao temelj za takvo predstavljanje: mjesto na kojem se može pregledati ponuda i pronaći kontakt. Na taj se temelj zatim mogu nadograđivati lokalna vidljivost, nove reference, sadržaj i buduće kampanje.",
          "Važno je krenuti s jasnom ponudom. Oglašavanje može dovesti čovjeka na stranicu, ali stranica mu mora pomoći da shvati zašto je došao. Inače samo plaćate da se više ljudi zbuni.",
        ],
      },
    ],
    decisions: [
      "Krenuti od poslovanja, a ne od boje gumba: prvo usluge, publika i put do upita",
      "Prezentaciju organizirati oko područja rada, s naglaskom na stanogradnju i industrijske elektroinstalacije",
      "Tehničku djelatnost opisati jezikom naručitelja: vrste objekata, područja primjene i konkretni radovi",
      "Kontakt staviti tamo gdje ga nitko ne mora tražiti",
    ],
    deliverables: [
      "Struktura sadržaja koja odvaja predstavljanje tvrtke, područja rada, usluge i kontakt",
      "Prezentacija ponude za stanogradnju i industrijske objekte",
      "Tekstovi i hijerarhija informacija koji tehničku djelatnost približavaju naručitelju",
      "Vizualno oblikovanje stranice koje podupire profesionalno predstavljanje",
      "Istaknute kontaktne informacije i pozivi na upit, da zainteresirani posjetitelj zna što dalje",
    ],
    outcomes: [
      "Elektronim ima poslovni web koji predstavlja tvrtku, organizira usluge i otvara put prema kontaktu",
      "Potencijalni klijenti imaju mjesto na kojem upoznaju ponudu prije razgovora",
      "Tvrtka ima stranicu koja može pratiti daljnji razvoj, nove projekte i buduće marketinške aktivnosti",
    ],
    nextStep: "Radite odličan posao, a nema vas još na internetu?",
    featuredImage: {
      src: "/projekti/elektronim-featured.webp",
      alt: "Naslovnica Elektronim Instalacija: naslov „Elektroinstalacije koje grade budućnost”, gumb za kontakt i fotografija ožičenog razvodnog ormara.",
      width: 1903,
      height: 915,
    },
    evidenceLinks: [
      {
        label: "elektronim-instalacije.hr",
        href: "https://elektronim-instalacije.hr/",
      },
    ],
    images: [],
    liveScreens: [
      {
        label: "Naslovnica",
        href: "https://elektronim-instalacije.hr/",
        capturedOn: "16. 10. 2026.",
        image: {
          src: "/projekti/elektronim-naslovnica.webp",
          alt: "Cijela naslovnica Elektronim Instalacija: hero, usluge, industrije, projekti i podnožje s kontaktom.",
          width: 1280,
          height: 7764,
        },
      },
    ],
    publishedAt: "2026-10-16",
    contributionLabel: "Poslovni web i digitalna prisutnost",
    internalNote:
      "Tekst je Matijin, dostavljen 16. 10. 2026. Jedina izmjena: prebačen iz množine („spojili smo”) u jedninu, jer Pinko je obrt jedne osobe i ostatak weba govori u prvom licu jednine — tako traži i brief. Vraćanje u množinu je izmjena na jednom mjestu.",
  },
  {
    slug: "teladoc-business-vision",
    projectName: "Teladoc / Business Vision",
    relationshipType: "profesionalna-uloga",
    role:
      "Chief Operating Officer Business Visiona; vođenje tima angažiranog na Teladoc projektu, uz odgovornost za operativu i povezivanje razvoja s poslovnim prioritetima.",
    status: "lansirano",
    approvedForPublication: true,
    summary:
      "Vođenje agencijskog tima iza telemedicinske platforme, uz operativu, razvoj proizvoda i usklađivanje prioriteta s dionicima.",
    context:
      "Teladoc je telemedicinska platforma na kojoj je Business Vision bio angažiran kao agencija. Nisam bio Teladocov dobavljač niti je Teladoc klijent Pinko obrta — bio sam COO tvrtke čiji je tim radio na projektu, u razdoblju siječanj 2023. – prosinac 2024.",
    challenge:
      "Razvoj digitalnog proizvoda traži puno više od dobrog koda. Poslovne ciljeve treba povezati s kapacitetom tima, razvoj s realnim prioritetima, a svakodnevne odluke s onim što se pokušava postići. Kod telemedicine se tome pridružuje i svrha proizvoda: tehnologija treba pomoći ljudima da lakše dođu do zdravstvene skrbi.",
    decisions: [
      "Vodstvo kao posao s ljudima, a ne s tablicama: mentoriranje, usklađivanje očekivanja i jasni ciljevi",
      "Proces ima smisla samo ako ljudima olakšava rad — ako proizvodi još jedan sastanak, preispituje se",
      "Jedna kontaktna točka prema partnerima, klijentima i investitorima, umjesto paralelnih kanala",
      "Ambicija mora imati organizacijsku i financijsku podršku, pa su budžet i kapacitet dio razgovora o opsegu",
    ],
    deliverables: [
      "Vođenje Business Vision tima angažiranog na Teladoc projektu",
      "Koordinacija više timova i povezivanje njihova rada s poslovnim prioritetima",
      "Svakodnevna operativa tvrtke i razvoj učinkovitijih procesa",
      "Izravna uključenost u razvoj proizvoda, uz Travel Elysium",
      "Komunikacija s partnerima, klijentima i investitorima",
      "Suradnja s financijama na budžetima, resursima i održivosti poslovanja",
    ],
    outcomes: [
      "Ljudi: iskustvo vođenja, zapošljavanja, mentoriranja i razvoja timova",
      "Poslovanje: razumijevanje prioriteta, odnosa s dionicima, budžeta i resursa",
      "Proizvod: izravna uključenost u razvoj i povezivanje poslovnih ciljeva s izvedbom",
      "Podloga za sve to je HR uloga prije COO-a, u organizaciji koja je na vrhuncu imala više od 75 developera",
    ],
    outcomesLabel: "Moj doprinos",
    nextStep:
      "Imate projekt kojem treba netko tko će povezati ljude, poslovanje i izvedbu?",
    featuredImage: {
      src: "/projekti/teladoc-health.webp",
      alt: "Naslovnica Teladoc Healtha: majka i dijete na kauču, na mobitelu otvoren video poziv s liječnikom.",
      width: 1900,
      height: 702,
    },
    evidenceLinks: [
      { label: "teladochealth.com", href: "https://www.teladochealth.com/" },
    ],
    images: [],
    publishedAt: "2026-10-16",
    contributionLabel: "Vođenje tima i operativa",
    internalNote:
      "Objavu odobrio Matija 16. 10. 2026. VAŽNO: razdoblje je trajanje COO uloge, NE potvrđeno trajanje rada na Teladocu. 75+ developera odnosi se na cijeli Business Vision na vrhuncu, ne na Teladoc tim. Nema brojki o prihodu, pacijentima, SLA, certifikatima ni zdravstvenim funkcionalnostima — ništa od toga nije potvrđeno. Teladoc nije klijent Pinko obrta.",
  },
  {
    slug: "100-smart-food",
    projectName: "100% Smart Food",
    relationshipType: "interni-razvoj",
    role:
      "Vodim razvoj i puštanje u rad: arhitektura storefronta, vlastiti konektor prema WordPressu, plaćanja i dostava, mjerenje, izvozi prema usporedbama cijena i operativa koja sve to drži na nogama.",
    status: "lansirano",
    approvedForPublication: true,
    summary:
      "Webshop sportske prehrane prebačen s gotove WordPress teme na vlastiti Next.js storefront — bez gašenja prodaje i bez preseljenja kataloga.",
    context:
      "100% Smart Food prodaje dodatke prehrani na više tržišta, kroz maloprodaju i B2B. Katalog, cijene, akcije i narudžbe godinama žive u WordPressu i WooCommerceu, na kojima radi cijela operativa: nabava, zalihe, računovodstvo, podrška.",
    challenge:
      "Gotova tema je došla do svoje granice. Stranica proizvoda se dugo otvarala, pravila kupnje nisu stala u predloške, a svaka izmjena značila je borbu s nečim tuđim. Katalog se pritom nije smio seliti — ljudi koji svaki dan rade u administraciji ne smiju preko noći ostati bez alata koji znaju.",
    decisions: [
      "Razdvojiti glavu od repa: WordPress ostaje mjesto gdje se vodi katalog, a Next.js preuzima ono što kupac vidi",
      "Vlastiti konektor umjesto gotovog REST-a — jedan ugovor o podacima između dva sustava, koji se verzionira i može vratiti unatrag",
      "Jedan predložak proizvoda za sve vrste artikala, umjesto šume iznimki",
      "Prikaz cijene po Omnibus pravilima ugrađen u sam proizvod, a ne nalijepljen pluginom",
      "Puštanje u rad u fazama, s kontrolnim točkama — plaćanja idu zadnja i tek kad testne narudžbe prođu čiste",
    ],
    deliverables: [
      "Next.js storefront: naslovnica, katalog s filterima, stranica proizvoda, košarica i blagajna",
      "Konektor prema WordPressu koji nosi katalog, cijene, zalihe, narudžbe i medijsku knjižnicu",
      "Kartično plaćanje i plaćanje na rate, uz dostavu na adresu i u paketomate",
      "Sidrena cijena i najniža cijena u 30 dana, recenzije i prednarudžbe na stranici proizvoda",
      "Izvozi prema Google Merchantu i usporedbama cijena",
      "Mjerenje kroz GTM i GA4, uključujući serversko slanje kupnje",
      "Operativa: deployment, keširanje i revalidacija, nadzor i vraćanje na prethodnu verziju",
    ],
    outcomes: [
      "Nova naslovnica i stranice proizvoda rade na živom prometu, uz nepromijenjen tijek narudžbe za operativu",
      "Katalog se i dalje vodi na jednom mjestu, bez dvostrukog unosa",
      "Stranica proizvoda otvara se bez čekanja koje je prije dolazilo od gotove teme",
      "Pravila kupnje — paketi, ograničenja po okusu, akcije — opisana su u kodu, pa se mijenjaju bez pregovora s predloškom",
      "Mjerenje i izvozi rade iz istog izvora podataka kao i trgovina",
    ],
    roadmap: [
      "Savjetnik u trgovini: chatbot koji odgovara iz stvarnog kataloga i deklaracija, a ne iz općih fraza",
      "Novi B2B storefront na istoj osnovi kao maloprodajni",
      "Povezivanje sa zalihama i ERP-om, da stanje na webu prati stvarno skladište",
      "Širenje na preostala tržišta po istom receptu",
    ],
    nextStep:
      "Imate webshop koji je prerastao gotovu temu, ali ne smijete stati s prodajom?",
    featuredImage: {
      src: "/projekti/sf-featured.webp",
      alt: "Naslovnica 100% Smart Fooda: akcijski banner s proizvodima i trake pogodnosti ispod njega.",
      width: 1917,
      height: 957,
    },
    evidenceLinks: [{ label: "100smartfood.hr", href: "https://100smartfood.hr/" }],
    images: [],
    liveScreens: [
      {
        label: "Naslovnica",
        href: "https://100smartfood.hr/",
        capturedOn: "16. 10. 2026.",
        image: {
          src: "/projekti/100-smart-food-naslovnica.webp",
          alt: "Naslovnica weba 100% Smart Food: slider s akcijom, trake pogodnosti, redovi proizvoda, ambasadori i podnožje.",
          width: 1280,
          height: 5899,
        },
      },
      {
        label: "Stranica proizvoda",
        href: "https://100smartfood.hr/proizvod/100-sleep",
        capturedOn: "16. 10. 2026.",
        image: {
          src: "/projekti/100-smart-food-proizvod.webp",
          alt: "Stranica proizvoda 100% Sleep: galerija, kupovni okvir s cijenom i sidrenom cijenom, recenzije i harmonike s opisom.",
          width: 1280,
          height: 5300,
        },
      },
    ],
    publishedAt: "2026-10-16",
    contributionLabel: "Next.js storefront nad WordPressom",
    internalNote:
      "Objavu odobrio Matija 16. 10. 2026. Tekst je namjerno bez imena poslužitelja, incidenata, brojeva narudžbi i internih brojki iz ERP-a — to je klijentova kuhinja i ne ide na javni portfelj.",
  },
  {
    slug: "bolero-erp",
    projectName: "Bolero Adria — ERP i automatizacije",
    relationshipType: "klijent",
    role:
      "Analiza poslovnih procesa, planiranje ERP arhitekture, koordinacija digitalne transformacije i integracija.",
    status: "u-razvoju",
    approvedForPublication: true,
    tagline:
      "Kako smo odlučili da Excel, pet webshopova i skladište prestanu živjeti svaki u svojem svemiru.",
    summary:
      "Reorganizacija digitalnih temelja poslovanja koje povezuje distribuciju, pakirne procese, webshopove, marketplace kanale i skladišta: analiza postojećeg sustava, ERP arhitektura, migracijska strategija i integracije.",
    context:
      "Bolero Adria posluje u distribuciji pića, prehrambenih proizvoda i dodataka prehrani. Kroz brendove Bolero Drinks i 100% Smart Food povezuje webshopove, fizičku prodaju, B2B kupce, skladišta i međunarodne marketplace kanale.",
    challenge:
      "Problem nije bio nedostatak softvera. Problem je bio što poslovanju treba jedan pouzdan izvor istine.",
    complications: [
      "Dijeljeni i nedostajući EAN kodovi — stare oznake nije bilo moguće naslijepo prenijeti",
      "Devetnaest evidentiranih lokacija prema četiri fizička skladišta, bez unaprijed poznatog značenja razlike",
      "Gotovo 67.000 povijesnih računa i otpremnica koje treba razumjeti prije bilo kakvog uvoza",
      "Više prodajnih kanala s vlastitom logikom narudžbi, cijena, statusa i dostave",
      "Pakiranja s odabirom okusa koja traže model komponenti, a ne prodaju generičkog paketa",
    ],
    story: [
      {
        heading: "Sve je radilo. Dok nismo počeli gledati kako.",
        body: [
          "Postoji jedna posebna faza u razvoju svake tvrtke. Posao raste. Narudžbe dolaze. Proizvodi se prodaju. Ljudi rade. I svi su uvjereni da je sve pod kontrolom.",
          "Sve dok netko ne postavi jedno vrlo jednostavno pitanje: „Koliko zapravo imamo proizvoda na skladištu?” Onda kreće zabava.",
          "Jedan sustav kaže jedno. Drugi sustav kaže drugo. Netko ima Excel tablicu. Netko zna napamet. A netko je siguran da je jučer vidio još dvije kutije iza palete.",
          "Jer prodavati na jednom webshopu nije isto što i koordinirati više prodajnih kanala, različita pakiranja, skladišta, cijene, dokumente i logistiku.",
        ],
      },
      {
        heading: "Dijagnoza: imamo podatke. Imamo i nekoliko verzija istine.",
        body: [
          "Prvi zadatak nije bio odabrati najljepši ERP. Bio je razumjeti što se stvarno događa u poslovanju. Analizirali smo postojeći Bizkit sustav, strukturu artikala, poslovne partnere, skladišne lokacije i povijesne dokumente.",
          "Migracija nije kopiranje tablice iz jednog programa u drugi. Ako preselite neuredne podatke u novi sustav, niste riješili problem. Samo ste mu kupili novi stan.",
          "Artikli i identifikatori: proizvodi se prodaju pojedinačno, u kutijama i kroz različite prodajne kanale. Ako više zapisa dijeli EAN ili dio artikala nema EAN, nije dovoljno naslijepo prenijeti stare oznake — potrebna je jasna strategija za SKU, EAN i pakiranja.",
          "Skladišta i lokacije: u starom sustavu identificirano je 19 lokacija, a operativno poslovanje oslanja se na četiri fizička skladišta. To ne znači automatski da je 15 lokacija pogrešno. Znači da treba utvrditi predstavljaju li stvarne skladišne pozicije, povijesne evidencije, virtualne lokacije ili nešto četvrto.",
          "Više prodajnih kanala: Bolero Adria koristi više WooCommerce trgovina, a poslovanje uključuje i Amazon te Temu. Svaki kanal ima vlastitu logiku narudžbi, cijena, statusa i dostave. Kupca ne zanima zašto su dva sustava prikazala različitu zalihu. Njega zanima gdje je njegov paket. I potpuno je u pravu.",
        ],
      },
      {
        heading: "Cilj: jedan sustav koji zna što se događa",
        body: [
          "Nismo željeli napraviti još jedan program koji će zaposlenici morati otvarati uz pet postojećih. Željeli smo postaviti temelje sustava koji povezuje poslovanje.",
          "Zato je definiran smjer prema Odoo ERP platformi, s prilagođenim integracijama i modulima ondje gdje standardne funkcionalnosti nisu dovoljne.",
          "Sustav treba povezati nabavu i dobavljače, skladišta i zalihe, pakiranja i proizvodne procese, webshopove i marketplace kanale, B2B i maloprodaju, logistiku i dostavu te izvještavanje.",
          "Ne, ne želimo još 37 Excel tablica. Želimo da poslovanje može odgovoriti na osnovna pitanja bez organiziranja sastanka.",
        ],
      },
      {
        heading: "Arhitektura: ERP kao mozak, prodajni kanali kao ruke",
        body: [
          "Ključna projektna odluka bila je definirati vlasništvo nad podacima. U predloženoj arhitekturi Odoo postaje središnji operativni sustav za artikle, skladišta, pakiranja i raspoloživost robe. WooCommerce ostaje prodajni kanal i mjesto na kojem kupac naručuje proizvode. Amazon i Temu zadržavaju vlastite marketplace procese, a integracijski sloj usklađuje podatke.",
          "Predviđeni tok narudžbe: kupac naručuje na webshopu ili marketplaceu, integracija preuzima narudžbu, ERP identificira artikle i njihove prodajne jedinice, provjerava raspoloživost i rezervira robu, skladište dobiva zadatak za pripremu, nakon obrade otpreme status se vraća prodajnom kanalu, a dokumenti ostaju dostupni za izvještavanje.",
          "To je ciljna arhitektura, ne tvrdnja da je svaka navedena integracija već implementirana.",
          "Zamislite da imate posljednju kutiju nekog proizvoda. Webshop kaže da je dostupna. Amazon kaže da je dostupna. Temu kaže da je dostupna. A skladištar kaže da je upravo otišla. Tri kupca, jedna kutija. Zato centralna evidencija zaliha i kontrolirana sinkronizacija nisu luksuz.",
        ],
      },
      {
        heading: "Najzanimljiviji izazov: pakiranja",
        body: [
          "Bolero i Smart Food nisu poslovanje u kojem svaki proizvod uvijek dolazi u jednoj jednostavnoj prodajnoj jedinici. Postoje pojedinačni artikli, kutije, kombinacije i pakiranja koja zahtijevaju dodatnu operativnu logiku.",
          "Kupac naruči paket s više odabranih okusa. Sustav ne smije samo evidentirati prodaju jednog generičkog paketa — mora znati koje su stvarne komponente potrebne i kako se njihova potrošnja odražava na skladište. Ako se paket proda, a komponente ne skinu sa zalihe, stanje će s vremenom postati nepouzdano.",
          "Za proces pakiranja definirali smo potrebu za jasnim modelom komponenti, izborom okusa, skladišnim kretanjima i odgovarajućim radnim zadacima. Kupac bira okuse. Sustav zna što treba pripremiti. Skladište zna što treba uzeti.",
          "To bi trebalo biti normalno. Ali tko je radio s poslovnim sustavima, zna da je „normalno” ponekad najskuplja funkcionalnost.",
        ],
      },
      {
        heading: "Migracija: 33.727 razloga za oprez",
        body: [
          "Kod zamjene ERP-a jedan od najvećih rizika nije novi sustav, nego podaci koje nosite iz starog. Bolero Adria ima značajnu povijest poslovnih dokumenata koju nije razumno samo izbrisati, a nije nužno ni sve stare dokumente ponovno knjižiti u novom ERP-u.",
          "Zato smo razradili pristup u kojem se razlikuju operativni podaci potrebni za nastavak poslovanja, povijesni dokumenti koji moraju ostati dostupni, neispravni ili neusklađeni zapisi koje treba provjeriti te početna stanja skladišta koja se moraju potvrditi inventurom.",
          "Jedan od važnih principa projekta jest zadržavanje starog sustava kao povijesne arhive, uz kontroliran početak rada u novom sustavu.",
          "Jer najgore što možete napraviti jest prenijeti deset godina problema i nazvati to digitalnom transformacijom. To nije transformacija. To je selidba nereda.",
        ],
      },
      {
        heading: "WMS: skladište ne smije biti escape room",
        body: [
          "Kada imate više skladišta, prodajnih kanala i različitih pakiranja, nije dovoljno znati samo ukupnu količinu proizvoda. Važno je znati gdje se roba nalazi, što je rezervirano, što treba pripremiti i što je već otpremljeno.",
          "U funkcionalni opseg uključeni su zaprimanje robe, skladišne lokacije i premještanja, inventure, rezervacije i priprema narudžbi, pakiranje i kompletiranje, otpremnice i dostava, povrati te praćenje operativnih statusa.",
          "Cilj je smanjiti ovisnost o informacijama koje postoje samo u nečijoj glavi. Jer „pitaj Ivana, on zna gdje je” nije skladišni sustav. To je usmena predaja. A usmena predaja je odlična za narodne pjesme. Za skladište baš i nije.",
        ],
      },
      {
        heading: "Moja uloga: manje prezentacija, više razumijevanja problema",
        body: [
          "Moja uloga nije samo odabrati softver i reći developerima što da naprave. Uključuje razumijevanje načina na koji tvrtka posluje, prepoznavanje problema i povezivanje tehničkih rješenja sa stvarnim operativnim potrebama.",
          "Radio sam na analizi postojećih sustava, definiranju ERP zahtjeva, pripremi migracijske strategije, planiranju integracija i koordinaciji digitalnih procesa. Posebno je važno povezati ono što se često promatra odvojeno: webshop, skladište, nabavu, logistiku i marketing.",
          "Jer nema smisla povećavati prodaju ako operativa ne može pratiti rast. Dobar ERP ne počinje kodom. Počinje pitanjem: „Zašto ovo uopće radimo ovako?”",
          "A odgovori znaju biti fantastični. „Oduvijek tako radimo.” „Tako je radio prošli kolega.” „Nemoj to dirati, radi.” Moj omiljeni je posljednji. Posebno kad ne radi.",
        ],
      },
      {
        heading: "Najveći problem digitalne transformacije nije tehnologija",
        body: [
          "Tehnologija je alat. Pravi izazov je razumjeti poslovanje koje je godinama raslo, mijenjalo se i prilagođavalo bez mogućnosti da netko svaki put stane i ponovno osmisli cijeli proces.",
          "Svaka iznimka ima razlog. Svaka tablica ima svoju povijest. Svaki zaposlenik ima način rada koji mu pomaže da preživi dan. A onda dođem ja i pitam zašto nešto radimo baš tako. Nekad dobijem dobar odgovor. Nekad dobijem Excel. Uglavnom dobijem još posla.",
          "Cilj je izgraditi sustav koji može pratiti rast poslovanja bez proporcionalnog rasta administrativnog kaosa. A najbolji dio? Ako sve napravimo kako treba, jednog dana nitko neće posebno razmišljati o ERP-u. Jer će jednostavno raditi.",
        ],
      },
    ],
    decisions: [
      "Odoo kao središnji operativni sustav za artikle, skladišta, pakiranja i raspoloživost robe",
      "WooCommerce ostaje prodajni kanal, a ne izvor istine o zalihama",
      "Integracijski sloj s jasno definiranim vlasništvom nad podacima prema svakom kanalu",
      "Stari sustav zadržan kao povijesna arhiva umjesto prenošenja svih dokumenata u novi ERP",
      "Strategija za SKU, EAN i pakiranja prije migracije, a ne nakon nje",
      "Model komponenti i skladišnih kretanja za pakiranja s odabirom okusa",
    ],
    deliverables: [
      "Analiza postojeće Bizkit baze: artikli, partneri, povijesni dokumenti, EAN identifikatori i skladišne lokacije",
      "Funkcionalni opseg: nabava, skladišta, pakiranja, prodajni kanali, B2B, POS, dostava, povrati, naplata i izvještavanje",
      "Migracijska strategija s razdvajanjem povijesne arhive od operativnih podataka",
      "Integracijska arhitektura prema WooCommerce trgovinama i marketplace kanalima",
      "Opseg skladišnih procesa (WMS) od zaprimanja do povrata",
    ],
    outcomesLabel: "Dosadašnji rezultati",
    outcomes: [
      "Analizirana postojeća baza i identificirani problemi s EAN identifikatorima i skladišnim lokacijama",
      "Definirani ključni poslovni procesi kroz cijeli funkcionalni opseg",
      "Odabran tehnološki smjer: Odoo kao temelj buduće centralizacije",
      "Razrađena migracijska strategija i kontrolirano uspostavljanje početnih zaliha",
      "Definirana integracijska arhitektura s jasnijim vlasništvom nad podacima",
    ],
    metrics: [
      {
        value: "762",
        label: "artikla u analizi",
        basis:
          "Analizirani migracijski skup podataka iz postojećeg Bizkit sustava, a ne završno stanje produkcijske migracije.",
      },
      {
        value: "523",
        label: "poslovna partnera",
        basis:
          "Analizirani migracijski skup podataka iz postojećeg Bizkit sustava, a ne završno stanje produkcijske migracije.",
      },
      {
        value: "33.727",
        label: "povijesnih računa",
        basis:
          "Analizirani migracijski skup podataka iz postojećeg Bizkit sustava, a ne završno stanje produkcijske migracije.",
      },
      {
        value: "32.980",
        label: "otpremnica",
        basis:
          "Analizirani migracijski skup podataka iz postojećeg Bizkit sustava, a ne završno stanje produkcijske migracije.",
      },
      {
        value: "19",
        label: "evidentiranih lokacija prema 4 fizička skladišta",
        basis:
          "Evidencija lokacija u Bizkit sustavu usporedno s brojem fizičkih skladišta; dio lokacija tek treba razvrstati kao stvarne, povijesne ili virtualne.",
      },
      {
        value: "61 / 204",
        label: "dijeljenih EAN kodova / artikala bez EAN-a",
        basis:
          "Analizirani migracijski skup podataka iz postojećeg Bizkit sustava; podloga za strategiju SKU-a, EAN-a i pakiranja.",
      },
    ],
    roadmap: [
      "Potvrda početnih stanja skladišta inventurom",
      "Fazno puštanje modula u rad uz stari sustav kao arhivu",
      "Implementacija integracija prema WooCommerce trgovinama i marketplace kanalima",
      "Mjerenje učinaka nakon puštanja: pouzdanost zaliha, ručni rad, skladišni procesi i izvještavanje",
    ],
    nextStep:
      "Imate webshop, skladište, ERP, tri Excel tablice i zaposlenika koji jedini zna kako sve to funkcionira?",
    evidenceLinks: [],
    noPublicEvidence:
      "ERP, WMS i integracije su interni sustavi klijenta i nemaju javnu adresu koju bi čitatelj mogao otvoriti. Brojke u tekstu dolaze iz analiziranog migracijskog skupa podataka, a svaka je navedena s osnovicom na kojoj je izmjerena.",
    images: [],
    publishedAt: "2026-10-19",
    contributionLabel: "ERP arhitektura, migracija i integracije",
    internalNote:
      "Tekst je Matijin, dostavljen 19. 10. 2026. Status je namjerno 'u razvoju': analiza, migracijska priprema i fazni razvoj. Nijedna integracija nije prikazana kao implementirana, a očekivane koristi stoje kao očekivanja koja treba potvrditi mjerenjem nakon puštanja. Nema javne poveznice — razlog je zapisan u noPublicEvidence.",
  },
  {
    slug: "bolero-drinks",
    projectName: "Bolero Drinks",
    relationshipType: "interni-razvoj",
    role:
      "Razvoj prodajnog weba i iskustva odabira proizvoda i paketa, uz rad na prodajnim kanalima i infrastrukturi.",
    status: "u-razvoju",
    approvedForPublication: false,
    summary:
      "Prodajni web i odabir proizvoda/paketa za brend napitaka, povezan s operativom više kanala.",
    context:
      "Brend napitaka s više proizvoda i paketa koji se prodaju kroz nekoliko kanala.",
    challenge:
      "Odabir proizvoda i paketa mora biti razumljiv kupcu, a operativa mora pratiti više kanala bez dvostrukog unosa.",
    decisions: [
      "Jedan izvor istine za katalog prema kanalima",
      "Iskustvo odabira paketa prilagođeno stvarnoj ponudi",
      "Infrastruktura i deployment pod vlastitim upravljanjem",
    ],
    deliverables: [
      "Prodajni web i odabir proizvoda/paketa",
      "Povezivanje s prodajnim kanalima prema opsegu",
    ],
    outcomes: [
      "Jasniji put od odabira paketa do narudžbe",
      "Operativa više kanala s manje ručnih koraka",
    ],
    nextStep: "Prodajete kroz više kanala i gubite vrijeme na dvostruki unos?",
    evidenceLinks: [],
    images: [],
    publishedAt: null,
    contributionLabel: "Prodajni web i operativa kanala",
    internalNote:
      "Potvrditi točan status i doprinos te odobrene screenshotove prije objave.",
  },
  {
    slug: "varel",
    projectName: "Varel",
    relationshipType: "interni-razvoj",
    role:
      "Vlastiti proizvod, od prazne mape do produkcije: arhitektura, model podataka, razvoj, vlastita administracija, alati i objava.",
    status: "u-razvoju",
    approvedForPublication: true,
    summary:
      "Višejezična platforma za pronalaženje i usporedbu alata za rad, s vlastitom administracijom i alatima koji rade posao umjesto čitatelja.",
    context:
      "Tražilice za alate uglavnom su popisi s afilijacijskim poveznicama. Varel je pokušaj da to bude korisno: katalog alata, usporedbe, vodiči i uredničko pismo na jednom mjestu, na više jezika, s administracijom u kojoj sadržaj može mijenjati čovjek koji nije programer.",
    challenge:
      "Višejezičnost se ne da nalijepiti naknadno, a katalog, usporedbe, vodiči i tekstovi dijele iste pojmove. Uz to proizvod ne smije ovisiti o meni: ako za svaku izmjenu treba deployment, projekt je mrtav čim se prestanem njime baviti.",
    decisions: [
      "Jezik ugrađen u model podataka od prvog dana, a ne dodan kao prijevodna datoteka",
      "Vlastita administracija umjesto gotovog CMS-a — uredničko sučelje za alate, usporedbe, vodiče i objave",
      "Jedan izvor istine za alate i kategorije, iz kojeg se hrane i usporedbe i tekstovi",
      "Odbacivanje dijelova koji nisu nosili svoju težinu: početni opseg je u hodu smanjen umjesto da se vuče dalje",
      "Alati koji nešto stvarno rade, a ne samo nabrajaju — upitnik koji preporuča alate i skener vidljivosti",
    ],
    deliverables: [
      "Katalog alata s kategorijama, usporedbama i vodičima",
      "Uredničko pismo i sustav autora, sve višejezično",
      "Vlastita administracija: unos i uređivanje sadržaja, medijska knjižnica, upravljanje afilijacijskim poveznicama",
      "Upitnik koji iz nekoliko odgovora predlaže alate",
      "Skener vidljivosti koji provjerava kako se stranica vidi iz perspektive jezičnih modela",
      "Objava u produkciju na vlastitoj domeni, s vlastitom bazom i pohranom medija",
    ],
    outcomes: [
      "Platforma je javno dostupna i radi na više jezika",
      "Sadržaj se dodaje i mijenja kroz administraciju, bez izmjene koda i bez novog deploya",
      "Zajednički model podataka drži katalog, usporedbe i tekstove u skladu",
    ],
    roadmap: [
      "Punjenje kataloga stvarnim alatima umjesto početnog ogledne postave",
      "Uredničko pismo kao redovit ritam, ne kao jednokratna objava",
      "Zasebni poslovni moduli koji dijele istu osnovu",
      "Mjerenje i afilijacijsko izvještavanje nad stvarnim prometom",
    ],
    nextStep: "Gradite proizvod koji morate sami moći puniti sadržajem?",
    featuredImage: {
      src: "/projekti/varel-featured.webp",
      alt: "Naslovnica Varela: naslov, tražilica alata i prijedlozi pojmova ispod nje.",
      width: 1905,
      height: 671,
    },
    evidenceLinks: [{ label: "varel.io", href: "https://varel.io/" }],
    images: [],
    publishedAt: "2026-10-16",
    contributionLabel: "Vlastiti proizvod — arhitektura i razvoj",
    internalNote:
      "Objavu odobrio Matija 16. 10. 2026. Status spušten na 'u-razvoju' 16. 10.: platforma radi, ali javni katalog još prikazuje ogledne zapise ([SAMPLE] Demo tool). Snimke živih stranica namjerno NISU objavljene dok je tako — vratiti ih čim katalog ima stvarne alate, postupak je u docs/snimke-zivih-stranica.md. Moduli za poslovne korisnike (CRM, electro) namjerno se ne spominju.",
  },
  {
    slug: "virus-hr",
    projectName: "Virus.hr",
    relationshipType: "autorski-rad",
    role:
      "Istraživanje, pisanje i priprema uredničkog sadržaja iz područja tehnologije i gaming industrije.",
    status: "lansirano",
    approvedForPublication: true,
    tagline:
      "Kad ti je posao pisati o igrama, tehnologiji i svemu što internet izbaci. Zvuči teško, znam.",
    summary:
      "Content writing, research i tech journalism za hrvatski gaming i tehnološki portal: praćenje industrije, provjera izvora i pisanje članaka koje netko stvarno poželi pročitati.",
    context:
      "Virus.hr je hrvatski gaming i tehnološki portal koji prati svijet videoigara, hardvera, softvera, novih tehnologija i događanja u digitalnoj industriji.",
    challenge:
      "Problem nije pronaći vijesti. Problem je pronaći one koje su stvarno zanimljive, provjeriti informacije i objasniti ih na način koji nije dosadan kao upute za sastavljanje uredskog ormara.",
    complications: [
      "Informacije se u industriji često pojavljuju kao glasine, curenja podataka ili marketinške najave",
      "Razliku između potvrđene vijesti i tvrdnje s foruma treba vidjeti prije objave, ne poslije",
      "Tehnički sadržaj mora biti precizan za entuzijaste i razumljiv onima koji ne razlikuju GPU od CPU-a",
      "Količina dnevnih vijesti veća je od onoga što itko može pročitati, pa je izbor teme dio posla",
    ],
    story: [
      {
        heading:
          "Gaming, tehnologija i beskonačna količina vijesti. Netko je morao sve to pratiti.",
        body: [
          "Postoje ljudi koji nakon posla upale računalo kako bi se opustili. A postoje i oni koji upale računalo, otvore dvadesetak izvora, krenu čitati o novim grafičkim karticama, poskupljenjima konzola, umjetnoj inteligenciji i posljednjoj poslovnoj katastrofi nekog velikog gaming izdavača. Pogodite kojoj skupini pripadam.",
          "Moj dio posla bio je istraživati aktualne teme, pratiti razvoj industrije i pretvarati informacije u članke koje ljudi žele pročitati.",
          "Jer nije dovoljno samo prenijeti vijest. Treba razumjeti što se dogodilo, zašto je važno i zašto bi čitatelja uopće trebalo biti briga. A ako pritom uspijem ubaciti malo humora, još bolje.",
        ],
      },
      {
        heading:
          "Internet proizvodi više vijesti nego što normalan čovjek može pročitati",
        body: [
          "Svaki dan donosi novu lavinu informacija. NVIDIA predstavlja novu tehnologiju. AMD priprema odgovor. Microsoft mijenja strategiju. Sony razmišlja o budućnosti PlayStationa. Ubisoft ponovno objašnjava zašto je sve pod kontrolom. A umjetna inteligencija u međuvremenu pokušava preuzeti pola interneta.",
          "Posebno u gaming i tehnološkoj industriji, gdje se informacije često pojavljuju kao glasine, neslužbena curenja podataka, izjave analitičara ili marketinške najave.",
          "Zato kvalitetan članak mora razlikovati činjenice od pretpostavki. Jer između „Sony je potvrdio” i „netko na forumu tvrdi” postoji prilično velika razlika. Iako internet ponekad misli drukčije.",
        ],
      },
      {
        heading: "Research — prvo istraživanje, onda tipkovnica",
        body: [
          "Jedan od najvažnijih dijelova mojeg rada bilo je praćenje relevantnih izvora i istraživanje tema prije pisanja: međunarodni gaming i tehnološki mediji, najave proizvođača hardvera i softvera, razvoj umjetne inteligencije, događanja u industriji, usporedba informacija iz više izvora, provjera tehničkih specifikacija i konteksta te poslovne odluke velikih tehnoloških kompanija.",
          "Nije poanta uzeti prvi članak koji Google izbaci i prepričati ga. Poanta je razumjeti temu dovoljno dobro da je možeš objasniti nekome tko nema vremena provesti tri sata istražujući istu stvar.",
          "Dobar research čitatelju štedi vrijeme. Loš research proizvodi još jedan članak koji nitko nije trebao.",
        ],
      },
      {
        heading: "Tech novosti — od novih procesora do umjetne inteligencije",
        body: [
          "Tehnologija se mijenja toliko brzo da ono što je danas revolucionarno sutra već dobije nasljednika. Fokus je bio na novostima koje imaju stvaran utjecaj na korisnike: nove generacije grafičkih kartica, procesora i komponenti, razvoj AI tehnologije, promjene cijena hardvera, softverske inovacije i novi proizvodi.",
          "Ali tehnički članak ne bi trebao biti samo popis specifikacija. Ako nova grafička kartica ima više jezgri, bržu memoriju i veću potrošnju energije, čitatelju treba objasniti što to zapravo znači. Hoće li dobiti bolje performanse? Hoće li morati mijenjati napajanje? Isplati li se nadogradnja? Ili proizvođač samo želi da ponovno potroši pola plaće?",
          "Tehnologija je zanimljiva tek kad objasnimo što ona znači ljudima koji je koriste.",
        ],
      },
      {
        heading: "Gaming industrija — više od trailera i datuma izlaska",
        body: [
          "Gaming nije samo zabava. To je globalna industrija u kojoj se susreću tehnologija, kreativnost, marketing, financije i poslovne strategije. Pratio sam teme vezane uz razvoj videoigara, izdavače, nove konzole, promjene na tržištu, poslovne odluke i tehnološke trendove.",
          "Posebno su zanimljive situacije u kojima se očekivanja igrača i poslovni interesi kompanija baš i ne slažu. A takvih situacija, srećom za novinare, nikad ne nedostaje.",
          "Kada veliki izdavač odgodi igru, priča nije samo u novom datumu izlaska. Važno je razumjeti što odgoda znači za igrače, razvojni studio, poslovanje kompanije i budućnost franšize. Isto vrijedi za rast cijena konzola, pretplatničke modele, mikrotransakcije i promjene u distribuciji igara.",
        ],
      },
      {
        heading: "Pisanje članaka — informativno ne mora značiti dosadno",
        body: [
          "Internet je već prepun tekstova koji zvuče kao da ih je pisao korporativni odjel za odnose s javnošću. „Kompanija je izrazila zadovoljstvo inovativnim strateškim pristupom.” Predivno. A sad nam recite što su zapravo napravili.",
          "Članak mora imati dobar naslov, smislen uvod, provjerene informacije i dovoljno konteksta da čitatelj razumije temu. Bez nepotrebnog razvlačenja. Bez izmišljanja senzacija. I bez pet odlomaka uvoda prije nego što konačno saznamo o čemu se radi.",
          "Prvo pronaći priču: nije svaka objava vrijedna zasebnog članka. Drugo, istražiti kontekst: što se dogodilo prije, tko je uključen, koliko su informacije pouzdane. Treće, napisati razumljiv tekst: dovoljno precizan za entuzijaste, razumljiv i ljudima koji ne razlikuju GPU od CPU-a. Četvrto, dati tekstu karakter: dobar naslov privlači pozornost, dobar tekst je zadržava.",
          "A malo sarkazma nikad nije ubilo dobar članak. Barem koliko znam.",
        ],
      },
      {
        heading: "Zašto je ovaj projekt važan?",
        body: [
          "Virus.hr pokazuje drugu stranu mojeg profesionalnog iskustva. Ne bavim se samo razvojem webova, webshopova i poslovnih sustava. Bavim se i informacijama: istraživanjem, razumijevanjem tržišta, analizom trendova i pisanjem sadržaja koji kompleksne teme pretvara u razumljive priče.",
          "To je iskustvo koje se izravno prenosi na content marketing, SEO sadržaj, komunikaciju proizvoda i digitalne strategije.",
          "Jer možete imati najbolji proizvod na svijetu. Ako ga ne znate objasniti ljudima, imate prilično skup problem. A upravo tu dobar sadržaj radi razliku.",
        ],
      },
      {
        heading: "Nije svaki posao u kodu",
        body: [
          "Virus.hr mi je omogućio da spojim nekoliko stvari koje me stvarno zanimaju: tehnologiju, gaming, istraživanje i pisanje. I da pritom imam sasvim legitimno opravdanje za praćenje novih grafičkih kartica, gaming konferencija i poslovnih odluka tehnoloških kompanija.",
          "Šalu na stranu, kvalitetan digitalni sadržaj zahtijeva ozbiljan rad. Treba pronaći pravu temu, razumjeti informacije, provjeriti izvore i napisati tekst koji će netko stvarno poželjeti pročitati.",
          "Jer internetu ne treba još sadržaja samo zato da ga ima. Treba mu više sadržaja koji ima smisla. A ako se čitatelj pritom i nasmije — još bolje.",
        ],
      },
    ],
    decisions: [
      "Teme se biraju prema aktualnosti i relevantnosti za hrvatsku publiku, a ne prema tome što je lako prepričati",
      "Informacije se uspoređuju iz više izvora prije objave",
      "Činjenica i pretpostavka u tekstu su jasno razdvojene",
      "Tehnički sadržaj objašnjava što specifikacija znači korisniku, a ne samo koja je",
      "Naslov i struktura su dio posla, ne naknadni dodatak",
    ],
    deliverables: [
      "Istraživanje i praćenje tehnoloških i gaming tema",
      "Priprema i pisanje informativnih i analitičkih članaka",
      "Provjera izvora, specifikacija i konteksta prije objave",
      "Oblikovanje naslova i strukture digitalnog sadržaja",
    ],
    outcomesLabel: "Moj doprinos",
    outcomes: [
      "Istraživački pristup aktualnim temama",
      "Pisanje informativnih i analitičkih članaka",
      "Razumijevanje tehnoloških i gaming trendova",
      "Prilagodba kompleksnih informacija široj publici",
      "Kreiranje naslova i strukture digitalnog sadržaja",
      "Kritičko vrednovanje izvora i informacija",
    ],
    nextStep:
      "Trebate nekoga tko zna pisati o stvarima koje drugi jedva razumiju?",
    featuredImage: {
      src: "/projekti/virus-featured.webp",
      alt: "Naslovnica portala Virus.hr: izbornik rubrika, traka s najnovijim vijestima i kartice recenzija i novosti.",
      width: 1600,
      height: 993,
    },
    evidenceLinks: [{ label: "virus.hr", href: "https://virus.hr/" }],
    images: [],
    publishedAt: "2026-10-19",
    contributionLabel: "Content & Research — istraživanje i pisanje",
    motif: "glitch",
    internalNote:
      "Tekst je Matijin, dostavljen 19. 10. 2026. GRANICE koje je sam postavio i koje se ne smiju prekoračiti: Matija NIJE developer portala, nije dizajner weba i nije autor svih objavljenih članaka. Zapis se odnosi isključivo na istraživanje, praćenje tema te pripremu i pisanje sadržaja. Broj članaka, čitanost i organski promet namjerno NISU objavljeni — mogu se dodati tek uz pouzdane podatke. Istaknuta slika je snimka naslovnice od 19. 10. 2026. (snimio Claude s virus.hr; zamijeniti ako Matija pošalje svoju).",
  },
];

/**
 * The only accessor used by pages. Keeps unapproved records out of production.
 *
 * In development the gate can be lifted with NEXT_PUBLIC_SHOW_DRAFT_PROJECTS=true
 * so the layout can be reviewed locally. The check below makes sure that flag
 * can never do anything in a production build.
 */
export function getPublishedProjects(): Project[] {
  const approved = projects.filter((p) => p.approvedForPublication);
  if (
    approved.length === 0 &&
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_SHOW_DRAFT_PROJECTS === "true"
  ) {
    return projects;
  }
  return approved;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}

/** Records still waiting on confirmation — for the launch checklist. */
export function getPendingProjects(): Project[] {
  return projects.filter((p) => !p.approvedForPublication);
}
