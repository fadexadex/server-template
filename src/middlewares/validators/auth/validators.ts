import { Request, Response, NextFunction } from "express";
import { registerSchema, loginSchema } from "./schemas";
import { AppError } from "../../..//middlewares/error.handler";
import { StatusCodes } from "http-status-codes";

export class AuthValidator {
  validateRegisterBody = (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      next(
        new AppError(
          error.details.map((err) => err.message).join(", "),
          StatusCodes.BAD_REQUEST
        )
      );
    }
    next();
  };

  validateLoginBody = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      next(
        new AppError(
          error.details.map((err) => err.message).join(", "),
          StatusCodes.BAD_REQUEST
        )
      );
    }
    next();
  };
}
