import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { disciplines } from "@/config/site";

export const metadata: Metadata = {
  title: "Usluge — razvoj, marketing i poslovni razvoj",
  description:
    "Tri područja i jedan povezan plan: Next.js razvoj i integracije, SEO, sadržaj i email te digitalni audit, plan rasta i vođenje razvoja.",
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
        title="Tri područja. Jedan povezan plan."
        lead={
          <>
            <p>
              Razvoj digitalnog proizvoda, privlačenje i zadržavanje kupaca te
              organizacija rasta. Isti čovjek povezuje područja, a svaki
              angažman ima zaseban opseg i vlastitu cijenu.
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
        <ul className="grid gap-5 lg:grid-cols-3">
          {disciplines.map((discipline) => (
            <li key={discipline.slug}>
              <Link
                href={discipline.href}
                className="group flex h-full flex-col rounded-(--radius-card) border border-rule bg-surface p-7 transition-colors hover:border-ink"
              >
                <span className="text-sm font-bold text-accent">
                  {discipline.index}
                </span>
                <h2 className="mt-3 text-(length:--text-title) font-extrabold group-hover:text-accent-ink">
                  {discipline.title}
                </h2>
                <p className="mt-3 font-semibold">{discipline.headline}</p>
                <p className="mt-4 text-ink-soft">{discipline.claim}</p>
                <ul className="mt-6 space-y-2">
                  {discipline.highlights.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                      <span aria-hidden="true" className="text-accent">
                        —
                      </span>
                      {item}
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
