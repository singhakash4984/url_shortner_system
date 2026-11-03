import { createClient } from "redis";
import { env } from "../../config/env.js";

export const redisClient = createClient({
    url: env.redis.url,
    socket: {
        connectTimeout: 10000,
        reconnectStrategy: (retries) => {
            if (retries > 5) {
                return new Error("Redis connection failed after 5 retries");
            }

            return Math.min(retries * 1000, 5000);
        }
    }
});

redisClient.on("error", (error) => {
    console.error("[Redis] Error:", error.message);
});

redisClient.on("ready", () => {
    console.info("[Redis] Connected successfully");
});

redisClient.on("reconnecting", () => {
    console.warn("[Redis] Reconnecting...");
});

export const connectRedis = async (): Promise<void> => {
    if (redisClient.isReady) return;

    await redisClient.connect();
    await redisClient.ping();

    console.info("[Redis] Ping successful");
};