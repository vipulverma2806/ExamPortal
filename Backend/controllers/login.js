import User from "../models/user.model.js";
import pool from "../config/postgresDB.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  // console.log("loin.js line-7",req.body)
  const { email, password } = req.body;

  try {
    // const user = await User.findOne({ email }).select("password name role");
    const user = await pool.query(
      "SELECT userid, name, password, role FROM users WHERE email = $1",
      [email],
    );
    // console.log("user",user)

    if (!user.rowCount)
      return res.status(401).send({ message: "Invalid crediantials" });
    // console.log(user.rows[0].password);

    const decoded = await bcrypt.compare(password, user.rows[0].password);

    if (!decoded)
      return res.status(401).json({ message: "Invalid crediantials" });
    // console.log("loin.js line-26",user.rows)
    const token = jwt.sign(
      {
        userId: user.rows[0].userid,
        name: user.rows[0].name,
        userRole: user.rows[0].role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "Login success", role: user.rows[0].role });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ message: "Error logging in" });
  }
};

export default login;
