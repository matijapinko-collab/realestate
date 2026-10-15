import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
          <span className="text-accent">404</span>
        </p>
        <h1 className="mt-5 max-w-[16ch] text-(length:--text-hero) font-extrabold">
          Ove stranice nema.
        </h1>
        <p className="measure mt-7 text-(length:--text-lead) text-ink-soft">
          Možda je poveznica stara ili je adresa krivo prepisana. Krenimo od
          nečega što sigurno postoji.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Na naslovnicu
          </ButtonLink>
          <ButtonLink href="/usluge" variant="secondary" size="lg">
            Pogledajte usluge
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
