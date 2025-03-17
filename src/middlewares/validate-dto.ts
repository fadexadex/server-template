import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { AppError } from "./error.handler";

export function validateDto<T extends object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dtoClass, req.body);
    const errors = await validate(instance, { whitelist: true });

    if (errors.length > 0) {
      next(
        new AppError(
          errors.map((error) => Object.values(error.constraints)).join(", "),
          400
        )
      );
    }

    req.body = instance;
    next();
  };
}
