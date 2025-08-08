const Question = require("../models/question.model")
const getCategories= async (req, res) => {
  const categories = await Question.distinct('category');
  res.json(categories);
};

module.exports = getCategories;