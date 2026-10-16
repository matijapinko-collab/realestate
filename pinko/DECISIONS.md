# Odluke i pretpostavke

Zapis odluka donesenih pri izradi, da sljedeći developer (ili ja za pola
godine) ne mora pogađati zašto je nešto ovako.

## Smještaj projekta

Repozitorij je sadržavao dovršen **web za nekretnine** (bilingualan hr/en,
Prisma + Neon, Cloudinary, NextAuth admin). Brief traži **drugi posao** —
studio Pinko, hrvatski na korijenu domene, sadržaj u tipiziranim datotekama i
izrijekom bez baze za prezentacijski web.

Oba weba traže `/`. Po dogovoru s korisnikom Pinko je izrađen kao **samostalan
projekt u `pinko/`**: web za nekretnine ostaje netaknut i radi dalje, a Pinko
ima vlastiti root, vlastite ovisnosti i vlastiti deploy na vlastitoj domeni.

Posljedica: Turbopack bi root projekta tražio prema najbližem lockfileu i
završio u roditeljskom repozitoriju (i povukao njegov `src/proxy.ts`), pa je
`turbopack.root` eksplicitno fiksiran u `next.config.ts`.

## Tehnološke odluke

- **Next.js 16.2.9, App Router, TypeScript.** Verzije zaključane, lockfile commitan.
- **Server Components kao zadano.** Client Components samo tamo gdje postoji
  stvarna interakcija: mobilni meni, hero izbornik problema, procjenitelj i
  kontaktna forma.
- **Tailwind v4** s dizajn tokenima u `@theme` (`globals.css`). Nema gotovog
  UI templatea — sve sekcije su autorske.
- **Bez baze.** Sadržaj je u tipiziranim TS datotekama. Nije uveden ni CMS ni
  admin; brief ih ostavlja kao kasniju opciju, a nedovršen admin bio bi gori od
  nikakvog.
- **Sve stranice statički prerenderirane** (17 ruta). Ništa ne traži dinamičko
  renderiranje.
- **Manrope posluženi lokalno.** Dvije varijabilne woff2 datoteke (latin i
  latin-ext, ~40 kB ukupno) leže u repozitoriju i poslužuju se s našeg origina.
  Odabran `localFont` umjesto `next/font/google` da build ne ovisi o mreži i da
  posjet stranici ne dodiruje vanjski servis. `latin-ext` nosi hrvatske
  dijakritike (č ć đ š ž).
- **Resend preko `fetch`**, bez SDK ovisnosti.
- **Testovi:** `node --test` + `tsx`, bez dodatnog test frameworka.

## Dizajnerske odluke

Slijedi smjer iz briefa (9.2): `#FAFAF7` papir, `#171A20` tekst, `#535963`
sekundarni, `#2457F5` akcent, velika tipografija, mnogo bjeline, vrlo malo
sjena.

Odstupanje: za rubove **interaktivnih** kontrola uveden je zaseban token
`--color-control` (`#8A8C7E`). Predloženi `--color-rule` (`#DCDDD7`) ima kontrast
1,31:1 prema papiru, što ne zadovoljava WCAG 1.4.11 (3:1 za granice kontrola).
Svijetli `--color-rule` ostaje za dekorativne crte i rubove kartica, gdje se to
pravilo ne primjenjuje, pa prozračan dojam ostaje.

Akcent `#2457F5` i njegova tamnija varijanta `#1B45C8` koriste se za CTA,
odabrana stanja i male grafičke intervencije. Naslovi su crni.

Hero desna strana je **tipografska kompozicija**, ne fotografija: portret nije
dostavljen, a stock osoba ili AI portret bili bi lažno predstavljanje.

Animacije: 160–280 ms, jedan diskretan ulaz (`.rise`) i prijelazi na sučelju.
Nema scroll hijackinga, custom kursora, loadera ni marquee traka.
`prefers-reduced-motion` uklanja gibanje, a sav važan sadržaj je u HTML-u i
vidljiv bez JS-a.

## Sadržajne odluke

- **Ništa nepotvrđeno ne ide u produkciju.** Kontakt podaci, OIB, adresa i rok
  odgovora su `null` u configu i UI ih preskače. Svi projekti su
  `approvedForPublication: false`, pa `/projekti` pošteno kaže da priče čekaju
  potvrdu umjesto da prikaže prazne kartice.
- **Profesionalna biografija je odvojena od klijenata obrta.** HT OneApp,
  OlyBet, Morgancode i Poslovna Vizija stoje na `/o-meni` kao uloge u tuđim
  organizacijama, s izričitom napomenom da nisu klijenti Pinka.
- **Jedan izvor cijena.** `src/config/pricing.ts` hrani cjenik, kartice paketa
  i procjenitelj. Interna tablica popusta iz briefa (8.2) **nije** u aplikaciji.
- **Procjenitelj je deterministički.** Množitelji opsega i tri jasno određena
  dodatka; dodatak bez definirane cijene prikazuje „prema opsegu” i **ne** ulazi
  u zbroj. Cijena projekta i mjesečni trošak uvijek su odvojeni.
- **FAQ bez FAQPage structured data.** Brief traži korisne odgovore bez
  obećanja posebnog izgleda u Google rezultatima.
- **JSON-LD samo za stvarno:** Person, Service i breadcrumbovi. Nema
  `aggregateRating`, adrese, broja zaposlenih ni nagrada.

## Pretpostavke koje treba potvrditi

1. Hosting tekst (Hetzner i MyDataKnox) preuzet je iz briefa i opisuje namjeru,
   ne provjereno aktualno stanje.
2. Satnice, cijene paketa i uvjeti su prijedlog iz briefa. Objavljeni su kao
   stvarna spremnost na prodaju; ako to nije točno, mijenja se `pricing.ts`.
3. PDV je 25 % (`site.vatRate`). Koristi se samo za informativni prikaz; svi
   objavljeni iznosi su osnovice bez PDV-a.
4. Wordmark `pinko.` je **prijedlog**, ne odobren logo.
5. Akcentna boja je prijedlog, ne potvrđena boja brenda.

## Tamni tehnički izgled umjesto svijetlog (16. 10. 2026.)

**Odluka:** web prelazi s dosadašnje svijetle, prozračne sheme na tamnu, s
neonski zelenim naglaskom i monospace naslovima. Povod je referenca koju je
Matija poslao (`radnaabazar.com`).

**Što je ostalo isto:** sav sadržaj. Nijedna rečenica nije promijenjena zbog
izgleda. Promijenjeni su samo tokeni, tipografska skala i nekoliko komponenti
koje su pretpostavljale svijetlu podlogu.

**Kontrast je izmjeren, ne procijenjen:** tekst na podlozi 16,51:1, prigušeni
tekst 7,84:1, naglasak 11,49:1, tekst na punom zelenom gumbu 11,19:1, rubovi
kontrola 3,36:1 (WCAG 1.4.11). `--color-rule` je i dalje isključivo ukrasan.

**Tipografija:** naslovi su monospace. Monospace je oko petine širi od Manropea
pri istoj veličini, pa je skala spuštena — inače hrvatski naslov na mobitelu
zauzme pet redova. Tijelo teksta ostaje Manrope jer se duži odlomci u
monospaceu teže čitaju.

**Što još nije napravljeno:** font je zasad sistemski monospace stack, pa izgled
naslova ovisi o operativnom sustavu posjetitelja. Za ujednačen izgled treba
vendorirati pravi monospace (npr. JetBrains Mono, OFL licenca) u
`src/app/fonts/`, isto kako je Manrope vendoriran. To je jedna linija u
`globals.css` nakon što datoteke budu u repozitoriju.
