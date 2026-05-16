import Redis from "ioredis";

type LimitStatus = {
  blocked: boolean;
  retryAfterSeconds: number;
};

type InMemoryAttemptState = {
  count: number;
  resetAt: number;
};

const DEFAULT_MAX_ATTEMPTS = 5;
const DEFAULT_WINDOW_SECONDS = 15 * 60;
const DEFAULT_PREFIX = "liblit:admin:login";

const inMemoryAttempts = new Map<string, InMemoryAttemptState>();

function parsePositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
}

function getMaxAttempts() {
  return parsePositiveInt(process.env.ADMIN_LOGIN_RATE_LIMIT_MAX_ATTEMPTS, DEFAULT_MAX_ATTEMPTS);
}

function getWindowSeconds() {
  return parsePositiveInt(process.env.ADMIN_LOGIN_RATE_LIMIT_WINDOW_SECONDS, DEFAULT_WINDOW_SECONDS);
}

function getRedisPrefix() {
  return process.env.ADMIN_RATE_LIMIT_REDIS_PREFIX ?? DEFAULT_PREFIX;
}

function getRedisUrl() {
  return process.env.ADMIN_RATE_LIMIT_REDIS_URL ?? process.env.REDIS_URL ?? "";
}

function getRedisKey(ip: string) {
  return `${getRedisPrefix()}:${ip}`;
}

function getInMemoryState(ip: string) {
  const now = Date.now();
  const existing = inMemoryAttempts.get(ip);
  if (!existing || existing.resetAt <= now) {
    const fresh: InMemoryAttemptState = { count: 0, resetAt: now + getWindowSeconds() * 1000 };
    inMemoryAttempts.set(ip, fresh);
    return fresh;
  }
  return existing;
}

const globalScope = globalThis as typeof globalThis & {
  __liblitAdminRateLimitRedis?: Redis;
};

function getRedisClient(): Redis | null {
  const redisUrl = getRedisUrl();
  if (!redisUrl) return null;

  if (!globalScope.__liblitAdminRateLimitRedis) {
    globalScope.__liblitAdminRateLimitRedis = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      lazyConnect: true,
    });
  }

  return globalScope.__liblitAdminRateLimitRedis;
}

async function checkWithRedis(ip: string): Promise<LimitStatus | null> {
  const client = getRedisClient();
  if (!client) return null;

  const key = getRedisKey(ip);
  try {
    if (client.status !== "ready") {
      await client.connect();
    }

    const countRaw = await client.get(key);
    const count = Number.parseInt(countRaw ?? "0", 10);
    if (count < getMaxAttempts()) {
      return { blocked: false, retryAfterSeconds: 0 };
    }

    const ttlSeconds = await client.ttl(key);
    return {
      blocked: true,
      retryAfterSeconds: ttlSeconds > 0 ? ttlSeconds : getWindowSeconds(),
    };
  } catch {
    return null;
  }
}

async function recordFailureWithRedis(ip: string): Promise<LimitStatus | null> {
  const client = getRedisClient();
  if (!client) return null;

  const key = getRedisKey(ip);
  const windowSeconds = getWindowSeconds();
  try {
    if (client.status !== "ready") {
      await client.connect();
    }

    const count = await client.incr(key);
    if (count === 1) {
      await client.expire(key, windowSeconds);
    }

    if (count < getMaxAttempts()) {
      return { blocked: false, retryAfterSeconds: 0 };
    }

    const ttlSeconds = await client.ttl(key);
    return {
      blocked: true,
      retryAfterSeconds: ttlSeconds > 0 ? ttlSeconds : windowSeconds,
    };
  } catch {
    return null;
  }
}

async function clearFailuresWithRedis(ip: string): Promise<boolean> {
  const client = getRedisClient();
  if (!client) return false;

  try {
    if (client.status !== "ready") {
      await client.connect();
    }

    await client.del(getRedisKey(ip));
    return true;
  } catch {
    return false;
  }
}

function checkWithInMemory(ip: string): LimitStatus {
  const state = getInMemoryState(ip);
  if (state.count < getMaxAttempts()) {
    return { blocked: false, retryAfterSeconds: 0 };
  }

  const retryAfterSeconds = Math.max(1, Math.ceil((state.resetAt - Date.now()) / 1000));
  return { blocked: true, retryAfterSeconds };
}

function recordFailureWithInMemory(ip: string): LimitStatus {
  const state = getInMemoryState(ip);
  state.count += 1;

  if (state.count < getMaxAttempts()) {
    return { blocked: false, retryAfterSeconds: 0 };
  }

  const retryAfterSeconds = Math.max(1, Math.ceil((state.resetAt - Date.now()) / 1000));
  return { blocked: true, retryAfterSeconds };
}

function clearFailuresWithInMemory(ip: string) {
  inMemoryAttempts.delete(ip);
}

export async function checkAdminLoginRateLimit(ip: string): Promise<LimitStatus> {
  const redisStatus = await checkWithRedis(ip);
  if (redisStatus) {
    return redisStatus;
  }
  return checkWithInMemory(ip);
}

export async function recordAdminLoginFailure(ip: string): Promise<LimitStatus> {
  const redisStatus = await recordFailureWithRedis(ip);
  if (redisStatus) {
    return redisStatus;
  }
  return recordFailureWithInMemory(ip);
}

export async function clearAdminLoginFailures(ip: string): Promise<void> {
  const cleared = await clearFailuresWithRedis(ip);
  if (!cleared) {
    clearFailuresWithInMemory(ip);
  }
}
