import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function generateProductDescription(
  productName: string,
  category: string,
  details: string
) {
  const prompt = `
Generate product content in EXACT JSON format.

{
  "productTitle": "",
  "shortDescription": "",
  "fullDescription": "",
  "keyFeatures": [],
  "seoTags": []
}

Product name: ${productName}
Category: ${category}
Details: ${details}

Return ONLY valid JSON. No explanations.
`;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  return response.text;
}

export async function buyerChat(
  userMessage: string,
  history: { role: string; text: string }[] = []
) {
  const conversationHistory = history
    .map((msg) => `${msg.role}: ${msg.text}`)
    .join("\n");

  const prompt = `
You are an AI shopping assistant for Pro-Artisan Marketplace.

Your job:
- Help buyers find handmade artisan products
- Suggest gift ideas
- Explain custom orders
- Help with seller communication
- Answer shopping questions

Conversation history:
${conversationHistory}

Buyer message:
${userMessage}

Respond in a friendly, helpful, concise way.
`;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  return response.text || "Sorry, I couldn't generate a response.";
}