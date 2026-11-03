import "dotenv/config" ;
import z from "zod"
export const port = process.env.PORT || 3000 ;

const envSchema = z.object({
    NODE_ENV: z
    .enum(["development","test","production"])
    .default("development"),

    PORT: z
    .coerce
    .number()
    .int()
    .max(65535)
    .default(3000),

    DATABASE_URL: z
    .string()
    .trim()
    .min(1),

    BASE_URL: z
    .string()
    .url(),

    JWT_ACCESS_SECRET: z
    .string()
    .min(32),

    JWT_REFRESH_SECRET: z
    .string()
    .min(32),

    REDIS_URL: z
    .string()
    .trim()
    .min(1),

   

}) ;

const parsed = envSchema.safeParse(process.env) ;

if(!parsed.success){
    console.error(
        "Invalid environment configuration:",
        parsed.error.issues 
    )
    process.exit(1)
}

const config = parsed.data ;

export const env = Object.freeze({
    app: {
        port: config.PORT,
        nodeEnv: config.NODE_ENV
    },
    database:{
        databaseUrl: config.DATABASE_URL   
    },
    auth:{
        accessSecret: config.JWT_ACCESS_SECRET,
        refreshSecret: config.JWT_REFRESH_SECRET
    },
    urlShortner:{
        baseUrl: config.BASE_URL
    },
    redis:{
       url: config.REDIS_URL
    }
})

