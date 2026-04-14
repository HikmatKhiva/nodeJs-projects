import type { Request, Response, NextFunction } from "express";
export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong, try again!";
  res.status(statusCode).render("pageError", message);
}
