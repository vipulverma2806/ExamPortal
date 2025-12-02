import mongoose from "mongoose";
import Attempt from "../models/attempt.model.js";

const saveProgress = async (req, res) => {
  let { attemptId, category, timeSpents, selectedOptions } = req.body;
  console.log(req.body);
  try {
    console.log("inside try",attemptId)
    if(!mongoose.Types.ObjectId.isValid(attemptId)){
      attemptId = new mongoose.Types.ObjectId()
      console.log("attemptId",attemptId)
    }
    await Attempt.findOneAndUpdate(
      { _id: attemptId },
      {
        userId: req.userId,
        name: req.userName,
        category,
        timeSpents,
        selectedOptions,
      },
      { new: true, upsert: true }
    );
    res.status(200).send("Progress saved!");
  } catch (err) {
    res.status(500).send(err);
  }
};

export default saveProgress;
