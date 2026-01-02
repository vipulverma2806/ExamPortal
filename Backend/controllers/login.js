import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("password name role");
    // console.log("user",user)

    if (!user) return res.status(401).send({ message: "Invalid crediantials" });
    // console.log(password, user.password);
    const decoded = await bcrypt.compare(password, user.password);

    if (!decoded)
      return res.status(401).json({ message: "Invalid crediantials" });

    const token = jwt.sign(
      { userId: user._id, name: user.name, userRole: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "Login success", role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ message: "Error logging in" });
  }
};

export default login;
