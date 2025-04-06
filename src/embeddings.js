import { geminiAi } from "../config/gemini.js";

export const createEmbedding = async (textChunk, config = {}) => {
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
    console.log(e);
  }
};
