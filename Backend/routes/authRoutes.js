const express = require("express");
const router = express.Router();
const register = require("../controllers/register");
const login = require("../controllers/login");
const authMiddleware = require("../middlewares/authMiddleware");
const logout = require("../controllers/logout");
const checkAuth = require("../controllers/checkAuth");
router.post("/register", register);

router.post("/login", login);
router.post("/logout", logout);
router.get("/checkAuth", authMiddleware, checkAuth);
module.exports = router;
