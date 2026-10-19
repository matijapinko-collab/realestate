import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Brief 11.8 / 6.2.
 *
 * Deliberately no fake server status lights and no specifications on the
 * homepage: what a buyer cares about is responsibility, backups, data
 * separation, growth and a clear price. The public wording in 6.2 still has to
 * be confirmed against the real setup before launch.
 */
export function Infrastructure() {
  return (
    <Section
      eyebrow="Hosting i održavanje"
      title="Napravili smo web. Super. A tko ga sad čuva?"
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="space-y-5 text-(length:--text-lead)">
          <p>
            Web ne prestaje trebati pažnju samo zato što je lansiran. Serveri,
            nadogradnje, sigurnosne kopije i održavanje nisu baš najuzbudljiviji
            dio digitalnog poslovanja. Ali postanu jako zanimljivi kad nešto
            prestane raditi.
          </p>
          <p className="text-ink-soft">
            Uz razvoj mogu preuzeti postavljanje i upravljanje hosting
            okruženjem: od Next.js aplikacija i baza podataka do postojećih
            WordPress i WooCommerce sustava. Radim s infrastrukturom pružatelja
            Hetzner i MyDataKnox, a okruženje biramo prema projektu, prometu i
            potrebama poslovanja.
          </p>
          <p className="text-ink-soft">
            Dogovaramo što se prati, koliko se često izrađuju sigurnosne kopije i
            kako izgleda održavanje. Kad projekt traži vlastito okruženje,
            planiramo ga zasebno.
          </p>
          <ButtonLink
            href="/usluge/development#hosting"
            variant="secondary"
            className="mt-2"
          >
            Hosting i Care paketi
          </ButtonLink>
        </div>

        <ul className="grid gap-px self-start overflow-hidden rounded-(--radius-card) border border-rule bg-rule">
          {[
            {
              title: "Odgovornost na jednom mjestu",
              body: "Jedan kontakt za razvoj i okruženje, bez prebacivanja krivice između dobavljača.",
            },
            {
              title: "Kopije i povrat",
              body: "Dogovoreni interval, zadržavanje i odvojena lokacija — uz probu vraćanja, jer backup nije uspješan samo zato što postoji cron.",
            },
            {
              title: "Jasna cijena",
              body: "Hosting i održavanje su dvije stavke. Vidite što plaćate i koliko sati zahvata je uključeno.",
            },
          ].map((item) => (
            <li key={item.title} className="bg-surface p-6">
              <h3 className="font-extrabold">{item.title}</h3>
              <p className="mt-2 text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
