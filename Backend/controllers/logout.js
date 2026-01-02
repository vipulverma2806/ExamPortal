const logout = async (req, res) => {
  // console.log("inside")
  try {
    // console.log("inside try")
    res.clearCookie("token");
    res.status(200).json({ message: "Logout success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" })
  }
};

export default logout;
