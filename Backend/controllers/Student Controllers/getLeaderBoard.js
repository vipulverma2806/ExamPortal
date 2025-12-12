import Attempt from "../../models/attempt.model.js";

const getStudentSummary = async (req, res) => {
  const userId = req.userId;

  try {
    const data = await Attempt.aggregate([
      {
        $group: {
          _id: "$userId",
          name: { $first: "$name" },
          finalMarks: { $sum: "$totalMarks" },
        },
      },
    ]).sort({ finalMarks: -1 });
    console.log("getLeaderBoard", data);
    return res.json(data);
  } catch (err) {
    console.log(err);
  }
};
export default getStudentSummary;
