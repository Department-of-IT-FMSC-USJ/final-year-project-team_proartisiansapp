import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

export function getGenAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is required to use AI features.");
    }
    genAI = new GoogleGenAI(apiKey);
  }
  return genAI;
}

export async function generateProductDescription(productName: string, category: string, details: string) {
  const model = getGenAI().getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Write a compelling, professional artisan marketplace product description for a ${category} item named "${productName}". Additional details provided: ${details}. Keep it concise, engaging, and highlight the handcrafted quality.`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}
