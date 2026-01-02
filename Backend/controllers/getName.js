import User from "../models/user.model.js";
const getName = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name _id");
    if (!user) return res.status(404).json({ message: "User not found"});
    res.status(200).json({ message: "success", data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};
export default getName;
