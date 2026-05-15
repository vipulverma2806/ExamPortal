import Question from "../models/question.model.js";
import pool from "../config/postgresDB.js";
const getQuestions = async (req, res) => {
  const { subject } = req.params;
  try {
    if (subject === "all") {
      const questions = await pool.query("SELECT * FROM questions");
      // const questions = await Question.find();
      // console.log(questions)
      return res.status(200).json(questions.rows);
    } else {
      // const questions = await Question.find({ subject });
      const questions = await pool.query(
        `SELECT * FROM questions WHERE subject = $1`,
        [subject],
      );

      
      return res.status(200).json(questions.rows);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

export default getQuestions;
