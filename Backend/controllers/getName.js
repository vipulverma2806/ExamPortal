import User from "../models/user.model.js";
const getName = async (req, res) => {
  const user = await User.findById(req.userId).select("name _id");
  // console.log(user);
  res.json(user);
};
export default getName;
