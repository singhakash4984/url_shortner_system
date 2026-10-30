import { Router } from "express";
import { validationMiddleware } from "../../shared/middleware/validation.middleware.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { getMeController, loginController, logoutController, refreshController, registerController } from "./auth.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
const authRouter = Router();
authRouter.post('/register', validationMiddleware(registerSchema), registerController);
authRouter.post('/login', validationMiddleware(loginSchema), loginController);
authRouter.post('/refresh', refreshController);
authRouter.post('/logout', logoutController);
authRouter.get('/me', authMiddleware, getMeController);
export default authRouter;
//# sourceMappingURL=auth.route.js.map