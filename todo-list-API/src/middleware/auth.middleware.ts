import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "../db/db.js";
import { AppError } from "../utils/appError.js";
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.method === "OPTIONS") return next();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError("No token provided", 401);
    }
    const token = authHeader.split(" ")[1];
    if (!JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as {
      id: number;
      email: string;
    };
    const user = await prisma.users.findUnique({
      where: { id: decoded.id, email: decoded.email },
    });

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }
    req.user =user;
    next();
  } catch (error) {
    next(error);
  }
};
