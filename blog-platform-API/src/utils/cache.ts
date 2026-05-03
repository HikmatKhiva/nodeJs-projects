import redis from "../lib/redis.js";
import { z } from "zod";
export const setCache = async <T>(key: string, data: T, ttl = 60) => {
  await redis.set(key, JSON.stringify(data), {
    EX: ttl,
  });
};
export const getCache = async (key: string, schema: z.ZodType) => {
  const data = await redis.get(key);
  if (!data) return null;
  const parsed = JSON.parse(data);
  return schema.parse(parsed);
};

export const invalidatePostCache = async () => {
  const keys = await redis.keys("posts:all:*");
  if (keys.length) await redis.del(keys);
};
