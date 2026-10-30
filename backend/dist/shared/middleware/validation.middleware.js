export const validationMiddleware = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            error: "Validation error",
            issues: result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }))
        });
        return;
    }
    req.body = result.data;
    next();
};
//# sourceMappingURL=validation.middleware.js.map