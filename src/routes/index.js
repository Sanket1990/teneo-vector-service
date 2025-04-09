import express from "express";
import embeddingRoutes from "./embedding/index.js";
import healthCheck from "./healthCheck.js";

const router = express.Router();

// Attach routes
router.use("/embeddings", embeddingRoutes);
router.use("/health", healthCheck);

export default router;
