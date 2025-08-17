const Progress = require("../models/progress");
const saveProgress = async (req, res) => {
  const { category, correctAnswers, wrongAnswers } = req.body;
  console.log(req.body)
  const progress = await Progress.findOneAndUpdate(
    { userId: req.userId , category:category},
    {
      userId: req.userId,
      category,
      correctAnswers,
      wrongAnswers,
    },
    { new: true, upsert: true }
  );

  res.send("Progress saved!");
};

module.exports = saveProgress;
