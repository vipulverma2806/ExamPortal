import Question from "../../models/question.model.js";
import pool from "../../config/postgresDB.js";
// import genQuestions from "../../TEST.js";
const addAIQuestions = async (req, res) => {
  let { genQuestions } = req.body;
  // console.log("🚀 ~ genQuestions:", genQuestions)
  // return;
  try {
    if (genQuestions.length <= 0) {
      return res.status(500).send("Please provide questions");
    }

    for (const question of genQuestions) {
      await pool.query(
        `INSERT INTO questions (question ,options,answer,subject) VALUES ($1,$2,$3,$4)`,
        [
          question.question,
          question.options,
          question.answer,
          question.subject,
        ],
      );
    }
    console.log("ques array added");
    return res.status(200).send("Questions added!");
  } catch (err) {
    await pool.query("ROLLBACK");
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
export default addAIQuestions;
