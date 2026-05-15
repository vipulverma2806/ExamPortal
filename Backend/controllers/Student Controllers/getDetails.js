import User from "../../models/user.model.js";
import pool from "../../config/postgresDB.js";
const getDetails = async (req, res) => {
  const userId = req.userId;
  // console.log("userId",userId)
  try {
    const response = await pool.query('SELECT * FROM users WHERE userid = $1',[userId])
    const details = await response.rows[0]
    if (!details) return res.status(404).json({ message: "User not Found" });
    // console.log(details);

    return res.status(200).json({ message: "Success", data: details });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default getDetails;
