const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json("Logout success");
  } catch (err) {
    console.log(err);
  }
};

module.exports = logout;
