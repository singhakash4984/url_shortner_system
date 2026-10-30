import { createClient } from "redis";
import { env } from "../../config/env.js";

export const redisClient = createClient({
    socket:{
        host: env.redis.host,
        port: env.redis.port,
        connectTimeout: 5000,
        reconnectStrategy(retries){
            if(retries > 5){
                return new Error("Redis reconnection attempts exceeded")
            }
            return Math.min(retries * 500,3000)
        },
        
    },
    password: env.redis.password
}) ;

redisClient.on("error", (error)=>{
    console.error("Redis connection error", error.message)
}) ;

redisClient.on("ready", ()=>{
    console.error("Redis is ready")
}) ;

redisClient.on("reconnecting", ()=>{
    console.error("Reconnecting to redis...")
}) ;


export const connectRedis = async():Promise<void> =>{
    if(redisClient.isOpen) return ;
    await redisClient.connect()
}
