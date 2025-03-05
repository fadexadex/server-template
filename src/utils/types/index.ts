import { Prisma } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}


export type TokenPayload = Omit<Prisma.UserCreateInput, "password">;
