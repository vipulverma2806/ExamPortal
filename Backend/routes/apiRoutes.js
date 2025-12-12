import express from "express";

import { Router } from "express";
import addQuestion from "../controllers/addQuestion.js";
import getCategories from "../controllers/getCategories.js";
import getQuestions from "../controllers/getQuestions.js";
import saveProgress from "../controllers/saveProgress.js";
import getProgress from "../controllers/getProgress.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import getName from "../controllers/getName.js";
import getStudentSummary from "../controllers/Student Controllers/getStudentSummary.js";
import getLeaderBoard from "../controllers/Student Controllers/getLeaderBoard.js";

const router = Router();
router.post("/add-question", addQuestion);
router.get("/categories", getCategories);
router.get("/questions/:category", getQuestions);
router.post("/save-progress", authMiddleware, saveProgress);
router.get("/progress", authMiddleware, getProgress);
router.get("/getName", authMiddleware, getName);
router.get("/getStudentSummary", authMiddleware, getStudentSummary);
router.get("/getLeaderBoard", authMiddleware, getLeaderBoard);
export default router;
