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
    const { data: documents, error } = await supabase.rpc(
      "match_content_vectors",
      {
        query_embedding: queryEmbedding,
        match_threshold: 0.6,
        match_count: 15,
      }
    );

    if (error) {
      console.error("Supabase RPC error:", error);
      return [];
    }

    return documents.map((doc) => doc.content).join(" ");
  } catch (e) {
    console.error("Unexpected error:", e);
    return [];
  }
};
