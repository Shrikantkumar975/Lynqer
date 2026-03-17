import express from "express";
import {
    shortenUrl,
    redirectUrl,
    getAnalytics,
    getUserUrls,
    deleteUrl
} from "../controllers/urlController.js";
import { optionalAuth, protect } from "../middlewares/auth.js";
import { urlCreationLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: URLs
 *   description: URL Shortening and Management
 */

/**
 * @swagger
 * /urls/shorten:
 *   post:
 *     summary: Create a short URL
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - longUrl
 *             properties:
 *               longUrl:
 *                 type: string
 *               customAlias:
 *                 type: string
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: URL shortened successfully
 */
router.post("/shorten", optionalAuth, urlCreationLimiter, shortenUrl);

/**
 * @swagger
 * /urls/analytics/{shortId}:
 *   get:
 *     summary: Get analytics for a URL
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Analytics data retrieved
 */
router.get("/analytics/:shortId", optionalAuth, getAnalytics);

/**
 * @swagger
 * /urls/urls:
 *   get:
 *     summary: Get all URLs for the authenticated user
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of URLs
 */
router.get("/urls", optionalAuth, getUserUrls);

/**
 * @swagger
 * /urls/{id}:
 *   delete:
 *     summary: Delete a URL
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: URL deleted
 */
router.delete("/urls/:id", optionalAuth, deleteUrl);

/**
 * @swagger
 * /urls/{shortId}:
 *   get:
 *     summary: Redirect to the original URL
 *     tags: [URLs]
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects to long URL
 */
router.get("/:shortId", redirectUrl);

export default router;
