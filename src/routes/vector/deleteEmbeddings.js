import express from "express";
import { deleteEmbeddingsForDocument } from "./utils/index.js";

const router = express.Router();

/**
 * @swagger
 * /vector/delete:
 *   post:
 *     summary: Delete vector embeddings for a specific document
 *     description: Deletes the vector embeddings associated with the specified document ID from the Supabase database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documentId:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/", async (req, res) => {
  const { documentId } = req.body;

  if (!documentId) {
    return res.status(400).json({ error: "Document ID is required" });
  }

  try {
    await deleteEmbeddingsForDocument(documentId);
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Failed to delete document" });
  }
});

export default router;
