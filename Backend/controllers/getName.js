import User from "../models/user.model.js";
import pool from "../config/postgresDB.js";
const getName = async (req, res) => {
  try {
    const user =await pool.query('SELECT name , userid FROM users WHERE userid = $1',[req.userId])
    // const user = await User.findById(req.userId).select("name _id");
    console.log(user)
    // return;
    if (!user.rows.length) return res.status(404).json({ message: "User not found"});
    res.status(200).json({ message: "success", data: user.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};
export default getName;
