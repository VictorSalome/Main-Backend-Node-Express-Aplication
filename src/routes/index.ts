import { Router } from "express";
import { postRegisterUserController } from "../controller/auth/registerUserController";
import { getListUserController } from "../controller/auth/listUserController";
import { postLoginUserController } from "../controller/auth/loginUserController";
import { updateUserController } from "../controller/auth/updateUserController";

const router = Router();

router.post("/auth/register", postRegisterUserController);
router.post("/auth/login", postLoginUserController);

router.get("/auth/users", getListUserController);
router.post("/auth/user", updateUserController);

export { router as Routes };
