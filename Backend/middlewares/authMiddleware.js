const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send("Unauthorized");
      } else {
        req.userId = decoded.userId;
        
        next();
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = authMiddleware;
