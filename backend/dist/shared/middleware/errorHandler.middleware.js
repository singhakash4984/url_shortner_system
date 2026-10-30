import { AppError } from "../error/AppError.js";
import { env } from "../../config/env.js";
import { ZodError } from "zod";
export const errorHandler = (err, _req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    }
    if (err instanceof AppError) {
        if (err.statusCode >= 500) {
            console.error(err);
        }
        return res.status(err.statusCode).json({
            success: false,
            message: err.statusCode >= 500 && env.app.nodeEnv === "production" ? "Internal server error" : err.message
        });
    }
    console.log(err);
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
    next();
};
//# sourceMappingURL=errorHandler.middleware.js.map