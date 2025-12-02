const checkAuth = async (req, res) => {
  if (req.userId) return res.status(202).json("Accepted");
  res.status(401).json("unAuthorised");
}

export default checkAuth;