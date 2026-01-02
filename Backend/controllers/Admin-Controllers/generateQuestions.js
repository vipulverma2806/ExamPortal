import { GoogleGenerativeAI } from "@google/generative-ai";
import testQuestion from "./testQuestion.js";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateQuestions = async (req, res) => {
  try {
    const {
      selectedSubject: subject,
      selectedTopic: topic,
      difficultyLevel: difficulty,
      questionCount: count,
    } = req.body;

    console.log("selected", subject, topic, difficulty, count);
    if (!subject || !count || !difficulty) {
      return res.status(400).json({ message: "Missing required field" });
    }
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });
    const prompt = `
You are an expert exam question generator.

Generate ${count} multiple-choice questions.

Subject: ${subject}
Topic: ${topic || "General"}
Difficulty: ${difficulty}

Rules:
- Each question must have exactly 4 options
- Only ONE option is correct
- Difficulty must strictly match
- Avoid repeated questions
- Return the response as RAW JSON.
-Do NOT use markdown.
-Do NOT use code blocks.
-Do NOT include \`\`\` or the word "json".
-Do NOT add explanations.
-Answers should not be same options for each question 

JSON format:
[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "answer": "one of the options",
    "subject": "given subject"
  }
]
`;

    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    let text = result.response.text();
    // let text = testQuestion;
    // text = JSON.stringify(text)
    let Questions;

    try {
      Questions = JSON.parse(text);
      // console.log(Questions)
    } catch (err) {
      return res.status(400).json("AI returned invalid format : not parsed");
    }
    const isValidData =
      Array.isArray(Questions) &&
      Questions.every(
        (Q) =>
          Q.question &&
          Array.isArray(Q.options) &&
          Q.options.length === 4 &&
          Q.options.includes(Q.answer)
      );

    if (!isValidData) return res.status(400).json("AI returned invalid format");
      console.log("success response to frontend")
    return res.status(200).json(Questions);
  } catch (err) {
    console.log("AI code generation failed", err);
    return res.status(500).json("AI code generation failed");
  }
};
export default generateQuestions;
