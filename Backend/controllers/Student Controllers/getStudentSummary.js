import Attempt from "../../models/attempt.model.js"

const getStudentSummary = async (req, res) => {
  const userId = req.userId;
  const category = req.params.id;
  console.log(userId,category)
  try {
    const data = await Attempt.find({ category: category, userId: userId });
    console.log("getStudentSummary",data);
   return res.json(data)
  } catch (err) {
    console.log(err);
  }
};
export default getStudentSummary;
