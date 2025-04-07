import express from "express";
import generateEmbeddings from "./vector/generateEmbeddings.js";
import getEmbeddings from "./vector/getEmbeddings.js";
import healthCheck from "./healthCheck.js";

const router = express.Router();

// Attach routes
router.use("/vector/generateEmbeddings", generateEmbeddings);
router.use("/vector/getEmbeddings", getEmbeddings);
router.use("/health", healthCheck);

export default router;