import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ScanResult {
  diseaseName: string;
  confidence: number;
  plantType: string;
  treatment: string;
  prevention: string;
  severity: 'low' | 'medium' | 'high';
}

export async function identifyPlantDisease(base64Image: string): Promise<ScanResult> {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { text: "Analyze this plant image. Identify the plant and any disease it might have. Return the result in JSON format with the following keys: diseaseName, confidence (0-1), plantType, treatment (detailed), prevention (detailed), severity (low, medium, or high). If the plant is healthy, state 'Healthy' in diseaseName." },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(',')[1] || base64Image
            }
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json"
    }
  });

  const response = await model;
  const text = response.text;
  if (!text) throw new Error("Failed to get response from AI");
  
  return JSON.parse(text) as ScanResult;
}
