import express from "express";
import { createEmbedding } from "../../adapters/embeddingAdapters.js";
import { getData } from "../../adapters/dataAdapters.js";

const router = express.Router();

/**
 * @swagger
 * /vector/getEmbeddings:
 *   post:
 *     summary: Get embeddings for a query
 *     description: Accepts a query string, generates its vector embedding, and retrieves relevant data from the Supabase database.
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *             example: "Prague travel tips"
 *     responses:
 *       200:
 *         description: Successful response with relevant data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 */
router.post("/", express.text(), async (req, res) => {
  try {
    const query = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const queryEmbedding = await createEmbedding(query);

    const data = await getData(queryEmbedding.embedding);

    res.json({ message: data });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
