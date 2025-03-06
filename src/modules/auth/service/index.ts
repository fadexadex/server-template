import { ILoginBody } from "utils/types";
import { AppError } from "../../../middlewares/error.handler";
import { StatusCodes } from "http-status-codes";
import { AuthRepository } from "../repository";
import { comparePassword, hashPassword } from "../../../utils/bcrypt";
import sanitizeUserAndGrantToken from "../../../utils/sanitize";
import { Prisma } from "@prisma/client";

const authRepo = new AuthRepository();

export class AuthService {
  login = async (loginBody: ILoginBody) => {
    const { email, password } = loginBody;
    const user = await authRepo.findUserByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
    }
    return sanitizeUserAndGrantToken(user);
  };

  register = async (data: Prisma.UserCreateInput) => {
    const user = await authRepo.findUserByEmail(data.email);
    if (user) {
      throw new AppError("Email already exists", StatusCodes.CONFLICT);
    }

    data.password = await hashPassword(data.password);

    const newUser = await authRepo.registerUser(data);
    return sanitizeUserAndGrantToken(newUser);
  };

  getMe = async (email: string) => {
    return authRepo.findUserByEmail(email);
  };
}
