import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const getBenefitCategory = async (userInput) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Analyze the following health-related query and classify it into exactly ONE of these four categories: "Dental", "OPD", "Vision", or "Mental Health".

CONTEXT: This is for a health benefits platform where users describe their health concerns to find relevant insurance benefits.

CATEGORY DEFINITIONS:
- "Dental": Anything related to teeth, gums, mouth, oral hygiene, dental procedures, tooth pain, cavities, braces, dentures, cleanings, etc.
- "OPD" (Outpatient Department): General medical consultations, doctor visits, prescriptions, lab tests, diagnostics, general health check-ups, common illnesses, medications.
- "Vision": Eye-related issues, vision problems, eye exams, glasses, contact lenses, eye diseases, vision correction, blindness, eye pain.
- "Mental Health": Psychological issues, stress, anxiety, depression, therapy, counseling, mental wellness, emotional health, psychiatric care, mindfulness.

USER QUERY: "${userInput}"

INSTRUCTIONS:
- Return ONLY the single most relevant category name from the four options above
- Do not add any explanations, punctuation, or additional text
- If the query could fit multiple categories, choose the most specific one
- For general health concerns without specific symptoms, default to "OPD"

CATEGORY:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const category = response.text().trim();

    const validCategories = ["Dental", "OPD", "Vision", "Mental Health"];
    if (validCategories.includes(category)) {
      return category;
    } else {
      console.error("AI returned an unexpected category:", category);
      return "NILL";
    }
  } catch (error) {
    console.error("Error classifying benefit category:", error);
    return "OPD";
  }
};

export const generateActionPlan = async (benefitData) => {
  const fallbackPlan = [
    "Contact your HR department to confirm eligibility and coverage details",
    "Schedule an appointment with an in-network provider from your benefits directory",
    "Submit required documentation and claims through your insurance portal",
  ];

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Generate a comprehensive, practical 4-step action plan for an employee to utilize their health benefit. 

BENEFIT CONTEXT:
- Title: "${benefitData.title}"
- Coverage: "${benefitData.coverage}"
- Description: "${benefitData.description}"
- Category: "${benefitData.category}"

REQUIREMENTS:
- Create exactly 4 actionable steps that are specific to this benefit type
- Steps should be practical, sequential, and easy to follow
- Include concrete actions like contacting providers, scheduling appointments, submitting claims
- Make it relevant to the specific benefit category (Dental/OPD/Vision/Mental Health)
- Use professional but clear language suitable for employees

OUTPUT FORMAT: Return ONLY a valid JSON array with exactly 4 strings, no additional text.

EXAMPLE FOR DENTAL BENEFIT:
[
  "Verify your dental coverage details and find in-network providers through your benefits portal",
  "Schedule an appointment with a participating dentist for your required dental procedure",
  "Present your insurance information at the appointment and understand any out-of-pocket costs",
  "Submit any necessary claim forms or receipts through your insurance provider's online system"
]

Generate the action plan for the benefit described above:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    if (text.startsWith("```") && text.endsWith("```")) {
      text = text.substring(text.indexOf("\n") + 1, text.length - 3).trim();
    }
    if (text.startsWith("```json")) {
      text = text.substring(7, text.length - 3).trim();
    }

    const plan = JSON.parse(text);

    if (
      Array.isArray(plan) &&
      plan.length === 4 &&
      plan.every((step) => typeof step === "string")
    ) {
      return plan;
    } else {
      console.error("AI did not return a valid 4-step plan array:", plan);
      return fallbackPlan;
    }
  } catch (error) {
    console.error("Error generating action plan:", error);
    return fallbackPlan;
  }
};
