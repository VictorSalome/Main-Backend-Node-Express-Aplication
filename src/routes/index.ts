import { Router } from "express";
import { postRegisterUserController } from "../controller/auth/registerUserController";
import { getListUserController } from "../controller/user/listUserController";
import { postLoginUserController } from "../controller/auth/loginUserController";
import { updateUserController } from "../controller/user/updateUserController";
import { authenticateJWT } from "../middlewares/auth/userMiddleware";
import { deactivateUserController } from "../controller/user/deactivateUserController";
import { activateUserController } from "../controller/user/activateUserController";

const Routes = Router();

Routes.post("/auth/register", postRegisterUserController);
Routes.post("/auth/login", postLoginUserController);

Routes.get("/auth/users", getListUserController);

Routes.put("/auth/user", authenticateJWT, updateUserController);
Routes.put("/auth/user/deactivate", authenticateJWT, deactivateUserController);
Routes.put("/auth/user/activate", authenticateJWT, activateUserController);

export default Routes;
