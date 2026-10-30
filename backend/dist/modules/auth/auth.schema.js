import z from "zod";
const emailSchema = z.email().max(254);
const registerpasswordSchema = z
    .string()
    .min(8, "Password must be atleast 8 character")
    .max(72, "Password must not exceed 72 character")
    .refine((data) => data === data.trim(), {
    message: "Password cannot start or end with whitespaces",
});
export const registerSchema = z
    .object({
    email: emailSchema,
    password: registerpasswordSchema
})
    .strict();
const loginPasswordSchema = z.string().min(1, "Password is required");
export const loginSchema = z
    .object({
    email: emailSchema,
    password: loginPasswordSchema
})
    .strict();
// export const refreshSchema = z.object({
//   refreshToken: z.string().length(64,"Invalid refresh token") 
// }).strict()
// export type refreshInput = z.infer<typeof refreshSchema> ;
//# sourceMappingURL=auth.schema.js.map