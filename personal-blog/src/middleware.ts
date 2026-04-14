import { Request, Response, NextFunction } from "express";
export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const isAdmin = req.cookies?.admin === "true";
  if (!isAdmin) {
    return res.redirect("/admin/auth");
  }
  next();
}