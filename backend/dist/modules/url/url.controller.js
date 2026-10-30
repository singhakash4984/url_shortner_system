import { createUrl, deleteUrl, getUrl } from "./url.service.js";
import { AppError } from "../../shared/error/AppError.js";
export const createUrlController = async (req, res, next) => {
    try {
        const data = req.body;
        const userId = req.user.userId;
        const url = await createUrl(data, userId);
        if (!url) {
            throw new AppError("invalid url", 404, true);
        }
        res.status(201).json({
            message: "Url created successfully",
            url
        });
    }
    catch (error) {
        next(error);
    }
};
export const getUrlController = async (req, res, next) => {
    try {
        const alias = req.params.alias;
        if (typeof alias !== "string" || alias.length === 0) {
            throw new AppError("alias is required", 400, true);
        }
        const url = await getUrl(alias);
        if (!url) {
            throw new AppError("URL not found", 404, true);
        }
        res.redirect(302, url.original_url);
    }
    catch (error) {
        next(error);
    }
};
export const deleteUrlController = async (req, res, next) => {
    try {
        const alias = req.params?.alias;
        if (typeof alias !== "string" || alias.length === 0) {
            throw new AppError("alias is required", 404, true);
        }
        const url = await deleteUrl(alias);
        if (!url) {
            throw new AppError("alias is required", 404, true);
        }
        res.status(204).json({
            message: "Url created successfully",
            url
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=url.controller.js.map