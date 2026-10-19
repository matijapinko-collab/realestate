import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { services } from "@/content/services";

/**
 * The services page, written as one long sales page (copy of 19 Oct 2026).
 *
 * Three services, each with its own blocks and its own call to action, and
 * then the four questions a visitor is actually asking by that point: does
 * he really do all this himself, do I have to take all three, what does it
 * cost, and what now. Matija's words throughout, Kajkavian included.
 *
 * Every heading here is a real heading in document order, so the page reads
 * the same way to a screen reader as it does on screen.
 */

export const metadata: Metadata = {
  title: "Usluge — development, marketing i business development",
  description:
    "Webovi, webshopovi, aplikacije, integracije, SEO, sadržaj, email, Amazon i Temu, audit, ERP i automatizacija poslovanja. Jedan čovjek, bez pokvarenog telefona.",
  alternates: { canonical: "/usluge" },
};

const crumbs = [
  { name: "Naslovnica", path: "/" },
  { name: "Usluge", path: "/usluge" },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />

      <PageHeader
        eyebrow="Usluge"
        title="Kaj ćemo danas spašavati?"
        lead={
          <>
            <p>
              Imate web koji ne radi, marketing koji ne prodaje ili poslovanje
              koje se drži na selotejpu i dobroj volji zaposlenika?
            </p>
            <p className="mt-4 font-extrabold text-ink">
              Pa di ste Vi meni bili do sad?!
            </p>
            <p className="mt-4">
              Ja sam Matija. Radim webove, webshopove, aplikacije, marketing i
              još hrpu stvari koje normalni ljudi ne bi dobrovoljno radili.
            </p>
            <p className="mt-4">
              A najbolje od svega? Kad nešto ne znam, prvo naučim. Ne pošaljem
              Vam račun za „strateško savjetovanje”.
            </p>
          </>
        }
        cta={{ href: "/kontakt", label: "Ajde, pokažite kaj Vas muči!" }}
        breadcrumbs={crumbs}
      />

      {services.map((service, serviceIndex) => (
        <Section
          key={service.slug}
          id={service.slug}
          tone={serviceIndex % 2 === 1 ? "surface" : undefined}
          eyebrow={service.name}
          index={service.index}
          title={service.headline}
          lead={
            <>
              {service.intro.map((paragraph, i) => (
                <p key={paragraph} className={i > 0 ? "mt-4" : undefined}>
                  {paragraph}
                </p>
              ))}
            </>
          }
        >
          <div className="grid gap-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule md:grid-cols-2">
            {service.blocks.map((block) => (
              <article
                key={block.title}
                data-reveal
                className="spotlight bg-paper p-6 md:p-7"
              >
                <h3 className="text-(length:--text-title) font-extrabold">
                  {block.title}
                </h3>
                <div className="mt-3 space-y-2.5 text-ink-soft">
                  {block.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href="/kontakt" size="lg">
              {service.cta} <span aria-hidden="true">&rarr;</span>
            </ButtonLink>
            <Link
              href={`/usluge/${service.slug}`}
              className="font-semibold text-accent-ink underline underline-offset-4"
            >
              Detaljan opseg i granice
            </Link>
          </div>
        </Section>
      ))}

      <Section
        eyebrow="Pošteno pitanje"
        title="Čekajte malo. Vi sve to radite sami?!"
        lead="Da. I još uvijek stignem popiti kavu."
      >
        <div className="measure-wide space-y-4 text-(length:--text-lead) text-ink-soft">
          <p>Dobro, ne baš sve u isto vrijeme.</p>
          <p>
            I ne tvrdim da sam najbolji developer, marketinški stručnjak i
            poslovni konzultant na svijetu. To bi bilo malo previše čak i za moj
            ego.
          </p>
          <p>
            Ali znam povezati stvari koje drugi često gledaju odvojeno. Jer čemu
            Vam savršen webshop ako skladište nema pojma što je prodano? Čemu
            Vam marketing koji dovodi kupce ako web ne radi? I čemu Vam novi ERP
            ako ste samo preselili stare probleme u skuplji program?
          </p>
          <p className="font-extrabold text-ink">
            Gledam cijelu sliku. Čak i kad nije baš lijepa.
          </p>
          <p>
            A ako za neki dio projekta trebam dodatnog stručnjaka, reći ću Vam.
            Nisam hobotnica. Iako bi mi dodatnih šest ruku dobro došlo.
          </p>
        </div>
      </Section>

      <Section
        tone="surface"
        eyebrow="Opseg"
        title="Moram uzeti sve tri usluge?"
        lead="Ne. Pa nisam teleoperater."
      >
        <div className="measure-wide space-y-4 text-(length:--text-lead) text-ink-soft">
          <p>
            Neću Vas nazvati za tri mjeseca i objasniti da ste propustili
            nevjerojatnu priliku jer niste uzeli Premium Ultra Business Digital
            paket.
          </p>
          <p>Trebate samo web? Radimo web.</p>
          <p>Trebate srediti Amazon? Sredit ćemo Amazon.</p>
          <p>
            Trebate nekoga da pogleda zakaj Vam pola firme funkcionira na
            principu „pitaj Mariju”? Može i to.
          </p>
          <p className="font-extrabold text-ink">
            Ne prodajem Vam ono kaj ne trebate. Imam dovoljno posla i bez
            izmišljanja novih problema.
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Cijena"
        title="Dobro, Matija. Koliko će me to koštati?"
        lead="Ovisi. Koliko ste uspjeli zakomplicirati?"
      >
        <div className="measure-wide space-y-4 text-(length:--text-lead) text-ink-soft">
          <p>Šalim se. Donekle.</p>
          <p>
            Cijena ovisi o tome što treba napraviti, koliko je projekt zahtjevan
            i koliko posla zapravo ima. Nekad je rješenje jednostavnije nego što
            mislite. Nekad otkrijemo da problem ima još tri problema.
          </p>
          <p>
            Ali prije nego što krenemo, znat ćete što radimo i koliko će Vas to
            koštati. Bez misterioznih stavki na računu. Bez „dodatnih
            konzultantskih sati” koji su se pojavili iz druge dimenzije.
          </p>
        </div>
        <ButtonLink href="/cjenik" variant="secondary" size="lg" className="mt-8">
          Pogledajte cijene. Bez nesvjestice, molim.{" "}
          <span aria-hidden="true">&rarr;</span>
        </ButtonLink>
      </Section>

      <Section tone="surface" eyebrow="I kaj sad?" title="Pa javite se, pobogu!">
        <div className="measure-wide space-y-4 text-(length:--text-lead) text-ink-soft">
          <p>
            Već ste došli do kraja stranice. Pročitali ste sve moje gluposti.
            Vjerojatno ste se barem jednom nasmijali. A možda ste čak pomislili:
            „Ovaj bi mi stvarno mogao pomoći.”
          </p>
          <p>Pa kaj čekamo?</p>
          <p>
            Recite mi što Vas muči. Ne morate pisati roman, ne morate znati
            programirati i ne morate se praviti da razumijete sve te tehničke
            izraze. To je moj posao. Vaš je da mi kažete što želite postići.
          </p>
        </div>
        <ButtonLink href="/kontakt" size="lg" className="mt-8">
          Matija, imam problem. Naravno da imam!{" "}
          <span aria-hidden="true">&rarr;</span>
        </ButtonLink>
        <p className="measure-wide mt-8 text-sm text-ink-soft italic">
          P.S. Ako Vam je prethodni izvođač rekao da je sve gotovo 95 %, a onda
          nestao, molim Vas da mi to odmah napišete. Volim horore s dobrim
          zapletom.
        </p>
      </Section>

      <ClosingContact />
    </>
  );
}
