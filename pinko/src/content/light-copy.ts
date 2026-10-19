/**
 * The light world's copy, as delivered on 19 Oct 2026.
 *
 * Kept apart from the dark world's words on purpose: the two are different
 * creative concepts and share facts, not sentences. Business data still
 * lives in one place — projects, prices and contact details are imported,
 * never retyped here.
 *
 * House rules for this file, from the brief: no em dashes, no decorative
 * hyphens, no quotation marks and no italics in anything a visitor reads.
 * Short sentences, commas, colons and full stops instead. Clients are
 * addressed as Vi, Vas, Vam.
 */

export const lightHero = {
  kicker: "Development / Marketing / Business development",
  title: "Dobre ideje zaslužuju više od dobre prezentacije.",
  body: [
    "Bok, ja sam Matija Pinko. Razvijam webove, webshopove i aplikacije, bavim se digitalnim marketingom i pomažem tvrtkama posložiti poslovne procese.",
    "Zvuči kao dosta različitih stvari? I jesu. Ali u praksi su puno povezanije nego što se na prvi pogled čini.",
    "Odličan webshop ne vrijedi puno ako kupci ne mogu pronaći proizvode. Marketing nema previše smisla ako web ne pretvara posjetitelje u kupce. A kada prodaja napokon krene, netko se mora pobrinuti da narudžbe, zalihe i ostatak poslovanja funkcioniraju.",
    "Upravo tu moje iskustvo dolazi do izražaja.",
  ],
  primary: { href: "/projekti", label: "Pogledajte moje projekte" },
  secondary: { href: "/kontakt", label: "Razgovarajmo o Vašem projektu" },
};

export const lightWorkIntro = {
  kicker: "Selected work",
  title: "Volim pričati o poslu, no više od toga volim odraditi dobar posao.",
  body: [
    "Najbolji način da objasnim čime se bavim jest da Vam pokažem na čemu sam radio.",
    "Iza mene su projekti iz različitih industrija, od razvoja digitalnih proizvoda i međunarodne online prodaje do sadržajnih platformi koje su dosegnule milijunsku publiku.",
    "Neki su zahtijevali ozbiljan razvoj, neki razumijevanje tržišta i korisnika, a neki puno strpljenja s poslovnim procesima koje nitko godinama nije dirao.",
    "Svaki je imao svoje izazove. I svaki me naučio nešto što danas koristim u novim projektima.",
  ],
};

/** The four projects the homepage shows, with light copy of their own. */
export const lightWork = [
  {
    slug: "vehicle-freak",
    name: "Vehicle Freak",
    title: "Od odgovora na automobilska pitanja do milijunske publike.",
    kicker: "SEO / Content strategy / YouTube / Monetizacija",
    body: [
      "Kako izgraditi portal kojem se ljudi vraćaju zato što stvarno pronalaze odgovore?",
      "Vehicle Freak razvijao se kroz sustavno istraživanje tema, kvalitetan sadržaj i SEO strategiju usmjerenu na konkretne probleme vlasnika automobila.",
      "Radio sam na istraživanju, pisanju i razvoju sadržaja te pripremi scenarija za YouTube.",
      "U razdoblju najveće popularnosti portal je ostvarivao više od milijun jedinstvenih posjetitelja mjesečno i preko 60.000 dolara mjesečnog prihoda od oglašavanja.",
      "To su rezultati cijelog projekta, a moj doprinos bio je u sadržaju i strategiji koja je pomagala privlačiti relevantnu publiku.",
    ],
    figures: [
      { value: "1.000.000+", label: "jedinstvenih posjetitelja mjesečno" },
      { value: "60.000+ USD", label: "mjesečnog prihoda od oglašavanja" },
    ],
    status: null,
  },
  {
    slug: "100-smart-food",
    name: "100% Smart Food",
    title:
      "Webshop mora znati prodavati. Ali i sve ono što dolazi nakon prodaje.",
    kicker: "eCommerce / Development / Integracije",
    body: [
      "Razvoj online trgovine nije samo pitanje dizajna, brzine i dobre košarice.",
      "Iza svake narudžbe stoje proizvodi, zalihe, načini plaćanja, dostava i ljudi koji sve to moraju obraditi.",
      "Na projektu 100% Smart Food radim na povezivanju modernog korisničkog iskustva s postojećim sustavima i stvarnim potrebama online prodaje.",
      "Cilj nije dodavati tehnologiju samo zato što je nova, nego napraviti prodajni kanal koji kupcima pojednostavljuje kupnju, a poslovanju svakodnevni rad.",
    ],
    figures: [],
    status: null,
  },
  {
    slug: "bolero-temu",
    name: "Bolero Adria",
    title: "Prodaja na novom tržištu počinje puno prije prve narudžbe.",
    kicker: "Marketplace / eCommerce / Business development",
    body: [
      "Otvaranje novog prodajnog kanala zvuči jednostavno. Postavite proizvode, odredite cijene i čekate narudžbe.",
      "U stvarnosti treba posložiti katalog, marže, logistiku, zalihe, pravila platforme i još podosta detalja koje kupac nikada neće vidjeti.",
      "Na projektu Bolero Adria radim na razvoju prodajnih kanala i operativnih procesa potrebnih za međunarodnu marketplace prodaju.",
      "Jer otvoriti trgovinu nije isto što i izgraditi posao koji može dugoročno funkcionirati.",
    ],
    figures: [],
    status: null,
  },
  {
    slug: "bolero-erp",
    name: "Bolero ERP",
    title:
      "Kad poslovanje preraste postojeće sustave, treba dobar plan. Ne još jedna tablica.",
    kicker: "ERP / Poslovni procesi / Integracija sustava",
    body: [
      "Kako poslovanje raste, raste i broj procesa, podataka i ljudi koji ovise jedni o drugima.",
      "Ono što je nekoć funkcioniralo kroz nekoliko jednostavnih koraka s vremenom postane ozbiljan operativni izazov.",
      "Bolero ERP projekt usmjeren je na analizu poslovnih procesa, planiranje sustava i povezivanje informacija koje su potrebne za učinkovit svakodnevni rad.",
      "Moj rad obuhvaća arhitekturu rješenja, migracijsku strategiju i planiranje integracija.",
    ],
    figures: [],
    status: "Projekt je u razvoju.",
  },
];

export const lightWorkOutro = {
  title: "A ovo je samo dio priče.",
  body: "Radio sam i na razvoju digitalnih proizvoda, sadržajnim projektima, marketingu i poslovnim operacijama za različite tvrtke i industrije.",
  cta: { href: "/projekti", label: "Istražite sve projekte" },
};

export const lightApproach = {
  kicker: "How I think",
  title: "Nije svako rješenje dobro samo zato što tehnički radi.",
  body: [
    "Jedna od važnijih stvari koje sam naučio kroz godine jest da se digitalni projekti ne mogu promatrati odvojeno od poslovanja.",
    "Možete imati odličan web koji nitko ne posjećuje. Možete imati marketing koji dovodi puno ljudi, ali malo kupaca. Možete imati webshop koji prodaje, dok se iza kulisa narudžbe još uvijek ručno prepisuju iz jednog sustava u drugi.",
    "Sve to možda radi. Ali može li raditi bolje?",
    "Zato me prije početka projekta zanima puno više od toga kakav web želite ili koje funkcionalnosti trebate. Želim razumjeti kako poslujete, tko su Vaši kupci, gdje nastaju problemi i što zapravo želite postići.",
    "Tek onda ima smisla razgovarati o rješenju.",
  ],
  points: [
    {
      title: "Prvo razumjeti problem.",
      body: "Ne pretpostavljam da je novo rješenje uvijek bolje od postojećeg. Ponekad treba napraviti nešto potpuno novo. Ponekad je dovoljno kvalitetno unaprijediti ono što već imate. Važno je znati razliku.",
    },
    {
      title: "Povezati ono što mora funkcionirati zajedno.",
      body: "Web, marketing, prodaja, skladište i poslovni sustavi možda imaju različite zadatke, ali na kraju rade za isto poslovanje. Kada su dobro povezani, posao je jednostavniji i za korisnike i za ljude koji ga svakodnevno vode.",
    },
    {
      title: "Napraviti ono što je stvarno potrebno.",
      body: "Nisam ljubitelj kompliciranja radi dojma. Ako postoji jednostavnije, kvalitetnije i dugoročno održivije rješenje, radije ću predložiti njega. Čak i ako to znači manje posla za mene.",
    },
  ],
};

export const lightServices = {
  kicker: "What I do",
  title: "Od prvog klika do svega što se događa iza njega.",
  body: [
    "Moje usluge obuhvaćaju tri područja koja se u svakodnevnom poslovanju neprestano isprepliću.",
    "Možete me angažirati za konkretan zadatak, razvoj većeg projekta ili suradnju u kojoj treba povezati nekoliko različitih disciplina.",
    "Ne morate unaprijed znati kojoj kategoriji pripada Vaš problem. Za početak je dovoljno da mi kažete što Vas muči.",
  ],
  areas: [
    {
      slug: "development",
      name: "Development",
      title: "Digitalni proizvodi koji imaju smisla i izvan ekrana.",
      body: [
        "Razvijam web stranice, webshopove i aplikacije s naglaskom na korisničko iskustvo, kvalitetnu izvedbu i poslovne potrebe.",
        "Ne zanima me samo kako će nešto izgledati kada ga otvorite u pregledniku. Zanima me kako će se koristiti, koliko će biti jednostavno za održavanje i može li se razvijati zajedno s Vašim poslovanjem. Najvažnije od svega, gledam kako da zaradite čim više.",
      ],
      items: [
        "Poslovne web stranice",
        "Webshopovi i eCommerce rješenja",
        "Web aplikacije po mjeri",
        "API integracije i povezivanje sustava",
        "Automatizacija poslovnih procesa",
        "Hosting i tehničko održavanje",
      ],
      cta: "Istražite development usluge",
    },
    {
      slug: "marketing",
      name: "Marketing",
      title: "Dobar proizvod zaslužuje publiku. Pravu publiku.",
      body: [
        "Ne treba Vam samo više posjetitelja. Trebaju Vam ljudi kojima je ono što nudite stvarno zanimljivo i koji imaju razlog odabrati baš Vas.",
        "Radim na SEO strategiji, sadržaju, digitalnim kampanjama i prodajnim kanalima koji povezuju potrebe korisnika s poslovnim ciljevima.",
        "A zahvaljujući iskustvu u razvoju, ne gledam marketing odvojeno od weba, analitike i korisničkog iskustva. Jer promet je koristan tek kada znate što s njim.",
      ],
      items: [
        "SEO i strategija organskog rasta",
        "Content strategija i copywriting",
        "Digitalno oglašavanje i analitika",
        "Email marketing i automatizacije",
        "Amazon i Temu marketplace",
        "Razvoj digitalnih prodajnih kanala",
      ],
      cta: "Istražite marketinške usluge",
    },
    {
      slug: "business-development",
      name: "Business development",
      title: "Kad poslovanje raste, sustavi i procesi moraju ga moći pratiti.",
      body: [
        "Rast poslovanja je dobra vijest. Ali donosi i nove probleme. Više narudžbi, više podataka, više ljudi i sve više procesa koji su nekada bili dovoljno jednostavni da ih nitko nije posebno dokumentirao.",
        "Pomažem tvrtkama analizirati način rada, prepoznati nepotrebne korake i pronaći prilike za bolje povezivanje tehnologije i poslovanja.",
        "Bilo da je riječ o ERP sustavu, novom prodajnom kanalu ili organizaciji postojećih procesa, cilj je isti. Da posao funkcionira učinkovitije, uz manje improvizacije.",
      ],
      items: [
        "Analiza i optimizacija poslovnih procesa",
        "ERP i CRM savjetovanje",
        "Razvoj prodajnih kanala",
        "Digitalizacija i automatizacija",
        "Product management",
        "Poslovna i operativna strategija",
      ],
      cta: "Istražite poslovne usluge",
    },
  ],
};

export const lightAbout = {
  kicker: "The person behind Pinko",
  title: "Bok, ja sam Matija. I ne bavim se samo jednom stvari.",
  body: [
    "Znam, danas je popularno biti stručnjak za jednu vrlo specifičnu disciplinu. Moja karijera krenula je malo drugačijim putem.",
    "Radio sam u prodaji, vodio timove, razvijao digitalne proizvode, pisao sadržaj za međunarodnu publiku i sudjelovao u organizaciji poslovnih procesa.",
    "S vremenom sam shvatio da mi upravo ta kombinacija iskustva najviše koristi.",
    "Kad radim webshop, ne razmišljam samo o dizajnu i kodu. Razmišljam i o kupcima, marketingu, narudžbama i skladištu. Kad radim marketing, razumijem kako je proizvod napravljen i što se događa nakon što netko klikne na oglas. A kad analiziram poslovni proces, mogu prepoznati gdje tehnologija stvarno može pomoći, a gdje bi samo stvorila novi problem.",
    "Danas kroz Pinko radim upravo na takvim projektima. Volim dobar dizajn, kvalitetan kod i pametno posložene sustave. Ali najviše volim kad na kraju vidim da smo napravili nešto što ljudima stvarno koristi.",
  ],
  points: [
    {
      title: "Jedna osoba za sve.",
      body: "Kada dogovorite suradnju sa mnom, znate s kim razgovarate i tko vodi Vaš projekt. Za veće ili specijalizirane zadatke mogu uključiti druge stručnjake, ali komunikacija, koordinacija i odgovornost ostaju jasno definirane.",
    },
    {
      title: "Iskustvo izvan developerskog svijeta.",
      body: "Razumijem poslovne ciljeve, prodaju, marketing i operativne izazove jer sam se njima i sam bavio. To mi pomaže donositi kvalitetnije odluke tijekom razvoja i savjetovanja.",
    },
    {
      title: "Bez nepotrebnog kompliciranja.",
      body: "Volim dobro razumjeti problem i jasno objasniti rješenje. Ne trebate naučiti novi tehnički rječnik da bismo mogli kvalitetno surađivati.",
    },
  ],
  cta: { href: "/o-meni", label: "Saznajte više o meni" },
};

export const lightProcess = {
  kicker: "The process",
  title: "Dobar projekt ne počinje pisanjem koda.",
  body: [
    "Počinje razgovorom.",
    "Ne morate imati gotovu specifikaciju, odabranu tehnologiju ni detaljan plan izvedbe. To su stvari koje možemo definirati zajedno.",
    "Ono što je važno jest da razumijemo što želite postići i kako ćemo znati da smo napravili dobar posao.",
  ],
  steps: [
    {
      index: "01",
      title: "Upoznajmo se.",
      body: "Ispričajte mi što radite, što želite promijeniti i s kojim se problemima susrećete. Pitat ću Vas i stvari koje možda na prvi pogled nemaju veze s projektom. Obično postoji dobar razlog za to.",
    },
    {
      index: "02",
      title: "Definirajmo rješenje.",
      body: "Na temelju razgovora pripremamo pristup, opseg projekta, prioritete i okvir izvedbe. Jasno definiramo što je uključeno, što nije i koliko će projekt koštati. Volim da su očekivanja poznata prije početka rada.",
    },
    {
      index: "03",
      title: "Krenimo raditi.",
      body: "Projekt realiziramo kroz dogovorene faze. Tijekom rada provjeravamo smjer, donosimo potrebne odluke i rješavamo probleme dok su još mali. Nema smisla čekati kraj projekta da bismo otkrili da smo zamišljali različite stvari.",
    },
    {
      index: "04",
      title: "Lansiranje nije kraj suradnje.",
      body: "Kad je rješenje spremno, slijede testiranje, isporuka i puštanje u rad. Ovisno o projektu, možemo dogovoriti održavanje, podršku i daljnji razvoj. Jer stvari se mijenjaju. Poslovanje raste. A tehnologija, koliko god bila dobra, ne održava se baš uvijek sama.",
    },
  ],
  cta: { href: "/kako-radim", label: "Pogledajte kako surađujem" },
};

export const lightHosting = {
  kicker: "Beyond launch",
  title: "Dobar web treba pouzdanu infrastrukturu. I nekoga tko zna što radi.",
  body: [
    "Lansiranje weba ili aplikacije je važan trenutak. Ali za poslovanje je puno važnije ono što slijedi nakon njega.",
    "Stranica mora ostati dostupna, aplikacija stabilna, podaci zaštićeni, a sustav spreman za nadogradnje i promjene koje dolaze s vremenom.",
    "Uz razvoj mogu preuzeti i postavljanje hosting okruženja te dogovoreno tehničko održavanje. Radim s infrastrukturom pružatelja Hetzner i MyDataKnox, a konfiguraciju prilagođavam tehnologiji, prometu i potrebama projekta.",
    "Bez nepotrebno skupih rješenja ako jednostavnija mogu kvalitetno odraditi posao.",
  ],
  points: [
    {
      title: "Infrastruktura prilagođena projektu.",
      body: "Od Next.js aplikacija i baza podataka do WordPress i WooCommerce sustava. Okruženje biramo prema stvarnim zahtjevima, a ne prema najskupljem dostupnom paketu.",
    },
    {
      title: "Sigurnosne kopije i održavanje.",
      body: "Dogovaramo raspored sigurnosnih kopija, način pohrane, ažuriranja i postupke oporavka. Važno je imati plan i znati što se događa ako nešto pođe po krivu.",
    },
    {
      title: "Jasni troškovi i odgovornosti.",
      body: "Hosting, održavanje i dodatni razvoj imaju jasno definiran opseg. Znate što plaćate, što je uključeno i kome se možete obratiti kada trebate pomoć.",
    },
  ],
  cta: { href: "/usluge/development#hosting", label: "Istražite hosting i održavanje" },
};

export const lightFaq = {
  kicker: "Good to know",
  title: "Prije nego što krenemo, nekoliko korisnih odgovora.",
  items: [
    {
      question: "Radite li isključivo kompletne projekte?",
      answer:
        "Ne. Možete me angažirati za razvoj određenog dijela sustava, SEO strategiju, sadržaj, integraciju ili savjetovanje. Ako Vam ne treba potpuno novo rješenje, neću Vas uvjeravati da ga morate napraviti.",
    },
    {
      question: "Moram li unaprijed znati koju tehnologiju želim?",
      answer:
        "Ne morate. Dovoljno je da razumijemo problem i cilj projekta. Odabir tehnologije dio je planiranja, a ne uvjet za prvi razgovor.",
    },
    {
      question: "Koliko traje izrada weba ili aplikacije?",
      answer:
        "Ovisi o opsegu, funkcionalnostima, potrebnim integracijama i dostupnosti materijala. Nakon što definiramo projekt, dobit ćete realan plan izvedbe s dogovorenim fazama i rokovima.",
    },
    {
      question: "Mogu li zadržati postojeći WordPress ili WooCommerce?",
      answer:
        "Naravno, ako postojeći sustav može kvalitetno podržati ono što želite postići. Nekada je pametnije unaprijediti postojeće rješenje nego sve razvijati ponovno.",
    },
    {
      question: "Što ako projekt zahtijeva dodatne stručnjake?",
      answer:
        "Za specijalizirane zadatke mogu surađivati s drugim stručnjacima. Unaprijed dogovaramo tko je za što odgovoran i kako je organizirana komunikacija.",
    },
    {
      question: "Nudite li plaćanje u ratama?",
      answer:
        "Za veće projekte moguće je dogovoriti fazno plaćanje i raspored rata. Uvjeti ovise o opsegu projekta i definiraju se u ponudi.",
    },
    {
      question: "Što se događa nakon završetka projekta?",
      answer:
        "Dogovaramo predaju, potrebnu dokumentaciju i eventualnu daljnju podršku. Ako Vam treba hosting, održavanje ili kontinuirani razvoj, možemo i to uključiti u suradnju.",
    },
  ],
};

export const lightContact = {
  kicker: "Let us talk",
  title: "Imate projekt o kojem vrijedi razgovarati?",
  body: [
    "Možda trebate novi web ili webshop. Možda želite razviti aplikaciju, unaprijediti online prodaju ili konačno povezati sustave koji već godinama rade svaki za sebe.",
    "A možda jednostavno znate da nešto u poslovanju može funkcionirati bolje, ali još niste sigurni odakle krenuti.",
    "Slobodno mi se javite. Ispričajte mi čime se bavite, što želite postići i gdje trenutno zapinje.",
    "Pogledat ćemo što ima smisla napraviti, koji su prioriteti i postoji li dobar temelj za suradnju. Bez velikih obećanja prije nego što uopće razumijemo problem.",
  ],
  primary: { href: "/kontakt", label: "Razgovarajmo o Vašem projektu" },
  secondary: { href: "/kontakt", label: "Pošaljite upit" },
};

export const lightFooter = {
  name: "Matija Pinko",
  tagline:
    "Digitalni proizvodi, strategije rasta i poslovna rješenja iza kojih stoji iskustvo iz stvarnog poslovanja.",
  links: [
    { href: "/projekti", label: "Projekti" },
    { href: "/usluge", label: "Usluge" },
    { href: "/o-meni", label: "O meni" },
    { href: "/kako-radim", label: "Kako radim" },
    { href: "/cjenik", label: "Cjenik" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  prompt: "Imate dobro pitanje ili zanimljiv projekt?",
  promptBody: "Javite se. Rado ću čuti o čemu se radi.",
  cta: { href: "/kontakt", label: "Kontaktirajte me" },
};
