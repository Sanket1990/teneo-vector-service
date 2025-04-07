import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

class GeminiClient {
  constructor() {
    if (!GeminiClient.instance) {
      const geminiApiKey = process.env.GEMINI_API_KEY;
      if (!geminiApiKey) throw new Error(`Expected env var GEMINI_API_KEY`);

      this.client = new GoogleGenAI({ apiKey: geminiApiKey });
      GeminiClient.instance = this;
    }

    return GeminiClient.instance;
  }

  getClient() {
    return this.client;
  }
}

const geminiInstance = new GeminiClient();
export const geminiAi = geminiInstance.getClient();
