
import Question from "../models/question.model.js";
const getQuestions = async (req, res) => {
  const { category } = req.params;
  const questions = await Question.find({ category });
  res.json(questions);
};

export default getQuestions;

 