import express from "express";
import { routes } from "./routes.js";
import cors from "cors";
import { connectRedis } from "./lib/redis.js";
import globalErrorHandler from "./middleware/errorHandler.js";
import { limit } from "./lib/rate-limiter.js";
const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(limit)

app.use("/posts", routes);
app.use(globalErrorHandler);
async function start() {
  await connectRedis();
  app.listen(PORT, () => {
    console.log(`server running http://localhost:${PORT}`);
  });
}
start();
export default app