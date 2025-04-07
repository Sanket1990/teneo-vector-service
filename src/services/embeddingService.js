import { geminiAi } from "../../clients/gemini.js";

export const generateEmbedding = async (textChunk) => {
  try {
    const response = await geminiAi.models.embedContent({
      model: "models/embedding-001",
      contents: textChunk,
      config: {
        taskType: "SEMANTIC_SIMILARITY",
      },
    });

    return { content: textChunk, embedding: response.embeddings[0].values };
  } catch (e) {
    console.error("Error generating embedding:", e);
    throw e;
  }
};