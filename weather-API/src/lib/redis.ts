import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();
const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("error", (err) => {
  console.log("redis error", err);
});

export const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
    console.log("redis connected");
  }
};

export default redis