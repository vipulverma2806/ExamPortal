import Attempt from "../models/attempt.model.js";
const getProgress = async (req, res) => {
  const progress = await Attempt.find({ userId: req.userId });
  console.log(progress);
  res.json(progress);
};
export default getProgress;
