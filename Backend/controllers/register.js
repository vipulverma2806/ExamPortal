import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const hashed = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();
    res.send("User registered!");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Error registering user");
  }
};

export default register;
