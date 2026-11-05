/**
 * In-memory rate limiting for the contact form.
 *
 * Deliberately simple: this is a single-instance presentational site, and the
 * form is the only write path. If the app is ever scaled to several instances
 * this must move to a shared store — see DEPLOYMENT.md.
 */

import "server-only";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
/** Stop the map growing without bound if the process lives a long time. */
const MAX_TRACKED_KEYS = 5_000;

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the caller may try again; 0 when allowed. */
  retryAfter: number;
};

export function checkRateLimit(
  key: string,
  now: number = Date.now()
): RateLimitResult {
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_TRACKED_KEYS) pruneExpired(now);
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (bucket.count >= MAX_PER_WINDOW) {
    return {
      allowed: false,
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function pruneExpired(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  // Still full of live buckets: drop the oldest so the map cannot grow forever.
  if (buckets.size >= MAX_TRACKED_KEYS) {
    const oldest = [...buckets.entries()].sort(
      (a, b) => a[1].resetAt - b[1].resetAt
    );
    for (const [key] of oldest.slice(0, Math.ceil(MAX_TRACKED_KEYS / 10))) {
      buckets.delete(key);
    }
  }
}

/** Test helper. */
export function resetRateLimits() {
  buckets.clear();
}
