// import Attempt from "../../models/attempt.model.js";
import pool from "../../config/postgresDB.js";
const getStudentSummary = async (req, res) => {
  const userId = req.userId;
  // console.log(userId,subject)
  try {
    const data = await pool.query("SELECT * FROM attempt WHERE userid = $1", [
      req.userId,
    ]);
    // const data = await Attempt.find({ userId: userId });

    // console.log("getStudentSummary",data.rows);

    return res.status(200).json({ message: "success", data: data.rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default getStudentSummary;
