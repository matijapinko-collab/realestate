import { test } from "node:test";
import assert from "node:assert/strict";
import { site } from "../src/config/site.ts";

/**
 * Analytics is the one third-party script on the site, so the shape of its
 * configuration is worth pinning down. The privacy page promises no cookies
 * and no consent banner; these tests keep the configuration from quietly
 * growing into something that promise would no longer cover.
 */

test("the measurement script is served over https", () => {
  assert.ok(
    site.analytics.src.startsWith("https://"),
    `analytics src must be https, got ${site.analytics.src}`,
  );
});

test("the Plausible domain is a bare hostname, not a url", () => {
  const domain = site.analytics.domain;
  if (domain === null) return; // Not configured in this environment; nothing to check.
  assert.ok(
    !domain.includes("/") && !domain.includes(":"),
    `Plausible registers a site by hostname; got ${domain}`,
  );
  assert.ok(domain.includes("."), `${domain} is not a hostname`);
});

test("an empty environment variable does not become an empty domain", () => {
  // The contact address disappeared from the live site in October 2026
  // because a Docker ARG that is declared but not passed yields an empty
  // string, which `??` lets through. Empty must read as "not configured".
  assert.notEqual(site.analytics.domain, "");
  assert.notEqual(site.analytics.src, "");
});
