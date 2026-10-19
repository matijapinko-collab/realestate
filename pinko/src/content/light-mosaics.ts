/**
 * Project mosaics for the light world.
 *
 * Every plate is a real capture of a real site, taken for this purpose at a
 * known viewport. Nothing here is a stock photo, a mockup of a page that
 * does not exist, or a picture of a feature that has not been built.
 *
 * `span` places the plate on a 12 column grid. The compositions are
 * deliberately uneven, and each project gets its own: a webshop reads as
 * desktop next to phone, an editorial portal reads as one wide plate, and a
 * project with no public interface gets a single cover rather than a grid
 * of invented screens.
 */

export type MosaicPlate = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Column span out of 12, from the `md` breakpoint up. */
  span: number;
  /** Aspect ratio for the frame. The image fills it with object-cover. */
  ratio: string;
};

export type LightMosaic = {
  slug: string;
  name: string;
  kicker: string;
  title: string;
  body: string[];
  /** Figures appear only where the record already publishes them. */
  figures?: { value: string; label: string; note: string }[];
  status?: string;
  plates: MosaicPlate[];
};

export const lightMosaics: LightMosaic[] = [
  {
    slug: "100-smart-food",
    name: "100% Smart Food",
    kicker: "eCommerce / Development / Digital growth",
    title:
      "Digitalna trgovina koja povezuje korisničko iskustvo i poslovne procese.",
    body: [
      "Za 100% Smart Food radim na razvoju eCommerce iskustva i povezivanju tehnologije s potrebama svakodnevne online prodaje.",
      "Projekt obuhvaća razumijevanje kataloga, korisničkog puta, poslovnih sustava i procesa koji stoje iza svake narudžbe.",
    ],
    plates: [
      {
        src: "/projekti/smart-food/desktop-home.webp",
        alt: "Naslovnica webshopa 100% Smart Food na desktopu: istaknuta akcijska ponuda i redak proizvoda.",
        width: 1600,
        height: 1000,
        span: 8,
        ratio: "16 / 10",
      },
      {
        src: "/projekti/smart-food/mobile-product.webp",
        alt: "Stranica proizvoda na mobitelu: galerija pakiranja, oznake namjene, ocjena i prikaz cijene s najnižom cijenom u 30 dana.",
        width: 720,
        height: 1559,
        span: 4,
        ratio: "3 / 4",
      },
      {
        src: "/projekti/smart-food/desktop-products.webp",
        alt: "Redak proizvoda na naslovnici: nazivi, ocjene i cijene s prikazanom redovnom cijenom.",
        width: 1600,
        height: 1000,
        span: 5,
        ratio: "4 / 3",
      },
      {
        src: "/projekti/smart-food/desktop-shop.webp",
        alt: "Katalog trgovine na desktopu: popis proizvoda s filterima.",
        width: 1600,
        height: 1000,
        span: 4,
        ratio: "4 / 3",
      },
      {
        src: "/projekti/smart-food/mobile-shop.webp",
        alt: "Katalog trgovine na mobitelu: proizvodi u dva stupca.",
        width: 720,
        height: 1559,
        span: 3,
        ratio: "3 / 4",
      },
      {
        src: "/projekti/smart-food/desktop-product.webp",
        alt: "Stranica proizvoda na desktopu: galerija, opis, oznake i cijena.",
        width: 1600,
        height: 1000,
        span: 7,
        ratio: "16 / 10",
      },
      {
        src: "/projekti/smart-food/mobile-home.webp",
        alt: "Naslovnica webshopa na mobitelu: navigacija, pretraga i istaknuta jesenska ponuda dostave.",
        width: 720,
        height: 1559,
        span: 5,
        ratio: "4 / 3",
      },
    ],
  },
  {
    slug: "vehicle-freak",
    name: "Vehicle Freak",
    kicker: "SEO / Content strategy / YouTube",
    title: "Od odgovora na automobilska pitanja do milijunske publike.",
    body: [
      "Portal se razvijao kroz sustavno istraživanje tema, kvalitetan sadržaj i SEO strategiju usmjerenu na konkretne probleme vlasnika automobila.",
      "Radio sam na istraživanju, pisanju i razvoju sadržaja te pripremi scenarija za YouTube.",
    ],
    figures: [
      {
        value: "1.000.000+",
        label: "jedinstvenih posjetitelja mjesečno",
        note: "Povijesni vrhunac cijelog portala, rezultat tima.",
      },
      {
        value: "60.000+ USD",
        label: "mjesečnog prihoda od oglašavanja",
        note: "Prihod projekta u najuspješnijem razdoblju, ne osobna zarada.",
      },
    ],
    plates: [
      {
        src: "/projekti/vehicle-freak-featured.webp",
        alt: "Sekcija Vehicle Freak Expertise: ilustrirani portreti uredničkog tima s imenima i ulogama.",
        width: 1237,
        height: 389,
        span: 12,
        ratio: "21 / 9",
      },
      {
        src: "/projekti/virus-featured.webp",
        alt: "Naslovnica sadržajnog portala s karticama članaka i rubrikama.",
        width: 1600,
        height: 993,
        span: 7,
        ratio: "16 / 10",
      },
      {
        src: "/projekti/youtube-scenariji-automobili-cover.webp",
        alt: "Naslovna grafika projekta scenarija za automobilski YouTube kanal.",
        width: 1600,
        height: 1000,
        span: 5,
        ratio: "4 / 3",
      },
    ],
  },
  {
    slug: "bolero-temu",
    name: "Bolero Adria",
    kicker: "Marketplace / eCommerce / Business development",
    title: "Prodaja na novom tržištu počinje puno prije prve narudžbe.",
    body: [
      "Otvaranje novog prodajnog kanala traži katalog, marže, logistiku, zalihe i pravila platforme.",
      "Radim na razvoju prodajnih kanala i operativnih procesa potrebnih za međunarodnu marketplace prodaju.",
    ],
    plates: [
      {
        src: "/projekti/bolero-temu-featured.webp",
        alt: "Vizual projekta Bolero Adria na Temu marketplaceu.",
        width: 1600,
        height: 900,
        span: 8,
        ratio: "16 / 9",
      },
      {
        src: "/projekti/bolero-erp-cover.webp",
        alt: "Naslovna grafika projekta ERP i automatizacije.",
        width: 1600,
        height: 1000,
        span: 4,
        ratio: "4 / 3",
      },
    ],
  },
  {
    slug: "bolero-erp",
    name: "Bolero ERP",
    kicker: "ERP / Poslovni procesi / Integracija sustava",
    title:
      "Kad poslovanje preraste postojeće sustave, treba dobar plan. Ne još jedna tablica.",
    body: [
      "Projekt je usmjeren na analizu poslovnih procesa, planiranje sustava i povezivanje informacija potrebnih za svakodnevni rad.",
      "Moj rad obuhvaća arhitekturu rješenja, migracijsku strategiju i planiranje integracija.",
    ],
    status: "Projekt je u razvoju. Prikazani su analiza i plan, ne gotovo sučelje.",
    plates: [
      {
        src: "/projekti/bolero-erp-cover.webp",
        alt: "Naslovna grafika projekta Bolero ERP i automatizacije.",
        width: 1600,
        height: 1000,
        span: 12,
        ratio: "21 / 9",
      },
    ],
  },
];
