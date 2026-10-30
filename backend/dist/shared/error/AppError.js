export class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode, isOperational) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
//# sourceMappingURL=AppError.js.map