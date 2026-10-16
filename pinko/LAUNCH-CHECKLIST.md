# Popis za lansiranje

Web je razvojno dovršen i lokalno provjeren. Ovo su podaci i odluke koje samo
Matija može potvrditi. Ništa od ovoga ne blokira lokalni rad ni pregled —
blokira isključivo **javnu objavu**.

Pravilo koje aplikacija poštuje: nepotvrđen podatak se izostavlja, ne izmišlja.
Nigdje nema „TODO”, „Lorem ipsum”, lažnog kontakta ni prazne pravne stranice.

## 1. Poslovni i pravni podaci

- [x] Email: `matija@pinko.hr` — objavljen u footeru i na `/kontakt`
- [x] Telefon: `098 137 8567` — objavljen u footeru i na `/kontakt`
- [x] Naziv: `PINKO, obrt za informatičke usluge, vl. Matija Pinko`
- [x] Adresa: `Zamlačka ulica 28 A, 10010 Velika Mlaka`
- [x] OIB: `12438213362` — kontrolna znamenka provjerena i ispravna
- [x] MBS: `97910945`
- [ ] **Posljednji pogled na footer** — provjerite da naziv i adresa stoje
      točno onako kako ih vodi obrtni registar

→ `src/config/site.ts`, `site.contact`. Sad se prikazuju u footeru i popunjavaju
stranicu `/privatnost`.

## 2. Domena

- [x] **Maknut redirect `pinko.hr` → `varel.io`** (Matija, 16. 10. 2026.)
- [x] Provjereno HTTP ponašanje: `pinko.hr` i `www.pinko.hr` vraćaju 200 na
      `https://pinko.hr/`, bez preusmjeravanja
- [x] **Odlučeno: novi web ide na Hetzner server** (Matija, 16. 10. 2026.),
      pa se `pinko.hr` prebacuje s cPanela na Hetzner
- [ ] ⚠️ **Arhivirati stari WordPress** („Matija Pinko — The Gamechanger”,
      Avada) prije prebacivanja DNS-a — nakon toga nije dostupan preko domene
- [ ] Aplikacija podignuta na Hetzneru i provjerena po IP-u, bez indeksiranja
- [ ] Promijenjen **samo `A`/`AAAA`** zapis za `pinko.hr` i `www.pinko.hr`
- [ ] ⚠️ **`MX`, `mail.pinko.hr`, `SPF` i `DKIM` ostali netaknuti** — na njima
      visi pošta i slanje forme preko cPanel sandučića
- [ ] Popis potrebnih preusmjerenja sa starih WordPress URL-ova
- [ ] `NEXT_PUBLIC_SITE_URL=https://pinko.hr` i novi build
- [ ] `NEXT_PUBLIC_ALLOW_INDEXING=true` **tek** kad domena poslužuje novi web
- [ ] Odlučen odnos s Varelom

Vidi `DEPLOYMENT.md` → „Domena i DNS”.

## 3. Projekti

Objavljeni su zapisi s `approvedForPublication: true` u
`src/content/projects.ts`:

- [x] **100% Smart Food** — odobreno 16. 10. 2026., status `lansirano`, dokaz
      `https://100smartfood.hr/`. Opširan opis rada i plana; dvije snimke
      cijelih stranica (naslovnica i proizvod) kroz koje se može pomicati.
- [x] **Varel** — odobreno 16. 10. 2026., vlastiti proizvod, status
      `lansirano`, dokaz `https://varel.io/`
- [x] **Teladoc / Business Vision** — odobreno 16. 10. 2026., profesionalna
      uloga (ne klijent Pinko obrta). Razdoblje je trajanje COO uloge, **ne**
      potvrđeno trajanje rada na Teladocu; 75+ developera odnosi se na cijeli
      Business Vision na vrhuncu. Sekcija se zove „Moj doprinos", ne
      „Rezultat", jer ishodi nisu mjereni.
- [x] **Elektronim Instalacije** — dodano 16. 10. 2026., status `lansirano`,
      dokaz `https://elektronim-instalacije.hr/`, uz snimku cijele naslovnice
- [ ] ⚠️ **Potvrditi opseg posla na Elektronimu.** Opis je napisan iz onoga
      što web pokazuje; Matija nije rekao što je točno radio (dizajn, sadržaj,
      fotografije, održavanje). Sekcija se zato zove „Moj doprinos".
- [ ] **Bolero Drinks** — čeka točan status, opseg doprinosa i odobrene screenshotove
- [ ] **Virus.hr** — čeka potvrdu opisa uloge i prava objave tekstova
- [ ] Zapis **Saveza za rijetke bolesti** parkiran na Matijin zahtjev
      (16. 10. 2026.) jer službeni naziv nikad nije provjeren. Tekst je u
      git povijesti ako se vrati.

- [ ] Logotipi klijenata — prikazuju se tek kad su dostavljeni i odobreni
- [ ] Nijedan rezultat nije brojka koja nije provjerena
- [ ] Snimke stranica stare — osvježiti ih kad se web vidno promijeni
      (postupak: `docs/snimke-zivih-stranica.md`)

## 4. Vizualni materijali

- [x] **Portret je u repozitoriju** (16. 10. 2026.): `public/matija-pinko.webp`,
      960 × 960, 50 KB. Stoji u krugu s rotirajućim prstenom u tamnom načinu i
      otvara biografiju. Tamna fotka s ljubičastim svjetlom ovdje radi u svoju
      korist — strah iz prve predaje odnosio se na svijetli web.
      Ako se ikad zamijeni, upisati **stvarne** dimenzije nove datoteke u
      `site.portrait`, inače layout poskakuje pri učitavanju.
- [ ] Odobreni screenshotovi projekata

Bez AI portreta koji se predstavlja kao stvarna fotografija i bez stock timova.

## 5. Infrastruktura i podrška

- [ ] Aktualni serveri i lokacije obrade (tekst u `Infrastructure.tsx` i `pricing.ts` → `hostingTerms` treba uskladiti sa stvarnim stanjem)
- [ ] Slobodni kapaciteti — kvote u hosting paketima su komercijalni prijedlog, ne potvrda resursa
- [ ] Interval i zadržavanje sigurnosnih kopija, odvojena lokacija, **isprobano vraćanje**
- [ ] Radno vrijeme podrške (brief predlaže pon–pet 9–17) i granice podrške
- [ ] Rok prvog odgovora — objavljuje se tek kad ga potvrdite (`site.responseTime`)

## 6. Cijene i uvjeti

- [ ] Prihvaćene sve objavljene cijene u `src/config/pricing.ts`
- [ ] Prihvaćeni uvjeti rata i mjesečnih angažmana
- [ ] Predložak ugovora pokriva: dospijeća, prihvat faza, izmjene opsega, izvorni kod, pravo korištenja prije zadnje rate, troškove trećih strana i izlazak iz mjesečne suradnje

Interna tablica pregovaračkih cijena (brief, odjeljak 8) namjerno nije u
aplikaciji i ne smije se dodati ni u sadržaj ni u konfiguraciju.

## 6.5. CV

- [x] `/cv` izrađen iz jednog izvora (`src/content/cv.ts`), s print stilovima
      bez navigacije, podnožja i tamnih podloga; poveznice u ispisu nose adresu
- [x] Nema gumba „Preuzmi PDF" jer PDF datoteka ne postoji — stoji
      „Ispišite ili spremite kao PDF"
- [x] Obrazovanje bez pretpostavljene diplome, bez privatne adrese i datuma
      rođenja, bez njemačkog dok se ne potvrdi
- [x] Upwork: ostao je „Top Rated Plus", maknuta je tvrdnja o gornjem postotku
      jer brief traži provjerljiv profil prije nje
- [x] **Jedna email adresa na cijelom webu:** `matija@pinko.hr` (odluka
      Matije, 16. 10. 2026.). CV ju čita iz `site.contact.email`, pa se piše
      na jednom mjestu. Hotmail adresa iz briefa se ne koristi.
- [ ] **BISNEYS** je u CV-u na temelju LinkedIn podataka (lipanj 2025. —
      danas). Urednička napomena uz brief kaže da zapis nije bio razrađen jer
      kronologija nije bila određena; potvrdite opis.

## 6.6. Crvotočina (prijelaz između dimenzija)

- [x] Dva videa preko cijelog zaslona, po jedan za svaki smjer; tema se
      mijenja na polovici, dok je zaslon prekriven
- [x] Samo desktop, nikad pod `prefers-reduced-motion`, bez dvostrukog
      pokretanja; svaki kvar završi primjenom teme i otključavanjem stranice
- [x] **Videi stisnuti** (16. 10. 2026.): 1,0 MB i 0,74 MB, po dvije sekunde,
      rez i ubrzanje zapečeni u datoteku. WebM odbačen jer je kod ovih snimki
      ispao veći od H.264.
- [x] **Izlazak iz tunela je pretapanje**, ne rez: tunel se gasi 700 ms dok
      stranica ulazi iz prozirnosti

## 7. Slanje forme, analitika i privatnost

- [x] Slanje ide SMTP-om kroz vlastiti cPanel sandučić, bez vanjskog servisa
- [ ] **`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`** postavljeni na
      produkciji (cPanel → Email Accounts → Connect Devices daje host i port)
- [ ] Provjeren SPF/DKIM (cPanel → Email Deliverability), da mail ne ide u spam
- [ ] Testno slanje na produkciji prošlo
- [ ] Odluka o analitici — trenutačno nema nikakvog alata za praćenje
- [x] Podaci o voditelju obrade u `/privatnost` — popunjeni iz configa
- [x] **Rok čuvanja podataka** — 12 mjeseci od zadnje komunikacije, upisano na
      `/privatnost` (uz napomenu da dokumentacija o sklopljenoj suradnji ostaje
      onoliko dugo koliko nalažu računovodstveni i porezni propisi)

Ako se uvede analitika: nazvati je u pravilima privatnosti, a sve što nije
nužno stvarno blokirati do pristanka. Ukrasni cookie banner bez blokade nije
prihvatljiv.

## 8. Prije samog prebacivanja

- [ ] `npm run typecheck && npm run lint && npm test && npm run build` prolaze
- [ ] Provjereno `/`, `/cjenik`, `/kontakt` na produkcijskoj domeni
- [ ] `robots.txt` i `sitemap.xml` pokazuju kanonsku domenu
- [ ] Staging ostaje blokiran za indeksiranje
