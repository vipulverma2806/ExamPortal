import express from "express";
import { Router } from "express";
import register from "../controllers/register.js";
import login from "../controllers/login.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import logout from "../controllers/logout.js";
import checkAuth from "../controllers/checkAuth.js";
import getDetails from "../controllers/Student Controllers/getDetails.js"
import updateProfile from "../controllers/Student Controllers/updateProfile.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkAuth", authMiddleware, checkAuth);
router.put("/updateProfile", authMiddleware,updateProfile);
router.get("/getDetails", authMiddleware, getDetails);
export default router;
