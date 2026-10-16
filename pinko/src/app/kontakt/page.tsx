import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { isMailerConfigured } from "@/lib/mailer";
import { site } from "@/config/site";

const crumbs = [
  { name: "Naslovnica", path: "/" },
  { name: "Kontakt", path: "/kontakt" },
];

export const metadata: Metadata = {
  title: "Kontakt — ispričajte mi ideju",
  description:
    "Pošaljite što želite poboljšati, gdje ste zapeli i kada biste voljeli krenuti. Javit ću vam koji je sljedeći smislen korak.",
  alternates: { canonical: "/kontakt" },
};

export default function ContactPage() {
  const mailerReady = isMailerConfigured();

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />

      <PageHeader
        eyebrow="Kontakt"
        title="Što vam je već predugo na „trebalo bi”?"
        lead={
          <p>
            Pošaljite mi što želite poboljšati, gdje ste zapeli i kada biste
            voljeli krenuti. Trebaju mi samo ime, email i nekoliko rečenica —
            ostalo je neobavezno.
          </p>
        }
        breadcrumbs={crumbs}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <ContactForm mailerReady={mailerReady} />
          </div>

          <aside className="lg:pt-2">
            <div className="rounded-(--radius-card) border border-rule bg-surface p-6 md:p-7">
              <h2 className="text-(length:--text-title) font-extrabold">
                Što se događa nakon slanja
              </h2>
              <ol className="mt-5 space-y-4">
                {[
                  "Pročitam što ste napisali i pogledam postojeći web ako ste ga naveli.",
                  "Javim vam je li to posao za projekt, manji angažman ili samo savjet.",
                  "Ako ima smisla, dogovorimo kratki razgovor za upoznavanje.",
                ].map((item, i) => (
                  <li key={item} className="flex gap-3.5">
                    <span className="shrink-0 text-sm font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink-soft">{item}</span>
                  </li>
                ))}
              </ol>

              {site.responseTime ? (
                <p className="mt-6 border-t border-rule pt-5 text-sm text-ink-soft">
                  <span className="font-semibold text-ink">Rok odgovora: </span>
                  {site.responseTime}
                </p>
              ) : null}

              <p className="mt-6 border-t border-rule pt-5 text-sm text-ink-soft">
                Planirani razgovor za upoznavanje do 20 minuta je besplatan i ne
                uključuje audit ili pisanu strategiju.
              </p>

              {site.contact.email || site.contact.phone ? (
                <div className="mt-6 border-t border-rule pt-5">
                  <h3 className="text-sm font-semibold">
                    Ne volite forme? Javite se izravno.
                  </h3>
                  <ul className="mt-2.5 space-y-1.5 text-sm">
                    {site.contact.email ? (
                      <li>
                        <a
                          href={`mailto:${site.contact.email}`}
                          className="text-accent-ink underline underline-offset-4"
                        >
                          {site.contact.email}
                        </a>
                      </li>
                    ) : null}
                    {site.contact.phone ? (
                      <li>
                        <a
                          href={`tel:${site.contact.phoneHref}`}
                          className="text-accent-ink underline underline-offset-4"
                        >
                          {site.contact.phone}
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </div>
              ) : null}
            </div>

            <p className="mt-6 text-sm text-ink-soft">
              Podatke iz forme koristim isključivo za odgovor na vaš upit. Više
              u{" "}
              <a
                href="/privatnost"
                className="text-accent-ink underline underline-offset-4"
              >
                pravilima privatnosti
              </a>
              .
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
