import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppError } from "../utils/appError.js";

dotenv.config();
const { JWT_SECRET_KEY } = process.env;
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (user) {
      throw new AppError("User already exist!", 409);
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    if (!JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }
    const token = jwt.sign({ id: newUser.id, email }, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      throw new AppError("Invalid credentials!", 404);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new AppError("Invalid credentials!", 401);
    }
    if (!JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }
    const token = jwt.sign({ id: user.id, email }, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
