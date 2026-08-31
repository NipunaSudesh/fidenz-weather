const cache = new Map();

export function getCache(key) {
  const entry = cache.get(key);

  if (!entry) {
    return { hit: false, data: null };
  }

  const isExpired = Date.now() > entry.expiresAt;

  if (isExpired) {
    cache.delete(key);
    return { hit: false, data: null };
  }

  return { hit: true, data: entry.data };
}

/**
 * Store a value in the cache with a TTL (in milliseconds).
 */
export function setCache(key, data, ttlMs) {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
    cachedAt: Date.now(),
  });
}

/**
 * Debug helper — returns status of all cached keys.
 */
export function getCacheStatus() {
  const status = [];
  const now = Date.now();

  for (const [key, entry] of cache.entries()) {
    status.push({
      key,
      status: now > entry.expiresAt ? "EXPIRED" : "HIT",
      cachedAt: new Date(entry.cachedAt).toISOString(),
      expiresAt: new Date(entry.expiresAt).toISOString(),
      ttlRemainingMs: Math.max(0, entry.expiresAt - now),
    });
  }

  return status;
}

export const CACHE_TTL = {
  RAW_WEATHER: 5 * 60 * 1000,       // 5 minutes
  PROCESSED_OUTPUT: 5 * 60 * 1000,  // 5 minutes
};