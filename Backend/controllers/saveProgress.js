const Progress = require("../models/progress");
const saveProgress = async (req, res) => {
  const { userId, category, timeSpents, selectedOptions } = req.body;
  console.log(req.body)
  // const progress = await Progress.findOneAndUpdate(
  //   { userId: req.userId , category:category},
  //   {
  //     userId: req.userId,
  //     category,
      
  //   },
  //   { new: true, upsert: true }
  // );

  // res.send("Progress saved!");
};

module.exports = saveProgress;
