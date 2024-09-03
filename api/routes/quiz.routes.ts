import { Router } from "express";
import { getMaxScore } from "../controllers/quiz.controllers";

export const QuizRouter = Router();

QuizRouter.post("/getMaxScore", getMaxScore);
