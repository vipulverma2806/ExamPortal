// import Question from "../../models/question.model.js";
import pool from "../../config/postgresDB.js";
const getReviewExam = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM questions')
    // const questions = await Question.find();
    const questions = response.rows;

    // console.log(questions);
    return res.status(200).json({message:"success",data:questions});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message:"internal server error"})
  }
};

export default getReviewExam;
