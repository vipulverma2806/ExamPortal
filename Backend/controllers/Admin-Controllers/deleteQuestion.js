import Question from "../../models/question.model.js";
import pool from "../../config/postgresDB.js";
import { validate as uuidValidate } from "uuid";
import mongoose from "mongoose";
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = uuidValidate(id);

    // const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      const subject = id;
      // await Question.deleteMany({ subject: subject });
      const response = await pool.query(
        "DELETE FROM questions WHERE subject = $1",
        [subject],
      );
      if (!response.rowCount) return res.status(404).json("Question not found");
      return res.status(200).json("All Question Deleted");
    }
    // const deletedQuestion = await Question.findByIdAndDelete(id);
    const response = await pool.query(
      "DELETE FROM questions WHERE question_id = $1",
      [id],
    );

    if (!response.rowCount) return res.status(404).json("Question not found");

    return res.status(200).json("Question deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};
export default deleteQuestion;
