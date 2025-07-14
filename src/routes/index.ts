import { Router } from "express";
import { postRegisterUserController } from "../controller/auth/registerUserController";
import { getListUserController } from "../controller/auth/listUserController";
import { postLoginUserController } from "../controller/auth/loginUserController";
import { updateUserController } from "../controller/auth/updateUserController";
import { authenticateJWT } from "../middlewares/auth/userMiddleware";

const Routes = Router();

Routes.post("/auth/register", postRegisterUserController);
Routes.post("/auth/login", postLoginUserController);

Routes.get("/auth/users", getListUserController);
Routes.put("/auth/user", authenticateJWT, updateUserController);

export default Routes;
