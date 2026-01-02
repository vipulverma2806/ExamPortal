import Question from "../../models/question.model.js";
const addQuestion = async (req, res) => {
  try {
    let {
      question,
      optionsObj,
      selectedAnswer,
      selectedSubject,
      genQuestions,
    } = req.body;
    // console.log(question, optionsObj, selectedAnswer, selectedSubject);

    question = question.trim();
    selectedAnswer = selectedAnswer.trim();
    let subject = selectedSubject.trim();
    if (!question || !selectedAnswer || !subject)
      return res.status(200).send({ message: "Empty field detected" });
    if (
      !optionsObj.A.trim() ||
      !optionsObj.B.trim() ||
      !optionsObj.C.trim() ||
      !optionsObj.D.trim()
    )
      return res.status(200).send({ message: "Provide all four Options" });
    const optionsArr = Object.values(optionsObj);
    let options = [];
    optionsArr.forEach((option, i) => {
      options[i] = option.trim();
    });
    let answer = optionsObj[selectedAnswer];
    answer = answer.trim();
    console.log(question, options, answer, subject);

    const newQuestion = new Question({
      question,
      options,
      answer,
      subject,
    });
    await newQuestion.save();
    return res.status(200).send({ message: "Question added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
export default addQuestion;
