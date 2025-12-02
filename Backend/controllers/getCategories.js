
import Question from "../models/question.model.js";
const getCategories= async (req, res) => {
  const categories = await Question.distinct('category');
  res.json(categories);
};

export default getCategories;
