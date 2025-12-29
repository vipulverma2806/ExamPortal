import Question from "../models/question.model.js";
const getQuestions = async (req, res) => {
  const { subject } = req.params;
  try {
    if (subject === "all") {
      const questions = await Question.find();
      // console.log(questions)
      return res.json(questions);
    } else {
      const questions = await Question.find({ subject });
      return res.json(questions);
    }
  } catch (err) {
    console.log(err);
  }
};

export default getQuestions;
