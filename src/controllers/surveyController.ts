import { Request, Response, NextFunction } from "express";
import { getCareerPlanFromAgent } from "../services/openaiService";
import jwt from "jsonwebtoken";
import Survey from "../models/Survey";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};

export const submitSurvey = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { answers } = req.body;

    const aiPlan = await getCareerPlanFromAgent(answers);
    const survey = await Survey.create({
      userId: req.userId,
      answers,
      aiPlan,
    });

    res.status(201).json({
      survey,
      aiPlan,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getSurveyByUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const surveys = await Survey.find({ userId: req.userId });
    res.json(surveys);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};
