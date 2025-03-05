import { AuthController } from "./controller";
import { Router } from "express";
import { AuthValidator } from "../../middlewares/validators/auth/validators";

const authController = new AuthController();
const authValidator = new AuthValidator();
const router = Router();

router.post(
  "/register",
  authValidator.validateRegisterBody,
  authController.register
);
router.post("/login", authValidator.validateLoginBody, authController.login);

export default router;