import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Faq } from "@/components/sections/Faq";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { processSteps } from "@/content/copy";
import { paymentModels, paymentTerms, warrantyNote } from "@/config/pricing";

const crumbs = [
  { name: "Naslovnica", path: "/" },
  { name: "Kako radim", path: "/kako-radim" },
];

export const metadata: Metadata = {
  title: "Kako radim — faze, komunikacija i prihvat",
  description:
    "Od prve kave do prve verzije: kako izgledaju faze projekta, što dobivate nakon svake, kako komuniciramo i kako se potvrđuje prihvat.",
  alternates: { canonical: "/kako-radim" },
};

export default function HowIWorkPage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />

      <PageHeader
        eyebrow="Kako radim"
        title="Od prve kave do prve verzije. I dalje."
        lead={
          <p>
            Kava je dobrodošla. Prezentacija od 87 slajdova nije obavezna. Ovdje
            piše što se stvarno događa u svakoj fazi i što iz nje dobivate —
            bez skrivanja rada iza nejasnog „našeg procesa”.
          </p>
        }
        cta={{ href: "/kontakt", label: "Krenimo od razgovora" }}
        breadcrumbs={crumbs}
      />

      <Section eyebrow="Faze" index="01" title="Četiri faze, bez iznenađenja">
        <ol className="border-t border-rule">
          {processSteps.map((step) => (
            <li
              key={step.index}
              className="grid gap-4 border-b border-rule py-9 md:grid-cols-[auto_1fr_1fr] md:gap-10"
            >
              <span className="text-sm font-bold text-accent md:pt-1.5">
                {step.index}
              </span>
              <div>
                <h2 className="text-(length:--text-title) font-extrabold">
                  {step.title}
                </h2>
                <p className="mt-3 text-ink-soft">{step.body}</p>
              </div>
              <div className="rounded-(--radius-card) border border-rule bg-surface p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Što dobivate
                </h3>
                <p className="mt-2">{step.output}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        tone="surface"
        eyebrow="Komunikacija"
        index="02"
        title="Kako izgleda svakodnevni rad"
      >
        <ul className="grid gap-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule md:grid-cols-2">
          {[
            {
              title: "Razgovarate izravno sa mnom",
              body: "Nema posrednika koji prenosi poruke. Ako nešto ne razumijete, pitajte — objasnit ću bez kratica.",
            },
            {
              title: "Dogovoreni ritam javljanja",
              body: "Na početku dogovorimo koliko često se čujemo i kroz koji kanal. Hitno i važno nije isto.",
            },
            {
              title: "Jedan popis prioriteta",
              body: "Sve što radimo stoji na jednom mjestu, poredano. Novi zahtjev ne ulazi tiho — vidi se što time ispada.",
            },
            {
              title: "Izmjene opsega se vide",
              body: "Ako zahtjev izlazi iz dogovorenog opsega, reći ću to prije nego počnem, s procjenom.",
            },
          ].map((item) => (
            <li key={item.title} className="bg-paper p-6 md:p-7">
              <h3 className="text-lg font-extrabold">{item.title}</h3>
              <p className="mt-2 text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Prihvat i jamstvo"
        index="03"
        title="Kako znamo da je gotovo"
        lead="Prije početka dogovorimo kriterije prihvata. Gotovo znači da je ispunjeno ono što smo zapisali, a ne osjećaj."
      >
        <div className="measure-wide rounded-(--radius-card) border border-rule bg-accent-wash p-7">
          <p>{warrantyNote}</p>
          <p className="mt-4 text-sm text-ink-soft">
            To je komercijalna politika za ugovor, a ne obećanje neograničenog
            održavanja.
          </p>
        </div>
      </Section>

      <Section
        tone="surface"
        eyebrow="Plaćanje"
        index="04"
        title="Raspored plaćanja dogovaramo prije početka"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {paymentModels.map((model) => (
            <article
              key={model.slug}
              className="rounded-(--radius-card) border border-rule bg-paper p-7"
            >
              <h3 className="text-lg font-extrabold">{model.name}</h3>
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

      <Faq title="Što ljudi obično još pitaju" />

      <ClosingContact />
    </>
  );
}
