import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Hosting and maintenance.
 *
 * Matija's copy of 19 Oct 2026, word for word. Still no fake server status
 * lights and no uptime percentage: what this section promises is a named
 * person, a backup that has been restored at least once, and a price with
 * nothing hidden in it. Those are promises he can keep.
 */

const POINTS = [
  {
    index: "01",
    title: "Jedan čovjek. Isti broj već 20 godina. Uvijek se javim.",
    body: [
      "Kad web krepa, nećete slušati kako hosting tvrdi da je kriv developer, a developer da je kriv hosting.",
      "Zovete mene.",
      "Dobro, možda prvo malo opsujete. Ali onda zovete mene.",
    ],
  },
  {
    index: "02",
    title: "Backup postoji. I stvarno ga znamo vratiti.",
    body: [
      "Znate kaj je gore od toga da izgubite podatke? Da shvatite da imate backup koji ne radi.",
      "Zato dogovaramo koliko često se rade sigurnosne kopije, gdje ih čuvamo i kako provjeravamo povrat.",
      "Jer „imam backup” i „mogu vratiti web” nisu baš ista stvar.",
    ],
  },
  {
    index: "03",
    title: "Plaćate hosting. Ne moje lijepe oči.",
    body: [
      "Hosting je hosting. Održavanje je održavanje. Unaprijed dogovaramo kaj je uključeno, koliko sati podrške imate i koliko sve to košta.",
      "Bez misterioznih naknada, iznenadnih računa i stavke administrativna obrada servera od 300 eura.",
      "Ako nešto dodatno treba napraviti, prvo se dogovorimo.",
    ],
  },
];

export function Infrastructure() {
  return (
    <Section
      eyebrow="Hosting i održavanje"
      title="Web je lansiran. Šampanjac je otvoren. A sad se molimo da ne krepa?"
      lead={
        <>
          <p className="font-extrabold text-ink">E pa nećemo baš tako.</p>
          <p className="mt-4">
            Napraviti web je jedna stvar. Pobrinuti se da radi i sutra, i
            prekosutra, i onda kad ga netko odluči posjetiti u tri ujutro je
            sasvim druga.
          </p>
          <p className="mt-4">
            Serveri, baze podataka, sigurnosne kopije, nadogradnje i ostale
            divote koje nitko ne primjećuje dok sve radi. A kad prestane
            raditi? Odjednom svi znaju moj broj.
          </p>
          <p className="mt-4">
            Srećom, mene moji klijenti zovu samo da si čestitamo praznike ili
            dogovorimo nove usluge. Uz vrhunsko iskustvo i znanje, ne morate
            očekivati probleme, nego ćete zaboraviti kako problemi s webom
            izgledaju!
          </p>
          <p className="mt-4">
            Bilo da imate Next.js aplikaciju, WordPress, WooCommerce ili nekaj
            sasvim deseto, mogu Vam složiti hosting i održavanje prema stvarnim
            potrebama projekta. Ne brinite, radim s profesionalnom
            infrastrukturom, ne s praznim obećanjima.
          </p>
        </>
      }
    >
      <ul className="grid gap-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule lg:grid-cols-3">
        {POINTS.map((point, i) => (
          <li
            key={point.index}
            data-reveal
            data-reveal-delay={i}
            className="spotlight bg-surface p-6 md:p-7"
          >
            <p className="mono-label font-semibold text-accent">
              {point.index}
            </p>
            <h3 className="mt-2 text-(length:--text-title) font-extrabold">
              {point.title}
            </h3>
            <div className="mt-3 space-y-2.5 text-ink-soft">
              {point.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ButtonLink href="/kontakt" size="lg">
          Matija, čuvaj mi web od katastrofe{" "}
          <span aria-hidden="true">&rarr;</span>
        </ButtonLink>
        <Link
          href="/usluge/development#hosting"
          className="inline-flex min-h-6 items-center font-semibold text-accent-ink underline underline-offset-4"
        >
          Hosting i Care paketi
        </Link>
      </div>
    </Section>
  );
}
