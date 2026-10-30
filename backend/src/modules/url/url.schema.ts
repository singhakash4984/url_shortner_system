import z from "zod";

export const urlSchema = z
.object({
    originalUrl: z
    .url("Please provide a valid url")
    .max(2048,"URL must not exceed 2048 characters")
    .refine((value)=>{
        const parsedUrl = new URL(value) ;
        return(
            parsedUrl.protocol === "http:" ||  parsedUrl.protocol === "https:"
        )
    },"Only http and https URLs are allowed"),

    alias: z
    .string()
    .trim()
    .min(3,"alias must contain alteast 3 characters")
    .max(20,"alias must not exceed 20 characters")
    .optional()
    
})
.strict()



export type CreateUrlInput = z.infer<typeof urlSchema> ;