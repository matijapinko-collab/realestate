import { strict as assert } from "node:assert";
import test from "node:test";
import {
  getPendingProjects,
  getProjectBySlug,
  getPublishedProjects,
  projects,
  relationshipLabels,
  statusLabels,
} from "../src/content/projects.ts";

test("only approved records are published", () => {
  for (const project of getPublishedProjects()) {
    assert.equal(
      project.approvedForPublication,
      true,
      `${project.slug} reached the public list without approval`
    );
  }
});

test("an unapproved project cannot be fetched by slug", () => {
  const pending = getPendingProjects();
  assert.ok(pending.length > 0, "fixture expects at least one pending record");
  for (const project of pending) {
    assert.equal(
      getProjectBySlug(project.slug),
      undefined,
      `${project.slug} is reachable by slug despite not being approved`
    );
  }
});

test("the draft flag is ignored in a production build", () => {
  // NODE_ENV is readonly in the Next.js type definitions, hence the cast.
  const env = process.env as Record<string, string | undefined>;
  const previousEnv = env.NODE_ENV;
  const previousFlag = env.NEXT_PUBLIC_SHOW_DRAFT_PROJECTS;
  try {
    env.NODE_ENV = "production";
    env.NEXT_PUBLIC_SHOW_DRAFT_PROJECTS = "true";
    assert.deepEqual(getPublishedProjects(), []);
  } finally {
    if (previousEnv === undefined) delete env.NODE_ENV;
    else env.NODE_ENV = previousEnv;
    if (previousFlag === undefined) delete env.NEXT_PUBLIC_SHOW_DRAFT_PROJECTS;
    else env.NEXT_PUBLIC_SHOW_DRAFT_PROJECTS = previousFlag;
  }
});

test("every record states relationship, role and status", () => {
  for (const project of projects) {
    assert.ok(relationshipLabels[project.relationshipType], project.slug);
    assert.ok(statusLabels[project.status], project.slug);
    assert.ok(project.role.trim().length > 10, `${project.slug}: role too thin`);
    assert.ok(project.contributionLabel.trim().length > 0, project.slug);
  }
});

test("slugs are unique and URL safe", () => {
  const seen = new Set<string>();
  for (const project of projects) {
    assert.ok(
      /^[a-z0-9-]+$/.test(project.slug),
      `${project.slug} is not URL safe`
    );
    assert.equal(seen.has(project.slug), false, `duplicate slug ${project.slug}`);
    seen.add(project.slug);
  }
});

test("no record carries placeholder text", () => {
  const banned = /lorem ipsum|todo|tbd|xxx|placeholder/i;
  for (const project of projects) {
    const blob = JSON.stringify(project);
    assert.equal(
      banned.test(blob),
      false,
      `${project.slug} contains placeholder text`
    );
  }
});

test("no record claims an unverified growth figure", () => {
  // Outcomes must be functional or operational, never an invented percentage
  // or revenue claim.
  const numericClaim = /\d+\s?%|\d+\s?(x|puta)\b|\d[\d.,]*\s?(€|eur|kn)/i;
  for (const project of projects) {
    for (const outcome of project.outcomes) {
      assert.equal(
        numericClaim.test(outcome),
        false,
        `${project.slug}: outcome looks like an unverified figure — "${outcome}"`
      );
    }
  }
});
