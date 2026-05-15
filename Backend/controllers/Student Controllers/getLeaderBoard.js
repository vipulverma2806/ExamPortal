import Attempt from "../../models/attempt.model.js";
import pool from "../../config/postgresDB.js";
const getLeaderBoard = async (req, res) => {
  const userId = req.userId;

  try {
    const dataRes = await pool.query(
      'SELECT userid,name,SUM(total_marks)::INT AS "finalMarks" FROM attempt GROUP BY userid,name ORDER BY "finalMarks" DESC ',
    );
    console.log(
      "[Student Controllers/getLeaderBoard.js | line 10] ",
      dataRes.rows,
    );
    // return;
    const data = dataRes.rows;
    return res.status(200).json({ message: "success", data: data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal serever error" });
  }
};
export default getLeaderBoard;
