import express from "express";
import { refreshAccessToken } from "../controllers/authController.js";

const router = express.Router();
router.post("/refresh-token", refreshAccessToken);
export default router;
