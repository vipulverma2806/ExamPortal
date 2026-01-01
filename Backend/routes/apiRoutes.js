import express from "express";

import { Router } from "express";

import getSubjects from "../controllers/getSubjects.js";
import getQuestions from "../controllers/getQuestions.js";
import saveProgress from "../controllers/saveProgress.js";
import getProgress from "../controllers/getProgress.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import getName from "../controllers/getName.js";
import getStudentSummary from "../controllers/Student Controllers/getStudentSummary.js";
import getLeaderBoard from "../controllers/Student Controllers/getLeaderBoard.js";
import getReviewExam from "../controllers/Student Controllers/getReviewExam.js";

const router = Router();

router.get("/Subjects", getSubjects);
router.get("/questions/:subject", getQuestions);
router.get("/reviewExam", authMiddleware, getReviewExam);
router.post("/save-progress", authMiddleware, saveProgress);
router.get("/progress", authMiddleware, getProgress);
router.get("/getName", authMiddleware, getName);
router.get("/getStudentSummary", authMiddleware, getStudentSummary);
router.get("/getLeaderBoard", authMiddleware, getLeaderBoard);
export default router;
