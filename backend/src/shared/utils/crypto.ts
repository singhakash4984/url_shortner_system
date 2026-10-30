import argon2 from "argon2"
import { env } from "../../config/env.js"
import { AppError } from "../error/AppError.js";
import crypto from "node:crypto"

export const hashPassword = async(password:string) =>{
const passwordHash = await argon2.hash(password,{
    type:argon2.argon2id,
    memoryCost: env.app.nodeEnv === "production"?2**16:2**15 ,
    timeCost:3,
    parallelism:1,
    hashLength:32
})
return passwordHash ;
}

export const verifyPassword = async(passwordHash:string,password:string) =>{
   const result =  await argon2.verify(passwordHash,password)
   if(!result){
    throw new AppError("Invalid credentials",404,true)
   }
   return result ;
}


export const generateRefreshToken = ():string =>{
    return crypto.randomBytes(32).toString("hex") ;
}

export const tokenHash = (token:string): string =>{
   return crypto.createHash("sha256").update(token).digest("hex") ;
}

export const FAKE_HASH= "$argon2id$v=19$m=32768,p=1,t=3$c1AO+5gcjrX+2mM22wuDwQ$8FDhRhTaaKS9330fiki88zujZovDoSMs7TBUu/UMPeM"

