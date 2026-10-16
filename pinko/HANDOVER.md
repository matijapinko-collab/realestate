# Predaja — Pinko web

Ovaj dokument je brief za sljedeću Claude sesiju (ili developera) koja nastavlja
rad. Pisan je 16. 10. 2026., nakon rada u cloud sesiji.

**Pročitaj prvo ovo, pa `README.md`, `DECISIONS.md` i `LAUNCH-CHECKLIST.md`.**

---

## 1. Što je ovo

Web za **Pinko** — osobni studio Matije Pinka (Development, Marketing, Business
Development). Hrvatski jezik. Napravljen prema opsežnom briefu koji je Matija
dao u prvoj poruci razgovora.

Živi u poddirektoriju **`pinko/`**, kao samostalna Next.js aplikacija.

### Zašto u poddirektoriju

Korijen repozitorija već sadrži **gotov, nepovezan web za nekretnine**
(dvojezičan hr/en, Prisma + Neon, Cloudinary, NextAuth admin). Oba weba bi
htjela biti na `/`. Matija je odabrao da Pinko bude zaseban projekt u `pinko/`,
pa web za nekretnine ostaje netaknut i dalje radi.

**Nemoj dirati ništa izvan `pinko/`.** Provjera: `git diff main -- . ':!pinko'`
mora biti prazno.

---

## 2. Gdje stoji stvar

- Grana: **`claude/sleepy-mayer-8ect81`**
- PR: https://github.com/matijapinko-collab/realestate/pull/1 (otvoren, nije spojen)
- 3 commita, sve pogurano, radni direktorij čist

Sve provjere prolaze: `typecheck`, `lint`, 41 test, produkcijski build.

---

## 3. Što je napravljeno

Next.js 16.2.9 (App Router), TypeScript, Tailwind v4, zod. Bez baze — sadržaj je
u tipiziranim TS datotekama. **17 ruta, sve statički prerenderirane.**

Stranice: naslovnica (hero s izbornikom problema, dokaz kroz rad, tri
discipline, Matija, proces, cijene, infrastruktura, FAQ, kontakt), `/usluge` +
tri stranice disciplina, `/cjenik` s procjeniteljem, `/projekti` i
`/projekti/[slug]`, `/o-meni`, `/kako-radim`, `/kontakt`, `/privatnost`.

Font Manrope je **vendoriran lokalno** (dvije varijabilne woff2, 48 KB, latin +
latin-ext za č ć đ š ž) i poslužuje se s vlastitog origina — build ne ovisi o
mreži i posjet stranici ne dira vanjski servis.

Kontaktna forma: server action, zod validacija, ograničenje učestalosti po IP-u,
honeypot, ograničenje veličine zahtjeva, timeout 10 s, slanje **SMTP-om kroz
cPanel sandučić** (`matija@pinko.hr`). Nema vanjskog servisa za slanje.

### Podaci koji su potvrđeni i već u configu

```
email     matija@pinko.hr
telefon   098 137 8567
naziv     PINKO, obrt za informatičke usluge, vl. Matija Pinko
adresa    Zamlačka ulica 28 A, 10010 Velika Mlaka
OIB       12438213362   (kontrolna znamenka provjerena, ispravna)
MBS       97910945
```

Sve je u `src/config/site.ts`.

---

## 4. Što je ostalo — po prioritetu

### 4.1. Fotografija u hero (spremno, čeka samo datoteku)

Matijin portret **nije u repozitoriju**. Slot je već napravljen i čeka:

1. Stavi datoteku u `pinko/public/` (npr. `matija.jpg`).
2. U `src/config/site.ts` upiši `site.portrait`:
   ```ts
   portrait: {
     src: "/matija.jpg",
     width: <stvarna širina>,
     height: <stvarna visina>,
     alt: "Matija Pinko za radnim stolom",
   },
   ```
   Dimenzije **moraju** biti stvarne, inače se layout trza pri učitavanju.
   Očitaj ih iz datoteke, ne nagađaj.
3. `Hero.tsx` ju automatski prikaže iznad izbornika problema.

**Upozorenje o dizajnu:** fotka koju je Matija pokazao je tamna, s jakim
ljubičastim LED svjetlom. Web je svijetao i prozračan (pozadina `#FAFAF7`), pa
će odskakati. Kad ju ubaciš, **pogledaj kako stvarno izgleda** i javi Matiji.
Opcije koje smo već spominjali: nova fotka u dnevnom svjetlu (najbolje), obrada
pa premještanje na `/o-meni`, ili ostaviti kako jest.

### 4.2. Rok čuvanja podataka na `/privatnost`

Jedina preostala rupa na toj stranici. Trenutno piše da rok još nije dopunjen —
**to je namjerno, ne popravljaj izmišljanjem broja.** Pitaj Matiju koliko dugo
čuva prepisku o upitu pa upiši.

### 4.3. SMTP varijable na produkciji

Forma je napisana i testirana, ali ne šalje dok ne dobije:

```
SMTP_HOST=mail.pinko.hr     # točan host: cPanel → Email Accounts → Connect Devices
SMTP_PORT=465
SMTP_USER=matija@pinko.hr
SMTP_PASSWORD=<lozinka sandučića>
CONTACT_TO_EMAIL=matija@pinko.hr
```

Provjeriti i cPanel → **Email Deliverability** (SPF/DKIM), inače mail ide u spam.

### 4.4. Redirect `pinko.hr` → `varel.io`

Matija ga mora maknuti u cPanelu: **Domains → pinko.hr → Manage → Redirects**.
Nakon toga provjeri što domena stvarno radi i tek onda postavi
`NEXT_PUBLIC_SITE_URL` i `NEXT_PUBLIC_ALLOW_INDEXING=true`.

**Ne diraj DNS ni MX zapise automatski** — na njima vise mailovi i drugi projekti.

### 4.5. Projekti

Svi zapisi u `src/content/projects.ts` imaju `approvedForPublication: false`.
Dok je tako, `/projekti` pošteno piše da priče čekaju potvrdu. Prije prebacivanja
na `true` za svaki treba potvrda statusa, opsega doprinosa i prava objave.

⚠️ Kod zapisa **Savez za rijetke bolesti** naziv organizacije **nije provjeren** —
označeno je u `internalNote`. Provjeri točan službeni naziv prije objave.

---

## 5. Problemi na koje sam naišao i kako su riješeni

Zapisano da ih ne lovimo ponovno.

| Problem | Uzrok | Rješenje |
|---|---|---|
| Build povlačio `src/proxy.ts` iz roditeljskog repoa | Turbopack traži root po najbližem lockfileu i popeo se izvan `pinko/` | `turbopack.root` fiksiran u `next.config.ts` |
| `/kontakt` pucao pri prerenderu (`Cannot read properties of undefined`) | `"use server"` modul smije izvoziti **samo async funkcije**, a izvozio je i `initialContactState` | stanje izdvojeno u `src/lib/contact-state.ts` |
| OG slika pucala u buildu | `ImageResponse` traži eksplicitni `display: flex` na svakom divu s više djece | tekst spojen u jedan string, wordmark dobio flex |
| Lighthouse naslovnica **72**, TBT 1.010 ms | `zod` je preko `contact-schema.ts` ulazio u klijentski bundle (88 KiB, 99,97 % neiskorišteno) | popisi opcija izdvojeni u `src/lib/contact-options.ts` bez zod ovisnosti → **96**, TBT 70 ms |
| Kontrast pao na WCAG provjeri | indeks sekcije na tamnoj podlozi bio `white/40` = 3,81:1 | podignuto na `white/55` = 6,03:1 |
| Rubovi kontrola ispod 3:1 | predloženi `--color-rule` (#DCDDD7) ima 1,31:1 prema papiru | dodan `--color-control` (#8A8C7E, 3,27:1) samo za **interaktivne** rubove; svijetli rub ostaje za dekoraciju |
| `.env.example` se nije commitao | korijenski `.gitignore` ima `.env*` | `!.env.example` u `pinko/.gitignore` |
| Siva prazna ćelija u gridu usluga | 7 stavki u 2 stupca, zadnja ćelija pokazivala boju pozadine grida | filler `<li>` kad je broj neparan |

---

## 6. Što cloud sesija NIJE mogla (a lokalna može)

Ovo je razlog zašto se posao seli lokalno:

- **Fotka iz Downloadsa** — cloud kontejner nema pristup Matijinom disku.
- **cPanel** — nema preglednika ni pristupa njegovoj sesiji. Redirect je ostao neriješen.
- **Mreža** — politika okruženja blokirala je `pinko.hr`, `companywall.hr` i
  `fbcdn.net`, pa se stanje domene nije moglo provjeriti uživo.

Lokalna sesija vidi disk i može pokrenuti web, pa su prve dvije stvari rješive.

---

## 7. Pravila projekta — ne krši ih

Ovaj web je namjerno građen tako da **ne laže**. Nekoliko pravila je ugrađeno u
kod, ne samo u tekst:

1. **Ništa nepotvrđeno ne ide u produkciju.** Nepotvrđen podatak se izostavlja,
   ne izmišlja. Nema „TODO", „Lorem ipsum", lažnog kontakta ni prazne pravne
   stranice.
2. **Projekti samo uz `approvedForPublication: true`.** Nema izmišljenih
   postotaka rasta, logotipa ni izjava. Test to i provjerava.
3. **Jedan izvor cijena** — `src/config/pricing.ts`. Cjenik, kartice i
   procjenitelj čitaju isto. Ne duplicirati brojke nigdje.
4. **Interna tablica popusta iz briefa (odjeljak 8) NE SMIJE u aplikaciju** —
   ni u kod, ni u sadržaj, ni u config.
5. **Forma nikad ne prikazuje lažnu potvrdu.** Bez SMTP konfiguracije kaže da
   slanje nije postavljeno.
6. **Staging se ne smije indeksirati** dok `NEXT_PUBLIC_ALLOW_INDEXING` nije
   točno `"true"`.
7. **Logovi ne smiju sadržavati sadržaj upita** — samo kod greške.

---

## 8. Kako provjeriti da ništa nije puklo

```bash
cd pinko
npm install
npm run typecheck && npm run lint && npm test && npm run build
```

Sve mora proći. Testovi pokrivaju stvarni rizik: matematiku rata (uključujući
primjer iz briefa — 11.500 € uz 30 % predujma daje 3.450 € + 5 × 1.341,67 € +
1.341,65 €), validaciju forme, pravila objave projekata i podudaranje
procjenitelja s cjenikom.

Za vizualnu provjeru: `npm run dev`, pa pogledaj naslovnicu, `/cjenik` i
`/kontakt` na 360 i 1440 px. Prije predaje je bilo bez horizontalnog skrola na
svih 11 stranica i bez problema u provjeri pristupačnosti.

**Zadnje izmjereno (Lighthouse, mobilni, produkcijski build):**
naslovnica 96, `/cjenik` 97, `/usluge/development` 97, `/kontakt` 97 —
pristupačnost, best practices i SEO 100, CLS 0.
