import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getCareerPlanFromAgent = async (answers: {
  experience: string;
  interests: string[];
  goal: string;
}) => {
  const prompt = `
אתה מנטור קריירה ותיק בתחום ההייטק.

בהתבסס על הפרופיל הבא של משתמש, צור תוכנית קריירה מותאמת אישית הכוללת שלושה שלבים.
בכל שלב תן:
- מטרה מקצועית
- קורס או משאב מומלץ (אפשר קישור)
- משפט מוטיבציה קצר

פרופיל המשתמש:
ניסיון: ${answers.experience}
תחומי עניין: ${answers.interests.join(", ")}
מטרה עיקרית: ${answers.goal}

כתוב את התשובה בעברית בלבד.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
};
