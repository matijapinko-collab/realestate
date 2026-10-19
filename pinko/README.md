# Pinko — web

Osobni studio Matije Pinka: razvoj, marketing i poslovni razvoj.
Next.js 16 (App Router), TypeScript, Tailwind v4. Jezik: hrvatski.

Ovaj projekt je samostalna aplikacija u `pinko/` poddirektoriju repozitorija.
Repozitorij sadrži i odvojeni projekt za nekretnine u korijenu; ta dva projekta
nemaju zajedničke ovisnosti ni build.

## Pokretanje

```bash
cd pinko
npm install
cp .env.example .env.local   # popunite po potrebi
npm run dev                  # http://localhost:3000
```

Ostale naredbe:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
npm test            # node --test (matematika rata, validacija, pravila objave)
npm run build       # produkcijski build
npm start           # pokretanje builda
```

## Struktura

```
src/
  app/            rute (App Router), sitemap, robots, OG slika, ikona
  components/
    layout/       header, footer, mobilni meni
    sections/     autorske sekcije stranica
    seo/          JSON-LD
    ui/           osnovni elementi (Button, Section, Price, PageHeader)
  config/
    site.ts       poslovni podaci, navigacija, discipline
    pricing.ts    SVE cijene na jednom mjestu
  content/        copy, projekti, usluge, biografija
  lib/            novac i rate, procjenitelj, validacija, slanje, rate limit
tests/            testovi za stvarni rizik
```

### Gdje se mijenja što

| Želite promijeniti | Datoteka |
| --- | --- |
| Cijenu, paket, opseg, uvjete | `src/config/pricing.ts` |
| Kontakt, domenu, navigaciju | `src/config/site.ts` |
| Tekst na naslovnici i FAQ | `src/content/copy.ts` |
| Projekte i njihov status | `src/content/projects.ts` |
| Boje, tipografiju, razmake | `src/app/globals.css` (`@theme`) |

Cjenik, kartice paketa i procjenitelj čitaju **isti** izvor (`pricing.ts`), pa brojke
ne mogu odstupati jedna od druge. Interna tablica pregovaračkih cijena iz briefa (odjeljak
8) namjerno **nije** u aplikaciji i ne smije se dodati.

## Objava projekta

Projekt se prikazuje javno samo ako ima `approvedForPublication: true` u
`src/content/projects.ts`. Svi su trenutačno `false` jer status, opseg doprinosa
i prava objave još nisu potvrđeni. Stranica `/projekti` i blok na naslovnici u
tom slučaju to pošteno kažu umjesto da prikažu prazne kartice.

Za lokalni pregled izgleda s podacima:

```bash
NEXT_PUBLIC_SHOW_DRAFT_PROJECTS=true npm run dev
```

Ta zastavica nema učinka u produkcijskom buildu.

## Kontaktna forma

Server action (`src/lib/actions/contact.ts`) radi serversku validaciju (zod),
ograničenje učestalosti po IP-u, honeypot i ograničenje veličine zahtjeva, pa
šalje email SMTP-om kroz sandučić na vlastitom cPanel hostingu, s timeoutom od
10 s. Nema vanjskog servisa za slanje.

Ako `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` ili `CONTACT_TO_EMAIL`
nedostaju, forma **ne** prikazuje lažnu potvrdu — jasno kaže da slanje nije
postavljeno. Postavljanje je opisano u `DEPLOYMENT.md`.

Newsletter privola je zasebna i dobrovoljna; slanje upita ne dodaje kontakt ni
na kakvu listu.

## Indeksiranje

Robots i `<meta robots>` blokiraju indeksiranje dok
`NEXT_PUBLIC_ALLOW_INDEXING` nije točno `"true"`. Postavite ga tek na
potvrđenoj produkcijskoj domeni, zajedno s `NEXT_PUBLIC_SITE_URL`.

## Dokumentacija

- `HANDOVER.md` — **počni ovdje**: stanje, što je ostalo, na što paziti
- `DEPLOYMENT.md` — objava, infrastruktura, rollback
- `LAUNCH-CHECKLIST.md` — što Matija treba potvrditi prije javne objave
- `DECISIONS.md` — odluke i pretpostavke pri izradi
- `VERIFICATION.md` — što je testirano, izmjereno i poznata ograničenja
