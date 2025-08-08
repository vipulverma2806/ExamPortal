const Progress = require("../models/progress")
const saveProgress = async (req, res) => {
  const { category, correctAnswers, wrongAnswers } = req.body;
  const progress = new Progress({
    userId: req.userId,
    category,
    correctAnswers,
    wrongAnswers,
  });
  await progress.save();
  res.send('Progress saved!');
};

module.exports = saveProgress;