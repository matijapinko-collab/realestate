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

## Pokret na webu (16. 10. 2026.)

**Odluka:** dodani efekti iz reference — pojavljivanje blokova pri skrolu,
brojanje brojki, tipkanje u heroju, svjetlo koje prati pokazivač po karticama,
traka s pojmovima i crta napretka čitanja.

**Bez biblioteke.** Sve drži jedna mala skripta (`MotionLayer.tsx`): jedan
`IntersectionObserver`, jedan slušač skrola i jedan slušač pokazivača za cijelu
stranicu, umjesto komponente po elementu. Naslovnica je bila izmjerena na
Lighthouse 96 uz TBT od 70 ms i taj se budžet ne troši na ukrase.

**Dva osigurača, oba provjerena:**

1. **Bez JavaScripta** stranica je u završnom stanju. Stilovi koji skrivaju
   blokove vrijede tek kad skripta doda `.js-motion` na `<html>`, pa se ne može
   dogoditi da sadržaj ostane nevidljiv jer skripta nije stigla.
2. **Uz `prefers-reduced-motion: reduce`** skripta se ne pokreće. Provjereno
   kroz emulaciju u pregledniku: `js-motion` izostaje, nijedan od 18 blokova
   nije proziran, traka stoji, crta napretka je skrivena, a hero prikazuje
   običan popis umjesto tipkanja.

Animirani tekst u heroju ponavlja ono što popis već kaže, pa je za čitače
ekrana skriven — inače bi se čitao slovo po slovo.

## Dva weba u jednom: „Terminal" i „Studio" (16. 10. 2026.)

**Odluka je Matijina i izričita:** preuzeti koncept s `konpo.studio` i napraviti
ga kao **svijetli način**, dok dosadašnji tamni ostaje kao drugi. Iznio sam
primjedbe (kopija tuđeg dizajna, cijena u performansama, sadržaj koji još ne
podnosi takav okvir); Matija ih je čuo i potvrdio zahtjev, pa je izvedeno u
cijelosti.

**Granica koja se poštuje:** preuzeti su **struktura i ponašanje** — raspored,
tipografska skala, precrtana riječ, zavjesa s brojačem, glatko skrolanje,
pinane kartice. **Nije preuzet njihov sadržaj**: nijedan njihov tekst, video,
slika, ikona ni logotip nije u ovom repozitoriju. Sav sadržaj je Matijin.

**Prekidač je u zaglavlju** („Terminal" / „Studio"). Izbor se pamti i primjenjuje
**prije prvog iscrtavanja**, malom ugrađenom skriptom u `<head>`, pa se drugi
izgled nikad ne pojavi u bljesku. Zato `<html>` nosi `suppressHydrationWarning`
— razlika između poslužiteljskog i klijentskog `data-theme` je namjerna.

**Svijetli način nije samo druge boje.** Mijenja i tipografiju (grotesk umjesto
monospacea), raspored (heroj je centriran, terminalska kartica nestaje), rubove
(iscrtkani umjesto punih), rail uz lijevi rub i pinane kartice procesa. Kontrast
je izmjeren: tekst 16,43:1, prigušeni 6,26:1, bijelo na crnom gumbu 18,71:1,
rubovi kontrola 3,47:1.

**Glatko skrolanje je pisano ručno, bez Lenisa**, i isključuje se na dodir
(mobiteli već dobro skrolaju) te pod `prefers-reduced-motion`. Ne presreće
tipkovnicu, pa Page Down, Home i End rade normalno, a ne otima kotačić unutar
okvira koji i sami imaju skrol.

**Zavjesa s brojačem** pokaže se jednom po sesiji, nikad pod smanjenim
kretanjem, i sama odustane nakon sekunde i pol — preloader koji nadživi
stranicu je kvar, ne ulaz.

## Studio: sekcije po snimci (16. 10. 2026.)

Matija je poslao snimku `konpo.studio` s uputom da svijetli način izgleda tako.
Preuzeto je još:

- **Izjava koja se pali po riječima** dok sekcija prolazi kroz zaslon
  (`ScrollStatement.tsx`). Bez skripte i pod smanjenim kretanjem rečenica je
  obična, čitljiva — efekt je samo boja.
- **Divovska riječ iznad sekcije** s točkastom teksturom iza nje. Postoji samo
  u svijetlom načinu; tamni ima svoj numerirani indeks.
- **Usluge kao kartice** s okruglim crnim gumbom sa strelicom u kutu.
  Gumb zadržava svoje riječi za čitače ekrana i gubi ih samo vizualno
  (`font-size: 0` + strelica kroz `::after`).
- **Točka koja klizi niz lijevi rail** prema napretku čitanja.

Ono što **nije** preuzeto: njihov odjeljak s preporukama. Preporuka koju nitko
nije dao ne smije se izmisliti, a pravih još nema. Vratit će se kad ih bude.

## Uvodni slijed (16. 10. 2026.)

Prva verzija zavjese bila je samo brojač i Matija je s pravom rekao da to nema
veze sa snimkom. Snimka je rastavljena na kadrove i slijed je napravljen po
njoj: kartica projekta gore, brojač dolje koji se **kotrlja po znamenkama**
kao brojilo, na 100 se špil **raširi**, pa **skupi**, pa cijela zavjesa **ode
prema gore** i otkrije naslovnicu.

Kartice su **stvarne snimke** — naslovnica, stranica proizvoda i katalog
100% Smart Fooda te početna Varela. Nema izmišljenih mockupa. Sve četiri
zajedno su 57 KB.

Ograničenja koja slijed poštuje: ne pokreće se pod `prefers-reduced-motion`,
ide jednom po sesiji, `aria-hidden` je i stranica iza njega je cijelo vrijeme
iscrtana, a prekida se klikom, tipkom ili sam od sebe nakon nešto više od tri
sekunde.
