import { CharacterTextSplitter } from "langchain/text_splitter";
import { cleanTextInput } from "./textUtils.js";

export const generateTextChunks = async (text) => {
  const cleanText = cleanTextInput(text);

  const splitter = new CharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 25,
  });

  const documents = (await splitter.createDocuments([cleanText])) ?? [];

  const chunks = documents.map((doc) => doc.pageContent);

  return chunks;
};
