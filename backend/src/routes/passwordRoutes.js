import express from "express";
import * as passwordController from "../controllers/passwordController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Passwords
 *   description: Secure password vault management
 */

/**
 * @swagger
 * /passwords:
 *   post:
 *     summary: Save a password to the vault
 *     tags: [Passwords]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - alias
 *               - password
 *             properties:
 *               alias:
 *                 type: string
 *                 description: The name/alias for the saved password
 *               password:
 *                 type: string
 *                 description: The actual password string
 *     responses:
 *       201:
 *         description: Password saved successfully
 *       400:
 *         description: Alias and password are required
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, passwordController.savePassword);

/**
 * @swagger
 * /passwords:
 *   get:
 *     summary: Get all saved passwords
 *     tags: [Passwords]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of saved passwords
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   alias:
 *                     type: string
 *                   password:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/", protect, passwordController.getPasswords);

/**
 * @swagger
 * /passwords/{id}:
 *   delete:
 *     summary: Delete a saved password
 *     tags: [Passwords]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the password to delete
 *     responses:
 *       200:
 *         description: Password deleted successfully
 *       404:
 *         description: Password not found
 */
router.delete("/:id", protect, passwordController.deletePassword);

export default router;
