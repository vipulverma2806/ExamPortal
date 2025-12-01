const User = require("../models/user.model");
const getName = async (req, res) => {
  const user = await User.findById(req.userId).select('name _id');
  console.log(user);
  res.json(user);
};
module.exports = getName;
