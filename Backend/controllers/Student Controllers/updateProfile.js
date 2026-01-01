import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, password } = req.body;
    
    // console.log(req.body);
    let updateData = {};

    if (name && name.trim() !== "") updateData.name = name;
    if (email && email.trim() !== "") {
      const found = await User.findOne({ email, _id: { $ne: userId } });
      if (found)
        return res.status(409).json({ message: "Email already in Use" });
      updateData.email = email;
    }
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 12);
    }
    if (Object.keys(updateData).length == 0)
      return res.status(400).json({ message: "Nothing to update" });

    // console.log(userId)
    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { runValidators: true, new: true }
    );
    // console.log("update",updated);
    if(!updated) return res.status(404).json({ message: "User not found" })
    return res.status(200).json({ message: "Update successfull" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};
export default updateProfile;
