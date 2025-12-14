import Question from "../../models/question.model.js";
const getReviewExam = async (req, res) => {
  try {
    const questions = await Question.find();
    // console.log(questions);
    return res.json(questions);
  } catch (err) {
    console.log(err);
  }
};

export default getReviewExam;
