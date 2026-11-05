/**
 * Money formatting and instalment maths.
 *
 * All amounts in this module are NET (excluding VAT). Everything is computed in
 * integer cents so the published schedule always adds back up to the contracted
 * price — the brief is explicit that the final instalment absorbs the rounding.
 */

export const CENTS = 100;

export function toCents(amount: number): number {
  return Math.round(amount * CENTS);
}

export function fromCents(cents: number): number {
  return cents / CENTS;
}

const wholeEuroFormatter = new Intl.NumberFormat("hr-HR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const centsFormatter = new Intl.NumberFormat("hr-HR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Formats an amount in euros, Croatian style (1.341,67 €).
 * Whole amounts drop the decimals; anything with cents keeps both digits.
 */
export function formatEur(amount: number): string {
  const cents = toCents(amount);
  const isWhole = cents % CENTS === 0;
  const body = isWhole
    ? wholeEuroFormatter.format(fromCents(cents))
    : centsFormatter.format(fromCents(cents));
  return `${body} €`;
}

/** Formats cents directly, for schedules built in integer cents. */
export function formatEurFromCents(cents: number): string {
  return formatEur(fromCents(cents));
}

export function vatAmount(net: number, rate: number): number {
  return fromCents(Math.round(toCents(net) * rate));
}

export function grossAmount(net: number, rate: number): number {
  return fromCents(toCents(net) + toCents(vatAmount(net, rate)));
}

/* ------------------------------------------------------------------ */

export type InstalmentPlan = {
  /** Contracted net price, in cents. */
  totalCents: number;
  /** Deposit, in cents. */
  depositCents: number;
  /** The part split into monthly instalments, in cents. */
  remainderCents: number;
  /**
   * Each monthly instalment, in cents, in order. All but the last are equal;
   * the last absorbs the rounding difference and is never larger than the rest.
   */
  instalmentsCents: number[];
};

/**
 * Splits a contracted price into a deposit plus `count` monthly instalments.
 *
 * Each instalment is rounded UP to the cent, so the final one is the smallest
 * and the schedule sums exactly to the contracted price. For 11.500 € with a
 * 30% deposit over 6 instalments this gives 3.450 € + 5 × 1.341,67 € +
 * 1.341,65 €, which is the worked example in the brief.
 */
export function buildInstalmentPlan(
  totalNet: number,
  depositShare: number,
  count: number
): InstalmentPlan {
  if (!Number.isFinite(totalNet) || totalNet <= 0) {
    throw new RangeError("Ugovorena cijena mora biti veća od nule.");
  }
  if (depositShare < 0 || depositShare >= 1) {
    throw new RangeError("Predujam mora biti između 0 i 100 posto.");
  }
  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError("Broj rata mora biti cijeli broj, najmanje 1.");
  }

  const totalCents = toCents(totalNet);
  const depositCents = Math.round(totalCents * depositShare);
  const remainderCents = totalCents - depositCents;

  if (remainderCents < count) {
    // Fewer cents than instalments: nothing sensible to split.
    throw new RangeError(
      "Preostali iznos je previše mali za odabrani broj rata."
    );
  }

  const base = Math.ceil(remainderCents / count);
  const instalmentsCents: number[] = [];
  for (let i = 0; i < count - 1; i += 1) {
    instalmentsCents.push(base);
  }
  instalmentsCents.push(remainderCents - base * (count - 1));

  return { totalCents, depositCents, remainderCents, instalmentsCents };
}

/**
 * Splits a contracted price into phase payments by share.
 * The last phase absorbs rounding so the phases sum to the contracted price.
 */
export function buildPhasePlan(totalNet: number, shares: number[]): number[] {
  if (shares.length === 0) {
    throw new RangeError("Potreban je najmanje jedan udio faze.");
  }
  const sum = shares.reduce((acc, share) => acc + share, 0);
  if (Math.abs(sum - 1) > 1e-9) {
    throw new RangeError("Udjeli faza moraju činiti 100 posto.");
  }

  const totalCents = toCents(totalNet);
  const phases: number[] = [];
  let assigned = 0;
  for (let i = 0; i < shares.length - 1; i += 1) {
    const cents = Math.round(totalCents * (shares[i] as number));
    phases.push(cents);
    assigned += cents;
  }
  phases.push(totalCents - assigned);
  return phases;
}

/** True when every instalment but the last is identical. */
export function describeInstalments(plan: InstalmentPlan): {
  repeated: { count: number; cents: number } | null;
  last: number;
} {
  const { instalmentsCents } = plan;
  const last = instalmentsCents[instalmentsCents.length - 1] as number;
  if (instalmentsCents.length === 1) {
    return { repeated: null, last };
  }
  const head = instalmentsCents[0] as number;
  return { repeated: { count: instalmentsCents.length - 1, cents: head }, last };
}
