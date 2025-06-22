import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getCareerPlanFromAgent = async (
  answers: {
    experience: string;
    interests: string[];
    goal: string;
    language?: "en" | "he";
  },
  language: "en" | "he" = "en"
) => {
  const responseLanguage = answers.language || language;

  const languageInstructions = {
    en: "Please respond in clear, professional English.",
    he: "Please respond in clear, professional Hebrew.",
  };

  const prompt = `
You are an experienced career mentor and consultant in the tech industry with over 15 years of experience.

Based on the following user profile, create a comprehensive and personalized career development plan.

User Profile:
- Current Experience Level: ${answers.experience}
- Areas of Interest: ${answers.interests.join(", ")}
- Career Goal: ${answers.goal}

Please provide a detailed career plan that includes:

1. **Current Assessment & Gap Analysis**
   - Evaluate their current level
   - Identify skill gaps for their goal

2. **3-Phase Development Plan:**
   
   **Phase 1 (Months 1-6): Foundation Building**
   - Specific skills to develop
   - Recommended courses/resources with links when possible
   - Practical projects to work on
   
   **Phase 2 (Months 7-12): Skill Enhancement**
   - Advanced skills and technologies
   - Networking and community involvement
   - Portfolio development
   
   **Phase 3 (Months 13-18): Career Transition**
   - Job search strategies
   - Interview preparation
   - Salary negotiation tips

3. **Key Milestones & Success Metrics**
4. **Recommended Resources** (books, courses, communities)
5. **Motivational Message**

IMPORTANT: ${languageInstructions[responseLanguage]}

Please write the response with actionable advice and maintain a professional yet encouraging tone.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a professional career mentor specializing in technology careers. ${languageInstructions[responseLanguage]}`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 2500,
  });

  return completion.choices[0].message.content;
};
