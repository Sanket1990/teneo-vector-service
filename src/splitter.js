import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const generateTextChunks = async (text) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 250,
    chunkOverlap: 30,
  });

  const documents = (await splitter.createDocuments([text])) ?? [];

  const chunks = documents.map((doc) => doc.pageContent);

  return chunks;
};
