import { pipeline } from "@xenova/transformers";

export const createEmbeddings = async (textChunk) => {
  try {
    const extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );

    const embedding = await extractor(textChunk, {
      normalize: true,
      pooling: "mean",
    });

    return { content: textChunk, embedding: Array.from(embedding.data) ?? [] };
  } catch (e) {
    console.log(e);
  }
};
