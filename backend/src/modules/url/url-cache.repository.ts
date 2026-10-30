import { redisClient } from "../../infrastructure/redis/redisClient.js";


const URL_CACHE_TTL_SECONDS = 300 ;

const getCacheKey = (alias: string):string =>{
    return `url:${alias}`
} ;

export const getCachedUrl = async(alias: string):Promise<string | null> =>{
return redisClient.get(getCacheKey(alias)) ;
} ;

export const CacheUrl = async(alias: string, original_url:string):Promise<void> =>{
await redisClient.set(getCacheKey(alias),original_url,{EX:URL_CACHE_TTL_SECONDS})
} ;

export const invalidateCachedUrl = async (alias: string):Promise<void> =>{
    await redisClient.del(getCacheKey(alias)) ;
} 

