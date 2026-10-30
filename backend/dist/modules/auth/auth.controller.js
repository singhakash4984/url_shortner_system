import { getMe, login, logout, refresh, register } from "./auth.service.js";
import { env } from "../../config/env.js";
import { AppError } from "../../shared/error/AppError.js";
export const registerController = async (req, res, next) => {
    try {
        const registeredUser = await register(req.body);
        res.status(201).json({
            message: "User registered successfully",
            data: registeredUser,
        });
    }
    catch (error) {
        next(error);
    }
};
export const loginController = async (req, res, next) => {
    try {
        const result = await login({
            data: req.body,
            metadata: {
                ip: req.ip ?? null,
                userAgent: req.get("user-agent") ?? null,
            },
        });
        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: env.app.nodeEnv === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "logged in successfylly",
            data: result.user,
            accessToken: result.accessToken,
            expiresAt: result.expiresAt,
        });
    }
    catch (error) {
        next(error);
    }
};
export const refreshController = async (req, res, next) => {
    try {
        const refreshtoken = req.cookies?.refreshToken;
        if (typeof refreshtoken !== "string" && refreshtoken.length === 0) {
            throw new AppError("Unauthorized", 401, true);
        }
        const { accessToken, refreshToken, expiresAt } = await refresh(refreshtoken);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env.app.nodeEnv === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            token: accessToken,
            expires_at: expiresAt,
        });
    }
    catch (error) {
        next(error);
    }
};
export const logoutController = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (typeof refreshToken !== "string" || refreshToken.length === 0) {
            throw new AppError("Unauthorised", 401, true);
        }
        const id = await logout(refreshToken);
        if (!id) {
            throw new AppError("Something went wrong", 500, true);
        }
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: env.app.nodeEnv === "production",
            sameSite: "strict",
            path: "/api/v1/auth",
        });
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
};
export const getMeController = async (req, res, next) => {
    try {
        const id = req.user?.userId;
        const result = await getMe(id);
        res.status(200).json({
            userData: result,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.controller.js.map