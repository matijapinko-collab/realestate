# Predaja — Pinko web

Brief za sljedeću sesiju ili developera koji nastavlja rad.
**Zadnje osvježeno: 5. 11. 2026.**

Redoslijed čitanja: **ovo**, pa `BRIEF.md` (zašto je web ovakav), pa
`README.md` (kako se radi), pa `LAUNCH-CHECKLIST.md` (što fali za objavu).

---

## 1. Što je ovo

Web za **Pinko** — osobni studio Matije Pinka. Hrvatski jezik.
Živi u poddirektoriju **`pinko/`** kao samostalna Next.js aplikacija.

### Zašto u poddirektoriju

Korijen repozitorija sadrži **gotov, nepovezan web za nekretnine** (dvojezičan
hr/en, Prisma + Neon, Cloudinary, NextAuth admin). Oba weba bi htjela biti na
`/`. Pinko je zato zaseban projekt u `pinko/`, s vlastitim ovisnostima i
deployem; web za nekretnine ostaje netaknut.

**Ne dirati ništa izvan `pinko/`.** Provjera: `git diff main -- . ':!pinko'`
mora biti prazno.

---

## 2. Gdje stoji stvar

- Grana: **`claude/sleepy-mayer-8ect81`**
- PR: https://github.com/matijapinko-collab/realestate/pull/1 (otvoren, **nije spojen**)
- Web **još nije javno objavljen** — indeksiranje je zaključano dok se ne
  postavi `NEXT_PUBLIC_ALLOW_INDEXING=true`.

Stanje provjera (5. 11. 2026.): `typecheck`, `lint`, **47 testova** i
produkcijski build prolaze. Detalji i mjerenja u `VERIFICATION.md`.

---

## 3. Što je napravljeno

Next.js 16.2.9 (App Router), TypeScript, Tailwind v4, zod, nodemailer.
**Bez baze** — sadržaj je u tipiziranim TS datotekama.

### Dva svijeta

Web ima **tamni (zadani)** i **svijetli** svijet. To nisu ista stranica u dvije
sheme: razlikuju se sekcije, njihov redoslijed i copy.

Izbor se pamti u kolačiću `pinko-theme`, koji server čita i renderira **samo
odabrani svijet** — jedan URL, jedan primjerak sadržaja, bez bljeska i bez
duplog teksta za čitač ekrana. Logika je u `src/lib/theme.ts`.

**Posljedica koju treba znati:** rute su zbog čitanja kolačića **dinamične
(`ƒ`), ne statične.** Build i dalje generira 33 stranice, ali se poslužuju na
zahtjev. To mijenja postavke cachea na produkciji — vidi `DEPLOYMENT.md`.

### Rute

`/`, `/usluge`, `/usluge/[slug]` (3 usluge), `/projekti`, `/projekti/[slug]`
(16 objavljenih), `/o-meni`, `/cv`, `/cjenik`, `/kako-radim`, `/kontakt`,
`/privatnost`, plus `sitemap.xml`, `robots.txt`, `icon.svg`, OG slika.
Sitemap sadrži 26 URL-ova.

### Ostalo

- **Font Manrope vendoriran lokalno** (varijabilni woff2, latin + latin-ext za
  č ć đ š ž). Build ne ovisi o mreži, posjet ne dira vanjski servis.
- **Kontaktna forma:** server action, zod validacija, ograničenje učestalosti po
  IP-u, honeypot, ograničenje veličine zahtjeva, timeout 10 s, slanje **SMTP-om
  kroz cPanel sandučić**. Bez vanjskog servisa za slanje.
- **Analitika:** Plausible, bez kolačića i osobnih podataka. Zato `/privatnost`
  ne treba banner za pristanak. Skripta se izostavlja dok
  `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` nije postavljen, pa razvoj ne prlja brojke.
- **Procjenitelj** na `/cjenik` računa iz istog izvora kao cjenik.

### Potvrđeni poslovni podaci (u `src/config/site.ts`)

```
email     matija@pinko.hr
telefon   098 137 8567
naziv     PINKO, obrt za informatičke usluge, vl. Matija Pinko
adresa    Zamlačka ulica 28 A, 10010 Velika Mlaka
OIB       12438213362   (kontrolna znamenka provjerena)
MBS       97910945
```

---

## 4. Što je ostalo — po prioritetu

### 4.1. Maknuti redirect `pinko.hr` → `varel.io`

Zahvat u cPanelu: **Domains → pinko.hr → Manage → Redirects**. Tek nakon toga
postaviti `NEXT_PUBLIC_SITE_URL` i `NEXT_PUBLIC_ALLOW_INDEXING=true`.

**Ne dirati DNS ni MX zapise automatski** — na njima vise mailovi i drugi
projekti.

### 4.2. SMTP varijable na produkciji

Forma je napisana i testirana, ali ne šalje dok ne dobije `SMTP_HOST`,
`SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_TO_EMAIL`. Host i port daje
cPanel → Email Accounts → Connect Devices. Provjeriti i **Email Deliverability**
(SPF/DKIM), inače mail ide u spam.

### 4.3. Rok čuvanja podataka na `/privatnost`

Jedina preostala rupa na toj stranici. Stranica **pošteno piše da rok nije
dopunjen** — ne popravljati izmišljanjem broja. Pitati Matiju.

### 4.4. Otvorene stavke iz `LAUNCH-CHECKLIST.md`

Ondje je potpun popis (uključujući arhiviranje starog WordPressa, SPF, potvrdu
opsega na Elektronimu, preostale neodobrene projekte). Checklist je **mjerodavan**
— ovaj odjeljak je samo kazalo.

### 4.5. Performanse svijetle naslovnice

Jedina stranica ispod 90: perf **81–87**, LCP **3,8–4,5 s** (cilj je ≤2,5 s).

Uzrok je identificiran: intro ploče u `src/components/light/LightIntro.tsx`
deklariraju `sizes="40rem"` fiksno, pa na mobitelu uz DPR 2 Next traži varijantu
od **1920 px** (≈60 KB po slici). Responzivan `sizes` za te ploče je najjeftiniji
dobitak. Intro je dekorativan (`aria-hidden`, `inert`), pa se smije i odgoditi.

---

## 5. Problemi koji su već riješeni

Zapisano da se ne love ponovno.

| Problem | Uzrok | Rješenje |
| --- | --- | --- |
| Build povlačio `src/proxy.ts` iz roditeljskog repoa | Turbopack traži root po najbližem lockfileu i popeo se izvan `pinko/` | `turbopack.root` fiksiran u `next.config.ts` |
| `/kontakt` pucao pri prerenderu | `"use server"` modul smije izvoziti **samo async funkcije**, a izvozio je i `initialContactState` | stanje izdvojeno u `src/lib/contact-state.ts` |
| OG slika pucala u buildu | `ImageResponse` traži eksplicitni `display: flex` na divu s više djece | tekst spojen u jedan string |
| Naslovnica Lighthouse **72**, TBT 1.010 ms | `zod` je preko `contact-schema.ts` ulazio u klijentski bundle (88 KiB, 99,97 % neiskorišteno) | popisi opcija izdvojeni u `src/lib/contact-options.ts` bez zod ovisnosti → **96** |
| Kontrast indeksa sekcije na tamnoj podlozi | `white/40` = 3,81:1 | `white/55` = 6,03:1 |
| Rubovi kontrola ispod 3:1 | `--color-rule` ima 1,31:1 prema papiru | `--color-control` (3,27:1) samo za **interaktivne** rubove |
| `.env.example` se nije commitao | korijenski `.gitignore` ima `.env*` | `!.env.example` u `pinko/.gitignore` |
| Siva prazna ćelija u gridu usluga | neparan broj stavki u 2 stupca | filler `<li>` kad je broj neparan |
| **`/projekti` preskakao razinu naslova** (h1→h3) | `ProjectCard` je uvijek bio `h3`, a na toj stranici stoji odmah ispod `h1` | `headingLevel` prop; `/projekti` prosljeđuje `h2` |
| **Svijetla naslovnica: tekst 1,59:1 prije skrola** | riječi hero izjave miruju na 22 % tinte dok ih skrol ne otkrije | podignuto na 50 % (3,34:1); efekt otkrivanja ostaje |
| **Svijetli CTA gumb 4,26:1** | bijeli tekst 18 px na `--lx-display` `#9254ff` | vlastiti token `--lx-cta` `#8a49f7` (4,80:1); `--lx-display` nepromijenjen |

---

## 6. Zamke u testiranju

- **Standalone build treba `public/`.** `next build` s `output: "standalone"` ne
  kopira `public/` ni `.next/static`. Ako se zaborave, optimizator slika vraća
  **400** na svaku sliku, a Lighthouse to prijavi kao grešku u konzoli. Naredbe
  su u `DEPLOYMENT.md`.
- **Mjerenja variraju.** Na dijeljenom stroju ista stranica zna dati ±5 bodova
  između pokretanja. Pokrenuti 3–4 puta i zapisati raspon, ne jedan broj.
- **Provjeravati oba svijeta.** Kolačić `pinko-theme=light` mijenja stablo
  stranice, pa provjera samo zadanog (tamnog) svijeta ne pokriva pola weba.

---

## 7. Pravila projekta — ne krši ih

Web je namjerno građen tako da **ne laže**. Dio pravila čuvaju testovi.

1. **Ništa nepotvrđeno ne ide u produkciju.** Nepotvrđen podatak se izostavlja,
   ne izmišlja. Bez „TODO", „Lorem ipsum", lažnog kontakta i prazne pravne
   stranice.
2. **Projekti samo uz `approvedForPublication: true`.** Bez izmišljenih postotaka
   rasta, logotipa i izjava. Test to provjerava.
3. **Jedan izvor cijena** — `src/config/pricing.ts`. Cjenik, kartice i
   procjenitelj čitaju isto.
4. **Interna komercijalna pravila (popusti, marže) NE SMIJU u repozitorij** — ni
   u kod, ni u sadržaj, ni u config. Ostaju kod Matije.
5. **Forma nikad ne prikazuje lažnu potvrdu.** Bez SMTP konfiguracije kaže da
   slanje nije postavljeno.
6. **Staging se ne smije indeksirati** dok `NEXT_PUBLIC_ALLOW_INDEXING` nije
   točno `"true"`.
7. **Logovi ne smiju sadržavati sadržaj upita** — samo kod greške.
8. **Osobne uloge nisu klijenti obrta.** Vidi `BRIEF.md`, odjeljak 6.

---

## 8. Kako provjeriti da ništa nije puklo

```bash
cd pinko
npm install
npm run typecheck && npm run lint && npm test && npm run build
```

Za vizualnu provjeru: `npm run dev`, pa naslovnica, `/cjenik` i `/projekti` na
360 i 1440 px — **u oba svijeta** (prekidač je u zaglavlju).

Testovi pokrivaju stvarni rizik: matematiku rata (uključujući primjer iz briefa:
11.500 € uz 30 % predujma daje 3.450 € + 5 × 1.341,67 € + 1.341,65 €), validaciju
forme, pravila objave projekata, podudaranje procjenitelja s cjenikom,
ograničenje učestalosti i analitiku.
