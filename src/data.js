import { supabase } from "../config/supabase.js";

export const insertData = async (tableName, data) => {
  try {
    const { error } = await supabase.from(tableName).insert(data);

    if (error) {
      console.error(error);
    } else {
      console.log("Supabase table entries inserted");
    }
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (queryEmbedding) => {
  try {
    console.log(`Querying for embedding`, JSON.stringify(queryEmbedding));
    const { data: documents, error } = await supabase.rpc(
      "match_content_vectors",
      {
        query_embedding: queryEmbedding,
      }
    );

    if (error) {
      console.error("Supabase RPC error:", error);
      return [];
    }

    console.log("Matching content:", documents);
    return documents;
  } catch (e) {
    console.error("Unexpected error:", e);
    return [];
  }
};
