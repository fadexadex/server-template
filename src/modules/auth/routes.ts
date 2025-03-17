import { AuthController } from "./controller";
import { Router } from "express";
import { authGuard } from "../../middlewares";
import { RegisterDto, LoginDto } from "./dto";
import { validateDto } from "../../middlewares";


const authController = new AuthController();
const router = Router();

router.post(
  "/register",
  validateDto(RegisterDto),
  authController.register
);
router.post("/login", validateDto(LoginDto), authController.login);
router.get("/me", authGuard, authController.getMe);

export default router;
