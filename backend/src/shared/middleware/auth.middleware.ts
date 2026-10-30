import type { RequestHandler } from "express";
import { AppError } from "../error/AppError.js";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import type { authenticatedUser } from "../types/auth.type.js";

export const authMiddleware: RequestHandler = (req, _res, next) =>{
    const authorization = req.headers?.authorization ;

    if(!authorization){
         throw new AppError("Authentication required",401,true)
    }

    const [schema, token,...extra] = authorization.trim().split(" ") ;

    if(schema !== "Bearer" || !token  || extra.length !== 0){
        throw new AppError("Invalid token",401,true)
    }
   try {
    
    const decoded = jwt.verify(token, env.auth.accessSecret,{algorithms: ["HS256"]}) ;

   if(
    typeof decoded !== "object" || 
    decoded === null ||
    !("userId" in decoded) ||
    typeof decoded.userId !== "string" ||
    decoded.userId.trim().length === 0 ||
     !("sessionId" in decoded) ||
    typeof decoded.sessionId !== "string" ||
    decoded.sessionId.trim().length === 0 ||
     !("role" in decoded) ||
    (decoded.role !== "client" && decoded.role !== "admin" )
   ){
     throw new AppError("Invalid access token payload",401,true)
   }
    const authenticatedUser: authenticatedUser = {
        userId: decoded.userId,
        sessionId: decoded.sessionId,
        role: decoded.role
    }
     req.user = authenticatedUser

    next()
   } catch (error: unknown) {
    if(error instanceof jwt.JsonWebTokenError
    ){
        next(new AppError("Invalid or expired access token",401,true)) ;
        return ;
    }
    next(error)
   }

}