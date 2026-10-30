import { AppError } from "../../shared/error/AppError.js";
import { deleteUser, getUser } from "./user.service.js";
export const getUserController = async (req, res) => {
    const id = req.user?.userId;
    const user = await getUser(id);
    res.status(200).json({
        user,
    });
};
export const deleteUserController = async (req, res) => {
    const id = req.user?.userId;
    const user = await deleteUser(id);
    if (!user) {
        throw new AppError("something went wrong", 500, true);
    }
    res.status(204).end();
};
//# sourceMappingURL=user.controller.js.map