import { supabase } from "../config/supabase.js";

export const insertData = async (tableName, data) => {
  try {
    const { data: responseData, error } = await supabase
      .from(tableName)
      .insert(data);

    if (error) {
      console.error(error);
    } else {
      console.log("Supabase table entries inserted");
    }
  } catch (e) {
    console.log(e);
  }
};
