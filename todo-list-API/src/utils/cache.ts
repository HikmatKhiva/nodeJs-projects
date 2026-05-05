import redis from "../lib/redis.js";
import { z } from "zod";
export const setCache = async <T>(key: string, data: T, ttl = 60) => {
  await redis.set(key, JSON.stringify(data), { EX: ttl });
};
export const getCache = async <T>(
  key: string,
  schema: z.ZodType<T>,
): Promise<T | null> => {
  const data = await redis.get(key);
  if (!data) return null;
  const parsed = JSON.parse(data);
  return schema.parse(parsed);
};

export const invalidateTodoCache = async (userId: number) => {
  const keys = await redis.keys(`todos:${userId}:*`);
  if (keys.length) await redis.del(keys);
};
