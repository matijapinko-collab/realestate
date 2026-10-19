/** Detailed service lists per discipline (brief section 4). */

export type ServiceItem = {
  title: string;
  body: string;
};

export const developmentServices: ServiceItem[] = [
  {
    title: "Next.js poslovni webovi",
    body: "Vlastiti vizualni sustav, struktura sadržaja, landing stranice, jednostavno uređivanje i kontaktni tokovi.",
  },
  {
    title: "Webshopovi",
    body: "Prilagođeni katalog, pretraga, filteri, varijacije, košarica, checkout te odabrane dostavne i platne integracije.",
  },
  {
    title: "Web aplikacije",
    body: "Korisnički računi, portali, interni alati, dashboardi, rezervacije, konfiguratori i funkcije prilagođene vašem procesu.",
  },
  {
    title: "API integracije i automatizacije",
    body: "ERP, CRM, katalog, narudžbe, zalihe, kurirske službe i servisi trećih strana — prema onome što njihov pristup stvarno dopušta.",
  },
  {
    title: "Arhitektura sustava",
    body: "Izbor komponenti, model podataka, izvori istine, ovlasti, troškovi, rizici, faze razvoja i plan prelaska.",
  },
  {
    title: "Modernizacija",
    body: "Postupna migracija na Next.js, uključujući headless WooCommerce kada zadržavanje backenda ima poslovnog smisla.",
  },
  {
    title: "Hosting i infrastruktura",
    body: "Deployment, upravljano okruženje, migracije, održavanje, monitoring i sigurnosne kopije prema ugovorenom paketu.",
  },
];

export const developmentBoundaries = [
  "„Aplikacije” ovdje znače web aplikacije i po potrebi PWA. Native iOS/Android razvoj i objava u trgovinama nisu uključeni u standardne pakete i ne obećavam ih bez zasebne procjene.",
  "WordPress radim kao dopunsku uslugu za održavanje, migraciju i selektivne projekte. Ne gradim identitet weba oko instalacije tema i plugina.",
  "Next.js nije automatski bolji u svakom slučaju. Izbor mora slijediti vaše potrebe — ako postojeći sustav dobro služi, reći ću vam to.",
];

export const marketingServices: ServiceItem[] = [
  {
    title: "SEO strategija i tehnička suradnja s razvojem",
    body: "Struktura stranica, namjera pretrage, prioriteti i on-page optimizacija — dogovoreni zajedno s razvojem, ne naknadno zalijepljeni.",
  },
  {
    title: "Sadržaj i copywriting",
    body: "Web, landing stranice, kategorije, proizvodi, članci, prodajni emailovi i sadržaj koji objašnjava ponudu jezikom kupca.",
  },
  {
    title: "Email marketing",
    body: "Početno postavljanje, segmentacija, welcome tokovi, napuštena košarica gdje postoje tehnički i pravni uvjeti, post-purchase tokovi i newsletteri.",
  },
  {
    title: "Amazon",
    body: "Pregled spremnosti, katalog i listing optimizacija, A+ sadržaj u dogovorenom opsegu, plan lansiranja i organizacija prodajne operative.",
  },
  {
    title: "Temu",
    body: "Procjena kanala, onboarding podrška, katalog te procesi naručivanja i isporuke prema mogućnostima platforme.",
  },
];

export const marketingBoundaries = [
  "Google Ads, Meta Ads i vođenje društvenih mreža u ovoj verziji ne nudim kao aktivne usluge. PPC upravljanje nije dio Amazon paketa.",
  "Ne obećavam platformsku dozvolu, prihvaćanje listinga, recenzije ni prodaju.",
  "Pravna i regulatorna usklađenost te službene registracije odvojene su od operativne pomoći.",
];

export const bizDevServices: ServiceItem[] = [
  {
    title: "Digitalni poslovni audit",
    body: "Prodajni put, alati, procesi i najveće prepreke — s popisom prioriteta umjesto općenitih preporuka.",
  },
  {
    title: "Plan razvoja za 90 dana",
    body: "Prioriteti, vlasnici zadataka, troškovni okvir, ovisnosti i mjerila uspjeha.",
  },
  {
    title: "E-commerce poslovni model",
    body: "Marže, trošak kanala, dostava, povrati, prag rentabilnosti i scenariji prema vašim podacima.",
  },
  {
    title: "Razvoj novih kanala i tržišta",
    body: "Izvedivost, pilot, resursi i plan operacije prije šireg ulaganja.",
  },
  {
    title: "Specifikacija ERP/CRM i integracija",
    body: "Poslovni zahtjevi, mapiranje procesa, model razmjene podataka i koordinacija s dobavljačem.",
  },
  {
    title: "Vanjski voditelj digitalnog razvoja",
    body: "Backlog, koordinacija izvođača, kontrola opsega i redovita prioritizacija.",
  },
];

export const bizDevBoundaries = [
  "Ne obećavam pronalazak investitora, pravno ili porezno savjetovanje, računovodstvo ni zajamčene prodajne kontakte.",
  "Prodajem konkretan plan i odgovornost za dogovorene aktivnosti — ne obećanje određenog prometa ili povrata ulaganja.",
];

/* ------------------------------------------------------------------ *
 * The three services (copy of 19 Oct 2026)
 *
 * Matija's own words, Kajkavian spelling included. The four-service split
 * from earlier the same day lasted about an hour: this copy is written as
 * Development, Marketing and Business Development, so the slugs go back to
 * what they always were and the four interim addresses redirect here.
 *
 * `blocks` carry the sales copy. `items` are the factual scope lists above,
 * unchanged — the jokes sell, the list says what is actually included, and
 * the boundaries say what is not.
 * ------------------------------------------------------------------ */

export type ServiceBlock = {
  title: string;
  body: string[];
};

export type Service = {
  slug: string;
  index: string;
  /** Short name, used in navigation and cards. */
  name: string;
  /** The promise, in Matija's voice. */
  headline: string;
  /** Opening paragraphs under the headline. */
  intro: string[];
  /** The sales copy, one block per thing he does. */
  blocks: ServiceBlock[];
  cta: string;
  /** Detailed scope, from the lists above. */
  items: ServiceItem[];
  boundaries: string[];
};

export const services: Service[] = [
  {
    slug: "development",
    index: "01",
    name: "Development",
    headline:
      "Vi zamislite. Ja napravim. Onda se zajedno pravimo da je bilo jednostavno.",
    intro: [
      "Imate genijalnu ideju za web? Super! Postoji samo jedan mali problem. Sad to netko treba i napraviti.",
      "A ako ste već imali developera koji Vam je šest mjeseci objašnjavao da je projekt „gotovo gotov”, onda ste definitivno na pravom mjestu.",
      "Ja ne pričam samo o tehnologiji. Ja je koristim da Vam riješim problem.",
    ],
    blocks: [
      {
        title: "Web stranice",
        body: [
          "Lijepe, brze i pametne. Baš kao ja, samo bez bolova u leđima.",
          "Ne radim webove da ih možete pokazivati rodbini na nedjeljnom ručku. Dobro, možete i to.",
          "Radim ih da Vam donose upite, kupce i posao.",
        ],
      },
      {
        title: "Webshopovi",
        body: [
          "Znate onaj divan osjećaj kad kupac naruči proizvod, plati ga i dobije ono što je naručio? E, to!",
          "Bez narudžbi koje misteriozno nestaju, zaliha koje postoje samo u teoriji i košarice koja se raspadne čim netko klikne „Plati”.",
        ],
      },
      {
        title: "Aplikacije po mjeri",
        body: [
          "Imate ideju za aplikaciju koju nitko drugi ne razumije? Savršeno. Ni moja mama još uvijek ne razumije čime se točno bavim.",
          "Objasnite mi što želite postići, a ja ću smisliti kako to napraviti.",
        ],
      },
      {
        title: "Integracije i automatizacije",
        body: [
          "Imate pet programa koji međusobno ne razgovaraju? Kaj su se posvađali? Spojit ćemo ih.",
          "A ako netko kod Vas osam sati dnevno ručno prepisuje podatke, možda bi bilo lijepo da tom čovjeku omogućimo da konačno radi nešto korisnije.",
        ],
      },
      {
        title: "Hosting i održavanje",
        body: [
          "Napravili smo web. Sve radi. Svi sretni. I kaj sad? Pustimo ga da se sam snalazi u životu?",
          "Ne baš. Brinem se da stvari nastave raditi i nakon što prestanemo slaviti lansiranje.",
        ],
      },
    ],
    cta: "Matija, napravi mi nekaj pametno!",
    items: developmentServices,
    boundaries: developmentBoundaries,
  },
  {
    slug: "marketing",
    index: "02",
    name: "Marketing",
    headline:
      "Imate najbolji proizvod na svijetu? To kaže i svaki drugi direktor.",
    intro: [
      "Nemojte se ljutiti. Siguran sam da je Vaš proizvod fantastičan. Samo postoji jedna mala nezgodacija.",
      "Nitko ne zna da postoji. A oni koji znaju, možda kupuju kod konkurencije jer je prva iskočila na Googleu.",
      "Krasno, jelda? Ajmo to promijeniti.",
    ],
    blocks: [
      {
        title: "SEO i content",
        body: [
          "Google Vas ne voli? Nema veze. Ni mene nisu svi voljeli u školi.",
          "Ali to ne znači da se ne možemo potruditi da Vas ljudi pronađu.",
          "Istražujem što kupci traže, pišem sadržaj koji ima smisla i radim na tome da Vaš web ne bude digitalna verzija napuštenog kioska.",
        ],
      },
      {
        title: "Copywriting",
        body: [
          "„Mi smo vodeća tvrtka s dugogodišnjim iskustvom i individualnim pristupom svakom klijentu.” Ajme meni.",
          "Ako Vam na webu piše nekaj slično, moramo razgovarati.",
          "Ljudi ne kupuju zato što ste „dinamičan tim stručnjaka”. Kupuju jer razumiju što nudite i zašto im to treba. A ako ih pritom uspijemo nasmijati, još bolje.",
        ],
      },
      {
        title: "Email marketing",
        body: [
          "Imate bazu kupaca kojima se niste javili od prošlog Božića? A sad biste im htjeli prodati nešto?",
          "Pa dobro, mogli bismo se prvo barem pristojno javiti.",
          "Radim email kampanje i automatizacije koje održavaju odnos s kupcima, a ne testiraju koliko brzo mogu pronaći gumb „Odjavi se”.",
        ],
      },
      {
        title: "Amazon i Temu",
        body: [
          "Oćete prodavati u Njemačkoj? Francuskoj? Po cijeloj Europi? Može!",
          "Samo nemojte misliti da je dovoljno prevesti naziv proizvoda na njemački i čekati milijune. Marketplace ima svoja pravila, naknade, logistiku i oglašavanje.",
          "A Amazon posebno voli podsjetiti čovjeka da u životu ništa nije jednostavno. Znam. Družimo se već neko vrijeme.",
        ],
      },
      {
        title: "Analitika i optimizacija",
        body: [
          "„Matija, imali smo 40.000 klikova!” Super! Koliko ste zaradili? „Pa...” E, vidite.",
          "Zato ne gledam samo koliko ljudi dolazi, nego što rade kad dođu.",
          "Jer od klikova se, nažalost, još uvijek ne mogu platiti režije.",
        ],
      },
    ],
    cta: "Ajmo nekaj i zaraditi!",
    items: marketingServices,
    boundaries: marketingBoundaries,
  },
  {
    slug: "business-development",
    index: "03",
    name: "Business Development",
    headline: "Firma Vam raste? A živci se smanjuju?",
    intro: [
      "Čestitam! Izgleda da ste uspješni.",
      "Samo još moramo riješiti činjenicu da nitko više ne zna tko kaj radi, gdje su podaci i zašto za običnu narudžbu trebate zvati četiri čovjeka.",
      "A možda ste već kupili neki skupi softver koji je trebao sve riješiti. I sad imate isti problem. Samo u ljepšem sučelju.",
    ],
    blocks: [
      {
        title: "Poslovni audit",
        body: [
          "Dođem, pogledam kako radite i počnem postavljati pitanja. Puno pitanja.",
          "Neka će Vam se svidjeti. Neka baš i neće. Pogotovo ono: „A zakaj to uopće radite tak?”",
          "Ali obećajem da ne pitam samo zato da Vas živciram. Dobro, možda malo.",
        ],
      },
      {
        title: "ERP i CRM",
        body: [
          "Znate kaj je najskuplji poslovni sustav? Onaj koji ste platili, a nitko ga ne koristi.",
          "Pomažem Vam odabrati, posložiti i povezati sustave s načinom na koji Vaša firma stvarno radi.",
          "Ne onako kako je neki konzultant zamislio nakon dva sastanka i jednog cappuccina.",
        ],
      },
      {
        title: "Automatizacija poslovanja",
        body: [
          "Ako svaki dan ponavljate isti dosadan zadatak, imam dvije vijesti.",
          "Loša: vjerojatno ste na njega već potrošili jako puno vremena. Dobra: možda ga više nećete morati raditi.",
          "A sad zamislite da Vam računalo konačno radi za Vas. Nevjerojatna tehnologija, taj kompjuter.",
        ],
      },
      {
        title: "Razvoj novih prodajnih kanala",
        body: [
          "Želite proširiti poslovanje? Odlično!",
          "Ali prije nego što krenemo osvajati Europu, možda bi bilo dobro provjeriti hoćete li na svakoj narudžbi zaraditi ili izgubiti tri eura.",
          "Znam da zvuči kao detalj. Ali takvi detalji znaju biti prilično neugodni kad ih pomnožite s deset tisuća.",
        ],
      },
      {
        title: "Strategija i planiranje",
        body: [
          "Neću Vam napisati strategiju od 120 stranica koju ćemo svečano spremiti u Google Drive i više nikad otvoriti.",
          "Dogovorit ćemo što radimo, zašto, kojim redom i kako ćemo znati da je uspjelo.",
          "Znam. Skoro pa revolucionarno.",
        ],
      },
    ],
    cta: "Matija, spašavaj firmu!",
    items: bizDevServices,
    boundaries: bizDevBoundaries,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
