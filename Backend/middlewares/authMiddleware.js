import jwt from "jsonwebtoken";
import pool from "../config/postgresDB.js";
import User from "../models/user.model.js";
const authMiddleware = async (req, res, next) => {
  try {
    // console.log("middleware/autMiddleWare.js line-6",req.cookies)
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Token not provided" });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // const foundUser = await User.findById(decoded.userId).select(
    //   "_id name role"
    // );
    // console.log("middleware/autMiddleWare.js line-13",decoded)
    const foundUser = await pool.query("SELECT userid,name,role FROM users WHERE userid = $1",[decoded.userId])
    // console.log("autmiddleware l-15", foundUser.rows[0])



    if (!foundUser.rowCount) return res.status(401).json({ message: "User not found" });
    // console.log()
    req.userId = foundUser.rows[0].userid;
    req.userName = foundUser.rows[0].name;
    req.userRole = foundUser.rows[0].role;
    // console.log("middleware/autMiddleWare.js line-18",req)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token middleware/autMiddleWare.js 27 " });
  }
};

export default authMiddleware;
