import {
  insertData as insertDataService,
  fetchData,
} from "../services/dataService.js";

export const insertData = async (tableName, data) => {
  return await insertDataService(tableName, data);
};

export const getData = async (queryEmbedding) => {
  return await fetchData(queryEmbedding);
};
