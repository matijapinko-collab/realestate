import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Usluge — web, webshop, automatizacije i marketing",
  description:
    "Web stranice i aplikacije, webshopovi, automatizacije i ERP te marketing i eCommerce rast. Radim stvari koje trebaju raditi.",
  alternates: { canonical: "/usluge" },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Naslovnica", path: "/" },
          { name: "Usluge", path: "/usluge" },
        ]}
      />
      <PageHeader
        eyebrow="Usluge"
        title="Kaj treba popraviti? Osim raspoloženja ponedjeljkom."
        lead={
          <>
            <p>
              Od webova i webshopova do automatizacija i marketinga. Radim
              stvari koje trebaju raditi. Revolucionaran koncept, znam.
            </p>
            <p className="mt-4">
              Ne morate uzeti sve. Većina suradnji počne s jednim problemom koji
              trenutno radi najveću gužvu.
            </p>
          </>
        }
        cta={{ href: "/kontakt", label: "Pronađite svoj početak" }}
        breadcrumbs={[
          { name: "Naslovnica", path: "/" },
          { name: "Usluge", path: "/usluge" },
        ]}
      />

      <Section>
        <ul className="grid gap-5 lg:grid-cols-2">
          {services.map((discipline) => (
            <li key={discipline.slug}>
              <Link
                href={`/usluge/${discipline.slug}`}
                className="group flex h-full flex-col rounded-(--radius-card) border border-rule bg-surface p-7 transition-colors hover:border-ink"
              >
                <span className="text-sm font-bold text-accent">
                  {discipline.index}
                </span>
                <h2 className="mt-3 text-(length:--text-title) font-extrabold group-hover:text-accent-ink">
                  {discipline.name}
                </h2>
                <p className="mt-3 font-semibold">{discipline.headline}</p>
                <p className="mt-4 text-ink-soft">{discipline.body[0]}</p>
                <ul className="mt-6 space-y-2">
                  {discipline.items.slice(0, 4).map((item) => (
                    <li
                      key={item.title}
                      className="flex gap-2.5 text-sm text-ink-soft"
                    >
                      <span aria-hidden="true" className="text-accent">
                        —
                      </span>
                      {item.title}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto pt-7 text-sm font-semibold text-accent-ink">
                  {discipline.cta}{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        tone="surface"
        eyebrow="Razgraničenje"
        title="Arhitektura ili Business Development?"
        lead="Dva različita pitanja, dvije različite isporuke — i nikad dvostruki račun za isti sat rada."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-(--radius-card) border border-rule bg-paper p-7">
            <h3 className="text-(length:--text-title) font-extrabold">
              Arhitektura
            </h3>
            <p className="mt-3 text-ink-soft">
              Odgovara <strong className="text-ink">kako sustav treba raditi</strong>:
              izbor komponenti, model podataka, izvori istine, ovlasti, troškovi,
              rizici i plan prelaska.
            </p>
          </div>
          <div className="rounded-(--radius-card) border border-rule bg-paper p-7">
            <h3 className="text-(length:--text-title) font-extrabold">
              Business Development
            </h3>
            <p className="mt-3 text-ink-soft">
              Odgovara{" "}
              <strong className="text-ink">
                što razvijati, kojim redom i s kojom ekonomikom
              </strong>
              : prioriteti, troškovni okvir, kanali i mjerila uspjeha.
            </p>
          </div>
        </div>
      </Section>

      <ClosingContact />
    </>
  );
}
