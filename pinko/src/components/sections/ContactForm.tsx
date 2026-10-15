"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { submitContactForm } from "@/lib/actions/contact";
import { initialContactState } from "@/lib/contact-state";
import {
  budgetOptions,
  categoryOptions,
  timelineOptions,
} from "@/lib/contact-options";

export function ContactForm({ mailerReady }: { mailerReady: boolean }) {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialContactState
  );
  const [showMore, setShowMore] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const ids = {
    name: useId(),
    email: useId(),
    message: useId(),
    company: useId(),
    website: useId(),
    category: useId(),
    budget: useId(),
    timeline: useId(),
    newsletter: useId(),
  };

  // Move attention to the result so a screen reader and a keyboard user both
  // learn what happened without hunting for it.
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-(--radius-card) border border-rule bg-accent-wash p-7 md:p-9"
      >
        <h2 className="text-(length:--text-title) font-extrabold">
          {state.message}
        </h2>
        <p className="mt-4 text-ink-soft">
          Pročitat ću što ste napisali i javiti vam koji je sljedeći smislen
          korak.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-7">
      {!mailerReady ? (
        <p className="rounded-xl border border-control bg-surface p-4 text-sm">
          <strong>Napomena:</strong> slanje forme još nije postavljeno na ovom
          okruženju, pa upit neće biti poslan. Radije to pišem ovdje nego da
          vam prikažem lažnu potvrdu.
        </p>
      ) : null}

      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="assertive"
        className={state.status === "error" ? "" : "sr-only"}
      >
        {state.status === "error" ? (
          <p className="rounded-xl border border-ink bg-surface p-4 font-semibold">
            {state.message}
          </p>
        ) : null}
      </div>

      <Field
        id={ids.name}
        name="name"
        label="Ime i prezime"
        required
        autoComplete="name"
        defaultValue={state.values.name}
        error={state.errors.name}
      />

      <Field
        id={ids.email}
        name="email"
        type="email"
        label="Email"
        required
        autoComplete="email"
        defaultValue={state.values.email}
        error={state.errors.email}
      />

      <Field
        id={ids.message}
        name="message"
        label="Što želite poboljšati?"
        hint="Gdje ste zapeli, što vam radi najveću gužvu i kada biste voljeli krenuti."
        required
        textarea
        defaultValue={state.values.message}
        error={state.errors.message}
      />

      {/* Honeypot. Hidden from everyone, including screen readers. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="tvrtka_url">Ne ispunjavajte ovo polje</label>
        <input
          id="tvrtka_url"
          type="text"
          name="tvrtka_url"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="border-t border-rule pt-7">
        <button
          type="button"
          onClick={() => setShowMore((v) => !v)}
          aria-expanded={showMore}
          aria-controls="dodatni-detalji"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-control bg-surface px-5 text-[0.9375rem] font-semibold"
        >
          <span aria-hidden="true" className="text-accent">
            {showMore ? "–" : "+"}
          </span>
          {showMore ? "Sakrij dodatne detalje" : "Dodajte još detalja (nije obavezno)"}
        </button>

        <div
          id="dodatni-detalji"
          hidden={!showMore}
          className="mt-7 space-y-7"
        >
          <div className="grid gap-7 sm:grid-cols-2">
            <Field
              id={ids.company}
              name="company"
              label="Tvrtka"
              autoComplete="organization"
              defaultValue={state.values.company}
              error={state.errors.company}
            />
            <Field
              id={ids.website}
              name="website"
              label="Postojeći web"
              autoComplete="url"
              defaultValue={state.values.website}
              error={state.errors.website}
            />
          </div>

          <SelectField
            id={ids.category}
            name="category"
            label="Područje"
            placeholder="Odaberite ili preskočite"
            options={categoryOptions}
            defaultValue={state.values.category}
            error={state.errors.category}
          />

          <SelectField
            id={ids.budget}
            name="budget"
            label="Okvirni budžet"
            hint="Niži budžet ne znači automatsko „ne” — može odgovarati auditu ili manjem angažmanu."
            placeholder="Odaberite ili preskočite"
            options={budgetOptions}
            defaultValue={state.values.budget}
            error={state.errors.budget}
          />

          <SelectField
            id={ids.timeline}
            name="timeline"
            label="Kada biste krenuli"
            placeholder="Odaberite ili preskočite"
            options={timelineOptions}
            defaultValue={state.values.timeline}
            error={state.errors.timeline}
          />
        </div>
      </div>

      <div className="border-t border-rule pt-7">
        <label
          htmlFor={ids.newsletter}
          className="flex cursor-pointer gap-3 rounded-xl border border-control bg-surface p-4 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
        >
          <input
            id={ids.newsletter}
            type="checkbox"
            name="newsletter"
            defaultChecked={state.values.newsletter === "on"}
            className="mt-1 size-4 shrink-0 accent-[var(--color-accent)]"
          />
          <span>
            <span className="block font-semibold">
              Želim povremeno primati novosti emailom.
            </span>
            <span className="mt-1 block text-sm text-ink-soft">
              Zasebno i dobrovoljno. Slanje upita vas samo po sebi ne dodaje ni
              na kakvu listu.
            </span>
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-accent px-7 font-semibold text-white transition-colors hover:bg-accent-ink disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Šaljem…" : "Pošalji upit"}
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */

const fieldClasses =
  "w-full rounded-xl border bg-surface px-4 py-3 text-base " +
  "placeholder:text-ink-soft/70 focus:border-accent";

function Field({
  id,
  name,
  label,
  hint,
  error,
  required,
  textarea,
  type = "text",
  autoComplete,
  defaultValue,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  textarea?: boolean;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const shared = {
    id,
    name,
    required,
    autoComplete,
    defaultValue,
    "aria-describedby": describedBy,
    "aria-invalid": error ? (true as const) : undefined,
    className: `${fieldClasses} ${error ? "border-ink" : "border-control"}`,
  };

  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-sm font-medium text-ink-soft">
            nije obavezno
          </span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1.5 text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
      <div className="mt-2.5">
        {textarea ? (
          <textarea {...shared} rows={6} />
        ) : (
          <input {...shared} type={type} />
        )}
      </div>
      {error ? (
        <p id={errorId} className="mt-2 font-medium text-ink">
          <span aria-hidden="true" className="mr-1.5 text-accent">
            !
          </span>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  name,
  label,
  hint,
  error,
  placeholder,
  options,
  defaultValue,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  defaultValue?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
        <span className="ml-2 text-sm font-medium text-ink-soft">
          nije obavezno
        </span>
      </label>
      {hint ? (
        <p id={hintId} className="mt-1.5 text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
      <select
        id={id}
        name={name}
        defaultValue={defaultValue ?? ""}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={`mt-2.5 ${fieldClasses} ${
          error ? "border-ink" : "border-control"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} className="mt-2 font-medium text-ink">
          <span aria-hidden="true" className="mr-1.5 text-accent">
            !
          </span>
          {error}
        </p>
      ) : null}
    </div>
  );
}
