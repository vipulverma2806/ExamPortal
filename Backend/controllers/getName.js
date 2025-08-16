const User = require("../models/user")
const getName = async (req, res) => {
  const user = await User.find({ userId: req.userId });
  res.json(user.name);
};
module.exports = getName;