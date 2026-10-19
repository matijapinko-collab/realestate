import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import { isMailerConfigured } from "@/lib/mailer";

const crumbs = [
  { name: "Naslovnica", path: "/" },
  { name: "Privatnost", path: "/privatnost" },
];

export const metadata: Metadata = {
  title: "Pravila privatnosti",
  description:
    "Koje podatke prikupljam kroz kontaktnu formu, zašto, tko im ima pristup i koliko dugo ih čuvam.",
  alternates: { canonical: "/privatnost" },
  robots: { index: false, follow: true },
};

/**
 * This page describes what the site actually does right now, and nothing else.
 *
 * The brief forbids generating legal compliance by default. Everything a
 * controller must declare but only Matija can confirm — the legal name, the
 * registered address, the OIB and the retention period — is omitted until the
 * data exists in config, and the page says plainly that it is still to be
 * confirmed. It is a factual description, not legal advice.
 */
export default function PrivacyPage() {
  const mailerReady = isMailerConfigured();
  const controllerKnown = Boolean(
    site.contact.legalName && site.contact.address && site.contact.oib
  );

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />

      <PageHeader
        eyebrow="Privatnost"
        title="Što radim s vašim podacima"
        lead={
          <p>
            Kratko i bez pravničkog maglenja: ovaj web prikuplja samo ono što
            upišete u kontaktnu formu, i to koristim za odgovor na vaš upit.
          </p>
        }
        breadcrumbs={crumbs}
      />

      <Section>
        <div className="measure-wide space-y-12">
          {!controllerKnown ? (
            <div className="rounded-(--radius-card) border border-control bg-accent-wash p-6">
              <h2 className="font-extrabold">Prije javne objave</h2>
              <p className="mt-2 text-ink-soft">
                Podaci o voditelju obrade (registrirani naziv obrta, poslovna
                adresa, OIB i kontakt) te rokovi čuvanja još nisu potvrđeni, pa
                ovdje namjerno ne stoje. Ova stranica opisuje stvarno ponašanje
                weba, ali nije potpuna pravna informacija dok se ti podaci ne
                dopune.
              </p>
            </div>
          ) : null}

          <Article title="Tko obrađuje podatke">
            <p>
              Voditelj obrade je{" "}
              {site.contact.legalName ?? "obrt Matije Pinka (naziv se dopunjuje)"}
              {site.contact.address ? `, ${site.contact.address}` : ""}
              {site.contact.oib ? `, OIB ${site.contact.oib}` : ""}.
            </p>
            {site.contact.email ? (
              <p className="mt-3">
                Za sva pitanja o podacima javite se na{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex min-h-6 items-center text-accent-ink underline underline-offset-4"
                >
                  {site.contact.email}
                </a>
                .
              </p>
            ) : null}
          </Article>

          <Article title="Koje podatke prikupljam">
            <p>Kroz kontaktnu formu prikupljam samo ono što sami upišete:</p>
            <ul className="mt-4 space-y-2">
              {[
                "obavezno: ime, email adresa i opis vaše potrebe",
                "neobavezno: tvrtka, postojeći web, područje, okvirni budžet i željeni rok",
                "neobavezno: privolu za primanje novosti emailom, ako je označite",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="shrink-0 text-accent">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Uz to se, kao i kod svakog web poslužitelja, pri slanju forme
              privremeno obrađuje vaša IP adresa. Koristim je isključivo za
              ograničavanje broja uzastopnih slanja (zaštita od zlouporabe) i ne
              pohranjujem je uz vaš upit.
            </p>
          </Article>

          <Article title="Zašto i na kojoj osnovi">
            <p>
              Podatke iz forme koristim da vam odgovorim i, ako se dogovorimo,
              pripremim ponudu. Pravna osnova je poduzimanje radnji na vaš
              zahtjev prije sklapanja ugovora.
            </p>
            <p className="mt-3">
              Newsletter je odvojena i dobrovoljna privola. Slanje poslovnog
              upita vas samo po sebi ne dodaje ni na kakvu marketinšku listu, a
              privolu možete povući u svakom trenutku.
            </p>
          </Article>

          <Article title="Tko još ima pristup">
            {mailerReady ? (
              <p>
                Upit se prosljeđuje emailom preko pružatelja usluge slanja
                emaila (Resend). Oni obrađuju sadržaj poruke isključivo radi
                isporuke. Drugim stranama ne prodajem i ne ustupam vaše podatke.
              </p>
            ) : (
              <p>
                Slanje forme trenutačno nije aktivno na ovom okruženju, pa se
                upiti ne prosljeđuju nikome. Kad se postavi pružatelj usluge
                slanja emaila, bit će imenovan ovdje.
              </p>
            )}
          </Article>

          <Article title="Koliko dugo čuvam podatke">
            <p>
              Prepisku o upitu čuvam <strong>12 mjeseci</strong> od zadnje
              komunikacije, a nakon toga je brišem. Ako iz upita nastane
              suradnja, dokumentacija o poslu čuva se dok traje ugovorni odnos i
              onoliko dugo koliko to nalažu računovodstveni i porezni propisi.
            </p>
          </Article>

          <Article title="Vaša prava">
            <p>
              Imate pravo zatražiti pristup svojim podacima, ispravak, brisanje
              ili ograničenje obrade te uložiti prigovor. Zahtjev pošaljite na
              kontakt naveden gore i odgovorit ću u razumnom roku. Pritužbu
              možete podnijeti i nadležnom nadzornom tijelu za zaštitu podataka.
            </p>
          </Article>

          <Article title="Kolačići i analitika">
            <p>
              Ovaj web ne koristi kolačiće za praćenje, ne postavlja reklamne
              piksele i ne učitava alate trećih strana za profiliranje. Font se
              poslužuje s ovog poslužitelja.
            </p>
            {site.analytics.domain ? (
              <>
                <p className="mt-3">
                  Posjećenost mjerim alatom <strong>Plausible Analytics</strong>{" "}
                  (Plausible Insights OÜ, Estonija). Plausible ne postavlja
                  kolačiće i ne koristi lokalnu pohranu preglednika, ne prati
                  vas po drugim webovima niti povezuje vaše posjete s uređajem.
                  IP adresa i podaci o pregledniku koriste se samo za izračun
                  dnevne, nepovratne oznake posjeta — u izvornom obliku ne
                  pohranjuju se.
                </p>
                <p className="mt-3">
                  Vidim isključivo zbirne brojke: koja je stranica otvorena,
                  odakle je posjet došao, okvirnu lokaciju (država, regija,
                  grad), vrstu uređaja, preglednik i zadržavanje na stranici.
                  Prema podacima pružatelja, obrada i pohrana ostaju unutar EU.
                </p>
                <p className="mt-3">
                  Zato za ovo mjerenje nema bannera za pristanak — nema osobnih
                  podataka na koje biste pristajali. Ako ipak ne želite da se
                  posjet broji, dovoljan je bilo koji blokator skripti;
                  stranica radi jednako.
                </p>
              </>
            ) : (
              <p className="mt-3">
                Ako se kasnije uvede analitika, ovdje će biti imenovana, a sve
                što nije nužno stvarno će se blokirati dok ne date pristanak —
                ukrasni banner bez blokade nije prihvatljiv.
              </p>
            )}
          </Article>
        </div>
      </Section>
    </>
  );
}

function Article({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article>
      <h2 className="text-(length:--text-title) font-extrabold">{title}</h2>
      <div className="mt-4 text-ink-soft">{children}</div>
    </article>
  );
}
