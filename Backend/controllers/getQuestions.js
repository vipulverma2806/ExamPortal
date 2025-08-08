const Question = require("../models/question.model")
const getQuestions = async (req, res) => {
  const { category } = req.params;
  const questions = await Question.find({ category });
  res.json(questions);
};

module.exports = getQuestions;

 