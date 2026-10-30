import { redisClient } from "../../infrastructure/redis/redisClient.js";
const URL_CACHE_TTL_SECONDS = 300;
const getCacheKey = (alias) => {
    return `url:${alias}`;
};
export const getCachedUrl = async (alias) => {
    return redisClient.get(getCacheKey(alias));
};
export const CacheUrl = async (alias, original_url) => {
    await redisClient.set(getCacheKey(alias), original_url, { EX: URL_CACHE_TTL_SECONDS });
};
export const invalidateCachedUrl = async (alias) => {
    await redisClient.del(getCacheKey(alias));
};
//# sourceMappingURL=url-cache.repository.js.map