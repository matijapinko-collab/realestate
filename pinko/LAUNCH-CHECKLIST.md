# Popis za lansiranje

Web je razvojno dovršen i lokalno provjeren. Ovo su podaci i odluke koje samo
Matija može potvrditi. Ništa od ovoga ne blokira lokalni rad ni pregled —
blokira isključivo **javnu objavu**.

Pravilo koje aplikacija poštuje: nepotvrđen podatak se izostavlja, ne izmišlja.
Nigdje nema „TODO”, „Lorem ipsum”, lažnog kontakta ni prazne pravne stranice.

## 1. Poslovni i pravni podaci

- [ ] Točan registrirani naziv obrta
- [ ] Poslovna adresa
- [ ] OIB
- [ ] Poslovni kontakt (email koji ide u `NEXT_PUBLIC_CONTACT_EMAIL`)
- [ ] Telefon — **samo ako** ga želite javno objaviti

→ `src/config/site.ts`, `site.contact`. Dok su `null`, footer i kontakt blok ih
preskaču, a stranica `/privatnost` jasno kaže da podaci o voditelju obrade još
nisu dopunjeni.

## 2. Domena

- [ ] Potvrđena kanonska domena za novi web
- [ ] Provjereno stvarno DNS/HTTP ponašanje `pinko.hr` uživo
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

- [ ] Autentičan portret Matije (hero trenutačno koristi tipografsku kompoziciju)
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

- [ ] Odabran i postavljen servis za slanje emaila (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`)
- [ ] Verificirana domena pošiljatelja kod providera
- [ ] Testno slanje na produkciji prošlo
- [ ] Odluka o analitici — trenutačno nema nikakvog alata za praćenje
- [ ] Dopunjen rok čuvanja podataka i podaci o voditelju obrade u `/privatnost`

Ako se uvede analitika: nazvati je u pravilima privatnosti, a sve što nije
nužno stvarno blokirati do pristanka. Ukrasni cookie banner bez blokade nije
prihvatljiv.

## 8. Prije samog prebacivanja

- [ ] `npm run typecheck && npm run lint && npm test && npm run build` prolaze
- [ ] Provjereno `/`, `/cjenik`, `/kontakt` na produkcijskoj domeni
- [ ] `robots.txt` i `sitemap.xml` pokazuju kanonsku domenu
- [ ] Staging ostaje blokiran za indeksiranje
