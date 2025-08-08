const Progress = require("../models/progress")
const getProgress = async (req, res) => {
  const progress = await Progress.find({ userId: req.userId });
  res.json(progress);
};
module.exports = getProgress;