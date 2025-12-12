import Question from "../models/question.model.js";
const getQuestions = async (req, res) => {
  const { category } = req.params;
  try {
    if (category === "all") {
      const questions = await Question.find();
      console.log(questions)
      return res.json(questions);
    } else {
      const questions = await Question.find({ category });
      return res.json(questions);
    }
  } catch (err) {
    console.log(err);
  }
};

export default getQuestions;
