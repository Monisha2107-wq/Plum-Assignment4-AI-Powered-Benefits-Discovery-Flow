# Plum SDE Intern Assignment: AI-Powered Benefits Discovery Flow

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B9?style=for-the-badge&logo=google-gemini&logoColor=white)

This project is a fully functional web application built for the Plum SDE Intern assignment (Problem Statement 4). It addresses a core challenge in the employee benefits space: simplifying the process for employees to find and understand their health benefits through an intuitive, AI-driven interface.

---

## 1. Project Setup & Demo

### Prerequisites
-   **Node.js:** v18.x or higher.
-   **npm:** v9.x or higher.
-   **A Google Gemini API Key.**

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**
    -   Create a new file named `.env.local` in the root of the project.
    -   Add your Gemini API key to this file:
    ```
    VITE_GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

4.  **Run the Application**
    To launch the React app locally, run:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Demo
A live, interactive demo of the application is hosted here:

**[Insert Your Hosted Link Here]**

---

## 2. Problem Understanding

The primary goal is to create a multi-screen flow that empowers an employee to describe a health-related need in their own words. The application then uses AI to classify this need, recommend suitable company benefits, and generate a clear, step-by-step action plan for availing them.

The core assumption is that the available company benefits are loaded from a mock JSON file, with no live backend calls for this data.

---

## 3. Architecture & State Management

The application is built with a modern, scalable architecture designed for modularity, reusability, and maintainability.

-   **Component-Based Structure:** The UI is logically divided into `pages` (top-level screens like `InputScreen`, `BenefitListScreen`) and reusable `components` (like `Navbar`, `ProtectedRoute`). This separation of concerns makes the codebase clean and easy to navigate.

-   **State Management:** React Context is used for global state management to persist data across the multi-screen flow.
    -   `AppContext`: Manages the core application flow state (user input, AI-classified category, selected benefit). It also contains logic to reset the flow when a user navigates home.
    -   `ThemeContext`: Manages the UI theme (dark/light mode), allowing for a polished and creative user experience.

-   **Service Layer (`aiService.js`):** All interactions with the Google Gemini API are encapsulated in this dedicated service file. This layer handles prompt construction, API calls, and robust error handling. The UI is designed to gracefully handle specific error signals from this service (like a `"NILL"` category) by displaying a user-friendly error screen.

---

## 4. AI Prompt Engineering

The prompts were carefully engineered with detailed context and instructions to ensure highly accurate, consistent, and structured output from the AI.

### Category Classification Prompt
To achieve high accuracy, the prompt provides the AI with clear definitions for each category and explicit instructions on how to handle ambiguity.

```javascript
const prompt = `Analyze the following health-related query and classify it into exactly ONE of these four categories: "Dental", "OPD", "Vision", or "Mental Health".

CONTEXT: This is for a health benefits platform...

CATEGORY DEFINITIONS:
- "Dental": Anything related to teeth, gums, mouth...
- "OPD" (Outpatient Department): General medical consultations...
- "Vision": Eye-related issues, vision problems...
- "Mental Health": Psychological issues, stress, anxiety...

USER QUERY: "${userInput}"

INSTRUCTIONS:
- Return ONLY the single most relevant category name...
- If the query could fit multiple categories, choose the most specific one...

CATEGORY:`;
```

This detailed, context-rich approach significantly reduces misclassifications and improves the reliability of the entire flow.

### Action Plan Generation Prompt
To get a structured action plan, the prompt specifies the output format as a **JSON array** and provides a complete example to guide the AI. The entire benefit object is passed as context to generate a more relevant plan.

```javascript
const prompt = `Generate a comprehensive, practical 4-step action plan for an employee to utilize their health benefit. 

BENEFIT CONTEXT:
- Title: "${benefitData.title}"
- Coverage: "${benefitData.coverage}"
- Description: "${benefitData.description}"
- Category: "${benefitData.category}"

REQUIREMENTS:
- Create exactly 4 actionable steps...
- Use professional but clear language...

OUTPUT FORMAT: Return ONLY a valid JSON array with exactly 4 strings...

EXAMPLE FOR DENTAL BENEFIT:
[
  "Verify your dental coverage details...",
  "Schedule an appointment with a participating dentist...",
  "Present your insurance information at the appointment...",
  "Submit any necessary claim forms..."
]

Generate the action plan for the benefit described above:`;
```
This strategy ensures the AI's response is always machine-readable. The service layer also includes logic to sanitize the response by stripping potential Markdown formatting, making the JSON parsing highly resilient.

---

## 5. Screenshots of Key Screens

Here are screenshots of the application's key screens, demonstrating the polished UI/UX and smooth navigation.

**(Remember to replace these with your actual screenshots)**

| Input Screen (Light Mode) | Loading Screen | Results Screen (Dark Mode) | Detail Screen |
| :---: | :---: | :---: | :---: |
| `[Your Screenshot Here]` | `[Your Screenshot Here]` | `[Your Screenshot Here]` | `[Your Screenshot Here]` |

---

## 6. Known Issues & Potential Improvements

-   **Vague Input Classification:** While the detailed prompt improves accuracy, the AI can still default to "OPD" for highly ambiguous user inputs.
-   **Potential Improvement:** Implement a clarifying question fallback. If the AI's confidence score is low, the application could ask the user a follow-up question to get a more accurate category.

---

## 7. Test Cases
Here are five test cases used to validate the application's functionality and robustness.

| # | Test Case                 | Input                                                                                                      | Expected Behavior                                                                                                                                                                                                       | Expected Result                                                                                                                                                                                             |
|---|---------------------------|------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | **Standard "Happy Path"** | "I have a severe toothache and might need a root canal."                                                     | The app correctly classifies the category, displays relevant dental benefits, and generates a relevant 4-step action plan upon selection.                                                                                 | Category: `Dental`. Benefits: "Major Restorative Care." Action Plan: A specific, 4-step plan related to finding a dentist, getting pre-authorization, and submitting a claim.                             |
| 2 | **Vague Input** | "I just feel sick, tired and achy."                                                                        | The AI, following the prompt's instructions, classifies this general complaint into the "OPD" category, showing general health benefits.                                                                                    | Category: `OPD`. Benefits: "General Physician Consultation."                                                                                                                                                  |
| 3 | **Unrecognized Input** | "Where is the company cafeteria?"                                                                          | The system gracefully handles irrelevant input by classifying it into the safe, default "OPD" category, preventing an error and providing a general-purpose recommendation.                                                | Category: `OPD`. The app doesn't crash and provides a helpful, albeit general, result.                                                                                                                      |
| 4 | **State Reset on "Home"** | 1. Complete a flow for any query. <br> 2. From the results or detail page, click the "Home" link in the navbar. | The app navigates to the home screen, and all previous state (input, category, selection) is cleared. Manually navigating to `/results` in the URL bar should redirect back to home.                                 | The app is fully reset. The input text area is empty, and protected routes are inaccessible, ensuring a clean start for a new query.                                                                        |
| 5 | **AI Service Failure** | Trigger a scenario where the AI returns a garbled or non-category response.                                  | The `getBenefitCategory` function returns "NILL". The `BenefitsListScreen` detects this and displays a clear, user-friendly error message (the "Service Unavailable" screen) instead of crashing.                      | The application shows the dedicated error screen with a "Return to Home" button, demonstrating robust error handling.                                                                                     |
