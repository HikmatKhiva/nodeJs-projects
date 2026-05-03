import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodSchema, ZodError, ZodObject, z } from "zod";
type TypedRequestBody<T extends ZodSchema> = Request<
  Record<string, unknown>,
  unknown,
  z.infer<T>,
  Record<string, unknown>
>;

export const validateBody = <T extends ZodObject>(
  schema: T,
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(
      " Validate hit - req.body:",
      req.body,
      "type:",
      typeof req.body,
    );
    if (req.body === undefined || req.body === "") {
      return res.status(400).json({ message: "Request body missing or empty" });
    }
    try {
      const validatedBody = schema.parse(req.body);
      (req as TypedRequestBody<T>).body = validatedBody;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          issues: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      next(error);
    }
  };
};