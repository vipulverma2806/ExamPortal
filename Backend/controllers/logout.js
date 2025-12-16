const logout = async (req, res) => {
  console.log("inside")
  try {
    console.log("inside try")
    res.clearCookie("token");
    res.status(200).json("Logout success");
  } catch (err) {
    console.log(err);
  }
};

export default logout;
