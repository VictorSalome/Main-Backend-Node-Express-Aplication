import { Router } from "express";
import { postRegisterUserController } from "../controller/auth/registerUserController";
import { getListUserController } from "../controller/auth/listUserController";
import { postLoginUserController } from "../controller/auth/loginUserController";

const router = Router();

router.post("/auth/register", postRegisterUserController);
router.get("/auth/register", getListUserController);

router.post("/auth/login", postLoginUserController);

export { router as Routes };
