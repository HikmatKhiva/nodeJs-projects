import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("error", (error) => {
  console.log("redis error", error);
});

export const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
    console.log("redis connected");
  }
};

export default redis;
