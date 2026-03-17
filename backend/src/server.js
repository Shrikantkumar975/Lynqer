import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();
// Connect to Redis
import redis from "./config/redis.js";
redis.connect();

const server = app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
