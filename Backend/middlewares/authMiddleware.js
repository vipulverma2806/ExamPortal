import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send("Unauthorized");
      } else {
        req.userId = decoded.userId;
        req.userName = decoded.name;
        
        next();
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
};

export default authMiddleware;
