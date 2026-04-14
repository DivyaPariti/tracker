import { Redis } from "@upstash/redis";

const hasCredentials =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

// In-memory fallback for local development without Redis
const memoryStore = new Map<string, unknown>();

const memoryRedis = {
  async get<T>(key: string): Promise<T | null> {
    return (memoryStore.get(key) as T) ?? null;
  },
  async set(key: string, value: unknown): Promise<void> {
    memoryStore.set(key, value);
  },
};

export const redis: {
  get: <T>(key: string) => Promise<T | null>;
  set: (key: string, value: unknown) => Promise<unknown>;
} = hasCredentials
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : memoryRedis;
