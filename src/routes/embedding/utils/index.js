import { generateTextChunks } from "../../../utils/splitter.js";
import { createEmbedding } from "../../../adapters/embeddingAdapters.js";
import {
  insertData,
  deleteEmbeddingsbyDocumentId,
} from "../../../adapters/dataAdapters.js";

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
      chunks.map(async (chunk, index) => {
        const embedding = await createEmbedding(chunk);
        return {
          content: chunk,
          chunk_index: index,
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

export async function deleteEmbeddingsForDocument(documentId) {
  try {
    await deleteEmbeddingsbyDocumentId(documentId);
  } catch (error) {
    throw error;
  }
}
