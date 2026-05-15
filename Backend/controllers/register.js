import User from "../models/user.model.js";
import dbConnect from "../config/dbConnect.js";
import pool from "../config/postgresDB.js";
import bcrypt from "bcryptjs";
const register = async (req, res) => {
  let { name, email, password, courseName, rollNo } = req.body;
  // console.log(req.body);
  name = name.trim();
  email = email.trim().toLowerCase();
  rollNo = rollNo.trim();
  // console.log(name,email)
  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "All Fields required" });
    // console.log(name);
    const duplicateMail = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email],
    );
    // const duplicateMail = await User.findOne({ email: email });

    console.log("duplicateMail", duplicateMail);
    if (duplicateMail.rowCount)
      return res.status(409).json({ message: "Email Already exist" });
    const hashed = await bcrypt.hash(password, 12);
    // const newUser = new User({
    //   name,
    //   email,
    //   password: hashed,
    //   courseName,
    //   rollNo,
    // });
    // await newUser.save();
    // console.log(name,email)
    await pool.query(
      "INSERT INTO users (name,email,password,coursename,rollno) VALUES ($1,$2,$3,$4,$5)",
      [name, email, hashed, courseName, rollNo],
    );

    res.status(201).json({ message: "User registered!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send({ message: "Error registering user" });
  }
};

export default register;
