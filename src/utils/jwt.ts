import jwt from "jsonwebtoken";
import { TokenPayload } from "./types";

const generateToken = (payload: TokenPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  if (typeof decoded === "string") {
    throw new Error("Invalid token");
  }
  return decoded as TokenPayload;
};

export { generateToken, verifyToken };
