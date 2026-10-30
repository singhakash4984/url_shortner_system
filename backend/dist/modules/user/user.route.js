import { Router } from "express";
import { deleteUserController, getUserController } from "./user.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
const userRouter = Router();
userRouter.get('/me', authMiddleware, getUserController);
userRouter.delete('/me', authMiddleware, deleteUserController);
export default userRouter;
//# sourceMappingURL=user.route.js.map