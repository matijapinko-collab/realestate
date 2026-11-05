# Provjere, mjerenja i poznata ograničenja

Zapis stvarno izvedenih provjera. Nijedan broj ovdje nije procjena — svaki je
izmjeren u uvjetima opisanim uz njega.

**Datum provjere: 5. 11. 2026.** (prethodna: 15.–16. 10. 2026.)

---

## 1. Automatske provjere

| Provjera | Naredba | Rezultat |
| --- | --- | --- |
| Tipovi | `npm run typecheck` | prolazi, bez grešaka |
| Lint | `npm run lint` | prolazi, bez upozorenja |
| Testovi | `npm test` | **47 testova, 47 prolazi** |
| Produkcijski build | `npm run build` | prolazi, **33 stranice**, 26 URL-ova u sitemapu |

### Što testovi pokrivaju

Ciljaju stvarni rizik, ne postojanje naslova.

- **`money.test.ts`** — matematika rata. Uključuje primjere iz briefa za
  11.500 €: faze 4.600 + 3.450 + 3.450; 6 rata = predujam 3.450 € +
  5 × 1.341,67 € + zadnja 1.341,65 €; 12 rata = 4.600 € + 12 × 575 €. Uz to
  provjerava da se **svaki** raspored (8 iznosa × 4 predujma × 6 brojeva rata)
  zbraja točno na ugovorenu cijenu i da nijedna rata nije veća od prve.
- **`contact-schema.test.ts`** — validacija forme: prazna i prekratka poruka,
  neispravan email, nedostajuće ime, predugačka polja, podmetnute vrijednosti
  izvan objavljenih popisa, trimanje, i da newsletter privola nikad nije
  pretpostavljena.
- **`projects.test.ts`** — pravila objave: neodobren projekt ne može u javni
  popis ni biti dohvaćen po slugu, razvojna zastavica nema učinka u produkciji,
  nema placeholder teksta, nijedan „rezultat" nije neprovjerena brojka.
- **`estimate.test.ts`** — procjenitelj mora davati iste iznose kao cjenik:
  donja granica jednaka objavljenoj početnoj cijeni, veći opseg nikad ne
  smanjuje iznos, dodatak bez cijene se ne zbraja, mjesečni trošak se ne uvlači
  u cijenu projekta.
- **`rate-limit.test.ts`** — peti pokušaj prolazi, šesti ne, limit je po ključu,
  prozor se otvara nakon isteka.
- **`analytics.test.ts`** — analitika se ne učitava bez konfigurirane domene.

---

## 2. Responzivnost

**11 stranica × 5 širina (360, 390, 768, 1280, 1440) × 2 svijeta** —
automatizirani prolaz uz vizualni pregled.

- **Nema horizontalnog skrola** nigdje.
- Nema prelamanja riječi u naslovima.
- Cijene i oznaka „+ PDV" ostaju zajedno i čitljive na 360 px.

---

## 3. Pristupačnost

Provjereno na 11 stranica **u oba svijeta**:

- točno jedan `<h1>` po stranici, **bez preskakanja razina naslova**;
- sve kontrole forme imaju povezanu oznaku; svi gumbi i poveznice imaju ime;
- `html lang="hr"`;
- skip link je prvi tab stop i radi;
- `prefers-reduced-motion` uklanja gibanje, sadržaj ostaje vidljiv;
- **bez JavaScripta**: naslovnica i cijene i dalje se prikazuju.

**Lighthouse pristupačnost: 100 na svih 5 mjerenih stranica, u oba svijeta.**

### Tri greške pronađene ovom provjerom i popravljene

1. **`/projekti` preskakao razinu naslova** (h1 → h3) u oba svijeta.
   `ProjectCard` je uvijek bio `h3`; dobio je `headingLevel` prop i na toj
   stranici je sada `h2`.
2. **Svijetla naslovnica: hero izjava 1,59:1 prije skrola.** Riječi miruju na
   22 % tinte dok ih skrol ne otkrije — ispod 3:1 koliko veliki tekst traži.
   Podignuto na 50 % (3,34:1); efekt otkrivanja ostaje, samo kreće od čitljivog.
   Bez JS-a i uz reduced-motion tekst je i prije bio pun — problem je bio samo
   mirno stanje s uključenim JS-om.
3. **Svijetli CTA gumb 4,26:1.** Bijeli tekst 18 px na `--lx-display` `#9254ff`,
   a treba 4,5:1. Dobio je vlastiti token `--lx-cta` `#8a49f7` (4,80:1);
   `--lx-display` ostaje nepromijenjen jer nosi samo velik tekst.

Cilj je WCAG 2.2 AA kao razvojni kriterij. **To nije tvrdnja o provedenoj
formalnoj certifikaciji** ni o reviziji s korisnicima pomoćne tehnologije.

---

## 4. Performanse — izmjereno

Lighthouse 12, mobilni profil (390×844, DPR 2, ugrađena mrežna i CPU
regulacija), Chromium 1194, produkcijski standalone build posluživan lokalno.
Bez CDN-a i mrežne latencije.

| Stranica | Tamni | Svijetli | CLS |
| --- | --- | --- | --- |
| `/` | **88–91** | **81–87** | 0 |
| `/cjenik` | 92 | 92–97 | 0 |
| `/projekti` | 92–93 | 94–97 | 0 |
| `/o-meni` | 93 | 95 | 0 |
| `/kontakt` | 97 | 97–98 | 0 |

**Pristupačnost, best practices i SEO: 100** na svim mjerenim stranicama u oba
svijeta.

Naslovnice su mjerene **4 puta** jer je stroj dijeljen i rezultat varira ±5
bodova; zato su zapisani rasponi, ne jedan broj.

### Jedino mjesto ispod 90

Svijetla naslovnica: LCP **3,8–4,5 s** (cilj ≤2,5 s). Uzrok je identificiran —
intro ploče u `LightIntro.tsx` deklariraju `sizes="40rem"` fiksno, pa na
mobitelu uz DPR 2 Next traži varijantu od 1920 px (≈60 KB po slici).
Responzivan `sizes` za te ploče najjeftiniji je dobitak; intro je dekorativan
(`aria-hidden`, `inert`), pa se smije i odgoditi.

**Lab rezultat nije jamstvo terenskih metrika.** Ciljevi za stvarno mjerenje
(75. percentil): LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1.

---

## 5. Kontaktna forma — ručno testirani scenariji

Testirano u pregledniku protiv produkcijskog builda, protiv **lokalnog SMTP
servera**, da testni podaci ne odu na pravi sandučić ni trećoj strani.

| Scenarij | Rezultat |
| --- | --- |
| Ispravan upit, SMTP radi | ✅ mail isporučen: `to: matija@pinko.hr`, `reply-to` posjetitelja, hrvatski znakovi u naslovu ispravno kodirani |
| SMTP nije konfiguriran | ✅ pošteno „nije postavljeno", bez lažne potvrde |
| Server odbija poruku | ✅ log: `Slanje nije uspjelo (EMESSAGE)` |
| Server nedostupan | ✅ log: `SMTP veza nije uspjela (ESOCKET)` |
| Neispravan email / prazna / prekratka poruka / nedostaje ime | ✅ greška uz polje, na hrvatskom |
| Ponovljeno slanje (8×) | ✅ ograničenje nakon 5 |
| Odbijen upit | ✅ upisani tekst ostaje sačuvan |

**Logovi ne sadrže osobne podatke** — samo kod greške, nikad sadržaj upita.

---

## 6. SEO i indeksiranje

Provjeren **generirani HTML**, ne samo objekt u kodu.

- Svaka stranica ima jedinstven `<title>`, `description`, `canonical` i OG
  oznake.
- Sa `NEXT_PUBLIC_ALLOW_INDEXING=true`: `robots.txt` dopušta indeksiranje i
  navodi sitemap; stranice imaju `index, follow`.
- Bez te varijable: `robots.txt` je `Disallow: /`, stranice `noindex, nofollow`
  — staging se ne može slučajno indeksirati.
- Sitemap sadrži 26 URL-ova, samo stvarno objavljene rute.

---

## 7. Poznata ograničenja

1. **Web nije javno objavljen** — indeksiranje je i dalje zaključano.
2. **Redirect `pinko.hr` → `varel.io` nije maknut.** Zahvat u cPanelu.
3. **Slanje forme nije konfigurirano na produkciji** — bez SMTP varijabli forma
   to kaže i ne šalje ništa.
4. **Rok čuvanja podataka** na `/privatnost` nije dopunjen; stranica to piše.
5. **Jedan projekt nije odobren za objavu** (Bolero Drinks) plus otvorene
   stavke iz `LAUNCH-CHECKLIST.md`.
6. **Ograničenje učestalosti forme je u memoriji procesa.** Dovoljno za jednu
   instancu; za više instanci treba dijeljena pohrana.
7. **Rute su dinamične.** Zbog čitanja kolačića teme ne postoji potpuno statičan
   izlaz; postavke cachea na produkciji to moraju uzeti u obzir.
8. **Jedan jezik** — hrvatski.
9. **Mjerenja su lab, ne teren.** Bez stvarnog prometa nema terenskih podataka.
