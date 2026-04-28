import express from "express";
import cors from "cors";
import helmet from "helmet";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";
import { redirectUrl } from "./controllers/urlController.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swagger.js";

const app = express();

// Trust proxy for rate limiter (required for Vercel/Render)
app.set("trust proxy", 1);

// Security Middleware
app.use(helmet());

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5000",
    "https://essential-kit.vercel.app",
    "https://lynqer-frontend.vercel.app",
    "https://lynqer.live",
    "https://www.lynqer.live",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
app.use("/api/passwords", passwordRoutes);
app.use("/api/qr", qrRoutes);

/**
 * @swagger
 * /{shortId}:
 *   get:
 *     summary: Redirect to a long URL
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *         description: The short URL identifier
 *     responses:
 *       302:
 *         description: Redirecting to the original URL
 *       404:
 *         description: Short URL not found
 */
app.get("/:shortId", redirectUrl);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: API Health Check
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 uptime:
 *                   type: number
 *                   example: 123.45
 */
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// Error Handling
app.use(errorHandler);

export default app;
