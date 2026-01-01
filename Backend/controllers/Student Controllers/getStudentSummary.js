import Attempt from "../../models/attempt.model.js";

const getStudentSummary = async (req, res) => {
  const userId = req.userId;
  // console.log(userId,subject)
  try {
    const data = await Attempt.find({ userId: userId });

    // console.log("getStudentSummary",data);
    return res.data(200).json({ message: "success", data: data });
  } catch (err) {
    console.log(err);
    return res.data(500).json({ message: "Internal server error" });
  }
};
export default getStudentSummary;
