/**
 * Deterministic estimator (brief 13).
 *
 * All rules live here and read from the same pricing config the price list
 * renders, so the estimator can never quote a number the cjenik does not show.
 * Nothing is generated or guessed: an add-on without a defined price returns
 * "prema opsegu" and is deliberately left out of the total rather than faked.
 */

import {
  devPackages,
  hostingPlans,
  marketingPackages,
  paymentModels,
  type DevPackage,
} from "@/config/pricing";
import { buildInstalmentPlan, buildPhasePlan, type InstalmentPlan } from "./money";

/** v1 offers only the base packages (brief: "procjenitelj može nuditi samo osnovne pakete"). */
export const estimatorPackages = devPackages;

export type SizeKey = "osnovni" | "prosiren" | "slozen";

export type SizeOption = {
  key: SizeKey;
  label: string;
  /** Multiplier applied to the package starting price. */
  factor: number;
  note: string;
};

/**
 * Size multipliers. These widen the published starting price into a range;
 * they never go below it, because the starting price is the stated minimum
 * scope the site publishes.
 */
export const sizeOptions: SizeOption[] = [
  {
    key: "osnovni",
    label: "Početni opseg",
    factor: 1,
    note: "Otprilike opseg opisan uz paket.",
  },
  {
    key: "prosiren",
    label: "Prošireni opseg",
    factor: 1.35,
    note: "Više predložaka, više sadržaja ili jedna dodatna integracija.",
  },
  {
    key: "slozen",
    label: "Složeni opseg",
    factor: 1.8,
    note: "Više tokova, složeniji podaci ili više sustava koje treba povezati.",
  },
];

/** The three clearly defined add-ons allowed in v1. */
export type AddOnKey = "dodatni-jezik" | "sadrzajni-paket" | "odrzavanje";

export type AddOn = {
  key: AddOnKey;
  label: string;
  description: string;
  /** One-off net amount added to the project price. */
  oneOff: number | null;
  /** Recurring net amount per month, kept separate from the project price. */
  monthly: number | null;
  /** Shown when there is no defined price — never counted into a total. */
  quoted?: string;
};

const contentPackage = marketingPackages.find(
  (p) => p.slug === "sadrzaj-koji-prodaje"
);
const carePlan = hostingPlans.find((p) => p.slug === "care");

export const addOns: AddOn[] = [
  {
    key: "dodatni-jezik",
    label: "Dodatni jezik",
    description:
      "Prijevod, druga jezična verzija i SEO postavke za nju. Cijena ovisi o količini sadržaja, pa se procjenjuje.",
    oneOff: null,
    monthly: null,
    quoted: "prema opsegu",
  },
  {
    key: "sadrzajni-paket",
    label: "Sadržajni paket",
    description:
      contentPackage?.scope ??
      "Do 5 ključnih stranica i ukupno do 4.000 riječi, radionica, istraživanje i 2 kruga revizija.",
    oneOff: contentPackage?.price.amount ?? null,
    monthly: null,
  },
  {
    key: "odrzavanje",
    label: "Mjesečno održavanje",
    description:
      carePlan?.limit ??
      "Jedan web, planirane nadogradnje i provjere te do 1 sat manjih zahvata.",
    oneOff: null,
    monthly: carePlan && "amount" in carePlan.price ? carePlan.price.amount : null,
  },
];

export type EstimateInput = {
  packageSlug: string;
  size: SizeKey;
  addOnKeys: AddOnKey[];
  paymentModelSlug: string | null;
};

export type Estimate = {
  pkg: DevPackage;
  /** Net project price range, excluding VAT. */
  projectFrom: number;
  projectTo: number;
  /** Recurring monthly net cost, kept separate from the project price. */
  monthly: number;
  /** Add-ons that have no defined price and are therefore not in the total. */
  quotedAddOns: { label: string; quoted: string }[];
  /** Assumptions, shown with the result. */
  assumptions: string[];
  /** Payment schedule for the lower bound of the range, when a model is chosen. */
  schedule:
    | { kind: "instalments"; plan: InstalmentPlan; modelName: string; rule: string }
    | { kind: "phases"; phasesCents: number[]; modelName: string; rule: string }
    | { kind: "unavailable"; reason: string }
    | null;
};

/** Range width around the computed point estimate. */
const RANGE_UPPER = 1.25;

export function buildEstimate(input: EstimateInput): Estimate | null {
  const pkg = estimatorPackages.find((p) => p.slug === input.packageSlug);
  const size = sizeOptions.find((s) => s.key === input.size);
  if (!pkg || !size) return null;

  const selected = addOns.filter((a) => input.addOnKeys.includes(a.key));

  const base = pkg.price.amount * size.factor;
  const oneOffAddOns = selected.reduce((sum, a) => sum + (a.oneOff ?? 0), 0);
  const monthly = selected.reduce((sum, a) => sum + (a.monthly ?? 0), 0);

  // Round to whole euros; a quote to the cent would pretend at a precision
  // this estimate does not have.
  const projectFrom = Math.round(base + oneOffAddOns);
  const projectTo = Math.round((base + oneOffAddOns) * RANGE_UPPER);

  const quotedAddOns = selected
    .filter((a) => a.quoted)
    .map((a) => ({ label: a.label, quoted: a.quoted as string }));

  const assumptions = [
    `Polazište je paket „${pkg.name}” i njegov početni opseg: ${pkg.scope}.`,
    `Odabrana veličina: ${size.label.toLowerCase()} — ${size.note}`,
    "Iznosi su bez PDV-a i ne uključuju troškove platformi, licenci, domena, vanjskih servisa i oglašavanja.",
    "Ovo je raspon za orijentaciju i nije obvezujuća ponuda. Konačna cijena slijedi nakon definiranja zahtjeva.",
  ];
  if (quotedAddOns.length > 0) {
    assumptions.push(
      `Nije uračunato jer ovisi o opsegu: ${quotedAddOns
        .map((a) => a.label.toLowerCase())
        .join(", ")}.`
    );
  }
  if (monthly > 0) {
    assumptions.push(
      "Mjesečni trošak prikazan je odvojeno i ne zbraja se s cijenom projekta."
    );
  }

  return {
    pkg,
    projectFrom,
    projectTo,
    monthly,
    quotedAddOns,
    assumptions,
    schedule: buildSchedule(projectFrom, input.paymentModelSlug),
  };
}

function buildSchedule(
  amount: number,
  modelSlug: string | null
): Estimate["schedule"] {
  if (!modelSlug) return null;
  const model = paymentModels.find((m) => m.slug === modelSlug);
  if (!model) return null;

  if (model.minAmount && amount < model.minAmount) {
    return {
      kind: "unavailable",
      reason: `Ovaj model predlažem za projekte od ${model.minAmount.toLocaleString(
        "hr-HR"
      )} € naviše.`,
    };
  }

  if (model.instalments === null) {
    return {
      kind: "phases",
      phasesCents: buildPhasePlan(amount, model.phases ?? [0.4, 0.3, 0.3]),
      modelName: model.name,
      rule: model.rule,
    };
  }

  return {
    kind: "instalments",
    plan: buildInstalmentPlan(amount, model.depositShare, model.instalments),
    modelName: model.name,
    rule: model.rule,
  };
}
