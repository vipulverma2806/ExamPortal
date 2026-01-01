import Question from "../../models/question.model.js";
const getReviewExam = async (req, res) => {
  try {
    const questions = await Question.find();

    // console.log(questions);
    return res.status(200).json({message:"success",data:questions});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message:"internal server error"})
  }
};

export default getReviewExam;
