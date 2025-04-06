import dotenv from "dotenv";

dotenv.config();

import { GoogleGenAI } from "@google/genai";


const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) throw new Error(`Expected env var GEMINI_API_KEY`);

export const geminiAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
