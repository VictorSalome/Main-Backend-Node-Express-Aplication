import { Router } from "express";
import { postRegisterUserController } from "../controller/user/registerUserController";
import { getListUserController } from "../controller/user/listUserController";
import { postLoginUserController } from "../controller/user/loginUserController";

const router = Router();

router.post("/auth/register", postRegisterUserController);
router.get("/auth/register", getListUserController);

router.post("/auth/login", postLoginUserController);

export { router as Routes };
