import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";

const updateProfile = async (req, res) => {
  const userId = req.userId;
  const { name, email, password } = req.body;
  // console.log(req.body);
  let updateData = {};

  if (name && name.trim() !== "") updateData.name = name;
  if (email && email.trim() !== "") {
    const found = await User.findOne({ email, _id: { $ne: userId } });
    if (found) return res.status(409).json("Email already in Use");
    updateData.email = email;
  }
  if (password && password.trim() !== "") {
    updateData.password = await bcrypt.hash(password, 12);
  }
  if (Object.keys(updateData).length == 0)
    return res.status(400).json("nothing to update");
  try {
    // console.log(userId)
    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { runValidators: true, new: true }
    );
    // console.log("update",updated);
    return res.status(200).json("update Successfull");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Some Error occurred");
  }
};
export default updateProfile;
