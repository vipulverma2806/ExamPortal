import Attempt from "../../models/attempt.model.js";
const getAllAttempts = async (req, res) => {
  try {
    const allAttempts = await Attempt.find();
    if (allAttempts.length == 0)
      return res.status(200).json({ message: "No one Attempts", data: [] });
    
    res.status(200).json({ count: allAttempts.length, data: allAttempts,message:"new data coming" });
  } catch (err) {
    res.status(500).json({ message: "some error occured" });
    console.log(err);
  }
};
export default getAllAttempts;
