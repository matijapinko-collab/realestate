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
