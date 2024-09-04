import { Router } from "express";
import { getMaxScore, storeNewScore } from "../controllers/quiz.controllers";

export const QuizRouter = Router();

QuizRouter.post("/getMaxScore", getMaxScore);
QuizRouter.post("/storeNewScore", storeNewScore);
