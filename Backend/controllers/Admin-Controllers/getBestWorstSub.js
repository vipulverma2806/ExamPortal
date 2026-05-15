import pool from "../../config/postgresDB.js";

const getBestWorstSub = async (req, res) => {
  try {
    const totalQuesPerSubRes = await pool.query(`
      SELECT subject, COUNT(*) AS qcount
      FROM questions
      GROUP BY subject
    `);
    const totalQuesPerSub = totalQuesPerSubRes.rows;

    const passingMarksPerSubObj = {};
    totalQuesPerSub.forEach((sub) => {
      passingMarksPerSubObj[sub.subject] = Math.floor(
        sub.qcount * 4 * (33 / 100),
      );
    });

    // console.log(passingMarksPerSubObj);
    //    Example --  {
    //   DBMS: 6,
    //   'Software Engineering': 27,
    //   'Computer Graphics': 17,
    //   DSA: 26,
    //   'Web Development': 26,
    //   'Operating Systems': 14
    // }
    // return;

    if (Object.keys(passingMarksPerSubObj).length === 0) {
      return res.status(200).json({ message: "No subjects found", data: [] });
    }

    // console.log("best worst 38", Object.entries(passingMarksPerSubObj));
    // return;
    const conditions = Object.entries(passingMarksPerSubObj)
      .map(
        ([subject, passingMarks], i) =>
          `(subject = $${i * 2 + 1} AND total_marks >= $${i * 2 + 2})`,
      )
      .join(" OR ");

    const conditionValues = Object.entries(passingMarksPerSubObj).flatMap(
      ([subject, passingMarks]) => [subject, passingMarks],
    );

    const passedStudentCountRes = await pool.query(
      `SELECT subject, COUNT(*) AS count
       FROM attempt
       WHERE ${conditions}
       GROUP BY subject`,
      conditionValues,
    );

    const passedStudentCount = passedStudentCountRes.rows;

    if (passedStudentCount.length === 0) {
      return res.status(200).json({ message: "No one Passed", data: [] });
    }
    // console.log("best worst 65", passedStudentCount);
    // [
    // { subject: 'DBMS', count: '1' },
    // { subject: 'Computer Graphics', count: '1' },
    // { subject: 'Software Engineering', count: '1' },
    // { subject: 'Operating Systems', count: '2' }]

    return res
      .status(200)
      .json({ message: "Best and Worst sub", data: passedStudentCount });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Some error occurred" });
  }
};

export default getBestWorstSub;
