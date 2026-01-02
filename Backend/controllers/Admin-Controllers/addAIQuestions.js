import Question from "../../models/question.model.js";
const addAIQuestions = async (req, res) => {
  let { genQuestions } = req.body;
  try {
    if(genQuestions.length<=0){
        return res.status(500).send("Please provide questions") 
    }
    await Question.insertMany(genQuestions);
    console.log("q array added");
    return res.status(200).send("Questions added!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
export default addAIQuestions;
