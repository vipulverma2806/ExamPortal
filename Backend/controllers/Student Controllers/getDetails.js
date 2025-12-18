import User from "../../models/user.model.js";

const getDetails = async (req, res) => {
  const userId = req.userId;
  // console.log("userId",userId)
  try {
    const details = await User.findById(userId);
    // console.log(details);
    res.status(200).json(details)
  } catch (err) {
    console.log(err);
  }
};
export default getDetails;
