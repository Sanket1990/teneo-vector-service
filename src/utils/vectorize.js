import { generateTextChunks } from "./splitter.js";
import { createEmbedding } from "../adapters/embeddingAdapters.js";
import { insertData } from "../adapters/dataAdapters.js";

export const processVectorization = async (text, documentId) => {
  try {
    console.log(
      `Starting vectorization ${documentId ? `for document ${documentId}` : ""}`
    );

    if (!text) {
      throw new Error("Text is required for vectorization");
    }

    const chunks = await generateTextChunks(text);

    const embeddings = await Promise.all(
      chunks.map(async (chunk) => {
        const embedding = await createEmbedding(chunk);
        return {
          content: chunk,
          embedding: embedding.vector,
          ...(documentId ? { document_id: documentId } : {}),
        };
      })
    );

    await insertData("content_vectors", embeddings);

    console.log(
      `Vectorization completed ${documentId ? `for document ${documentId}` : ""}`
    );
  } catch (error) {
    console.error(`Vectorization failed:`, error);
    throw error;
  }
};
