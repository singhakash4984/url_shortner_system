import { getUserById } from "../auth/auth.repository.js";
import { AppError } from "../../shared/error/AppError.js";
import { deleteUserById } from "./user.repository.js";

export const getUser = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new AppError("Invalid credentials", 401, true);
  }
  return user;
}

export const deleteUser = async (userId: string) => {
  const result = await deleteUserById(userId);
  if (!result) {
    throw new AppError("Invalid credentials", 401, true);
  }
  return result;
};
