import mongoose from "mongoose";
import Attempt from "../models/attempt.model.js";
import Question from "../models/question.model.js";

const saveProgress = async (req, res) => {
  let { subject, timeSpents, selectedOptions } = req.body;
  const io = req.app.get("io");
  console.log("io",io.emit)
  try {
    if (!subject || !selectedOptions)
      return res.status(400).json({ message: "fields missing" });
    const subjectQues = await Question.find({ subject: subject })
      .select("_id answer")
      .lean();

    let ansObj = {};

    subjectQues.forEach((item) => {
      ansObj[item._id.toString()] = item.answer;
    });


    let totalMarks = 0;
    let rightAnswers = 0;
    let wrongAnswers = 0;

    for (const key in ansObj) {
      if (!selectedOptions[key]) {
        continue;
      }
      if (ansObj[key] === selectedOptions[key]) {
        totalMarks += 4;
        rightAnswers += 1;
      } else {
        totalMarks -= 1;
        wrongAnswers += 1;
      }
    }
  
    const found = await Attempt.findOne({
      userId: req.userId,
      subject: subject,
    });
    
    if (found) {
      
      await Attempt.findOneAndUpdate(
        { userId: req.userId, subject: subject },
        {
          $set: {
            timeSpents,
            selectedOptions,
            totalMarks,
            rightAnswers,
            wrongAnswers,
          },
        },

        { new: true }
      );
      
      io.emit("exam_submitted", {
        name: req.userName,
        subject: subject,
        time: new Date().toLocaleTimeString(),
      });
      console.log("yha tak aa rha");
      return res.status(200).send({ message: "Progress saved!" });
    }

    await Attempt.create({
      subject,
      timeSpents,
      selectedOptions,
      userId: req.userId,
      name: req.userName,
      totalMarks,
      rightAnswers,
      wrongAnswers,
    });
    io.emit("exam_submitted", {
      Name: req.userName,
      subject: subject,
      time: getTime(),
    });
    return res.status(200).send({ message: "Progress saved!" });
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export default saveProgress;
