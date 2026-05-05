import { Request, Response, NextFunction } from "express";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library.js";
import { ZodError } from "zod";
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof ZodError) {
    statusCode = 400;
    return res.status(statusCode).json({
      success: false,
      message: "Validation failed",
      issues: err.issues.map((issue: any) => ({
        path: issue.path,
        message: issue.message,
      })),
    });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 409;
      message = `Duplicate field: ${((err.meta?.target as string[]) || ["unknown"]).join(", ")}`;
    } else if (err.code === "P2025") {
      // Not found
      statusCode = 404;
      message = "Record not found";
    } else if (err.code === "P2003") {
      // Foreign key
      statusCode = 400;
      message = "Invalid foreign key reference";
    } else {
      statusCode = 400;
      message = `Database error: ${err.code}`;
    }
  } else if (err instanceof PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid input data for database";
  }

  if (err.isOperational && err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }
  return res.status(statusCode).json({ message });
};
export default globalErrorHandler;
