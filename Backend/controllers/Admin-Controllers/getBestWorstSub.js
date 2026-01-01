
import Attempt from "../../models/attempt.model.js";
import Question from "../../models/question.model.js";
const getBestWorstSub = async (req, res) => {
  try {
    const totalQuesPerSub = await Question.aggregate([
      { $group: { _id: "$subject", Qcount: { $sum: 1 } } },
      { $project: { _id: 0, subject: "$_id", Qcount: 1 } },
    ]);
    // console.log("subject with question count", totalQuesPerSub);

    
    const passingMarksPerSub = totalQuesPerSub.map((sub, i) => {
      return { [sub.subject]: sub.Qcount * 4 * (33 / 100) };
    });
    // console.log("subject with marks count", passingMarksPerSub);

    const passingMarksPerSubObj = Object.assign({}, ...passingMarksPerSub);
    // console.log(passingMarksPerSubObj);

    const orConditions = Object.entries(passingMarksPerSubObj).map(
      ([subject, passingMarks]) => ({
        subject: subject,
        totalMarks: { $gte: passingMarks },
      })
    );

    const passedStudentCount = await Attempt.aggregate([
      {
        $match: {
          $or: orConditions,
        },
      },
      {
        $group: {
          _id: "$subject",
          count: { $sum: 1 },
        },
      },
      {
        $project: { _id: 0, subject: "$_id", count: 1 },
      },
    ]);

    // console.log("passed", passedStudentCount);
    if (passedStudentCount.length == 0)
      return res.status(200).json({ message: "No one Passed", data: [] });
    // console.log("allstudents", allStudents);
    res
      .status(200)
      .json({ message: "Best and Worst sub", data: passedStudentCount });
  } catch (err) {
    res.status(500).json({ message: "some error occured" });
    console.log(err);
  }
};
export default getBestWorstSub;
