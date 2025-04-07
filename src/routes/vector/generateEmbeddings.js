import express from "express";
import { generateTextChunks } from "../../splitter.js";
import { createEmbedding } from "../../embeddings.js";
import { insertData } from "../../data.js";

const router = express.Router();

/**
 * @swagger
 * /vector/generateEmbeddings:
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
router.post("/", express.text(), async (req, res) => {
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

export default router;