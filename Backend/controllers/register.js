import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
const register = async (req, res) => {
  let { name, email, password, courseName, rollNo } = req.body;
  // console.log(req.body);
  name = name.trim();
  email = email.trim().toLowerCase();
  rollNo = rollNo.trim();

  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "All Fields required" });
    const duplicateMail = await User.findOne({ email: email });
    if (duplicateMail)
      return res.status(409).json({ message: "Email Already exist" });
    const hashed = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashed,
      courseName,
      rollNo,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send({ message: "Error registering user" });
  }
};

export default register;
