import {rateLimit} from "express-rate-limit";
import {RedisStore , type RedisReply} from "rate-limit-redis";
import { redisClient} from "../../infrastructure/redis/redisClient.js";

export const apiRateLimiter = rateLimit({
    windowMs: 15*60*1000,
    limit: 100,
    standardHeaders:"draft-8",
    legacyHeaders: false,
    store: new RedisStore({
        prefix: "url-shortner:rl:",

        sendCommand: (...args: string[]) => 
        redisClient.sendCommand(args) as Promise<RedisReply>
    })
})