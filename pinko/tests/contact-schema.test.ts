import { strict as assert } from "node:assert";
import test from "node:test";
import { parseContactForm } from "../src/lib/contact-schema.ts";
import { site } from "../src/config/site.ts";

const valid = {
  name: "Ana Anić",
  email: "ana@primjer.hr",
  message: "Trebamo novi webshop jer nam je postojeći spor i teško se uređuje.",
  company: "",
  website: "",
  category: "",
  budget: "",
  timeline: "",
  newsletter: false,
};

test("a complete minimal enquiry passes", () => {
  const result = parseContactForm(valid);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.data.name, "Ana Anić");
  assert.equal(result.data.newsletter, false);
  // Empty optional fields become undefined, not empty strings.
  assert.equal(result.data.company, undefined);
  assert.equal(result.data.category, undefined);
});

test("an invalid email is rejected with a Croatian message", () => {
  const result = parseContactForm({ ...valid, email: "ana(at)primjer" });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.ok(result.errors.email);
  assert.match(result.errors.email, /email/i);
});

test("a missing email is rejected", () => {
  const result = parseContactForm({ ...valid, email: "   " });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.ok(result.errors.email);
});

test("an empty or too short message is rejected", () => {
  for (const message of ["", "   ", "Bok", "Trebam web."]) {
    const result = parseContactForm({ ...valid, message });
    assert.equal(result.ok, false, `message=${JSON.stringify(message)}`);
    if (result.ok) continue;
    assert.ok(result.errors.message);
  }
});

test("a missing name is rejected", () => {
  const result = parseContactForm({ ...valid, name: "A" });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.ok(result.errors.name);
});

test("oversized fields are rejected rather than truncated", () => {
  const long = "x".repeat(5001);
  const result = parseContactForm({ ...valid, message: long });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.ok(result.errors.message);
});

test("values outside the published option lists are rejected", () => {
  for (const field of ["category", "budget", "timeline"] as const) {
    const result = parseContactForm({ ...valid, [field]: "podmetnuto" });
    assert.equal(result.ok, false, field);
    if (result.ok) continue;
    assert.ok(result.errors[field], field);
  }
});

test("published option values are accepted", () => {
  const result = parseContactForm({
    ...valid,
    category: "development",
    budget: "10000-15000",
    timeline: "1-3-mjeseca",
  });
  assert.equal(result.ok, true);
});

test("newsletter consent is opt-in and never implied", () => {
  const off = parseContactForm(valid);
  assert.equal(off.ok && off.data.newsletter, false);

  const on = parseContactForm({ ...valid, newsletter: true });
  assert.equal(on.ok && on.data.newsletter, true);
});

test("whitespace is trimmed from submitted values", () => {
  const result = parseContactForm({
    ...valid,
    name: "  Ana Anić  ",
    email: "  ana@primjer.hr  ",
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.data.name, "Ana Anić");
  assert.equal(result.data.email, "ana@primjer.hr");
});

test("the first error per field is reported, one message per field", () => {
  const result = parseContactForm({ ...valid, name: "", email: "", message: "" });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.message);
});

test("the published contact address is never empty", () => {
  // An empty NEXT_PUBLIC_CONTACT_EMAIL once silently removed the address
  // from every page. The config falls back on empty values now, and this
  // keeps it that way.
  assert.ok(
    site.contact.email.includes("@"),
    `contact email is not an address: "${site.contact.email}"`
  );
  assert.ok(
    site.url.startsWith("http"),
    `site url is not a url: "${site.url}"`
  );
});
