import Question from "../models/question.model.js";
const getSubjects = async (req, res) => {
  try {
    const subjects = await Question.distinct("subject");
    res.status(200).json(subjects);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server Error");
  }
};

export default getSubjects;
