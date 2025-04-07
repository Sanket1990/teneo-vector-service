import { generateEmbedding } from "../services/embeddingService.js";

export const createEmbedding = async (textChunk) => {
  return await generateEmbedding(textChunk);
};
