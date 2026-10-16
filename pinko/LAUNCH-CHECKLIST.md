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
      `https://100smartfood.hr/`. Screenshotovi još nisu dostavljeni.
- [x] **Varel** — odobreno 16. 10. 2026., vlastiti proizvod, status
      `lansirano`, dokaz `https://varel.io/`
- [ ] **Bolero Drinks** — čeka točan status, opseg doprinosa i odobrene screenshotove
- [ ] **Virus.hr** — čeka potvrdu opisa uloge i prava objave tekstova
- [ ] Zapis **Saveza za rijetke bolesti** parkiran na Matijin zahtjev
      (16. 10. 2026.) jer službeni naziv nikad nije provjeren. Tekst je u
      git povijesti ako se vrati.

- [ ] Logotipi klijenata — prikazuju se tek kad su dostavljeni i odobreni
- [ ] Nijedan rezultat nije brojka koja nije provjerena

## 4. Vizualni materijali

- [ ] **Portret u repozitorij.** Fotografija je poslana u razgovoru, ali nije
      stigla kao datoteka u radno okruženje, pa je nisam mogao commitati.
      Dodajte je u `pinko/public/` i upišite `site.portrait` u
      `src/config/site.ts` (`src`, `width`, `height`, `alt`) — slot u heroju
      je već spreman.
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
