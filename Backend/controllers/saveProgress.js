import mongoose from "mongoose";
import Attempt from "../models/attempt.model.js";
import Question from "../models/question.model.js";

const saveProgress = async (req, res) => {
  let { attemptId, category, timeSpents, selectedOptions } = req.body;
  console.log(req.body);
  try {
    console.log("inside try", attemptId);
    const categoryQues = await Question.find({category:category})
    


    const found = await Attempt.findOne({
      userId: req.userId,
      category: category,
    });
    if (found) {
      await Attempt.findOneAndUpdate(
        { userId: req.userId, category: category },
        {
          $set: {
            timeSpents,
            selectedOptions,
          },
        },

        { new: true }
      );




     return res.status(200).send("Progress saved!");
    }

    await Attempt.create({
      category,
      timeSpents,
      selectedOptions,
      userId: req.userId,
      name: req.userName,
    });
   return res.status(200).send("Progress saved!");
  } catch (err) {
    res.status(500).send(err);
  }
};

export default saveProgress;
