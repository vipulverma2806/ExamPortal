import mongoose from "mongoose";
// import Attempt from "../models/attempt.model.js";
// import Question from "../models/question.model.js";
import pool from "../config/postgresDB.js";

const saveProgress = async (req, res) => {
  let { subject, timeSpents, selectedOptions } = req.body;
  const io = req.app.get("io");
  console.log("io", io.emit);
  console.log("saveProgress 10", subject, timeSpents, selectedOptions);
  try {
    if (!subject || !selectedOptions)
      return res.status(400).json({ message: "fields missing" });

    const responsePG = await pool.query(
      "SELECT question_id, answer FROM questions WHERE subject = $1",
      [subject],
    );
    // console.log("Saveprogress",responsePG.rows)
    // return;
    if (responsePG.rowCount == 0)
      return res.status(500).send({ message: "Questions Not Available" });
    const subjectQues = responsePG.rows;
    // const subjectQues = await Question.find({ subject: subject })
    // .select("_id answer")
    // .lean();

    let ansObj = {};

    subjectQues.forEach((item) => {
      ansObj[item.question_id.toString()] = item.answer;
    });

    // console.log("saveprogress 34",ansObj)
    // return;

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

    // const found = await Attempt.findOne({
    //   userId: req.userId,
    //   subject: subject,
    // });
    // console.log("SAVEprogress 58",[
    //       timeSpents,
    //       selectedOptions,
    //       totalMarks,
    //       rightAnswers,
    //       wrongAnswers,
    //       req.userId,
    //       subject,
    //     ])

    const responsePGAttempt = await pool.query(
      "SELECT * FROM attempt WHERE userid = $1 AND subject = $2",
      [req.userId, subject],
    );

    if (responsePGAttempt.rowCount) {
      await pool.query(
        "UPDATE attempt SET time_spents = $1 ,selected_options = $2,total_marks = $3,right_answers = $4,wrong_answers = $5 WHERE userid = $6 AND subject = $7",
        [
          timeSpents,
          selectedOptions,
          totalMarks,
          rightAnswers,
          wrongAnswers,
          req.userId,
          subject,
        ],
      );
      // await Attempt.findOneAndUpdate(
      //   { userId: req.userId, subject: subject },
      //   {
      //     $set: {
      // timeSpents,
      // selectedOptions,
      // totalMarks,
      // rightAnswers,
      // wrongAnswers,
      //     },
      //   },

      //   { new: true }
      // );

      io.emit("exam_submitted", {
        name: req.userName,
        subject: subject,
        time: new Date().toLocaleTimeString(),
      });
      console.log("yha tak aa rha");
      return res.status(200).send({ message: "Progress saved!" });
    }
    console.log("saveprogress 109");
    const responseINSERT = await pool.query(
      `INSERT INTO attempt (userid,name,time_spents,selected_options,total_marks,right_answers,wrong_answers,subject) VALUES  ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        req.userId,
        req.userName,
        timeSpents,
        selectedOptions,
        totalMarks,
        rightAnswers,
        wrongAnswers,
        subject,
      ],
    );

    console.log("saveprogress 123", responseINSERT);
    // return;

    // await Attempt.create({
    //   subject,
    //   timeSpents,
    //   selectedOptions,
    //   userId: req.userId,
    //   name: req.userName,
    //   totalMarks,
    //   rightAnswers,
    //   wrongAnswers,
    // });

    io.emit("exam_submitted", {
      Name: req.userName,
      subject: subject,
      time: new Date().toLocaleTimeString(),
    });
    return res.status(200).send({ message: "Progress saved!" });
  } catch (err) {
    console.log("saveProgress 143 error", err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export default saveProgress;
