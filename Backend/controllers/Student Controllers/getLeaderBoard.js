import Attempt from "../../models/attempt.model.js";

const getLeaderBoard = async (req, res) => {
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
    // console.log("getLeaderBoard", data);
    return res.status(200).json({message:"success",data:data});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message:"internal serever error"});
  }
};
export default getLeaderBoard;
