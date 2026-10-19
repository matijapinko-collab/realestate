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
- [x] Aplikacija podignuta na Hetzneru (`pinko-web:prod`, kontejner `pinko-web`)
- [x] **Pošta razdvojena prije weba** (16. 10. 2026.): `mail.pinko.hr` je sad
      vlastiti `A` zapis na 185.62.75.97, `MX` pokazuje na njega. Potvrđeno u
      cPanel Track Deliveryju: testna poruka s gmaila → `Accepted`.
- [x] Promijenjen **samo `A`** zapis za `pinko.hr` → 167.233.239.74
      (`www` je CNAME i ide za njim; `ns1`/`ns2` ostali na starom serveru)
- [x] `NEXT_PUBLIC_SITE_URL=https://pinko.hr` i `NEXT_PUBLIC_ALLOW_INDEXING=true`
      ugrađeni u produkcijski image
- [x] Let's Encrypt certifikat izdan za `pinko.hr` (vrijedi do 14. 1. 2027.)
- [x] `/rijetkebolesti/` i `/rijetkebolesti/wp-admin` i dalje na WordPressu
- [ ] U SPF-u maknuti `+a` (adresa 185.62.75.97 je ionako izričito navedena)
- [ ] Popis potrebnih preusmjerenja sa starih WordPress URL-ova
- [ ] Stari WordPress na cPanelu je i dalje ondje, samo više nije na domeni —
      odlučiti arhivira li se ili gasi
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
- [x] **Bolero Adria — Temu** — dodano 16. 10. 2026., tekst Matijin, brojke uz
      navedenu osnovu. Poveznica vodi na `boleroadria.com` (brend), ne na Temu
      trgovinu — provjeriti želi li radije Temu.
- [ ] **Bolero Drinks** (prodajni web, zaseban od Temu kanala) — čeka točan
      status, opseg doprinosa i odobrene screenshotove
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
- [x] Odluka o analitici — **Plausible**, bez kolačića i bez bannera
- [ ] Otvoren račun na plausible.io i dodana stranica `pinko.hr` (do tada
      skripta se učitava, ali brojke nemaju gdje sletjeti)
- [x] Podaci o voditelju obrade u `/privatnost` — popunjeni iz configa
- [x] **Rok čuvanja podataka** — 12 mjeseci od zadnje komunikacije, upisano na
      `/privatnost` (uz napomenu da dokumentacija o sklopljenoj suradnji ostaje
      onoliko dugo koliko nalažu računovodstveni i porezni propisi)

Analitika je Plausible i imenovana je u pravilima privatnosti. Nema kolačića,
nema lokalne pohrane i nema identifikatora koji prati posjetitelja, pa nema ni
pristanka za tražiti — zato nema bannera. Ako ikad dođe alat koji *jest*
osoban, mora se stvarno blokirati do pristanka; ukrasni banner bez blokade
nije prihvatljiv.

Skripta se učitava samo kad je `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` postavljen pri
buildu, pa razvoj i preview ne upisuju u stvarne brojke.

## 8. Prije samog prebacivanja

- [ ] `npm run typecheck && npm run lint && npm test && npm run build` prolaze
- [ ] Provjereno `/`, `/cjenik`, `/kontakt` na produkcijskoj domeni
- [ ] `robots.txt` i `sitemap.xml` pokazuju kanonsku domenu
- [ ] Staging ostaje blokiran za indeksiranje
