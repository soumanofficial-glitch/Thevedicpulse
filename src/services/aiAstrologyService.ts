import { BirthDetails, AstrologyReport } from "../types";

export async function generateAstrologyReport(details: BirthDetails, reportType: string): Promise<AstrologyReport> {
  try {
    const response = await fetch("/api/astrology", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ details, reportType }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch astrology report from server");
    }

    const result = await response.json();
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
