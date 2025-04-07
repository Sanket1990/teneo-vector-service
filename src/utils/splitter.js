import { CharacterTextSplitter } from "langchain/text_splitter";

export const generateTextChunks = async (text) => {
  const splitter = new CharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 25,
  });

  const documents = (await splitter.createDocuments([text])) ?? [];

  const chunks = documents.map((doc) => doc.pageContent);

  return chunks;
};
