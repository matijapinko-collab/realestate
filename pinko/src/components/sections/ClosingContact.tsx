import { ButtonLink } from "@/components/ui/Button";

/** Brief 11.10. */
export function ClosingContact() {
  return (
    <section className="section border-y border-rule bg-accent-wash">
      <div className="wrap">
        <p className="mono-label mb-5 font-semibold text-ink-soft">
          <span className="text-accent">08</span> Kontakt
        </p>
        <h2 className="max-w-[20ch] text-(length:--text-hero) font-extrabold">
          Što vam je već predugo na „trebalo bi”?
        </h2>
        <p className="measure-wide mt-7 text-(length:--text-lead) text-ink-soft">
          Pošaljite mi što želite poboljšati, gdje ste zapeli i kada biste
          voljeli krenuti. Javit ću vam koji je sljedeći smislen korak.
        </p>
        <div className="mt-9">
          <ButtonLink
            href="/kontakt"
            size="lg"
            className="bg-white text-ink hover:bg-accent-wash"
          >
            Ispričajte mi ideju
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
