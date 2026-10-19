import { strict as assert } from "node:assert";
import test from "node:test";
import { checkRateLimit, resetRateLimits } from "../src/lib/rate-limit.ts";

test("the first five attempts in a window are allowed, the sixth is not", () => {
  resetRateLimits();
  const now = Date.now();

  for (let i = 1; i <= 5; i += 1) {
    const result = checkRateLimit("ip:1.2.3.4", now);
    assert.equal(result.allowed, true, `attempt ${i} should be allowed`);
  }

  const blocked = checkRateLimit("ip:1.2.3.4", now);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfter > 0, "a blocked caller must be told when to retry");
});

test("the limit is per key, so one visitor cannot block another", () => {
  resetRateLimits();
  const now = Date.now();

  for (let i = 0; i < 6; i += 1) checkRateLimit("ip:1.1.1.1", now);
  assert.equal(checkRateLimit("ip:1.1.1.1", now).allowed, false);
  assert.equal(checkRateLimit("ip:2.2.2.2", now).allowed, true);
});

test("the window reopens once it has elapsed", () => {
  resetRateLimits();
  const now = Date.now();

  for (let i = 0; i < 6; i += 1) checkRateLimit("ip:3.3.3.3", now);
  assert.equal(checkRateLimit("ip:3.3.3.3", now).allowed, false);

  const later = now + 10 * 60 * 1000 + 1;
  assert.equal(checkRateLimit("ip:3.3.3.3", later).allowed, true);
});

test("retryAfter counts down as the window elapses", () => {
  resetRateLimits();
  const now = Date.now();

  for (let i = 0; i < 6; i += 1) checkRateLimit("ip:4.4.4.4", now);
  const immediately = checkRateLimit("ip:4.4.4.4", now);
  const halfway = checkRateLimit("ip:4.4.4.4", now + 5 * 60 * 1000);

  assert.equal(immediately.allowed, false);
  assert.equal(halfway.allowed, false);
  assert.ok(halfway.retryAfter < immediately.retryAfter);
});
