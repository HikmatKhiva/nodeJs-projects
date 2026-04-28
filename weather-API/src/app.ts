import express from "express";
import { limit } from "./lib/rate-limiter.js";
import { connectRedis } from "./lib/redis.js";
import { getWeather } from "./api/weather.js";

const PORT = 3000;
const app = express();

app.use(limit);
app.use("/api/weather", getWeather);

async function start() {
  await connectRedis();
  app.listen(PORT, () => {
    console.log(`server running http://localhost:${PORT}`);
  });
}
start()
export default app