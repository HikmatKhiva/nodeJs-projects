import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { 
  PrismaClientKnownRequestError, 
  PrismaClientValidationError 
} from '@prisma/client/runtime/library';

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  // 1. BODY-PARSER JSON ERRORS (your main issue)
  if (err.type === 'entity.parse.failed') {
    statusCode = 400;
    message = 'Invalid JSON - Remove outer quotes from request body';
    return res.status(statusCode).json({
      success: false,
      message,
      hint: 'Use: {"key":"value"} NOT: "{\\"key\\":\\"value\\"}"',
      received: err.body ? err.body.substring(0, 100) + '...' : 'empty'
    });
  }

  // 2. ZOD VALIDATION
  if (err instanceof ZodError) {
    statusCode = 400;
    return res.status(statusCode).json({
      success: false,
      message: 'Validation failed',
      issues: err.issues.map((issue: any) => ({
        path: issue.path,
        message: issue.message,
      })),
    });
  }

  // 3. PRISMA ERRORS
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {  // Unique violation
      statusCode = 409;
      message = `Duplicate field: ${((err.meta?.target as string[]) || ['unknown']).join(', ')}`;
    } else if (err.code === 'P2025') {  // Not found
      statusCode = 404;
      message = 'Record not found';
    } else if (err.code === 'P2003') {  // Foreign key
      statusCode = 400;
      message = 'Invalid foreign key reference';
    } else {
      statusCode = 400;
      message = `Database error: ${err.code}`;
    }
  } else if (err instanceof PrismaClientValidationError) {
    statusCode = 400;
    message = 'Invalid input data for database';
  }

  // 4. CUSTOM APP ERROR (throw new AppError('msg', 400))
  if (err.isOperational && err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // 5. GENERIC (500)
  const isDev = process.env.NODE_ENV === 'development';
  res.status(statusCode).json({
    success: false,
    message,
    ...(isDev && { stack: err.stack, code: err.code }),
  });
};

export default globalErrorHandler;