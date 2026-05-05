import { Users } from "@prisma/client"; // optional if you want full type

declare global {
  namespace Express {
    interface Request {
      user?: Users; // or custom type
    }
  }
}

export {};

