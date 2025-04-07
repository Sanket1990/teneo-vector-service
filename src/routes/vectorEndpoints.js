import express from "express";
import { generateTextChunks } from "../utils/splitter.js";
import { createEmbedding } from "../embeddings.js";
import { insertData, getData } from "../data.js";

const router = express.Router();

/**
 * @swagger
 * /generateEmbeddings:
 *   post:
 *     summary: Process text and store vector embeddings
 *     description: Accepts raw plain text input, splits it into chunks, generates vector embeddings, and stores them in the Supabase database.
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *             example: |
 *               3 Days in Prague: A Fairytale Escape with Full Costs & Tips
 *               If there’s one city that truly looks like it leapt out of a storybook, it’s Prague.
 *               ...
 */
router.post("/generateEmbeddings", express.text(), async (req, res) => {
  try {
    const text = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ error: "Text is required in request body" });
    }

    const chunks = await generateTextChunks(text);

    const embeddings = await Promise.all(
      chunks.map(async (chunk) => {
        const embedding = await createEmbedding(chunk);
        return embedding;
      })
    );

    await insertData("content_vectors", embeddings);

    res.json({ message: "Embeddings created and stored successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /getEmbeddings:
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
 *         description: Embedding retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */ 
router.post("/getEmbeddings", express.text(), async (req, res) => {
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
