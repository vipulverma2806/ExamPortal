// import Question from "../../models/question.model.js";
import pool from "../../config/postgresDB.js";
const getAllQuestions = async (req, res) => {
  try {
    const questionsRes = await pool.query("SELECT * FROM questions");
    // const questions = await Question.find();
    const questions = questionsRes.rows
    // return;
    if (questions.length == 0)
      return res.status(200).json({ message: "Questions not found" });
    // console.trace(questions.length);



    return res.status(200).json(questions);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "some error occurred" });
  }
};

export default getAllQuestions;
