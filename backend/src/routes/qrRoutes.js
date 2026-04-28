import express from "express";
import { generateQR } from "../controllers/qrController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: QR Code
 *   description: QR Code generation utilities
 */

/**
 * @swagger
 * /qr:
 *   get:
 *     summary: Generate a QR code from text or URL
 *     tags: [QR Code]
 *     parameters:
 *       - in: query
 *         name: text
 *         required: true
 *         schema:
 *           type: string
 *         description: The text or URL to encode in the QR code
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *           default: "#000000"
 *         description: Hex color for the dark parts of the QR code
 *       - in: query
 *         name: background
 *         schema:
 *           type: string
 *           default: "#ffffff"
 *         description: Hex color for the background
 *     responses:
 *       200:
 *         description: QR Code generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 qrCode:
 *                   type: string
 *                   description: Base64 DataURL of the QR code image
 *                 text:
 *                   type: string
 *                 options:
 *                   type: object
 */
router.get("/", generateQR);

export default router;
