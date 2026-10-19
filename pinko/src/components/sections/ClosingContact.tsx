import { ButtonLink } from "@/components/ui/Button";

/**
 * The closing call to action, on every page.
 *
 * Copy from the Light Mode 2.0 brief (section 10). Its number is 06, the
 * last of the six numbered sales sections — hosting and the FAQ are
 * deliberately unnumbered, which is also what stops "07" from appearing
 * before "06" as it used to.
 */
export function ClosingContact() {
  return (
    <section className="section border-y border-rule bg-accent-wash">
      <div className="wrap">
        <p className="mono-label mb-5 font-semibold text-ink-soft">
          <span className="text-accent">06</span> Ajmo riješiti taj problem
        </p>
        <h2 className="max-w-[24ch] text-(length:--text-hero) font-extrabold">
          Imate problem? Krasno. Već imamo nešto zajedničko.
        </h2>
        <div className="measure-wide mt-7 space-y-3.5 text-(length:--text-lead) text-ink-soft">
          <p>Možda Vam treba novi web.</p>
          <p>Možda webshop ne prodaje koliko bi mogao.</p>
          <p>Možda Vas marketing košta više nego što donosi.</p>
          <p>
            A možda imate poslovni proces koji funkcionira isključivo zato što
            Marija već 12 godina zna gdje treba kliknuti.
          </p>
          <p>
            Kakva god situacija bila, javite se. Ne morate znati koje
            tehnologije trebate. Dovoljno je da mi objasnite što želite
            postići.
          </p>
        </div>
        <div className="mt-9">
          <ButtonLink
            href="/kontakt"
            size="lg"
            className="bg-white text-ink hover:bg-accent-wash"
          >
            Matija, imam problem. Naravno da imam!{" "}
            <span aria-hidden="true">&rarr;</span>
          </ButtonLink>
        </div>
        <p className="mono-label mt-6 text-ink-soft">
          Bez obveze. Bez prodajnog cirkusa. Samo razgovor.
        </p>
      </div>
    </section>
  );
}
