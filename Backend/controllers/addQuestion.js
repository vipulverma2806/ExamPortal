
const Question = require("../models/question.model")
const addQuestion = async (req, res) => {
  const { question, options, answer, category } = req.body;
  const newQuestion = new Question({ question, options, answer, category });
  await newQuestion.save();
  res.send('Question added!');
}
module.exports = addQuestion;