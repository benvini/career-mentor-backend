import express from "express";
import {
  authMiddleware,
  submitSurvey,
  getSurveyByUser,
} from "../controllers/surveyController";

const router = express.Router();

router.post("/", authMiddleware, submitSurvey);
router.get("/", authMiddleware, getSurveyByUser);

export default router;
