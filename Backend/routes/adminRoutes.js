import express from "express";
import { Router } from "express";
import checkAdmin from "../middlewares/checkAdmin.js";
import getAllStudents from "../controllers/Admin-Controllers/getAllStudents.js";
import getAllAttempts from "../controllers/Admin-Controllers/getAllAttempts.js";
import getBestWorstSub from "../controllers/Admin-Controllers/getBestWorstSub.js";
import getAllQuestions from "../controllers/Admin-Controllers/getAllQuestions.js";
import generateQuestions from "../controllers/Admin-Controllers/generateQuestions.js";
import addQuestion from "../controllers/Admin-Controllers/addQuestion.js";
import deleteQuestion from "../controllers/Admin-Controllers/deleteQuestion.js";

const router = Router();
router.post("/add-question",checkAdmin, addQuestion);
router.get("/getAllStudents", checkAdmin, getAllStudents);
router.get("/getAllAttempts", checkAdmin, getAllAttempts);
router.get("/getbestWorstSub", checkAdmin, getBestWorstSub);
router.get("/getAllQuestions", checkAdmin, getAllQuestions);
router.post("/generateQuestions", checkAdmin, generateQuestions);
router.delete("/deleteQuestion/:id", checkAdmin,deleteQuestion)
export default router;
