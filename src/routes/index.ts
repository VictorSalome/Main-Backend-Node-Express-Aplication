import { Router } from "express";
import { postRegisterUserController } from "../controller/registerUserController";

const router = Router();

router.post("/register", postRegisterUserController);

export { router as authRoutes };
