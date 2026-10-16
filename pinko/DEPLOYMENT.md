# Objava i infrastruktura

Cilj: drugi developer treba moći objaviti ovu aplikaciju i vratiti prethodnu
verziju bez pogađanja.

## Varijable okruženja

Potpuni popis je u `.env.example`. Sažetak:

| Varijabla | Obavezna | Kada se čita | Napomena |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | da | build | Kanonski origin, bez kose crte na kraju |
| `NEXT_PUBLIC_ALLOW_INDEXING` | da | build | Samo `"true"` dopušta indeksiranje |
| `SMTP_HOST` | za formu | runtime | cPanel mail host, npr. `mail.pinko.hr` |
| `SMTP_PORT` | ne | runtime | 465 (implicit TLS, zadano) ili 587 (STARTTLS) |
| `SMTP_USER` | za formu | runtime | Puna adresa sandučića, npr. `matija@pinko.hr` |
| `SMTP_PASSWORD` | za formu | runtime | **Tajna**, samo na serveru |
| `CONTACT_TO_EMAIL` | za formu | runtime | Prima upite |
| `CONTACT_FROM_EMAIL` | ne | runtime | Envelope pošiljatelj; prazno = `SMTP_USER` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | ne | build | Javno prikazana adresa; zadano `matija@pinko.hr` |

**Važno:** `NEXT_PUBLIC_*` varijable se ugrađuju u klijentski bundle pri
`next build`. Promjena takve varijable zahtijeva novi build, ne samo restart.
Varijable za formu čitaju se u runtimeu, pa je za njih dovoljan restart.

Nijedna tajna ne smije dobiti `NEXT_PUBLIC_` prefiks. `SMTP_PASSWORD` je
lozinka pravog sandučića — drži se u tajnama okruženja, nikad u gitu ni u
build argumentu.

### Slanje emaila preko cPanela

Forma šalje SMTP-om kroz sandučić na vlastitom hostingu, bez vanjskog servisa.
Potrebno je samo:

1. U cPanelu **Email Accounts** → postojeći ili novi sandučić na `pinko.hr`.
2. **Connect Devices** uz taj sandučić pokazuje točan *Outgoing Server* i port —
   to su `SMTP_HOST` i `SMTP_PORT`.
3. Lozinka sandučića ide u `SMTP_PASSWORD`.

Pošiljatelj mora biti sandučić na toj domeni, inače server odbija relay. Adresa
posjetitelja postavlja se kao `Reply-To`, pa odgovor iz inboxa ide izravno
njemu.

Ako SPF/DKIM zapisi za domenu nisu uredni, mail može završiti u spamu. cPanel
ima **Email Deliverability** koji to pokazuje i nudi popravak.

## Build

```bash
cd pinko
npm ci
npm run typecheck && npm run lint && npm test
npm run build
```

`next.config.ts` koristi `output: "standalone"`, pa build proizvodi minimalan
server u `.next/standalone`.

### Pokretanje standalone builda

```bash
cp -r public .next/standalone/ 2>/dev/null || true
cp -r .next/static .next/standalone/.next/
PORT=3000 HOSTNAME=0.0.0.0 node .next/standalone/server.js
```

`server.js` ne poslužuje `public` i `.next/static` sam od sebe — zato gornje
kopiranje. Ako ispred stoji CDN, te mape može poslužiti i on.

## Self-hosting (Hetzner / Coolify / Docker)

Preporučena postava za prezentacijski web je **jedna instanca** iza reverse
proxyja. Nema potrebe za multi-server arhitekturom.

### Reverse proxy

Next.js dokumentacija preporučuje reverse proxy (nginx, Traefik, Caddy) ispred
Next servera, da proxy preuzme neispravne zahtjeve, spore konekcije,
ograničenje veličine tijela zahtjeva i TLS.

Proxy mora:

- terminirati TLS i preusmjeravati HTTP na HTTPS;
- postavljati `X-Forwarded-For` i `X-Forwarded-Proto`;
- imati ograničenje veličine tijela zahtjeva (forma ne treba više od ~64 kB);
- prosljeđivati na `http://127.0.0.1:3000`.

**Ograničenje učestalosti forme** čita `x-forwarded-for`. Proxy mora taj
zaglavlje postavljati sam, a ne prosljeđivati ono koje je poslao klijent —
inače ga je trivijalno lažirati.

### Docker

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY pinko/package.json pinko/package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY pinko/ .
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_ALLOW_INDEXING
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_ALLOW_INDEXING=$NEXT_PUBLIC_ALLOW_INDEXING
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
```

`NEXT_PUBLIC_*` su build argumenti jer se ugrađuju u bundle. Tajne (Resend) se
predaju tek pri pokretanju kontejnera, nikad kao build argument.

### Healthcheck

`GET /` vraća 200 i statički je prerenderiran. Dovoljno za healthcheck:

```
curl -fsS http://127.0.0.1:3000/ > /dev/null
```

### Restart i cache

Sve stranice su statički prerenderirane pri buildu. Nema ISR-a ni
persistentnih podataka na disku koje treba čuvati između deploya. Ako se web
kasnije skalira na više instanci, treba riješiti koordinaciju cachea prema
aktualnoj Next.js dokumentaciji, a ograničenje učestalosti forme premjestiti u
dijeljenu pohranu (vidi `src/lib/rate-limit.ts`).

## Rollback

Build je nepromjenjiv artefakt vezan uz git commit.

1. Nađite prethodni ispravan commit: `git log --oneline -- pinko/`
2. Vratite se na njega: `git checkout <sha> -- pinko/` ili deploy tog taga.
3. Ponovite `npm ci && npm run build` s **istim** `NEXT_PUBLIC_*` vrijednostima.
4. Zamijenite pokrenutu instancu i provjerite `/`, `/cjenik` i `/kontakt`.

Na Coolifyju je dovoljno odabrati prethodni deployment i pokrenuti redeploy.
Pri rollbacku pripazite da `NEXT_PUBLIC_SITE_URL` i `NEXT_PUBLIC_ALLOW_INDEXING`
budu isti kao u produkciji, inače se može objaviti staging canonical.

## Domena i DNS

Prije promjene DNS-a treba potvrditi kanonsku domenu. Brief bilježi opažanje od
14. 10. 2026. da je javni dohvat `https://pinko.hr` završio na
`https://varel.io/en`. To je opažanje, ne odluka o strategiji brenda.

Prije lansiranja:

- provjerite stvarno DNS/HTTP ponašanje uživo;
- odredite kanonsku domenu i postavite `NEXT_PUBLIC_SITE_URL` na nju;
- napravite popis potrebnih preusmjerenja sa starih URL-ova;
- **ne mijenjajte postojeće MX i druge DNS zapise automatski** — na njima mogu
  visjeti email i drugi projekti.

Aplikacija nigdje ne pretpostavlja da postojeći web ostaje ili se briše.

## Sigurnosne kopije

Ovaj web nema bazu; sadržaj je u gitu, pa je repozitorij ujedno i kopija.
Za hosting okruženje (ako se na istom poslužitelju vrte i drugi projekti)
vrijedi pravilo iz briefa: backup nije uspješan zato što postoji cron.
Dokumentirajte i **isprobajte** vraćanje prije nego se bilo kakvo obećanje o
kopijama objavi na webu.
