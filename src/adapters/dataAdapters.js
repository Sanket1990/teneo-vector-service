import {
  insertData as insertDataService,
  fetchData,
  deleteEmbeddingsbyDocumentId as deleteEmbeddingsService,
} from "../services/dataService.js";

export const insertData = async (tableName, data) => {
  return await insertDataService(tableName, data);
};

export const getData = async (queryEmbedding) => {
  return await fetchData(queryEmbedding);
};

export const deleteEmbeddingsbyDocumentId = async (id) => {
  return await deleteEmbeddingsService(id);
};
