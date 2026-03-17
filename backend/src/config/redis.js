import { createClient } from "redis";
import logger from "../utils/logger.js";

let redisClient;
let isRedisConnected = false;

// In-memory fallback
const memoryCache = new Map();

const connectRedis = async () => {
    if (process.env.REDIS_URL) {
        try {
            redisClient = createClient({
                url: process.env.REDIS_URL,
            });

            redisClient.on("error", (err) => {
                logger.error(`Redis Client Error: ${err.message}`);
                isRedisConnected = false;
            });

            redisClient.on("connect", () => {
                logger.info("✅ Redis Connected");
                isRedisConnected = true;
            });

            await redisClient.connect();
        } catch (error) {
            logger.error(`Failed to connect to Redis: ${error.message}`);
            logger.info("⚠️  Using In-Memory Cache Fallback");
        }
    } else {
        logger.info("⚠️  No REDIS_URL provided. Using In-Memory Cache Fallback.");
    }
};

// Wrapper methods to abstract Redis vs Memory
const redis = {
    get: async (key) => {
        if (isRedisConnected && redisClient) {
            return await redisClient.get(key);
        }
        return memoryCache.get(key);
    },
    set: async (key, value, options) => {
        if (isRedisConnected && redisClient) {
            // Redis 'SET' options: { EX: seconds }
            return await redisClient.set(key, value, options);
        }
        memoryCache.set(key, value);
        // Handle expiration for memory cache if needed
        if (options && options.EX) {
            setTimeout(() => {
                memoryCache.delete(key);
            }, options.EX * 1000);
        }
        return "OK";
    },
    del: async (key) => {
        if (isRedisConnected && redisClient) {
            return await redisClient.del(key);
        }
        return memoryCache.delete(key);
    },
    connect: connectRedis,
    client: redisClient
};

export default redis;
