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

### Zatečeno stanje na Hetzneru (provjereno 16. 10. 2026.)

U Hetzner konzoli postoje tri projekta, ali **samo jedan server**:

| Projekt | Sadržaj |
| --- | --- |
| Varel | `varel-server` — CPX32, x86, 160 GB, Falkenstein, IP `167.233.239.74` |
| Coolify Server Backups | samo bucket (object storage), bez servera |
| 100smartfood.hr | prazan, bez servera |

Na `varel-server` **portovi 80 i 443 su zauzeti** — na njima odgovara
**Traefik** (certifikat `TRAEFIK DEFAULT CERT`), što je Coolifyjev proxy.
Praktična posljedica: `caddy` servis iz `compose.yaml` se na tom serveru
**neće podići** jer ne može zauzeti 80/443.

Dvije ispravne opcije:

1. **Kroz Coolify na postojećem serveru** — Coolify gradi iz `Dockerfile`,
   Traefik radi TLS i rutiranje po domeni. Tada se `caddy` servis iz
   `compose.yaml` ne koristi; `Dockerfile` ostaje isti. Najjeftinije, jer ne
   treba novi server.
2. **Zaseban server samo za Pinko** — `compose.yaml` radi kakav jest, Caddy
   preuzima 80/443 i sam izdaje certifikat. Čisto odvojeno od Varela, ali je
   dodatni trošak.

⚠️ Ako ide kroz Traefik: Traefik po zadanom **prepisuje** `X-Forwarded-For`
stvarnom adresom i ne vjeruje onome što je klijent poslao. To je ponašanje koje
nam treba (vidi niže). Prije objave provjeriti da u Coolifyju nije uključen
`forwardedHeaders.trustedIPs` koji bi to otpustio.


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

### Docker i compose

Datoteke su u repozitoriju, nisu samo primjer u dokumentaciji:

- `Dockerfile` — višefazni build, standalone izlaz, pokreće se kao neroot
  korisnik. **Build kontekst je `pinko/`, ne korijen repozitorija.**
- `.dockerignore`
- `compose.yaml` — jedna instanca aplikacije i Caddy ispred nje
- `deploy/Caddyfile` — TLS, preusmjeravanje na HTTPS, `www` na kanonsku
  domenu, ograničenje veličine tijela zahtjeva

Na serveru:

```bash
cd pinko
cp .env.example .env     # pa upisati prave vrijednosti
docker compose up -d --build
```

`NEXT_PUBLIC_*` su build argumenti jer ih `next build` ugrađuje u bundle;
promjena takve vrijednosti traži `--build`, ne samo restart. Tajne
(`SMTP_PASSWORD`) predaju se iz `.env` tek pri pokretanju i nikad kao build
argument — build argumenti ostaju čitljivi u povijesti slike.

#### Zašto proxy mora prepisati `X-Forwarded-For`

Ograničenje učestalosti forme čita prvi unos iz `x-forwarded-for`. Caddy po
zadanom **dodaje** klijentovu adresu na postojeće zaglavlje, pa bi posjetitelj
mogao ispred svoje staviti lažnu i zaobići ograničenje. Zato `deploy/Caddyfile`
zaglavlje **prepisuje** (`header_up X-Forwarded-For {remote_host}`). Ako
zamijenite Caddy nginxom ili Traefikom, isto pravilo vrijedi.

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

**Odluka (16. 10. 2026.):** novi Next.js web ide na **Hetzner server**. Domena
`pinko.hr` mora pokazivati na njega.

Stanje zatečeno isti dan: Matija je maknuo redirect na `varel.io`, pa
`pinko.hr` i `www.pinko.hr` vraćaju 200 — ali ono što se poslužuje je **stari
WordPress** („Matija Pinko — The Gamechanger”, Avada tema) na cPanel hostingu.
Prebacivanje DNS-a znači da taj web prestaje biti dostupan.

### ⚠️ Prvo pošta, pa tek onda web

Provjereno 16. 10. 2026.:

```
pinko.hr.  MX  0 pinko.hr.
pinko.hr.  A   185.62.75.97
mail.pinko.hr  — ne postoji
```

**MX pokazuje na samu domenu.** To znači da pošta ide tamo gdje pokazuje `A`
zapis. Ako `A` prebacimo na Hetzner, sva pošta za `@pinko.hr` ide na server
koji nema poštanski servis — dolazna se gubi, a i forma koja šalje kroz taj
sandučić prestaje raditi.

Zato se prvo odvaja pošta od weba:

1. Dodati `A` zapis: `mail.pinko.hr → 185.62.75.97`
2. Promijeniti `MX` iz `0 pinko.hr` u `0 mail.pinko.hr`
3. Pričekati da se proširi i **provjeriti da pošta i dalje stiže**
4. U SPF-u maknuti `+a` (adresa `ip4:185.62.75.97` je ionako već izričito
   navedena, pa SPF ostaje valjan i bez njega). Ostavi li se `+a`, nakon
   prebacivanja bi SPF ovlastio i Hetznerov IP.
5. `DKIM` (`default._domainkey`) ne dirati.

DNS se uređuje kod **ns1/ns2.mydataknox.com**, dakle u zoni kod hostera.

Tek kad je pošta razdvojena, mijenja se `A` za `pinko.hr` i `www`.

### Varijanta: Cloudflare ispred svega

Cloudflare je bolji put nego mijenjanje zone kod hostera, iz tri razloga:
promjene su gotovo trenutne i vraćaju se jednako brzo, putanja
`/rijetkebolesti` se može usmjeriti **na rubu** kroz Origin Rules (pa otpada
Traefik datoteka i jedan skok), a isti obrazac već vrti `100smartfood.hr`.

**Ono što Cloudflare NE rješava je pošta.** `MX` i dalje pokazuje na
`pinko.hr`, a taj `A` zapis bi bio proxiran — dakle pokazivao bi na
Cloudflareove IP-eve, koji ne primaju poštu. Bez razdvajanja bi bilo *gore*,
ne bolje. Koraci 1–5 iz prethodnog odjeljka vrijede jednako.

Zapisi u Cloudflareu:

| Zapis | Vrijednost | Proxy |
| --- | --- | --- |
| `A pinko.hr` | 167.233.239.74 | **proxied** (narančasto) |
| `A www` | 167.233.239.74 | proxied |
| `A mail` | 185.62.75.97 | **DNS only** (sivo) |
| `MX` | `mail.pinko.hr`, prioritet 0 | — |
| `A webmail`, `A cpanel` | 185.62.75.97 | **DNS only** |
| `TXT` SPF i DKIM | prepisati jedan u jedan | — |

Poštanski zapisi **nikad ne smiju biti proxirani**. Proxiranje poštanskog
imena je najčešći način da se pošta izgubi pri prelasku na Cloudflare.

`/rijetkebolesti` kroz **Origin Rules**: uvjet `URI Path starts with
/rijetkebolesti`, akcija *Origin → DNS record / Host* na `185.62.75.97`.
Time Traefik datoteka nije potrebna, ali ostaje u repozitoriju kao zamjena
ako se ide bez Cloudflarea.

SSL postaviti na **Full (strict)** i zadržati Let's Encrypt na Traefiku, da
veza između Cloudflarea i servera bude provjereno šifrirana.

⚠️ **Posjetiteljev IP.** S Cloudflareom ispred, aplikacija prvo čita
`cf-connecting-ip` jer to zaglavlje postavlja sam rub i ne propušta ga od
posjetitelja. Ali server je i dalje dostupan po svom IP-u, pa tko zaobiđe
Cloudflare može slati što hoće. Prije objave suziti Hetzner firewall `sf-web`
tako da 80 i 443 primaju samo Cloudflareove rasponе.

### Što ostaje na WordPressu

`https://pinko.hr/rijetkebolesti/` (uključujući `wp-admin`) mora i dalje
stizati na cPanel. To rješava `deploy/traefik-pinko.yaml`: pravilo za tu
putanju ima veći prioritet i prosljeđuje na `185.62.75.97` uz `Host: pinko.hr`.

Provjereno da origin na to odgovara `200` i po HTTP-u i po HTTPS-u, pa proxy
radi i nakon što DNS pokazuje drugamo.

### Redoslijed prebacivanja

1. **Arhivirati stari WordPress** prije bilo kakve promjene — izvoz sadržaja i
   kopija datoteka. Nakon prebacivanja više mu se ne može pristupiti preko
   domene.
2. Podići aplikaciju na Hetzneru i provjeriti je **po IP-u ili privremenoj
   poddomeni**, dok je `NEXT_PUBLIC_ALLOW_INDEXING` još `false`.
3. Smanjiti TTL na A zapisu nekoliko sati prije prebacivanja, da se greška može
   brzo vratiti.
4. Promijeniti **samo `A` (i `AAAA`, ako postoji) zapis** za `pinko.hr` i
   `www.pinko.hr` na IP Hetzner servera.
5. Caddy automatski izdaje certifikat čim DNS pokazuje na server.
6. Tek kad domena stvarno poslužuje novi web: postaviti
   `NEXT_PUBLIC_SITE_URL=https://pinko.hr` i `NEXT_PUBLIC_ALLOW_INDEXING=true`
   pa **ponovno buildati** (te vrijednosti su ugrađene u bundle).
7. Provjeriti `/`, `/cjenik`, `/kontakt`, `robots.txt` i `sitemap.xml` na pravoj
   domeni, pa poslati testni upit kroz formu.

### ⚠️ Email ostaje na cPanelu

Forma šalje SMTP-om kroz sandučić `matija@pinko.hr`, koji je na cPanel hostingu.
Prebacivanje weba na Hetzner **ne smije povući i poštu**:

- **`MX` zapise ne dirati.**
- `mail.pinko.hr` (i `webmail`, `cpanel`, `autodiscover` ako postoje) moraju i
  dalje pokazivati na cPanel server.
- `SPF` i `DKIM` `TXT` zapise ne dirati — ako se izgube, mail ide u spam.
- Ako je `SMTP_HOST` postavljen na `mail.pinko.hr`, provjerite nakon
  prebacivanja da se s Hetznera to ime i dalje razrješava na cPanel IP. U
  protivnom upišite IP ili ime cPanel servera izravno.

Promijenite dakle samo zapise koji poslužuju web. Sve ostalo ostaje kako jest.

### Preusmjerenja sa starih URL-ova

Stari WordPress ima svoje putanje. Prije gašenja popisati one koje imaju
promet ili vanjske poveznice i dodati im trajna preusmjerenja (`redirects` u
`next.config.ts` ili pravilo u Caddyju), da se ne gube poveznice.

## Sigurnosne kopije

Ovaj web nema bazu; sadržaj je u gitu, pa je repozitorij ujedno i kopija.
Za hosting okruženje (ako se na istom poslužitelju vrte i drugi projekti)
vrijedi pravilo iz briefa: backup nije uspješan zato što postoji cron.
Dokumentirajte i **isprobajte** vraćanje prije nego se bilo kakvo obećanje o
kopijama objavi na webu.
