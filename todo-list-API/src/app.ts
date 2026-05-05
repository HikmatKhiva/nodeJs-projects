import express from "express";
import cors from "cors";
import { routes } from "./routes.js";
import { limit } from "./lib/rate-limiter.js";
import { connectRedis } from "./lib/redis.js";
import globalErrorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limit);
app.use(globalErrorHandler);

app.use("/", routes);

async function start() {
  await connectRedis();
  app.listen(PORT, () => {
    console.log(`server running http://localhost:${PORT}`);
  });
}
start();
export default app;
