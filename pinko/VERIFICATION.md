# Provjere, mjerenja i poznata ograničenja

Zapis stvarno izvedenih provjera. Ništa u ovom dokumentu nije procjena —
svaki broj je izmjeren u uvjetima opisanim uz njega.

Datum provjere: 15. 10. 2026.

## Automatske provjere

| Provjera | Naredba | Rezultat |
| --- | --- | --- |
| Tipovi | `npm run typecheck` | prolazi, bez grešaka |
| Lint | `npm run lint` | prolazi, bez upozorenja |
| Testovi | `npm test` | 41 test, 41 prolazi |
| Produkcijski build | `npm run build` | prolazi, 17 ruta statički prerenderirano |

### Što testovi pokrivaju

Testovi ciljaju stvarni rizik, ne postojanje naslova.

- **`tests/money.test.ts`** — matematika rata. Uključuje sva tri primjera iz
  briefa za 11.500 €: faze 4.600 + 3.450 + 3.450; 6 rata = predujam 3.450 € +
  5 × 1.341,67 € + zadnja 1.341,65 € (korekcija 0,02 €); 12 rata = 4.600 € +
  12 × 575 €. Uz to provjerava da se **svaki** raspored (8 iznosa × 4 predujma
  × 6 brojeva rata) zbraja točno na ugovorenu cijenu i da nijedna rata nije
  veća od prve.
- **`tests/contact-schema.test.ts`** — validacija forme: prazna poruka,
  prekratka poruka, neispravan email, nedostajuće ime, predugačka polja,
  podmetnute vrijednosti izvan objavljenih popisa, trimanje i činjenica da
  newsletter privola nikad nije pretpostavljena.
- **`tests/projects.test.ts`** — pravila objave: neodobren projekt ne može u
  javni popis ni biti dohvaćen po slugu, razvojna zastavica nema učinka u
  produkciji, nema placeholder teksta i nijedan „rezultat” nije neprovjerena
  brojka ili postotak.
- **`tests/estimate.test.ts`** — procjenitelj mora davati iste iznose kao cjenik:
  donja granica jednaka je objavljenoj početnoj cijeni paketa, veći opseg nikad
  ne smanjuje iznos, dodatak bez definirane cijene se **ne** zbraja, mjesečni
  trošak se ne uvlači u cijenu projekta, a svaki raspored plaćanja zbraja se na
  ponuđeni iznos.
- **`tests/rate-limit.test.ts`** — ograničenje učestalosti: peti pokušaj prolazi,
  šesti ne, limit je po ključu i prozor se otvara nakon isteka.

## Kontaktna forma — ručno testirani scenariji

Testirano u pregledniku protiv produkcijskog standalone builda. Slanje ide
SMTP-om kroz cPanel sandučić; za testiranje je korišten **lokalni SMTP server**,
da testni podaci ne odu na pravi sandučić ni trećoj strani.

| Scenarij | Očekivano | Rezultat |
| --- | --- | --- |
| Ispravan upit, SMTP radi | potvrda + mail stvarno isporučen | ✅ server primio `to: matija@pinko.hr`, `from: Pinko web <matija@pinko.hr>`, `reply-to: ana@primjer.hr`, hrvatski znakovi u naslovu ispravno kodirani |
| SMTP nije konfiguriran | pošteno „nije postavljeno”, bez lažne potvrde | ✅ |
| Server odbija poruku | pošteno „slanje ne radi” | ✅ log: `Slanje nije uspjelo (EMESSAGE)` |
| Server nedostupan | pošteno „slanje ne radi” | ✅ log: `SMTP veza nije uspjela (ESOCKET)` |
| Neispravan email | greška uz polje | ✅ „Provjerite email adresu…” |
| Prazna poruka | greška uz polje | ✅ „Napišite barem nekoliko rečenica…” |
| Prekratka poruka | greška uz polje | ✅ |
| Nedostaje ime | greška uz polje | ✅ |
| Sva polja prazna | tri greške uz polja | ✅ |
| Ponovljeno slanje (8×) | ograničenje nakon 5 | ✅ „Stiglo je previše upita…” |
| Odbijen upit | upisani tekst ostaje | ✅ ime i poruka sačuvani |

**Logovi ne sadrže osobne podatke** — bilježi se samo statusni kod ili vrsta
greške, nikad tijelo odgovora ni sadržaj upita.

## Procjenitelj

Provjereno u pregledniku: „Shop s planom” + početni opseg + „Do 6 rata”
prikazuje **predujam 3.450 €, 5 × 1.341,67 €, zadnja rata 1.341,65 €** — isto
što daju testovi i što piše u briefu. Cijena projekta i mjesečni trošak
prikazani su odvojeno, a uz rezultat stoji da nije obvezujuća ponuda.

## Responzivnost

Svih 11 stranica provjereno na **360, 390, 768, 1280 i 1440 px**
(automatizirani prolaz + vizualni pregled).

- **Nema horizontalnog skrola** ni na jednoj stranici ni na jednoj širini.
- Nema prelamanja riječi u naslovima (`word-break: normal`, `text-wrap: balance`).
- Cijene i oznaka „+ PDV” ostaju zajedno i čitljive na 360 px.
- Usporedbe su vertikalni blokovi, ne stisnute tablice.
- CTA kontrole imaju najmanje 44 px visine.

## Pristupačnost

Automatizirana i ručna provjera na svih 11 stranica:

- točno jedan `<h1>` po stranici, bez preskakanja razina naslova;
- sve kontrole forme imaju povezanu oznaku; svi gumbi i poveznice imaju ime;
- `html lang="hr"`;
- skip link je prvi tab stop i radi;
- mobilni meni: fokus ulazi u panel, zarobljen je dok je otvoren, Escape
  zatvara i vraća fokus na otvarač;
- FAQ se otvara tipkovnicom (`<details>`, radi i bez JS-a);
- hero izbornik problema koristi prave gumbe s `aria-pressed`, jedan odabran
  po defaultu;
- `prefers-reduced-motion` uklanja gibanje, sadržaj ostaje vidljiv;
- **bez JavaScripta**: cijene i FAQ sadržaj i dalje se prikazuju.

Kontrast je izračunat i provjeren alatom. Jedna stvarna greška pronađena i
popravljena: indeks sekcije na tamnoj podlozi bio je `white/40` (3,81:1) —
podignut na `white/55` (6,03:1). Rubovi interaktivnih kontrola koriste zaseban
token `--color-control` (3,27:1 prema papiru) jer predloženi svijetli rub ne
zadovoljava WCAG 1.4.11.

Cilj je bio WCAG 2.2 AA kao razvojni kriterij. **To nije tvrdnja o provedenoj
formalnoj certifikaciji** ni o reviziji s korisnicima pomoćne tehnologije.

## Performanse — izmjereno

Lighthouse 12, mobilni profil (390×844, DPR 2, ugrađena mrežna i CPU
regulacija), Chromium 1194, produkcijski standalone build posluživan lokalno
preko `node server.js`. Mjereno bez CDN-a i bez mrežne latencije.

| Stranica | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | **96** | 100 | 100 | 100 | 2,7 s | 70 ms | 0 |
| `/cjenik` | **97** | 100 | 100 | 100 | 2,6 s | 50 ms | 0 |
| `/usluge/development` | **97** | 100 | 100 | 100 | 2,2 s | 160 ms | 0 |
| `/kontakt` | **97** | 100 | 100 | 100 | 2,2 s | 140 ms | 0 |

Prvo mjerenje naslovnice dalo je **72** uz TBT 1.010 ms. Uzrok: `zod` je preko
zajedničkog modula ulazio u klijentski bundle (~88 KiB, 99,97 % neiskorišteno).
Popisi opcija izdvojeni su u `src/lib/contact-options.ts` bez zod ovisnosti, pa
validacijska biblioteka više uopće ne ide u preglednik. Nakon popravka: **96**,
TBT 70 ms.

Ostali podaci: font 48 KB (dvije varijabilne woff2 datoteke, posluženo lokalno),
CLS 0 na svim mjerenim stranicama, 17 ruta statički prerenderirano.

**Lab rezultat nije jamstvo terenskih metrika.** Ciljevi za kasnije stvarno
mjerenje (75. percentil, nakon dovoljno prometa): LCP ≤ 2,5 s, INP ≤ 200 ms,
CLS ≤ 0,1.

## SEO i indeksiranje

Provjeren **generirani HTML**, ne samo objekt u kodu.

- Svaka stranica ima jedinstven `<title>`, `description`, `canonical` i OG
  oznake; OG slika se generira iz istih brend tokena.
- Sa `NEXT_PUBLIC_ALLOW_INDEXING=true`: `robots.txt` dopušta indeksiranje,
  navodi sitemap i host, a stranice imaju `index, follow`.
- Bez te varijable (staging): `robots.txt` je `Disallow: /`, a stranice imaju
  `noindex, nofollow` — staging se ne može slučajno indeksirati.
- `/privatnost` je `noindex, follow` i izuzet iz sitemapa.
- Sitemap sadrži samo stvarne objavljene rute.

Potvrđeno i ponašanje koje treba znati pri deployu: `NEXT_PUBLIC_*` varijable
ugrađuju se pri buildu, pa build bez njih ispisuje `localhost` canonical.
Opisano u `DEPLOYMENT.md`.

## Poznata ograničenja

1. **Projekti nisu objavljeni.** Svi zapisi su `approvedForPublication: false`
   dok Matija ne potvrdi status, doprinos i prava objave. `/projekti` i blok na
   naslovnici to pošteno kažu.
2. **Kontakt podaci nedostaju.** Email, telefon, adresa, OIB i naziv obrta su
   `null`. UI ih preskače, `/privatnost` navodi da podaci o voditelju obrade i
   rok čuvanja još nisu dopunjeni.
3. **Slanje forme nije konfigurirano** ni na jednom okruženju. Bez Resend
   varijabli forma to kaže i ne šalje ništa.
4. **Nema portreta ni screenshotova.** Hero koristi tipografsku kompoziciju.
5. **Hosting tekst nije provjeren** prema stvarnom stanju servera.
6. **Ograničenje učestalosti je u memoriji procesa.** Dovoljno za jednu
   instancu; za više instanci treba dijeljena pohrana.
7. **Nema analitike.** Događaji iz briefa (klik na CTA, pregled cjenika,
   završetak procjenitelja, zaprimljen upit) nisu implementirani jer alat nije
   odabran. Upit se broji kao konverzija tek nakon serverskog prihvata, pa je
   mjesto za to server action, ne klik gumba.
8. **Nema bloga.** Brief traži da se `/biljeske` ne lansira dok ne postoje
   barem 3 odobrena teksta.
9. **Jedan jezik.** Hrvatski na korijenu; struktura sadržaja je pripremljena za
   kasniji prijevod, bez praznih engleskih stranica i i18n složenosti.
