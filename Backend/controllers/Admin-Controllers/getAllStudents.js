import User from "../../models/user.model.js";
const getAllStudents = async (req, res) => {
  try {
    const allStudents = await User.find({ role: "student" });
    if (allStudents.length == 0)
      return res.status(200).json({ message: "Students not found", data: [] });
    // console.log("allstudents", allStudents);
    res.status(200).json({ count: allStudents.length, data: allStudents });
  } catch (err) {
    res.status(500).json({ message: "some error occured" });
    console.log(err);
  }
};
export default getAllStudents;
