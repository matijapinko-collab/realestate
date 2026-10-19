import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { PackageTable } from "@/components/sections/PackageTable";
import { DevPackageCard } from "@/components/sections/DevPackageCard";
import { Estimator } from "@/components/sections/Estimator";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { PriceTag } from "@/components/ui/Price";
import { formatEur } from "@/lib/money";
import {
  bizDevPackages,
  devPackages,
  discoveryNote,
  hostingPlans,
  hostingTerms,
  hourlyRates,
  hourlyTerms,
  marketingAddOns,
  marketingPackages,
  marketingTerms,
  monthlyPackages,
  monthlyTerms,
  paymentModels,
  paymentTerms,
  smallEngagements,
  timelineNote,
  warrantyNote,
} from "@/config/pricing";

const crumbs = [
  { name: "Naslovnica", path: "/" },
  { name: "Cjenik", path: "/cjenik" },
];

export const metadata: Metadata = {
  title: "Cjenik — paketi, satnice i uvjeti",
  description:
    "Development, marketing i business development paketi, satnice od 50 €/h za programiranje, hosting i održavanje te modeli plaćanja na rate. Sve cijene bez PDV-a.",
  alternates: { canonical: "/cjenik" },
};

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />

      <PageHeader
        eyebrow="Cjenik"
        title="Koliko košta? Manje od loše odluke."
        lead={
          <>
            <p>
              Nisam najjeftiniji. Nisam ni pokušavao biti. Ako želite najnižu
              cijenu, internet je prepun zanimljivih ponuda. Ako želite nekoga
              tko će razumjeti što radite, postaviti prava pitanja i preuzeti
              odgovornost za dogovoreni posao, nastavite čitati.
            </p>
            <p className="mt-4">
              Sve cijene su bez PDV-a. „Od” označava navedeni početni opseg, a
              konačna ponuda slijedi nakon što definiramo zahtjeve. Troškovi
              platformi, licenci, domena, vanjskih servisa i oglašavanja
              navode se zasebno.
            </p>
            <p className="mt-4">
              Objavljeni cjenik je stvarna spremnost na prodaju navedenog
              opsega po toj cijeni.
            </p>
          </>
        }
        cta={{ href: "/kontakt", label: "Zatražite procjenu" }}
        breadcrumbs={crumbs}
      />

      <Section
        id="procjenitelj"
        eyebrow="Procjenitelj"
        index="01"
        title="Složite okvirni raspon u minuti."
        lead="Rezultat je raspon i sažetak pretpostavki, a ne obvezujuća ponuda. Računa po istim pravilima po kojima je napisan ovaj cjenik."
      >
        <Estimator />
      </Section>

      <Section
        id="development"
        tone="surface"
        eyebrow="Development"
        index="02"
        title="Development paketi"
        lead={timelineNote}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {devPackages.map((pkg) => (
            <DevPackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
        <p className="measure-wide mt-8 text-sm text-ink-soft">{warrantyNote}</p>

        <h3 className="mt-16 text-(length:--text-title) font-extrabold">
          Manji development angažmani
        </h3>
        <p className="measure-wide mt-3 text-ink-soft">{discoveryNote}</p>
        <div className="mt-7">
          <PackageTable
            rows={smallEngagements.map((item) => ({
              name: item.name,
              price: item.price,
              detail: item.limit,
            }))}
          />
        </div>
      </Section>

      <Section
        id="marketing"
        eyebrow="Marketing"
        index="03"
        title="Marketing paketi"
      >
        <PackageTable
          rows={[
            ...marketingPackages.map((p) => ({
              name: p.name,
              price: p.price,
              detail: p.scope,
              extra: `Model: ${p.model}`,
            })),
            ...marketingAddOns.map((p) => ({
              name: `${p.name} (dodatak)`,
              price: p.price,
              detail: p.scope,
            })),
          ]}
        />
        <ul className="measure-wide mt-8 space-y-3 text-sm text-ink-soft">
          {marketingTerms.map((term) => (
            <li key={term} className="flex gap-3">
              <span aria-hidden="true" className="shrink-0 text-accent">
                ·
              </span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="business-development"
        tone="surface"
        eyebrow="Business Development"
        index="04"
        title="Business Development paketi"
      >
        <PackageTable
          rows={bizDevPackages.map((p) => ({
            name: p.name,
            price: p.price,
            detail: p.delivers,
            extra: `Za koga je: ${p.forWhom}`,
          }))}
        />
      </Section>

      <Section
        id="mjesecno"
        eyebrow="Mjesečna suradnja"
        index="05"
        title="Kombinirani mjesečni angažmani"
        lead="Rezervacija kapaciteta i izravna suradnja sa mnom — ne paket jeftinijih programerskih sati."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {monthlyPackages.map((plan) => (
            <article
              key={plan.slug}
              className="flex flex-col rounded-(--radius-card) border border-rule bg-surface p-7"
            >
              <h3 className="text-(length:--text-title) font-extrabold">
                {plan.name}
              </h3>
              <div className="mt-4">
                <PriceTag price={plan.price} size="lg" />
              </div>
              <p className="mt-5 text-ink-soft">{plan.capacity}</p>
              <p className="mt-auto pt-6 text-sm text-ink-soft">
                <span className="font-semibold text-ink">Sastanci: </span>
                {plan.meetings}
              </p>
            </article>
          ))}
        </div>
        <ul className="measure-wide mt-10 space-y-3 text-sm text-ink-soft">
          {monthlyTerms.map((term) => (
            <li key={term} className="flex gap-3">
              <span aria-hidden="true" className="shrink-0 text-accent">
                ·
              </span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="satnice"
        tone="surface"
        eyebrow="Satnice"
        index="06"
        title="Kad se radi po satu"
        lead="U istom vremenu naplaćuje se jedna vrsta rada. Paket nije „kupljeni sati” — uključuje više vrsta rada i definiranu isporuku."
      >
        <ul className="overflow-hidden rounded-(--radius-card) border border-rule">
          {hourlyRates.map((rate, i) => (
            <li
              key={rate.slug}
              className={`bg-paper p-6 ${i > 0 ? "border-t border-rule" : ""}`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="text-lg font-extrabold">{rate.kind}</h3>
                <p className="shrink-0">
                  <span className="text-2xl font-extrabold tracking-tight">
                    {formatEur(rate.rate)}
                    <span className="text-[0.6em] font-bold text-ink-soft">
                      /h
                    </span>
                  </span>
                  <span className="ml-1.5 text-sm font-medium text-ink-soft">
                    + PDV
                  </span>
                </p>
              </div>
              <p className="mt-2 text-ink-soft">{rate.billedFor}</p>
            </li>
          ))}
        </ul>
        <ul className="measure-wide mt-8 space-y-3 text-sm text-ink-soft">
          {hourlyTerms.map((term) => (
            <li key={term} className="flex gap-3">
              <span aria-hidden="true" className="shrink-0 text-accent">
                ·
              </span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="hosting"
        eyebrow="Hosting i održavanje"
        index="07"
        title="Hosting i Care paketi"
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <PackageTable
            caption="Hosting i upravljano okruženje"
            rows={hostingPlans
              .filter((p) => p.group === "hosting")
              .map((p) => ({
                name: p.name,
                price: p.price,
                detail: p.limit,
                extra: p.infraNote,
              }))}
          />
          <PackageTable
            caption="Održavanje"
            rows={hostingPlans
              .filter((p) => p.group === "care")
              .map((p) => ({ name: p.name, price: p.price, detail: p.limit }))}
          />
        </div>
        <ul className="measure-wide mt-10 space-y-3 text-sm text-ink-soft">
          {hostingTerms.map((term) => (
            <li key={term} className="flex gap-3">
              <span aria-hidden="true" className="shrink-0 text-accent">
                ·
              </span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="placanje"
        tone="surface"
        eyebrow="Plaćanje"
        index="08"
        title="Da, može na rate. Ne, ne može na lijepe oči."
        lead="Moguće je plaćanje po fazama, do 6 mjesečnih rata prema dogovoru te do 12 rata za veće projekte. Možemo dogovoriti i početnu izradu uz mjesečni razvoj i podršku."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {paymentModels.map((model) => (
            <article
              key={model.slug}
              className="rounded-(--radius-card) border border-rule bg-paper p-7"
            >
              <h3 className="text-(length:--text-title) font-extrabold">
                {model.name}
              </h3>
              <p className="mt-3 text-ink-soft">{model.rule}</p>
            </article>
          ))}
        </div>
        <ul className="measure-wide mt-10 space-y-3 text-sm text-ink-soft">
          {paymentTerms.map((term) => (
            <li key={term} className="flex gap-3">
              <span aria-hidden="true" className="shrink-0 text-accent">
                ·
              </span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingContact />
    </>
  );
}
