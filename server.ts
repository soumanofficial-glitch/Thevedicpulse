import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  // API Routes
  app.post("/api/astrology", async (req, res) => {
    const { details, reportType } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    try {
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

      const response = await genAI.models.generateContent({
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
      res.json(result);
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate report" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
