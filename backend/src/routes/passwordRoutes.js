import express from "express";
import * as passwordController from "../controllers/passwordController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, passwordController.savePassword);
router.get("/", protect, passwordController.getPasswords);
router.delete("/:id", protect, passwordController.deletePassword);

export default router;
