import express from "express";
// import type { Errback, Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { appRouter } from "./routes.js";
import { errorHandler } from "./helper/errorHandler.js";
const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use((req, res, next) => {
  res.locals.isAdmin = req.cookies?.admin === "true";
  next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", appRouter);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});