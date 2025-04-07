import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

class SupabaseClient {
  constructor() {
    if (!SupabaseClient.instance) {
      const privateKey = process.env.SUPABASE_API_KEY;
      if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
      const url = process.env.SUPABASE_PROJECT_URL;
      if (!url) throw new Error(`Expected env var SUPABASE_URL`);

      this.client = createClient(url, privateKey);
      SupabaseClient.instance = this;
    }

    return SupabaseClient.instance;
  }

  getClient() {
    return this.client;
  }
}

const supabaseInstance = new SupabaseClient();

export const supabaseClient = supabaseInstance.getClient();
