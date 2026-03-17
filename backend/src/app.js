import express from "express";
import cors from "cors";
import helmet from "helmet";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swagger.js";

const app = express();

// Security Middleware
app.use(helmet());

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true
}));

// Rate Limiting (Global API)
app.use("/api", apiLimiter);

// Body Parser
app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// Error Handling
app.use(errorHandler);

export default app;
