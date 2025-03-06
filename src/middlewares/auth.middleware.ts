import { StatusCodes } from "http-status-codes";
import { AppError } from "./error.handler";
import e, { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      throw new AppError("Token not provided", StatusCodes.UNAUTHORIZED);
    }
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError("Invalid token", StatusCodes.UNAUTHORIZED));
  }
};

export const adminGuard = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== "ADMIN") {
    return next(new AppError("Unauthorized", StatusCodes.FORBIDDEN));
  }
  next();
};


// export const validateUserRequest = ( 
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.user.id !== req.params.userId) {
//     return next(new AppError("Unauthorized", StatusCodes.FORBIDDEN));
//   }
//   next();
// }