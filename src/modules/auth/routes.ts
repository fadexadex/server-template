import { AuthController } from "./controller";
import { Router } from "express";
import { AuthValidator } from "../../middlewares/validators/auth/validators";
import { authGuard } from "middlewares/auth.middleware";

const authController = new AuthController();
const authValidator = new AuthValidator();
const router = Router();

router.post(
  "/register",
  authValidator.validateRegisterBody,
  authController.register
);
router.post("/login", authValidator.validateLoginBody, authController.login);
router.get("/me", authGuard, authController.getMe);

export default router;
