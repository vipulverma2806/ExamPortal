const checkAuth = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: "unAthorised" });
  }
  return res.status(200).json({ message: "Access accepted", role: req.userRole });
};

export default checkAuth;
