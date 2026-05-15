import Question from "../models/question.model.js";
import pool from "../config/postgresDB.js";
const getSubjects = async (req, res) => {
  try {
    const DBresponse = await pool.query(
      "SELECT DISTINCT subject FROM questions ",
    );
    let subjects = []
    DBresponse.rows.forEach((obj)=>{
      subjects.push(obj.subject)
    })
    // const subjects = await Question.distinct("subject");
    console.log("getsubjects", subjects);
    res.status(200).json(subjects);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server Error");
  }
};

export default getSubjects;
