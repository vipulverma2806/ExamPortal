import Question from "../../models/question.model.js";
import mongoose from "mongoose";
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      const subject = id;
      await Question.deleteMany({ subject: subject });
      return res.status(200).json("All Question Deleted");
    }
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if(!deletedQuestion) return res.status(404).json("Question not found")
    console.log("deleted", deletedQuestion);
    return res.status(200).json("Question deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};
export default deleteQuestion;
