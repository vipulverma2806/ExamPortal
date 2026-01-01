import Question from "../../models/question.model.js";
const addQuestion = async (req, res) => {
  try {
    const { question, options, selectedAnswer, selectedSubject } = req.body;
    question = question.trim();
    selectedAnswer = selectedAnswer.trim();
    selectedSubject = selectedSubject.trim();
    if (!question || !selectedAnswer || !selectedSubject)
      return res.status(200).send({ message: "Empty field detected" });
    if (
      !options.A.trim() ||
      !options.B.trim() ||
      !options.C.trim() ||
      !options.D.trim()
    )
      return res.status(200).send({ message: "Provide all four Options" });
    const optionsArr = Object.values(options);
    const finalOptionsArr = [];
    optionsArr.forEach((option, i) => {
      finalOptionsArr[i] = option.trim();
    });
    const completeAnswer = options[selectedAnswer];
    console.log();
    if (manualQuestion) {
      const { question, options, answer, subject } = manualQuestion;
      const newQuestion = new Question({
        question,
        options,
        answer,
        subject,
      });
      await newQuestion.save();
      return res.status(200).send("Question added!");
    }
    await Question.insertMany(genQuestions);
    console.log("q array added");
    return res.status(200).send("Questions added!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal SERVER error");
  }
};
export default addQuestion;
