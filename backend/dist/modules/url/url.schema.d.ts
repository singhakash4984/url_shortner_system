import z from "zod";
export declare const urlSchema: z.ZodObject<{
    originalUrl: z.ZodURL;
    alias: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type CreateUrlInput = z.infer<typeof urlSchema>;
//# sourceMappingURL=url.schema.d.ts.map