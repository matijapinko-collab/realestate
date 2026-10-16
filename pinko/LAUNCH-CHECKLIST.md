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

- [ ] **Maknuti redirect `pinko.hr` → `varel.io`** u cPanelu (Domains →
      pinko.hr → Redirects / "Manage Redirection"). To je zahvat na vašem
      hostingu i radite ga vi — ja nemam pristup cPanelu.
- [ ] Provjereno DNS/HTTP ponašanje `pinko.hr` nakon uklanjanja redirecta
- [ ] Odlučen odnos s Varelom
- [ ] Popis potrebnih preusmjerenja sa starih URL-ova
- [ ] `NEXT_PUBLIC_SITE_URL` postavljen na kanonsku domenu
- [ ] `NEXT_PUBLIC_ALLOW_INDEXING=true` **tek** na produkciji

Vidi `DEPLOYMENT.md` → „Domena i DNS”.

## 3. Projekti

Svi zapisi u `src/content/projects.ts` imaju `approvedForPublication: false`.
Za svaki prije objave potvrdite:

- [ ] **100% Smart Food** — status svake funkcije, što se smije prikazati, screenshotovi
- [ ] **Bolero Drinks** — točan status i opseg doprinosa, odobreni screenshotovi
- [ ] **Savez za rijetke bolesti** — ⚠️ **točan službeni naziv organizacije** (naziv u zapisu nije potvrđen), status i doprinos
- [ ] **Virus.hr** — potvrda opisa uloge i prava objave tekstova

Zatim postavite `approvedForPublication: true` na odobrene zapise.

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
