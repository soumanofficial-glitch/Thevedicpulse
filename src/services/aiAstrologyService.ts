import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface BirthDetails {
  name: string;
  dob: string;
  tob: string;
  pob: string;
}

export interface AstrologyReport {
  luckScore: number;
  energyScore: number;
  luckyColor: string;
  luckyNumber: number;
  favorableTimings: string;
  planetaryAlignment: string;
  relationshipEnergy: string;
  financialEnergy: string;
  personalizedInsight: string;
}

export async function generateAstrologyReport(details: BirthDetails, reportType: string): Promise<AstrologyReport> {
  const prompt = `
    You are an expert Vedic Astrologer. Generate a highly personalized ${reportType} for the following user:
    Name: ${details.name}
    DOB: ${details.dob}
    Time of Birth: ${details.tob}
    Place of Birth: ${details.pob}

    The report should feel spiritual, premium, and trustworthy. Use modern Indian English.
    Provide scores from 0-100 for Luck and Energy.
    Provide specific Vedic insights.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            luckScore: { type: Type.NUMBER },
            energyScore: { type: Type.NUMBER },
            luckyColor: { type: Type.STRING },
            luckyNumber: { type: Type.NUMBER },
            favorableTimings: { type: Type.STRING },
            planetaryAlignment: { type: Type.STRING },
            relationshipEnergy: { type: Type.STRING },
            financialEnergy: { type: Type.STRING },
            personalizedInsight: { type: Type.STRING },
          },
          required: [
            "luckScore", 
            "energyScore", 
            "luckyColor", 
            "luckyNumber", 
            "favorableTimings", 
            "planetaryAlignment", 
            "relationshipEnergy", 
            "financialEnergy", 
            "personalizedInsight"
          ],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result as AstrologyReport;
  } catch (error) {
    console.error("Error generating report:", error);
    // Fallback/Mock data if AI fails
    return {
      luckScore: 85,
      energyScore: 78,
      luckyColor: "Saffron",
      luckyNumber: 7,
      favorableTimings: "10:30 AM - 12:00 PM",
      planetaryAlignment: "Jupiter is in a strong position, favoring your career.",
      relationshipEnergy: "Harmonious period for existing relationships.",
      financialEnergy: "Moderate gains expected. Avoid risky investments today.",
      personalizedInsight: "Your cosmic energy is vibrating at a high frequency. Trust the process."
    };
  }
}
