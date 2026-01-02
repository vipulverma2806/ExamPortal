import Question from "../models/question.model.js";
const getQuestions = async (req, res) => {
  const { subject } = req.params;
  try {
    if (subject === "all") {
      const questions = await Question.find();
      // console.log(questions)
      return res.status(200).json(questions);
    } else {
      const questions = await Question.find({ subject });
      return res.status(200).json(questions);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({message:"internal server error"});
  }
};

export default getQuestions;
