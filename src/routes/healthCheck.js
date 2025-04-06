import express from "express";

const router = express.Router();

/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns a message indicating that the server is running.
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/health-check", (req, res) => {
  res.json({ message: "Server is running" });
});

export default router;