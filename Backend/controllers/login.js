const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config()
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).send("User Not Found");

    const decoded =  bcrypt.compare(password , user.password)

    if(!decoded) return res.status(401).json("Invalid Password") 
    
    const token = jwt.sign({ userId: user._id },process.env.SECRET_KEY, { expiresIn: "1h" });
    res.cookie("token",token)
    res.status(202).json("Log in success")
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Error logging in");
  }
};

module.exports = login;
