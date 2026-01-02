import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const checkAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Token not provided" });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const foundAdmin = await User.findById(decoded.userId).select(
      "_id name role"
    );
    if (!foundAdmin) return res.status(401).json({ message: "user not found" });
    if (foundAdmin.role !== "teacher")
      return res.status(403).json({ message: "Access Denied" });
    // console.log(foundAdmin);
    req.userId = foundAdmin._id;
    req.userName = foundAdmin.name;
    req.userRole = foundAdmin.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid or expired token" });
  }
};

export default checkAdmin;
