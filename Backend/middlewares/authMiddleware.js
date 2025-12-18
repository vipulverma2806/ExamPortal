import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).send({ message: "Token not provided" });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const foundUser = await User.findById(decoded.userId).select("_id name role")
    if(!foundUser) return res.status(401).send({ message: "User not found" });
    req.userId = foundUser._id;
    req.userName = foundUser.name;
    req.userRole = foundUser.role;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
