import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
configDotenv();
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("password name");
    console.log("user",user)

    if (!user) return res.status(401).send("User Not Found");
    console.log(password, user.password);
    const decoded = await bcrypt.compare(password, user.password);

    if (!decoded) return res.status(401).json("Invalid Password");

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.cookie("token", token), { httpOnly: true };
    res.status(202).json("Log in success");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Error logging in");
  }
};

export default login;
