import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import pool from "../config/postgresDB.js";
const checkAdmin = async (req, res, next) => {
    try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Token not provided" });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const foundAdmin = await pool.query("SELECT userid,name,role FROM users WHERE userid = $1",[decoded.userId])
    if (!foundAdmin.rowCount) return res.status(401).json({ message: "User not found" });

     if (foundAdmin.rows[0].role !== "teacher")
      return res.status(403).json({ message: "Access Denied" });

    req.userId = foundAdmin.rows[0].userid;
    req.userName = foundAdmin.rows[0].name;
    req.userRole = foundAdmin.rows[0].role;
    next();
  }
  catch (err) {
    return res.status(401).json({ message: "invalid or expired token" });
  }
};

export default checkAdmin;
